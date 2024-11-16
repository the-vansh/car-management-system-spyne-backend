// routes/carRoute.js
const express = require("express");
const Car = require("./Carschema");
const fetchuser = require("./middleware");

const router = express.Router();

router.get("/userCars", fetchuser, async (req, res) => {
    try {
        const userCars = await Car.find({user: req.user.id});

        // Convert images (if stored as Buffer) to base64
        const carsWithBase64Images = userCars.map((car) => ({
            ...car._doc,
            images: car.images.map((image) => image.toString("base64")), // Convert Buffer to base64
        }));

        res.status(200).json({success: true, cars: carsWithBase64Images});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Server Error"});
    }
});

module.exports = router;
