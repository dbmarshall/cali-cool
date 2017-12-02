const router = require("express").Router();

// const authenticationRoutes = require("./authentication");
const userRoutes = require("./users");
const photoRoutes = require("./photos");
const albumRoutes = require("./albums");

// router.use("/authentication", authenticationRoutes);
router.use("/users", userRoutes);
router.use("/photos", photoRoutes);
router.use("/albums", albumRoutes);

module.exports = router;
