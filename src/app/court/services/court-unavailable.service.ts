import db from "@/config/db"

const createUnvailableSessionCourt = async (courtSessionId: number, date: string) => {
  const courtSession = await db.courtSession.findUnique({
    where: {
      id: courtSessionId,
    },
  })

  if (!courtSession) {
    throw new Error("Court session not found")
  }

  const courtSessionUnavailableAlreadyExists = await db.courtSessionUnavailable.findFirst({
    where: {
      courtSessionId,
      date,
    },
  })

  if (courtSessionUnavailableAlreadyExists) {
    throw new Error("Court session unavailable already exists")
  }

  const courtSessionUnavailable = await db.courtSessionUnavailable.create({
    data: {
      courtSessionId,
      date,
    },
  })

  return courtSessionUnavailable
}

export default {
  createUnvailableSessionCourt,
}
