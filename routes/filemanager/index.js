const File = require('../../models/File')

const multer = require('multer');
const router = require('express').Router()

const { v4: uuidv4 } = require('uuid');

let files
let fileSize
const fileUID =  uuidv4()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

      cb(null, 'App_Data/'+req.session.useruId);
      fileSize = parseInt(req.headers["content-length"])
      files = file
  },
  filename: (req, file, cb) => {

    cb(null, fileUID);
    
  }
});

const upload = multer({ storage: storage });

router.get('/:id', async (req,res)=> {
    const dirUId = req.params.id
    const files = await File.findAll({where:{directoryId: dirUId}})
    res.render('filemanager/index',{files})
})


router.post('/', upload.single('myFile'),async(req,res,next)=>{
  await File.create({
    file_id: fileUID,
    file_name: files.originalname,
    file_extension: files.mimetype,
    file_size: fileSize
  })
  try {
    return res.status(201).json({
        message: 'File uploded successfully'
        
    });
} catch (error) {
    console.error(error);
}

})
module.exports = router