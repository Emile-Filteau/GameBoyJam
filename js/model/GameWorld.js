include("js/model/Animal.js");

var GameWorld = Base.extend({
	constructor : function(width, height) {
		this.width = width;
		this.height = height;
		
		this.animals = [];
		this.animals.push(new Animal(40, 30, 10, 'M', 180));
		this.animals.push(new Animal(10, 5, 10, 'M', 180));
	},
	
	update : function(framerate, player) {
		for(i in this.animals) {
			this.animals[i].update(framerate, player);
			
			var distance = Math.sqrt(Math.pow(player.x - this.animals[i].x, 2) + Math.pow(player.y - this.animals[i].y, 2));
			if(distance > 200) {
				this.animals.splice(i, 1);
			}
		}
		//console.log(this.animals.length);
	},
	
	spawnAnimal : function() {
	
	},
	
	draw : function (context, player) {
		this.base(context);
		/*
		//MAP
		context.fillStyle="#006600";
		context.fillRect(160,0,160,144);
		
		context.strokeStyle = "000000";
		context.strokeRect(160,0,160,144);
		
		context.fillStyle = "FFFF00";
		context.fillRect(160+ player.x+80-2.5,player.y+80-2.5,5,5);
		*/
		
		context.fillStyle = "996633";
		for(i in this.animals) {
			animal = this.animals[i]
			context.fillRect(160+ animal.x+80-2.5,animal.y+80-2.5,5,5);
		}
		
		//Background
		context.fillStyle="#006600";
		context.fillRect(0,20,160,144);
		
		
		context.fillStyle="#FFFF00";
		
		for(i=1;i<70;i+=2) {
			j = i * 100 / 70;
			j = 100 - j + 20;
			context.fillRect(i,j,1,1);
		}
		for(i=91;i<160;i+=2) {
			j = (i-90) * 100 / 70 + 20	;
			context.fillRect(i,j,1,1);
		}
		
		x = 2;
		for(j=20;j<144;j+=x) {
			x+=2;
			for(i=0;i<160;i+=4) {
				context.fillRect(i,j,1,1);
			}
		}
		//Animals
		for(i in this.animals) {
			this.animals[i].draw(context, player);
		}
	},
	
	
	checkCollision : function(player) {
		//"draw" a line where the gun is pointing (height?) of length = viewDepth (*2?)
		//for each points on this line, check if there is a Moose (animal width / height offsets)
		//when an animal is found, kill it and return it
	}
	
});
