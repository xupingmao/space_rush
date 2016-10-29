// assets

/**
 * images
 */


function createBackgroundImage (id, width, height) {
    // body...

    // var element = document.getElementById(id);
    return new Quark.Bitmap({
        image : Q.getDOM(id),
        rect  : [0, 0, width, height],
        scaleX: GameStage.getWidth() / width,
        scaleY: GameStage.getHeight() / height
    });
}

window.START_BG = createBackgroundImage("img_background", 1200, 748);
window.ABOUT_BG = createBackgroundImage("img_about", 1920, 1200);
window.GAME_BG1 = createBackgroundImage("img_bg1", 756, 512);
