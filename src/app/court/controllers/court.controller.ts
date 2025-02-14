import { NextFunction, Request, Response } from "express"
import courtService from "../services/court.service"
import courtPriceDayService from "../services/court-price-day.service"

const createCourt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const court = await courtService.createCourt({
      ...req.body,
      image: req.files?.image,
    })

    await courtPriceDayService.generatePriceDays(court.id)

    res.status(201).json({
      message: "Created",
      status: 201,
      data: court,
    })
  } catch (e) {
    next(e)
  }
}

const updateCourt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const court = await courtService.updateCourt(Number(id), {
      ...req.body,
      image: req.files?.image,
    })

    res.status(200).json({
      message: "OK",
      status: 200,
      data: court,
    })
  } catch (e) {
    next(e)
  }
}

export default { createCourt, updateCourt }
