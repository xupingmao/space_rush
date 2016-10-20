
CommandCenter = function (props) {
    CommandCenter.superClass.constructor.call(this,props);
    this.init();
}

Q.inherit(CommandCenter, Q.DisplayObjectContainer);

CommandCenter.prototype.mapWidth = 10;
CommandCenter.prototype.mapHeight = 10;

CommandCenter.prototype.width = 10 * GameStage.unitWidth;
CommandCenter.prototype.height = 10 * GameStage.unitHeight;



CommandCenter.prototype.init = function () {

    // 32 * 5
    this.MAIN = new Q.MovieClip({
        id:"left",
        image:Q.getDOM("img_commandcenter"),
        useFrames:true,
        interval:5,
        x:0,
        y:0,
        scaleX: GameStage.getScaleX(CommandCenter, 150),
        scaleY: GameStage.getScaleY(CommandCenter, 150)
    });

    this.MAIN.addFrame([
        {rect: [0, 0, 150, 150]}
    ])

    this.addChild(this.MAIN);

    this.width = this.mapWidth * GameStage.unitWidth;
    this.height = this.mapHeight * GameStage.unitHeight;
}


CommandCenter.prototype.update = function (timeInfo) {
    stage.takeMapPosition(this);
    return true;
}