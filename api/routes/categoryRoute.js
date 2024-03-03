import FormData from "../middlewares/blogPhotoMiddleware.js"
import express  from "express"
import Category from "../controllers/categoryController.js"
import SubCategory from "../controllers/subCategoryController.js"

const router = express.Router()


router.route("/").post(FormData.uploadSettingImages,Category.categoryRegister)
router.route("/").get(Category.categoryGet)
router.route("/:id").put(FormData.uploadSettingImages,Category.categoryUpdate)
router.route("/:id").delete(Category.categoryDelete)


router.route("/sub").post(FormData.uploadSettingImages,SubCategory.subCategoryRegister)
router.route("/sub/:id").get(SubCategory.subCategoryGet)
router.route("/sub/:id").put(FormData.uploadSettingImages,SubCategory.subCategoryUpdate)
router.route("/sub/:id").delete(SubCategory.subCategoryDelete)

export default router