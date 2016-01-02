/* nytWire by ryanpcmcquen v0.1.0 */

var UI = require('ui');
var ajax = require('ajax');

var card = new UI.Card({
  title: 'nytWire',
  body: 'by Ryan P.C. McQuen',
  scrollable: true
});

card.show();

ajax({
  url: 'http://api.nytimes.com/svc/news/v3/content/all.json?api-key=9b37b8880161ffb08f95df55513f0ce1:6:73910200',
  type: 'json'
  }, function(data) {
    card.title(data.results.title);
    card.body(data.results.abstract);
  }
);
