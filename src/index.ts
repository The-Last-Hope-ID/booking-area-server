import "module-alias/register"
import "dotenv/config"
import express from "express"
import { promises as fs } from "fs"
import path from "path"
import passport from "passport"
import errorMiddleware from "@/shared/lib/error-middleware"

import authModule from "@/app/auth/routes/auth.route"

const app = express()
const PORT = process.env.APP_PORT || 3000

const modulesDir = path.join(__dirname, "app")

;(async () => {
  const modules = await fs.readdir(modulesDir)
  for (const module of modules) {
    const routesPath = path.join(modulesDir, module, "routes")
    try {
      const routeFiles = await fs.readdir(routesPath)
      for (const file of routeFiles) {
        const { default: route } = await import(path.join(routesPath, file))
        app.use(`/${module}`, route)
      }
    } catch (err: any) {
      throw new Error(`Error loading module ${module}: ${err.message}`)
    }
  }
})()

app.use(express.json())

app.use(passport.initialize())

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use("/auth", authModule)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
