import hotel from "../models/hotel.js";
import Room from "../models/room.js";
import createError from "../utils/create-error.js";

export const createRoom = async (req, res, next) => {
  const { hotelID } = req.params;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await hotel.findByIdAndUpdate(hotelID, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const Rooms = await Room.find();
    res.status(200).json(Rooms);
  } catch (error) {
    next(error);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const Rooms = await Room.findById(req.params.id);
    res.status(200).json(Rooms);
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  const { hotelID } = req.params;
  try {
    await Room.findByIdAndDelete(req.params.id);
   try {
    await hotel.findByIdAndUpdate(hotelID, {
      $pull: { rooms: req.params.id },
    })
   } catch (error) {
    
   }
  } catch (error) {
    next(error);
  }
};
