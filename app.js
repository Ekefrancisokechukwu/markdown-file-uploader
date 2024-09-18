// Express
const express = require("express");
const app = express();

// others
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// router
const markdownRouter = require("./routes");

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /md|txt/; // Allow .md and .txt files only
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    const isExtAllowed = fileTypes.test(extname);
    const isMimeAllowed =
      mimetype === "text/markdown" || mimetype === "text/plain";

    if (isMimeAllowed && isExtAllowed) {
      cb(null, true);
    } else {
      cb("Error: Only .md and .txt files are allowed!");
    }
  },
});

app.use(express.json());

app.use(upload.single("file"));
app.use("/api/v1/markdown", markdownRouter);

app.use((req, res) => res.status(404).send("Route Not Found!"));

const PORT = 5000;

const start = () => {
  app.listen(PORT, () => console.log(`App running on PORT: ${PORT}`));
};

start();
