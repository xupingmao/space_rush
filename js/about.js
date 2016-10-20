// about.js

function displayAboutInformation () {
    // window.stage.removeAllChildren();

    // set background;

    window.audioManager.play("about", true);

    var new_container = animate_new_container();
    new_container.addChild(ABOUT_BG);
    
    // var text = new Q.Text( {
    //     x : SC_WIDTH * 0.2,
    //     y : SC_HEIGHT * 0.2,
    //     width : SC_WIDTH * 0.5,
    //     height : 40
    // } );

    /*
    var text = new Q.Text();

    text.x = GameStage.width * 0.2;
    text.y = GameStage.height * 0.2;
    text.text = "Hello,World";
    text.font = "25px arial";
    text.color = "green";

    new_container.addChild(text);
    */
    
    new_container.addChild(BACK_BTN);

    animate_forward(window.stage, new_container);
}