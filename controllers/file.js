import { createError } from "../error.js";
import File from "../models/File.js";
import Folder from  "../models/Folder.js";

export const uploadFile = async (req, res, next) => {
    try {
      const file = new File({
        name: req.file.originalname,
        filePath: req.file.path,
        type: req.file.mimetype,
        size: fileSizeFormatter(req.file.size, 2), //0.00
        folderId: req.params.id,
      });
      await file.save();
      const folder = await Folder.findById(req.params.id);
      if(folder){
        await Folder.findByIdAndUpdate(req.params.id, {$addToSet: {files: file._id}});
      }else{
        return next(createError(403, "Folder doesnt exists!"));
      }
      res.status(200).send(file);
    } catch (err) {
      next(err);
    }
};


export const updateFile = async (req, res, next) => {
    try {
        const FindFile = await File.findById(req.params.id);
        if (!FindFile) return next(createError(404, "File not found!"));
         const updatedFile = await File.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
            );
            res.status(200).json(updatedFile);
        } catch (err) {
        next(err);
        }
};

export const deleteFile = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if(file){
          await Folder.findByIdAndUpdate(file.folderId, {$pull: {files: file._id}});
          await File.findByIdAndDelete(req.params.id);
          res.status(200).json("The File has been deleted.");
        }else{
          return next(createError(403, "File doesnt exists!"));
        }
      } catch (err) {
        next(err);
      }
};

export const getFile = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if(file){
          res.status(200).json(file);
        }else{
          return next(createError(403, "File doesnt exists!"));
        }
      } catch (err) {
        next(err);
      }
};


export const getAllFilesInFolder = async (req, res, next) => {
    try {
        const folder = await Folder.findById(req.params.id);
        if(folder){
          const filesInFolder = await File.find({folderId: req.params.id});
          res.status(200).json(filesInFolder);
        }else{
          return next(createError(403, "File doesnt exists!"));
        }
      } catch (err) {
        next(err);
      }
};

export const getAllFiles = async (req, res, next) => {
    try {
        const files = await File.find();
        if(files){
          res.status(200).json(files);
        }else{
          return next(createError(403, "There aren't Files!"));
        }
      } catch (err) {
        next(err);
      }
};

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes/ Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index];
}
