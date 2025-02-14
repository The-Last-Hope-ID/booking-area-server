import "module-alias/register"
import "dotenv/config"
import express from "express"
import path from "path"
import passport from "passport"
import errorMiddleware from "@/shared/lib/error-middleware"
import fileUpload from "express-fileupload"

import authModule from "@/app/auth"
import courtModule from "@/app/court"

const app = express()
const PORT = process.env.APP_PORT || 3000

app.use(express.json())
app.use(passport.initialize())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "..", "public", "temp"),
  }),
)

app.use("/auth", authModule)
app.use("/courts", courtModule)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
