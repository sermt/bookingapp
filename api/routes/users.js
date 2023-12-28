import express from "express";
import { deleteUser, getAllUsers, updateUser } from "../controllers/user.js";
import {  verifyAdmin, verifyUser } from "../utils/verify.js";

const router = express.Router();

//GET ALL
router.get("/", verifyAdmin, getAllUsers);

// UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id/:hotelID", verifyUser, deleteUser);

export default router;
