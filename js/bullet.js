
var TowerBullet = function(props){

    GameStage.fixProps(props);

    props.image = Q.getDOM("img_tower_bullet");
    props.scaleX = MAP_UNIT / 64;
    props.scaleY = MAP_UNIT / 64;

    TowerBullet.superClass.constructor.call(this,props);
    this.init();
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
    var tween = new Q.Tween(this, {x: target.x, y: target.y}, {time: 500, /* ease: Q.Easing.Cubic.EaseOut */});
    tween.start();
    Q.trace("bullet attack", target);
    // target.life -= 5;
}

TowerBullet.prototype.isEnd = function () {
    return Math.abs(this.targetX - this.x + this.targetY - this.y) < 0.5;
}