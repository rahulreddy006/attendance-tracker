import express from "express";

const router = express.Router();

import {getAllStudents,createStudent,deleteStudent} from "../controllers/student.js";


router.post("/",createStudent);
router.get("/",getAllStudents);
router.delete("/:id",deleteStudent);

export default router;