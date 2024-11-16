const express = require("express");
const connectDB = require("./dbconnection");
const Loginroute = require("./Loginroute");
const signuproute = require("./signuproute");
const showcar = require("./ShowCars");
const Addcar = require("./Addcar");
const deletecar = require("./Deletecar");
const searchcar = require("./Searchcar");
const updatecardetail = require("./Updatedetail");
const updateImage = require("./updateimage");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: ["https://car-management-system-spyne.vercel.app/", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("*", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://car-management-system-spyne.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(204); // No Content
    } else {
        next();
    }
});

// Connect to MongoDB
connectDB();

app.post("/login", Loginroute);
app.post("/signup", signuproute);
app.post("/addCar", Addcar);
app.get("/userCars", showcar);
app.delete("/deleteCar/:carId", deletecar);
app.get("/searchCars", searchcar);
app.put("/updateCar/:id", updatecardetail);
app.put("/updateCarImage/:id", updateImage);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
