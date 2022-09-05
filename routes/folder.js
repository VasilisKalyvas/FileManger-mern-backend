import express from "express";
import {addFolder, deleteFolder, updateFolder, getFolder, getAllRootFolders, getfolderfiles} from "../controllers/folder.js";
const router = express.Router();

router.post("/:id", addFolder)
router.put("/update/:id", updateFolder)
router.delete("/delete/:id", deleteFolder)
router.get("/find/:id", getFolder)
router.get("/allroot", getAllRootFolders)
router.get("/folderfiles/:id", getfolderfiles)

export default router;