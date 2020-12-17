//Create variables here
var dog,dogImg,dogImg1; var database; 
var foodS,foodStock;
var foodObj
var fedTime,lastFed
var feed,addFood 
var bedroom, garden,washroom;

function preload(){ 
  dogImg=loadImage("dogImg.png"); 
  dogImg1=loadImage("dogImg1.png"); 
  bedroom=loadImage("Bed Room.png");
  garden=loadImage("Garden.png");
  washroom=loadImage("Wash Room.png")
} 
  //Function to set initial environment 

  function setup() { 
  database=firebase.database(); 
  createCanvas(500,500); 

  dog=createSprite(250,300,150,150); 
  dog.addImage(dogImg); dog.scale=0.15; 

  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); textSize(20); 

  fedTime=database.ref('FeedTime'); 
  fedTime.on("value", function(data){ 
  lastFed=data.val();
  });

  readState=database.ref('gameState'); 
  readState.on("value", function(data){ 
  gameState=data.val();
  });

  foodObj=new Food()

  feed=createButton("Feed the dog"); 
  feed. position (700,95); 
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food"); 
  addFood. position(800,95); 
  addFood.mousePressed (addFoods);
 } 
  
  // function to display UI 
  function draw() { 
    background(46,139,87); 

    //if(keyWentDown(UP_ARROW)){ writeStock(foodS); dog.addImage(dogImg1);  } 
  drawSprites(); 
  foodObj.display();
  fill(255,255,254); 
  stroke("black"); 
  text("Food remaining : "+foodS,170,200); 
  textSize(13); text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20); 
  
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
  text("Last Feed : "+ lastFedX12 + " PM", 350,30);
  }else if(lastFed==0){
  text("Last Feed : 12 AM", 350, 38);
  }else{
  text("Last Feed : "+ lastFed + " AM", 350, 30);
  }

} 

  //Function to read values from DB 
  function readStock(data){ 
  foodS=data.val(); } 

  //Function to write values in DB 
  function writeStock(x){ 
  if(x<=0){ x=0; }else{ x=x-1; } 
  database.ref('/').update({ Food:x }) }

  //function to add food in stock 
  function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
})
}
//function to update food stock and last fed time
function feedDog(){
dog.addImage(dogImg1);
foodobj.updateFoodstock(foodobj.getFoodStock()-1);
database.ref("/").update({ 
Food: foodObj.getFoodStock(),
FeedTime:hour()
})
}