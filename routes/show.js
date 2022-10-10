const router = require('express').Router();
const File = require('../models/file');


router.get('/:uuid', async (req,res)=>{
    try{
        const file= await File.findOne({
            uuid: req.params.uuid
        });
        if(!file){
            return res.render('downloads',{ error : 'link has been expired'}); 
        }

        return res.render('downloads',{
            uuid: file.uuid,
            filename:file.filename,
            size: file.size,
            downloadLink:`${process.env.APP_BASE_URL}/files/downloads/${file.uuid}`
        });
    } catch(err){
        return res.render('downloads',{ error : 'something went wrong'});
    }
   
});

module.exports= router;