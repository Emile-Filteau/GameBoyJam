var AnimalConstants = {			
	idleImages : [],
	moveImages : [],
	eatImages : [],
	IDLE : 0,
	MOVE : 1,
	EAT : 2,
	RUN : 3
}
AnimalConstants['idleImages']['L'] = new Image();
AnimalConstants['idleImages']['L'].src = "/images/Mooses/Idle_left.png";
AnimalConstants['idleImages']['R'] = new Image();
AnimalConstants['idleImages']['R'].src = "/images/Mooses/Idle_right.png";

AnimalConstants['moveImages']['L'] = [];
AnimalConstants['moveImages']['L'].push(new Image());
AnimalConstants['moveImages']['L'].push(new Image());
for(i in AnimalConstants['moveImages']['L']) {
	AnimalConstants['moveImages']['L'][i].src = "/images/Mooses/move_left_"+i+".png";
}
AnimalConstants['moveImages']['R'] = [];
AnimalConstants['moveImages']['R'].push(new Image());
AnimalConstants['moveImages']['R'].push(new Image());
for(i in AnimalConstants['moveImages']['R']) {
	AnimalConstants['moveImages']['R'][i].src = "/images/Mooses/move_right_"+i+".png";
}
AnimalConstants['eatImages'] = [];
AnimalConstants['eatImages'].push(new Image());
AnimalConstants['eatImages'].push(new Image());
AnimalConstants['eatImages'].push(new Image());
for(i in AnimalConstants['eatImages']) {
	AnimalConstants['eatImages'][i].src = "/images/Mooses/eating_"+i+".png";
}

