const strings = ['It is certain', 'It is decidely so', 'Without a doubt', 'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
let str = 'Magic 8 Ball';
let xWidth = innerWidth >= 600 ? 600 : innerWidth;
let yHeight = innerHeight >= 900 ? 900 : innerHeight - 32;
console.log(strings.length);
let fontSize = 24;
if (xWidth < 400) {
  fontSize = 16;
}
let xPos = xWidth / 2;
let yPos = yHeight / 2;
let delta = 0;

function setup() {
  createCanvas(xWidth, yHeight);


  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  setShakeThreshold(50);
}

function draw() {
  background(90, 150, 100);
  //title
  fill(0);
  textSize(fontSize * 1.5);
  text("Amazing Magic 8 Ball", width / 2, height / 8);
  //subtitle
  textSize(fontSize);
  text("ask anything for a totally reliable answer", width / 2, height / 8 + height/20);
  //draw pockets
  fill(0);
  circle(0, 0, 60);
  circle(0, height, 60);
  circle(width, 0, 60);
  circle(width, height, 60);
  circle(0, height/2, 60);
  circle(width, height/2, 60);
  //draw 8-ball
  
  circle(xPos + random(-delta, delta), yPos + random(-delta, delta), width * .8)
  fill(255);
  circle(xPos + random(-delta, delta), yPos + random(-delta, delta), width * .3);
  // write phrase
  fill(0);
  textSize(fontSize);
  text(str, xPos + random(-delta, delta), yPos + random(-delta, delta), width * .25);

}

function updateText() {
  
  moveBall();
  navigator?.vibrate?.(200);
  // navigator.vibrate(200);
  str = random(strings)
}

// function deviceShaken() {
//   updateText();
// }

function mouseReleased() {
  updateText();
  onClick();
}

// Navigator.requestPermission()
// .then(response => {
//   if (response == 'granted') {
//     window.addEventListener('devicemotion', updateText)
//   }
// })
// .catch(console.error)

function onClick() {
  console.log('I was clicked');
  // feature detect
  
  if (typeof DeviceMotionEvent.requestPermission === 'function') {

    DeviceMotionEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('devicemotion', handleMotionEvent);
        }
      })
      .catch(console.error);
  } else {
    updateText();
    // handle regular non iOS 13+ devices
  }
}
function handleMotionEvent(event) {
  let totalAccel = Math.sqrt(event.acceleration.x ** 2 + event.acceleration.y ** 2);

  if (totalAccel > 20) {
    updateText();
  }

}

window.addEventListener("devicemotion", handleMotionEvent, true);

function moveBall () {
  
    delta = 10;
    setTimeout(() => {
     delta = 0;
    }, 500)
  
  
  // console.log("centered");
}