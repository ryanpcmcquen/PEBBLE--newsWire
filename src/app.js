/* nytWire by ryanpcmcquen v1.0 */

/*global require*/
/*jslint browser:true, white:true*/
var UI = require('ui');
var ajax = require('ajax');

var card = new UI.Card({
  scrollable: true
});

ajax({
  url: 'http://api.nytimes.com/svc/news/v3/content/all.json?api-key=9b37b8880161ffb08f95df55513f0ce1:6:73910200',
  type: 'json'
}, function(data) {
  var i = 0;
  card.on('click', function() {
    i += 1;
    card.title(data.results[i].title);
    card.body(data.results[i].abstract);
  });
  card.on('longClick', function() {
    i -= 1;
    card.title(data.results[i].title);
    card.body(data.results[i].abstract);
  });
  card.title(data.results[i].title);
  card.body(data.results[i].abstract);
});

card.show();