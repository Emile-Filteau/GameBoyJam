GameBoyJamView = CanvasView.extend({
	constructor : function (partialURL, rootId, callback) {
		this.base(partialURL, rootId, callback);
        this.game;
	},
	
	draw : function() {
		this.game.draw(this.context['game_canvas']);
	}
});