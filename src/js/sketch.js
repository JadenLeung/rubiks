import './lib/p5.easycam.js';
import Picker from './picker.js';
import Cuby from './cuby.js';

export default function (p) {
  const CUBYESIZE = 50;
  const DEBUG = false;

  let CAM;
  let CAM_PICKER;
  let PICKER;
  let CUBE = {};
  let RND_COLORS;
  let GAP = 0;
  let SIZE = 3;
  let SIZE_SLIDER;
  let GAP_SLIDER;
  let SPEED_SLIDER;
  let inp;
  let SPEED = 0.01;
  let BACKGROUND_COLOR = 230;
  let arr = [];
  let canMan = true;
  let shuffleNB;
  let undo = [];
  p5.disableFriendlyErrors = DEBUG ? false : true;

  p.setup = () => {
    p.createCanvas(DEBUG ? p.windowWidth / 2 : p.windowWidth * 0.666, p.windowHeight, p.WEBGL);
    p.pixelDensity(1);
    p.frameRate(60);
    p.smooth();

    PICKER = new Picker(p, DEBUG);
    CAM = p.createEasyCam(p._renderer);
    CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);

    CAM.rotateX(-p.PI / 2.7);
    CAM.rotateY(-p.PI / 7);
    CAM.rotateZ(-p.PI / 2);

    reSetup();
	
	// hardcoded to do size 50 (3x3x3) 
    //SIZE_SLIDER = p.createSlider(2, 5, 3, 1);
	if(canMan)
	{
	SIZE_SLIDER = p.createSlider(3, 1);
    SIZE_SLIDER.input(sliderUpdate);
    SIZE_SLIDER.hide();
	SIZE_SLIDER.parent("slider_div");

    GAP_SLIDER = p.createSlider(0, 100, 0, 1);
    GAP_SLIDER.input(sliderUpdate);
	GAP_SLIDER.hide();
	GAP_SLIDER.parent("slider_div");
	
	SPEED_SLIDER = p.createSlider(0.01, 2, 0.01, 0.01);
    SPEED_SLIDER.input(sliderUpdate);
	SPEED_SLIDER.parent("slider_div");
	}
    
    const SHUFFLE_BTN = p.createButton('Shuffle');
	SHUFFLE_BTN.parent("shuffle_div");
    SHUFFLE_BTN.mousePressed(shuffleCube.bind(null, 0));
	
	const RESET = p.createButton('Reset');
	RESET.parent("reset_div");
    RESET.mousePressed(reSetup.bind(null, 0));
	
	const UNDO = p.createButton('Undo');
	UNDO.parent("undo");
    UNDO.mousePressed(Undo.bind(null, 0));
	
	inp = p.createInput('');
	inp.parent("test_alg_div");
	inp.size(150);
	
    const GO_BTN = p.createButton('Go!');
	GO_BTN.parent("test_alg_div");
	GO_BTN.mousePressed(testAlg.bind(null, 0));	
  }

  function reSetup() {
    CUBE = {};
	arr = [];
    RND_COLORS = genRndColors();
    let cnt = 0;

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        for (let k = 0; k < SIZE; k++) {
          let offset = ((SIZE - 1) * (CUBYESIZE + GAP)) * 0.5;
          let x = (CUBYESIZE + GAP) * i - offset;
          let y = (CUBYESIZE + GAP) * j - offset;
          let z = (CUBYESIZE + GAP) * k - offset;
          CUBE[cnt] = new Cuby(CUBYESIZE, x, y, z, RND_COLORS[cnt], PICKER, p);
          cnt++;
        }
      }
    }
  }

  function sliderUpdate() {
    SIZE = SIZE_SLIDER.value();
    GAP = GAP_SLIDER.value();
	SPEED = SPEED_SLIDER.value();
    //reSetup();
  }

  function genRndColors() {
    let cols = [];
    let res = [];
    let current_color;

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      res[i] = [];
      for (let j = 0; j < 6; j++) {
        current_color = p.color(p.random(255), p.random(255), p.random(255));
        while (cols.includes(current_color)) {
          current_color = p.color(p.random(255), p.random(255), p.random(255));
        }

        res[i].push(current_color);
        cols.push(current_color);
      }
    }

    return res;
  }

  function rotateMatrix(x, y, dir) {
    let xP;
    let yP;

    if (dir === -1) {
      xP = Math.round(Math.cos(p.HALF_PI) * x + Math.sin(p.HALF_PI) * y);
      yP = Math.round(-Math.sin(p.HALF_PI) * x + Math.cos(p.HALF_PI) * y);
    } else {
      xP = Math.round(Math.cos(p.HALF_PI) * x - Math.sin(p.HALF_PI) * y);
      yP = Math.round(Math.sin(p.HALF_PI) * x + Math.cos(p.HALF_PI) * y);
    }

    return {
      x: xP,
      y: yP
    };
  }

  function moveX(row, dir) { // switch `i` cubes and rotate theme..
    let stack = [];
    let primes, found, tmp; // x' y'

    tmp = {};
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].x === row) {
        primes = rotateMatrix(CUBE[i].y, CUBE[i].z, dir);
        tmp[i] = new Cuby(CUBYESIZE, CUBE[i].x, primes.x, primes.y, RND_COLORS[i], PICKER, p);
        tmp[i].syncColors(CUBE[i]);
        tmp[i].rotateX(dir);
        if (CUBE[i].debugging === true) {
          tmp[i].debug();
        }
      }
    }
    for (let [i, cube] of Object.entries(tmp)) {
      CUBE[i] = cube;
    }
  }

  function moveY(row, dir) { // switch `j` cubes and rotate them..
    let stack = [];
    let primes, found, tmp;

    tmp = {};
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) { // foreach cubes
      if (CUBE[i].y === row) { // if cubbie in the 'Y' face
        primes = rotateMatrix(CUBE[i].x, CUBE[i].z, dir); // calculate new position for that cube
        tmp[i] = new Cuby(CUBYESIZE, primes.x, CUBE[i].y, primes.y, RND_COLORS[i], PICKER, p); // buffer theme in a new cubye
        tmp[i].syncColors(CUBE[i]);
        tmp[i].rotateY(dir);
        if (CUBE[i].debugging === true) {
          tmp[i].debug();
        }
      }
    }
    for (let [i, cube] of Object.entries(tmp)) {
      CUBE[i] = cube;
    }
  }

  function moveZ(row, dir) { // switch `z` cubes and rotate them..
    let stack = [];
    let primes, found, tmp;

    tmp = {};
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) { // foreach cubes
      if (CUBE[i].z === row) { // if cubbie in the 'z' face
        primes = rotateMatrix(CUBE[i].x, CUBE[i].y, dir); // calculate new position for that cube
        tmp[i] = new Cuby(CUBYESIZE, primes.x, primes.y, CUBE[i].z, RND_COLORS[i], PICKER, p); // buffer theme in a new cubye
        tmp[i].syncColors(CUBE[i]);
        tmp[i].rotateZ(dir);
        if (CUBE[i].debugging === true) {
          tmp[i].debug();
        }
      }
    }
    for (let [i, cube] of Object.entries(tmp)) {
      CUBE[i] = cube;
    }
  }

  function animate(axis, row, dir) {
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].animating()) {
        // some cube is already in animation
        return;
      }
    }

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].get(axis) === row) {
        CUBE[i].row = row;
        CUBE[i].dir = dir;
        CUBE[i].anim_axis = axis;
        CUBE[i].anim_angle = CUBE[i].dir * SPEED;
      }
    }
  }

  function cleanAllSelectedCubies() {
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      CUBE[i].is_selected = false;
      CUBE[i].selected_face = false;
    }
  }

  function getCubyByColor(arr1) {
    let face;

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      // for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
        face = CUBE[i].hasColorFace(arr1);
        if (face !== false) {
          return [CUBE[i], face];
        }
      // }
    }

    return false;
  }

  function getSelectedCube() {
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].is_selected) {
        return CUBE[i];
      }
    }

    return false;
  }

  function shuffleCube(nb) {
	const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'", "M", "M'", 
	"E", "E'", "Lw'", "Lw'", "Uw", "Uw'", "Rw", "Rw'", "Dw", "Dw'", "Bw", "Bw'", "Fw", "Fw'"];
	arr = [];
	let bad = "";
    for(let i = 0; i < 15; i++)
	{
		while(true)
		{
			let rnd = p.random(possible);
			console.log("rnd is " + rnd);
			if(rnd == bad)
				continue;
			
			if(rnd.slice(-1) == "'")
			{
				bad = rnd.substring(0, rnd.length-1);
			}
			else
			{
				bad = rnd + "'";
			}
			arr.push(rnd);
			console.log("bad is " + bad);
			break;
		}
	}
	multiple(0);
  }

  function randomMove() {
    const axes = ['x', 'y', 'z'];
    const dirs = [-1, 1];
    const row = [-50, 50];
    const axe = p.random(axes);
    const cuby = p.random(Object.values(CUBE));
    animate(axe, p.random(row), p.random(dirs));
  }

  function startAction() {
    const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);

    if (hoveredColor) {
      
      const res = getCubyByColor(hoveredColor);
      if (res) {
        cleanAllSelectedCubies();
        res[0].is_selected = true;
        res[0].selected_face = res[1];
      }
    }
  }

  //   *************************************
