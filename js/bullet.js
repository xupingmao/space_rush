
var TowerBullet = function(props){

    GameStage.fixProps(props);

    props.x = props.cx - MAP_UNIT / 2;
    props.y = props.cy - MAP_UNIT / 2;

    props.image = Q.getDOM("img_tower_bullet");
    props.scaleX = MAP_UNIT / 64;
    props.scaleY = MAP_UNIT / 64;

    TowerBullet.superClass.constructor.call(this,props);
    this.init();

    this.physicalDamage = 5;

    this.completed = false;
    this.target = null;
}

Q.inherit(TowerBullet,Q.MovieClip);

TowerBullet.prototype.init = function () {
    this.addFrame(
        [
            {rect : [0, 0, 64, 64]},
        ]
    )
}

TowerBullet.prototype.attack = function (target) {
    this.targetX = target.x;
    this.targetY = target.y;

    this.target = target;
    var self = this;
    
    var tween = new Q.Tween(this, {x: target.x, y: target.y}, {time: 300, onComplete: function () {
        self.onComplete();
    }});
    tween.start();
    // Q.trace("bullet attack", target);
    target.attacked(this);
}

TowerBullet.prototype.isEnd = function () {
    return this.completed;
}

TowerBullet.prototype.onComplete = function () {
    this.completed = true;
    if (this.target) this.target.attacked(this);
}