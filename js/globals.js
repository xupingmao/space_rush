// global variables for js-starwar

var timer, container, params, context, events, stage;
var canvas;
var SC_WIDTH  = document.body.clientWidth;  // screen width
var SC_HEIGHT = document.body.clientHeight; // screen height

EVENTS = events = Q.supportTouch ? ["touchend"] : 
                    ["mousedown","mouseup","mousemove","mouseout"];

MOUSEDOWN_EVENT = Q.supportTouch ? "touchend" : "mousedown";
MOUSEUP_EVENT   = Q.supportTouch ? "touchend" : "mouseup";
MOUSEMOVE_EVENT = Q.supportTouch ? "touchend" : "mousemove";
MOUSEOUT_EVENT  = Q.supportTouch ? "touchend" : "mouseout";


FPS = 30;
