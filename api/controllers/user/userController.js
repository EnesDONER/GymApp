import tryCatch from "../../utils/tryCatch.js"
import AppError from "../../utils/appError.js"
import User from "../../models/user/userModel.js";
import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const userRegister = tryCatch(async (req, res) => {
    const register = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        type: "user",
    });
    if (!register) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
    });
});
const userLogin = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
    });
    let same = false;
    if (user) {
        same = await bcrypt.compare(password, user?.password);
    } else {
        throw new AppError("User Bulunamadı", 404);
    }
    if (same) {
        const user = await User.findOne(
            {
                email,
            },
            "-password -token"
        );
        const token = await createToken(user._id);

        let oldTokens = user.tokens || [];
        if (oldTokens.length) {
            oldTokens.filter((t) => {
                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                if (timeDiff < 86400) {
                    return t;
                } 
            });
        }
        await User.findByIdAndUpdate(user._id, {
            tokens: [
                ...oldTokens,
                {
                    token,
                    signedAt: Date.now().toString(),
                },
            ],
        });
        const users = await User.findOne(
            {
                email,
            },
            "-password -token -tokens"
        );
        return res.status(200).json({
            succeded: true,
            data: {
                user: users,
            },
            token,
        });
    } else {
        res.status(200).json({
            succeded: true,
            data: {
               message: "Şifreniz yanlış",
            },
        });
    }
});
const createToken = async (id) => {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );
};

async function hashpassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}
const user = {
    userRegister,
    userLogin
}
export default user