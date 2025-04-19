import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import db from "@/config/db"
import { generateAccessToken, generateHashedPassword } from "@/app/auth/lib/utils"

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      if (!profile.emails || profile.emails.length === 0) return
      const email = profile.emails[0].value
      const isUserExist = await db.user.findFirst({
        where: { email, deletedAt: null },
      })

      if (!isUserExist) {
        const user = await db.user.create({
          data: {
            email,
            name: profile.displayName,
            username: profile.username || profile.displayName,
            emailVerified: true,
            password: generateHashedPassword(process.env.SESSION_SECRET + email),
            profileImg: profile.photos ? profile.photos[0].value : null,
            accessToken,
            refreshToken,
          },
        })
      }

      const user = await db.user.findFirst({
        where: { email },
        include: { role: true },
      })

      const token = generateAccessToken(user)

      await db.user.update({
        where: {
          id: user?.id,
        },
        data: {
          accessToken: token,
        },
      })

      return done(null, { user, token })
    },
  ),
)
