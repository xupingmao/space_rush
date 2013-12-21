var NormalBtn = function(_id, _text, _x, _y){
	var _btn = new Q.Button({id:_id, image:Q.getDOM("button"), 
	x:_x, y:_y, width:99, height:38,
	scaleX:2,
	scaleY:2,
	up:{rect:[0,0,99,38]},
	over:{rect:[0,38,99,38]},
	down:{rect:[0,38,99,38]},
	disabled:{rect:[0,0,99,38]}
	});
	var _text = new Q.Text({
		font:"20px arial",
		text:_text,
		textAlign:"center",
		lineWidth:100,
		y:5
	});
	_btn.addChild(_text);
	return _btn;
}

var startBtn = new NormalBtn("start",'开始',600,250)
var aboutBtn = new NormalBtn("about",'关于',600,350)