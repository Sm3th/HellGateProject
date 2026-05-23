export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const backend = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const r = await fetch(`${backend}/api/checkout/create-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    console.error("Proxy error:", e);
    return res.status(500).json({ error: "Proxy failed" });
  }
}
