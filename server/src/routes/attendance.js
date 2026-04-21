import express from "express"

const router = express.Router();
import { auth } from "../middleware/auth.js";

import { markAttendance,getAttendance,getAttendancePercentage } from "../controllers/attendance.js";

router.post("/",auth,markAttendance);
router.get("/",getAttendance);
router.get("/percentage/:studentId",getAttendancePercentage);

export default router;