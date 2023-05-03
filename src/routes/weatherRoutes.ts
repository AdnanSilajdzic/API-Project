import express from "express";
import currentWeatherController from "../controllers/currentWeatherController";
import weatherForecastController from "../controllers/weatherForecastController";
import weatherHistoryController from "../controllers/weatherHistoryController";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const router = express.Router();

//Extended : https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Weather API",
      description: "Weather API Information",
      version: "1.0.0",
      contact: {
        name: "Adnan Silajdžić",
      },
      servers: ["http://localhost:4000"],
    },
  },
  // ['.routes/*.js']
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 *   /api/weather/current:
 *   post:
 *     description: Use to request current weather
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               example: Sarajevo
 *             password:
 *               type: string
 *               example: Password123
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/current", currentWeatherController);

/**
 * @swagger
 *   /api/weather/forecast:
 *   post:
 *     description: Use to request current weather
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               example: Sarajevo
 *             password:
 *               type: string
 *               example: Password123
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/forecast", weatherForecastController);

/**
 * @swagger
 *   /api/weather/history:
 *   post:
 *     description: Use to request current weather
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: request
 *         description: Request body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               example: Sarajevo
 *             password:
 *               type: string
 *               example: Password123
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/history", weatherHistoryController);

export default router;
