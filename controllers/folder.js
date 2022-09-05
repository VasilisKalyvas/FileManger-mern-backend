import { createError } from "../error.js";
import File from "../models/File.js";
import Folder from "../models/Folder.js";

export const addFolder = async (req, res, next) => {
  const newFolder= new Folder({ ...req.body, parentFolderId: req.params.id});
  try {
    const savedFolder = await newFolder.save();
    if(newFolder.parentFolderId !== 'root'){
    const folder = await Folder.findById(req.params.id);
      if(folder){
        await Folder.findByIdAndUpdate(req.params.id, {$addToSet: {folders: savedFolder._id}});
      }else{
        return next(createError(403, "Folder doesnt exists!"));
      }}
    res.status(200).send(savedFolder);
  } catch (err) {
    next(err);
  }
};

export const updateFolder = async (req, res, next) => {
  try {
    const FindFolder = await Folder.findById(req.params.id);
    if (!FindFolder) return next(createError(404, "Folder not found!"));
     const updatedFolder = await Folder.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
        );
        res.status(200).json(updatedFolder);
    } catch (err) {
    next(err);
    }
};

export const deleteFolder = async (req, res, next) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if(folder){
      let files = await File.find({folderId: req.params.id});
      for(let i = 0; i<files.length; i++){
        await File.findByIdAndDelete(files[i]._id);
      }
      await Folder.findByIdAndUpdate(folder.parentFolderId,{$pull: {folders: folder._id}});
      await Folder.findByIdAndDelete(req.params.id);
      res.status(200).json("The Folder has been deleted.");
    }else{
      return next(createError(403, "Folder doesnt exists!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getFolder = async (req, res, next) => {
  try {
    const folder = await Folder.findById(req.params.id);
    res.status(200).json(folder);
  } catch (err) {
    next(err);
  }
};


export const getAllRootFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find({parentFolderId: 'root'});
    res.status(200).json(folders);
  } catch (err) {
    next(err);
  }
};

export const getfolderfiles = async (req, res, next) => {
  try {
    const folders = await Folder.find({parentFolderId: req.params.id});
    res.status(200).json(folders);
  } catch (err) {
    next(err);
  }
};
