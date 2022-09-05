import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    folderId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("File", FileSchema);