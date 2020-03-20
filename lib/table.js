'use strict';

var Table = function() {
  
  var _placeWidth = 120;
  var _placeHeight = 140;
  
  var countbywidth;
  var countbyheight;
  
  var _margin;
  
  var _table;
  
  var _1max; 
  var _2max;
  var _4max;
  var _6max;
  var _8max;
  var _10max;
  
  var self = {
    table: _table, placeWidth: _placeWidth, placeHeight: _placeHeight, margin: _margin, Calc: Calc
  };
  
  function Calc() {
    var _innerwidth = window.innerWidth;
    var _innerheight = window.innerHeight;
    
    
    if ( _placeWidth !== 0 || _placeHeight !== 0) {
      
      countbywidth = Math.floor(_innerwidth/_placeWidth, 0);
      countbyheight = Math.floor(_innerheight/_placeHeight, 0);
      console.log(countbywidth + ' - ' + countbyheight);
    }
  } 
  
  return self;
};