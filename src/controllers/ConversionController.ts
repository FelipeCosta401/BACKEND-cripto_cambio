import { Request, Response } from "express";

import ConversionService from "../services/ConversionService";

const conversionService = new ConversionService();

async function converter(req: Request, res: Response) {
  const results = await conversionService.calculateConversion(req);

  res.status(200).json({
    message: "Conversão bem sucedida!",
    results,
  });
}

async function getConversionByUser(req: Request, res: Response){
  const conversionList = await conversionService.getConversionsByUserId(req.user?.id)
  res.status(200).json({
    message: "Conversões encontradas com sucesso!",
    conversions: conversionList
  })
}

export { converter, getConversionByUser };
