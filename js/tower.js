
var Tower = function (props) {
    Tower.superClass.constructor.call(this,props);
    this.init();
}

Q.inherit(Tower, Q.DisplayObjectContainer);

Tower.prototype.mapWidth = 10;
Tower.prototype.mapHeight = 10;

Tower.prototype.width = 10 * GameStage.unitWidth;
Tower.prototype.height = 10 * GameStage.unitHeight;



Tower.prototype.init = function () {

    // 32 * 5
    this.MAIN = new Q.MovieClip({
        id:"left",
        image:Q.getDOM("img_tower"),
        useFrames:true,
        interval:5,
        x:0,
        y:0,
        scaleX: GameStage.getScaleX(Tower, 150),
        scaleY: GameStage.getScaleY(Tower, 150)
    });

    this.MAIN.addFrame([
        {rect: [0, 0, 150, 150]}
    ])

    this.addChild(this.MAIN);

    this.width = this.mapWidth * GameStage.unitWidth;
    this.height = this.mapHeight * GameStage.unitHeight;
}

Tower.prototype.update = function (timeInfo) {
    stage.takeMapPosition(this);
    return true;
}

NormalTower = function (props) {

    this.NORMAL = new Q.MovieClip({
        id : "normalTower",
        image: Q.getDOM("img_photon_tower"),
        useFrames: true,
        interval: 5,
        x: 0,
        y: 0,
        scaleX : GameStage.getScaleX(NormalTower, 96),
        scaleY : GameStage.getScaleY(NormalTower, 96)
    })

    this.NORMAL.addFrame([
        {rect: [0,0,96,96]}
    ]);

    GameStage.fixProps(props);
    
    NormalTower.superClass.constructor.call(this, props);
    this.addChild(this.NORMAL);

    this.width = this.mapWidth * GameStage.unitWidth;
    this.height = this.mapHeight * GameStage.unitHeight;
}

Q.inherit(NormalTower, Q.DisplayObjectContainer);

NormalTower.prototype.mapWidth = 6;
NormalTower.prototype.mapHeight = 6;
NormalTower.prototype.width = 6 * GameStage.unitWidth;
NormalTower.prototype.height = 6 * GameStage.unitHeight;

NormalTower.prototype.update = function (timeInfo) {
    stage.takeMapPosition(this);
    return true;
}