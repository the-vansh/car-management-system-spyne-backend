const express = require("express");
const Car = require("./Carschema");
const fetchuser = require("./middleware");

const router = express.Router();

router.delete("/deleteCar/:carId", fetchuser, async (req, res) => {
    try {
        const carId = req.params.carId;

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({error: "Car not found"});
        }

        // Check if the logged-in user is the owner of the car
        if (car.user.toString() !== req.user.id) {
            return res.status(401).json({error: "Unauthorized"});
        }

        // Delete the car
        await Car.findByIdAndDelete(carId);

        res.status(200).json({message: "Car deleted successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Server Error"});
    }
});

module.exports = router;
