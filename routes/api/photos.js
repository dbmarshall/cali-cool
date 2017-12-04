const router = require("express").Router();
const photosController = require("../../controllers/photosController");

router.route("/recent")
  .get(photosController.recent);

router.route("/mostLiked")
  .get(photosController.mostLiked);

module.exports = router;