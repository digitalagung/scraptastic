var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
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

   response.end();
 });


});

app.listen('8081');

console.log('8081 is the word');

exports = module.exports = app;
