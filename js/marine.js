var Marine = function(props){

	GameStage.fixProps(props);

	Marine.superClass.constructor.call(this,props);
	this.init();
	this.width = 32;
	this.height = 32;
}
Q.inherit(Marine,Q.DisplayObjectContainer);

Marine.prototype.mapWidth = 2;
Marine.prototype.mapHeight = 2;
Marine.prototype.width = 32; // 无效，被DisplayObject覆盖了
Marine.prototype.height = 32;

Marine.prototype.createMovieClip = function (id, domId, fps) {
	fps = fps || 5;
	return new Q.MovieClip({
		id: id,
		image: Q.getDOM(domId),
		useFrames: true,
		interval: fps,
		x:0,
		y:0
	})
}


Marine.prototype.init = function(){
	var fps = 5;
	var domId = "marine"; // marine is a image id.

	var marine_attack_id = "marine_atk";

	this.left = this.createMovieClip("marine", domId, fps);
	
	this.right = this.createMovieClip("marine", domId, fps);
	
	this.up = this.createMovieClip("marine", domId, fps);
	
	this.down = this.createMovieClip("marine", domId, fps);

	this.attack_right = this.createMovieClip("attack_right", marine_attack_id, fps);

	this.attack_left = this.createMovieClip("attack_left", marine_attack_id, fps);

	this.attack_up = this.createMovieClip("attack_up", marine_attack_id, fps);

	this.attack_down = this.createMovieClip("attack_down", marine_attack_id, fps);
	
	this.left.addFrame([
	{rect:[0,64,32,32]},
	{rect:[32,64,32,32]},
	{rect:[64,64,32,32]}]);
	
	this.right.addFrame(
	[{rect:[0,32,32,32]},
	{rect:[32,32,32,32]},
	{rect:[64,32,32,32]}]
	);
	
	this.up.addFrame([
	{rect:[0,0,32,32]},
	{rect:[32,0,32,32]},
	{rect:[64,0,32,32]}]
	);
	
	this.down.addFrame([
	{rect:[0,96,32,32]},
	{rect:[32,96,32,32]},
	{rect:[64,96,32,32]}]
	);

	this.attack_right.addFrame([
		{rect: [0, 32, 32, 32]},
		{rect: [32, 32, 32, 32]}]
	);

	this.attack_left.addFrame([
		{rect: [0, 64, 32, 32]},
		{rect: [32, 64, 32,32]}
	])

	this.attack_up.addFrame([
		{rect: [0,0,32,32]},
		{rect: [32,0,32,32]}
	])

	this.attack_down.addFrame([
		{rect: [0,96,32,32]},
		{rect: [32,96,32,32]}
	])
	
	this.body = this.left;
	this.addChild(this.body);
	this.speed = 2;
	this.state = "stop";
	this.range = GameStage.unitWidth * 5;
}

Marine.prototype.rect = function(){
	this.isRect = true;
}

Marine.prototype.moveTo = function (target) {

	if (target == null) {
		return;
	}

	// Q.trace("moveTo ", target.id);

	// var distance = computeDistance(this, target);

	// if (distance < this.range) {
	// 	if (!this.state.startsWith("attack_")) {
	// 		this.state = "attack_" + this.state;
	// 	}
	// 	return;
	// }

	var x = this.x;
	var y = this.y;
	var width = this.width;
	var height = this.height;
	var range = this.range;
	
	// 在目标左边
	if (x < target.x) {

		// 目标下方
		if (y + height > target.y + target.height) {
			this.state = "up";
		// 目标上方
		} else if (y < target.y) {
			this.state = "down";
		} else {
			if (x + range >= target.x) {
				this.state = "attack_right";
			} else {
				this.state = "right";
			}
		}
	} else if (x >= target.x && x + width <= target.x + target.width) {
		// 在目标上下
		// this.y < target.y -> attack_down
		// 目标上方
		if (this.y < target.y) {
			if (this.y + this.range < target.y) {
				this.state = "attack_down";
			} else {
				this.state = "down";
			}
		}
		// this.y < target.y -> attack_up
		// 目标下方
		else if (y > target.y) {
			if (y - target.y - target.height < this.range) {
				this.state = "attack_up";
			} else {
				this.state = "up";
			}
		}

	} else {
		// 在目标右边
		// this.x > target.x + target.width -> attack_left

		if (y + height > target.y + target.height) {
			this.state = "up";
		} else if (this.y < target.y) {
			this.state = "down";
		} else if (this.x - (target.x + target.width) < this.range) {
			this.state = "attack_left";
		} else {
			this.state = "left";
		}
	}
}

Marine.prototype.attack = function (target) {
	if (!this.state.startsWith("attack")) {
		this.state = "attack_" + this.state;
	}
}

Marine.prototype.update = function(){

	// if(this.isRect){
	// 	if(this.state == 'right' && this.x >= 200) this.state = 'down';
	// 	if(this.state == 'left' && this.x <= 100) this.state = 'up';
	// 	if(this.state == 'up' && this.y <= 100) this.state = 'right';
	// 	if(this.state == 'down' && this.y >= 200) this.state = 'left';
	// }

	var nearstTower = stage.getNearestTower(this);
	this.moveTo(nearstTower);

	if (this.state == "right") {
		if (this.x + this.width + this.speed >= GameStage.getWidth()) {
			this.state = "stop";
		}
	}

	if(this.state == 'stop'){
		this.getChildAt(0).stop();
		return;
	}else{
		this.getChildAt(0).play(); // play movie clip
	}

	if (this.state.startsWith("attack")) {
		window.audioManager.play("marine_atk");
	} 
	// if (this.state == this.prev_state) {
	// 	return;
	// }

	this.removeAllChildren();
	stage.releaseMapPosition(this);
	if(this.state == 'left'){
		// this.addChild(this.left);
		this.addChildAt(this.left,0);
		this.x -= this.speed;
	}else if(this.state == 'right'){
		this.addChildAt(this.right);
		this.x += this.speed;
	}else if(this.state == 'up'){
		this.addChild(this.up);
		this.y -= this.speed;
	}else if(this.state == 'down'){
		this.addChild(this.down);
		this.y += this.speed;
	} else if (this.state == "attack_right") {
		this.addChild(this.attack_right);
	} else if (this.state == "attack_left") {
		this.addChild(this.attack_left);
	} else if (this.state == "attack_up") {
		this.addChild(this.attack_up);
	} else if (this.state == "attack_down") {
		this.addChild(this.attack_down);
	} else {
		this.addChild(this.left);
	}
	stage.takeMapPosition(this);
	// this.prev_state = this.state;
}