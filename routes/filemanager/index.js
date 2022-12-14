const File = require("../../models/File");

const multer = require("multer");
const router = require("express").Router();

const { v4: uuidv4 } = require("uuid");
const Directory = require("../../models/Directory");
const sessionChecker = require("../../middleware/sessionChecker");
let files;
let fileSize;
const fileUID = uuidv4();

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (req.params.id) {
      const dir = await Directory.findOne({
        where: {
          id: req.params.id,
        },
      });
      cb(null, "App_Data/" + req.session.useruId + "/" + dir.dir_name);
      fileSize = parseInt(req.headers["content-length"]);
      files = file;
    } else {
      cb(null, "App_Data/" + req.session.useruId);
      fileSize = parseInt(req.headers["content-length"]);
      files = file;
    }
  },
  filename: (req, file, cb) => {
    cb(null, fileUID);
  },
});

const upload = multer({ storage: storage });

router.get("/:id", async (req, res) => {
  const dirUId = req.params.id;
  const dir = await Directory.findOne({ where: { id: dirUId } });
  const files = await File.findAll({ where: { directoryId: dirUId } });
  const useruId = req.session.useruId;
  res.render("filemanager/index", { files, dirUId, dir, useruId });
});

router.post("/delete", async (req, res) => {
  if (sessionChecker) {
    const { id } = req.body;
    await File.destroy({
      where: {
        id: id,
      },
    });
  } else res.send(404);
});

router.post("/edit/ajax/", async (req, res) => {
  if(sessionChecker){
  const { newFileName, id } = req.body;
  await File.update(
    {
      file_name: newFileName,
    },
    {
      where: {
        file_id: id,
      },
    }
  );
  res.send(200);
}
else res.send(404)
});

router.post("/:id", upload.single("myFile"), async (req, res) => {
  try {
    const directoryId = req.params.id;
    await File.create({
      file_id: fileUID,
      file_name: files.originalname,
      file_extension: files.mimetype,
      file_size: fileSize,
      directoryId: directoryId,
      userId: req.session.userId

    });
    return res.redirect(`${req.params.id}`);
  } catch (error) {
    console.error(error);
  }
});

router.post("/", upload.single("myFile"), async (req, res) => {
  try {
    await File.create({
      file_id: fileUID,
      file_name: files.originalname,
      file_extension: files.mimetype,
      file_size: fileSize,
      userId: req.session.userId
    });

    return res.redirect("/virtualdir");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
