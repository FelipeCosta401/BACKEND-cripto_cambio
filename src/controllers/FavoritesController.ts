import { Request, Response } from "express"

import FavoriteService from "../services/FavoriteService"

const favoriteService = new FavoriteService()

async function handleFavoriteCoin(req: Request, res: Response){
    const updatedFavoritesCoinsList = await favoriteService.handleFavoriteCoin(req)
    res.status(200).json({ 
        message: "Lista de moedas favoritadas atualizada com sucesso!",
        updatedFavoritesCoinsList
     })
}   

async function getFavoritesCoinsList(req: Request, res: Response){
    const favoritesCoinsList = await favoriteService.getFavoritesCoinsByUser(req.user?.id)
    res.status(200).json({
        message: "Moedas favoritadas econtradas",
        favoritesCoinsList
    })
}

export { getFavoritesCoinsList, handleFavoriteCoin }