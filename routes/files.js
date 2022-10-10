const res = require('express/lib/response');
const multer = require('multer');
const path = require("path");
const File = require('../models/file');
const { v4 : uuid4} = require('uuid');

const router = require('express').Router();

let storage = multer.diskStorage({
    destination : (req,file,cb)=>cb(null,'./uploads'),
    filename : (req,file,cb) =>{
        const uniquename = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniquename);
    }
})
let upload = multer({
    storage,
    limit :{ fileSize:1000000 * 100},});




router.post('/',upload.single("file"), async(req,res) => {
   console.log(req.file);
        
//    const file = new File({
//     filename:req.file.filename,
//     uuid: uuid4(),
//     path: req.file.path,
//     size:req.file.size
//    });
//    const response = await file.save();
        return res.json({file:`${process.env.APP_BASE_URL}/files/${req.file.filename}`});


});


// router.post('/send',(req,res)=>{
//     const {uuid,emailfrom,emailto}= req.body;
//     if(!uuid  || !emailto !! !emailfrom){
//         return res.status(422).send({error:'All fields are required'});
//     }
//     console file=await

// });


module.exports = router;