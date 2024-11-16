const express = require("express");
const router = express.Router();
const Car = require("./Carschema");
const fetchuser = require("./middleware");
const mongoose = require("mongoose");

// Update car details
// Update car details
router.put("/updateCar/:id", fetchuser, async (req, res) => {
    const carId = req.params.id;
    const {title, description, tags} = req.body;

    console.log(carId);
    console.log(title);

    // Validate the input data
    if (!carId) {
        return res.status(400).json({error: "Car ID is required."});
    }

    if (!title || !description || !tags) {
        return res.status(400).json({error: "All fields (title, description, tags) are required."});
    }

    const tagsArray = Array.isArray(tags) ? tags : tags.split(",").map((tag) => tag.trim());

    try {
        if (!mongoose.Types.ObjectId.isValid(carId)) {
            console.log(carId);
            return res.status(400).json({error: "Invalid car ID."});
        }

        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            {title, description, tags: tagsArray}, // Ensure tags are saved as an array
            {new: true} // This option ensures the updated document is returned
        );

        if (!updatedCar) {
            return res.status(404).json({error: "Car not found."});
        }

        res.json({
            message: "Car details updated successfully!",
            updatedCar, // Send the updated car object back to the frontend
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to update car details."});
    }
});

module.exports = router;
