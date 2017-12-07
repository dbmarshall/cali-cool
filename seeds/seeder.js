/* 
  RUN THIS FILE FROM ROOT DIRECTORY:
  `node seeds/seeder.js`
*/ 
var seeder = require('mongoose-seed');
const mongoose = require("mongoose");
 
// Connect to MongoDB via Mongoose
// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URI || "mongodb://localhost/calicool_db", function() {

  // Load Mongoose models
  seeder.loadModels([
    './models/Users.js',
    './models/Invitees.js',
    './models/Tags.js',
    './models/Albums.js',
    './models/Photos.js',
    './models/Comments.js',
    './models/PhotoTags.js',
    './models/AlbumTags.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Users', 'Invitees', 'Photos', 'Albums', 'Comments', 'Tags', 'PhotoTags', 'AlbumTags'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      // console.log(data[0].documents);
      seeder.disconnect();
    });
 
  });
});

const user_id_minu = new mongoose.Types.ObjectId();
const user_id_david = new mongoose.Types.ObjectId();
const user_id_josh = new mongoose.Types.ObjectId();
const user_id_jack = new mongoose.Types.ObjectId();
const user_id_jill = new mongoose.Types.ObjectId();


const album_minu_yosemite_id = new mongoose.Types.ObjectId();
// const album_david_lakeTahoe_id = new mongoose.Types.ObjectId();
const album_josh_beaches_id = new mongoose.Types.ObjectId();
const album_jack_goldengate_id = new mongoose.Types.ObjectId();

const photo_yosemite_1_id = new mongoose.Types.ObjectId()
const photo_yosemite_2_id = new mongoose.Types.ObjectId()
const photo_yosemite_3_id = new mongoose.Types.ObjectId()
const photo_yosemite_4_id = new mongoose.Types.ObjectId()

const photo_golden_gate_1_id = new mongoose.Types.ObjectId()
const photo_golden_gate_2_id = new mongoose.Types.ObjectId()
const photo_golden_gate_3_id = new mongoose.Types.ObjectId()

// const photo_lake_tahoe_1_id = new mongoose.Types.ObjectId()
// const photo_lake_tahoe_2_id = new mongoose.Types.ObjectId()
// const photo_lake_tahoe_3_id = new mongoose.Types.ObjectId()
// const photo_lake_tahoe_4_id = new mongoose.Types.ObjectId()
// const photo_lake_tahoe_5_id = new mongoose.Types.ObjectId()

const photo_beaches_1_id = new mongoose.Types.ObjectId()
const photo_beaches_2_id = new mongoose.Types.ObjectId()
const photo_beaches_3_id = new mongoose.Types.ObjectId()
const photo_beaches_4_id = new mongoose.Types.ObjectId()
const photo_beaches_5_id = new mongoose.Types.ObjectId()

const comments_yosemite_album_josh_1 = new mongoose.Types.ObjectId();
const comments_yosemite_album_david_1 = new mongoose.Types.ObjectId();
const comments_yosemite_album_josh_2 = new mongoose.Types.ObjectId();
const comments_yosemite_album_minu_1 = new mongoose.Types.ObjectId();
const comments_yosemite_album_david_2 = new mongoose.Types.ObjectId();
const comments_yosemite_album_jack_1 =  new mongoose.Types.ObjectId();

const comments_yosemite_photo_1_minu_1 = new mongoose.Types.ObjectId();
const comments_yosemite_photo_1_josh_1 = new mongoose.Types.ObjectId();
const comments_yosemite_photo_2_josh_1 = new mongoose.Types.ObjectId();

