
function GameReporter() {
    var props = {};

    GameReporter.superClass.constructor.call(this, props);

    var unitText = new Q.Text({
        x : 0,
        y : 0,
    });

    var fpsText = new Q.Text({
        x : MAP_UNIT * 10,
        y : 0
    });

    
    this.mapX = -20;
    this.mapY = 0;
    this.mapWidth = 20;
    this.mapHeight = 2;

    this.unitText = unitText;
    this.fpsText = fpsText;

    this.life = 100;
    this.unitType = "reporter";

    this.addChild(unitText);
    this.addChild(fpsText);

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
    var unitText = this.unitText;

    var count = 0;
    stage.eachUnit(function (i, unit) {
        count++;
    });

    unitText.text = "unit: " + count;
    // text.text = "Hello,World";
    unitText.font = "25px arial";
    unitText.color = "blue";

    var fpsText = this.fpsText;
    fpsText.font = "25px arial";
    fpsText.color = "blue";
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
    
    new GameReporter();
}