// server.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// TEST verisi
const lineup = [
  { time: "22:00", artist: "DJ Inferno" },
  { time: "23:30", artist: "Dark Pulse" },
  { time: "01:00", artist: "Hellraiser" },
  { time: "02:30", artist: "Acid Queen" }
];

// API endpoint
app.get("/api/lineup", (req, res) => {
  res.json(lineup);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/** In-memory Tickets */
let tickets = [
  { id: 1, type: "Early Bird", price: 25, currency: "EUR", available: true },
  { id: 2, type: "General Admission", price: 35, currency: "EUR", available: true },
  { id: 3, type: "Backstage", price: 60, currency: "EUR", available: false }
];

app.get("/api/tickets", (_req, res) => {
  res.json(tickets);
});

app.post("/api/tickets", (req, res) => {
  const { type, price, currency = "EUR", available = true } = req.body || {};
  if (!type || price == null) return res.status(400).json({ error: "type and price are required" });
  const newTicket = { id: Date.now(), type, price: Number(price), currency, available: Boolean(available) };
  tickets.push(newTicket);
  res.json(newTicket);
});

app.delete("/api/tickets/:id", (req, res) => {
  const { id } = req.params;
  tickets = tickets.filter(t => String(t.id) !== String(id));
  res.json({ message: "Deleted" });
});

/** In-memory FAQ */
let faqs = [
  { id: 1, q: "Age restriction?", a: "18+ only. ID check at the gate." },
  { id: 2, q: "When is the location revealed?", a: "48 hours before the event." },
  { id: 3, q: "Refund policy?", a: "All sales are final unless the event is cancelled." }
];

app.get("/api/faq", (_req, res) => {
  res.json(faqs);
});

app.post("/api/faq", (req, res) => {
  const { q, a } = req.body || {};
  if (!q || !a) return res.status(400).json({ error: "q and a are required" });
  const newFaq = { id: Date.now(), q, a };
  faqs.push(newFaq);
  res.json(newFaq);
});

app.delete("/api/faq/:id", (req, res) => {
  const { id } = req.params;
  faqs = faqs.filter(f => String(f.id) !== String(id));
  res.json({ message: "Deleted" });
});

