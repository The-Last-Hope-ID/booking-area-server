import db from "@/config/db"

const generatePriceDays = async (courtId: number) => {
  const court = await db.court.findUnique({
    where: {
      id: courtId,
    },
  })

  if (!court) {
    throw new Error("Court not found")
  }

  const priceDays = await db.courtPriceDay.createMany({
    data: [
      { courtId, dayCode: "1", price: 0 },
      { courtId, dayCode: "2", price: 0 },
      { courtId, dayCode: "3", price: 0 },
      { courtId, dayCode: "4", price: 0 },
      { courtId, dayCode: "5", price: 0 },
      { courtId, dayCode: "6", price: 0 },
      { courtId, dayCode: "7", price: 0 },
    ],
  })

  return priceDays
}

export default {
  generatePriceDays,
}
