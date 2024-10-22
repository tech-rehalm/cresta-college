import express from "express";
import { 
    signup, 
    login, 
    logout, 
    checkAuth, 
    getAllUsers, 
    getUserById, 
    deleteUserById, 
    editUserById ,
    create
} from "../controllers/users.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/create", create);
router.post("/login", login);
router.post("/logout", logout);
router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.patch("/:id", editUserById);
router.post("/check-auth", verifyToken, checkAuth);

export default router;
