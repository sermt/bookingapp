import hotel from "../models/hotel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllHotels = async (req, res, next) => {
  try {
    const { min, max, limit, ...others } = req.query;
    const hotels = await hotel
      .find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 9999 } })
      .limit(limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const getCountByCity = async (req, res, next) => {
  try {
    const cities = req.query.cities.split(",");
    const list = await Promise.all(
      cities.map((city) => {
        return hotel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getCountByType = async (req, res, next) => {
  try {
    const hotelCount = await hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotel.countDocuments({ type: "apartment" });
    const resortCount = await hotel.countDocuments({ type: "resort" });
    const villaCount = await hotel.countDocuments({ type: "villa" });
    const cabinCount = await hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotels = await hotel.findById(req.params.id);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted...");
  } catch (error) {
    next(error);
  }
};
