import express from "express";
import upload from'../middleware/upload.js'
import {uploadFile, deleteFile, updateFile, getFile, getAllFilesInFolder, getAllFiles} from "../controllers/file.js";
const router = express.Router();

router.post("/:id", upload.single('file'), uploadFile)
router.put("/update/:id", updateFile)
router.delete("/delete/:id", deleteFile)
router.get("/find/:id", getFile)
router.get("/all/:id", getAllFilesInFolder)
router.get("/allfiles", getAllFiles)

export default router;