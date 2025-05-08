import { Request } from "express"

import { PrismaClient } from "@prisma/client"

import { AppError } from "../exceptions/AppException";

export default class FavoriteService {
    private db = new PrismaClient()

    async handleFavoriteCoin(req: Request) {
        const { body, user } = req

        this.validateRequestedFields(req)

        if (!user?.id) throw new AppError("Erro ao favoritar moeda!", 500)

        const isCoinAlreadyFavorited = await this.isCoinAlreadyFavorited(body.coinSymbol, user.id)

        if (!isCoinAlreadyFavorited) {
            await this.db.favoritesCoins.create({
                data: {
                    coinSymbol: body.coinSymbol,
                    userId: user.id
                }
            })
        } else {
            await this.db.favoritesCoins.deleteMany({
                where: {
                    userId: user.id,
                    coinSymbol: body.coinSymbol,
                },
            });
        }

        return this.getFavoritesCoinsByUser(user.id)
    }

    async getFavoritesCoinsByUser(userId?: number) {
        if (!userId) throw new AppError("Erro ao carregar lista de moedas favoritas!", 500)
        return this.db.favoritesCoins.findMany({
            where: {
                userId
            }
        })
    }

    private async isCoinAlreadyFavorited(coinSymbol: string, userId: number) {
        const coinFound = await this.db.favoritesCoins.findFirst({
            where: {
                userId,
                coinSymbol,
            },
        });

        return !!coinFound;
    }

    private validateRequestedFields(req: Request){
        if(!req.body || !req.body.coinSymbol) throw new AppError("Informe a moeda a ser favoritada!", 422) 
    }
}