import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {
    Schema
} = mongoose;
const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    }

}, {
    timestamps: true
})

const Category = mongoose.model("Category", categorySchema)

export default Category