
var Tower = function (props) {
    Tower.superClass.constructor.call(this,props);
    this.init();
}

Q.inherit(Tower, Q.DisplayObjectContainer);

Tower.prototype.mapWidth = 10;
Tower.prototype.mapHeight = 10;

// 32 * 5
Tower.prototype.MAIN = new Q.MovieClip({
    id:"left",
    image:Q.getDOM("img_tower"),
    useFrames:true,
    interval:5,
    x:0,
    y:0,
    scaleX: GameStage.getScaleX(Tower, 150),
    scaleY: GameStage.getScaleY(Tower, 150)
});

Tower.prototype.MAIN.addFrame([
        {rect: [0, 0, 150, 150]}
    ])

Tower.prototype.init = function () {
    this.addChild(this.MAIN);
}

Tower.prototype.update = function (timeInfo) {
    stage.takeMapPosition(this);
    return true;
}

NormalTower = function (props) {
    NormalTower.superClass.constructor.call(this, props);
    this.addChild(this.NORMAL);
}

Q.inherit(NormalTower, Q.DisplayObjectContainer);

NormalTower.prototype.mapWidth = 6;
NormalTower.prototype.mapHeight = 6;


NormalTower.prototype.NORMAL = new Q.MovieClip({
    id : "normalTower",
    image: Q.getDOM("img_photon_tower"),
    useFrames: true,
    interval: 5,
    x: 0,
    y: 0,
    scaleX : GameStage.getScaleX(NormalTower, 96),
    scaleY : GameStage.getScaleY(NormalTower, 96)
})

NormalTower.prototype.NORMAL.addFrame([
    {rect: [0,0,96,96]}
]);

NormalTower.prototype.update = function (timeInfo) {
    stage.takeMapPosition(this);
    return true;
}