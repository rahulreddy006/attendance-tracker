import express from "express"

const router = express.Router();

import { loginTeacher,registerTeacher } from "../controllers/teacher.js";

router.post("/signup",registerTeacher);
router.post("/login",loginTeacher);

export default router;