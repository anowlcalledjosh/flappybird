// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);

// Declaring variables
var score;
var label_score;
var player;
var doge;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/doge2.gif");
    game.load.audio("score", "assets/point.ogg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#141592");// set the background colour of the scene
    game.add.text(280, 20, "Click to doge", {font: "40px Comic Sans MS", fill:"#FFFF00"});
    game.add.text(100, 110, "So flappy", {font: "25px Comic Sans MS", fill:"#FF00FF"});
    game.add.text(580, 230, "Much wow", {font: "25px Comic Sans MS", fill:"#00FFFF"});
    player = game.add.sprite(100, 200, "playerImg");
    //game.add.sprite(10, 10, "playerImg");//   Top left
    //game.add.sprite(10, 326, "playerImg");//  Bottom left
    //game.add.sprite(726, 10, "playerImg");//  Top right
    //game.add.sprite(726, 326, "playerImg");// Bottom right
    // Add event handlers
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    // Initialise variable values
    score = 0;
    label_score = game.add.text(15, 10, "0", {font: "30px Comic Sans MS", fill: "#FFFFFF"});
}

/* This function updates the scene. It is called for every new frame. */
function update() {
    
}

/* Called whenever any mouse button is clicked. */
function clickHandler(event) {// event.y seems to be 0.296875 too low
    //alert("Such click at " + event.x + ", " + (event.y+0.296875));
    doge = game.add.sprite(event.x-32, event.y+0.296875-32, "playerImg");
    game.sound.play("score");
    changeScore(1);
}

/* Called whenever the spacebar is pressed. */
function spaceHandler() {
    game.add.text(Math.floor(Math.random() * (700 - 0 + 1)) + 0, Math.floor(Math.random() * (375 - 0 + 1)) + 0, "Such wow", {font: "25px Comic Sans MS", fill:"#FFFFFF"});
}

/* Increments score by an integer(/float) argument */
function changeScore(i) {
    score += i;
    //label_score.setText("Doges: " + score.toString());
    label_score.setText(score.toString());
}

function moveLeft () {
    player.x -= 10;
}

function moveRight () {
    player.x += 10;
}

function moveUp () {
    player.y -= 10;
}

function moveDown () {
    player.y += 10;
}