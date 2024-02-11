var balloon,balloonImage1,balloonImage2;
var database;
var height;
var car, carIMG;
var direction
function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
   carIMG = loadImage("Images/car.png")
  }

//Function to set initial environment
function setup() {

  database = firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  car=createSprite(1300,700,50,50);
  car.addImage(carIMG)
  car.scale = 0.4
  database.ref("balloon").on("value", getDATA)

  database.ref("car").on("value", carGet)
  
  textSize(20); 
}


function draw() {
  background(bg);
  if (keyDown (DOWN_ARROW)){
    sendDATA(0,1)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }
  if (keyDown(UP_ARROW)){
    sendDATA(0,-1)
    balloon.addAnimation("hotAirBalloon",balloonImage2); 
    balloon.scale=balloon.scale -0.005;
  }
  if (keyDown(LEFT_ARROW)){
    sendDATA(-1,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  if (keyDown(RIGHT_ARROW)){
    sendDATA(1,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  if (keyDown ("a")){
    carData(-1,0)
  }

  if (keyDown("d")){
    carData(1,0)
  }

  

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

 function sendDATA(x,y){
  database.ref("balloon").set({
    x: height.x + x,
    y: height.y + y
  })
 }

 function getDATA(data){
    height = data.val();
    balloon.x = height.x
    balloon.y = height.y
 }

 function carData(x,y){
  database.ref("car").set({
    x: direction.x + x,
    y: direction.y + y
  })
 }

 function carGet(data){
  direction = data.val();
  car.x = direction.x
  car.y = direction.y
 }


 //make car and carImg var and add it as a sprite on the road. 
 //make car go right or left
 //it should update in duplicate window as well. 

 