const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Routes goes here — match with "/api/user"
router.route("/:id/albums")
  .get(usersController.findAllUserAlbums);

module.exports = router;