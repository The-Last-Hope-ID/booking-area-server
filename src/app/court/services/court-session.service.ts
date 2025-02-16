import { ResponseError, validate } from "@/shared/lib/utils"
import courtSessionValidation from "../validations/court-session.validation"
import { CourtSessionStatus } from "@/shared/enums"
import db from "@/config/db"

const createSession = async (
  courtId: number,
  data: {
    startHour: string
    endHour: string
    status: CourtSessionStatus
  },
) => {
  const payload = validate(courtSessionValidation.createCourtSessionSchema, data)

  const court = await db.court.findUnique({
    where: {
      id: courtId,
    },
  })

  if (!court) {
    throw new Error("Court not found")
  }

  const sessionAlreadyExists = await db.courtSession.findFirst({
    where: {
      courtId,
      startHour: payload.startHour,
      endHour: payload.endHour,
    },
  })

  if (sessionAlreadyExists) {
    throw new ResponseError(400, "Court session already exists")
  }

  const courtSession = await db.courtSession.create({
    data: {
      courtId,
      startHour: payload.startHour,
      endHour: payload.endHour,
      status: payload.status || CourtSessionStatus.AVAILABLE,
    },
  })

  return courtSession
}

const updateSession = async (
  sessionId: number,
  data: {
    startHour: string
    endHour: string
    status: CourtSessionStatus
  },
) => {
  const payload = validate(courtSessionValidation.updateCourtSessionSchema, data)

  const courtSession = await db.courtSession.findUnique({
    where: {
      id: sessionId,
    },
  })

  if (!courtSession) {
    throw new Error("Court session not found")
  }

  const sessionAlreadyExists = await db.courtSession.findFirst({
    where: {
      NOT: {
        id: sessionId,
      },
      courtId: courtSession.courtId,
      startHour: new Date(payload.startHour).toISOString(),
      endHour: new Date(payload.endHour).toISOString(),
    },
  })

  if (sessionAlreadyExists) {
    throw new ResponseError(400, "Court session already exists")
  }

  const updateCourtSession = await db.courtSession.update({
    where: {
      id: sessionId,
    },
    data: {
      startHour: payload.startHour,
      endHour: payload.endHour,
      status: payload.status || CourtSessionStatus.AVAILABLE,
    },
  })

  return updateCourtSession
}

const deleteSession = async (sessionId: number) => {
  const session = await db.courtSession.delete({
    where: {
      id: sessionId,
    },
  })

  return session
}

export default {
  createSession,
  updateSession,
  deleteSession,
}
