import { Router } from "express";
import { logOutUser, loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

/// here we ahev to inject the middle ware
const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
]),registerUser)


// Login Route
router.route("/login").post(loginUser)

// Secured Route
router.route("/logout").post(verifyJWT,logOutUser)




export default router 