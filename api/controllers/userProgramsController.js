import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import UserPrograms from "../models/userProgramsModel.js"

const create = tryCatch(async(req,res)=>{
    const create = await UserPrograms.create({
        programsId:req.body.programsId,
        userId:req.body.userId
    })

    if (!create) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        message:"Kullanıcıya program atandı."
    });
})
const remove = tryCatch(async (req,res)=>{
    const id = req.params.id

    const remove = await UserPrograms.findByIdAndDelete(id)
    if (!remove) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        message:"Kullanıcıya atanan program kaldırıldı"
    });
})
const update = tryCatch(async (req,res)=>{
    const id = req.params.id
    
    const result = await UserPrograms.findByIdAndUpdate(id,{
        programsId:req.body?.programsId,
        userId:req.body?.userId
    })
    if (!result) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        message:"Kullanıcı programı güncellendi"
    });
})
const getList = tryCatch(async (req,res)=>{
    const result = await UserPrograms.find({}).populate(["userId","programsId"])
    if (!result) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        data:result
    });
})

const UserProgramsExport = {
    create,
    remove,
    update,
    getList
}

export default UserProgramsExport