const router = require("express").Router();
const photosController = require("../../controllers/photosController");

//Routes goes here
router.route("/recent")
  .get(photosController.findAll);

module.exports = router;