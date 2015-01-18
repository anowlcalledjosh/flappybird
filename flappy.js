// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);

// Declaring global variables
var score;
var label_score;
var player;
var doge;
var dogeColours = ["#00FFFF", "#FF00FF", "#FFFF00"];
var dogeTexts = ["Much flap", "Such doge", "Very click", "So shibe"];
var pipes;
var pipeInterval = 1.75;
var pipeColours = ["pipe_blue", "pipe_green", "pipe_mint", "pipe_orange",
                   "pipe_pink", "pipe_purple", "pipe_red", "pipe_yellow"];

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/doge2.gif");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe", "assets/pipe.png");
    game.load.image("pipe_blue", "assets/pipe_blue.png");
    game.load.image("pipe_green", "assets/pipe_green.png");
    game.load.image("pipe_mint", "assets/pipe_mint.png");
    game.load.image("pipe_orange", "assets/pipe_orange.png");
    game.load.image("pipe_pink", "assets/pipe_pink.png");
    game.load.image("pipe_purple", "assets/pipe_purple.png");
    game.load.image("pipe_red", "assets/pipe_red.png");
    game.load.image("pipe_yellow", "assets/pipe_yellow.png");
}

/* Initialises the game. This function is only called once. */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.setBackgroundColor("#141592");// set the background colour of the scene
    player = game.add.sprite(50, 168, "playerImg");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 900;
    //game.add.sprite(10, 10, "playerImg");//   Top left
    //game.add.sprite(10, 326, "playerImg");//  Bottom left
    //game.add.sprite(726, 10, "playerImg");//  Top right
    //game.add.sprite(726, 326, "playerImg");// Bottom right
    // Add event handlers
    game.input.onDown.add(onClick);
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(enterPressed);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(jump);
    // Initialise variable values
    score = 0;
    label_score = game.add.text(15, 10, "0", {font: "30px Comic Sans MS", fill: "#FFFFFF"});
    pipes = game.add.group();
    game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);

    //generatePipe();
}

/* This function updates the scene. It is called for every new frame. */
function update() {
    game.physics.arcade.overlap(player, pipes, gameOver);
    if (game.rnd.integerInRange(0, 99) === 0) {
        enterPressed();
    }
}

/* Called whenever any mouse button is clicked. */
function onClick(event) {// event.y seems to be 0.296875 too low, oddly enough
    //alert("Such click at " + event.x + ", " + (event.y+0.296875));
    doge = game.add.sprite(event.x - 32, event.y + 0.296875 - 32, "playerImg");
}

/* Called whenever the spacebar is pressed. */
function enterPressed() {
    game.add.text(game.rnd.integerInRange(0, 600),
        game.rnd.integerInRange(0, 350),
        dogeTexts[game.rnd.integerInRange(0, 2)],
        {
            font: game.rnd.integerInRange(10, 40).toString() + "px Comic Sans MS",
            fill: dogeColours[game.rnd.integerInRange(0, dogeColours.length - 1)]
        }
    );
}

/* Increments score by an integer(/float) argument */
function changeScore(i) {
    score += i;
    //label_score.setText("Doges: " + score.toString());
    label_score.setText(score.toString());
}

function jump () {
    player.body.velocity.y = -350
}

function generatePipe () {
    var gapStart = game.rnd.integerInRange(1, 4);
    for (var count = 0; count < 8; count++) {
        if (count != gapStart && count != gapStart + 1 && count != gapStart + 2) {
            addPipeBlock(800, count * 50);
        }
    }
    changeScore(1);
}

function addPipeBlock (x,y) {
    // Add a new *block* with "pipe" sprite to the pipes *group*
    var pipe = pipes.create(x, y, pipeColours[game.rnd.integerInRange(0, pipeColours.length - 1)]);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function gameOver () {
    game.destroy();
}