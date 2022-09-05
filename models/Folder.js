import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema(
  {
    parentFolderId: {
      type: String,
      required: true,
      default: 'root',
    },
    name: {
      type: String,
      required: true,
    },
    files: {
      type: [String],
      default: [],
    },
    folders: {
      type: [String],
      default: [],
    },
    type:{
      type: String,
      default: 'folder',
    }
  },
  { timestamps: true }
);

export default mongoose.model("Folder", FolderSchema);