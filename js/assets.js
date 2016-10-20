// assets

/**
 * images
 */


function createBackgroundImage (id, width, height) {
    // body...

    // var element = document.getElementById(id);
    return new Quark.Bitmap({
        image : Q.getDOM(id),
        rect  : [0, 0, width, height],
        scaleX: GameStage.getWidth() / width,
        scaleY: GameStage.getHeight() / height
    });
}

window.START_BG = createBackgroundImage("img_background", 1200, 748);
window.ABOUT_BG = createBackgroundImage("img_about", 1920, 1200);
window.GAME_BG1 = createBackgroundImage("img_bg1", 756, 512);

/**
 * buttons
 */
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

var START_BTN = new NormalBtn("start",'开始', GameStage.width * 0.2,250);
var ABOUT_BTN = new NormalBtn("about",'关于', GameStage.width * 0.2,350);
var BACK_BTN  = new NormalBtn("back", "返回", GameStage.width * 0.2,100);

