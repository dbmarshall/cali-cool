const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Photos
      .find(req.query)
      .sort({ _id: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};