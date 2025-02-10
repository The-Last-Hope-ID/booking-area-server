import { User } from "@/shared/types"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const generateHashedPassword = (password: string) => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(password, salt)

  return hashedPassword
}

export const generateAccessToken = (user: User | null) => {
  const jwtSecret = process.env.JWT_SECRET || ""

  return jwt.sign({ id: user?.id, email: user?.email }, jwtSecret, { expiresIn: "1h" })
}
