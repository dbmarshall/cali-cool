const router = require("express").Router();
const albumsController = require("../../controllers/albumsController");

//Routes goes here 
router.route("/:id")
  .get(albumsController.findById);

module.exports = router;