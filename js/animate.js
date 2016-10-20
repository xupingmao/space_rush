
function animate_new_container() {
    var new_container = new Q.DisplayObjectContainer({
        x: GameStage.width,
        y: 0,
        width: GameStage.width,
        height: GameStage.height
    });
    return new_container;
}


function animate_forward(stage, new_container) {

    var old_container = stage.children.pop();

    var delay_time = 200;

    var tween1 = new Q.Tween(old_container, {x : -GameStage.width}, {time:delay_time, /* ease: Q.Easing.Cubic.EaseOut */});
    var tween2 = new Q.Tween(new_container, {x: 0},          {time:delay_time, /* ease: Q.Easing.Cubic.EaseIn */});

    tween1.start();
    tween2.start();
    
    stage.addChild(old_container);
    stage.addChild(new_container);

    if (stage.children.length > 2) {
        stage.children.shift();
    }
}

function animate_back() {
    var stage = window.stage;
    var now = stage.children.pop();
    var target = stage.children.pop();

    var delay_time = 200;

    var tween1 = new Q.Tween(target, {x : 0}, {time:delay_time});
    var tween2 = new Q.Tween(now, {x: GameStage.width},          {time:delay_time});

    tween1.start();
    tween2.start();

    stage.children.push(now);
    stage.children.push(target);
    // stage.addChild(new_container);
}