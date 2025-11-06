let bubbles = [];
let bubbleNum = 170;
let iAmHovering = false;

let kalx;

//boolean for data window
let showData = false;

//loading JSON
function preload() {
  kalx = loadJSON("kalx_top_170.json");
  smallBolt1 = loadImage("bolts/kalx-bolt-1.png")
  smallBolt2 = loadImage("bolts/kalx-bolt-2.png")
  bigBolt1 = loadImage("bolts/kalx-bolt-3.png")
  bigBolt2 = loadImage("bolts/kalx-bolt-4.png")
}

function setup() {
  createCanvas(870, 600);


  //creating bubbles
  for(let i = 0; i < bubbleNum; i++){
    let x = random(width);
    let y = random(height);

    bubbles[i] = new Bubble(x, y);  
    bubbles[i].offset();

  }

  smallBolt1.resize(0, width/8);
  smallBolt2.resize(0, width/8 + 20);

}

function draw() {
  //background(220);
  //blue
  background(25, 90, 196);
  //background(250, 235, 10);

  imageMode(CORNER);

  image(smallBolt1, 0, 0);
  image(smallBolt2, width - (width/4 + 20), height - (width/8 +20));

  image(bigBolt1, 0, 0);

  //calling bubble functions
  for(let i = 0; i < bubbleNum; i++){
    bubbles[i].show();
    bubbles[i].move();
    bubbles[i].hover();
  }

  //displaying data
  //first, if hovered
  for(let i = 0; i < bubbleNum; i++){
    if (bubbles[i].hovered){
      textAlign(CENTER);
      //fill(19, 75, 100);
      noStroke();
      //fill(40, 180, 10);
      //fill(200);
      //red
      fill(200, 20, 20);
      //fill(24, 225, 20)
      textSize(20)
      textStyle(BOLDITALIC);
      text(kalx[i].artist, bubbles[i].x, bubbles[i].y+4);

      //then, if clicked
      if (showData == true){
        bubbles[i].pauseMyBubble = true;

        bubbles[i].beenSelected = true;


        //create strings for data
        let artistText = "artist: " + kalx[i].artist;
        let songText = "song: " + kalx[i].song;
        let albumText = "album: " + kalx[i].album;
        let labelText = "label: " + kalx[i].label

        //checking for longest string to set size of window
        let dataWidth = max(textWidth(artistText), textWidth(songText), textWidth(albumText), textWidth(labelText));

        let dataWindowWidth = dataWidth + 40;

        //constraining window position so it doesn't leave the canvas
        dataWindowX = constrain(bubbles[i].x, dataWindowWidth/2, width - dataWindowWidth/2);
        dataWindowY = constrain(bubbles[i].y, 60, height - 65)

        //making rectangle
        stroke(170, 205, 215);
        strokeWeight(4);
        rectMode(CENTER);
        fill(245, 235, 200);
        rect(dataWindowX, dataWindowY, dataWindowWidth, 130);

        // imageMode(CENTER);
        // image(bigBolt1,dataWindowX, dataWindowY, dataWindowWidth - 30 , 100);

        // stroke(170, 205, 215);
        // strokeWeight(4);
        // rectMode(CENTER);
        // fill(245, 235, 200, 150);
        // rect(dataWindowX, dataWindowY, dataWindowWidth, 130);

        stroke(170, 205, 215, 150);
        fill(245, 235, 200, 150);
        textSize(90);
        text(String.fromCharCode(9835),dataWindowX, dataWindowY + 32);

        //making text
        fill(0);
        fill(19, 68, 100);
        noStroke();
        textStyle(BOLD);
        textSize(15);
        text(artistText, dataWindowX, dataWindowY - 42);
        text(songText, dataWindowX, dataWindowY - 12);
        text(albumText, dataWindowX, dataWindowY + 18);
        text(labelText, dataWindowX, dataWindowY + 48);
      }
    }
  }


}

//function for mouseclick
function mouseClicked(){
  if(iAmHovering == true)
    if(showData == false){
      showData = true;
      for (let k = 0; k < bubbleNum; k ++){
        if (bubbles[k].hovered == true){
          let songName = createP(kalx[k].artist + ": " + kalx[k].song + "\n")
        }
      }
      } else {
      showData = false;
  } else {
    showData = false;
  }
  
}

class Bubble {
  constructor(tempX, tempY){
    this.x = tempX;
    this.y = tempY;
    
    this.diameter = 34;

    // store a persistent target so the bubble can move toward it across frames
    this.targetX = this.x;
    this.targetY = this.y;
    this.counter = 200;

    //bubble speed in x and y
    this.xVel = 0;
    this.yVel = 0;

    //object hover boolean
    this.hovered = false;

    //boolean so window display will hold
    this.pauseMyBubble = false;

    //boolean to show bubble has been selected previously
    this.beenSelected = false;
  }

  offset(){
    let o = int(random(100));
    this.counter+= o;
  }

  move(){

    if (this.counter % 200 === 0){
      this.targetX = random(width);
      this.targetY = random(height);
    }
    this.counter += 1;

    if (this.hovered == false){
      // move toward target by 1 pixel per frame
      if (this.x < this.targetX){
        //this.x += 1;
        this.xVel =1;
      } else if (this.x > this.targetX){
        //this.x -= 1;
        this.xVel = -1;
      }

      if (this.y < this.targetY){
        //this.y += 1;
        this.yVel = 1;
      } else if (this.y > this.targetY){
        //this.y -= 1;
        this.yVel = -1;
      }

      this.x += this.xVel;
      this.y += this.yVel;
    } else if (this.hovered == true){
      this.xVel = 0;
      this.yVel = 0;
    }

}
  //defining show function
  show(){
    if (this.hovered == true){
      strokeWeight (3);
    } else {
      if (this.beenSelected == true){
        strokeWeight(3);
      } else {
      strokeWeight(1);
      }
    }

    if (this.hovered == true){
      fill(120, 250, 230);
    } else {
      fill(120, 240, 250);
    }
    //fill(120, 250, 255);

    if (this.beenSelected == true){
      fill(240, 220, 0);
    } else {
      stroke(255);
    }

    ellipse(this.x, this.y, this.diameter);
    textAlign(CENTER);
    strokeWeight(1);
    textSize(30);
    stroke(255);
    if (this.beenSelected == true){
      fill(230, 20, 40);
    } else if (this.hovered == true){
      fill(255, 190);
      //fill(220, 100, 30);
    } else {
      fill(255, 140);
      //fill(220, 50, 10);
    }
    text(String.fromCharCode(9835), this.x, this.y + 10);
  }

  //hover function exclusive to single bubble
  hover(){
    //measuring distance from mouse to bubble
    let d = dist(mouseX, mouseY, this.x, this.y);

    //first part handles starting hovering
    //first check if the global hover boolean is false.
    if (iAmHovering == false){

      //if it's false, then if mouse is within bubble radius, change object and global hover booleans to true
      if (d < this.diameter/2){
        this.hovered = true;
        iAmHovering = true;
      } //closed inner nested "if" statement

    //next part handles stopping hovering  
    //if instead global hover boolean is true AND this is the object being hovered hover,
    } else if (iAmHovering == true && this.hovered == true){

      //if mouse is subsequently outside of the bubble radius, change object and global hover variables to false
      if (d >= this.diameter/2){
        
        //check if displaying data
        //if not,
        if(this.pauseMyBubble == false){
          this.hovered = false;
          iAmHovering = false;
        }

        //now, if user clicks, changes showData to false
        if (showData == false){
          this.hovered = false;
          iAmHovering = false;
          this.pauseMyBubble = false;
        }
      }
    }
  }
}