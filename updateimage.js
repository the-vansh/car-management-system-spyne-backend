const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Car = require("./Carschema");
const fetchuser = require("./middleware");

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {fileSize: 5 * 1024 * 1024},
}).array("images", 10); //

// Initialize Express Router
const router = express.Router();

// Route to update car images
router.put("/updateCarImage/:id", fetchuser, upload, async (req, res) => {
    const carId = req.params.id;

    try {
        // Check if the car ID is valid
        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({error: "Invalid car ID."});
        }

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({error: "Car not found."});
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({error: "No images uploaded."});
        }

        const imageBuffers = req.files.map((file) => file.buffer);

        car.images = imageBuffers;

        await car.save();

        res.status(200).json({
            message: "Car images updated successfully.",
            updatedCar: car,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error while updating the car image."});
    }
});

module.exports = router;
