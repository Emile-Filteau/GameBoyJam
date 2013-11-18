var GunConstants = {			
	image : undefined,
	width : 100,
	height : 61
}

GunConstants['image'] = new Image();
GunConstants['image'].src = "/images/gun.png";

var Gun = Item.extend({
	constructor : function() {
		this.base();
		this.scope = 2;
	},
	
	draw : function(context) {
		context.drawImage(GunConstants.image, 70, 83);
	},
	
	usePrimary : function(player) {
		player.shoot()
	},
	
	useSecondary : function(player) {
		player.scoping = !player.scoping;
		player.scopeAngleW = 0;
		player.scopeAngleH = 0;
	}
});
