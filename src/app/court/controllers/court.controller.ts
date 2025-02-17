import { NextFunction, Request, Response } from "express"
import courtService from "../services/court.service"
import courtPriceDayService from "../services/court-price-day.service"

const getCourts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await courtService.getCourtsPagination(req)

    res.status(200).json({
      message: "OK",
      status: 200,
      ...data,
    })
  } catch (e) {
    next(e)
  }
}

const getCourt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courtId } = req.params
    const data = await courtService.getCourtById(Number(courtId))

    res.status(200).json({
      message: "OK",
      status: 200,
      data,
    })
  } catch (e) {
    next(e)
  }
}

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
    const { courtId } = req.params
    const court = await courtService.updateCourt(Number(courtId), {
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

const deleteCourt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { courtId } = req.params

    await courtPriceDayService.deleteAllPriceDays(Number(courtId))
    const data = await courtService.deleteCourt(Number(courtId))

    res.status(200).json({
      message: "OK",
      status: 200,
      data,
    })
  } catch (e) {
    next(e)
  }
}

export default { getCourts, getCourt, createCourt, updateCourt, deleteCourt }
