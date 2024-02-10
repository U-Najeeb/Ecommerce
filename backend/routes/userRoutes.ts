import express from "express"
import { deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController"

const userRouter = express.Router()

userRouter.route("/").get(getAllUsers)

userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser)
export default userRouter