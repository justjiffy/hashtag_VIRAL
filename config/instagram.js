Instagram = require('instagram-node-lib');

Instagram.set('client_id', 'cd52513b4ad04996b712dd40ff523962');
Instagram.set('client_secret', '0ebac9c429a54249bcaa5b5d67e88b15');


module.exports = Instagram.media.popular({
  complete: function(data){
    console.log(data[0].caption.text);
  }
});

// module.exports = Instagram.tags.search({
//   q: 'banana',
//   count: 1,
//   complete: function(data){
//     console.log(data);
//   }
// });