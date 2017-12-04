const router = require("express").Router();
const photosController = require("../../controllers/photosController");

//Routes goes here — match with "/api/photos"
router.route("/recent")
  .get(photosController.recent);

router.route("/mostLiked")
  .get(photosController.mostLiked);

module.exports = router;