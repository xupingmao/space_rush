
var timer, container, params, context, events, stage;
var canvas;
var _width = document.body.clientWidth;
var _height = document.body.clientHeight;
var marine,m2;
window.onload = init;

function init(){
	container = Q.getDOM("container");
	container.style.background = "-webkit-gradient(linear, 0 0, 0 bottom, from(#00889d), to(#58B000), color-stop(0.5,#94d7e1))"
	//container.style.background = "url(img/bgImg.jpg)";
	canvas = Quark.createDOM("canvas",{width:_width,height:_height});
	container.appendChild(canvas);
	context = new Quark.CanvasContext({canvas:canvas});
	stage = new Q.Stage({
		context:context, 
		width:_width, 
		height:_height, 
		update:function()
			{
			  frames++;
			}
	});
	  
	timer = new Q.Timer(1000/30);
	timer.addListener(stage);
	timer.start();
	 
	em = new Q.EventManager();
	events = Q.supportTouch ? ["touchend"] : ["mouseup"];
	em.registerStage(stage, events, true, true);

	marine = new Marine({id:"marine",x:100,y:100,autoSize:true});
	m2 = new Marine({id:'m2',x:120,y:100,autoSize:true});
	m2.state = 'right';
	m2.rect();
	marine.state = 'right';
	marine.rect();
	stage.addChild(marine);
	stage.addChild(m2);
}