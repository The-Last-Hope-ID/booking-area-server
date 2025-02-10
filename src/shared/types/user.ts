import { Prisma } from "@prisma/client"

const user = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { role: true },
  omit: { password: true },
})

export type User = Prisma.UserGetPayload<typeof user>
