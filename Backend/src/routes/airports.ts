import { Router } from "express";
import airports from "../data/airports.json";

const router = Router();

router.get("/search", (req, res) => {
  const keyword = ((req.query.keyword as string) || "").trim().toLowerCase();

  if (keyword.length < 2) return res.json([]);

  // Matching airports
  const matched = airports.filter((a: any) => {
    const code = a.code?.toLowerCase() || "";
    const city = a.city?.toLowerCase() || "";
    const name = a.name?.toLowerCase() || "";

    return (
      code.includes(keyword) ||
      city.includes(keyword) ||
      name.includes(keyword)
    );
  });

  // Sorting priority:
  const sorted = matched.sort((a: any, b: any) => {
    const q = keyword;

    // 1. Exact code match (DEL → top)
    if (a.code.toLowerCase() === q) return -1;
    if (b.code.toLowerCase() === q) return 1;

    // 2. City starts with input
    const aStarts = a.city.toLowerCase().startsWith(q);
    const bStarts = b.city.toLowerCase().startsWith(q);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;

    return 0;
  });

  res.json(sorted.slice(0, 20));
});

export default router;
