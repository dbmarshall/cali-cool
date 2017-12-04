const db = require("../models");

module.exports = {
  findAllUserAlbums: function(req, res) {
    db.Albums
      .find({ owner: req.params.id })
      .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};