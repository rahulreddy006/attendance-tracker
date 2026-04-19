import Student from "../models/student.js"


export const createStudent = async(req,res)=>{
    try {
        const {name,rollNo,department,section} = req.body;
        const newStudent = new Student({
            name,rollNo,department,section
        });
        await newStudent.save();
        res.status(201).json({
            success:true,
            message:"Student created Successfully",
            data:newStudent
        });
    } catch (error) {
        if(error.code === 11000){
           return  res.status(400).json({
                success:false,
                message:"rollNo already exists"
            });
        }else if(error.name === "ValidationError"){
           return  res.status(400).json({message:error.message});
        }else{
           return res.status(500).json({message:"Internal server error"});
        }
    }
}

export const getAllStudents = async(req,res)=>{
    try {
        const students = await Student.find();
        res.status(200).json({
            success:true,
            count:students.length,
            data:students
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"failed to fetch the details"
        })
    }
}

export const deleteStudent = async(req,res)=>{
    try {
        const id = req.params.id;

       const student = await Student.findByIdAndDelete(id);
       if(!student){
        return res.status(404).json({
            success:false,
            message:"Student not found"
        })
       }
        res.status(200).json({
            success:true,
            message:"Student deleted succesfully"
        });
    } catch (error) {
        if(error.name === "CastError"){
            return res.status(400).json({
                success:false,
                message:"Id does not exits"
            })
        }
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
