// ...existing code...
import dotenv from "dotenv";
dotenv.config(); // .env'yi en başta yükle

// --- IMPORTS ----------------------------------------------------------------
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import bodyParser from "body-parser";

// --- APP --------------------------------------------------------------------
const app = express();
const PORT = process.env.PORT || 5000;

// --- STRIPE INIT + TEMİZLİK -------------------------------------------------
// Daha sağlam temizleme: BOM, tırnaklar, NBSP, görünmeyen ASCII dışı karakterler kaldır
function cleanKey(k = "") {
  return String(k || "")
    .replace(/^\uFEFF/, "")        // BOM başındaysa kaldır
    .replace(/["']/g, "")          // tırnakları kaldır
    .replace(/\u00A0/g, " ")       // NBSP -> normal space
    .replace(/[^\x20-\x7E]/g, "")  // ASCII dışı karakterleri çıkar
    .trim();
}
const rawSk = process.env.STRIPE_SECRET_KEY || "";
const sk = cleanKey(rawSk);

// Konsola teşhis logları
const nonAscii = /[^\x20-\x7E]/.test(rawSk);
console.log("[Stripe] raw length:", rawSk.length, "clean length:", sk.length);
console.log("[Stripe] starts with:", sk.slice(0, 10) + "…", "ends with:", "…" + sk.slice(-6));
if (nonAscii) console.warn("[Stripe] ⚠️ Anahtar içinde ASCII dışı karakter var (BOM / NBSP olabilir).");
if (!sk.startsWith("sk_")) console.warn("[Stripe] ⚠️ Anahtar sk_ ile başlamıyor (publishable pk_ olabilir).");

let stripe = null;
if (sk) {
  try {
    stripe = new Stripe(sk);
  } catch (err) {
    console.error("Stripe init error:", err && err.message ? err.message : err);
    stripe = null;
  }
}

/**
 * ÖNEMLİ: Stripe webhook RAW body ister.
 * Bu route'u express.json()'DAN ÖNCE tanımlıyoruz.
 */
app.post("/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
  try {
    if (!stripe) throw new Error("Stripe secret key missing");
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body, // raw buffer
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Payment succeeded:", session.id);
      // TODO: siparişi DB'ye yaz, mail gönder, stok düş...
    }
    return res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err && err.message ? err.message : err);
    return res.status(400).send(`Webhook Error: ${err && err.message ? err.message : String(err)}`);
  }
});

// Basit ping (mevcut) — izin isteyen çağrı ile anahtarın temel doğrulanması
app.get("/api/stripe/ping", async (_req, res) => {
  try {
    if (!stripe) throw new Error("Stripe secret key missing");
    const bal = await stripe.balance.retrieve(); // basit, izin isteyen bir çağrı
    res.json({ ok: true, livemode: bal.livemode });
  } catch (e) {
    res.status(500).json({ ok: false, error: e && e.message ? e.message : String(e) });
  }
});

// DEBUG: Stripe key test endpoint (lokalde hızlı kontrol için)
// DİKKAT: Üretimde kapat veya erişimi kısıtla.
app.get("/api/stripe/test-key", async (_req, res) => {
  try {
    if (!stripe) return res.status(500).json({ ok: false, msg: "Stripe not initialized" });

    // Önce account retrieve dene (bazı restricted key'ler bunu engelleyebilir)
    try {
      const acct = await stripe.accounts.retrieve();
      return res.json({ ok: true, method: "accounts.retrieve", id: acct && acct.id ? acct.id : null });
    } catch (e1) {
      // Eğer accounts.retrieve izin vermezse balance.retrieve deneyelim
      try {
        const bal = await stripe.balance.retrieve();
        return res.json({ ok: true, method: "balance.retrieve", livemode: bal.livemode });
      } catch (e2) {
        console.error("stripe test error (accounts then balance):", e1.message || e1, e2.message || e2);
        return res.status(401).json({ ok: false, error: e2.message || String(e2) });
      }
    }
  } catch (err) {
    console.error("stripe test error:", err && err.message ? err.message : err);
    res.status(500).json({ ok: false, error: err && err.message ? err.message : String(err) });
  }
});

// Diğer tüm JSON istekleri için:
app.use(express.json());
app.use(cors());

// --- IN-MEMORY DBS ----------------------------------------------------------
let lineup = [
  { id: 1, time: "22:00", artist: "DJ Inferno" },
  { id: 2, time: "23:30", artist: "Dark Pulse" },
  { id: 3, time: "01:00", artist: "Hellraiser" },
  { id: 4, time: "02:30", artist: "Acid Queen" },
];

