const BACKEND = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

export default async function handler(req, res) {
  const { id } = req.query;
  const TARGET = `${BACKEND}/api/tickets/${id}`;

  try {
    if (req.method === "DELETE") {
      const r = await fetch(TARGET, { method: "DELETE" });
      const data = await r.json();
      return res.status(r.status).json(data);
    }
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    console.error("Proxy error (tickets delete):", e);
    res.status(500).json({ error: "Proxy failed" });
  }
}
