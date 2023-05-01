import express from "express";
import currentWeatherController from "../controllers/currentWeatherController";
import weatherForecastController from "../controllers/weatherForecastController";
import weatherHistoryController from "../controllers/weatherHistoryController";
const router = express.Router();

router.post("/current", currentWeatherController);
router.post("/forecast", weatherForecastController);
router.post("/history", weatherHistoryController);

export default router;
