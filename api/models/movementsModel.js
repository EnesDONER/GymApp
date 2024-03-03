import mongoose from "mongoose";
const {
    Schema
} = mongoose;
const movementsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description:{
        type:String
    },
    videoLink:{
        type:String
    },   
    imageLink:{
        type:String
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "Category",
    },
    subCategoryId:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "sub_category",
    },
}, {
    timestamps: true
})

const Movements = mongoose.model("Movements", movementsSchema)

export default Movements