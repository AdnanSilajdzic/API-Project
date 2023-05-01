import express from "express";
import currentWeatherController from "../controllers/currentWeatherController";
import weatherForecastController from "../controllers/weatherForecastController";
const router = express.Router();

router.post("/current", currentWeatherController);
router.post("/forecast", weatherForecastController);
router.post("/history", (req, res) => res.send("history weather"));

export default router;
