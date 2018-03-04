// Enemies our player must avoid
var Enemy = function(speed, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // set x to be -101 to start before the begining of the line to soothly move
    this.x=-101;    
    this.y=y;
    
    this.speed=speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x<606)
     this.x+=this.speed*dt;
     else
     this.x=-101;
     // check if collision happen
    if( player.x>=this.x-50 && player.x<=this.x+50 && player.y>=this.y-50 && player.y<=this.y+50){
       player.reset()
    }
    // check if the user wins
    if (player.y>=-80 && player.y<0){
        setTimeout(function(){player.reset()}, 500)
        console.log("yaaaaaaaaay!! You Won!")
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player= function(){
    // Enemy.call(this)
    this.sprite='images/char-boy.png';
    this.reset();
}

Player.prototype=Object.create(Enemy.prototype);
Player.prototype.constructor=Player;

//I just need to prevent player from excuting the update function of Enemy
Player.prototype.update=function(){
    // console.log('player update call')
}
// Player.prototype.render=function(){
    // I used the render of Enemy
// }

//this function reset the game
Player.prototype.reset=function(){
    this.x=2*101;
    this.y=5*83-30;
}
//this function handle the keyborad clicks for the player moves
Player.prototype.handleInput=function(keyCode){
    if(keyCode==='left' && this.x>0){
        this.x-=101;
    }
    else if(keyCode==='up' && this.y>-30){
        this.y-=83;
    }
    else if(keyCode==='right' && this.x<404){
        this.x+=101;
    }
    else if(keyCode==='down' && this.y<385){
        this.y+=83;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1=new Enemy(150, 60),
    enemy2=new Enemy(320, 145),
    enemy3=new Enemy(600, 228),

    allEnemies=[enemy1,enemy2, enemy3],
    
    player= new Player();
// console.log(player.constructor)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
