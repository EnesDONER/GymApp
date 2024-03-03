
import tryCatch from "../utils/tryCatch.js"
import AppError from "../utils/appError.js"
import Category from "../models/category.js"

const categoryRegister = tryCatch(async (req,res)=>{
    const category = await Category.create({
        name:req.body.name
    })
    if (!category) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
    });
})
const categoryDelete = tryCatch(async (req,res)=>{
    const id = req.params.id

    const remove = await Category.findByIdAndDelete(id)
    if (!remove) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
    });
})
const categoryUpdate = tryCatch(async (req,res)=>{
    const id = req.params.id
    const name = req.body.name 
    const remove = await Category.findByIdAndUpdate(id,{
        name
    })
    if (!remove) {
        return res.status(404).json({
            succeded: false,
        });
    }
    res.status(200).json({
        succeded: true,
    });
})
const categoryGet = tryCatch(async(req,res)=>{
    const get = await Category.find({})
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
    categoryRegister,
    categoryDelete,
    categoryUpdate,
    categoryGet
}

export default categoryExport