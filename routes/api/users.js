const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Routes goes here — match with "/api/users"
router.route("/:id/albums")
  .get(usersController.findAllUserAlbums);

router.route("/:id/albums/new")
  .post(usersController.createAlbum);

router.route("/:id/photos/new")
  .post(usersController.createPhoto);

module.exports = router;