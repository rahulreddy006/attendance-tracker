import Teacher from "../models/teacher.js";
import jwt from "jsonwebtoken"

export const registerTeacher = async(req,res)=>{
    try {
        const {name,email,password,confirmPassword,department} = req.body;
    if(!name){
        return res.status(400).json({
            success:false,
            message:"Name is required"
        });
    }
    if(!email){
        return res.status(400).json({
            success:false,
            message:"email is required"
        });
    }
    if(!password){
        return res.status(400).json({
            success:false,
            message:"password is required"
        });
    }
    if(!department){
        return res.status(400).json({
            success:false,
            message:"department is required"
        });
    }
    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password is mismatched"
        });
    }
    const exitsing = await Teacher.findOne({email});

    if(exitsing){
        return res.status(400).json({
            success:false,
            message:"Teacher already registered"
        })
    }

    const newTeacher = await Teacher.create({
        name,email,password,department
    });

    res.status(201).json({
        success:true,
        message:"Teacher registered succesfully",
        data:{
            id:newTeacher._id,
            name:newTeacher.name,
            email:newTeacher.email,
            department:newTeacher.department
        }
    })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
            
    });
    console.log(error);
} 
    
}

export const loginTeacher = async(req,res)=>{
    try {
       const {email,password} = req.body;
       if(!email){
        return res.status(400).json({
            success:false,
            message:"email is required"
        });
    }
    if(!password){
        return res.status(400).json({
            success:false,
            message:"password is required"
        });
    }
    const teacher = await Teacher.findOne({email}).select("+password");
    if(!teacher){
        return res.status(400).json({
           success:false,
           message:"Invalid credentails" 
        })
    }

    const isMatch = await teacher.comparePassword(password);

    if(!isMatch){
      return  res.status(400).json({
            success:false,
            message:"Invalid credentails"
        })
    }

    const token = jwt.sign(
        {id:teacher._id},
        process.env.JWT_SECRET,
        { expiresIn:process.env.JWT_EXPIRES}
    );

    res.status(200).json({
        success:true,
        token,
        user:{
            id:teacher._id,
            name:teacher.name,
            email:teacher.email,
            department:teacher.department
        }
    })



    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        console.log(error.message)
    }
}