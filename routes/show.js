const router = require("express").Router();
const fileDB = require("../models/file");

router.get("/:uuid", async (req, res) => {
  try {
    const file = await fileDB.findOne({ filename: req.params.uuid });
    console.log(file);
    if (!file) {
      return res.render("downloads", { error: "link has been expired" });
    }
    return res.render("downloads", {
      uuid: file.uuid,
      filename: file.filename,
      size: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (err) {
    return res.render("downloads", { error: "something went wrong" });
  }
});

module.exports = router;
