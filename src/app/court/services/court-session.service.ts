import { validate } from "@/shared/lib/utils"
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

  const courtSession = await db.courtSession.create({
    data: {
      courtId,
      startHour: payload.startHour,
      endHour: payload.endHour,
    },
  })

  return courtSession
}

export default {
  createSession,
}
