


Tower = function (props) {

    var scaleX = GameStage.getScaleX(Tower, 64);
    var scaleY = GameStage.getScaleY(Tower, 64);

    var towerImage = Q.getDOM("img_photon_tower");

    this.NORMAL = new Q.MovieClip({
        id : "Tower",
        image: towerImage,
        useFrames: false,
        interval: 5,
        x: 0,
        y: 0,
        scaleX : scaleX,
        scaleY : scaleY
    })

    this.NORMAL.addFrame([
        {rect: [0,0,64,64]}
    ]);


    this.ATK_BEGIN = new Q.MovieClip({
        id : "tower_atk",
        image : towerImage,
        useFrames: true,
        interval: 5,
        x: 0,
        y: 0,
        scaleX : scaleX,
        scaleY : scaleY
    });

    this.ATK_BEGIN.addFrame([
        {rect : [0, 0, 64, 64]},
        {rect : [64, 0, 64, 64]},
    ])

    GameStage.fixProps(props);
    
    Tower.superClass.constructor.call(this, props);
    this.addChild(this.NORMAL);

    this.width = this.mapWidth * MAP_UNIT;
    this.height = this.mapHeight * MAP_UNIT;

    this.bullets = [];
}

Q.inherit(Tower, Q.DisplayObjectContainer);

Tower.prototype.mapWidth = 6;
Tower.prototype.mapHeight = 6;
Tower.prototype.width = 6 * GameStage.unitWidth;
Tower.prototype.height = 6 * GameStage.unitHeight;

Tower.prototype.clearBullets = function () {
    var bullet = this.bullets.pop();
    while (bullet) {
        this.parent.removeChild(bullet);
        bullet = this.bullets.pop();
    }
}

Tower.prototype.update = function (timeInfo) {
    stage.takeMapPosition(this);

    // 遍历所有的对象，找出可以攻击的敌人

    var targetRef = {};
    var self = this;

    stage.eachUnit(function (i, unit) {
        // check
        if (map_distance(self, unit) <= 10) {
            targetRef.target = unit;
            return true;
        }
    });

    var target = targetRef.target;

    if (target == null) {
        this.clearBullets();
        return;
    }

    Q.trace("tower target: ", target);

    if (this.bullets.length == 0) {
        var x = this.x + this.width / 2;
        var y = this.y + this.height / 2;
        var bullet = new TowerBullet({x: x, y: y});
        // var t = new Tower({x:x,y:y});
        this.parent.addChild(bullet);
        bullet.attack(target);
        this.bullets.push(bullet);
    } else {
        var bullet = this.bullets[0];
        if (bullet.isEnd()) {
            this.bullets.pop();
            this.parent.removeChild(bullet);
        }
    }
    return true;
}