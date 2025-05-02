import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()
import { generateHashedPassword } from "../src/app/auth/lib/utils"

async function main() {
  await db.permission.createMany({
    data: [
      { name: "create user" },
      { name: "update user" },
      { name: "view user" },
      { name: "delete user" },
      { name: "update setting" },
      { name: "view role" },
      { name: "detail role" },
      { name: "create role" },
      { name: "update role" },
      { name: "delete role" },
      { name: "view court" },
      { name: "create court" },
      { name: "update court" },
      { name: "delete court" },
      { name: "view court price days" },
      { name: "update court price days" },
      { name: "view court sessions" },
      { name: "create court sessions" },
      { name: "delete court sessions" },
      { name: "view court unavailables" },
      { name: "create court unavailables" },
      { name: "update court unavailables" },
      { name: "delete court unavailables" },
      { name: "view dashboard" },
    ],
  })

  await db.role.create({
    data: {
      name: "Superadmin",
      permissions: {
        createMany: {
          data: [
            { permissionId: 1 },
            { permissionId: 2 },
            { permissionId: 3 },
            { permissionId: 4 },
            { permissionId: 5 },
            { permissionId: 6 },
            { permissionId: 7 },
            { permissionId: 8 },
            { permissionId: 9 },
            { permissionId: 10 },
            { permissionId: 11 },
            { permissionId: 12 },
            { permissionId: 13 },
            { permissionId: 14 },
            { permissionId: 15 },
            { permissionId: 16 },
            { permissionId: 17 },
            { permissionId: 18 },
            { permissionId: 19 },
            { permissionId: 20 },
            { permissionId: 21 },
            { permissionId: 22 },
            { permissionId: 23 },
            { permissionId: 24 },
          ],
        },
      },
    },
  })

  await db.user.create({
    data: {
      name: "Pedrof",
      email: "pedrof@gmail.com",
      password: generateHashedPassword("password"),
      username: "pedrof",
      isAdmin: true,
      roleId: 1,
    },
  })
  await db.user.create({
    data: {
      name: "Ryan",
      email: "ryan@gmail.com",
      password: generateHashedPassword("password"),
      username: "ryan",
    },
  })
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async () => {
    await db.$disconnect()
    process.exit(1)
  })
