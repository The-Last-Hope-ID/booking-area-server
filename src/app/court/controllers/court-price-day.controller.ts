import { NextFunction, Request, Response } from "express"
import courtPriceDayService from "../services/court-price-day.service"

const getPriceDays = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await courtPriceDayService.getPriceDays(Number(req.params.courtId))

    res.status(200).json({
      status: 200,
      message: "OK",
      data,
    })
  } catch (e) {
    next(e)
  }
}

const updatePriceDay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await courtPriceDayService.updatePriceDay(Number(req.params.priceDayId), req.body)

    res.status(200).json({
      status: 200,
      message: "OK",
      data,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  getPriceDays,
  updatePriceDay,
}
