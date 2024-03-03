import mongoose from "mongoose";
const {
    Schema
} = mongoose;
const subCategorySchema = new Schema({
    topId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "Category",
    },
    name: {
        type: String,
        require: true
    }

}, {
    timestamps: true
})

const SubCategory = mongoose.model("sub_category", subCategorySchema)

export default SubCategory