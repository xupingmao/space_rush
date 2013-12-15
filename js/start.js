function start(){
	ctx.drawImage(imgList['background'],0,0,width,height);
	ctx.font = "60px Verdana";
	var title = "JS StarWar";
	var len = calcTextWidth(title,60);
	var x = (width-len)/2;
	var y = height / 2;
	ctx.fillText(title, x,y);
	console.log('x:',x,' ','y:',y);
}

init(start);