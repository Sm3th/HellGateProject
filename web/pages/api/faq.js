const BACKEND = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";
const TARGET = `${BACKEND}/api/faq`;

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const r = await fetch(TARGET);
      const data = await r.json();
      return res.status(r.status).json(data);
    }
    if (req.method === "POST") {
      const r = await fetch(TARGET, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body || {}),
      });
      const data = await r.json();
      return res.status(r.status).json(data);
    }
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    console.error("Proxy error (faq):", e);
    return res.status(500).json({ error: "Proxy failed" });
  }
}