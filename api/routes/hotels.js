import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getCountByCity,
  getCountByType,
  getHotel,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

//GET ALL
router.get("/", getAllHotels);
// GET Hotel
router.get("/find/:id", getHotel);
// GET ALL BY CITY
router.get("/countByCity", getCountByCity);
// GET ALL BY TYPE
router.get("/countByType", getCountByType);
//CREATE
router.post("/", verifyAdmin, createHotel);
// UPDATE
router.put("/find/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/find/:id", verifyAdmin, deleteHotel);

export default router;
