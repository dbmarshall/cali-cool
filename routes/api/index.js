const router = require("express").Router();
const articleRoutes = require("./articles");

// Article & Comment routes
router.use("/articles", articleRoutes);

module.exports = router;
