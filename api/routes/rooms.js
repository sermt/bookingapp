import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verify.js';

const router=express.Router();

//GET ALL
router.get("/", getAllRooms);
// GET Room
 router.get("/:id", getRoom);
//CREATE
router.post("/",verifyAdmin, createRoom);
// UPDATE
router.put("/:id",verifyAdmin, updateRoom);
//DELETE
router.delete("/:id",verifyAdmin, deleteRoom);

export default router;