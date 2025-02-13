class Game {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", data => {
      gameState = data.val();
    })
  }

  update(count) {
    database.ref('/').update({
      'gameState': count
    })
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car1", car2img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();
    Player.getPlayerInfo();
    if(allPlayers !==undefined){
      //     image x      y        width    height
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        var x = allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;
 
        cars[index-1].position.x=x;
        cars[index-1].position.y=y;
      }
     this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls() {
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}
