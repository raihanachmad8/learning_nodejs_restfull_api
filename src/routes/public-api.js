import express from "express";
import UserController from "../controllers/user-controller.js"

const publicRouter = new express.Router()
publicRouter.post('/api/users', UserController.register)

export {
    publicRouter
}