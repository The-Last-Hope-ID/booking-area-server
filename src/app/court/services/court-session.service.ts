import { ResponseError, validate } from "@/shared/lib/utils"
import courtSessionValidation from "../validations/court-session.validation"
import { CourtSessionStatus } from "@/shared/enums"
import db from "@/config/db"

const getSessionPagination = async (
  courtId: number,
  req: {
    page?: number
    perPage?: number
  },
) => {
  const { page = 1, perPage = 10 } = req

  const courtSessions = await db.courtSession.findMany({
    where: {
      courtId,
    },
    skip: (Number(page) - 1) * Number(perPage),
    take: Number(perPage),
  })
  const totalRecords = await db.courtSession.count({
    where: {
      courtId: courtId,
    },
  })
  const totalPages = Math.ceil(totalRecords / Number(perPage))

  return {
    data: courtSessions,
    meta: {
      page: Number(page),
      perPage: Number(perPage),
      totalPages,
    },
  }
}

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
  getSessionPagination,
  createSession,
  updateSession,
  deleteSession,
}
