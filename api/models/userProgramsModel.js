import mongoose from "mongoose";
const {
    Schema
} = mongoose;
const UserProgramSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    programsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programs",
    },

}, {
    timestamps: true
})

const UserPrograms = mongoose.model("user_programs", UserProgramSchema)

export default UserPrograms