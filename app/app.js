var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var bookmarks = require( './bookmarks.json' );
var handlebars = require( 'express-handlebars' )

var app     = express();
app.set('views', __dirname + '/views');

app.engine( 'handlebars', handlebars( { defaultLayout: __dirname + '/views/layouts/main' } ) );
app.set( 'view engine', 'handlebars' );

app.get( '/', function( req, res ){
  res.render( 'index', { bookmarks: bookmarks });
});

app.get( '/scrape', function( req, res ) {
 var url = 'https://pinboard.in/popular';
 request( url, function( error, response, html ) {

   if( !error ) {
     var $ = cheerio.load( html );
     var title, bookmark;
     var json = {
       title: "",
       url: ""
     };

     var bookmarks = $( '.bookmark_title' ).map( function() {
       return this.attribs.href ;
     }).get();

     console.log( bookmarks );
   }

   res.end();
 });
});

// This should write to a json
var scrapePinboard = function scrapePinboard() {
  var url = 'https://pinboard.in/popular';

  request( url, function( error, response, html ) {

    if( !error ) {
      var $ = cheerio.load( html );
      var title, bookmark;
      var json = {
        title: "",
        url: ""
      };

      var bookmarks = $( '.bookmark_title' ).map( function() {
        return this.attribs.href ;
      }).get();

      return bookmarks;
    };
  });
};

app.listen('8081');

console.log('8081 is the word');

exports = module.exports = app;
