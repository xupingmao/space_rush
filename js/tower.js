


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

    this.STOP = new Q.MovieClip({
        image: towerImage,
        useFrames : true,
        interval : 5,
        x : 0, 
        y : 0,
        scaleX : scaleX,
        scaleY : scaleY
    })

    this.ATK_BEGIN.addFrame([
        {rect : [0, 0, 64, 64]},
        {rect : [64, 0, 64, 64]},
        {rect : [128, 0, 64, 64]},
        {rect : [192, 0, 64, 64], stop: true},
    ])

    this.STOP.addFrame([
        {rect : [192, 0, 64, 64]},
        {rect : [128, 0, 64, 64]},
        {rect : [64, 0, 64, 64]},
        {rect : [0, 0, 64, 64], stop: true}
    ]);

    GameStage.fixProps(props);
    
    Tower.superClass.constructor.call(this, props);
    this.addChild(this.NORMAL);

    this.width = this.mapWidth * MAP_UNIT;
    this.height = this.mapHeight * MAP_UNIT;

    this.bullets = [];

    this.range = 20;
    this.life = 100;
    this.state = "stop";

    this.unitType = "tower";

    stage.addUnit(this);
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

    if (this.bullets.length > 0) {
        var bullet = this.bullets[0];
        if (bullet.isEnd()) {
            this.bullets.pop();
            this.parent.removeChild(bullet);
        }
    }

    stage.eachUnit(function (i, unit) {
        // check
        if (map_distance(self, unit) <= self.range) {
            targetRef.target = unit;
            return true;
        }
    }, function (unit) {
        return unit.unitType == "marine";
    });

    var target = targetRef.target;

    if (target == null) {
        this.removeAllChildren();
        this.addChild(this.STOP);
        this.state = "stop";
        return;
    } else if (this.state == "stop") {
        this.removeAllChildren();
        this.addChild(this.ATK_BEGIN);
        this.state = "atk";
    }

    // Q.trace("tower target: ", target);

    if (this.bullets.length == 0) {
        var x = this.x + this.width / 2;
        var y = this.y;
        var bullet = new TowerBullet({cx: x, cy: y});
        // var t = new Tower({x:x,y:y});
        this.parent.addChild(bullet);
        bullet.attack(target);
        this.bullets.push(bullet);
    }
    return true;
}