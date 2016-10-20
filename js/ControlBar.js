
function InitControlBar(container) {
    // draw tower information
    // draw enemy information
    // draw money, tools, etc.
    // menu

    var controlBarId = "img_control_bar";
    var width = GameStage.unitWidth * 10;
    var height = GameStage.height;

    var controlBar = new Quark.Bitmap({
        image : Q.getDOM(controlBarId),
        rect  : [0, 0, width, height],
        scaleX: width / 100,
        scaleY: height / 600
    });

    container.addChild(controlBar);

}