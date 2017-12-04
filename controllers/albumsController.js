const db = require("../models");

module.exports = {
  findById: function(req, res) {
    db.Albums
      .findById(req.params.id)
      .populate("photos")
      .populate("owner")
      .populate("comments")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};  