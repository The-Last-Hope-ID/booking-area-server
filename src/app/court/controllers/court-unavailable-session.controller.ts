import { NextFunction, Request, Response } from "express"
import courtUnavailableService from "../services/court-unavailable.service"

const createUnvailableCourt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await courtUnavailableService.createUnvailableSessionCourt(Number(req.params.sessionId), req.body.date)

    res.status(201).json({
      status: 201,
      message: "Created",
      data,
    })
  } catch (e) {
    next(e)
  }
}

export default {
  createUnvailableCourt,
}
