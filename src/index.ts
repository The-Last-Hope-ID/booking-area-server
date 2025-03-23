import "module-alias/register"
import "dotenv/config"
import express from "express"
import path from "path"
import passport from "passport"
import errorMiddleware from "@/shared/lib/error-middleware"
import fileUpload from "express-fileupload"

import authModule from "@/app/auth"
import courtModule from "@/app/court"
import bookingModule from "@/app/booking"
import settingModule from "@/app/setting"
import userModule from "@/app/user"
import roleModule from "@/app/role"

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
app.use("/bookings", bookingModule)
app.use("/setting", settingModule)
app.use("/users", userModule)
app.use("/roles", roleModule)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
