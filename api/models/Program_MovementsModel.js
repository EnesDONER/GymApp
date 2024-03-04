import mongoose from "mongoose";
const {
    Schema
} = mongoose;
const Program_MovementsSchema = new Schema({
    movementsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movements",
    },
    programsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programs",
    },
    day:{
        type:String,
        Enum:["Pazartesi","Sali","Carsamba","Persembe","Cuma","Cumartesi","Pazar"]
    },
    numberOfSets: {
        type: Number,
    },
    numberOfRepetitions: {
        type: Number,
    }

}, {
    timestamps: true
})

const Program_Movements = mongoose.model("Program_Movements", Program_MovementsSchema)

export default Program_Movements