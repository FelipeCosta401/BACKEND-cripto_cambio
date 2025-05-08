import { Request } from "express";
import { PrismaClient } from "@prisma/client";

import CoinGekkoService from "./CoinGekkoService";
import DateUtils from "../utils/DateUtils";
import {
  ConversionRequestInterface,
  NewConversionInterface,
} from "../types/ConversionsInterface";
import { AppError } from "../exceptions/AppException";

export default class ConversionService {
  private db = new PrismaClient();
  private coinGekkoService = new CoinGekkoService();

  async calculateConversion(req: Request) {
    this.validateRequestedFields(req);

    const { coinAmount, coinId }: ConversionRequestInterface = req.body

    const { brlCurrency, usdCurrency } =
      await this.coinGekkoService.getCoinValue(coinId);

    const convertedValues = {
      BRL: coinAmount * brlCurrency,
      USD: coinAmount * usdCurrency,
    };

    return await this.saveConversion(
      {
        coinAmount,
        coinName: coinId,
        convertedValueBRL: convertedValues.BRL,
        convertedValueUsd: convertedValues.USD,
      },
      req.user?.id
    );
  }

  async getConversionsByUserId(id?: number) {
    if (!id) throw new AppError("Erro ao buscar conversões!", 500)
    const conversions = await this.db.conversion.findMany({
      where: {
        userId: id
      }
    })

    const conversionListWithCorrectDate: any = []

    conversions.forEach((conversion) => {
      conversionListWithCorrectDate.push({
        ...conversion,
        convertedValueBRL: conversion.convertedValueBRL.toNumber(),
        convertedValueUsd: conversion.convertedValueUsd.toNumber(),
        createdAt: DateUtils.toBRT(conversion.createdAt)
      })
    })

    return conversionListWithCorrectDate

  }

  private async saveConversion(conversion: NewConversionInterface, userId?: number) {
    if (!userId) throw new AppError("Erro ao armazenar conversão!", 500)

    const { createdAt: wrongDateTime, convertedValueBRL, convertedValueUsd, ...resto } = await this.db.conversion.create({
      data: {
        ...conversion,
        userId
      }
    })

    return {
      ...resto,
      convertedValueBRL: convertedValueBRL.toNumber(),
      convertedValueUsd: convertedValueUsd.toNumber(),
      createdAt: DateUtils.toBRT(wrongDateTime)
    }

  }

  private validateRequestedFields(fields: Request) {
    if (!fields.body) throw new AppError("Informe a moeda e a quantidade corretamente!")

    const { coinAmount, coinId }: ConversionRequestInterface = fields.body

    if (!coinAmount)
      throw new AppError("Informe a quantidade a ser convertida!", 422);
    if (!coinId)
      throw new AppError("Informe a moeda a ser convertida!", 422);

    return;
  }
}
