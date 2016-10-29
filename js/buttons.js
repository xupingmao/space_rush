
/**
 * buttons
 */
var NormalBtn = function(_id, _text, _x, _y){
    var _btn = new Q.Button({id:_id, image:Q.getDOM("button"), 
    x:_x, 
    y:_y, 
    width:99, 
    height:38,
    scaleX:2,
    scaleY:2,
    up:        {rect:[0,0,99,38]},
    over:      {rect:[0,38,99,38]},
    down:      {rect:[0,38,99,38]},
    disabled:  {rect:[0,0,99,38]}
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

var SmallBtn = function (_id, _text, _x, _y) {
    var width = MAP_UNIT * 8;
    var height = MAP_UNIT * 3;
    var _btn = new Q.Button({id:_id, image:Q.getDOM("button"), 
    x:        _x, 
    y:        _y, 
    width:    width,
    height:   height,
    scaleX:   width / 99,
    scaleY:   height / 38,
    up:       {rect:[0,0,99,38]},
    over:     {rect:[0,38,99,38]},
    down:     {rect:[0,38,99,38]},
    disabled: {rect:[0,0,99,38]}
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

var START_BTN = new NormalBtn("start",'开始', GameStage.width * 0.2,250);
var ABOUT_BTN = new NormalBtn("about",'关于', GameStage.width * 0.2,350);
var BACK_BTN  = new NormalBtn("back", "返回", GameStage.width * 0.2,100);

var CTRL_BACK_BTN = new SmallBtn("back", "返回", MAP_UNIT, MAP_UNIT * 5);

function buttonsInit() {
    
    START_BTN.addEventListener(MOUSEDOWN_EVENT,function(){
        // stage.removeChild(marine);
        // stage.removeChild(m2);
        gameStart();
    });

    ABOUT_BTN.addEventListener(MOUSEDOWN_EVENT,function(){
        displayAboutInformation();
    });

    BACK_BTN.addEventListener(MOUSEDOWN_EVENT, function() {
        animate_back();
        // welcome();
    });

    CTRL_BACK_BTN.addEventListener(MOUSEDOWN_EVENT, function () {
        stage.clear();
        animate_back();
        audioManager.play("start", true);// 暂停之前的音乐
    })
}