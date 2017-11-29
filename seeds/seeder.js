var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/calicool_db', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    '../models/Users.js',
    '../models/Invitees.js',
    '../models/Photos.js',
    '../models/Albums.js',
    '../models/Comments.js',
    '../models/Tags.js',
    '../models/PhotoTags.js',
    '../models/AlbumTags.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Model1', 'Model2'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});


// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Model1',
        'documents': [
            {
                'name': 'Doc1',
                'value': 200
            },
            {
                'name': 'Doc2',
                'value': 400
            }
        ]
    }
];