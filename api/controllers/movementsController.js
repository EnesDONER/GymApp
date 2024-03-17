import tryCatch from "../utils/tryCatch.js";
import AppError from "../utils/appError.js";
import Movements from "../models/movementsModel.js";
import fs from  "fs"
const movementsCreate = tryCatch(async (req, res) => {
  const obj = {
    name: req.body.name,
    description: req.body.description,
    videoLink: req.body.videoLink,
    imageLink: req.body.images,
    categoryId: req.body.categoryId,
    subCategoryId: req.body.subCategoryId,
  };
  const create = await Movements.create(obj);
  if (!create) {
    return res.status(404).json({
      succeded: false,
    });
  }
  res.status(200).json({
    succeded: true,
    data: create,
  });
});
const movementsDelete = tryCatch(async (req, res) => {
  const id = req.params.id;

  const remove = await Movements.findByIdAndDelete(id);
  if (remove?.imageLink) {
    photoDelete(remove?.imageLink)
  }
  if (!remove) {
    return res.status(404).json({
      succeded: false,
    });
  }
  res.status(200).json({
    succeded: true,
  });
});
const movementsUpdate = tryCatch(async (req, res) => {
  const id = req.params.id;

  if (req.body?.images !== "") {
    const movements = await Movements.findById(id);
    if (movements?.imageLink) {
      photoDelete(movements.imageLink);
    }
  }

  const obj = {
    name: req.body?.name,
    description: req.body?.description,
    videoLink: req.body?.videoLink,
    imageLink: req.body?.images,
    categoryId: req.body?.categoryId,
    subCategoryId: req.body?.subCategoryId,
  };
  const update = await Movements.findByIdAndUpdate(id, obj, { new: true });
  if (!update) {
    return res.status(404).json({
      succeded: false,
    });
  }
  res.status(200).json({
    succeded: true,
    data: update,
  });
});
const movementsGet = tryCatch(async (req, res) => {
  let { page, paginate } = req.query;

  if (!page) page = 1;
  if (!paginate) paginate = 10;
  const skip = (page - 1) * paginate;

  const get = await Movements.find({})
    .populate("categoryId")
    .skip(skip)
    .limit(paginate)
    .sort({ createdAt: -1 });

  if (!get) {
    return res.status(404).json({
      succeded: false,
    });
  }
  const data = [];
  for (const a of get) {
    data.push({
      _id: a._id,
      name: a?.name || "",
      description: a?.description || "",
      videoLink: a?.videoLink || "",
      imageLink: a?.imageLink || "",
      categoryId: a?.categoryId?._id || "",
      categoryName: a?.categoryId?.name || "",
    });
  }
  const totalRecord = await Movements.find({}).count();

  res.status(200).json({
    succeded: true,
    data,
    totalRecord,
  });
});
const movementsGetById = tryCatch(async (req, res) => {
  const id = req.params.id;
  const result = await Movements.findById(id).populate("categoryId");
  if (!result) {
    return res.status(404).json({
      succeded: false,
      message: "Hareket Bulunamadı",
    });
  }
  const data = {
    _id: result._id,
    name: result?.name || "",
    description: result?.description || "",
    videoLink: result?.videoLink || "",
    imageLink: result?.imageLink || "",
    categoryId: result?.categoryId?._id || "",
    categoryName: result?.categoryId?.name || "",
  };
  res.status(200).json({
    succeded: true,
    data,
  });
});
const categoryExport = {
  movementsCreate,
  movementsDelete,
  movementsUpdate,
  movementsGet,
  movementsGetById,
};
function photoDelete(filePath) {
  console.log(filePath);
  let path = filePath.split(process.env.DOMAIN);
  console.log(path);
  path = `public${path[1]}`;
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Fotoğraf bulunamadı:", err);
      return;
    }

    // Fotoğrafı sil
    fs.unlink(path, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Fotoğrafı silme hatası:", unlinkErr);
      } else {
        console.log("Fotoğraf başarıyla silindi.");
      }
    });
  });
}
export default categoryExport;
