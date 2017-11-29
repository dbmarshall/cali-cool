var seeder = require('mongoose-seed');
 
// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/calicool_db', function() {
 
  // Load Mongoose models
  seeder.loadModels([
    '../models/Users.js',
    '../models/Invitees.js',
    '../models/Tags.js',
    '../models/Albums.js',
    '../models/Photos.js',
    '../models/Comments.js',
    '../models/PhotoTags.js',
    '../models/AlbumTags.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Users', 'Invitees', 'Photos', 'Albums', 'Comments', 'Tags', 'PhotoTags', 'AlbumTags'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
 
  });
});


// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'Users',
    'documents': [
      {
        'email': 'minuEmiliajames@gmail.com',
        'userName': 'minu',
        'passWord': 'minu',
        'firstName': 'Minu',
        'lastName': 'James',
        'role': 'admin',
        'profilePicture':'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjoqfmmuePXAhUJ4SYKHVMABwcQjRwIBw&url=http%3A%2F%2Fmoziru.com%2Fexplore%2FProfile%2520clipart%2520black%2520and%2520white%2F&psig=AOvVaw2yiY_qfZznYqEKQ-VZe70e&ust=1512033343091997'
      },
      {
        'email': 'davidbryanmarshall@gmail.com',
        'userName': 'david',
        'passWord': 'david',
        'firstName': 'David',
        'lastName': 'Marshall',
        'role': 'admin',
        'profilePicture':'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj89I71uePXAhUhzIMKHRuQB80QjRwIBw&url=https%3A%2F%2Fpixabay.com%2Fen%2Fman-head-beard-old-people-profile-294173%2F&psig=AOvVaw2ujLyVMc3VuKtG4WCc5VOY&ust=1512033504298980'
      },
      {
        'email': 'siversonj@gmail.com',
        'userName': 'josh',
        'passWord': 'josh',
        'firstName': 'Josh',
        'lastName': 'Siverson',
        'role': 'admin',
        'profilePicture':'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwikobiIuuPXAhWNw4MKHSIfBdsQjRwIBw&url=https%3A%2F%2Fwww.clker.com%2Fclipart-man-profile.html&psig=AOvVaw2gbsaWmSRv1e5KSJioz1ub&ust=1512033549325748'
      },
      {
        'email': 'jack@gmail.com',
        'userName': 'jack',
        'passWord': 'jack',
        'firstName': 'Jack',
        'lastName': 'Berkeley',
        'role': 'user',
        'profilePicture':'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwikobiIuuPXAhWNw4MKHSIfBdsQjRwIBw&url=https%3A%2F%2Fwww.clker.com%2Fclipart-man-profile.html&psig=AOvVaw2gbsaWmSRv1e5KSJioz1ub&ust=1512033549325748'
      },
      {
        'email': 'jill@gmail.com',
        'userName': 'jill',
        'passWord': 'jill',
        'firstName': 'Jill',
        'lastName': 'Berkeley',
        'role': 'user',
        'profilePicture':'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwikobiIuuPXAhWNw4MKHSIfBdsQjRwIBw&url=https%3A%2F%2Fwww.clker.com%2Fclipart-man-profile.html&psig=AOvVaw2gbsaWmSRv1e5KSJioz1ub&ust=1512033549325748'
      }

    ]
  }
];