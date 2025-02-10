import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import db from "@/config/db"
import bcrypt from "bcrypt"
import { generateHashedPassword } from "./utils"

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { phone, name, username: usernameBody } = req.body

        const user = await db.user.create({
          data: {
            name: name,
            username: usernameBody,
            email: username,
            password: generateHashedPassword(password),
            phone: phone,
          },
        })

        return done(null, user)
      } catch (err) {
        done(err)
      }
    },
  ),
)

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      const user = await db.user.findUnique({
        where: { email: username },
        include: { role: true },
      })

      if (!user) {
        done(null, false, { message: "Unathorized" })
        return
      }

      if (user.emailVerified) {
        done(null, false, { message: "Unathorized" })
        return
      }

      if (user && !(await bcrypt.compare(password, user.password))) {
        done(null, false, { message: "Unathorized" })
        return
      }

      done(null, user)
    },
  ),
)
