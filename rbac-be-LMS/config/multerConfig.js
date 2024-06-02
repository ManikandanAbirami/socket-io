const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "library",
    allowedFormats: ["jpg", "png"],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
