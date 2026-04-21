import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
    date:{
        type:Date,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    records:{
        type:[
        {
            studentId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Student",
                required:true
            },
            status:{
                type:Boolean,
                required:true
            },
            
        }
    ],
    validate:{
                validator:function(array){
                    return array && array.length > 0;
                },
                message:"Records cannot be empty"
            }
        }
}
,{
    timestamps:true
});

attendanceSchema.index({date:1,department:1,section:1},{unique:true});

const Attendance = mongoose.model("Attendance",attendanceSchema);

export default Attendance;