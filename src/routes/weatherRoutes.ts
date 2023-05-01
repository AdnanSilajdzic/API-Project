import express from "express";
import currentWeatherController from "../controllers/currentWeatherController";
const router = express.Router();

router.post("/current", currentWeatherController);
router.post("/forecast", (req, res) => res.send("forecast weather"));
router.post("/history", (req, res) => res.send("history weather"));

export default router;
