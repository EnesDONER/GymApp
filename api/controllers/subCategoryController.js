
import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import SubCategory from "../models/subCategory.js"

const subCategoryRegister = tryCatch(async (req,res)=>{
    const category = await SubCategory.create({
        topId:req.body.topId,
        name:req.body.name
    })
    if (!category) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        data:category
    });
})
const subCategoryDelete = tryCatch(async (req,res)=>{
    const id = req.params.id

    const remove = await SubCategory.findByIdAndDelete(id)
    if (!remove) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
    });
})
const subCategoryUpdate = tryCatch(async (req,res)=>{
    const id = req.params.id
    const name = req.body?.name 
    const topId= req.body ?.topId
    const remove = await SubCategory.findByIdAndUpdate(id,{
        topId,
        name
    },{new :true})
    if (!remove) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
        data:remove
    });
})
const subCategoryGet = tryCatch(async(req,res)=>{
    const id = req.params.id
    const get = await SubCategory.find({topId:id})
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
const categoryExport = {
    subCategoryRegister,
    subCategoryDelete,
    subCategoryUpdate,
    subCategoryGet
}

export default categoryExport