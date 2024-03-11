import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/products",
  filename: (req, file, cb) => {
    const uniqueName = new Date().getTime();
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    cb(null, uniqueName + ext);
  },
});
const limit = 1024 * 1024 * 5;

const filefilter = (req, file, cb) => {
  if (file.mimetype.includes("jpeg") || file.mimetype.include("png")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploads = multer({
  storage: storage,
  limits: { fileSize: limit },
  filefilter: filefilter,
});

export default uploads;
