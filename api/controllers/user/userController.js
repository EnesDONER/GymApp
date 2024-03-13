import tryCatch from "../../utils/tryCatch.js"
import AppError from "../../utils/appError.js"
import User from "../../models/user/userModel.js";
import jwt from "jsonwebtoken"
import UserPrograms from "../../models/userProgramsModel.js";
import ProgramMovements from "../../models/Program_MovementsModel.js"
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
    var checkLogin = await userLoginCheck(user)
    console.log(checkLogin);
    if (!checkLogin) {
        throw new AppError("Girişiniz Engellendi", 422);
        
    }
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
            data: users,
            token,
        });
    } else {
        throw new AppError("Passwords are not matched", 401);

        // res.status(200).json({
        //     succeded: true,
        //     data: {
        //        message: "Şifreniz yanlış",
        //     },
        // });
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
const userProgram = tryCatch(async (req,res)=>{
    const id = req.user._id
    const userProgram = await UserPrograms.findOne({userId:id})
    
    const groupedByDay = {};

    if (userProgram && userProgram.programsId) {
        let rawData  = await ProgramMovements.find({ programsId: userProgram.programsId }).populate([
            "movementsId",
            "programsId",
          ]);
        
          rawData?.forEach((entry) => {
            const day = entry.day;
        
            if (!groupedByDay[day]) {
              groupedByDay[day] = [];
            }
            groupedByDay[day].push({
              _id:entry._id,
              movementsId:entry.movementsId._id,
              movementsName: entry.movementsId?.name,
              movementsDescription: entry.movementsId?.description,
              movementsVideoLink: entry.movementsId?.videoLink,
              movementsImageLink: entry.movementsId?.imageLink,
              programsName: entry.programsId?.name,
              programsDescription: entry.programsId?.description,
              day: entry?.day,
              numberOfSets: entry?.numberOfSets,
              numberOfRepetitions: entry?.numberOfRepetitions,
            });
          });
        
          // Günleri sırala
          const sortedDays = Object.keys(groupedByDay).sort();
    }
    res.status(200).json({
        succeded:true,
        data:groupedByDay
    })
})

async function hashpassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}
async function userLoginCheck(user){
    if (user.isStatus) {
        return true
    }
    return false
} 
const user = {
    userRegister,
    userLogin,
    userProgram
}
export default user