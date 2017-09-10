let vehicles = [];
let food = [];
let poison = [];
let debug;

function setup() {
  createCanvas(640,360);

  for (let i = 0; i < 50; i += 1) {
    let x = random(width);
    let y = random(height);
    vehicles[i] = new Vehicle(x, y);
  }

  for (let i = 0; i < 40; i += 1) {
    createFood();
  }

  for (let i = 0; i < 20; i += 1) {
    createPoison();
  }

  debug = createCheckbox('Show detailed info');
}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}

function createFood(x = random(width), y = random(height)) {
  food.push(createVector(x, y));
}

function createPoison(x = random(width), y = random(height)) {
  poison.push(createVector(x, y));
}

function draw() {
  background(51);

  // Randomly creates food
  if (random(1) < 0.1) {
    createFood();
  }
  // Randomly creates poison
  if (random(1) < 0.01) {
    createPoison();
  }

  var target = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(target.x, target.y, 48, 48);

  // Draw food
  for (let i = 0; i < food.length; i += 1) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 4, 4);
  }

  // Draw poison
  for (let i = 0; i < poison.length; i += 1) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 4, 4);
  }

  for (let i = vehicles.length-1; i >= 0; i -= 1) {
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].display(debug.checked());

    // Create clone
    var newVehicle = vehicles[i].clone();
    if (newVehicle !== null) {
      vehicles.push(newVehicle);
    }

    // If it's dead, delete from the array
    if (vehicles[i].dead()) {
      createFood(vehicles[i].position.x, vehicles[i].position.y);
      vehicles.splice(i, 1);
    }

  }

}
