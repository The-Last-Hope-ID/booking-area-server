import express from "express"
import "@/app/auth/lib/passport-google"
import passport from "passport"

const router = express.Router()

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get(
  "/google/callback",
  passport.authenticate("google", { scope: ["profile", "email"], failureRedirect: "/auth/google", session: false }),
  (req, res) => {
    res.status(200).json(req.user)
  },
)

export default router
