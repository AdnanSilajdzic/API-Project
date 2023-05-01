import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use("/api/weather", weatherRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
