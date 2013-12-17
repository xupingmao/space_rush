
var timer, container, params, context, events, stage;
var canvas;
//var _width = document.body.clientWidth;
//var _height = document.body.clientHeight;
var _width = 1000;
var _height = 600;
var marine,m2;
var startAudio = new Audio("./audio/Heaven's Devils.mp3",true,false,true);
window.onload = init;

function init(){
	container = Q.getDOM("container");
	//container.style.background = "-webkit-gradient(linear, 0 0, 0 bottom, from(#00889d), to(#58B000), color-stop(0.5,#94d7e1))"
	//container.style.background = "url(img/start.png)";
	canvas = Quark.createDOM("canvas",{width:_width,height:_height});
	container.appendChild(canvas);
	context = new Quark.CanvasContext({canvas:canvas});
	//context = new Q.DOMContext({canvas:container});
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
	events = Q.supportTouch ? ["touchend"] : ["mousedown","mouseup","mousemove","mouseout"];
	em.registerStage(stage, events, true, true);

	marine = new Marine({id:"marine",x:100,y:100,autoSize:true});
	m2 = new Marine({id:'m2',x:120,y:100,autoSize:true});
	m2.state = 'right';
	m2.rect();
	marine.state = 'right';
	marine.rect();
	var bg = new Quark.Bitmap({image:Q.getDOM("background"),rect:[0,0,1200,748],scaleX:1000/1200,scaleY:600/768});
	stage.addChild(bg);
	stage.addChild(marine);
	stage.addChild(m2);
	stage.addChild(startBtn);
	stage.addChild(aboutBtn);
	startAudio.play();
	startBtn.addEventListener(events[0],function(){
		stage.removeChild(marine);
		stage.removeChild(m2);
	});
	aboutBtn.addEventListener(events[0],function(){
		stage.addChild(marine);
		stage.addChild(m2);
	});
}