import express  from "express";
import * as contentsController  from "../controllers/contentsController.js";
import formData from "../middlewares/contentPhotoMiddleware.js"
import validate from "../validations/contentValidation.js"



const router =express.Router()

router.route("/").get(contentsController.getList)// Tamamını getirmek için controllerda ilgili fonksiyonu tetikliyor
router.route("/").post(formData.uploadSettingImages,formData.resizeImages,contentsController.create)//Veri tabanına verileri kaydeden fonksiyonu tetikliyor
router.route("/:id").delete(contentsController.remove)//Paramsdan gelen id ile ilgili silme metodunu tetikliyor
router.route("/?page").put(validate.contentValidate,contentsController.update)//Queryden gelen page ile ilgili güncelleme metodunu tetikliyor
router.route("/page/:page").get(contentsController.getPageDetail)
router.route("/:page/:type").get(contentsController.getDetail)


export default router