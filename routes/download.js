const router = require("express").Router();
const fileDb = require("../models/file");

router.get("/:uuid", async (req, res) => {
  const file = await fileDb.findOne({
    uuid: req.params.uuid,
  });
  if (!file) {
    return res.render("downloads", {
      error: "link has been expired",
    });
  }
  const filepath = `${__dirname}/../uploads/${file.filename}`;
  res.download(filepath);
});
module.exports = router;
