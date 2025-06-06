const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// function resizeCanvas() {
//   //fit canvas to window and fix issues with canvas blur on zoom
//   canvas.style.width = window.innerWidth + "px";
//   canvas.style.height = window.innerHeight + "px";
//   const scale = window.devicePixelRatio;
//   canvas.width = window.innerWidth * scale;
//   canvas.height = window.innerHeight * scale;
//   ctx.scale(scale, scale);
// }
// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);

// const size = ctx.canvas.height
// for (let y = 0; y < size; y+=30) {
//     for (let x = 0; x < size; x+=30) {
//         ctx.fillStyle = `hsl(${x+y},90%,50%)`
//         ctx.fillRect(x, y, 30, 30)
//     }
// }

//___________________get mouse input___________________

let mouse = {
  down: false,
  x: 0,
  y: 0
};
canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
canvas.addEventListener("mousedown", (event) => {
  mouse.down = true;
  console.log(mouse);
});
canvas.addEventListener("mouseup", (event) => {
  mouse.down = false;
});

//___________________new key input method___________________
let left = false;
let right = false;
let up = false;
let down = false;
let space = false;
let one = false;
let two = false;

window.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "ArrowRight":
      right = false;
      break;
    case "ArrowLeft":
      left = false;
      break;
    case "ArrowUp":
      up = false;
      break;
    case "ArrowDown":
      down = false;
      break;
    case "Space":
      space = false;
      break;
       case "Digit1":
      one = false;
      break;
    case "Digit2":
      two = false;
      break;
  }
});

window.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "ArrowRight":
      right = true;
      break;
    case "ArrowLeft":
      left = true;
      break;
    case "ArrowUp":
      up = true;
      break;
    case "ArrowDown":
      down = true;
      break;
    case "Space":
      space = true;
      break;
    case "Digit1":
      one = true;
      break;
    case "Digit2":
      two = true;
      break;
  }
});

//___________________animation loop ___________________

function Mole(
  moleStart,
  moleUp,
  moleY,
  moleRadius,
  clock,
  nextMove,
  velocity,
  goingUp
) {
  this.moleStart = moleStart;
  this.moleUp = moleUp;
  this.moleY = moleY;
  this.moleRadius = moleRadius;
  this.clock = clock;
  this.nextMove = nextMove;
  this.velocity = velocity;
  this.goingUp = goingUp;
}
let Mole1 = {
  moleStart: canvas.height * 0.96,
  moleUp: canvas.height * 0.58,
  moleY: 0,
  moleRadius: canvas.width / 17,
  clock: 0,
  nextMove: 120,
  velocity: 20,
  goingUp: true
};

 let Mole2 = {
  moleStart: canvas.height * 0.96,
  moleUp: canvas.height * 0.58,
  moleY: 0,
  moleRadius: canvas.width / 17,
  clock: 0,
  nextMove: 120,
  velocity: 20,
  goingUp: true
};


let score = 0;
let isReset = true;
Mole1.moleY = Mole1.moleStart;
Mole2.moleY = Mole2.moleStart;



