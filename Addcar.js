const express = require("express");
const multer = require("multer");
const Car = require("./Carschema");
const fetchuser = require("./middleware");

const storage = multer.memoryStorage();
const upload = multer({storage});

const router = express.Router();

router.post("/addCar", fetchuser, upload.array("images", 10), async (req, res) => {
    try {
        const {title, description, tags} = req.body;
        const images = req.files;

        // Validate inputs
        if (!title || !description || !tags || tags.length === 0) {
            return res.status(400).json({error: "Please provide all required fields: title, description, and tags."});
        }

        if (images.length > 10) {
            return res.status(400).json({error: "You can upload up to 10 images only."});
        }

        const imageBuffers = images.map((file) => file.buffer);

        const newCar = new Car({
            user: req.user.id,
            title,
            description,
            tags,
            images: imageBuffers,
        });

        await newCar.save();
        res.status(201).json({message: "Car added successfully!", car: newCar});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Server Error"});
    }
});

module.exports = router;
