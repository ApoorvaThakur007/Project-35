//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png")
  dogImg2 = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg1);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg2)
  }
  drawSprites();
  textSize(30)
  fill ("black")
  text("FoodStock: "+ foodS,10,30);
  textSize(25)
  fill("white")
  text("Note:PressUpArrowKeyToFeedDragoMilk!",20,470,20,25)
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x - 1;
  }
  database.ref('/').update({
    food:x
  })
}