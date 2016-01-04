/* newsWire by ryanpcmcquen v1.1 */

/*global require*/
/*jslint browser:true, white:true*/

// declare all variables
var UI = require('ui');
var ajax = require('ajax');
var card = new UI.Card({
  scrollable: true
});
var parser = function(data) {
  var i = 0;
  var cardUpdate = function() {
    card.title(data.results[i].title);
    card.body(data.results[i].abstract);
  };
  card.on('click', function() {
    i += 1;
    cardUpdate();
  });
  card.on('longClick', function() {
    i -= 1;
    cardUpdate();
  });
  // display without any clicking,
  // so we don't start on a blank screen
  cardUpdate();
};
var wires = {
  url: [
    'http://api.nytimes.com/svc/topstories/v1/magazine.json?api-key=dc0d0ec09ff8aa4042db01d00bf6791a:3:73910200',
    'http://api.nytimes.com/svc/news/v3/content/all.json?api-key=9b37b8880161ffb08f95df55513f0ce1:6:73910200',
    'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=9d29f172255680eda7a73565c0d1e52f:18:73910200'
  ],
  type: 'json'
};
var urlIterator = 0;
var ajaxCaller = function() {
  ajax({
    url: wires.url[urlIterator],
    type: wires.type
  }, parser);
};


// this is the actual program
ajaxCaller();
card.on('longClick', function() {
  urlIterator += 1;
  ajaxCaller();
});

card.show();