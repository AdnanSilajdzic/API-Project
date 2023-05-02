import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes";
import winston from "winston";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;

// Create a logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (body: any): Response<any, Record<string, any>> {
    logger.info(`Response: ${JSON.stringify(body)}`);
    return oldSend.call(res, body);
  };
  next();
});

app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