var usersData = {
  'model': 'Users',
  'documents': [
    {
      '_id': user_id_minu,
      'email': 'minuemiliajames@gmail.com',
      'userName': 'Minu',
      'passWord': '$2a$08$gjjry6DbnjhZ7PsRnoA/cOJa8usqcZS8Jp0w64DGA2rGA/0DCFwSm',
      'firstName': 'Minu',
      'lastName': 'James',
      'role': 'admin',
      'profilePicture': 'ucb/minu_04-Tenaya-Lake-_-Tuolumne-Meadows'
    },
    {
      '_id': user_id_david,
      'email': 'davidbryanmarshall@gmail.com',
      'userName': 'David',
      'passWord': '$2a$08$SNgZ61kxWNplIwnJJ.C7se0bu5B1Z3iy8gh.0COFESJZso1i7QNKi',
      'firstName': 'David',
      'lastName': 'Marshall',
      'role': 'admin',
      'profilePicture':''
    },
    {
      '_id': user_id_josh,
      'email': 'siversonj@gmail.com',
      'userName': 'Josh',
      'passWord': '$2a$08$vw2MutAR3bThg4Ce3I8x.O3ce/KQGi5HnuxLnu/AjQ5zfMqe5awL.',
      'firstName': 'Josh',
      'lastName': 'Siverson',
      'role': 'admin',
      'profilePicture':'ucb/josh_04-goldengatebeachdownload'
    },
    {
      '_id': user_id_jack,
      'email': 'jack@gmail.com',
      'userName': 'Jack',
      'passWord': '$2a$08$v1nQ2jJNXZvr3LT4Y0KFu.LVwG3jkgQvMfiMMn984zrsn1Ot7ax1y',
      'firstName': 'Jack',
      'lastName': 'Berkeley',
      'role': 'user',
      'profilePicture':'ucb/jack_01-1_NZ33GHUb7yNEfWBxLv9psw'
    },
    {
      '_id': user_id_jill,
      'email': 'jill@gmail.com',
      'userName': 'Jill',
      'passWord': '$2a$08$YqAtmqKKfBimF8R.laBw1eH5eceb000p3/KSevbR7AGkcDgUzmOnG',
      'firstName': 'Jill',
      'lastName': 'Berkeley',
      'role': 'user',
      'profilePicture':''
    }
  ]
};

var tagsData = {
  'model': 'Tags',
  'documents': [
    {
      'name': '#losangeles'
    },
    {
      'name': '#monterey'
    },
    {
      'name': '#sandiego'
    },
    {
      'name': '#ocean'
    },
    {
      'name': '#beach'
    },
    {
      'name': '#mountain'
    },
    {
      'name': '#sanfrancisco'
    },
    {
      'name': '#yosemite'
    },
    {
      'name': '#laketahoe'
    },
    {
      'name': '#nature'
    },
    {
      'name': '#goldengate'
    },
    {
      'name': '#nationalparks'
    }
  ]
};

var commentsData = {
  'model': 'Comments',
  'documents': [
    {
      '_id': comments_yosemite_album_josh_1,
      'comment': "El Capitan is majestic!",
      'user': user_id_josh
    },
    {
      '_id': comments_yosemite_album_david_1,
      'comment': "Yeah! I tried climbing it last year, but I only got about 100 feet up.",
      'user': user_id_david
    },
    {
      '_id': comments_yosemite_album_josh_2,
      'comment': "The vertical climb is impossible man!",
      'user': user_id_josh
    },
    {
      '_id': comments_yosemite_album_minu_1,
      'comment': "Who would be crazy enough to climb El Capitan??!!",
      'user': user_id_minu
    },
    {
      '_id': comments_yosemite_album_jack_1,
      'comment': "I heard someone climbed it without ropes last year",
      'user': user_id_jack
    },
    {
      '_id': comments_yosemite_album_david_2,
      'comment': "Yeah, it was me ;-).. in my dreams",
      'user': user_id_david
    },
    {
      '_id': comments_yosemite_photo_1_minu_1,
      'comment': "This is my favourite photo",
      'user': user_id_minu
    },
    {
      '_id': comments_yosemite_photo_1_josh_1,
      'comment': "Wow! looks great",
      'user': user_id_josh
    },
    {
      '_id': comments_yosemite_photo_2_josh_1,
      'comment': "Wow! amazing!",
      'user': user_id_josh
    }
  ]
}

var albumsData = {
  'model': 'Albums',
  'documents': [
    {
      "_id": album_minu_yosemite_id,
      'owner': user_id_minu,
      'photos': [photo_yosemite_1_id, photo_yosemite_2_id, photo_yosemite_3_id, photo_yosemite_4_id],
      'comments': [comments_yosemite_album_josh_1, comments_yosemite_album_david_1, 
        comments_yosemite_album_josh_2, comments_yosemite_album_minu_1, 
        comments_yosemite_album_jack_1, comments_yosemite_album_david_2],
      'likes': [user_id_minu, user_id_david, user_id_josh, user_id_jack, user_id_jill],
      'title': 'Yosemite - Thanksgiving Break'
    },
    {
      "_id": album_jack_goldengate_id,
      'owner': user_id_jack,
      'photos': [photo_golden_gate_1_id, photo_golden_gate_2_id, photo_golden_gate_3_id],
      'likes': [user_id_minu, user_id_josh],
      'title': 'San Francisco Golden Gate'
    },
    {
      "_id": album_josh_beaches_id,
      'owner': user_id_josh,
      'photos': [photo_beaches_1_id, photo_beaches_2_id, photo_beaches_3_id, photo_beaches_4_id, photo_beaches_5_id],
      'likes': [user_id_minu, user_id_josh],
      'title': 'My Favorite Beaches'
    }
  ] 
};

