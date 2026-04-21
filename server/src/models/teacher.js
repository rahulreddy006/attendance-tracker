import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Password must contain atleast 6 characters"],
        select:false
    },
    department:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

teacherSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    } catch (error) {
        console.log(error);
    }
});

teacherSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword,this.password);
    
}

const Teacher = mongoose.model("Teacher",teacherSchema);

export default Teacher;