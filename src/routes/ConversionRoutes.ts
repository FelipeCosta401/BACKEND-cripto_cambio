import { Router } from "express";

import { converter, getConversionByUser } from "../controllers/ConversionController";
import authMiddleware from "../middlewares/authMiddleware";

const ConversionRoutes = Router();

ConversionRoutes.use(authMiddleware);

ConversionRoutes.post("/convert", converter);

ConversionRoutes.get("/conversions", getConversionByUser)

export default ConversionRoutes;
