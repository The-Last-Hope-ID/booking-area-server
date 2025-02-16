import db from "@/config/db"
import courtUnavailableValidation from "../validations/court-unavailable.validation"
import { ResponseError, validate } from "@/shared/lib/utils"

const createUnvailableSessionCourt = async (courtId: number, date: string) => {
  const payload = validate(courtUnavailableValidation.courtUnavailableSchema, { date })

  const courtSession = await db.court.findUnique({
    where: {
      id: courtId,
    },
  })

  if (!courtSession) {
    throw new Error("Court session not found")
  }

  const courtSessionUnavailableAlreadyExists = await db.courtUnavailable.findFirst({
    where: {
      courtId,
      date: {
        equals: new Date(payload.date.split("T")[0]),
      },
    },
  })

  if (courtSessionUnavailableAlreadyExists) {
    throw new Error("Court session unavailable already exists")
  }

  const courtSessionUnavailable = await db.courtUnavailable.create({
    data: {
      courtId,
      date,
    },
  })

  return courtSessionUnavailable
}

const updateUnvailableSessionCourt = async (unaviableId: number, date: string) => {
  const payload = validate(courtUnavailableValidation.courtUnavailableSchema, { date })

  const courtSessionUnavailable = await db.courtUnavailable.findUnique({
    where: {
      id: unaviableId,
    },
  })

  if (!courtSessionUnavailable) {
    throw new Error("Court session unavailable not found")
  }

  const courtSessionUnavailableAlreadyExists = await db.courtUnavailable.findFirst({
    where: {
      NOT: {
        id: unaviableId,
      },
      courtId: courtSessionUnavailable.courtId,
      date: {
        equals: new Date(payload.date.split("T")[0]),
      },
    },
  })

  if (courtSessionUnavailableAlreadyExists) {
    throw new ResponseError(400, "Court session unavailable already exists")
  }

  const updatedCourtSessionUnavailable = await db.courtUnavailable.update({
    where: {
      id: unaviableId,
    },
    data: {
      date,
    },
  })

  return updatedCourtSessionUnavailable
}

const deleteUnvailableSessionCourt = async (unaviableId: number) => {
  const courtSessionUnavailable = await db.courtUnavailable.findUnique({
    where: {
      id: unaviableId,
    },
  })

  if (!courtSessionUnavailable) {
    throw new Error("Court session unavailable not found")
  }

  const sessionUnavailable = await db.courtUnavailable.delete({
    where: {
      id: unaviableId,
    },
  })

  return sessionUnavailable
}

export default {
  createUnvailableSessionCourt,
  updateUnvailableSessionCourt,
  deleteUnvailableSessionCourt,
}
