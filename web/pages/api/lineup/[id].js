// Next.js API Route (dinamik) -> Backend'e proxy (DELETE)
const BACKEND = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

export default async function handler(req, res) {
  const { id } = req.query;
  const TARGET = `${BACKEND}/api/lineup/${id}`;

  try {
    if (req.method === "DELETE") {
      const r = await fetch(TARGET, { method: "DELETE" });
      const data = await r.json();
      return res.status(r.status).json(data);
    }

    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (e) {
    console.error("Proxy error (DELETE):", e);
    return res.status(500).json({ error: "Proxy failed" });
  }
}
