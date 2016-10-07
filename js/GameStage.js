var GameStage = function (props) {

    props["width"] = this.unitWidth * this.mapWidth;
    props["height"] = this.unitHeight * this.mapHeight;
    props["scaleX"] = SC_WIDTH / props["width"] ;
    props["scaleY"] = SC_HEIGHT / props["height"];

    GameStage.superClass.constructor.call(this, props);
    this.initMap();
    this.frames = 0;
}

Q.inherit(GameStage, Q.Stage);

GameStage.unitWidth  = GameStage.prototype.unitWidth  = 16;
GameStage.unitHeight = GameStage.prototype.unitHeight = 16;
GameStage.mapWidth   = GameStage.prototype.mapWidth   = 100;
GameStage.mapHeight  = GameStage.prototype.mapHeight  = 60;

GameStage.getWidth = function () {
    return GameStage.unitWidth * GameStage.mapWidth;
}

GameStage.getHeight = function () {
    return GameStage.unitHeight * GameStage.mapHeight;
}


GameStage.getScaleX = function (clz, width) {
    return GameStage.unitWidth * clz.prototype.mapWidth / width;
}

GameStage.getScaleY = function (clz, height) {
    return GameStage.unitHeight * clz.prototype.mapHeight / height;
}


GameStage.fixProps = GameStage.prototype.fixProps = function (props) {
    if (props.mapX) {
        props.x = stage.getPositionX(props.mapX);
    }
    if (props.mapY) {
        props.y = stage.getPositionY(props.mapY);
    }
}


GameStage.prototype.getPosition = function (x, y) {
    if (x < 0) x += this.mapWidth;
    if (y < 0) y += this.mapHeight;
    return [x * this.unitWidth , y * this.unitHeight];
}

GameStage.prototype.getPositionX = function (x) {
    if (x < 0) x += this.mapWidth;
    return x * this.unitWidth;
}

GameStage.prototype.getPositionY = function(y) {
    if (y < 0) y += this.mapHeight;
    return y * this.unitHeight;
}

GameStage.prototype.initMap = function () {
    this.map = [];
    this.usedPositionList = [];
    this.towerList = [];

    for (var i = 0; i < this.mapWidth; i++) {
        this.map[i] = [];
        for (var j = 0; j < this.mapHeight; j++) {
            this.map[i][j] = 0;
        }
    }

    this.graphics = new Q.Graphics({id: "graphics", x: 0, y: 0, width: this.width, height: this.height});

    this.graphics.clear();
    var widthRatio = this.unitWidth;
    var heightRatio = this.unitHeight;
    // Q.trace("GameStage draw map rect");
    this.graphics.lineStyle(2, "#0f0");
    for (var i = 0; i < this.mapWidth; i++) {
        for (var j = 0; j < this.mapHeight; j++) {
            var x = widthRatio * i;
            var y = heightRatio * j;
            this.graphics.drawRect(x, y, widthRatio, heightRatio);
        }
    }
    this.graphics.endFill();
    // this.graphics.cache();
}

GameStage.prototype.getMap = function () {
    return this.graphics;
}

GameStage.prototype.setMapTarget = function (target, value) {
    var mapX = parseInt(target.x / this.unitWidth);
    var mapY = parseInt(target.y / this.unitHeight);

    // Q.trace("setMapTarget, targetId:", target.id, "mapX:", mapX, "mapY:", mapY, target.mapWidth, target.mapHeight);
    for (var i = mapX; i < mapX + target.mapWidth; i++) {
        for (var j = mapY; j < mapY + target.mapHeight; j++) {
            if (i >= this.mapWidth) {
                Q.trace("i > mapWidth");
                return;
            }
            if (j >= this.mapHeight) {
                Q.trace("j > mapHeight");
                return;
            }
            this.map[i][j] = value;
            // Q.trace("map[" + i + "]" + "[" + j + "]=" + value);
        }
    }
}

GameStage.prototype.takeMapPosition = function (target) {
    this.setMapTarget(target, 1);

    this.findUsedPositions();
}

GameStage.prototype.findUsedPositions = function () {
    this.usedPositionList = [];
    for (var i = 0; i < this.mapWidth; i++) {
        for (var j = 0; j < this.mapHeight; j++) {
            if (this.map[i][j] == 1) {
                this.usedPositionList.push([i,j]);
            }
        }
    }
}

GameStage.prototype.releaseMapPosition = function (target) {
    this.setMapTarget(target, 0);
}

GameStage.prototype.addEntity = function (target) {
    this.addChild(target);
    this.takeMapPosition(target);
}

GameStage.prototype.canWalk = function (x, y) {
    var mapX = x / this.unitWidth;
    var mapY = y / this.unitHeight;
    return this.map[mapX][mapY] == 0;
}

function computeDistance(obj1, obj2) {
    var obj1x = obj1.x + obj1.width / 2;
    var obj1y = obj1.y + obj1.height / 2;
    var obj2x = obj2.x + obj2.width / 2;
    var obj2y = obj2.y + obj2.height / 2;
    return Math.sqrt( (obj1x-obj2x) * (obj1x-obj2x) + (obj1y-obj2y) *(obj1y-obj2y))
}

function sortObjectList(objectList, key) {
    for (var i = 1; i < objectList.length; i++) {
        temp = objectList[i];
        for (var j = i; j > 0 && objectList[j-1][key] > temp[key]; j--) {
            objectList[j] = objectList[j-1];
        }
        objectList[j] = temp;
    }
}

GameStage.prototype.getNearestTower = function (actor) {
    if (this.towerList.length == 0) {
        return null;
    }
    var distance_list = [];
    for (var i = 0; i < this.towerList.length; i++) {
        var tower = this.towerList[i];
        var distance = computeDistance(tower, actor);
        distance_list.push({distance: distance, tower: tower});
    }
    sortObjectList(distance_list, "distance");
    return distance_list[0].tower;
}

GameStage.prototype.addTower = function (tower) {
    this.towerList.push(tower);
}

GameStage.prototype.update = function (timeInfo) {
    // this.removeChildById("graphics");

    this.frames = (this.frames + 1) % 5;

    if (this.frames != 0) {
        return true;
    }

    this.graphics.clear();
    var widthRatio = this.unitWidth;
    var heightRatio = this.unitHeight;

    this.graphics.lineStyle(1, "#f00");

    for (var i = 0; i < this.usedPositionList.length; i++) {
        var position = this.usedPositionList[i];
        var x = position[0] * widthRatio, 
            y = position[1] * heightRatio;
        this.graphics.beginFill("#0f0", 0.5).drawRect(x,y,widthRatio, heightRatio); 
        // endFill();
    }

    this.graphics.endFill();

    // this.graphics.clear();
    // var widthRatio = this.unitWidth;
    // var heightRatio = this.unitHeight;
    // // Q.trace("GameStage draw map rect");
    // this.graphics.lineStyle(2, "#0f0");
    // for (var i = 0; i < this.mapWidth; i++) {
    //     for (var j = 0; j < this.mapHeight; j++) {
    //         var x = widthRatio * i;
    //         var y = heightRatio * j;
    //         if (this.map[i][j] == 1) {
    //             // Q.trace("position", i, j, "is taken");
    //             this.graphics.lineStyle("#f00").drawRect(x,y,widthRatio,heightRatio).endFill();
    //             this.graphics.lineStyle(2, "#0f0");
    //         } else {
    //             this.graphics.drawRect(x, y, widthRatio, heightRatio);
    //         }
    //     }
    // }
    // this.graphics.endFill();
}