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
    origin: ["https://car-management-system-spyne.vercel.app", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    optionSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization","auth-token"], // Allowed headers
};
app.use(cors(corsOptions));
// Ensure the backend includes credentials in the response headers
app.options("*", (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin); // Dynamically respond based on origin
    res.setHeader("Access-Control-Allow-Origin", "https://car-management-system-spyne.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization,auth-token");
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials in response
    res.sendStatus(200);
});
app.use(express.json());

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
