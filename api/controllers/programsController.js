
import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import Programs from "../models/programsModel.js"


const programsCreate = tryCatch(async (req,res)=>{
    const create = await Programs.create({
        name:req.body.name,
        description:req.body.description
    })
    if (!create) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        data:create
    });
})
const programsDelete = tryCatch(async (req,res)=>{

    const id = req.params.id
    const remove = await Programs.findByIdAndDelete(id)
    if (!remove) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
    });
})
const programsUpdate = tryCatch(async (req,res)=>{
    const id = req.params.id
    const name = req.body.name 
    const description = req.body.description 
    const update = await Programs.findByIdAndUpdate(id,{
        name,
        description
    },{new:true})
    if (!update) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        data:update
    });
})
const programsGetList = tryCatch(async(req,res)=>{
    let {
        page,
        paginate,
    } = req.query;

    if (!page) page = 1
    if (!paginate) paginate = 10
    const skip = (page - 1) * paginate

    const get = await Programs.find({}).skip(skip).limit(paginate).sort({ createdAt: -1 })
    if (!get) {
        return res.status(404).json({
            succeded: false,
        });
    }
    const totalRecord = await Programs.find({}).count()

    res.status(200).json({
        succeded: true,
        data:get,
        totalRecord
    });
})
const programsGetById = tryCatch(async (req,res)=>{
    const id = req.params.id
    const get = await Programs.findById(id)
    if (!get) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        data:get
    });
})
const programsExport = {
    programsCreate,
    programsDelete,
    programsUpdate,
    programsGetList,
    programsGetById
}
export default programsExport