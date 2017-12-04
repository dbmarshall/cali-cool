const router = require("express").Router();
const photosController = require("../../controllers/photosController");

//Routes goes here — match with "/api/photos"
router.route("/recent")
  .get(photosController.findAll);

module.exports = router;