var Animal = Base.extend({
	constructor : function(x, y, age, sex, weight) {
		this.x = x;
		this.y = y;
		
		this.age = age;
		this.sex = sex;
		this.weight = weight;
		
		this.state = 0;
		this.moving = false;
		this.eating = true;
		this.direction = '';
		this.lookDirection = 'L';
		
		this.decisionCounter = 0;
		this.animationCounter = 0;
		this.animation = 0;
		
		this.imgWidth = 51;
		this.imgHeight = 51;
	},
	
	move : function(player) {
		if(this.direction.indexOf("L") !== -1) {
			this.x -= Math.random();
		}
		else if(this.direction.indexOf("R") !== -1) {
			this.x += Math.random();
		}
		if(this.direction.indexOf("U") !== -1) {
			this.y += Math.random();
		}
		else if(this.direction.indexOf("D") !== -1) {
			this.y -= Math.random();
		}
	},
	
	update : function(framerate, player) {
		if(this.x > player.x) {
			if(this.direction.indexOf("U") !== -1)
				this.lookDirection = 'L';
			else if(this.direction.indexOf("D") !== -1)
				this.lookDirection = 'R';
		}
		else {
			if(this.direction.indexOf("U") !== -1)
				this.lookDirection = 'R';
			else if(this.direction.indexOf("D") !== -1)
				this.lookDirection = 'L';
		}
		if(this.y > player.y) {
			if(this.direction.indexOf("L") !== -1)
				this.lookDirection = 'R';
			else if(this.direction.indexOf("R") !== -1)
				this.lookDirection = 'L';
		}
		else {
			if(this.direction.indexOf("L") !== -1)
				this.lookDirection = 'L';
			else if(this.direction.indexOf("R") !== -1)
				this.lookDirection = 'R';
		}
		
		if(this.state == AnimalConstants['MOVE']) {
			this.move(player);
			this.animationCounter += framerate;
			if(this.animationCounter >= 500) {
				this.animation++;
				if(this.animation >= AnimalConstants['moveImages'][this.lookDirection].length) {
					this.animation=0;
				}
				this.animationCounter = 0;
			}
		} 
		else if(this.state == AnimalConstants['EAT']) {
			this.animationCounter += framerate;
			if(this.animationCounter >= 250) {
				this.animation++;
				if(this.animation >= AnimalConstants['eatImages'].length) {
					this.animation=0;
				}
				this.animationCounter = 0;
			}
		}
		this.decisionCounter+=framerate;
		if(this.decisionCounter >= 1000) {				
			this.takeDecision();
			this.decisionCounter = 0;
		}
	},
	
	takeDecision: function() {
		if(this.state == AnimalConstants["IDLE"]) {
			var r = Math.random();
			if(r >= 0 && r < 0.25) {
				this.state = AnimalConstants['EAT'];
				this.resetCounters();
			}
			else if(r >= 0.25 && r < 0.50) {
				this.state = AnimalConstants['MOVE'];
				this.direction = "";
				dirX = Math.random();
				dirY = Math.random();
				if(dirX > 0.5)
					this.direction += "L";
				else
					this.direction += "R";
				if(dirY > 0.5)
					this.direction += "U";
				else
					this.direction += "D";
				this.resetCounters();
			}
		}
		else if(this.state == AnimalConstants["EAT"]) {
			var r = Math.random();
			if(r >= 0 && r < 0.10) {
				this.state = AnimalConstants['IDLE'];
				this.resetCounters();
			}
		}
		else if(this.state == AnimalConstants["MOVE"]) {
			var r = Math.random();
			if(r >= 0 && r < 0.30) {
				this.state = AnimalConstants['IDLE'];
				this.resetCounters();
			}
		}
	},
	
	resetCounters: function() {
		this.animation = 0;
		this.animationCounter = 0;
		this.decisionCounter = 0;
	},
	
	draw : function(context, player) {
		var distance = Math.sqrt(Math.pow(player.x - this.x, 2) + Math.pow(player.y - this.y, 2));
		
		var animalAngle = Math.atan2(player.y - this.y, player.x - this.x);
		animalAngle = animalAngle + Math.PI;
		animalAngle = animalAngle * (180/Math.PI);
		
		var sizeProportion = distance * 1.5 / player.depthOfField;
		sizeProportion = 1.5 - sizeProportion;
		
		var relativeX = 0;
		if(player.angle > 270 && animalAngle < 90)
			relativeX = (360 - player.angle + animalAngle) * 160 / player.viewAngle;
		else
			relativeX = (animalAngle - player.angle) * 160 / player.viewAngle;
		
		var relativeY = distance * 144 / 100;
		relativeY = 144 - relativeY;
		
		if(player.scoping) {
			sizeProportion = (distance / 2) * 1.5 / player.depthOfField;
			sizeProportion = 1.5 - sizeProportion;
			
			if(player.angle > 270 && animalAngle < 90)
				relativeX = (360 - player.angle - player.scopeAngleW + animalAngle) * 160 / player.viewAngle;
			else
				relativeX = (animalAngle - player.scopeAngleW - player.angle) * 160 / player.viewAngle;
			
			var scopeAngleH = player.scopeAngleH + 45;
			var deltaH = (scopeAngleH * 100) / 90;
			deltaH = deltaH - 50;
			relativeY = relativeY + (relativeY * deltaH / 100);
		}
		
		var newWidth = this.imgWidth*sizeProportion;
		var newHeight = this.imgHeight*sizeProportion;
		if(relativeX > 0 - newWidth/2 && relativeX < 160 + newWidth/2) {
			if(relativeY > 20 - newHeight/2 && relativeY < 144 + newHeight/2) {
				if(this.state == AnimalConstants['MOVE']) {
					context.drawImage(AnimalConstants['moveImages'][this.lookDirection][this.animation], relativeX-newWidth/2, relativeY-newHeight/2, newWidth, newHeight);
				} else if(this.state == AnimalConstants['EAT']) {
					context.drawImage(AnimalConstants['eatImages'][this.animation], relativeX-newWidth/2, relativeY-newHeight/2, newWidth, newHeight);	
				} else {
					context.drawImage(AnimalConstants['idleImages'][this.lookDirection], relativeX-newWidth/2, relativeY-newHeight/2, newWidth, newHeight);
				}
			}
		}
	},
	
	getDegreesBetweenPlayer : function(player) {
		var angle = 0;
		if(this.x >= player.x) {
			if(this.y >= player.y) {
				angle = Math.atan((player.y - this.y) / (player.x - this.x))
			} else {
				angle = Math.atan((player.x - this.x) / (player.y - this.y))
			}
		} else {
			if(this.y >= player.y) {
				angle = Math.atan((player.x - this.x) / (player.y - this.y))
			} else {
				angle = Math.atan((player.y - this.y) / (player.x - this.x))
			}
		}
		angle = angle * (180/Math.PI);
		return angle;
	},
	
	getCadranAngle : function(player) {
		var angle = 0;
		if(this.x >= player.x) {
			if(this.y >= player.y) {
				angle = 0;
			} else {
				angle = 270;
			}
		} else {
			if(this.y >= player.y) {
				angle = 90;
			} else {
				angle = 180;
			}
		}
		return angle;
	}
});
