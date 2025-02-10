import passport from "passport"

const googleAuth = () => passport.authenticate("google", { scope: ["profile", "email"] })
const googleAuthCallback = () => passport.authenticate("google", { scope: ["profile", "email"], failureRedirect: "/auth/google", session: false })

export default {
  googleAuth,
  googleAuthCallback,
}
