export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const response = await fetch(`${backendUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  res.status(response.status).json(data);
}
