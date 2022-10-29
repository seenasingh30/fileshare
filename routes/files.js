const res = require("express/lib/response");
const multer = require("multer");
const path = require("path");
const fileDb = require("../models/file");
const sendMail = require("../service/emailservice");

const { v4: uuid4 } = require("uuid");

const router = require("express").Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => {
    const uniquename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniquename);
  },
});
let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File Type is not allowed");
  },
});
router.post("/", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const file = await fileDb.create({
    filename: req.file.filename,
    uuid: uuid4(),
    path: req.file.path,
    size: req.file.size,
  });
  // Everything went fine.
  return res.json({
    file: `${process.env.APP_BASE_URL}/files/${req.file.filename}`,
  });
});
//});

// router.post('/',upload.single("file"), async(req,res) => {
//    console.log(req.file);

//    const file = new File({
//     filename:req.file.filename,
//     uuid: uuid4(),
//     path: req.file.path,
//     size:req.file.size
//    });
//    const response = await file.save();
//         return res.json({file:`${process.env.APP_BASE_URL}/files/${req.file.filename}`});

// });

router.post("/send", async (req, res) => {
  try {
    console.log("send");
    const { uuid, emailTo, emailFrom } = req.body;
    if (!uuid || !emailTo || !emailFrom) {
      return res.status(422).send({ error: "All fields are required" });
    }
    //get data from database

    let filedata = await fileDb.findOne({ uuid: uuid });
    console.log(filedata);
    if (filedata) {
      if (filedata.sender) {
        return res.status(422).send({ error: "email already sent" });
      } else {
        await fileDb(req.body).save();
      }
    } else {
      filedata = await fileDb(req.body).save();
      console.log("njnb", filedata);
    }
    //send email

    console.log(emailFrom);
    sendMail({
      from: emailFrom,
      to: emailTo,
      subject: "Transfer file sharing",
      text: `${emailFrom} shared a file with u`,
      html: require("../service/emailTemplates")({
        emailForm: emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/files/${filedata.uuid}`,
        size: parseInt(1000) + "KB",
        expires: "24 hours",
      }),
    });

    return res.send({ success: true });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