function cycle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Mole1.clock++;
  
  if(one){
  console.log("one is pressed")
}
if(two){
  console.log("two is p1ressed")
}

  //draw top of hole
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 1.55,
    canvas.height * 0.8,
    canvas.width / 9,
    canvas.height / 10,
    Math.PI,
    0,
    Math.PI
  );
  ctx.fill();

  //draw top of mole
  ctx.fillStyle = "#5e4b28";
  ctx.beginPath();
  ctx.arc(
    canvas.width / 1.55,
    Mole1.moleY,
    Mole1.moleRadius,
    Math.PI,
    2 * Math.PI
  );
  ctx.fill();

  //draw base of mole
  ctx.fillRect(
    canvas.width / 1.55 - Mole1.moleRadius,
    Mole1.moleY,
    Mole1.moleRadius * 2,
    canvas.height / 3.5
  );

  ctx.fillStyle = "#fcf9dc";
  ctx.beginPath();
  ctx.arc(canvas.width * 0.615, Mole1.moleY, canvas.width / 45, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(canvas.width * 0.673, Mole1.moleY, canvas.width / 45, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(canvas.width * 0.615, Mole1.moleY, canvas.width / 65, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(canvas.width * 0.673, Mole1.moleY, canvas.width / 65, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "#f5aed1";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 1.55,
    Mole1.moleY + canvas.height / 21,
    canvas.width / 60,
    canvas.height / 60,
    0,
    0,
    2 * Math.PI
  );
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.fillRect(
    canvas.width * 0.3,
    canvas.height * 0.8,
    canvas.width * 0.45,
    canvas.height * 0.2
  );

  //draw bottom of hole
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 1.55,
    canvas.height * 0.8,
    canvas.width / 9,
    canvas.height / 10,
    Math.PI,
    Math.PI,
    2 * Math.PI
  );
  ctx.fill();

  //score counter
  ctx.beginPath();
  ctx.roundRect(10, 10, 150, 75, 20);
  ctx.fillStyle = "lightblue";
  ctx.fill();

  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("Score: " + score, 20, 55);

  function updateMole1() {
    if (Mole1.clock > Mole1.nextMove) {
      if (Mole1.goingUp) {
        Mole1.velocity = 20;
        Mole1.moleY -= Mole1.velocity;
        if (Mole1.moleY <= Mole1.moleUp) {
          Mole1.goingUp = false;
          Mole1.nextMove = Mole1.clock + 15; // pause at top
        } else {
          Mole1.nextMove = Mole1.clock + 5; // keep going up
        }
      } else {
        Mole1.velocity = 20;
        Mole1.moleY += Mole1.velocity;
        if (Mole1.moleY > Mole1.moleStart) {
          Mole1.goingUp = true;
          Mole1.nextMove = Mole1.clock + Math.floor(Math.random()*120) + Math.floor(Math.random() * 20); // pause before coming up
        } else {
          Mole1.nextMove = Mole1.clock + 5; // keep going down
        }
      }
    }
  }

  updateMole1();

  let angle = 0;
  let hammer1Down = -Math.PI / 5;

  if (space && two) {
    ctx.save();

    angle = hammer1Down;
    ctx.translate(canvas.width * 0.85, canvas.height * 0.9);
    ctx.rotate(angle);

    ctx.lineWidth = 20;
    ctx.strokeStyle = "#ad9b68";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -canvas.height * 0.5); // Move up from the base
    ctx.stroke();

    ctx.fillStyle = "#c21f1f";
    ctx.beginPath();
    ctx.roundRect(
      -canvas.width * 0.1,
      -canvas.height * 0.7,
      canvas.width * 0.2,
      canvas.height * 0.2,
      10
    );
    ctx.fill();

    ctx.restore();
  } else {
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#ad9b68";
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.89, canvas.height * 0.9);
    ctx.lineTo(canvas.width * 0.89, canvas.height * 0.4);
    ctx.stroke();
    ctx.fillStyle = "#c21f1f";
    ctx.beginPath();
    ctx.roundRect(
      canvas.width * 0.79,
      canvas.height * 0.2,
      canvas.width * 0.2,
      canvas.height * 0.2,
      10
    );
    ctx.fill();
  }
  
  if (Mole1.moleY < Mole1.moleUp && angle === hammer1Down && isReset) {
    Mole1.velocity = 70;
    Mole1.moleY += Mole1.velocity;
    Mole1.goingUp = false;
    score += 1;
    isReset = false;
  } else if (Mole1.moleY > Mole1.moleUp && angle === hammer1Down && isReset) {
    score -= 1;
    isReset = false;
  }
  if (!space) {
    isReset = true;
  }

  
  
  
 
  Mole2.clock++;

  //draw top of hole
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2.8,
    canvas.height * 0.8,
    canvas.width / 9,
    canvas.height / 10,
    Math.PI,
    0,
    Math.PI
  );
  ctx.fill();

  //draw top of mole
  ctx.fillStyle = "#5e4b28";
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2.8,
    Mole2.moleY,
    Mole2.moleRadius,
    Math.PI,
    2 * Math.PI
  );
  ctx.fill();

  //draw base of mole
  ctx.fillRect(
    canvas.width / 2.8 - Mole2.moleRadius,
    Mole2.moleY,
    Mole2.moleRadius * 2,
    canvas.height / 3.5
  );

  ctx.fillStyle = "#fcf9dc";
  ctx.beginPath();
  ctx.arc(canvas.width * 0.33, Mole2.moleY, canvas.width / 45, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(canvas.width * 0.385, Mole2.moleY, canvas.width / 45, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(canvas.width * 0.33, Mole2.moleY, canvas.width / 65, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(canvas.width * 0.385, Mole2.moleY, canvas.width / 65, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "#f5aed1";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2.8,
    Mole2.moleY + canvas.height / 21,
    canvas.width / 60,
    canvas.height / 60,
    0,
    0,
    2 * Math.PI
  );
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.fillRect(
    0,
    canvas.height * 0.8,
    canvas.width * 0.42,
    canvas.height * 0.2
  );

  //draw bottom of hole
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.ellipse(
    canvas.width / 2.8,
    canvas.height * 0.8,
    canvas.width / 9,
    canvas.height / 10,
    Math.PI,
    Math.PI,
    2 * Math.PI
  );
  ctx.fill();

  //score counter
  ctx.beginPath();
  ctx.roundRect(10, 10, 150, 75, 20);
  ctx.fillStyle = "lightblue";
  ctx.fill();

  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("Score: " + score, 20, 55);

  function updateMole2() {
    if (Mole2.clock > Mole2.nextMove) {
      if (Mole2.goingUp) {
        Mole2.velocity = 20;
        Mole2.moleY -= Mole2.velocity;
        if (Mole2.moleY <= Mole2.moleUp) {
          Mole2.goingUp = false;
          Mole2.nextMove = Mole2.clock + 15; // pause at top
        } else {
          Mole2.nextMove = Mole2.clock + 5; // keep going up
        }
      } else {
        Mole2.velocity = 20;
        Mole2.moleY += Mole2.velocity;
        if (Mole2.moleY > Mole2.moleStart) {
          Mole2.goingUp = true;
          Mole2.nextMove = Mole2.clock + Math.floor(Math.random()*220) + Math.floor(Math.random() * 150);; // pause before coming up
        } else {
          Mole2.nextMove = Mole2.clock + 5; // keep going down
        }
      }
    }
  }

  updateMole2();

  let angle2 = 0;
  let hammer2Down = Math.PI / 5;

  if (space && one) {
    
    ctx.save();
    
    angle = hammer2Down;
    ctx.translate(canvas.width * 0.1, canvas.height * 0.9);
    ctx.rotate(angle);

    ctx.lineWidth = 20;
    ctx.strokeStyle = "#ad9b68";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -canvas.height * 0.5); // Move up from the base
    ctx.stroke();

    ctx.fillStyle = "#c21f1f";
    ctx.beginPath();
    ctx.roundRect(
      -canvas.width * 0.1,
      -canvas.height * 0.7,
      canvas.width * 0.2,
      canvas.height * 0.2,
      10
    );
    ctx.fill();

    ctx.restore();
  } else {
    ctx.lineWidth = 20;
    ctx.strokeStyle = "#ad9b68";
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.12, canvas.height * 0.9);
    ctx.lineTo(canvas.width * 0.12, canvas.height * 0.4);
    ctx.stroke();
    ctx.fillStyle = "#c21f1f";
    ctx.beginPath();
    ctx.roundRect(
      canvas.width * 0.02,
      canvas.height * 0.2,
      canvas.width * 0.2,
      canvas.height * 0.2,
      10
    );
    ctx.fill();
  }

  if (Mole2.moleY < Mole2.moleUp && angle === hammer2Down && isReset) {
    Mole2.velocity = 70;
    Mole2.moleY += Mole2.velocity;
    Mole2.goingUp = false;
    score += 1;
    isReset = false;
  } else if (Mole2.moleY > Mole2.moleUp && angle === hammer2Down && isReset) {
    score -= 1;
    isReset = false;
  }
  if (!space) {
    isReset = true;
  }
  
  
  
  
  requestAnimationFrame(cycle);
}
requestAnimationFrame(cycle);