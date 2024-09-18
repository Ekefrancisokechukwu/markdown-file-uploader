const path = require("path");
const fs = require("fs");

const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ msg: "No file uploaded." });
  }

  res.status(201).send({
    msg: "File uploaded!",
    fileName: req.file.filename,
  });
};

const allNotes = (req, res) => {
  const uploadsFolder = path.join(__dirname, "uploads");

  fs.readdir(uploadsFolder, (err, files) => {
    if (err) return res.status(500).send(err.message);
    res.json(files);
  });
};

const checkGrammar = (req, res) => {
  res.send("/check-grammar");
};

module.exports = { uploadFile, checkGrammar, allNotes };