function animateRotate(axis, dir) {
    let rows = [-50, 0, 50];
	
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].animating()) {
        // some cube is already in animation
        return;
      }
    }

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
		  if (CUBE[i].get(axis) === rows[j]) {
			CUBE[i].row = rows[j];
			CUBE[i].dir = dir;
			CUBE[i].anim_axis = axis;
			CUBE[i].anim_angle = CUBE[i].dir * SPEED;
		  }
		}
    }
}
function animateWide(axis, row, dir) {
    let rows = [row, 0];
	
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].animating()) {
        // some cube is already in animation
        return;
      }
    }

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
		  if (CUBE[i].get(axis) === rows[j]) {
			CUBE[i].row = rows[j];
			CUBE[i].dir = dir;
			CUBE[i].anim_axis = axis;
			CUBE[i].anim_angle = CUBE[i].dir * SPEED;
		  }
		}
    }
  }
p.keyPressed = (event) => {
	if (event.srcElement.nodeName == "INPUT") {
		event.stopPropagation;
		return;
	}	  
	console.log("keyCode is: " + p.keyCode);  
	if(canMan == true)
	{
	switch (p.keyCode) {
		case 37:
		console.log("Left Arrow/y");
		undo.push("y");
		animateRotate("x", -1);
		break;
		case 39:
		console.log("Right Arrow/y'");
		undo.push("y'");
		animateRotate("x", 1);
		break;	
		case 40:
		console.log("Down Arrow/x'");
		undo.push("x'");
		animateRotate("z", -1);
		break;
		case 38:
		console.log("Up Arrow/x");
		undo.push("x");
		animateRotate("z", 1);
		break;	
		case 76:
		undo.push("D'");
		animate('x', 50, -1);
		break;
		case 83:
		undo.push("D");
		animate('x', 50, 1);
		break;
		case 74:
		undo.push("U");
		animate('x', -50, -1);
		break;
		case 70:
		undo.push("U'");
		animate('x', -50, 1);
		break;
		case 72:
		undo.push("F");
		animate('y', 50, -1);
		break;
		case 71:
		undo.push("F'");
		animate('y', 50, 1);
		break;
		case 79:
		undo.push("B'");
		animate('y', -50, -1);
		break;
		case 87:
		undo.push("B");
		animate('y', -50, 1);
		break;
		case 75:
		undo.push("R'");
		animate('z', 50, -1);
		break;
		case 73:
		undo.push("R");
		animate('z', 50, 1);
		break;
		case 68:
		undo.push("L");
		animate('z', -50, -1);
		break;
		case 69:
		undo.push("L'");
		animate('z', -50, 1);
		break;
		case 188:
		undo.push("M'");
		animate('z', 0, 1);
		break;
		case 190:
		undo.push("M");
		animate('z', 0, -1);
		case 65:
		undo.push("E");
		animate('x', 0, 1);
		break;
		case 186:
		undo.push("E'");
		animate('x', 0, -1);
		break;
		case 8: //backspace
		Undo();
		break;
		case 13: //enter
			let tempstr = window.prompt("Enter an algorithm (each move separated by spaces)");
			changeArr(tempstr);
			multiple(0);
		break;
	}
	}
  }
  function multiple(nb) {
    if (nb < arr.length) {
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		let secs = 375-SPEED*225;
		if(secs < 20)
			secs = 20;
		setTimeout(multiple.bind(null, nb + 1), secs);
    }
	else
	{
		canMan = true;
	}
  }
  function changeArr(str)
  {
	  arr = [];
	  const arr2 = ['r', 'u', 'd', 'b', 'l', 'f'];
	  console.log("here");
	  let temp = "";
	  let end  = 1;
	  while(str != "")
	  {
		  console.log(str);
		  console.log(arr);
		  end = 1;
		  temp = "";
		  if(arr2.includes(str[0]))
			temp += (str[0].toUpperCase() + "w");
		  else
			temp += str[0];
		  if(str[end] == "w")
		  {
			temp += "w";
			end++;
		  }
		  if(str[end] == "'" || str[end] == "’")
		  {
			  temp += "'";
			  end++;
		  }
		  if(str[end] == "2")
		  {
			  end++;
			  arr.push(temp + "'");
			  arr.push(temp + "'");
		  }
		  else
		  {
			  arr.push(temp);
		  }
		  str = str.substring(end);
		  while(str[0] == " " || str[0] == ",")
		  {
			 str = str.substring(1); 
		  }
	  }
	  console.log(arr);
  }
  function Undo()
  {
	  if(undo.length == 0 || !canMan)
		  return;
		let move = undo.pop();
		console.log("move is " + move);
		if(move.slice(-1) == "'")
		{
			move = move.substring(0, move.length-1);
		}
		else
		{
			move = move + "'";
		}
		arr = [move];
		notation(move);
		undo.pop();
  }
  function notation(move){
	  undo.push(move);
	  if(move == "D'")
		  animate('x', 50, -1);
	  if(move == "D")
		  animate('x', 50, 1);
	  if(move == "U")
		  animate('x', -50, -1);
	  if(move == "U'")
		  animate('x', -50, 1);
	  if(move == "F")
		  animate('y', 50, -1);
	  if(move == "F'")
		  animate('y', 50, 1);
	  if(move == "B'")
		  animate('y', -50, -1);
	  if(move == "B")
		  animate('y', -50, 1);
	  if(move == "R'")
		  animate('z', 50, -1);
	  if(move == "R")
		  animate('z', 50, 1);
	  if(move == "L")
		  animate('z', -50, -1);
	  if(move == "L'")
		  animate('z', -50, 1);
	  if(move == "M'")
		  animate('z', 0, 1);
	  if(move == "M")
		  animate('z', 0, -1);
	  if(move == "x'")
		  animateRotate("z", -1);
	  if(move == "x")
		  animateRotate("z", 1);
	  if(move == "y")
		  animateRotate("x", -1);
	  if(move == "y'")
		  animateRotate("x", 1);	
	  if(move == "E")
		  animate('x', 0, 1);
	  if(move == "E'")
		  animate('x', 0, -1);
	  if(move == "Lw")
		  animateWide('z', -50, -1);
	  if(move == "Lw'")
		  animateWide('z', -50, 1);
	  if(move == "Rw'")
		  animateWide('z', 50, -1);
	  if(move == "Rw")
		  animateWide('z', 50, 1);
	  if(move == "Fw")
		  animateWide('y', 50, -1);
	  if(move == "Fw'")
		  animateWide('y', 50, 1);
	  if(move == "Bw'")
		  animateWide('y', -50, -1);
	  if(move == "Bw")
		  animateWide('y', -50, 1);
	  if(move == "Uw")
		  animateWide('x', -50, -1);
	  if(move == "Uw'")
		  animateWide('x', -50, 1);
	  if(move == "Dw'")
		  animateWide('x', 50, -1);
	  if(move == "Dw")
		  animateWide('x', 50, 1);
  }

