import FormData from "../middlewares/blogPhotoMiddleware.js"
import express  from "express"
import Movement from "../controllers/movementsController.js"

const router = express.Router()


router.route("/").post(FormData.uploadSettingImages,Movement.movementsCreate)
router.route("/").get(Movement.movementsGet)
router.route("/get/:id").get(Movement.movementsGetById)
router.route("/:id").put(FormData.uploadSettingImages,Movement.movementsUpdate)
router.route("/:id").delete(Movement.movementsDelete)


export default router