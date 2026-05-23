const BACKEND = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";
const TARGET = `${BACKEND}/api/tickets`;

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const response = await fetch(TARGET);
      const data = await response.json();
      return res.status(200).json(data);
    }
    if (req.method === "POST") {
      const response = await fetch(TARGET, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body || {}),
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    }
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
  } catch (error) {
    console.error("Proxy error (tickets):", error);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
}