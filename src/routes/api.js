import express from "express";
import UserController from "../controllers/user-controller.js"
import {authMiddleware} from "../middleware/auth-middleware.js";

const userRouter = new express.Router()
userRouter.use(authMiddleware)
userRouter.get('/api/users/current', UserController.get)

export {
    userRouter
}