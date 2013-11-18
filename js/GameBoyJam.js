include("js/model/GameBoyJamGame.js");
include("js/view/GameBoyJamView.js");

GameBoyJam = FilthyEngine.extend({
	constructor : function(containerId, fullscreen, alwaysRefresh) {
		this.base(containerId, fullscreen, alwaysRefresh);
		this.game;
		//this.view = new OrionView(this.game, canvasId)
	},

	init : function() {
		this.base();
		var ref = this;
        this.addView('GAME', 
			new GameBoyJamView('partials/game.htm', 'game_canvas', function() {
				ref.game = new GameBoyJamGame(160, 144);
				ref.getView('GAME').game = ref.game;
				ref.changeView('GAME');
			})
		);
        this.getView('GAME').init = function() {
            $(document).bind("keydown", function(event) {
                ref.game.keypress(event.which);
            });
            $(document).bind("keyup", function(event) {
                ref.game.keyrelease(event.which);
            });
            ref.setAlwaysRefresh(true);
        }
	},

    loop : function(framerate) {
        if(this.game != undefined) {
			this.getView("GAME").draw();
            this.game.update(framerate);
        }
    }
});