import express from "express";
import UserController from "../controllers/user-controller.js"
import {authMiddleware} from "../middleware/auth-middleware.js";
import ContactController from "../controllers/contact-controller.js";

const userRouter = new express.Router()
userRouter.use(authMiddleware)

// User API
userRouter.get('/api/users/current', UserController.get)
userRouter.patch('/api/users/current', UserController.update)
userRouter.delete('/api/users/logout', UserController.logout)

// Contact API
userRouter.post('/api/contacts', ContactController.create)
userRouter.get('/api/contacts/:contactId', ContactController.get)
userRouter.put('/api/contacts/:contactId', ContactController.update)
userRouter.delete('/api/contacts/:contactId', ContactController.remove)
userRouter.get('/api/contacts', ContactController.search)

export {
    userRouter
}