'use strict';

var Table = function() {
  
  var _placeWidth = 120;
  var _placeHeight = 140;
  
  var countbywidth;
  var countbyheight;
  
  var _margin;

  var availabletables = [];
  var maxplaces = 0;
  
  var _1max; 
  var _2max;
  var _4max;
  var _6max;
  var _8max;
  var _10max;

  var _schemes = {
    "tables": [
        // small screen
        // vertical tables   
        //
         // properties: 
        // ====================
        // width - min width, 
        // height - min height,
        // count - count of places, 
        // places - scheme
        {
          name: "table 1", width: 3, height: 4, count: 8, places: [
          ["board","board","board"],
          ["6","7","8"],
          ["5","deck","1"],
          ["4","3","2"]]
        },
        {
          name: "table 2", width: 3, height: 4, count: 6, places: [
          ["","deck",""],
          ["5","6","1"],
          ["board","board","board"],
          ["4","3","2"]]
      },
        {
          name: "table 3", width: 3, height: 4, count: 4, places: [
          ["","deck",""],
          ["4","","1"],
          ["board","board","board"],
          ["3","","2"]]
        },
        {
          name: "table 4", width: 3, height: 4, count: 2, places: [
          ["","deck",""],
          ["","1",""],
          ["board","board","board"],
          ["","2",""]]
        },
        {
          name: "table 5", width: 3, height: 3, count: 1, places: [
          ["","deck",""],
          ["board","board","board"],
          ["","1",""]]
        },
        // small screen  
        // horizontal tables
        {
          name: "table 6", width: 5, height: 2, count: 6, places: [
          ["deck","board","board","board","1"],
          ["6","5","4","3","2"]]
        },
        {
          name: "table 7", width: 5, height: 2, count: 4, places: [
          ["deck","board","board","board","1"],
          ["4","","3","","2"]]
        },
        {
          name: "table 8", width: 5, height: 2, count: 2, places: [
          ["deck","board","board","board",""],
          ["","2","","1",""]]
        },
        {
          name: "table 9", width: 5, height: 2, count: 1, places: [
          ["deck","board","board","board",""],
          ["","","1","",""]]
        },
        // big screen
        // horizontal tables
        {
          name: "table 10", width: 12, height: 5, count: 10, places: [
          ["","","7","","8","","","9","","10","",""],
          ["","","","","","deck","deck","","","","",""],
          ["","6","","","board","board","board","board","","","1",""],
          ["","","","","","","","","","","",""],
          ["","","5","","4","","","3","","2","",""]]
        },
        {
          name: "table 11", width: 11, height: 5, count: 10, places: [
          ["","","7","","8","","9","","10","",""],
          ["","","","","","deck","","","","",""],
          ["","6","","","board","board","board","","","1",""],
          ["","","","","","","","","","",""],
          ["","","5","","4","","3","","2","",""]]
        },
        {
          name: "table 12", width: 11, height: 5, count: 8, places: [
          ["","","","6","","7","","8","","",""],
          ["","","","","","deck","","","","",""],
          ["","","5","","board","board","board","","1","",""],
          ["","","","","","","","","","",""],
          ["","","","4","","3","","2","","",""]]
        },
        {
          name: "table 13", width: 11, height: 5, count: 6, places: [
          ["","","","4","","5","","6","","",""],
          ["","","","","","deck","","","","",""],
          ["","","","","board","board","board","","","",""],
          ["","","","","","","","","","",""],
          ["","","","3","","2","","1","","",""]]
        },
      
      ]
  };

  var _table;
  
 
  function Calc() {
    var _innerwidth = window.innerWidth;
    var _innerheight = window.innerHeight;
    
    
    if ( _placeWidth !== 0 || _placeHeight !== 0 ) {
      
      countbywidth = Math.floor(_innerwidth/_placeWidth, 0);
      countbyheight = Math.floor(_innerheight/_placeHeight, 0);
      console.log('horizontal places: ' + countbywidth + ' - vertical places: ' + countbyheight);
    }

    availabletables = [];
    maxplaces = 0;

    _schemes.tables.forEach( function( table, i ){
      if ( table.width <= countbywidth && table.height <= countbyheight ) {
        availabletables.push(table);
        if ( maxplaces <= table.count ) maxplaces = table.count;
        if ( table.count == 1 ) _1max = table;
        if ( table.count == 2 ) _2max = table;
        if ( table.count == 4 ) _4max = table;
        if ( table.count == 6 ) _6max = table;
        if ( table.count == 8 ) _8max = table;
        if ( table.count == 10 ) _10max = table;

      }
    });


    console.log(maxplaces);
  } 

  Calc();

  var self = {
    table: _table, 
    placeWidth: _placeWidth, placeHeight: _placeHeight, 
    countbywidth: countbywidth, countbyheight: countbyheight,
    margin: _margin, 
    Calc: Calc, 
    availabletables: availabletables, 
    maxplaces: maxplaces,
    schemes: _schemes,
    table_1max: _1max,
    table_2max: _2max,
    table_4max: _4max,
    table_6max: _6max,
    table_8max: _8max,
    table_10max: _10max,
  };
  
  return self;
};