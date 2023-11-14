const strings = ['It is certain', 'It is decidely so', 'Without a doubt', 'Yes, definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
let str = 'Magic 8 Ball';
let xWidth = innerWidth >= 600 ? 600 : innerWidth;
let yHeight = innerHeight >= 900 ? 900 : innerHeight;
console.log(strings.length);
let fontSize = 24;
if (xWidth < 400) {
  fontSize = 16;
}
let xPos = xWidth / 2;
let yPos = yHeight / 2;

function setup() {
  createCanvas(xWidth, yHeight);


  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  setShakeThreshold(50);
}

function draw() {
  background(220);
  fill(0);
  textSize(fontSize * 1.5);
  text("Amazing Magic 8 Ball", width / 2, height / 8);
  fill(0);
  circle(xPos, yPos, width * .8)
  fill(255);
  circle(xPos, yPos, width * .3);
  // circle(width *.2, height * .2, width * .2);
  fill(0);
  textSize(fontSize);
  text(str, xPos, yPos, width * .25);

}

function updateText() {
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

  if (totalAccel > 30) {
    updateText();
  }

}

window.addEventListener("devicemotion", handleMotionEvent, true);