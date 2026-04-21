import express from "express";

const router = express.Router();

import { auth } from "../middleware/auth.js";

import {getAllStudents,createStudent,deleteStudent} from "../controllers/student.js";


router.post("/",auth,createStudent);
router.get("/",getAllStudents);
router.delete("/:id",auth,deleteStudent);

export default router;