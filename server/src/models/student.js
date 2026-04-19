import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:[3,"Name must have more than 3 letters"]
    },
    rollNo:{
        type:String,
        required:true,
        unique:true,
        minLength:[10,"rollNO must have 10 characters"]
    },
    department:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
},{
    timestamps:true
});

const Student = mongoose.model("Student",studentSchema);

export default Student;