function testAlg(){
	if(canMan)
	{
		changeArr(inp.value());
		multiple(0);	
	}
}  
//   *************************************

  p.mousePressed = () => {
    startAction();
  }

  p.touchStarted = () => {
    startAction();
  }

  p.mouseDragged = () => {
    const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);

    if (hoveredColor) {
      const res = getCubyByColor(hoveredColor);

      if (res) {
        const pk = getSelectedCube();

        if (pk) {
          const move = pk.getMove(res[0], res[1], ((SIZE - 1) * (CUBYESIZE + GAP)) * 0.5);

          if (move) {
            animate(move[0], move[1], move[2]);
            pk.is_selected = false;
            pk.selected_face = false;
          }
        }
      }
    }
  }

  p.windowResized = () => {
    p.resizeCanvas(DEBUG ? (p.windowWidth / 2) : p.windowWidth * 0.666, p.windowHeight);
    PICKER.buffer.resizeCanvas(DEBUG ? (p.windowWidth / 2) : p.windowWidth, p.windowHeight);
  }

  p.draw = () => {
    const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);
    if (hoveredColor && getCubyByColor(hoveredColor) && !p.mouseIsPressed) {
      CAM.removeMouseListeners();
    } else {
      CAM.attachMouseListeners();
    }

    CAM_PICKER.setState(CAM.getState(), 0);

    renderCube();
  }

  function renderCube() {
    PICKER.buffer.background(0);
    p.background(BACKGROUND_COLOR);

    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].animating()) {
        if (CUBE[i].dir === 1 && CUBE[i].anim_angle < p.HALF_PI ||
          CUBE[i].dir === -1 && CUBE[i].anim_angle > -p.HALF_PI) {
          p.push();
          CUBE[i].anim_angle += CUBE[i].dir * 0.1 * (SIZE / 3);
          if (CUBE[i].anim_axis === 'x') {
            p.rotateX(CUBE[i].anim_angle);
          } else if (CUBE[i].anim_axis === 'y') {
            p.rotateY(CUBE[i].anim_angle * -1);
          } else {
            p.rotateZ(CUBE[i].anim_angle);
          }
          CUBE[i].show();
          p.pop();
        } else {
          if (CUBE[i].anim_axis === 'x') {
            moveX(CUBE[i].row, CUBE[i].dir);
          } else if (CUBE[i].anim_axis === 'y') {
            moveY(CUBE[i].row, CUBE[i].dir);
          } else {
            moveZ(CUBE[i].row, CUBE[i].dir);
          }
          CUBE[i].anim_axis = false;
          CUBE[i].anim_angle = false;
          CUBE[i].show();
        }
      } else {
        CUBE[i].show();
      }
    }
  }
  window.addEventListener('keydown', (e) => {
    if (e.target.localName != 'input') {   // if you need to filter <input> elements
        switch (e.keyCode) {
            case 37: // left
            case 39: // right
            case 38: // up
            case 40: // down
			case 32:
                e.preventDefault();
                break;
            default:
                break;
        }
    }
}, {
    capture: true,   // this disables arrow key scrolling in modern Chrome
    passive: false   // this is optional, my code works without it
});
}