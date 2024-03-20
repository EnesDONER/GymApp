import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const {
    Schema
} = mongoose;
const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    isStatus: {
        type: Boolean,
        default: true
    },
    type:{
        type:String,
        enum:["user"]
    },
    tokens:[{type: Object}]

}, {
    timestamps: true
})
userSchema.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})

const User = mongoose.model("User", userSchema)

export default User