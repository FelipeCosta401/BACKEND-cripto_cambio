import { Router } from "express"

import authMiddleware from "../middlewares/authMiddleware"

import { getFavoritesCoinsList, handleFavoriteCoin } from "../controllers/FavoritesController"

const FavoritesRoutes = Router()

FavoritesRoutes.use(authMiddleware)

FavoritesRoutes.post("/favorites", handleFavoriteCoin)

FavoritesRoutes.get("/favorites", getFavoritesCoinsList)

export default FavoritesRoutes