var Marine = function(props){
	Marine.superClass.constructor.call(this,props);
	this.init();
}
Q.inherit(Marine,Q.DisplayObjectContainer);

Marine.prototype.init = function(){
	var fps = 5;
	this.left = new Q.MovieClip({
		id:"left",
		image:Q.getDOM("marine"),
		useFrames:true,
		interval:fps,
		x:0,
		y:0
	});
	
	this.right = new Q.MovieClip({
		id:"right",
		image:Q.getDOM("marine"),
		useFrames:true,
		interval:fps,
		x:0,
		y:0
	});
	
	this.up = new Q.MovieClip({
		id:"up",
		image:Q.getDOM("marine"),
		useFrames:true,
		interval:fps,
		x:0,
		y:0
	});
	
	this.down = new Q.MovieClip({
		id:"down",
		image:Q.getDOM("marine"),
		useFrames:true,
		interval:fps,
		x:0,
		y:0
	});
	
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
	
	this.body = this.left;
	this.addChild(this.body);
	this.speed = 1;
	this.state = "stop";
}

Marine.prototype.rect = function(){
	this.isRect = true;
}

Marine.prototype.update = function(){
	if(this.isRect){
		if(this.state == 'right' && this.x >= 200) this.state = 'down';
		if(this.state == 'left' && this.x <= 100) this.state = 'up';
		if(this.state == 'up' && this.y <= 100) this.state = 'right';
		if(this.state == 'down' && this.y >= 200) this.state = 'left';
	}
	if(this.state == 'stop'){
		this.getChildAt(0).stop();
	}else{
		this.getChildAt(0).play();
	}
	if(this.state == 'left'){
		this.removeAllChildren();
		this.addChild(this.left);
		this.x -= this.speed;
	}else if(this.state == 'right'){
		this.removeAllChildren();
		this.addChild(this.right);
		this.x += this.speed;
	}else if(this.state == 'up'){
		this.removeAllChildren();
		this.addChild(this.up);
		this.y -= this.speed;
	}else if(this.state == 'down'){
		this.removeAllChildren();
		this.addChild(this.down);
		this.y += this.speed;
	}
}