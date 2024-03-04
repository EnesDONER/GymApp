import FormData from "../middlewares/blogPhotoMiddleware.js"
import express  from "express"
import ProgramMovements from "../controllers/programMovementsController.js"

const router = express.Router()


router.route("/").post(FormData.uploadSettingImages,ProgramMovements.create)
router.route("/").get(ProgramMovements.getList)
router.route("/:id").get(ProgramMovements.getAData)
router.route("/:id").put(FormData.uploadSettingImages,ProgramMovements.update)
router.route("/:id").delete(ProgramMovements.remove)


export default router