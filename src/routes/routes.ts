import { Router, Request, Response } from "express";
import cors from "cors"

import AuthRoutes from "./AuthRoutes";
import ConversionRoutes from "./ConversionRoutes";
import FavoritesRoutes from "./FavoritesRoutes";

const routes = Router();

// Home
routes.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Bem vindo ao cripto cambio!",
  });
});

// Auth
routes.use("/auth", AuthRoutes);

// Conversion
routes.use(ConversionRoutes);

// Favorites
routes.use(FavoritesRoutes)

export default routes;
