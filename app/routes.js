// our router file for our API
var express = require('express')
router = express.Router()
var ModelBase = require('bookshelf-modelbase')(bookshelf)

router.route('/').get(function(req, res) {
  res.send('Hello World')
})
var Playlists = ModelBase.extend({
  tableName: 'playlists'
})

// api route
router.use(function(req, res, next) {
    // do logging
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.route('/playlists')
    .get(function(req,res){
      Playlists.findAll()
        .catch((error) => {
          console.log(error);
          res.send(error)
        })
        .then((collection) => {
          res.send(collection)
      })
    })
    .post(function(req,res){
      var songArr=[];
      req.body.songs.forEach(function(value){
        var out={
          name: value[0],
          id:value[1]
        }
        songArr.push(out);
      })
      var songJson= {
        songs: songArr
      }
      Playlists.create({name: req.body.name, songs: songJson})
        .catch((error) => {
          console.log(error)
          res.send("error")
        })
        .then((collection) => {
          console.log( 'record added:' + collection )
          res.send('Record added to DB')
        })
    })

// send our router to our app
module.exports = router
