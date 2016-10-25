var Marine = function(props){

	GameStage.fixProps(props);

	Marine.superClass.constructor.call(this,props);
	this.init();
	this.width = 32;
	this.height = 32;
	this.life = 10;

	stage.addUnit(this);
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
	this.range = 5;
}

Marine.prototype.rect = function(){
	this.isRect = true;
}

Marine.prototype.moveTo = function (target) {

	if (target == null) {
		return;
	}

	if (this.x % MAP_UNIT != 0 || this.y % MAP_UNIT != 0) {
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

	var x = parseInt(this.x / MAP_UNIT) ;
	var y = parseInt(this.y / MAP_UNIT) ;

	var width = parseInt(this.width / MAP_UNIT);
	var height = parseInt(this.height / MAP_UNIT);
	var range = this.range;

	var th = parseInt(target.height / MAP_UNIT);
	var tw = parseInt(target.width / MAP_UNIT);
	var tx = parseInt(target.x / MAP_UNIT);
	var ty = parseInt(target.y / MAP_UNIT);
	
	// 在目标左边
	if (x < tx) {

		// 目标下方
		if (y + height > ty + th) {
			this.state = "up";
		// 目标上方
		} else if (y < ty) {
			this.state = "down";
		} else {
			if (x + range >= tx) {
				this.state = "attack_right";
			} else {
				this.state = "right";
			}
		}
	} else if (x >= tx && x + width <= tx + tw) {
		// 在目标上下
		// this.y < target.y -> attack_down
		// 目标上方
		if (y < ty) {
			if (y + range < ty) {
				this.state = "attack_down";
			} else {
				this.state = "down";
			}
		}
		// this.y < target.y -> attack_up
		// 目标下方
		else if (y > ty) {
			if (y - ty - th < range) {
				this.state = "attack_up";
			} else {
				this.state = "up";
			}
		}

	} else {
		// 在目标右边
		// this.x > target.x + target.width -> attack_left

		if (y + height > ty + th) {
			this.state = "up";
		} else if (y < ty) {
			this.state = "down";
		} else if (x - (tx + tw) < range) {
			this.state = "attack_left";
		} else {
			this.state = "left";
		}
	}

	var mx = x;
	var my = y;

	if (this.state == "left") {
		if (!can_left(this)) {
			// 尝试上下
			if (can_up(this)) {
				this.state = "up";
			} else if (can_down(this)) {
				this.state = "down";
			} else {
				this.state = "still";
			}
		}
	} else if (this.state == "right") {
		if (!can_right(this)) {
			if (can_up(this)) {
				this.state = "up";
			} else if (can_down(this)) {
				this.state = "down";
			} else {
				this.state = "still";
			}
		}
	} else if (this.state == "up") {
		if (!can_up(this)) {
			if (can_left(this)) {
				this.state = "left";
			} else if (can_right(this)) {
				this.state = "right";
			} else {
				this.state = "still";
			}
		}
	} else if (this.state == "down") {
		if (!can_down(this)) {
			if (can_left(this)) {
				this.state = "left";
			} else if (can_right(this)) {
				this.state = "right";
			} else {
				this.state = "still";
			}
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

	var state = this.state;

	if (state == "still") {
		return;
	}

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

Marine.prototype.attacked = function (target) {
	this.life -= target.physicalDamage;
}

Marine.prototype.die = function () {
	stage.releaseMapPosition(this);
	window.audioManager.play("marine_die");
}