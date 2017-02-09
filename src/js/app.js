/*! newsWire by ryanpcmcquen v1.9 */
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
      'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=e01b603e40e14a5bb70f36d2a80e722e',
      'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=e01b603e40e14a5bb70f36d2a80e722e'
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