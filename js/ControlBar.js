
function newControlText (x, y) {
    return new Q.Text({
        x : x,
        y : y,
        font : "25px arial",
        color: "blue"
    });
}

function GameReporter() {
    var props = {};

    GameReporter.superClass.constructor.call(this, props);

    var fpsText = newControlText(MAP_UNIT * 10, 0);
    var marineText = newControlText(0, MAP_UNIT * 2);
    var marineAtkText = newControlText(MAP_UNIT * 10, MAP_UNIT* 2);

    this.mapX = -20;
    this.mapY = 0;
    this.mapWidth = 20;
    this.mapHeight = 4;

    this.fpsText = fpsText;

    this.marineText = marineText;
    this.marineAtkText = marineAtkText;
    
    this.life = 100;
    this.unitType = "reporter";

    this.addChild(fpsText);
    this.addChild(marineText);
    this.addChild(marineAtkText);

    stage.addUnit(this);

    setInterval(function () {
        fpsText.text = "fps:" + stage.frames;
        stage.frames = 0;
    }, 1000);
}

Q.inherit(GameReporter, Q.DisplayObjectContainer);

GameReporter.prototype.update = function () {
    if (stage.frames % 5 != 0) {
        return;
    }

    var count = 0;
    stage.eachUnit(function (i, unit) {
        count++;
    });

    this.marineText.text = "unit: " + count;
}

function InitControlBar(container) {
    // draw tower information
    // draw enemy information
    // draw money, tools, etc.
    // menu

    var controlBarId = "img_control_bar";
    var width = MAP_UNIT * 10;
    var height = GameStage.height;

    var controlBar = new Quark.Bitmap({
        image : Q.getDOM(controlBarId),
        rect  : [0, 0, width, height],
        scaleX: width / 100,
        scaleY: height / 600
    });
    var target = {
        x : 0, 
        y : 0,
        mapWidth: 10,
        mapHeight: GameStage.mapHeight
    };

    controlBar.life = 100;
    controlBar.mapWidth = 10;
    controlBar.mapHeight = GameStage.mapHeight;

    stage.addUnit(controlBar);
    stage.addUnit(CTRL_BACK_BTN);
    
    new GameReporter();
}