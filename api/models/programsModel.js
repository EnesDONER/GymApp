import mongoose from "mongoose";
const {
    Schema
} = mongoose;
const programsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }

}, {
    timestamps: true
})

const Programs = mongoose.model("Programs", programsSchema)

export default Programs