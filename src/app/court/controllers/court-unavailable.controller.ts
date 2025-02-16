import { NextFunction, Request, Response } from "express"
import courtUnavailableService from "../services/court-unavailable.service"

const createUnvailableCourt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await courtUnavailableService.createUnvailableSessionCourt(Number(req.params.courtId), req.body.date)

    res.status(201).json({
      status: 201,
      message: "Created",
      data,
    })
  } catch (e) {
    next(e)
  }
}

const updateUnvailableCourt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await courtUnavailableService.updateUnvailableSessionCourt(Number(req.params.unavailableId), req.body.date)

    res.status(200).json({
      status: 200,
      message: "OK",
      data,
    })
  } catch (e) {
    next(e)
  }
}

const deleteUnvailableCourt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await courtUnavailableService.deleteUnvailableSessionCourt(Number(req.params.unavailableId))

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
  createUnvailableCourt,
  updateUnvailableCourt,
  deleteUnvailableCourt,
}
