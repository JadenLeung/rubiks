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
  let shufflespeed = 5;
  let BACKGROUND_COLOR = 230;
  let arr = [];
  let canMan = true;
  let shuffleNB;
  let undo = [];
  let layout = [[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
				[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
				[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
				[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
				[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
				[[0, 0, 0],[0, 0, 0],[0, 0, 0]]
  ];
  let opposite = [];
  opposite["g"] = "b";
  opposite["b"] = "g";
  opposite["y"] = "w";
  opposite["w"] = "y";
  opposite["o"] = "r";
  opposite["r"] = "o";
  let color = "lol";
  let colorTwo = "lmao";
  let colorThree = "lmaoliest";
  let cubyColors = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  let saystep = 0;
  p5.disableFriendlyErrors = DEBUG ? false : true;
	
class Timer {
  constructor () {
    this.isRunning = false;
    this.startTime = 0;
    this.overallTime = 0;
  }

  _getTimeElapsedSinceLastStart () {
    if (!this.startTime) {
      return 0;
    }
  
    return Date.now() - this.startTime;
  }

  start () {
    if (this.isRunning) {
      return console.error('Timer is already running');
    }

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop () {
    if (!this.isRunning) {
      return console.error('Timer is already stopped');
    }

    this.isRunning = false;

    this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
  }

  reset () {
    this.overallTime = 0;

    if (this.isRunning) {
      this.startTime = Date.now();
      return;
    }

    this.startTime = 0;
  }

  getTime () {
    if (!this.startTime) {
      return 0;
    }

    if (this.isRunning) {
      return this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    return this.overallTime;
  }
}
const timer = new Timer();
setInterval(() => {
  const timeInSeconds = Math.round(timer.getTime() / 100)/10.0;
  document.getElementById('time').innerText = timeInSeconds;
  setLayout();
  let secs = 375-SPEED*225;
  if(secs < 20)
		secs = 20;
  if(isSolved() && timer.getTime() > secs && timer.isRunning)
	{
		timer.stop();
		console.log(isSolved());
	}
}, 100)
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
	
	const SOLVE = p.createButton('Solve');
	SOLVE.parent("solve");
    SOLVE.mousePressed(solveCube.bind(null, 0));
	
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
	undo = [];
	timer.stop();
	timer.reset();
	shufflespeed = 5;
    RND_COLORS = genRndColors();
	document.getElementById("step").innerHTML = "";
	document.getElementById("stepbig").innerHTML = "";
	document.getElementById("fraction").innerHTML = "";
    let cnt = 0;

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        for (let k = 0; k < SIZE; k++) {
          let offset = ((SIZE - 1) * (CUBYESIZE + GAP)) * 0.5;
          let x = (CUBYESIZE + GAP) * i - offset;
          let y = (CUBYESIZE + GAP) * j - offset;
          let z = (CUBYESIZE + GAP) * k - offset;
		  if(x == -2)
			  //chloe
		  {
			 CUBE[cnt] = new Cuby(100, x, y, z, RND_COLORS[cnt], PICKER, p);
			console.log("here");
		  }else
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
		if(shufflespeed < 5)
			CUBE[i].anim_angle = CUBE[i].dir * shufflespeed;
		else
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
	if(canMan == false)return;
	shufflespeed = 2;
	timer.reset();
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
	multiple2(0);
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
			if(shufflespeed < 5)
				CUBE[i].anim_angle = CUBE[i].dir * shufflespeed;
			else
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
			if(shufflespeed < 5)
				CUBE[i].anim_angle = CUBE[i].dir * shufflespeed;
			else
				CUBE[i].anim_angle = CUBE[i].dir * SPEED;
		  }
		}
    }
  }
  function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
  }
p.keyPressed = (event) => {
	if (event.srcElement.nodeName == "INPUT") {
		event.stopPropagation;
		return;
	}	  
	console.log("keyCode is: " + p.keyCode);  
	if(canMan == true)
	{
	setLayout();
	console.log("here");
	if(Math.round(timer.getTime() / 100)/10.0 == 0)
		timer.start();
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
		setLayout();
		console.log(crossColor());
		break;
		case 32: //enter
		setLayout();
		console.log(layout);
		console.log(cubyColors);
		break;
		case 16: //shift
		color = (layout[2][1][1][0]);
		console.log("ok");
		console.log("883 " + layout[0][1][0].includes(color) + " " + layout[0][1][2].includes(color) + " "+ layout[2][1][0].includes(color) 
			+ " " + layout[2][1][2].includes(color)  + " " + (layout[2][2][1][0] != color));
		break;
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
  function multiple2(nb) {
    if (nb < arr.length) {
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		shufflespeed = 2;
		setTimeout(multiple2.bind(null, nb + 1), 20);
    }
	else
	{
		shufflespeed = 5;
		canMan = true;
	}
  }
  function changeArr(str)
  {
	  arr = [];
	  const arr2 = ['r', 'u', 'd', 'b', 'l', 'f'];
	  //console.log("here");
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
	  //console.log(arr);
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
  function solveCube()
  {
	  if(canMan == false)
		  return;
	  setLayout();
	  if(!isSolved())
	  {
		 timer.reset();
		 timer.start();
		 document.getElementById("stepbig").innerHTML = "Current Solving Step:";
		 canMan = false;
		 stepTwo();
	  }
	  
  }
  function notation(move){
	  undo.push(move);
	  setLayout();
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
	  if(move == "z")
		  animateRotate("y", -1);
	  if(move == "z'")
		  animateRotate("y", 1);
	  if(move == "E")
		  animate('x', 0, 1);
	  if(move == "E'")
		  animate('x', 0, -1);
	  if(move == "S")
		  animate('y', 0, -1);
	  if(move == "S'")
		  animate('y', 0, 1);
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
  function stepTwo(){
	let pos = crossColor()[0];
	color = crossColor()[1];
	arr = [];
	if(pos != 2)
	{
		document.getElementById("step").innerHTML = "Putting the 3 or 4 correct edges on top";
		document.getElementById("fraction").innerHTML = "2/15";
		arr = [];
		if(pos == 0)
		arr = ["z"];
		if(pos == 1)
		arr = ["z'"];
		if(pos == 3)
		arr = ["x","x"];
		if(pos == 4)
		arr = ["x'"];
		if(pos == 5)
		arr = ["x"];
		console.log(crossColor() + "   " + arr);
		multipleCross2(0);
	}
	else if(crossColor()[2] < 4)
	{
		document.getElementById("step").innerHTML = "Putting in last edge piece";
		document.getElementById("fraction").innerHTML = "3/15";
		arr = [];
		if(layout[5][1][0][0] == color && layout[2][1][0][0] != color)
			arr = ["L'"];
		else if(layout[5][1][2][0] == color && layout[2][1][2][0] != color)
			arr = ["R"];
		else if(layout[4][1][0][0] == color && layout[2][1][0][0] != color)
			arr = ["L"];
		else if(layout[4][1][2][0] == color && layout[2][1][2][0] != color)
			arr = ["R'"];
		else if(layout[0][1][0][0] == color && layout[2][0][1][0] != color)
			arr = ["B'"];
		else if(layout[1][1][0][0] == color && layout[2][0][1][0] != color)
			arr = ["B"];
		else if(layout[3][0][1][0] == color && layout[2][0][1][0] != color)
			arr = ["B", "B"];
		else if(layout[1][1][2][0] == color && layout[2][2][1][0] != color)
			arr = ["F'"];
		else if(layout[0][1][2][0] == color && layout[2][2][1][0] != color)
			arr = ["F"];
		else if((layout[3][0][1].includes(color) || layout[3][1][0].includes(color) || layout[3][1][2].includes(color) || layout[3][2][1].includes(color))
			&& layout[2][2][1][0] != color)
		{
			console.log("834");
			if(layout[5][2][1].includes(color))
			{
				if(layout[5][2][1][0] == color)
					changeArr("F' U' R");
				else
					arr = ["F", "F"];
			}
			else
			{
				if(layout[0][2][1].includes(color))
				{
					if(layout[0][2][1][0] == color)
						changeArr("L' F L");
					else
						arr = ["D"];
				}
				else
				{
					if(layout[1][2][1][0] == color)
						changeArr("R F' R'");
					else
						arr = ["D'"];
				}
			}
		}
		else if((layout[0][1][0].includes(color) || layout[0][1][2].includes(color) || layout[2][1][0].includes(color) || layout[2][1][2].includes(color) )
			&& layout[2][2][1][0] != color)
		{
			console.log("863");
			if(layout[5][1][0].includes(color))
			{
				if(layout[5][1][0][0] == color)
					changeArr("U L'")
				else
					arr = ["F"];
			}
			else if(layout[5][1][2].includes(color))
			{
				if(layout[5][1][2][0] == color)
					changeArr("U' R")
				else
					arr = ["F'"];
			}
			else
				arr = ["E"];
		}
		else
		{
			console.log("883 " + layout[0][1][0].includes(color) + " " + layout[0][1][2].includes(color) + " "+ layout[2][1][0].includes(color) 
			+ " " + layout[2][1][2].includes(color)  + " " + (layout[2][2][1][0] != color));
			if(layout[5][0][1][0] == color)
				changeArr("F U' R");
			else if(layout[0][0][1][0] == color)
				changeArr("L' U B'");
			else if(layout[1][0][1][0] == color)
				changeArr("R U' B");
			else if(layout[4][0][1][0] == color)
				changeArr("B U' L");
			else if(!layout[0][0][1].includes(color))
				arr = ["U'"]
			else
				arr = ["U"];
		}
		multipleCross2(0);
	}
	else if(layout[2][1][1][0] != color && saystep < 6)
	{
		document.getElementById("step").innerHTML = "Putting correct center piece on top";
		document.getElementById("fraction").innerHTML = "5/15";
		saystep = 5;
		arr = [];
		if(layout[3][1][1][0] == color)
		{
			changeArr("M2 B2 F2")
		}
		else if(layout[5][1][1][0] == color)
		{
			changeArr("M' S' M S");
		}
		else
		{
			if(layout[4][1][1][0] == color)
				changeArr("M S M' S'");
			else
				arr = ["y"];
		}
		multipleCross2(0);
	}
	else if(numPFL() < 3 && saystep < 7)
	{
		console.log(numPFL());
		document.getElementById("step").innerHTML = "Permuting edges";
		document.getElementById("fraction").innerHTML = "6/15";
		arr = [];
		if(numPFL() < 2)
			arr = ["U"];
		else if(layout[4][0][1][0] == layout[4][1][1][0] && layout[0][0][1][0] == layout[0][1][1][0])
		{
			changeArr("R' U' R U R'");
		}
		else if(layout[5][0][1][0] == layout[5][1][1][0] && layout[1][0][1][0] == layout[1][1][1][0])
			changeArr("L' U' L U L'")
		else if(opposite[layout[0][0][1][0]] == layout[0][1][1][0] && opposite[layout[1][0][1][0]] == layout[1][1][1][0])
		{
			changeArr("M2 U2 M2")
		}
		else
			arr = ["Uw"];
		multipleCross2(0);
	}
	else if(cornerPFL() < 210 && saystep < 8)
	{
		console.log("cornerPFL " + cornerPFL());
		saystep = 7;
		document.getElementById("step").innerHTML = "Putting corner pieces on top";
		document.getElementById("fraction").innerHTML = "7/15";
		arr = [];
		let color2 = layout[5][0][1][0];
		let color3 = layout[1][0][1][0];
		if(layout[3][0][0].includes(color) || layout[3][0][2].includes(color) || layout[3][2][0].includes(color) || layout[3][2][2].includes(color))
		{
			if(!layout[5][2][2].includes(color))
			{
				if(layout[0][2][2].includes(color))
					arr = ["D"];
				else
					arr = ["D'"];
			}
			else if(layout[5][2][2].includes(color2) && layout[5][2][2].includes(color3))
			{
				let type = 0;
				if(layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][2][0] == layout[1][1][1][0] && 
				(layout[5][1][0][0] != layout[5][1][1][0] || layout[0][1][2][0] != layout[0][1][1][0]))
				{
					arr = ["E"];
					type = 1;
				}
				
				if(layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][2][0] == layout[1][1][1][0] && 
				(layout[1][1][0][0] != layout[1][1][1][0] || layout[4][1][2][0] != layout[4][1][1][0]))
				{
					arr = ["E'"]
					type = 2;
				}
				
				if(layout[5][2][2][0] == color)
				{
					if(layout[1][2][1][0] == layout[1][2][2][0] && layout[3][1][2][0] == layout[3][2][2][0])
						arr.push("D'", "R'", "D", "R");
					else if(layout[1][2][2][0] == layout[0][2][1][0] && layout[3][2][2][0] == layout[3][1][0][0])
						changeArr("D R' D2 R D2 R' D R");
					else if (layout[1][2][2][0] == layout[3][2][1][0] && layout[3][2][2][0] == layout[5][2][1][0])
						changeArr("D' F D' F' D F D F'")
					else if(layout[1][2][2][0] == layout[5][2][1][0] && layout[3][2][2][0] == layout[3][2][1][0])
						changeArr("F D' F' D2 R' D' R")
					else if(layout[1][2][2][0] == layout[4][2][1][0] && layout[3][2][2][0] == layout[3][0][1][0])
						changeArr("D R' D' R D2 R' D R")
					else if(layout[1][2][2][0] == layout[3][1][2][0] && layout[3][2][2][0] == layout[1][2][1][0])
						changeArr("D R' D2 R D' F D F'");
					else if(layout[5][1][2][0] == layout[1][1][1][0] && layout[5][1][1][0] == layout[1][1][2][0])
						changeArr("D2 R' D' R D F D' F'");
					else if(layout[1][2][2][0] == layout[1][1][0][0] && layout[3][2][2][0] == layout[4][1][2][0])
						changeArr("D'B' D' B F D' F");
					else if(layout[1][2][2][0] == layout[3][0][1][0] && layout[3][2][2][0] == layout[4][2][1][0])
						changeArr("D' F D F' D F D F'");
					else if(layout[1][2][2][0] == layout[0][1][2][0] && layout[3][2][2][0] == layout[5][1][0][0])
						changeArr("D F' D' F D2 F D' F'");
					else
						arr.push("F", "D", "F'");
				}
				else if(layout[1][2][2][0] == color)
				{
					if(layout[5][2][2][0] == layout[5][2][1][0] && layout[3][2][1][0] == layout[3][2][2][0])
						arr.push("D", "F", "D'", "F'");
					else if(layout[5][2][2][0] == layout[4][2][1][0] && layout[3][2][2][0] == layout[3][0][1][0])
						changeArr("D' F D2 F' D2 F D' F'");
					else if(layout[5][2][2][0] == layout[3][1][2][0] && layout[3][2][2][0] == layout[1][2][1][0])
						arr.push("D", "R'", "D" ,"R" ,"D'", "R'" ,"D'", "R");
					else if(layout[5][2][2][0] == layout[1][2][1][0] && layout[3][2][2][0] == layout[3][1][2][0])
						changeArr("R' D R D2 F D F'");
					else if(layout[5][2][2][0] == layout[0][2][1][0] && layout[3][2][2][0] == layout[3][1][0][0])
						changeArr("D' F D F' D2 F D' F'");
					else if(layout[5][2][2][0] == layout[3][2][1][0] && layout[3][2][2][0] == layout[5][2][1][0])
						changeArr("D' F D2 F' D R' D' R");
					else if(layout[5][1][2][0] == layout[1][1][1][0] && layout[5][1][1][0] == layout[1][1][2][0])
						changeArr("D2 F D F' D' R' D R");
					else if(layout[5][2][2][0] == layout[5][1][0][0] && layout[3][2][2][0] == layout[0][1][2][0])
						changeArr("D L D L' R' D R");
					else if(layout[5][2][2][0] == layout[3][1][0][0] && layout[3][2][2][0] == layout[0][2][1][0])
						changeArr("D' F D' F' D R' D' R");
					else if(layout[5][2][2][0] == layout[4][1][2][0] && layout[3][2][2][0] == layout[1][1][0][0])
						changeArr("D' R D R' D2 R' D R");
					else
						arr.push("R'", "D'", "R");
				}
				else
				{
					if(layout[5][2][2][0] == layout[1][2][1][0] && layout[1][2][2][0] == layout[3][1][2][0])
						changeArr("R' D2 R D R' D' R");
					else if(layout[5][2][2][0] == layout[3][2][1][0] && layout[1][2][2][0] == layout[5][2][1][0])
						changeArr("F D2 F' D' F D F'");
					else if(layout[5][2][2][0] == layout[3][1][2][0] && layout[1][2][2][0] == layout[1][2][1][0])
						changeArr("R' D' R D' R' D' R D2 F D' F'")
					else if(layout[5][2][2][0] == layout[5][2][1][0] && layout[1][2][2][0] == layout[3][2][1][0])
						changeArr("R' D' R D2 R' D' R D R' D' R")
					else if(layout[5][2][2][0] == layout[3][0][1][0] && layout[1][2][2][0] == layout[4][2][1][0])
						changeArr("D2 F D F' D F D' F'");
					else if(layout[5][2][2][0] == layout[4][2][1][0] && layout[1][2][2][0] == layout[3][0][1][0])
						changeArr("D' R' D2 R D' R' D R");
					else if(layout[5][2][2][0] == layout[0][2][1][0] && layout[1][2][2][0] == layout[3][1][0][0])
						changeArr("D2 R' D' R D' R' D R");
					else if(layout[5][2][2][0] == layout[3][1][0][0] && layout[1][2][2][0] == layout[0][2][1][0])
						changeArr("D F D2 F' D F D' F'")
					else if(layout[5][2][2][0] == layout[5][1][0][0] && layout[1][2][2][0] == layout[0][1][2][0])
						changeArr("L' F L F' D2 R' D' R")
					else if(layout[5][2][2][0] == layout[0][1][2][0] && layout[1][2][2][0] == layout[5][1][0][0] && layout[2][2][0][0] != color)
						changeArr("D' M' F2 M");
					else if(layout[5][1][2][0] == layout[1][1][1][0] && layout[5][1][1][0] == layout[1][1][2][0] && layout[2][2][0][0] != color)
						arr.push("R'", "D", "R", "F", "D", "D", "F'");
					else if(layout[5][2][2][0] == layout[1][1][0][0] && layout[1][2][2][0] == layout[4][1][2][0] && layout[2][0][2][0] != color)
						changeArr("D S' R2 S");
					else if(layout[5][2][2][0] == layout[4][1][2][0] && layout[1][2][2][0] == layout[1][1][0][0] && layout[2][0][2][0] != color)
						changeArr("B R' B' R D2 F D F'");
					else
						arr.push("R'", "D", "R", "F", "D", "D", "F'");
				}
				if(type == 1)
					arr.push("E'");
				if(type == 2)
					arr.push("E");
					
			}
			else
			{
				if(layout[5][2][2].includes(layout[0][1][1][0]) && layout[5][2][2].includes(layout[5][1][1][0]))
					arr = ["Uw'"];
				else
					arr = ["Uw"];
			}
		}
		else
		{
			if(layout[5][0][2].includes(color2) && layout[5][0][2].includes(color3) && layout[5][0][2].includes(color))
			{
				if(layout[5][0][0].includes(color2) && layout[5][0][0].includes(color3) && layout[5][0][0].includes(color))
					arr = ["Uw'"];
				else
					arr = ["Uw"];
			}
			else
				arr = ["R'", "D'", "R"];
		}
		multipleCross2(0);
	}
	else if(layout[2][0][0][0] != color || layout[2][0][2][0] != color || layout[2][2][0][0] != color || layout[2][2][2][0] != color && saystep < 9){
		document.getElementById("step").innerHTML = "Orienting Corners";
		document.getElementById("fraction").innerHTML = "8/15";
		saystep = 8;
		arr = [];
		if(layout[2][2][2][0] == color)
		{
			if(layout[2][2][0][0] != color)
				arr = ["Uw'"];
			else
				arr = ["Uw"];
		}
		else
		{
			if(layout[1][0][2][0] == color) //Color on right
			{
				colorTwo = layout[2][2][2][0];
				colorThree = layout[5][0][2][0];
				if(cornerF2L() == true)
				{
					console.log("true " + cornerF2L() + " " + colorTwo + " " + colorThree);
					if(layout[5][2][1].includes(colorTwo) && layout[5][2][1].includes(colorThree))
					{
						if(layout[5][2][1][0] == layout[5][0][2][0])
							changeArr("D R' D' R D R' D' R")
						else
							changeArr("R' D' R D2 F D' F'");
					}
					else
					{
						if(layout[0][2][1].includes(colorTwo) && layout[0][2][1].includes(colorThree))
							arr = ["D"];
						else
							arr = ["D'"];
					}
				}
				else
					changeArr("F D' F' R' D' R");
			}
			else //color on front
			{
				colorTwo = layout[2][2][2][0];
				colorThree = layout[1][0][2][0];
				if(cornerF2L() == true)
				{
					console.log("true " + cornerF2L() + " " + colorTwo + " " + colorThree);
					if(layout[5][2][1].includes(colorTwo) && layout[5][2][1].includes(colorThree))
					{
						if(layout[5][2][1][0] == layout[2][2][2][0])
							changeArr("D R' D R D' R' D R");
						else
							changeArr("F D F' D' F D F'");
					}
					else
					{
						if(layout[0][2][1].includes(colorTwo) && layout[0][2][1].includes(colorThree))
							arr = ["D"];
						else
							arr = ["D'"];
					}
				}
				else
				changeArr("R' D R F D F'");
			}
		}
		multipleCross2(0);
	}
	else if(layout[5][0][1][0] != layout[5][1][1][0])
	{
		document.getElementById("step").innerHTML = "Adjusting Upper Face (AUF)";
		document.getElementById("fraction").innerHTML = "9/15";
		saystep = 10;
		if(layout[5][0][1][0] == layout[0][1][1][0])
			arr = ["U"];
		else
			arr = ["U'"];
		multipleCross2(0);
	}
	else if(!( layout[5][1][0][0] == layout[5][1][1][0] && layout[5][1][1][0] == layout[5][1][2][0]
			&&layout[4][1][0][0] == layout[4][1][1][0] && layout[4][1][1][0] == layout[4][1][2][0]  
			&& layout[0][1][0][0] == layout[0][1][1][0] && layout[0][1][1][0] == layout[0][1][2][0]
			&& layout[1][1][0][0] == layout[1][1][1][0] && layout[1][1][1][0] == layout[1][1][2][0]) && saystep < 12)
	{
		document.getElementById("step").innerHTML = "Solving middle layer";
		document.getElementById("fraction").innerHTML = "10/15";
		saystep = 11;
		arr = [];
		console.log("sdfds " + (layout[3][0][1].includes(opposite[color]) && layout[3][1][0].includes(opposite[color]) && 
			layout[3][1][2].includes(opposite[color]) && layout[3][2][1].includes(opposite[color])));
			
		if(!(layout[3][0][1].includes(opposite[color]) && layout[3][1][0].includes(opposite[color]) && 
			layout[3][1][2].includes(opposite[color]) && layout[3][2][1].includes(opposite[color])))
		{
			if(layout[5][2][1].includes(opposite[color]))
			{
				if(!layout[0][2][1].includes(opposite[color]))
					arr = ["D"];
				else
					arr = ["D'"];
			}
			else
			{
				if(layout[5][2][1][0] != layout[5][1][1][0])
				{
					if(layout[0][1][1][0] == layout[5][2][1][0])
						arr = ["Uw'"];
					else
						arr = ["Uw"];
				}	
				else if(layout[5][2][1][5] == layout[0][1][1][0])
				{
					changeArr("D L D L' D' F' D' F");
				}
				else
				{
					changeArr("D' R' D' R D F D F'")
				}
			}
		}
		else
		{
			console.log("esfw" + layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][0][0] == layout[1][1][1][0]);
			if(layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][2][0] == layout[1][1][1][0])
			{
				arr = ["Uw"];
			}
			else
			{
				changeArr("R' D' R D F D F'");
			}
		}
		multipleCross2(0);
	}
	else if(!isSolved())
	{
		color = opposite[color];
		stepThree(color);
	}
	else
	{
		document.getElementById("step").innerHTML = "";
		document.getElementById("fraction").innerHTML = "";
		document.getElementById("stepbig").innerHTML = "";
		timer.stop();
		canMan = true;
		saystep = 0;
	}
  }
  function stepThree()
  {
	  if(isSolved())
	  {
		  document.getElementById("stepbig").innerHTML = "";
		  document.getElementById("step").innerHTML = "";
		  document.getElementById("fraction").innerHTML = "";
		  timer.stop();
		  saystep = 0;
		  canMan = true;
		  return;
	  }
	  console.log(color + " " + layout[2][1][1][0]);
	  if(layout[2][1][1][0] != color)
	  {
		  document.getElementById("step").innerHTML = "And we go upside-down!";
		  document.getElementById("fraction").innerHTML = "11/15";
		  arr = ["x", "x"];
		  multipleCross3(0);
	  }
	  else if(!(layout[2][0][1][0] == color && layout[2][1][0][0] == color && layout[2][1][2][0] == color) && saystep < 14)
	  {
		  document.getElementById("step").innerHTML = "Bottom Cross";
		  document.getElementById("fraction").innerHTML = "12/15";
		  saystep = 13;
		  arr = [];
		  if(layout[2][1][0][0] == color && layout[2][1][2][0] == color)
		  {
			  changeArr("F R U R' U' F'");
		  }
		  else if(layout[2][0][1][0] == color && layout[2][1][0][0] == color)
		  {
			  changeArr("F U R U' R' F'");
		  }
		  else if(layout[2][2][1][0] == color && layout[2][1][2][0] == color)
		  {
			  changeArr("f R U R' U' f'");
		  }
		  else if(layout[2][0][1][0] != color && layout[2][1][0][0] != color && layout[2][1][2][0] != color)
		  {
			  changeArr("F R U R' U' S R U R' U' Fw'");
		  }
		  else{
			  arr = ["U'"];
		  }
		  multipleCross3(0);
	  }
	  else if(layout[2][0][0][0] != color || layout[2][0][2][0] != color || layout[2][2][0][0] != color || layout[2][2][2][0] != color && saystep < 15)
	  {
		  document.getElementById("step").innerHTML = "Bottom Corners";
		  document.getElementById("fraction").innerHTML = "13/15";
		  saystep = 14;
		  arr = [];
		  if(cornerOLL() == 0){
			  if(layout[0][0][0][0] == color && layout[0][0][2][0] == color)
			  {
				  if(layout[5][0][2][0] == color)
					  changeArr("R U2 R2 U' R2 U' R2 U2 R");
				  else
					  changeArr("R U R' U R U' R' U R U2 R'");
			  }
			  else
				  arr = ["U'"]
		  }
		  else if(cornerOLL() == 1){
			  if(layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				  changeArr("L' U' L U' L' U2 L");
			  else if(layout[2][2][0][0] == color && layout[5][0][2][0] == color)
				  changeArr("R U R' U R U2 R'");
			  else
				  arr = ["U'"];
		  }else{
			  if(layout[2][0][0][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				  changeArr("F R' F' r U R U' r'");
			  else if(layout[2][0][0][0] == color && layout[2][0][2][0] == color && layout[5][0][2][0] == color)
				  changeArr("R2 D R' U2 R D' R' U2 R'");
			  else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				  changeArr("r U R' U' r' F R F'");
			  else
				  arr = ["U'"];
		  }
		  multipleCross3(0);
	  }
	  else if(!(layout[0][0][0][0] == layout[0][0][2][0] && layout[5][0][0][0] == layout[5][0][2][0]) && saystep <16)
	  {
		document.getElementById("step").innerHTML = "Permutation of the Last Layer (PLL)";
		document.getElementById("fraction").innerHTML = "14/15";
		saystep = 15;
		arr = [];
		if(layout[0][0][0][0] == layout[0][0][2][0])
		{
			if(layout[5][0][0][0] == layout[5][0][1][0] && opposite[layout[0][0][1][0]] == layout[0][0][2][0]) //T
				changeArr("R U R' U' R' F R2 U' R' U' R U R' F'")
			else if(layout[5][0][1][0] == layout[5][0][2][0] && layout[1][0][2][0] == layout[1][0][1][0]) //Aa
				changeArr("x L2 D2 L' U' L D2 L' U L' x'");
			else if(layout[1][0][0][0] == layout[1][0][1][0] && layout[4][0][2][0] == layout[4][0][1][0]) //Ab
				changeArr("x' L2 D2 L U L' D2 L U' L x")
			else if(layout[0][0][1][0] == layout[0][0][2][0] && layout[5][0][0][0] == layout[5][0][1][0]) //Ja
				changeArr("x R2 F R F' R U2 r' U r U2 x'")
			else if(layout[0][0][1][0] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][1][0]) //F
				changeArr("R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R");
			else if(layout[0][0][1][0] == layout[5][0][0][0] && layout[0][0][2][0] == layout[5][0][1][0]) //Rb
				changeArr("R2 F R U R U' R' F' R U2 R' U2 R")
			else if(layout[5][0][0][0] == layout[5][0][1][0]) //Ra
				changeArr("R U' R' U' R U R D R' U' R D' R' U2 R'");
			else if(layout[0][0][1][0] == layout[0][0][2][0] && layout[5][0][1][0] == layout[5][0][2][0]) //Jb
				changeArr("R U R' F' R U R' U' R' F R2 U' R'"); 
			else if(layout[5][0][1][0] == layout[5][0][2][0]) //Ga
				changeArr("R2 U R' U R' U' R U' R2 U' D R' U R D'");
			else if(opposite[layout[0][0][1][0]] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][1][0]) //Gb
				changeArr("R' U' R U D' R2 U R' U R U' R U' R2 D");
			else if(opposite[layout[0][0][1][0]] == layout[0][0][2][0]) //Gd
				changeArr("R U R' U' D R2 U' R U' R' U R' U R2 D'");
			else
				changeArr("R2 U' R U' R U R' U R2 U D' R U' R' D"); //Gc
		}
		else if(opposite[layout[0][0][0][0]] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][2][0])
		{
			if(layout[5][0][0][0] == layout[5][0][1][0] && layout[0][0][1][0] == layout[0][0][2][0]) //V
				changeArr("R' U R' U' y R' F' R2 U' R' U R' F R F");
			else if(layout[5][0][0][0] == layout[5][0][1][0] && layout[1][0][0][0] == layout [1][0][1][0]) //Y
				changeArr("F R U' R' U' R U R' F' R U R' U' R' F R F' U");
			else if(layout[5][0][0][0] == layout[5][0][1][0] && layout[0][0][0][0] == layout[0][0][1][0]) //Nb
				changeArr("R' U R U' R' F' U' F R U R' F R' F' R U' R");
			else if(layout[5][0][1][0] == layout[5][0][2][0] && layout[0][0][1][0] == layout[0][0][2][0]) //Na
				changeArr("z U R' D R2 U' R D' U R' D R2 U' R D' z'")
			else if(layout[5][0][0][0] != layout[5][0][1][0] && layout[5][0][2][0] != layout[5][0][1][0]
			&& layout[4][0][0][0] != layout[4][0][1][0] && layout[4][0][2][0] != layout[4][0][1][0] && layout[5][0][0][0] == layout[0][0][1][0])
				changeArr("x' L' U L D' L' U' L D L' U' L D' L' U L D x"); //E
			else
				arr = ["U'"];
		}
		else
		{
			if(layout[5][0][0][0] == layout[5][0][2][0])
				arr = ["U"];
			else
				arr = ["U'"];
		}
		multipleCross3(0);
	  }
	  else if(correctPFL() < 3)
	  {
		 document.getElementById("step").innerHTML = "Permutation of the Last Layer (PLL)";
		document.getElementById("fraction").innerHTML = "14/15";
		arr = [];
		if(correctPFL() == 0)
		{
			console.log("fddf " + layout[5][0][1][0] + " " + layout[1][0][2][0])
			if(opposite[layout[5][0][1][0]] == layout[5][0][0][0])
			{
				changeArr("M2 U' M2 U2 M2 U' M2")
			}
			else if(layout[5][0][1][0] == layout[1][0][2][0])
			{
				changeArr("M' U' M2 U' M2 U' M' U2 M2")
			}
			else
				arr = ["U'"];
		}
		if(correctPFL() == 1)
		{
			if(layout[4][0][1][0] == layout[4][0][2][0])
			{
				if(layout[5][0][1][0] == layout[0][0][2][0])
					changeArr("M2 U' M U2 M' U' M2");
				else
					changeArr("M2 U M U2 M' U M2");
			}
			else
			{
				if(layout[0][0][0][0] == layout[0][0][1][0])
					arr = ["U"];
				else
					arr = ["U'"];
			}
		}
		multipleCross3(0);
	}
	else if(layout[5][0][1][0] != layout[5][1][1][0])
	{
		document.getElementById("step").innerHTML = "Adjusting Upper Face (AUF)";
		document.getElementById("fraction").innerHTML = "15/15";
		if(layout[5][0][1][0] == layout[0][1][1][0])
			arr = ["U"];
		else
			arr = ["U'"];
		multipleCross3(0);
	}
	else
	{
		document.getElementById("step").innerHTML = "";
		document.getElementById("fraction").innerHTML = "";
		document.getElementById("stepbig").innerHTML = "";
		timer.stop();
		saystep = 0;
		canMan = true;
	}
  }
  function multipleCross3(nb) {
	setLayout();
    if (nb < arr.length) {
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		let secs = 375-SPEED*225;
		if(secs < 20)
			secs = 20;
		setTimeout(multipleCross3.bind(null, nb + 1), secs);
    }
	else
	{
		//sleep(1000);
		setLayout();
		stepThree();
		console.log("done");
	}
  }
  function multipleCross2(nb) {
	setLayout();
    if (nb < arr.length) {
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		let secs = 375-SPEED*225;
		if(secs < 20)
			secs = 20;
		setTimeout(multipleCross2.bind(null, nb + 1), secs);
    }
	else
	{
		//sleep(1000);
		setLayout();
		stepTwo();
		console.log("done");
	}
  }
  function multipleCross(nb) {
	setLayout();
    if (crossColor() == "nope") {
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		let secs = 375-SPEED*225;
		if(secs < 20)
			secs = 20;
		setTimeout(multipleCross.bind(null, nb + 1), secs);
    }
	else
	{
		//sleep(1000);
		console.log("Calling step 2");
		stepTwo();
		console.log("done");
	}
  }
  function crossColor(){
	  let max = 0;
	  let maxpos = 2;
	  let maxcolor = layout[2][1][1][0];
	  let cnt = [];
	  for(let i = 2;; i++)
	  {
		let total = 0;
		let curcolor = layout[i][1][1][0];
		if(layout[i][0][1][0] == curcolor) total++;
		if(layout[i][1][0][0] == curcolor) total++;
		if(layout[i][1][2][0] == curcolor) total++;
		if(layout[i][2][1][0] == curcolor) total++;
		
		if(total > max)
		{
			max = total;
			maxpos = i;
			maxcolor = curcolor;
		}
		  if(i == 5)
			  i = 0;
		  if(i == 1)
			  break;
	  }
	  return [maxpos, maxcolor, max];
  }
  function correctPFL() //Permutation of the First Layer, assuming all headlights
  {
	  let cnt = 0;
	  if(layout[0][0][1][0] == layout[0][0][2][0]) cnt++;
	  if(layout[1][0][1][0] == layout[1][0][2][0]) cnt++;
	  if(layout[4][0][1][0] == layout[4][0][2][0]) cnt++;
	  if(layout[5][0][1][0] == layout[5][0][2][0]) cnt++;
	  return cnt;
  }
  function numPFL()
  {
	  let cnt = 0;
	  if(layout[0][0][1][0] == layout[0][1][1][0]) cnt++;
	  if(layout[1][0][1][0] == layout[1][1][1][0]) cnt++;
	  if(layout[4][0][1][0] == layout[4][1][1][0]) cnt++;
	  if(layout[5][0][1][0] == layout[5][1][1][0]) cnt++;
	  return cnt;
  }
  function cornerPFL(){
	  let cnt = 1;
	  if(layout[5][0][2].includes(color) && layout[5][0][2].includes(layout[5][0][1][0]) && layout[5][0][2].includes(layout[1][0][1][0]))
		  cnt*=2;
	  if(layout[5][0][0].includes(color) && layout[5][0][0].includes(layout[5][0][1][0]) && layout[5][0][0].includes(layout[0][0][1][0]))
		  cnt*=3;
	  if(layout[2][0][0].includes(color) && layout[2][0][0].includes(layout[0][0][1][0]) && layout[2][0][0].includes(layout[4][0][1][0]))
		  cnt*=5;
	  if(layout[2][0][2].includes(color) && layout[2][0][2].includes(layout[1][0][1][0]) && layout[2][0][2].includes(layout[4][0][1][0]))
		  cnt*=7;
	  return cnt;
  }
  function cornerOLL(){
	  let cnt = 0;
	  if(layout[2][0][0][0] == layout[2][1][1][0])cnt++;
	  if(layout[2][0][2][0] == layout[2][1][1][0])cnt++;
	  if(layout[2][2][0][0] == layout[2][1][1][0])cnt++;
	  if(layout[2][2][2][0] == layout[2][1][1][0])cnt++;
	  return cnt;
  }
  function cornerF2L(){
	  let cnt = 0;
	  if(layout[3][0][1].includes(colorTwo) && layout[3][0][1].includes(colorThree)) return true;
	  if(layout[3][1][0].includes(colorTwo) && layout[3][1][0].includes(colorThree)) return true;
	  if(layout[3][1][2].includes(colorTwo) && layout[3][1][2].includes(colorThree)) return true;
	  if(layout[3][2][1].includes(colorTwo) && layout[3][2][1].includes(colorThree)) return true;
	  return false;
  }
  function setLayout(){
	  //nora
	let cnt = 0;
	let temp = [];
	//left, right, top, bottom, back, front
	let axis = ["z", "z", "x", "x", "y", "y"];
	let row = [-50, 50, -50, 50, -50, 50];
	let pos = ["back", "front", "right", "left", "bottom", "top"];
	for(let h = 0; h < row.length; h++)
	{
		for(let i = 0; i < 27; i++)
		{
			if(CUBE[i][axis[h]] == row[h])
				temp.push(i);
		}
		let temp2 = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
		for(let i = 0; i < 9; i++)
		{
			let temp3 = CUBE[temp[i]];
			//console.log((temp3.x*0.02+1) + " " + (temp3.y*0.02+1));
			let array = [];
			if(axis[h] == "z")
				temp2[temp3.x*0.02+1][temp3.y*0.02+1] = temp[i];
			if(axis[h] == "x")
				temp2[temp3.y*0.02+1][temp3.z*0.02+1] = temp[i];
			if(axis[h] == "y")
				temp2[temp3.x*0.02+1][temp3.z*0.02+1] = temp[i];
		}
		
		for(let x = 0; x < 3; x++) 
		{
			for(let y = 0; y < 3; y++)
			{
				if(temp2[x][y] > 9)
					layout[h][x][y] = getColor(CUBE[temp2[x][y]][pos[h]].levels) + " " + temp2[x][y];
				else
					layout[h][x][y] = getColor(CUBE[temp2[x][y]][pos[h]].levels) + " 0" + temp2[x][y];
			}
		}
		temp = [];
	}
	for(let i = 0; i < 6; i++)
	{
		for(let x = 0; x < 3; x++)
		{
			for(let y = 0; y < 3; y++)
			{
				let cubynum = +(layout[i][x][y][2] + layout[i][x][y][3]);	
				//console.log(cubynum + " " + layout[i][x][y][0]);
				if(!cubyColors[cubynum].includes(layout[i][x][y][0]))
					cubyColors[cubynum].push(layout[i][x][y][0]);
			}
		}
	}
	for(let i = 0; i < 6; i++)
	{
		for(let x = 0; x < 3; x++)
		{
			for(let y = 0; y < 3; y++)
			{
				let cubynum = +(layout[i][x][y][2] + layout[i][x][y][3]);	
				let temp2 = cubyColors[cubynum];
				for(let j = 0; j < temp2.length; j++)
				{
					if(!layout[i][x][y].includes(temp2[j]))
					{
						layout[i][x][y] += (" " + temp2[j]);
					}
				}
			}
		}
	}
  }
  function getColor(color)
  {
	  if(color[0] == 250)
		  return "w";
	  if(color[1] == 18)
		  return "r";
	  if(color[2] == 219)
		  return "b";
	  if(color[1] == 125)
		  return "o";
	  if(color[0] == 209)
		  return "y";
	  return "g";
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
  function isSolved()
  {
	  //console.log("called");
	  for(let i = 0; i < 6; i++)
	  {
		 let curcolor = layout[i][0][0][0]; 
		 for(let x = 0; x < 3; x++)
		 {
			for(let y = 0; y < 3; y++)
			{
				//console.log(layout[i][x][y][0]+ " " + curcolor);
				if(layout[i][x][y][0] != curcolor) return false; 
			}
		 }			 
	  }
	  //console.log("solved");
	  return true;
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