let tickets = [
  { id: 1, type: "Early Bird", price: 25, currency: "EUR", available: true },
  { id: 2, type: "General Admission", price: 35, currency: "EUR", available: true },
  { id: 3, type: "Backstage", price: 60, currency: "EUR", available: false },
];

let faqs = [
  { id: 1, q: "Age restriction?", a: "18+ only. ID check at the gate." },
  { id: 2, q: "When is the location revealed?", a: "48 hours before the event." },
  { id: 3, q: "Refund policy?", a: "All sales are final unless the event is cancelled." },
];

// --- HEALTH -----------------------------------------------------------------
app.get("/", (_req, res) => {
  res.send("✅ Hellgate Project API is running…");
});

// --- LINEUP -----------------------------------------------------------------
app.get("/api/lineup", (_req, res) => res.json(lineup));

app.post("/api/lineup", (req, res) => {
  const { time, artist } = req.body || {};
  if (!time || !artist) return res.status(400).json({ error: "time and artist are required" });
  const newEntry = { id: Date.now(), time, artist };
  lineup.push(newEntry);
  res.json(newEntry);
});

app.delete("/api/lineup/:id", (req, res) => {
  const { id } = req.params;
  lineup = lineup.filter((item) => String(item.id) !== String(id));
  res.json({ message: "Deleted" });
});

// --- TICKETS ----------------------------------------------------------------
app.get("/api/tickets", (_req, res) => res.json(tickets));

app.post("/api/tickets", (req, res) => {
  const { type, price, currency = "EUR", available = true } = req.body || {};
  if (!type || price == null) return res.status(400).json({ error: "type and price are required" });
  const newTicket = {
    id: Date.now(),
    type,
    price: Number(price),
    currency,
    available: Boolean(available),
  };
  tickets.push(newTicket);
  res.json(newTicket);
});

app.delete("/api/tickets/:id", (req, res) => {
  const { id } = req.params;
  tickets = tickets.filter((t) => String(t.id) !== String(id));
  res.json({ message: "Deleted" });
});

// --- FAQ --------------------------------------------------------------------
app.get("/api/faq", (_req, res) => res.json(faqs));

app.post("/api/faq", (req, res) => {
  const { q, a } = req.body || {};
  if (!q || !a) return res.status(400).json({ error: "q and a are required" });
  const newFaq = { id: Date.now(), q, a };
  faqs.push(newFaq);
  res.json(newFaq);
});

app.delete("/api/faq/:id", (req, res) => {
  const { id } = req.params;
  faqs = faqs.filter((f) => String(f.id) !== String(id));
  res.json({ message: "Deleted" });
});

// --- STRIPE CHECKOUT --------------------------------------------------------
function toLineItems(cart = []) {
  return cart.map((i) => ({
    quantity: Math.max(1, Number(i.qty || 1)),
    price_data: {
      currency: process.env.CURRENCY || "EUR",
      product_data: {
        name: i.name,
        images: i.image ? [i.image] : [],
        metadata: { color: i.color || "", size: i.size || "" },
      },
      unit_amount: Math.round(Number(i.price) * 100), // cents
    },
  }));
}

app.post("/api/checkout/create-session", async (req, res) => {
  try {
    if (!stripe) throw new Error("Stripe secret key missing");
    const { cart, customer } = req.body || {};
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Sadece kargo gerektiren ürünler için shipping toplayalım (bilet değil)
    const hasPhysical = cart.some((i) => !i.name?.toLowerCase().includes("ticket"));

    const sessionParams = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: toLineItems(cart),
      success_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:3000"}/checkout/cancel`,
      billing_address_collection: "auto",
      metadata: { source: "hellgate", customer_name: customer?.name || "" },
    };

    // Müşteri emaili varsa prefill et
    if (customer?.email) {
      sessionParams.customer_email = customer.email;
    }

    // Fiziksel ürün varsa kargo adresi iste
    if (hasPhysical) {
      sessionParams.shipping_address_collection = {
        allowed_countries: ["US", "CA", "GB", "DE", "NL", "FR", "IT", "ES", "TR"],
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    res.json({ id: session.id, url: session.url });
  } catch (e) {
    console.error("create-session error:", e);
    res.status(500).json({ error: "Checkout failed", detail: e?.message });
  }
});

// --- CONTACT ----------------------------------------------------------------
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required" });
  }
  // TODO: e-posta gönderimi (nodemailer / SendGrid) buraya eklenebilir
  console.log(`📬 Contact from ${name} <${email}>: ${message}`);
  res.json({ ok: true });
});

// --- 404 (EN SON!) ----------------------------------------------------------
app.use((_req, res) => res.status(404).json({ error: "Not Found" }));

// --- START ------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log("Stripe key present:", Boolean(process.env.STRIPE_SECRET_KEY));
});