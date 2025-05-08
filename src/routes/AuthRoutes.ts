import { Router } from "express"

// Auth controller
import { login, register } from "../controllers/AuthController"

const AuthRoutes = Router()

AuthRoutes.post("/login", login)
AuthRoutes.post("/register", register)

export default AuthRoutes