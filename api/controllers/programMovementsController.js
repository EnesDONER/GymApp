import tryCatch from "../utils/tryCatch.js";
import AppError from "../utils/appError.js";
import ProgramMovements from "../models/Program_MovementsModel.js";

const create = tryCatch(async (req, res) => {
  const obj = {
    movementsId: req.body?.movementsId,
    programsId: req.body?.programsId,
    day: req.body?.day,
    numberOfSets: req.body?.numberOfSets,
    numberOfRepetitions: req.body?.numberOfRepetitions,
  };
  const create = await ProgramMovements.create(obj);
  if (!create) {
    return res.status(404).json({
      succeded: false,
    });
  }
  res.status(200).json({
    succeded: true,
  });
});
const remove = tryCatch(async (req, res) => {
  const id = req.params.id;

  const remove = await ProgramMovements.findByIdAndDelete(id);
  if (!remove) {
    return res.status(404).json({
      succeded: false,
    });
  }
  res.status(200).json({
    succeded: true,
  });
});
const update = tryCatch(async (req, res) => {
  const id = req.params.id;
  const obj = {
    movementsId: req.body?.movementsId,
    programsId: req.body?.programsId,
    day: req.body?.day,
    numberOfSets: req.body?.numberOfSets,
    numberOfRepetitions: req.body?.numberOfRepetitions,
  };
  const update = await ProgramMovements.findByIdAndUpdate(id, obj, {
    new: true,
  });
  if (!update) {
    return res.status(404).json({
      succeded: false,
    });
  }
  res.status(200).json({
    succeded: true,
  });
});
const getList = tryCatch(async (req, res) => {
  const get = await ProgramMovements.find({}).populate([
    "movementsId",
    "programsId",
  ]);
  if (!get) {
    return res.status(404).json({
      succeded: false,
    });
  }
  res.status(200).json({
    succeded: true,
    data: get,
  });
});
const getAData = tryCatch(async (req, res) => {
  const id = req.params.id;

  const rawData = await ProgramMovements.find({ programsId: id }).populate([
    "movementsId",
    "programsId",
  ]);
  const groupedByDay = {};

  rawData.forEach((entry) => {
    const day = entry.day;

    if (!groupedByDay[day]) {
      groupedByDay[day] = [];
    }
    console.log(entry);
    groupedByDay[day].push({
      movementsName: entry.movementsId?.name,
      movementsDescription: entry.movementsId?.description,
      movementsVideoLink: entry.movementsId?.videoLink,
      movementsImageLink: entry.movementsId?.imageLink,
      programsName: entry.programsId?.name,
      programsDescription: entry.programsId?.description,
      day: entry?.day,
      numberOfSets: entry?.numberOfSets,
      numberOfRepetitions: entry?.numberOfRepetitions,
    });
  });

  // Günleri sırala
  const sortedDays = Object.keys(groupedByDay).sort();

  res.status(200).json({
    succeded: true,
    data: groupedByDay,
  });
});
const ProgramMovementsExport = {
  create,
  remove,
  update,
  getList,
  getAData,
};

export default ProgramMovementsExport;
