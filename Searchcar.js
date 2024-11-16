const express = require("express");
const Car = require("./Carschema");
const fetchuser = require("./middleware");

const router = express.Router();

// Search cars based on title, tags, or description
router.get("/searchCars", fetchuser, async (req, res) => {
    const {query} = req.query;

    if (!query) {
        return res.status(400).json({error: "Search query is required."});
    }

    try {
        const userCars = await Car.find({
            user: req.user.id,
            $or: [
                {title: {$regex: query, $options: "i"}},
                {description: {$regex: query, $options: "i"}},
                {tags: {$regex: query, $options: "i"}},
            ],
        });

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