var photosData = {
  'model': 'Photos',
  'documents': [
    // yosemite
    {
      '_id': photo_yosemite_1_id,
      'owner': user_id_minu,
      'album': album_minu_yosemite_id,
      'comments': [comments_yosemite_photo_1_minu_1, comments_yosemite_photo_1_josh_1],
      'likes': [user_id_minu, user_id_josh, user_id_jack],
      'title': 'Tanaya Lake',
      'caption': 'Tanaya Lake is worth the trip whenever you can make it.',
      'imageUploadId': 'ucb/minu_04-Tenaya-Lake-_-Tuolumne-Meadows'
      // 'link': 'https://www.yosemite.com/wp-content/uploads/2016/04/Tenaya-Lake-_-Tuolumne-Meadows.jpg',
      // 'thumbnail': 'https://www.yosemite.com/wp-content/uploads/2016/04/Tenaya-Lake-_-Tuolumne-Meadows.jpg'
    },
    {
      '_id': photo_yosemite_2_id,
      'owner': user_id_minu,
      'album': album_minu_yosemite_id,
      'comments': [comments_yosemite_photo_2_josh_1],
      'likes': [user_id_josh, user_id_david],
      'title': 'yosemite Falls',
      'caption': 'There is no waterfall like yosemite Falls, great in the summer and winter.',
      'imageUploadId': 'ucb/minu_01-yosemite-falls-81171613_1000x667'
      // 'link': 'http://www.travelyosemite.com/media/198282/yosemite-falls-81171613_1000x667.jpg?anchor=center&mode=crop&width=1000&height=667&rnd=131012949160000000',
      // 'thumbnail': 'http://www.travelyosemite.com/media/198282/yosemite-falls-81171613_1000x667.jpg?anchor=center&mode=crop&width=1000&height=667&rnd=131012949160000000'
    },
    {
      '_id': photo_yosemite_3_id,
      'owner': user_id_minu,
      'album': album_minu_yosemite_id,
      'likes': [user_id_josh, user_id_david, user_id_jill],
      'title': 'Glacier Point',
      'caption': 'From 2013',
      'imageUploadId': 'ucb/minu_02-Half_Dome_from_Glacier_Point__Yosemite_NP_-_Diliff'
      // 'link': 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg',
      // 'thumbnail': 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg'
    },
    {
      '_id': photo_yosemite_4_id,
      'owner': user_id_minu,
      'album': album_minu_yosemite_id,
      'likes': [user_id_minu],
      'title': 'Sun Set',
      'caption': 'What\'s better than a sunset?',
      'imageUploadId': 'ucb/minu_03-92681'
      // 'link': 'https://www.nationalgeographic.com/content/dam/travel/photos/000/926/92681.jpg',
      // 'thumbnail': 'https://www.nationalgeographic.com/content/dam/travel/photos/000/926/92681.jpg'
    },
    // Golden Gate
    {
      '_id': photo_golden_gate_1_id,
      'owner': user_id_jack,
      'album': album_jack_goldengate_id,
      'likes': [user_id_minu],
      'title' :'Old Bridge',
      'caption' :'Some old bridge somewhere.',
      'imageUploadId': 'ucb/jack_03-GettyImages-495282443'
      // 'link': 'http://cdn.history.com/sites/2/2017/05/GettyImages-495282443.jpg',
      // 'thumbnail': 'http://cdn.history.com/sites/2/2017/05/GettyImages-495282443.jpg'
    },
    {
      '_id': photo_golden_gate_2_id,
      'owner': user_id_jack,
      'album': album_jack_goldengate_id,
      'likes': [user_id_minu, user_id_jack, user_id_jill, user_id_david, user_id_josh],
      'title': 'Full View',
      'caption': 'As opposed to partial view.  Well, even this doesn\'t capture the whole bridge',
      'imageUploadId': 'ucb/jack_02-tdih-jan05-HD'
      // 'link': 'http://www.history.com/s3static/video-thumbnails/AETN-History_VMS/21/201/tdih-jan05-HD.jpg',
      // 'thumbnail': 'http://www.history.com/s3static/video-thumbnails/AETN-History_VMS/21/201/tdih-jan05-HD.jpg'
    },
    {
      '_id': photo_golden_gate_3_id,
      'owner': user_id_jack,
      'album': album_jack_goldengate_id,
      'likes': [user_id_minu],
      'title': 'Golden Gate At Night',
      'caption': 'Luv, luv, lov the bridge at night. Daytime with fog is cool, too.  Cali cool.',
      'imageUploadId': 'ucb/jack_01-1_NZ33GHUb7yNEfWBxLv9psw'
      // 'link': 'https://cdn-images-1.medium.com/max/1600/1*NZ33GHUb7yNEfWBxLv9psw.jpeg',
      // 'thumbnail': 'https://cdn-images-1.medium.com/max/1600/1*NZ33GHUb7yNEfWBxLv9psw.jpeg'
    },
    // Beach photos
    {
      '_id': photo_beaches_1_id,
      'owner': user_id_josh,
      'album': album_josh_beaches_id,
      'likes': [user_id_minu, user_id_david, user_id_josh],
      'title' :'Beach one',
      'caption' :'Hundreds of miles of coastline in California.',
      'imageUploadId': 'ucb/josh_04-goldengatebeachdownload'
      // 'link': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQf9BEGCggBmcPGxAO7DDXAHBo7Dra3hFonpXvXfqFXsfztGJ-1Q',
      // 'thumbnail': 'http://travel.home.sndimg.com/content/dam/images/travel/fullset/2014/05/06/cd/top-10-southern-california-beaches-la-jolla.rend.hgtvcom.1280.720.suffix/1491584248515.jpeg'
    },
    {
      '_id': photo_beaches_2_id,
      'owner': user_id_josh,
      'album': album_josh_beaches_id,
      'likes': [user_id_minu, user_id_david],
      'title' :'Beach two',
      'caption' :'Another incredible scene.',
      'imageUploadId': 'ucb/josh_05-1491592782974'
      // 'link': 'http://travel.home.sndimg.com/content/dam/images/travel/fullset/2016/03/07/california-beach-getaway-pismo-beach.jpg.rend.hgtvcom.966.725.suffix/1491592782974.jpeg',
      // 'thumbnail': 'http://travel.home.sndimg.com/content/dam/images/travel/fullset/2016/03/07/california-beach-getaway-pismo-beach.jpg.rend.hgtvcom.966.725.suffix/1491592782974.jpeg'
    },
    {
      '_id': photo_beaches_3_id,
      'owner': user_id_josh,
      'album': album_josh_beaches_id,
      'likes': [user_id_minu],
      'title' :'Beach Three',
      'caption' :'You love the beach, too?',
      'imageUploadId': 'ucb/josh_01-ferriswheel_DSC01463'
      // 'link': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPKsOwJqSLul9-D_eLlQrHLwiU8jyt6xnIU0c5G773mC-O-WE',
      // 'thumbnail': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROPKsOwJqSLul9-D_eLlQrHLwiU8jyt6xnIU0c5G773mC-O-WE'
    },
    {
      '_id': photo_beaches_4_id,
      'owner': user_id_josh,
      'album': album_josh_beaches_id,
      'likes': [user_id_minu],
      'title' :'Beach Four',
      'caption' :'Kind of chilly, but there are some great warm days here.',
      'imageUploadId': 'ucb/josh_03-WikiCoruralglass-beach-wiki-Edited'
      // 'link': 'https://mustdotravels.com/wp-content/uploads/2017/05/WikiCoruralglass-beach-wiki-Edited.jpg',
      // 'thumbnail': 'https://mustdotravels.com/wp-content/uploads/2017/05/WikiCoruralglass-beach-wiki-Edited.jpg'
    },
    {
      '_id': photo_beaches_5_id,
      'owner': user_id_josh,
      'album': album_josh_beaches_id,
      'likes': [user_id_minu],
      'title' :'Beach Five',
      'caption' :'I love this place.',
      'imageUploadId': 'ucb/josh_02-arch-rock-sunset-pearl-street-beach-laguna-beach-california'
      // 'link': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkX-9A7kp43tARu8zRDQbd8IiVApO2K9geYYKhKv1aQWGb64dU',
      // 'thumbnail': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkX-9A7kp43tARu8zRDQbd8IiVApO2K9geYYKhKv1aQWGb64dU'
    }
  ]
};

// Data array containing seed data - documents organized by Model
var data = [ tagsData, usersData, commentsData, albumsData, photosData];