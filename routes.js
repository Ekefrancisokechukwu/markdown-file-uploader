const { uploadFile, checkGrammar, allNotes } = require("./markdownController");

const router = require("express").Router();

router.get("/notes", allNotes);

router.post("/uploads", uploadFile);
router.post("/check-grammar", checkGrammar);

module.exports = router;
