// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);

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
    game.add.sprite(10, 10, "playerImg");//   Top left
    game.add.sprite(10, 326, "playerImg");//  Bottom left
    game.add.sprite(726, 10, "playerImg");//  Top right
    game.add.sprite(726, 326, "playerImg");// Bottom right
    // Add event handlers
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}

/*
 * Called whenever any mouse button is clicked.
 */
function clickHandler(event) {
    //alert("Such click at " + event.x + ", " + (event.y+0.296875));
    game.add.sprite(event.x-32, event.y+0.296875-32, "playerImg");
    game.sound.play("score");
    game.add.text(280, 20, "Click to doge", {font: "40px Comic Sans MS", fill:"#FFFF00"});
    game.add.text(100, 110, "So flappy", {font: "25px Comic Sans MS", fill:"#FF00FF"});
    game.add.text(580, 230, "Much wow", {font: "25px Comic Sans MS", fill:"#00FFFF"});
}

/*
 * Called whenever the spacebar is pressed.
 */
function spaceHandler() {
    game.sound.play("score");
}