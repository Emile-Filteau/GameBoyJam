include("js/model/Item.js");
include("js/model/Gun.js");

var Player = Base.extend({
	constructor : function(world) {
		this.x = 0;
		this.y = 0;
		this.angle = 0;
		
		this.depthOfField = 100;
		this.viewAngle = 45;
		this.moveDistance = 5;
		
		this.score = 0;
		
		this.selectedItem = 0;
		
		this.items = [];
		this.items.push(new Gun());
		this.bulletCount = 12;
		
		this.scoping = false;
		
		this.scope = new Image();
		this.scope.src = "/images/scope.png";
		
		this.scopeAngleW = 0;
		this.scopeAngleH = 0;
		
		this.world = world;
	},
	
	draw : function(context) {	
		//Top Bar
		context.fillStyle="#000000";
		context.fillRect(0,0,160,20);
		
		context.fillStyle="#FFFF00";
		context.font="8px monospace"; 
		context.fillText("score: " + this.score ,0,5);
		context.fillText("bullets: " + this.bulletCount,0,15);
		
		posStr = "x: " + this.x.toFixed(2) + " y: " + this.y.toFixed(2);
		context.fillText(posStr ,160-(posStr.length*5),5);
		angleStr = "angle: " + this.angle;
		context.fillText(angleStr ,160-(angleStr.length*5),15);
		
		if(!this.scoping) {
			this.items[this.selectedItem].draw(context);
		} else {
			context.drawImage(this.scope, 0, 20);
		} 
	},
	
	shoot : function(direction) {
		console.log('SHOOT');
		this.world.checkCollision((this));
		//this.makeNoise(alot, false)
	},
	
	action : function(keyAction) {
		if(!this.scoping) {
			if(keyAction == 'R' || keyAction == 'L') {
				this.rotate(keyAction);
			}
			else if(keyAction == 'U' || keyAction == 'D') {
				this.move(keyAction);
			}
		} else {
			if(keyAction == 'R' || keyAction == 'L' || keyAction == 'U' || keyAction == 'D') {
				this.moveScorePerspective(keyAction);
			}
		}
		
		if(keyAction == 'PRIMARY' || keyAction == 'SECONDARY') {
			this.use(keyAction);
		}
	},
	
	move : function(direction) {
		var cadran = this.getLookCadran();
		var angleTheta = (this.angle%90)+(this.viewAngle/2);
		var angleBeta = 90 - angleTheta;
		if(cadran == 0 || cadran == 2) {
			var deltaX = (this.moveDistance * Math.sin(this.degreeToRadian(angleBeta)) / Math.sin(this.degreeToRadian(90)));
			var deltaY = (this.moveDistance * Math.sin(this.degreeToRadian(angleTheta)) / Math.sin(this.degreeToRadian(90)));
		}
		if(cadran == 1 || cadran == 3) {
			var deltaX = (this.moveDistance * Math.sin(this.degreeToRadian(angleTheta)) / Math.sin(this.degreeToRadian(90)));
			var deltaY = (this.moveDistance * Math.sin(this.degreeToRadian(angleBeta)) / Math.sin(this.degreeToRadian(90)));
		}
		
		var foward = 0;
		if(direction == "U")
			foward = 1;
		else if(direction == "D")
			foward = -1;
	
		if(cadran == 0) {
			this.x += deltaX * foward;
			this.y += deltaY * foward;
		}
		else if(cadran == 1) {
			this.x -= deltaX * foward;
			this.y += deltaY * foward;
		}
		else if(cadran == 2) {
			this.x -= deltaX * foward;
			this.y -= deltaY * foward;
		}
		else if(cadran == 3) {
			this.x += deltaX * foward;
			this.y -= deltaY * foward;
		}
	},
	
	degreeToRadian: function(degree) {
		return degree * (Math.PI / 180);
	},
	
	getLookCadran: function() {
		return Math.floor(this.angle/90);
	},
	
	rotate : function(direction){
		if(direction == "R") {
			this.angle+=2;
			if(this.angle >= 360)
				this.angle = this.angle%360;
		} 
		else if(direction == "L") {
			this.angle-=2;
			if(this.angle < 0)
				this.angle = 360  + this.angle;
		}
	},
	
	moveScorePerspective : function(direction) {
		if(direction == 'L') {
			this.scopeAngleW--;
			if(this.scopeAngleW < this.viewAngle/2 *-1)
				this.scopeAngleW = this.viewAngle/2 *-1;
		} else if(direction == 'R') {
			this.scopeAngleW++;
			if(this.scopeAngleW > this.viewAngle/2)
				this.scopeAngleW = this.viewAngle/2;
		} else if(direction == 'U') {
			this.scopeAngleH++;
			if(this.scopeAngleH > 45)
				this.scopeAngleH = 45;
		} else if(direction == 'D') {
			this.scopeAngleH--;
			if(this.scopeAngleH < -45)
				this.scopeAngleH = -45;
		}
	},
	
	use : function(which) {
		if(which == 'PRIMARY') {
			this.items[this.selectedItem].usePrimary(this);
		} else {
			this.items[this.selectedItem].useSecondary(this);
		}
	},
	
	makeNoise : function(amount, isAnimalFriendly) {
		//Need to pass this to world (world.emitNoise(this, amount, isAnimalFriendly))
	}
});
