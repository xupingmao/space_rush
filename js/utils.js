function calcTextWidth(text,fontSize){
	var len = 0;
	for(var i = 0; i < text.length;i++){
		var c = text.charAt(i);
		if(isCn(c)){
			len+=fontSize;
		}
		else len+=fontSize/2;
	}
	return len;
}

function isCn(c){
	return /\u4e00-\u9fa5/.test(c);
}