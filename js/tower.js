


Tower = function (props) {

    this.NORMAL = new Q.MovieClip({
        id : "Tower",
        image: Q.getDOM("img_photon_tower"),
        useFrames: true,
        interval: 5,
        x: 0,
        y: 0,
        scaleX : GameStage.getScaleX(Tower, 96),
        scaleY : GameStage.getScaleY(Tower, 96)
    })

    this.NORMAL.addFrame([
        {rect: [0,0,96,96]}
    ]);

    GameStage.fixProps(props);
    
    Tower.superClass.constructor.call(this, props);
    this.addChild(this.NORMAL);

    this.width = this.mapWidth * GameStage.unitWidth;
    this.height = this.mapHeight * GameStage.unitHeight;
}

Q.inherit(Tower, Q.DisplayObjectContainer);

Tower.prototype.mapWidth = 6;
Tower.prototype.mapHeight = 6;
Tower.prototype.width = 6 * GameStage.unitWidth;
Tower.prototype.height = 6 * GameStage.unitHeight;

Tower.prototype.update = function (timeInfo) {
    stage.takeMapPosition(this);
    return true;
}