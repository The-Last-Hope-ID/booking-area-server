import db from "@/config/db"
import { validate } from "@/shared/lib/utils"
import courtPriceDayValidation from "../validations/court-price-day.validation"

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

const updatePriceDay = async (courtPriceDayId: number, data: { price: number; downPayment: number }) => {
  const payload = validate(courtPriceDayValidation.updatePriceDaySchema, data)

  const priceDay = await db.courtPriceDay.findUnique({
    where: {
      id: courtPriceDayId,
    },
  })

  if (!priceDay) {
    throw new Error("Price day not found")
  }

  const updatePriceDay = await db.courtPriceDay.update({
    where: {
      id: courtPriceDayId,
    },
    data: {
      price: payload.price,
      downPayment: payload.downPayment,
    },
  })

  return updatePriceDay
}

const deleteAllPriceDays = async (courtId: number) => {
  const court = await db.court.findUnique({
    where: {
      id: courtId,
    },
  })

  if (!court) {
    throw new Error("Court not found")
  }

  const priceDays = await db.courtPriceDay.deleteMany({
    where: {
      courtId,
    },
  })

  return priceDays
}

export default {
  generatePriceDays,
  updatePriceDay,
  deleteAllPriceDays,
}
