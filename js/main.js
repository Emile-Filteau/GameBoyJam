include("js/GameBoyJam.js");

var engine;

var FRAMERATE = 1000/30;
var lastLoop = new Date().getTime();
window.onload = init;

function init() {
	engine = new GameBoyJam('game_container', false, false);
	engine.init();
	loop();
}

function loop() {
	var newLoop = new Date().getTime();
	interval = newLoop - lastLoop;
	engine.loop(interval);
	
	lastLoop = new Date().getTime();
	setTimeout(loop, FRAMERATE);
}