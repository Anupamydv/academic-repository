const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "academic-repository",
    resource_type: "raw",
    public_id: file.originalname.replace(".pdf", ""), // keep real name
    type: "upload",
    flags: "attachment:false", // 🔥 THIS IS THE KEY
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
