// 地图控制

function get_map() {
    return stage.map;
}

// target.x
// target.y
// target.mapWidth
// target.mapHeight
function take_pos(target) {
    // TODO 占据某个位置
}

function free_pos(target) {

}

// 目标点是否可用
function is_pos_free(x,y) {
    var map = stage.map;
    if (!map) {
        return false;
    }
    if (x < 0 || x >= stage.mapWidth) {
        return false;
    }
    if (y < 0 || y >= stage.mapHeight) {
        return false;
    }
    return map[x][y] == 0;
}

// 目标区域是否可用
function is_rect_free(x,y,width,height) {
    var max_x = x + width;
    var max_y = y + height;
    for (; x < max_x; x++) {
        for (; y < max_y ; y++) {
            if (!is_pos_free(x,y)) {
                return false;
            }
        }
    }
    return true;
}

// 在左方
function is_left_of(self, target) {

}

function is_right_of(self, target) {

}

function is_up_of(self, target) {

}

function is_down_of(self, target) {

}

// 正左方

function is_straight_left_of(self, target) {

}

function is_straight_right_of(self, target) {

}

function is_straight_up_of(self, target) {

}

function is_straight_down_of(self, target) {

}


function can_left(obj) {
    var x = obj.x;
    var y = obj.y;
    var mx = parseInt(x/MAP_UNIT);
    var my = parseInt(y/MAP_UNIT);
    mx--;
    return is_rect_free(mx, my, 1, obj.mapHeight);
}

function can_right(obj) {    
    var x = obj.x;
    var y = obj.y;
    var mx = parseInt(x/MAP_UNIT);
    var my = parseInt(y/MAP_UNIT);
    return is_rect_free(mx+obj.mapWidth, my, 1, obj.mapHeight);
}

function can_up(obj) {
    var x = obj.x;
    var y = obj.y;
    var mx = parseInt(x/MAP_UNIT);
    var my = parseInt(y/MAP_UNIT);
    my--;
    return is_rect_free(mx, my, obj.mapWidth, 1);
}

function can_down(obj) {
    var x = obj.x;
    var y = obj.y;
    var mx = parseInt(x/MAP_UNIT);
    var my = parseInt(y/MAP_UNIT);
    return is_rect_free(mx, my+obj.mapHeight, obj.mapWidth, 1);
}