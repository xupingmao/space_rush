

/**
 * Audios
 */

var PLAY_AUDIO  = new Audio("./audio/Heaven's Devils.mp3",true,false,true);
var START_AUDIO = new Audio("./audio/Resurrection.mp3", true, false, true);
var MARINE_ATK  = new Audio("./audio/marineAtk.wav", true, false, true);
var GAME_AUDIO1 = new Audio("./audio/");

var DISABLE_AUDIO = "true" == Q.getUrlParams()["disableAudio"];

var AudioManager = function () {
    this.audioMap = {
        "start": START_AUDIO,
        "about": null,
        "marine_atk": MARINE_ATK,
        "game1": PLAY_AUDIO,
    }

    this.currentAudioList = [];
}

AudioManager.prototype.pauseAll = function () {
    for (var i = 0; i < this.currentAudioList.length; i++) {
        var audio = this.currentAudioList[i];
        audio.pause();
    }
    Q.trace("pause all audio");
}

AudioManager.prototype.addAudio = function (audioName) {
    var audio = this.audioMap[audioName];

    for (var i = 0; i < this.currentAudioList.length; i++) {
        if (audio == this.currentAudioList[i]) {
            return;
        }
    }
    this.currentAudioList.push(audio);
    Q.trace("add audio ", audioName);
}

AudioManager.prototype.play = function (audioName, pause_prev) {
    if (pause_prev) {
        this.pauseAll();
    }
    var audio = this.audioMap[audioName];
    if (audio != null) {
        if (!DISABLE_AUDIO) {
            audio.play();
        }
        this.addAudio(audioName);
    }
}