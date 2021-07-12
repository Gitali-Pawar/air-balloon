var balloon;
var backgroundImg;
var balloonImg;
var database;
var balloonHeight;

function preload(){
backgroundImg = loadImage("1.png");
balloonImg = loadAnimation("2.png","3.png" ,"4.png");

}

function setup() {

  database = firebase.database();

  createCanvas(1500,800);
 
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("balloon" , (balloonImg))
  balloon.scale = 0.5;

  var pen = database.ref("balloon/position");
    pen.on("value", (data)=>{

   position = data.val();

   console.log(position);

   balloon.x = position.x;
   balloon.y = position.y;

    })

    var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  

}

function draw() {
  background(backgroundImg);  

 if(keyDown(LEFT_ARROW)){
   balloon.x = balloon.x-10;
   balloon.addAnimation("hot air balloon",balloonImg)

 }
else if(keyDown(RIGHT_ARROW)){
  balloon.x = balloon.x+ 10;
  balloon.addAnimation("hot air balloon",balloonImg)
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10)
  balloon.y = balloon.y-10;
  balloon.scale = balloon.scale -0.01;
  balloon.addAnimation("hot air balloon",balloonImg)
 
}
else if(keyDown(DOWN_ARROW)){
  balloon.y = balloon.y+10;
  balloon.addAnimation("hot air balloon",balloonImg)
  
}

  drawSprites();
}

  function writePosition(x,y){
    database.ref("balloon/position").set({   
   'x':position.x+x,
   'y':position.y+y
    })
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x+x,
    'y':height.y+y
  })
}

function readHeight(data){
  height = data.val();
 balloon.x = height.x;
 balloon.y = height.y;
}


function showError(){
  console.log("Error in the writing the databse");
}
