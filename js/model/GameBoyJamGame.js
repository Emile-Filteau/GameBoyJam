include("js/model/GameWorld.js");
include("js/model/Player.js");

var GameBoyJamGame = Game.extend({
	constructor : function(cameraWidth, cameraHeight) {
		this.base(cameraWidth, cameraHeight, new GameWorld(500, 500));
		
		this.player = new Player(this.world);
	},
	
	draw : function(context) {
		this.world.draw(context, this.player);
		this.player.draw(context);
	},

	update : function(framerate) {
		this.base(framerate);
		this.world.update(framerate, this.player);
	},
	
	keypress : function(key) {
		this.base(key);
		//droite
		if(key == 39) {
			this.player.action('R');
		}
		//haut
		else if(key == 38) {
			this.player.action('U');
		}
		//gauche
		else if(key == 37) {
			this.player.action('L');
		}
		//bas
		else if(key == 40) {
			this.player.action('D');
		}
		//Z
		else if(key == 90) {
			this.player.action('PRIMARY');
		}
		//X
		else if(key == 88) {
			this.player.action('SECONDARY');
		}
		//ENTER
		else if(key == 13) {
			
		}
		//SHIFT
		else if(key == 16) {
			
		}
	},

    resize : function(width, height) {
        this.camera.resize(width, height, this.world);
    },
	
	keyrelease : function(key) {
		this.base(key);
		//droite
		if(key == 39) {
		}
		//haut
		else if(key == 38) {
		}
		//gauche
		else if(key == 37) {
		}
		//bas
		else if(key == 40) {
		}
		//Z
		else if(key == 90) {
			
		}
		//X
		else if(key == 88) {
			
		}
		//ENTER
		else if(key == 13) {
			
		}
		//SHIFT
		else if(key == 16) {
			
		}
	}
});
