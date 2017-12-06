const router = require("express").Router();
const albumsController = require("../../controllers/albumsController");

// Routes goes here — match with "/api/albums"

router.route("/title")
  .get(albumsController.getTitles)

router.route("/:id")
  .get(albumsController.findById);

router.route("/search/title/:searchStr")
  .get(albumsController.searchByTitle)


module.exports = router;