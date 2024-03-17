
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
        data:category
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
    const update = await Category.findByIdAndUpdate(id,{
        name
    },{new : true})
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
const categoryGetList = tryCatch(async(req,res)=>{
    let {
        page,
        paginate,
    } = req.query;

    if (!page) page = 1
    if (!paginate) paginate = 10
    const skip = (page - 1) * paginate

    const get = await Category.find({}).skip(skip).limit(paginate).sort({ createdAt: -1 })
    if (!get) {
        return res.status(404).json({
            succeded: false,
        });
    }
    const totalRecord = await Category.find({}).count()
    res.status(200).json({
        succeded: true,
        data:get,
        totalRecord
    });
})
const getById = tryCatch (async(req,res)=>{
    const id = req.params.id
    const result = await Category.findById(id)

    res.status(200).json({
        succeded: true,
        data:result
    })
})
const categoryExport = {
    categoryRegister,
    categoryDelete,
    categoryUpdate,
    categoryGetList,
    getById
}

export default categoryExport