import "module-alias/register"
import express from "express"
import { promises as fs } from "fs"
import path from "path"

const app = express()

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

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`)
})
