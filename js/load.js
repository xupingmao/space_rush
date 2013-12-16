var imgList = {};
var width = canvas.width;
var height = canvas.height;
var gameState = "start";
function init(callback){
	var progress = 0;
	var target = 2;
	
	function checkLoad(){
		progress++;
		if(target==progress)callback();
	}

	var bgImg = new Image();
	bgImg.onload = checkLoad;
	bgImg.src = "./img/bgImg.jpg";
	imgList['background'] = bgImg;
	
	var marineImg = new Image();
	marineImg.onload = checkLoad;
	marineImg.src = "./img/marine.gif"
	imgList['marine'] = marineImg;

}