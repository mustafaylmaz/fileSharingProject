const router = require("express").Router();
const session = require("express-session");
const Directory = require("../../models/Directory.js");
const addDirectory = require('../../controller/directoryController');
const File = require("../../models/File.js");

router.get("/", async (req, res, next) => {
  const virtualdirs = await Directory.findAll({
    where: { userId: req.session.userId },
  });
  const files = await File.findAll({
    where: { directoryId: null,
    userId:req.session.userId }
  })
  res.render("virtualdir/index", { virtualdirs, files });
});

router.post('/', async(req,res) => {
    await addDirectory(req)
    res.redirect('/virtualdir/')
    
})

router.delete('/:id', async(req,res)=>{
  res.redirect('/virtualdir/')
})

module.exports = router;
