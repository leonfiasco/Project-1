$(document).ready(function(){


// // making an array of strings into an unorderd list
//   const names = ['SupremeLeon:10000', 'Ozzy2018: 9500', 'ElliotWolfy: 9455', 'liltKing: 9200', 'GerBear: 9111', 'Dazzy345: 9000', 'HoodStar123: 8673'];
//   var ul = document.createElement('ul');
//   document.getElementById('Hscores').appendChild(ul);
//
//   names.forEach(function(name){
//     var li = document.createElement('li');
//     ul.appendChild(li);
//     li.innerHTML += name;
//   });


  //canvas
  var canvas = $('.canvas')[0];
  var ctx = canvas.getContext('2d');
  var width = $('.canvas').width();
  var height = $('.canvas').height();
  //save the cell width in a variable for control
  var celWid = 10;
  var direction;
  var food;
  var score;
  var gameLoop;
  const $dialog = $('.dialog');
  const $middleContainer = $('.middleContainer');


  //create Snake
  //an array of cells to make up the snake
  var snakeArray;

  function init() {
    //default direction
    direction = 'right';
    createSnake();
    createFood();// displays Food
    //displays the score
    score = 0;

    //move snake using a timer that will refresh the page every 60ms
    if(typeof gameLoop !== 'undefined') clearInterval(gameLoop);
    gameLoop = setInterval(paint, 90);// change back to 90
  }
  init();

  function createSnake(){
    //length of snake
    var length = 3;
    snakeArray = [];
    for(var i = length-1; i>=0; i--){

      //This will create a horizontal snake from the top left
      snakeArray.push({x: i, y: 0});
    }
  }
  //start  new game function
  $('#new-game').click(function(){
    location.reload();
  });

  //create food
  function createFood(){
    // create a cell where the food appear
    food = {
      x: Math.round(Math.random()*(width-celWid)/celWid),
      y: Math.round(Math.random()*(height-celWid)/celWid)
    };

  }

  //give colour to snake
  function paint(){
    //to avoid a snake trail paint background every frame
    ctx.fillStyle = '#779966';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, width, height);


    //  tail cell will pop out
    //be place infront of the head cell
    // thats the movement
    var nx = snakeArray[0].x;
    var ny = snakeArray[0].y;

    //adding direction based movement
    if(direction === 'right') nx++;
    else if(direction === 'left') nx--;
    else if(direction === 'up') ny--;
    else if(direction === 'down') ny++;

    //adding game clause for the
    //snake hitting its own body and the wall
    if(nx === -1 || nx === width.celWid || ny === -1 || ny === height/celWid || checkCollision(nx, ny, snakeArray)){
      $middleContainer.hide();
      //bring up a div box that shows the player has died
      console.log($dialog);
      $('.dialog').show();

      // restarts game
      init();

      // $('.dialog').css('display', 'block', 'overlay');

      return;
    }
    //creating food if head position matches
    //that of food create new head instead of moving tail
    if(nx === food.x && ny === food.y){
      var tail = {x: nx, y: ny};

      score++;
      // creates food
      createFood();
    } else{
    //pops out the last cell
      tail = snakeArray.pop();
      tail.x = nx; tail.y = ny;
    }
    //make snake eat food
    snakeArray.unshift(tail);//puts back tail in first cell

    for(var i = 0; i < snakeArray.length; i++){
      var c = snakeArray[i];

      // console.log('audio');

      //colour the 10px wide cells
      paintCell(c.x, c.y);
    }
    // give colour to food
    paintCell(food.x, food.y);

    //create display of score
    // const scoreUpdate = $('#score1').text(score);
    var scoreText = score;
    $('#score1').text(scoreText);
    ctx.font = '10px Press Start 2P';
    // ctx.fillText(scoreText, 5, height-5);

  }

  //create function that colors cell
  function paintCell(x, y){

    ctx.fillStyle = 'black';
    ctx.fillRect(x*celWid, y*celWid, celWid, celWid);
    ctx.strokeStyle = '#779966';
    ctx.strokeRect(x*celWid, y*celWid, celWid, celWid);
  }

  function checkCollision(x, y, array){
    //function that checks if x/y coordinates exist
    //in an array of cells or //
    for(var i = 0; i < array.length; i++){
      if(array[i].x === x && array[i].y === y)
        return true;
    }
    return false;

  }

  //make the snake functional with keyboard controls
  $(document).keydown(function(e){
    var key = e.which;
    //adding a clause to prevent reverse
    //make the snake more functional and allow movement with direction keys
    if(key === 37 && direction !== 'right') direction = 'left';
    else if(key === 38 && direction !== 'down') direction = 'up';
    else if(key === 39 && direction !== 'left') direction = 'right';
    else if(key === 40 && direction !== 'up') direction = 'down';


  });

});
