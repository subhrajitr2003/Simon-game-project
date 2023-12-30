var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var UserClickedPattern = [];

var started = false;
var level = 0;
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChoosenColor = $(this).attr("id");
    UserClickedPattern.push(userChoosenColor);
    PlaySound(userChoosenColor);
    animateColor(userChoosenColor);

    checkAnswer(UserClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === UserClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === UserClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        PlaySound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    UserClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var random1 = Math.floor(Math.random() * 4);
    var randomchoosencolor = buttonColors[random1];
    gamePattern.push(randomchoosencolor);

    $("#" + randomchoosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    PlaySound(randomchoosencolor);
}

function PlaySound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animateColor(colour) {
    $("#" + colour).addClass("pressed");

    setTimeout(function () {
        $("#" + colour).removeClass('pressed');
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}