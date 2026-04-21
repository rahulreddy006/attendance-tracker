import Attendance from "../models/attendance.js";

export const markAttendance = async(req,res)=>{
     try {
        const { date,department,section,records} = req.body;
        if(!date){
            return res.status(400).json({
                success:false,
                message:"Date is required"
            })
        }
        if(!department){
            return res.status(400).json({
                success:false,
                message:"department is required"
            })
        }
        if(!section){
            return res.status(400).json({
                success:false,
                message:"section is required"
            })
        }
        if(!records || !Array.isArray(records) || records.length === 0){
            return res.status(400).json({
                success:false,
                message:"records cannot be empty"
            })
        }

        const targetDate = new Date(date);
        targetDate.setHours(0,0,0,0);

        const pastAttendance = await Attendance.findOne({
            date:targetDate,
            section:section,
            department:department
        });

        if(pastAttendance){
            return res.status(400).json({
                success:false,
                message:"Attandance already marked"
            })
        }

        const isValidRecords = records.every( record => record.studentId && (typeof record.status === "boolean") !== undefined);

        if(!isValidRecords){
            return res.status(400).json({
                success:false,
                message:"Records must have studentId and Status"
            })
        }
        

        const newAttendance = await Attendance.create({
            date:targetDate,department,section,records
        });

        res.status(201).json({
            success:true,
            message:"Attendance marked successfully",
            data:newAttendance
        })
     } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({
                success:false,
                message:"Attendence already marked"
            })
        }else if(error.name === "ValidationError"){
            return res.status(400).json({
                success:false,
                message:"Records cannot be empty"
            })
        }else {
            return res.status(500).json({
                success:false,
                message:"Internal server error"
            })
        }
     }
}


export const getAttendance = async(req,res)=>{
    try {
        const {date,department,section}  = req.query;
        
        if(!date){
            return res.status(400).json({
                success:false,
                message:"Date is required"
            })
        }
        if(!department){
            return res.status(400).json({
                success:false,
                message:"department is required"
            })
        }
        if(!section){
            return res.status(400).json({
                success:false,
                message:"section is required"
            })
        }

        const targetDate = new Date(date);
        targetDate.setHours(0,0,0,0);

        const attendance = await Attendance.findOne({
            date:targetDate,
            department:department,
            section:section
        });

        if(!attendance){
            return res.status(404).json({
                success:false,
                message:"record not found"
            })
        }

        await attendance.populate("records.studentId" , "name rollNo");

        res.status(200).json({
            success:true,
            data:attendance
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export const getAttendancePercentage = async(req,res)=>{
    try {
        const {studentId} = req.params;
        const{department,section} = req.query;

        if(!studentId){
            return res.status(400).json({
                success:false,
                message:"Student Id is required"
            });
        }
        if(!department){
            return res.status(400).json({
                success:false,
                message:"department is required"
            })
        }
        if(!section){
            return res.status(400).json({
                success:false,
                message:"section is required"
            })
        }

        const attendanceDocs = await Attendance.find({
            department,
            section
        });

        const totalDays = attendanceDocs.length;

        if(totalDays === 0){
            return res.status(200).json({
                success:true,
                percentage:0,
                status:"LOW",
                requiredClasses:0
            })
        }

        let presentDays = 0;
        for(const doc of attendanceDocs){
            for(const record of doc.records){
                if(record.studentId.toString() === studentId && record.status === true){
                    presentDays++;
                }
            }
        }

        const percentage = (presentDays/totalDays)*100;

        if(percentage<75){
            let x = 0;
            while((presentDays+x)/(totalDays+x) < 0.75){
                x++
                if(x > 365){
                    break;
                }
            }
            return res.status(200).json({
            success:true,
            presentDays,
            totalDays,
            percentage:Number(percentage.toFixed(2)),
            status:"LOW",
            requiredClasses:x,
            message:`attend next ${x} classes to reach 75%`
        });
        }

        res.status(200).json({
            success:true,
            presentDays,
            totalDays,
            percentage:Number(percentage.toFixed(2)),
            status:"GOOD",
            requiredClasses:0
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}