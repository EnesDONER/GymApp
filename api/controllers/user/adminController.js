import Admin from "../../models/user/adminModel.js";
import bcrypt from "bcrypt";
import tryCatch from "../../utils/tryCatch.js";
import AppError from "../../utils/appError.js";
import jwt from "jsonwebtoken";
import User from "../../models/user/userModel.js"


//Admin için gerekli bilgileri veri tabanına kayıt ediliyor
const registerAdmin = tryCatch(async (req, res) => {
    const registerAdmin = await Admin.create(req.body);
    if (!registerAdmin) {
        throw new AppError("registration admin failed", 404);
    }
    res.status(200).json({
        succeded: true,
        data: registerAdmin,
    });
});
//admin login giriş işlemlerini yapıyor
const loginAdmin = tryCatch(async (req, res) => {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    let same = false;
    if (user) {
        same = await bcrypt.compare(password, user.password);

        if (same) {
            const user = await Admin.findOne({ email }, "-password");
            const token = await createToken(user._id);
            if (!token) {
                throw new AppError("Failed to create token", 404);
            }
            let oldTokens = user.tokens || [];
            if (oldTokens.length) {
                oldTokens.filter((t) => {
                    const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                    if (timeDiff < 86400) {
                        return t;
                    }
                });
            }
            await Admin.findByIdAndUpdate(user._id, {
                tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
            });
            res.status(200).json({
                succeded: true,
                data: user,
                token,
                message: "Successfully sign-in",

            });
        } else {
            throw new AppError("Passwords are not matched", 401);
        }
    } else {
        throw new AppError("There is no such user", 401);
    }
});
//admin logout işlemini yapıyor
const adminLogout = tryCatch(async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    const tokens = req.user.tokens;
    const newTokens = tokens.filter((t) => t.token !== token);
    await Admin.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    return res.status(200).json({
        success: true,
        message: "Successfully sign out",
        data: [],
    });
});
//login işlemleri sırasında gerekli jwtToken oluşturuyor
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

const getUserList = tryCatch(async (req,res)=>{
    let {
        page,
        paginate,
    } = req.query;

    if (!page) page = 1
    if (!paginate) paginate = 10
    const skip = (page - 1) * paginate

    const result = await User.find({},"-tokens -password").skip(skip).limit(paginate).sort({ createdAt: -1 })
    if (!result) {
        return res.status(404).json({
            succeded: false,
        });
    }
    const totalRecord = await User.find({}).count()

    res.status(200).json({
        succeded: true,
        data:result,
        message:"Kullanıcı listeleme başarılı",
        totalRecord
    });
})

const admin = {
    registerAdmin,
    loginAdmin,
    adminLogout,
    getUserList
}
export default admin