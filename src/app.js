/*! newsWire by ryanpcmcquen v1.7 */
/*global require*/
/*jslint browser:true, white:true*/
// declare all variables
var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');

// only require statements need to be outside the closure
(function () {

  'use strict';

  var card = new UI.Card({
    scrollable: true,
    style: 'small'
  });

  var iterator = 0;
  var parser = function (data) {
    var cardUpdate = function () {
      card.subtitle(data.results[iterator].title);
      card.body(data.results[iterator].abstract);
    };
    card.on('click', function () {
      iterator += 1;
      cardUpdate();
    });
    card.on('longClick', function () {
      iterator -= 1;
      cardUpdate();
    });
    // display without any clicking,
    // so we don't start on a blank screen
    cardUpdate();
  };

  var wires = {
    url: [
      'https://api.nytimes.com/svc/topstories/v1/magazine.json?api-key=dc0d0ec09ff8aa4042db01d00bf6791a:3:73910200',
      'https://api.nytimes.com/svc/news/v3/content/all.json?api-key=9b37b8880161ffb08f95df55513f0ce1:6:73910200',
      'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=9d29f172255680eda7a73565c0d1e52f:18:73910200'
    ],
    type: 'json'
  };

  var urlIterator = 0;
  var ajaxCaller = function () {
    ajax({
      url: wires.url[urlIterator],
      type: wires.type
    }, parser);
  };

  // this is the actual program
  ajaxCaller();
  Accel.on('tap', function () {
    if (urlIterator < (wires.url.length - 1)) {
      urlIterator += 1;
    } else {
      urlIterator = 0;
    }
    iterator = 0;
    ajaxCaller();
  });

  card.show();

}());
