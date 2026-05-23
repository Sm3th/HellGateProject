import { Router } from "express";
const router = Router();

let faqs = [
  { id: 1, q: "Age restriction?",           a: "18+ only. ID check at the gate." },
  { id: 2, q: "When is location revealed?", a: "48 hours before the event." },
  { id: 3, q: "Refund policy?",             a: "All sales are final unless cancelled." }
];

// GET /api/faq
router.get("/", (_req, res) => res.json(faqs));

// POST /api/faq
router.post("/", (req, res) => {
  const { q, a } = req.body || {};
  if (!q || !a) return res.status(400).json({ error: "q and a are required" });
  const item = { id: Date.now(), q, a };
  faqs.push(item);
  res.json(item);
});

// DELETE /api/faq/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  faqs = faqs.filter(f => String(f.id) !== String(id));
  res.json({ message: "Deleted" });
});

export default router;
