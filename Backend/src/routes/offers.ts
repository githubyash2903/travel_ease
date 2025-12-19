import { Router } from "express";
import {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../controllers/offers.controller";
import { adminAuth } from "../middlewares/adminAuth";

const router = Router();

/* Public */
router.get("/", getOffers);

/* Admin */
router.post("/admin/offers", adminAuth, createOffer);
router.put("/admin/offers/:id", adminAuth, updateOffer);
router.delete("/admin/offers/:id", adminAuth, deleteOffer);

export default router;
