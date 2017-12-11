# Cali.cool

## User Story

People who love California want an intiential community whereby they can share their artform of photography with like interested people.

## Synopsis

People love California. From the forests of Redwoods, to the oceans of Huntington to the vibrancy of Los Angles and the wild of Santa Cruz there is much to experience in California. Though many ways to express form of expression, photography captures so much of the life of California. Cali.cool is a platform to share captured experiences about California.

## Motivation

As creators of Cali.cool we want a platform that is welcoming and encouraging to all those who love share their experiences in and of California.


## Visual Application Walkthrough

  <video controls="controls" allowfullscreen="true" poster="calicool-walkthrough_20171210-poster.png">
    <source src="calicool-walkthrough_20171210.mp4" type="video/mp4">
  </video> 

![Cali.cool Walkthrough](calicool-walkthrough_20171210.gif "cali.cool walkthrough")
[Video Walkthrough](calicool-walkthrough_20171210.mp4)

## Technologies:

MERN Stack
* [MongoDB](https://www.mongodb.com/) - Document-oriented NoSQL database
  * [Mongoose](http://mongoosejs.com/) - Schema solution for MongoDB
* [Express](https://expressjs.com/) - Application framework/server
* [React.js](https://reactjs.org/) - JavaScript library for building user interfaces
  * [React Router](https://github.com/ReactTraining/react-router) - Declarative routing for React
  * [Yarn](https://yarnpkg.com/en/) - Dependency management
* [Node.js](https://nodejs.org/en/) - JavaScript runtime engine
  * [Passport.js](http://www.passportjs.org/docs/) - Authentication middleware
  * [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client
* [Heroku](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0ahUKEwihmIzp8IDYAhVQxWMKHe_SAOcQFggzMAA&url=https%3A%2F%2Fwww.heroku.com%2F&usg=AOvVaw1V4lhSv6mb_lZj6UUCUXpS) - Application hosting
  * [MLab](https://elements.heroku.com/addons/mongolab) - MongoDB hosting
  * [PointDNS](https://devcenter.heroku.com/articles/pointdns) - Domain management
* [Cloudinary](https://cloudinary.com/) - Cloud-based image management

## Installation

1. Clone repo and install NPM packages:

    ```
    git clone https://github.com/dbmarshall/cali-cool
    cd cali-cool/
    yarn install 
    cd client/
    yarn install 
    cd ../
    ```

2. Start server (local environment only):

    ```
    yarn start
    ```

## Available Node Commands and URLs

**Local:** 

* Should live-reload upon `yarn start`: [http://localhost:3000/](http://localhost:3000/) 

**Heroku Deployment:** 

* Load [https://cali-cool.herokuapp.com/](https://cali-cool.herokuapp.com/) 

## Code Highlights
```javascript
<!-- Using promise based syntax to find user by ID with Mongoose and populate with data from photos and user collections -->

findById: function(req, res) {
    db.Albums
      .findById(req.params.id)
      .populate({
        path: "photos",
        populate: [{
          path: "owner",
          model: "Users",
          select: ["_id", "userName"]
        },
        {
          path: "album",
          model: "Albums",
          select: ["_id", "title"]
        }]
      })
      .populate("owner")
      .populate({
        path: 'comments',
        options: {
          sort: {
            dateUpdated: -1
          }
        },
        populate: {
          path: 'user',
          model: 'Users'
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
```

```javascript
<!-- populates main page with most liked photos -->
mostLiked: function(req, res){
    var oneDay = (1000 * 60 * 60 * 24);
    var twoWeeksBack = new Date(new Date() - (14 * oneDay));
    console.log(new Date(twoWeeksBack));

    db.Photos.aggregate([
      {$match: { dateUpdated : { $gte: twoWeeksBack}}},
      {$unwind: "$likes"}, 
      {$group: {_id:"$_id", size: {$sum: 1}}},
      {$sort: {size:-1}},
      {$project: { caption: "$caption", _id: "$_id"}},
      ])
      .limit(12)
      .then(photos => {
        const photoIdArray = photos.map(function(photo){
          return photo._id;
        });
        
        db.Photos
        .find( {_id : { $in : photoIdArray }})
        .populate({
          path: "album",
          select: ["_id", "title"]
        })
        .populate({
          path: "owner",
          select: ["_id", "userName"]
        })
        .then(photoDBModels => {
          let results = [];
          photoIdArray.forEach(function(refPhotoId){
            let result = photoDBModels.filter(function(photoObj){
              return (refPhotoId.toString() == photoObj._id.toString());
            });
            results.push(result[0]);
          });
          res.json(results);
        })
      })
      .catch(err => res.status(422).json(err));
  }
```

## Authors

* **Minu James** ([minujames.com](http://minujames.com/))
* **Josh Siverson** ([siverson90.github.io](https://siverson90.github.io/))
* **David Morse** ([marshall.media](http://www.marshall.media/))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

