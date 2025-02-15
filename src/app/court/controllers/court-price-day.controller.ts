import { NextFunction, Request, Response } from "express"
import courtPriceDayService from "../services/court-price-day.service"

const updatePriceDay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await courtPriceDayService.updatePriceDay(Number(req.params.dayId), req.body)

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
  updatePriceDay,
}
