import './lib/p5.easycam.js';
import Picker from './picker.js';
import Cuby from './cuby.js';
//Thanks to Antoine Gaubert
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
  let DELAY_SLIDER;
  let inp;
  let MODE = "normal";
  let SPEED = 0.01;
  let DELAY = 0;
  let shufflespeed = 5;
  let easystep = 0;
  let medstep = 0;
  let pllstep = 0;
  let BACKGROUND_COLOR = 230; //p.color(201, 255, 218);
  let arr = [];
  let obj2 = [];
  fetch('src/PLL.json')
	.then((response) => response.json())
	.then((obj) => (setPLL(obj)));
  let canMan = true;
  let shuffleNB;
  let undo = [];
  let redo = [];
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
  let selectedCuby = -1;
  let selectedColor = [];
  let dev = 0;
  let color = "lol";
  let colorTwo = "lmao";
  let colorThree = "lmaoliest";
  let cubyColors = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  let saystep = 0;
  let moves = 0;
  let ao5 = [];
  let mo5 = [];
  let movesarr = [];
  let flipmode = 0;
  let flipmode2 = 0;
  let flipper = [];
  defineFlipper();
  let flipper2 = [];
  defineFlipper2();
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
		return;
      //return console.error('Timer is already running');
    }

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop () {
    if (!this.isRunning) {
		return;
      //return console.error('Timer is already stopped');
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
  p.setup = () => {
	let cnv_div = document.getElementById("cnv_div");
    p.createCanvas(DEBUG ? p.windowWidth / 2 : cnv_div.offsetWidth, p.windowHeight*0.9, p.WEBGL);
    p.pixelDensity(1);
    p.frameRate(60);
    p.smooth();

    PICKER = new Picker(p, DEBUG);
    CAM = p.createEasyCam(p._renderer);
    CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
	CAM.zoom(-150);
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
	
	DELAY_SLIDER = p.createSlider(0, 2, 0, 0.1);
    DELAY_SLIDER.input(sliderUpdate);
	DELAY_SLIDER.parent("delay");
	DELAY_SLIDER.style('width', '100px');
	}
    const REGULAR = p.createButton('Normal Mode');
	REGULAR.parent("mode").class("mode1");
	REGULAR.style("height:60px; width:180px; text-align:center; font-size:20px;")
    REGULAR.mousePressed(regular.bind(null, 0));
	
	const SPEEDMODE = p.createButton('Speed Mode');
	SPEEDMODE.parent("mode2").class("mode1");
	SPEEDMODE.style("height:60px; width:180px; text-align:center; font-size:20px;")
    SPEEDMODE.mousePressed(speedmode.bind(null, 0));
	
    const SHUFFLE_BTN = p.createButton('Scramble');
	SHUFFLE_BTN.parent("shuffle_div");
    SHUFFLE_BTN.mousePressed(shuffleCube.bind(null, 0));
	
	const RESET = p.createButton('Reset');
	RESET.parent("reset_div");
    RESET.mousePressed(reSetup.bind(null, 0));
	
	const UNDO = p.createButton('Undo');
	UNDO.parent("undo");
    UNDO.mousePressed(Undo.bind(null, 0));
	
	const REDO = p.createButton('Redo');
	REDO.parent("redo");
    REDO.mousePressed(Redo.bind(null, 0));
	
	const SOLVE = p.createButton('Auto-Solve');
	SOLVE.parent("solve");
    SOLVE.mousePressed(solveCube.bind(null, 0));
	
	const EASY = p.createButton('Easy');
	EASY.style("height:60px; width:180px; text-align:center; font-size:20px;")
	EASY.parent("s_easy");
    EASY.mousePressed(easy.bind(null, 0));
	
	const MED = p.createButton('Medium');
	MED.style("height:60px; width:180px; text-align:center; font-size:20px;")
	MED.parent("s_medium");
    MED.mousePressed(medium.bind(null, 0));
	
	const PLL = p.createButton('PLL Practice');
	PLL.style("height:60px; width:180px; text-align:center; font-size:20px;")
	PLL.parent("s_PLL");
    PLL.mousePressed(speedPLL.bind(null, 0));
	
	inp = p.createInput('');
	inp.parent("test_alg_div");
	inp.size(150);
	
    const GO_BTN = p.createButton('Go!');
	GO_BTN.parent("test_alg_div");
	GO_BTN.mousePressed(testAlg.bind(null, 0));	
  }
setInterval(() => {
  const timeInSeconds = Math.round(timer.getTime() / 100)/10.0;
  document.getElementById('time').innerText = timeInSeconds;
  document.getElementById('moves').innerText = moves;
  document.getElementById('speed').innerText = Math.round(SPEED*100);
  document.getElementById('delay2').innerText = DELAY;
  displayAverage();
  setLayout();
  let secs = 375-SPEED*225;
  if(secs < 20)
		secs = 20;
	if(isSolved() && timer.getTime() > secs && timer.isRunning && MODE == "normal")
	{
		timer.stop();
		flipmode2 = 0;
		movesarr.push(moves);
		if(canMan == true)
		{
		if(ao5.length<5)
		{
			ao5.push(timeInSeconds);
			mo5.push(timeInSeconds);
		}
		else
		{
			ao5.push(timeInSeconds);
			mo5.push(timeInSeconds);
			ao5.shift()
		}
		}
		console.log(isSolved(), MODE);
	}
	else if(MODE == "speed")
	{
		if(isSolved() && easystep == 1)
		{
			timer.stop();
			console.log("herer")
			easystep++;
			ao5 = [Math.round(timer.getTime() / 100)/10.0];
			easy();
		}
		else if(crossColor()[2] == 4 && easystep == 3)
		{
			timer.stop();
			easystep++;
			console.log("wefg")
			ao5.push(Math.round(timer.getTime() / 100)/10.0);
			easy();
		}
		else if(easystep == 5)
		{
			for(let i = 0; i < 6; i++)
			{
				if(layout[i][1][1][0] == "g" && layout[i][0][0][0] == layout[i][0][2][0] && layout[i][0][0][0] == layout[i][2][0][0] && 
			layout[i][0][0][0] == layout[i][2][2][0])
				{
					timer.stop();
					ao5.push(Math.round(timer.getTime() / 100)/10.0);
					easystep++;
					easy();
				}	
			}
		}
		else if(easystep == 7)
		{
			if(twoLines())
			{
				timer.stop();
				ao5.push(Math.round(timer.getTime() / 100)/10.0);
				easystep++;
				easy();
			}
		}
		else if(medstep == 1 && mostSolved() == 9 || medstep == 3 && isSolved() || medstep == 5 && oppositeCross() || medstep == 7 && twobytwo() >= 3)
		{
			timer.stop();
			if(ao5 == 0)
				ao5 = [Math.round(timer.getTime() / 100)/10.0];
			else
				ao5.push(Math.round(timer.getTime() / 100)/10.0);
			medstep++;
			medium();
		}
		else if(isSolved() && pllstep % 2 == 1)
		{
			timer.stop();
			if(ao5 == 0)
				ao5 = [Math.round(timer.getTime() / 100)/10.0];
			else
				ao5.push(Math.round(timer.getTime() / 100)/10.0);
			console.log("you", ao5);
			pllstep++;
			speedPLL();
		}
		
	}
}, 100)
  function reSetup() {
	
    CUBE = {};
	arr = [];
	flipmode = 0;
	flipmode2 = 0;
	easystep = 0;
	medstep = 0;
	pllstep = 0;
	CAM = p.createEasyCam(p._renderer);
    CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
	CAM.zoom(-150);
    CAM.rotateX(-p.PI / 2.7);
    CAM.rotateY(-p.PI / 7);
    CAM.rotateZ(-p.PI / 2);
	//undo = [];
	//redo = [];
	moves = 0;
	timer.stop();
	timer.reset();
	shufflespeed = 5;
    RND_COLORS = genRndColors();
	document.getElementById("step").innerHTML = "";
	document.getElementById("stepbig").innerHTML = "";
	document.getElementById("fraction").innerHTML = "";
	document.getElementById("s_instruct").innerHTML = "";
	document.getElementById("s_easy").style.display = "none";
	document.getElementById("s_medium").style.display = "none";
	document.getElementById("s_PLL").style.display = "none";
    let cnt = 0;

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        for (let k = 0; k < SIZE; k++) {
          let offset = ((SIZE - 1) * (CUBYESIZE + GAP)) * 0.5;
          let x = (CUBYESIZE + GAP) * i - offset;
          let y = (CUBYESIZE + GAP) * j - offset;
          let z = (CUBYESIZE + GAP) * k - offset;
		  if(x == -2)
		  {
			 CUBE[cnt] = new Cuby(100, x, y, z, RND_COLORS[cnt], PICKER, p, cnt);
			console.log("here");
		  }else
			CUBE[cnt] = new Cuby(CUBYESIZE, x, y, z, RND_COLORS[cnt], PICKER, p, cnt);
          cnt++;
        }
      }
    }
  }
  function quickSolve()
  {
	  CUBE = {};
	  let cnt = 0;
	  for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        for (let k = 0; k < SIZE; k++) {
          let offset = ((SIZE - 1) * (CUBYESIZE + GAP)) * 0.5;
          let x = (CUBYESIZE + GAP) * i - offset;
          let y = (CUBYESIZE + GAP) * j - offset;
          let z = (CUBYESIZE + GAP) * k - offset;
		  if(x == -2)
		  {
			 CUBE[cnt] = new Cuby(100, x, y, z, RND_COLORS[cnt], PICKER, p, cnt);
			console.log("here");
		  }else
			CUBE[cnt] = new Cuby(CUBYESIZE, x, y, z, RND_COLORS[cnt], PICKER, p, cnt);
          cnt++;
        }
      }
    }
  }
  function getPos(cubyindex)
  {
	  let piece = cubyColors[cubyindex];
	  let expectedlength = piece.length*2 + 2;
	  //console.log("expectedlength " + expectedlength, piece);
	  for(let h = 0; h < 6; h++)
	  {
		for(let x = 0; x < 3; x++)
		{
			for(let y = 0; y < 3; y++)
			{
				if(layout[h][x][y].length == expectedlength)
				{
					let total = 0;
					for(let i = 0; i < expectedlength; i++)
					{
						if(layout[h][x][y].includes(piece[i]))
							total++;
					}
					if(total == piece.length)
					{
						if(h == 0)
							return [(x-1)*50, (y-1)*50, -50];
						if(h == 1)
							return [(x-1)*50,(y-1)*50, 50];
						if(h == 2)
							return [-50,(x-1)*50, (y-1)*50];
						if(h == 3)
							return [50,(x-1)*50, (y-1)*50];
						if(h == 4)
							return [(x-1)*50, -50, (y-1)*50];
						else
							return [(x-1)*50, 50, (y-1)*50];
							
					}
				}
			}
		}
	  }
	  return "lol";
  }

  function sliderUpdate() {
    SIZE = SIZE_SLIDER.value();
    GAP = GAP_SLIDER.value();
	SPEED = SPEED_SLIDER.value();
	if(MODE == "normal")
		DELAY = DELAY_SLIDER.value();
    //reSetup();
  }
  //Henry
  function regular(){
	  DELAY = DELAY_SLIDER.value();
	  canMan = true;
	  if(MODE != "normal")
		reSetup();
	  MODE = "normal"
	  var elements = document.getElementsByClassName('normal');
	  for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='block';
	  }
	  document.getElementById("test_alg_div").style.display = "block";
	  document.getElementById("shuffle_div").style.display = "inline";
	  document.getElementById("reset_div").style.display = "inline";
	  document.getElementById("solve").style.display = "inline";
	  document.getElementById("undo").style.display = "inline";
	  document.getElementById("redo").style.display = "inline";
	  document.getElementById("speed").style.display = "inline";
	  document.getElementById("slider_div").style.display = "inline";
	  document.getElementById("outermoves").style.display = "inline";
	  document.getElementById("outertime").style.display = "inline";
	  
	  document.getElementById("s_INSTRUCT").innerHTML = "";
	  document.getElementById("s_instruct").innerHTML = "";
	  document.getElementById("s_difficulty").innerHTML = "";
	  document.getElementById("keymap").style.display = "table";
	  document.getElementById("s_easy").style.display = "none";
	  document.getElementById("s_medium").style.display = "none";
	  document.getElementById("s_PLL").style.display = "none";
	  easystep = 0;
	  medstep = 0;
	  pllstep = 0;
	  ao5 = [];
	  mo5 = [];
	  
  }
  function speedmode()
  {
	  DELAY = 0;
	  canMan = false;
	  MODE = "speed"
	  reSetup();
	  ao5 = [];
	  mo5 = [];
	  console.log("wefwefew");
	  document.getElementById("test_alg_div").style.display = "none";
	  document.getElementById("shuffle_div").style.display = "none";
	  document.getElementById("reset_div").style.display = "none";
	  document.getElementById("solve").style.display = "none";
	  document.getElementById("s_INSTRUCT").innerHTML = "Instructions for Speed Mode";
	  document.getElementById("s_instruct").innerHTML = "In one game of speed mode, there will be <b>4</b> stages, each requiring you to complete a challenge. Your score will be the time it takes to do all the tasks.";
	  document.getElementById("s_difficulty").innerHTML = "Select Difficulty/Mode";
	  var elements = document.getElementsByClassName('normal');
	  for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	  }
	  document.getElementById("s_easy").style.display = "inline";
	  document.getElementById("s_medium").style.display = "inline";
	  document.getElementById("s_PLL").style.display = "inline";
	  easystep = 0;
	  medstep = 0;
	  pllstep = 0;
	  
  }
  function showSpeed()
  {
	  DELAY = 0;
	    canMan = true;
		document.getElementById("s_difficulty").innerHTML = "";
		document.getElementById("s_easy").style.display = "none";
		document.getElementById("s_medium").style.display = "none";
		document.getElementById("s_PLL").style.display = "none";
		document.getElementById("keymap").style.display = "table";
		document.getElementById("speed").style.display = "inline";
		document.getElementById("slider_div").style.display = "inline";
		document.getElementById("outertime").style.display = "inline";
		document.getElementById("time").style.display = "inline";
		document.getElementById("times_par").style.display = "block";
  }
  function easy() 
  {
	  if(easystep == 0)
	  {
		ao5 = 0;
		quickSolve();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #1: Solve the Cube";
		document.getElementById("s_instruct").innerHTML = "Move any layer to start time, solve the cube to stop it.";
		showSpeed();
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		let rnd = p.random(possible);
		arr = [];
		arr[0] = [rnd];
		arr[1] = [rnd];
		shufflespeed = 2;
		multipleEasy(0, 0);
	  }
	  else if(easystep == 2)
	  {
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #2: Solve the Cross In Any Face";
		document.getElementById("s_instruct").innerHTML = "A cross is solved when all the edge pieces in a face match its center piece.";
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		for(let i = 0; i < 20; i++)
		{
			let rnd = p.random(possible);
			arr.push(rnd);
		}
		shufflespeed = 2;
		canMan = false;
		multipleEasy(0, 0);
	  }
	  else if(easystep == 3)
	  {
		  timer.reset();
	  }
	  else if(easystep == 4)
	  {
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #3: Same Colored Corners in the Green Face";
		document.getElementById("s_instruct").innerHTML = "This challenge is complete when all 4 corners in the green face are the same color. The green face is the face where the center piece is green.";
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		for(let i = 0; i < 20; i++)
		{
			let rnd = p.random(possible);
			arr.push(rnd);
		}
		shufflespeed = 2;
		canMan = false;
		multipleEasy(0, 0);
	  }
	  else if(easystep == 5)
	  {
		  timer.reset();
	  }
	  else if(easystep == 6)
	  {
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #4: Construct a Line of Solved Edges in Two Faces";
		document.getElementById("s_instruct").innerHTML = "Take a look at these pictures for an example:";
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		for(let i = 0; i < 20; i++)
		{
			let rnd = p.random(possible);
			arr.push(rnd);
		}
		shufflespeed = 2;
		canMan = false;
		multipleEasy(0, 0);
	  }
	  else if(easystep == 7)
	  {
		  timer.reset();
	  }
	  else if(easystep == 8)
	  {
		var elements = document.getElementsByClassName('normal');
		for(var i=0; i<elements.length; i++) { 
			elements[i].style.display='none';
		}
		let total = 0;
		for(let i = 0; i < 4; i++)
		{
			total += ao5[i];
		}
		total = Math.round(total * 10) / 10
		document.getElementById("s_INSTRUCT").innerHTML = "Congrats on completing all the challenges!";
		let grade = "F-";
		let grades = ["A++", "A+", "A", "A-", "B+", "B", "B-", "C++", "C+", "C", "C-", "D+", "D", "D-", "F"];
		let scores = [2, 3, 6, 10, 15, 25, 40, 60, 90, 120, 200, 300, 400, 500, 600];
		if(medstep == 8)
			scores = [20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200, 300, 400, 500, 600];
		if(pllstep == 8)
			scores = [9, 12, 15, 20, 30, 45, 60, 80, 100, 120, 200, 300, 400, 500, 600];
		for(let i = 0; i < grades.length; i++)
		{
			if(total <= scores[i])
			{
				grade = grades[i];
				break;
			}
		}
		document.getElementById("time").style.display = "inline";
		document.getElementById("times_par").style.display = "block";
		document.getElementById("s_instruct").innerHTML = "Your final time is " + total + " seconds, granting you a grade of a <span style = 'color: #bf2222'>" + grade + "</span> <p>Play again?</p>";
		document.getElementById("s_easy").style.display = "inline";
		document.getElementById("s_medium").style.display = "inline";
		document.getElementById("s_PLL").style.display = "inline";
		easystep = 0;
		medstep = 0;
		pllstep = 0;
		timer.reset();
	  }
	  
  }
  function medium(){ //ez
	  if(medstep == 0)
	  {
		showSpeed();
		ao5 = 0;
		quickSolve();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #1: Solve a face";
		document.getElementById("s_instruct").innerHTML = "The challenge is complete when all the pieces in a side have the same color. Move any layer to start time, solve the cube to stop it.";
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		for(let i = 0; i < 20; i++)
		{
			let rnd = p.random(possible);
			arr.push(rnd);
		}
		shufflespeed = 2;
		canMan = false;
		multipleEasy(0, 1);
	  }
	  else if(medstep == 1)
	  {
		 timer.reset();
	  }
	  else if(medstep == 2)
	  {
		timer.reset();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #2: Solve the cube";
		quickSolve();
		arr = [];
		const mess = ["M2 U' M U2 M' U' M2", "M2 U M U2 M' U M2", "M2 U M2 U2 M2 U M2", "M U M2 U M2 U M U2 M2"];
		const sugalg = [" (With solved part of last layer in the back) M2 U M U2 M' U M2",
						" (With solved part of last layer in the back) M2 U' M U2 M' U' M2",
						" (From anywhere) M2 U M2 U2 M2 U M2",
						" (Right side of the swapping pair- a pair constitutes 2 faces having the same colors- facing front) M' U M2 U M2 U M' U2 M2"];
		let rnd2 = Math.floor(Math.random()*4);
		changeArr(mess[rnd2]);
		shufflespeed = 2;
		let rnd = Math.floor(Math.random()*4);
		for(let i = 0; i < rnd; i++)
		{
			arr.push("U");
		}
		canMan = false;
		console.log("bruh", arr);
		document.getElementById("s_instruct").innerHTML = "Use your beginner last layer techniques to solve it! <p style = 'font-size:12px;'>Suggested algorithm with unsolved layer in the top: <br>" + sugalg[rnd2] +  " </p>";
		multipleEasy(0, 1);
	  }
	  else if(medstep == 4)
	  {
		timer.reset();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #3: Solve the cross in 2 opposite faces";
		document.getElementById("s_instruct").innerHTML = "A cross is solved when all the edge pieces in a face match its center piece. You need this to occur in a face and the face opposite of it.";
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		for(let i = 0; i < 20; i++)
		{
			let rnd = p.random(possible);
			arr.push(rnd);
		}
		shufflespeed = 2;
		canMan = false;
		multipleEasy(0, 1);
	  }
	  else if(medstep == 6)
	  {
		timer.reset();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #4: Construct a solved 2x2 square in 3 faces";
		document.getElementById("s_instruct").innerHTML = "A 2x2 square includes a faces' center, a corner, and two edges, and should look like a square consisting on one color.";
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		for(let i = 0; i < 20; i++)
		{
			let rnd = p.random(possible);
			arr.push(rnd);
		}
		shufflespeed = 2;
		canMan = false;
		multipleEasy(0, 1);
	  }
	  else if(medstep == 8)
	  {
		  timer.reset();
		  easystep = 8;
		  easy();
	  }
  }
  function speedPLL()
  {
	  if(pllstep % 2 == 0 && pllstep != 8)
	  {
		timer.reset();
		if(pllstep == 0)
			ao5 = 0;
		quickSolve();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #" + (pllstep/2+1) + ": Solve the Cube";
		showSpeed();
		const possible = ["Aa", "Ab", "F", "Ja", "Jb", "Ra", "Rb", "T", "Ga", "Gb", "Gc", "Gd", "E", "Na", 
		"Nb", "V", "Y", "H", "Ua", "Ub", "Z"];
		let rnd = p.random(possible);
		document.getElementById("s_instruct").innerHTML = "Move any layer to start time, solve the cube to stop it. <p style = 'font-size:12px;'>Suggested algorithm with unsolved layer in the top: <br>" + obj2[rnd][0] +  " </p>";
		
		console.log(obj2, rnd, obj2[rnd][1]);
		changeArr(obj2[rnd][1])
		shufflespeed = 2;
		let rnd2 = Math.floor(Math.random()*4);
		for(let i = 0; i < rnd2; i++)
		{
			arr.push("U");
		}
		multipleEasy(0, 2);
	  }
	  else if(pllstep == 8)
	  {
		  timer.reset();
		  easystep = 8;
		  easy();
	  }
	  
  }
  function multipleEasy(nb, dificil) {
    if (nb < arr.length) {
		canMan = false;
		shufflespeed = 2;
		moves++;
		notation(arr[nb]);
		console.log(nb, "easy", dificil);
		let secs = 20;
		setTimeout(multipleEasy.bind(null, nb + 1, dificil), secs);
    }
	else
	{
		shufflespeed = 5;
		if(dificil == 0)
		{
			easystep++;
			easy();
		}
		else if (dificil == 1){
			medstep++;
			medium();
		}
		else
		{
			pllstep++;
			speedPLL();
		}
		canMan = true;
	}
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
        tmp[i] = new Cuby(CUBYESIZE, CUBE[i].x, primes.x, primes.y, RND_COLORS[i], PICKER, p, i);
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
        tmp[i] = new Cuby(CUBYESIZE, primes.x, CUBE[i].y, primes.y, RND_COLORS[i], PICKER, p, i); // buffer theme in a new cubye
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
        tmp[i] = new Cuby(CUBYESIZE, primes.x, primes.y, CUBE[i].z, RND_COLORS[i], PICKER, p, i); // buffer theme in a new cubye
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
  function twoLines()
  {
	let testcubes = [[2, 5], [5, 3], [3, 4], [4, 2]];
	for(let i = 0; i < 4; i++)
	{
		let a = testcubes[i][0];
		let b = testcubes[i][1];
		console.log(a,b);
		if(layout[a][0][1][0] == layout[a][1][1][0] && layout[a][2][1][0] == layout[a][1][1][0])
		{
			if(layout[b][0][1][0] == layout[b][1][1][0] && layout[b][2][1][0] == layout[b][1][1][0])
			{
				return true;
			}
		}
	}  
	testcubes = [[0, 5], [5, 1], [1, 4], [4, 0]];
	for(let i = 0; i < 4; i++)
	{
		let a = testcubes[i][0];
		let b = testcubes[i][1];
		console.log(a,b);
		if(layout[a][1][0][0] == layout[a][1][1][0] && layout[a][1][2][0] == layout[a][1][1][0])
		{
			if(layout[b][1][0][0] == layout[b][1][1][0] && layout[b][1][2][0] == layout[b][1][1][0])
			{
				return true;
			}
		}
	} 
	testcubes = [[2, 1], [3, 1], [3, 0], [2, 0]];
	for(let i = 0; i < 4; i++)
	{
		let a = testcubes[i][0];
		let b = testcubes[i][1];
		console.log(a,b);
		if(layout[a][1][0][0] == layout[a][1][1][0] && layout[a][1][2][0] == layout[a][1][1][0])
		{
			if(layout[b][0][1][0] == layout[b][1][1][0] && layout[b][2][1][0] == layout[b][1][1][0])
			{
				return true;
			}
		}
	} 
	return false;
  }
  function mostSolved() //most colors solved in a side
  {
	  let max = 1;
	  for(let i = 0; i < 6; i++)
	  {
		  let keymap = [];
		  keymap['g'] = 0; keymap['r'] = 0; keymap['b'] = 0; keymap['y'] = 0; keymap['o'] = 0; keymap['w'] = 0; keymap['y'] = 0; 
		  for(let x = 0; x < 3; x++)
		  {
			  for(let y = 0; y < 3; y++)
			  {
				  let color = layout[i][x][y][0];
				  if(keymap[color] == NaN)
					 keymap[color] = 1;
				  else
					keymap[color]++;
			  }
		  }
		  for(let i in keymap)
		  {
			  if(keymap[i] > max)
				  max = keymap[i];
		  }
	  }
	  return max;
  }
  function oppositeCross() //returns true if two crosses are solved in opposite faces
  {
	  
	  for(let i = 0; i < 6; i+=2)
	  {
		let cnt = 0;
		let clr = layout[i][1][1][0];
		let clr2 = layout[i+1][1][1][0];
		if(layout[i][0][1][0] == clr && layout[i][1][0][0] == clr && layout[i][1][2][0] == clr && layout[i][2][1][0] == clr) cnt++;
		if(layout[i+1][0][1][0] == clr2 && layout[i+1][1][0][0] == clr2 && layout[i+1][1][2][0] == clr2 && layout[i+1][2][1][0] == clr2) cnt++;
		if(cnt == 2)
			return true;
	  }
	  return false;
  }
  function twobytwo() //returns the number of faces containing 2x2 squares
  {
	  let cnt = 0;
	  for(let i = 0; i < 6; i++)
	  {
		  let clr = layout[i][1][1][0];
		  if(  layout[i][0][0][0] == clr && layout[i][1][0][0] == clr && layout[i][0][1][0] == clr 
			|| layout[i][0][2][0] == clr && layout[i][0][1][0] == clr && layout[i][1][2][0] == clr
			|| layout[i][2][2][0] == clr && layout[i][2][1][0] == clr && layout[i][1][2][0] == clr
			|| layout[i][2][0][0] == clr && layout[i][2][1][0] == clr && layout[i][1][0][0] == clr)
		  {
			  cnt++;
		  }
	  }
	  return cnt;
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
      CUBE[i].selected_color = null;
    }
  }

  function getCubyByColor(arr1) {
	  for(let i = 0; i < 27; i++)
	  {
		if(JSON.stringify(arr1) == JSON.stringify(CUBE[i].colors.white.levels))
			return CUBE[i];
		if(JSON.stringify(arr1) == JSON.stringify(CUBE[i].colors.yellow.levels))
			return CUBE[i];
		if(JSON.stringify(arr1) == JSON.stringify(CUBE[i].colors.green.levels))
			return CUBE[i];
		if(JSON.stringify(arr1) == JSON.stringify(CUBE[i].colors.blue.levels))
			return CUBE[i];
		if(JSON.stringify(arr1) == JSON.stringify(CUBE[i].colors.orange.levels))
			return CUBE[i];
		if(JSON.stringify(arr1) == JSON.stringify(CUBE[i].colors.red.levels))
			return CUBE[i];
	  }
  }
  function getCubyIndexByColor2(arr1) //original
  {
	  if(JSON.stringify(arr1) == "[218,124,24,255]") return 0;
	  if(JSON.stringify(arr1) == "[218,125,24,255]") return 3;
	  if(JSON.stringify(arr1) == "[218,126,24,255]") return 6;
	  if(JSON.stringify(arr1) == "[219,124,24,255]") return 9;
	  if(JSON.stringify(arr1) == "[219,125,24,255]") return 12;
	  if(JSON.stringify(arr1) == "[219,126,24,255]") return 15;
	  if(JSON.stringify(arr1) == "[220,124,24,255]") return 18;
	  if(JSON.stringify(arr1) == "[220,125,24,255]") return 21;
	  if(JSON.stringify(arr1) == "[220,126,24,255]") return 24;
	  if(JSON.stringify(arr1) == "[249,251,249,255]") return 6;
	  if(JSON.stringify(arr1) == "[249,251,250,255]") return 7;
	  if(JSON.stringify(arr1) == "[249,251,251,255]") return 8;
	  if(JSON.stringify(arr1) == "[250,251,249,255]") return 15;
	  if(JSON.stringify(arr1) == "[250,251,250,255]") return 16;
	  if(JSON.stringify(arr1) == "[250,251,251,255]") return 17;
	  if(JSON.stringify(arr1) == "[251,251,249,255]") return 24;
	  if(JSON.stringify(arr1) == "[251,251,250,255]") return 25;
	  if(JSON.stringify(arr1) == "[251,251,251,255]") return 26;
	  if(JSON.stringify(arr1) == "[24,104,218,255]") return 0;
	  if(JSON.stringify(arr1) == "[24,104,219,255]") return 1;
	  if(JSON.stringify(arr1) == "[24,104,220,255]") return 2;
	  if(JSON.stringify(arr1) == "[24,105,218,255]") return 3;
	  if(JSON.stringify(arr1) == "[24,105,219,255]") return 4;
	  if(JSON.stringify(arr1) == "[24,105,220,255]") return 5;
	  if(JSON.stringify(arr1) == "[24,106,218,255]") return 6;
	  if(JSON.stringify(arr1) == "[24,106,219,255]") return 7;
	  if(JSON.stringify(arr1) == "[24,106,220,255]") return 8;
	  if(JSON.stringify(arr1) == "[218,26,26,255]") return 8;
	  if(JSON.stringify(arr1) == "[218,25,26,255]") return 5;
	  if(JSON.stringify(arr1) == "[218,24,26,255]") return 2;
	  if(JSON.stringify(arr1) == "[219,26,26,255]") return 17;
	  if(JSON.stringify(arr1) == "[219,25,26,255]") return 14;
	  if(JSON.stringify(arr1) == "[219,24,26,255]") return 11;
	  if(JSON.stringify(arr1) == "[220,26,26,255]") return 26;
	  if(JSON.stringify(arr1) == "[220,25,26,255]") return 23;
	  if(JSON.stringify(arr1) == "[220,24,26,255]") return 20;
	  if(JSON.stringify(arr1) == "[26,220,30,255]") return 24;
	  if(JSON.stringify(arr1) == "[26,220,31,255]") return 25;
	  if(JSON.stringify(arr1) == "[26,220,32,255]") return 26;
	  if(JSON.stringify(arr1) == "[26,219,30,255]") return 21;
	  if(JSON.stringify(arr1) == "[26,219,31,255]") return 22;
	  if(JSON.stringify(arr1) == "[26,219,32,255]") return 23;
	  if(JSON.stringify(arr1) == "[26,218,30,255]") return 18;
	  if(JSON.stringify(arr1) == "[26,218,31,255]") return 19;
	  if(JSON.stringify(arr1) == "[26,218,32,255]") return 20;
	  if(JSON.stringify(arr1) == "[208,218,26,255]") return 2;
	  if(JSON.stringify(arr1) == "[208,218,25,255]") return 1;
	  if(JSON.stringify(arr1) == "[208,218,24,255]") return 0;
	  if(JSON.stringify(arr1) == "[209,218,26,255]") return 11;
	  if(JSON.stringify(arr1) == "[209,218,25,255]") return 10;
	  if(JSON.stringify(arr1) == "[209,218,24,255]") return 9;
	  if(JSON.stringify(arr1) == "[210,218,26,255]") return 20;
	  if(JSON.stringify(arr1) == "[210,218,25,255]") return 19;
	  if(JSON.stringify(arr1) == "[210,218,24,255]") return 18;
	  //if(JSON.stringify(arr1) == "[0,0,0,255]")
	  return false;
  }

  function getActionStartCuby() {
    for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
      if (CUBE[i].is_selected) {
        return CUBE[i];
      }
    }

    return null;
  }

  function shuffleCube(nb) { 
	if(canMan == false)return;
	shufflespeed = 2;
	moves = 0;
	timer.reset();
	timer.stop();
	const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
	//const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'", "M", "M'", 
	//"E", "E'", "Lw'", "Lw'", "Uw", "Uw'", "Rw", "Rw'", "Dw", "Dw'", "Bw", "Bw'", "Fw", "Fw'"];
	arr = [];
	let bad = "";
	let total = "";
    for(let i = 0; i < 20; i++)
	{
		while(true)
		{
			let rnd = p.random(possible);
			console.log("rnd is " + rnd);
			if(rnd == bad || (arr.length>1 && rnd == arr[i-2]))
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
		if(i > 0 && arr[i] == arr[i-1])
		{
			total = total.substring(0, total.length-1);
			if(arr[i].includes("'"))
			{
				total = total.substring(0, total.length-1);
			}
			total += "2 ";
		}
		else
			total += (arr[i] + " ");
	}
	document.getElementById("scramble").innerHTML = total;
	multiple2(0);
  }
  function displayAverage()
  {
	  if(canMan == false) return;
	  let min = ao5[0];
	  let max = ao5[0];
	  let minpos = 0;
	  let maxpos = 0;
	  let display = "";
	  let displaymoves = "";
	  let actualao5 = 0;
	  let meano5 = 0; //not actually limited to 5
	  let meanmoves = 0;
	  if(ao5[ao5.length-1] == 0)
		  ao5.pop();
	  if(movesarr.length > mo5.length)
		  movesarr.pop();
	  for(let i = 1; i < ao5.length; i++)
	  {
		  if(ao5[i] > max)
		  {
			  max = ao5[i];
			  maxpos = i;
		  }
		  if(ao5[i] < min)
		  {
			  min = ao5[i];
			  minpos = i;
		  }
	  }
	  if(maxpos == minpos && ao5.length > 1)
	  {
		  maxpos = 0;
		  minpos = 1;
	  }
	  for(let i = 0; i < ao5.length; i++)
	  {
		  if(i == minpos || i == maxpos)
			  display += "(";
		  else
			  actualao5 += ao5[i];
		  
		  display += ao5[i];
		  if(ao5[i] % 1 == 0)
			  display += ".0";
		  
		  if(i == minpos || i == maxpos)
			  display += ")";
		  
		  display += " &nbsp;";
	  }
	  for(let i = 0; i < mo5.length; i++)
	  {
		  if(mo5[i] == 0)
			  mo5.splice(i, 1);
		  meano5 += mo5[i];
	  }
	  if(ao5.length  == 5)
		  display += "&nbsp;Ao5: " + (Math.round((actualao5/3.0)*100)/100);
	  if(mo5.length > 2)
		display += " &nbsp;&nbsp;Mo" + mo5.length + ": " + (Math.round((meano5/(mo5.length * 1.0))*100)/100);
	  if(ao5.length == 0)
		  display = "N/A";
	  if(MODE == "speed")
	  {
		  display = "";
		  let total = 0;
		  for(let i in ao5)
		  {
			  total += ao5[i];
			  display += (ao5[i] + " &nbsp;");
		  }
		  if(ao5.length == 0)
			  display = "N/A"
		  total = Math.round(total * 10) / 10;
		  if(ao5.length > 1)
			display += " &nbsp;Total: " + total; 
	  }
	  document.getElementById('ao5').innerHTML = display;
	  let i = 0;
	  if(movesarr.length > 4) 
		  i = movesarr.length-5;
	  for(let j = 0; j < movesarr.length; j++)
	  {
		  meanmoves += movesarr[j];
	  }
	  for(;i < movesarr.length; i++)
	  {
		  if(movesarr[i] == 0)
			  movesarr.splice(i, 1);
		  displaymoves += movesarr[i] + " ";
		  displaymoves += " &nbsp;";
	  }
	  if(movesarr.length > 2)
		  displaymoves += " &nbsp;Mo" + movesarr.length + ": " + (Math.round((meanmoves/(movesarr.length * 1.0))*100)/100);
	  if(movesarr.length == 0)
		  displaymoves = "N/A";
	  document.getElementById('moves2').innerHTML = displaymoves;
		  
	  
  }
  function randomMove() {
    const axes = ['x', 'y', 'z'];
    const dirs = [-1, 1];
    const row = [-50, 50];
    const axe = p.random(axes);
    const cuby = p.random(Object.values(CUBE));
    animate(axe, p.random(row), p.random(dirs));
  }
  function getIndex(cuby)
  {
	  for(let i = 0; i < 27; i++)
	  {
		  if(CUBE[i].x == cuby.x && CUBE[i].y == cuby.y && CUBE[i].z == cuby.z)
		  {
			  console.log("lol ", CUBE[i].x, CUBE[i].y, CUBE[i].z, cuby.x, cuby.y, cuby.z);
			  return i;
		  }
	  }
	  return null;
  }
  function startAction() {	 
    const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);
	setLayout();
	console.log(hoveredColor);
    if (hoveredColor !== false && hoveredColor[0] != BACKGROUND_COLOR) { 
      const cuby = getCubyIndexByColor2(hoveredColor);
	  
      if (cuby !== false) {
		//console.log(hoveredColor, getIndex(getCubyByColor(hoveredColor)), getCubyIndexByColor2(hoveredColor), getPos(cuby), cubyColors[getCubyIndexByColor2(hoveredColor)]);
		selectedCuby = cuby;
		selectedColor = hoveredColor;
      } 
    } else {
		selectedCuby = -1;
		selectedColor = [];
		//cleanAllSelectedCubies();
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
	let include = "37 39 40 38 76 83 74 70 72 71 79 87 75 73 68 69 188 190 65 186 8 86 82 78 66 77 85";
	if(Math.round(timer.getTime() / 100)/10.0 == 0 && include.includes(p.keyCode) && (p.keyCode < 37 || p.keyCode > 40))
		timer.start();
	if(include.includes(p.keyCode))
	{
		if(timer.isRunning)
			moves++;
	}
	
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
		case 77:
		undo.push("Rw'");
		animateWide('z', 50, -1);
		break;
		case 85:
		undo.push("Rw");
		animateWide('z', 50, 1);
		break;
		case 86:
		undo.push("Lw");
		animateWide('z', -50, -1);
		break;
		case 82:
		undo.push("Lw'");
		animateWide('z', -50, 1);
		break;
		case 78:
		undo.push("Fw");
		animateWide('y', 50, -1);
		break;
		case 66:
		undo.push("Fw'");
		animateWide('y', 50, 1);
		break;
		case 8: //backspace
		Undo();
		break;
		case 13: //enter
		console.log(quickSolve());
		break;
		case 32: //space
		flipmode = 0;
		setLayout();
		console.log(layout);
		console.log(CUBE)
		console.log(cubyColors);
		break;
		case 16: //shift
		/*fetch('src/PLL.json')
		.then((response) => response.json())
		.then((obj) => (setPLL(obj)));*/
		console.log(pllstep)
		break;
		
	}
	
	}
  }
  function setPLL(obj)
  {
	  obj2 = obj;
  }
  function multiple(nb) {
	if(MODE == "speed" && arr.length > 1)
		return;
    if (nb < arr.length) {
		canMan = false;
		moves++;
		notation(arr[nb]);
		console.log(nb);
		let secs = 375-SPEED*225;
		if(secs < 20)
			secs = 20;
		secs += DELAY*1000;
		setTimeout(multiple.bind(null, nb + 1), secs);
    }
	else
	{
		canMan = true;
	}
  }
  function multiple2(nb) {
    if (nb < arr.length) {
		shufflespeed = 2;
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
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
	 
	  console.log(undo);
	  if(undo.length == 0 || !canMan)
		  return;
	  if(timer.IsRunning)
		moves++;
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
		multiple2(0);
		undo.pop();
		redo.push(move);
	
  }
  function Redo()
  {
	  
	  console.log(redo);
	  if(redo.length == 0 || !canMan)
		  return;
	  flipmode = 0;
	  setLayout();
	  if(timer.IsRunning)
		moves++;
		let move = redo.pop();
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
		multiple2(0);
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
		 moves = 0;
		 document.getElementById("stepbig").innerHTML = "Current Solving Step (";
		 canMan = false;
		 stepTwo();
	  }
	  
  }
  function notation(move){
	  if(flipmode == 1)
	  {
		  move = flipper[move];
	  }
	  if(flipmode2 == 1)
	  {
		  console.log(move + " " + flipper2[move]);
		  move = flipper2[move];
	  }
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
	flipmode2 = 1;
	//dev = 1;
	if(dev == 1)
		flipmode2 = 0;
	setLayout();
	let pos = crossColor()[0];
	color = crossColor()[1];
	console.log(color);
	arr = [];
	if(pos != 2 && saystep < 3)
	{
		document.getElementById("step").innerHTML = "Putting most solved side on top";
		document.getElementById("fraction").innerHTML = "1/10):";
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
		document.getElementById("step").innerHTML = "Putting in remaining edge pieces";
		document.getElementById("fraction").innerHTML = "2/10):";
		saystep = 2;
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
		else if((layout[0][1][0].includes(color) || layout[0][1][2].includes(color) || layout[1][1][0].includes(color) || layout[1][1][2].includes(color) )
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
			{
				arr = ["U'"]
			}
			else
				arr = ["U"];
		}
		multipleCross2(0);
	}
	else if(numPFL() < 3 && saystep < 7)
	{
		console.log(numPFL());
		document.getElementById("step").innerHTML = "Permuting edges";
		document.getElementById("fraction").innerHTML = "3/10):";
		saystep = 3;
		arr = [];
		if(numPFL() < 2)
		{
			if((layout[4][0][1][0] == layout[0][1][1][0]) + (layout[0][0][1][0] == layout[5][1][1][0]) +
			(layout[5][0][1][0] == layout[1][1][1][0]) + (layout[1][0][1][0] == layout[4][1][1][0]) > 1)
				arr = ["U'"];
			else
				arr = ["U"];
		}
		else if(layout[4][0][1][0] == layout[4][1][1][0] && layout[0][0][1][0] == layout[0][1][1][0])
		{
			changeArr("R' U' R U R'");
		}
		else if(layout[5][0][1][0] == layout[5][1][1][0] && layout[1][0][1][0] == layout[1][1][1][0])
			changeArr("L' U' L U L'");
		else if(layout[5][0][1][0] == layout[5][1][1][0] && layout[0][0][1][0] == layout[0][1][1][0])
			changeArr("R' U R U' R'");
		else if(opposite[layout[4][0][1][0]] == layout[4][1][1][0] && opposite[layout[5][0][1][0]] == layout[5][1][1][0])
			changeArr("S2 U2 S2");
		else if(opposite[layout[0][0][1][0]] == layout[0][1][1][0] && opposite[layout[1][0][1][0]] == layout[1][1][1][0])
		{
			changeArr("M2 U2 M2");
		}
		else
			changeArr("F U' F' U F");
		multipleCross2(0);
	}
	else if(cornerPFL() < 210)
	{
		console.log("cornerPFL " + cornerPFL());
		saystep = 7;
		document.getElementById("step").innerHTML = "Putting corner pieces on bottom";
		document.getElementById("fraction").innerHTML = "4/10):";
		arr = [];
		let color2 = layout[5][0][1][0];
		let color3 = layout[1][0][1][0];
		if(goodF2L() != 2 && goodF2L() != 0)
		{
			if(goodF2L() == 1)
			{
					let piece = layout[0][2][2];
					if(piece.includes(layout[0][1][1][0]) && piece.includes(layout[5][1][1][0]) 
						|| piece.includes(layout[4][1][1][0]) && piece.includes(layout[0][1][1][0]))
						{
						arr = ["y'"]
						console.log("save1")
						}
					else
						arr = ["D"];
			}
			else if(goodF2L() == 3)
			{
					let piece = layout[1][2][0];
					if(piece.includes(layout[1][1][1][0]) && piece.includes(layout[4][1][1][0]) 
						|| piece.includes(layout[0][1][1][0]) && piece.includes(layout[4][1][1][0]))
						{
						arr = ["y"]
						console.log("save3")
						}
					else
						arr = ["D'"];
			}
			else
			{
					let piece = layout[0][2][0];
					if(piece.includes(layout[0][1][1][0]) && piece.includes(layout[5][1][1][0]) 
						|| piece.includes(layout[4][1][1][0]) && piece.includes(layout[0][1][1][0]))
						{
						arr = ["y'"]
						console.log("save2")
						}
					else
						arr = ["D"];
			}
		}
		else if(layout[3][0][0].includes(color) || layout[3][0][2].includes(color) || layout[3][2][0].includes(color) || layout[3][2][2].includes(color))
		{
			if(!layout[5][2][2].includes(color))
			{
				if(layout[0][2][2].includes(color))
				{
					let piece = layout[0][2][2];
					if(piece.includes(layout[0][1][1][0]) && piece.includes(layout[5][1][1][0]) 
						|| piece.includes(layout[4][1][1][0]) && piece.includes(layout[0][1][1][0]))
						{
						arr = ["y'"]
						console.log("save1")
						}
					else
						arr = ["D"];
				}
				else if(!layout[0][2][0].includes(color))
				{
					let piece = layout[1][2][0];
					if(piece.includes(layout[1][1][1][0]) && piece.includes(layout[4][1][1][0]) 
						|| piece.includes(layout[0][1][1][0]) && piece.includes(layout[4][1][1][0]))
						{
						arr = ["y"]
						console.log("save3")
						}
					else
						arr = ["D'"];
				}
				else 
				{
					let piece = layout[0][2][0];
					if(piece.includes(layout[0][1][1][0]) && piece.includes(layout[5][1][1][0]) 
						|| piece.includes(layout[4][1][1][0]) && piece.includes(layout[0][1][1][0]))
						{
						arr = ["y'"]
						console.log("save2")
						}
					else
						arr = ["D"];
				}
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
				let edgeback = false;
				let edgeleft = false;
				if(layout[2][0][2][0] == color && layout[1][1][0][0] == layout[1][1][1][0] && layout[4][1][2][0] == layout[4][1][1][0])
					edgeback = true;
				if(layout[2][2][0][0] == color && layout[5][1][0][0] == layout[5][1][1][0] && layout[0][1][2][0] == layout[0][1][1][0])
					edgeleft = true;
				if(layout[5][2][2][0] == color)
				{
					if(layout[1][2][1][0] == layout[1][2][2][0] && layout[3][1][2][0] == layout[3][2][2][0])
						arr.push("D'", "R'", "D", "R");
					else if(layout[1][2][2][0] == layout[0][2][1][0] && layout[3][2][2][0] == layout[3][1][0][0]){
						if(edgeleft) changeArr("D R' D2 R D2 R' D R");
						else changeArr("F' D2 F D' R' D R")
					}
					else if (layout[1][2][2][0] == layout[3][2][1][0] && layout[3][2][2][0] == layout[5][2][1][0]){
						if(edgeback) changeArr("D' F D' F' D F D F'");
						else changeArr("R D' R' F D F'");
					}
					else if(layout[1][2][2][0] == layout[5][2][1][0] && layout[3][2][2][0] == layout[3][2][1][0]){
						changeArr("F D' F' D2 R' D' R")
					}
					else if(layout[1][2][2][0] == layout[4][2][1][0] && layout[3][2][2][0] == layout[3][0][1][0]){
						if(edgeleft) changeArr("D R' D' R D2 R' D R")
						else changeArr("F' D' F D' R' D R")
					}
					else if(layout[1][2][2][0] == layout[3][1][2][0] && layout[3][2][2][0] == layout[1][2][1][0]){
						if(edgeleft) changeArr("D R' D2 R D' F D F'");
						else changeArr("F' D2 F2 D F'");
					}
					else if(layout[5][1][2][0] == layout[1][1][1][0] && layout[5][1][1][0] == layout[1][1][2][0]){
						changeArr("D R' D' R D' F D F'");
					}
					else if(layout[1][2][2][0] == layout[1][1][0][0] && layout[3][2][2][0] == layout[4][1][2][0]){
						changeArr("D' B' D' B F D' F'");
					}
					else if(layout[1][2][2][0] == layout[3][0][1][0] && layout[3][2][2][0] == layout[4][2][1][0]){
						if(edgeback) changeArr("D' F D F' D F D F'");
						else changeArr("R D R' F D F'");
					}
					else if(layout[1][2][2][0] == layout[0][1][2][0] && layout[3][2][2][0] == layout[5][1][0][0]){
						changeArr("F' D' F2 D F'")
					}
					else if(layout[1][2][2][0] == layout[5][1][0][0] && layout[3][2][2][0] == layout[0][1][2][0]){
						changeArr("L D L' D' F D F'");
					}
					else if(layout[1][2][2][0] == layout[4][1][0][0] && layout[3][2][2][0] == layout[0][1][0][0]){
						changeArr("L' D' L D' F D' F'");
					}
					else if(layout[1][2][2][0] == layout[1][1][0][0] && layout[3][2][2][0] == layout[4][1][2][0]){
						changeArr("D' B' D' B F D' F'");
					}
					else if(layout[1][2][2][0] == layout[0][1][0][0] && layout[3][2][2][0] == layout[4][1][0][0]){
						changeArr("D' B D B' F D F'");
					}
					else if(layout[1][2][2][0] == layout[4][1][2][0] && layout[3][2][2][0] == layout[1][1][0][0]){
						changeArr("D2 R D R' D F D F'");
					}
					else if(type < 1 && layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][2][0] == layout[1][1][1][0]){
						changeArr("D F D F' D2 F D F'");
					}
					else 
						arr.push("F", "D", "F'");
				}
				else if(layout[1][2][2][0] == color)
				{
					if(layout[5][2][2][0] == layout[5][2][1][0] && layout[3][2][1][0] == layout[3][2][2][0]){
						arr.push("D", "F", "D'", "F'");
					}
					else if(layout[5][2][2][0] == layout[4][2][1][0] && layout[3][2][2][0] == layout[3][0][1][0]){
						if(edgeback) changeArr("D' F D2 F' D2 F D' F'");
						else changeArr("R D2 R' D F D' F'");
					}
					else if(layout[5][2][2][0] == layout[3][1][2][0] && layout[3][2][2][0] == layout[1][2][1][0]){
						if(edgeleft) arr.push("D", "R'", "D" ,"R" ,"D'", "R'" ,"D'", "R");
						else changeArr("F' D F R' D' R");
					}
					else if(layout[5][2][2][0] == layout[1][2][1][0] && layout[3][2][2][0] == layout[3][1][2][0]){
						changeArr("R' D R D2 F D F'");
					}
					else if(layout[5][2][2][0] == layout[0][2][1][0] && layout[3][2][2][0] == layout[3][1][0][0]){
						if(edgeback) changeArr("D' F D F' D2 F D' F'");
						else changeArr("R D R' D F D' F'")
					}
					else if(layout[5][2][2][0] == layout[3][2][1][0] && layout[3][2][2][0] == layout[5][2][1][0]){
						if(edgeback) changeArr("D' F D2 F' D R' D' R");
						else changeArr("R D2 R2 D' R");
					}
					else if(layout[5][1][2][0] == layout[1][1][1][0] && layout[5][1][1][0] == layout[1][1][2][0]){
						changeArr("D' F D F' D R' D' R")
					}
					else if(layout[5][2][2][0] == layout[5][1][0][0] && layout[3][2][2][0] == layout[0][1][2][0]){
						changeArr("D L D L' R' D R");
					}
					else if(layout[5][2][2][0] == layout[3][1][0][0] && layout[3][2][2][0] == layout[0][2][1][0])
					{
						if(edgeback) changeArr("D' F D' F' D R' D' R");
						else changeArr("R D' R2 D' R");
					}
					else if(layout[5][2][2][0] == layout[4][1][2][0] && layout[3][2][2][0] == layout[1][1][0][0])
						changeArr("D' R D R' D2 R' D R");
					else if(layout[5][2][2][0] == layout[1][1][0][0] && layout[3][2][2][0] == layout[4][1][2][0])
						changeArr("B' D' B D R' D' R");
					else if(layout[5][2][2][0] == layout[4][1][2][0] && layout[3][2][2][0] == layout[1][1][0][0])
						changeArr("R D R2 D' R")
					else if(layout[5][2][2][0] == layout[0][1][0][0] && layout[3][2][2][0] == layout[4][1][0][0] )
						changeArr("B D B' D R' D R");
					else if(layout[5][2][2][0] == layout[4][1][2][0] && layout[3][2][2][0] == layout[2][1][0][0] )
						changeArr("D' R D R' D2 R' D R");
					else if(layout[5][2][2][0] == layout[4][1][0][0] && layout[3][2][2][0] == layout[0][1][0][0] )
						changeArr("D L' D' L R' D' R");
					else if(type < 1 && layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][2][0] == layout[1][1][1][0])
						changeArr("D' R' D' R D2 R' D' R");
					else if(layout[5][2][2][0] == layout[0][1][2][0] && layout[3][2][2][0] == layout[5][1][0][0] )
						changeArr("D2 F' D' F D' R' D' R");
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
						changeArr("R' D' R D' F D' F' D F D' F'")
					else if(layout[5][2][2][0] == layout[5][2][1][0] && layout[1][2][2][0] == layout[3][2][1][0])
						changeArr("R' D' R F D' F' R' D' R")
					else if(layout[5][2][2][0] == layout[3][0][1][0] && layout[1][2][2][0] == layout[4][2][1][0])
						changeArr("F D' F' D2 F D F'");
					else if(layout[5][2][2][0] == layout[4][2][1][0] && layout[1][2][2][0] == layout[3][0][1][0])
						changeArr("D' R' D2 R D' R' D R");
					else if(layout[5][2][2][0] == layout[0][2][1][0] && layout[1][2][2][0] == layout[3][1][0][0])
						changeArr("R' D R D2 R' D' R");
					else if(layout[5][2][2][0] == layout[3][1][0][0] && layout[1][2][2][0] == layout[0][2][1][0])
						changeArr("D F D2 F' D F D' F'")
					else if(layout[5][2][2][0] == layout[5][1][0][0] && layout[1][2][2][0] == layout[0][1][2][0])
						changeArr("L' F L F' D2 R' D' R")
					else if(layout[5][2][2][0] == layout[0][1][2][0] && layout[1][2][2][0] == layout[5][1][0][0])
						changeArr("D' M' F2 M");
					else if(layout[5][1][2][0] == layout[1][1][1][0] && layout[5][1][1][0] == layout[1][1][2][0])
						arr.push("R'", "D", "R", "F", "D", "D", "F'");
					else if(layout[5][2][2][0] == layout[1][1][0][0] && layout[1][2][2][0] == layout[4][1][2][0])
						changeArr("D S' R2 S");
					else if(layout[5][2][2][0] == layout[4][1][2][0] && layout[1][2][2][0] == layout[1][1][0][0])
						changeArr("B R' B' R D2 F D F'");
					else if(type == 0 && layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][2][0] == layout[1][1][1][0])
						changeArr("D' R F' R' F D' F D F'");
					else if(layout[5][2][2][0] == layout[4][1][0][0] && layout[1][2][2][0] == layout[0][1][0][0])
						changeArr("D2 B D2 B' R' D R")
					else if(layout[5][2][2][0] == layout[0][1][0][0] && layout[1][2][2][0] == layout[4][1][0][0])
						changeArr("D' B' L B L' D' R' D' R")
					else if(layout[5][2][2][0] == layout[4][1][0][0] && layout[1][2][2][0] == layout[0][1][0][0])
						changeArr("D2 B D2 B' R' D R")
					else			
						arr.push("R'", "D", "R", "F", "D", "D", "F'");
				}
				if(type == 1)
					arr.push("U'");
				if(type == 2)
					arr.push("U");
					
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
			{
				console.log("WEfwe6")
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
								changeArr("D R' D'")
							else
								changeArr("R' D' R");
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
						changeArr("R' D' R");
				}
				else if(layout[5][2][0][0] == color)//color on front
				{
					console.log("fwef")
					colorTwo = layout[2][2][2][0];
					colorThree = layout[1][0][2][0];
					if(cornerF2L() == true)
					{
						console.log("true " + cornerF2L() + " " + colorTwo + " " + colorThree);
						if(layout[5][2][1].includes(colorTwo) && layout[5][2][1].includes(colorThree))
						{
							if(layout[5][2][1][0] == layout[2][2][2][0])
								changeArr("D R' D R");
							else
								changeArr("F D F'");
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
						changeArr("F D F'");
				}
				else if(layout[2][2][2][0] == color) //color on top
				{
					console.log("WEfwe");
					colorTwo = layout[5][0][2][0];
					colorThree = layout[1][0][2][0];
					if(cornerF2L() == true)
					{
						console.log("WEfwe7");
						if(layout[0][2][1][0] == colorTwo && layout[3][1][0][0] == colorThree)
						{
							changeArr("R' D' R");
							console.log("WEfwe9");
						}
						else if(layout[4][2][1][0] == colorThree && layout[3][0][1][0] == colorTwo)
							changeArr("F D F'");
						else
						{
							if(layout[5][2][1][0] == colorTwo && layout[3][2][1][0] == colorThree)
								changeArr("D'");
							else if(layout[0][2][1][0] == colorThree && layout[3][1][0][0] == colorTwo)
								changeArr("D'");
							else
								arr = ["D"];
						}
					}
					else
					{
						console.log("WEfwe8");
						changeArr("R' D R")
					}
				}
				else
				{
					console.log("WEfwe4");
					arr = ["R'", "D'", "R"];
				}
			}
		}
		multipleCross2(0);
	}
	else if(layout[2][0][0][0] != color || layout[2][0][2][0] != color || layout[2][2][0][0] != color || layout[2][2][2][0] != color && saystep < 9){
		document.getElementById("step").innerHTML = "Orienting remaining Corners";
		document.getElementById("fraction").innerHTML = "5/10):";
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
					changeArr("R' D' R");
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
				changeArr("F D F'");
			}
		}
		multipleCross2(0);
	}
	else if(layout[5][0][1][0] != layout[5][1][1][0])
	{
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
		document.getElementById("fraction").innerHTML = "6/10):";
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
				changeArr("R' D' R");
			}
		}
		multipleCross2(0);
	}
	else if(!isSolved())
	{
		color = opposite[color];
		flipmode2 = 0;
		stepThree(color);
	}
	else
	{
		document.getElementById("step").innerHTML = "";
		document.getElementById("fraction").innerHTML = "";
		document.getElementById("stepbig").innerHTML = "";
		timer.stop();
		movesarr.push(moves);
		if(ao5.length<5)
		{
			ao5.push(Math.round(timer.getTime() / 100)/10.0);
			mo5.push(Math.round(timer.getTime() / 100)/10.0);
		}
		else
		{
			ao5.push(Math.round(timer.getTime() / 100)/10.0);
			mo5.push(Math.round(timer.getTime() / 100)/10.0);
			ao5.shift()
		}
		canMan = true;
		saystep = 0;
	}
  }
  function stepThree()
  {
	  console.log("gergerger " + dev);
	  if(dev > 0)
	  {
		  changeArr("x");
		  dev -= 0.5;
		  console.log("gergerger2 " + dev);
		  multipleCross3(0);
		  return;
	  }
	  flipmode2 = 0;
	  setLayout();
	  if(isSolved())
	  {
		  document.getElementById("stepbig").innerHTML = "";
		  document.getElementById("step").innerHTML = "";
		  document.getElementById("fraction").innerHTML = "";
		  timer.stop();
		  movesarr.push(moves);
		  flipmode = 0;
		  if(ao5.length<5)
		  {
			ao5.push(Math.round(timer.getTime() / 100)/10.0);
			mo5.push(Math.round(timer.getTime() / 100)/10.0);
		  }
		  else
			{
				ao5.push(Math.round(timer.getTime() / 100)/10.0);
				mo5.push(Math.round(timer.getTime() / 100)/10.0);
				ao5.shift()
			}
		  saystep = 0;
		  canMan = true;
		  return;
	  }
	  console.log(color + " " + layout[2][1][1][0]);
	  if(!(layout[2][0][1][0] == color && layout[2][1][0][0] == color && layout[2][1][2][0] == color) && saystep < 14)
	  {
		  flipmode2 = 0;
		  setLayout();
		  console.log(layout);
		  document.getElementById("step").innerHTML = "Orientation of Last Layer (OLL)";
		  document.getElementById("fraction").innerHTML = "8/10):";
		  saystep = 13;
		  flipmode = 0;
		  arr = [];
		  if(layout[2][1][0][0] == color && layout[2][1][2][0] == color) // -
		  {
			  console.log("erter " + cornerOLL());
			  if(cornerOLL() == 4)
				  changeArr("R U R' U' M' U R U' r'") //57
			  else if(cornerOLL() == 0)
			  {
				  console.log("here");
				  if(layout[5][0][0][0] == color && layout[5][0][2][0] == color && layout[4][0][0][0] == color && layout[4][0][2][0] == color)
					  changeArr("r U2 R' U' M R U R' U' r U' r'"); //55
				  else if(layout[5][0][0][0] == color && layout[4][0][0][0] == color && layout[1][0][0][0] == color && layout[1][0][2][0] == color) 
					  changeArr("F U R U' R' U R U' R' F'"); //51
				  else if(layout[0][0][0][0] == color && layout[0][0][2][0] == color && layout[1][0][0][0] == color && layout[1][0][2][0] == color)
					  changeArr("F R U R' U' R F' r U R' U' r'") //56
				  else if(layout[4][0][2][0] == color && layout[5][0][2][0] == color && layout[0][0][2][0] == color && layout[0][0][0][0] == color) 
					  changeArr("f R U R' U' R U R' U' f'"); //51 backwards
				  else
					  arr = ["U'"];
			  }
			  else if(cornerOLL() == 1){
				  if(layout[2][2][0][0] == color && layout[5][0][2][0] == color)
					  changeArr("r U' r' U' r U r' F' U F"); //13
				  else if(layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				  {
					  changeArr("R' F R U R' F' R F U' F'"); //14
					  console.log("14");
				  }
				  else if(layout[2][0][0][0] == color && layout[5][0][2][0] == color)
					  changeArr("l' U' M U' L U l' U l") //15
				  else if(layout[2][0][2][0] == color && layout[5][0][0][0] == color)
					  changeArr("r U M U R' U' r U' r'") //16
				  else
				  {
					  flipmode = 1;
					  if(layout[2][0][2][0] == color && layout[4][0][0][0] == color)
						changeArr("r U' r' U' r U r' F' U F"); //13
					  else if(layout[2][0][0][0] == color && layout[4][0][2][0] == color)
					  {
						changeArr("R' F R U R' F' R F U' F'"); //14
						console.log("14.1");
					  }
					  else if(layout[2][2][2][0] == color && layout[4][0][0][0] == color)
					  changeArr("l' U' M U' L U l' U l") //15
					  else if(layout[2][2][0][0] == color && layout[4][0][2][0] == color)
						changeArr("r U M U R' U' r U' r'") //16
					  else
						arr = ["U"];
				  }
			  }
			  else{
				  if(layout[2][0][0][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] != color)
					  changeArr("R' F R U R' U' F' U R"); //40
				  else if(layout[2][0][2][0] == color && layout[2][2][0][0] == color && layout[5][0][2][0] != color)
					  changeArr("L F' L' U' L U F U' L'"); //39
				  else if(layout[2][2][0][0] == color && layout[2][2][2][0] == color && layout[4][0][0][0] != color)
					  changeArr("R U R' d' l' U' L U M");//34
				  else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
					  changeArr("R U R' U' R' F R F'"); //33
				  else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color)
					  changeArr("F R U R' U' F'"); //45
				  else
				  {
					flipmode = 1;
					if(layout[2][2][2][0] == color && layout[2][0][0][0] == color && layout[4][0][2][0] != color)
						changeArr("R' F R U R' U' F' U R"); //40
					else if(layout[2][2][0][0] == color && layout[2][0][2][0] == color && layout[4][0][0][0] != color)
						changeArr("L F' L' U' L U F U' L'"); //39
					else if(layout[2][0][2][0] == color && layout[2][0][0][0] == color && layout[5][0][2][0] != color)
					  changeArr("R U R' d' l' U' L U M");//34
					else if(layout[2][2][0][0] == color && layout[2][0][0][0] == color && layout[4][0][2][0] == color)
					  changeArr("R U R' U' R' F R F'"); //33
					else if(layout[2][2][0][0] == color && layout[2][0][0][0] == color)
					  changeArr("F R U R' U' F'"); //45
				    else
						arr = ["U"];
				  }
			  }
		  }
		  else if(layout[2][0][1][0] == color && layout[2][2][1][0] == color) // |
		  {
			  if(cornerOLL() == 2)
			  {
				  if(layout[2][0][0][0] == color && layout[2][2][0][0] == color && layout[1][0][0][0] == color && layout[1][0][2][0] == color)
					  changeArr("R' U' R' F R F' U R"); //46
				  else if(layout[2][2][2][0] == color && layout[2][0][2][0] == color && layout[0][0][2][0] == color && layout[0][0][0][0] == color)
				  {
					  flipmode = 1;
					  changeArr("R' U' R' F R F' U R"); //46
				  }
				  else
					  arr = ["U'"];
			  }
			  else if(cornerOLL() == 0)
			  {
				  if(layout[5][0][0][0] == color && layout[4][0][0][0] == color && layout[1][0][0][0] == color && layout[1][0][2][0] == color)
					  changeArr("R U R' U R U' B U' B' R'"); //52
				  else if(layout[4][0][2][0] == color && layout[5][0][2][0] == color && layout[0][0][2][0] == color && layout[0][0][0][0] == color)
				  {
					  flipmode = 1;
					  changeArr("R U R' U R U' B U' B' R'"); //52
				  }
				  else
					  arr = ["U'"];
			  }
			  else
				  arr = ["U'"]
		  }
		  else if(layout[2][0][1][0] == color && layout[2][1][0][0] == color) //Normal (J)
		  {
			  if(cornerOLL() == 4)
				  changeArr("M U M' U2 M U M'"); //28
			  else if(cornerOLL() == 0)
			  {
				  if(layout[0][0][0][0] == color && layout[0][0][2][0] == color && layout[5][0][2][0] == color && layout[4][0][2][0] == color)
					  changeArr("F R U R' U' R U R' U' F'"); // 48
				  else if(layout[0][0][0][0] != color && layout[0][0][2][0] != color && layout[5][0][2][0] == color && layout[5][0][2][0] == color)
					  changeArr("r U2 R' U' R U R' U' R U' r'"); //54
				  else if(layout[1][0][0][0] == color && layout[4][0][0][0] == color && layout[1][0][2][0] == color)
				  {
					  flipmode = 1;
					  changeArr("r' U r2 U' r2 U' r2 U r'"); //50
				  }
				  else arr = ["U'"];
			  }
			  else if(cornerOLL() == 1)
			  {
				  if(layout[0][0][0][0] == color && layout[5][0][0][0] == color && layout[2][2][2][0] == color)
					  changeArr("R' U' R b U' b' U b U b'"); //9
				  else if(layout[2][2][0][0] == color && layout[5][0][2][0] == color && layout[1][0][0][0] == color)
					  changeArr("r U R' U R U2 r'"); //7
				  else if(layout[2][0][2][0] == color && layout[0][0][2][0] == color && layout[5][0][2][0] == color)
					  changeArr("r U R' U R' F R F' R U2 r'"); //11
				  else if(layout[2][0][0][0] == color && layout[0][0][2][0] == color && layout[5][0][2][0] == color)
					  changeArr("l' U2 L U L' U l"); //5
				  else
					  arr = ["U'"]
			  }
			  else
			  {
				  if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
					  changeArr("S' U F U F' U' F' L F L' S"); //29
				  else if(layout[2][2][2][0] == color && layout[2][2][0][0] == color && layout[0][0][0][0] == color)
					  changeArr("F U R U' B R' F' R B' R'"); //30
				  else if(layout[2][2][2][0] == color && layout[2][2][0][0] == color)
					  changeArr("M' R' F' U' F U R U' M"); //41
				  else if(layout[2][0][0][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
					  changeArr("F R' F' R U R U' R'"); //37
				  else if(layout[2][0][0][0] == color && layout[2][2][0][0] == color && layout[5][0][2][0] == color)
					  changeArr("L U F' U' L' U L F L'"); //32
				  else if(layout[2][0][0][0] == color && layout[2][2][0][0] == color)
					  changeArr("F U R U' R' F'"); //44
				  else if(layout[2][2][0][0] == color && layout[2][0][2][0] == color && layout[5][0][2][0] != color)
					  changeArr("R U R' U R U' R' U' R' F R F'"); //38
				  else
				  {
					  flipmode = 1;
					  if(cornerOLL() == 2 && layout[2][0][0][0] == color && layout[4][0][2][0] == color && layout[2][2][2][0] == color)
						changeArr("R U2 R2 F R F' R U2 R'"); //35
					  else
					    arr = ["U"]
				  }
			  }
		  }
		  else if(layout[2][1][0][0] == color && layout[2][2][1][0] == color) //Backwards r
		  {
			  if(cornerOLL() == 2)
			  {
				  if(layout[2][0][0][0] == color && layout[2][0][2][0] == color && layout[5][0][0][0] == color)
					  changeArr("M U F R U R' U' F' M'"); //42
				  else
				  {
					flipmode = 1;
					if(layout[2][2][0][0] == color && layout[2][0][0][0] == color && layout[4][0][2][0] == color)
					  changeArr("R' U' F U R U' R' F' R"); //31
					else if(layout[2][2][0][0] == color && layout[2][0][0][0] == color)
					  changeArr("F' U' L' U L F");//43
					else if(layout[2][2][2][0] == color && layout[2][0][0][0] == color && layout[1][0][0][0] == color)
					  changeArr("L' U' L U' L' U L U L F' L' F");//36
					else
					  arr = ["U"];
				  }
			  }
			  else if(cornerOLL() == 1 && layout[2][0][2][0] == color && layout[0][0][2][0] == color && layout[5][0][2][0] == color)
			  {
				  changeArr("R U R' B' R B U' B' R' B"); //10
			  }
			  else
			  {
				flipmode = 1;
				if(cornerOLL() == 0 && layout[0][0][2][0] == color && layout[5][0][2][0] == color && layout[4][0][2][0] == color)
				  changeArr("F' L' U' L U L' U' L U F"); //47
				else if(cornerOLL() == 0 && layout[4][0][0][0] == color && layout[1][0][0][0] == color && layout[1][0][2][0] == color)
				  changeArr("r U' r2 U r2 U r2 U' r"); //49
				else if(cornerOLL() == 0 && layout[4][0][2][0] == color && layout[4][0][0][0] == color && layout[5][0][2][0] == color)
				  changeArr("l' U2 L U L' U' L U L' U l"); //53
				else if(cornerOLL() == 1 && layout[2][0][0][0] == color && layout[1][0][2][0] == color && layout[4][0][2][0] == color)
				  changeArr("l' U' L U' L' U2 l"); //8
				else if(cornerOLL() == 1 && layout[2][2][0][0] == color && layout[1][0][2][0] == color && layout[4][0][2][0] == color)
				  changeArr("r U2 R' U' R U' r'"); //6
				else if(cornerOLL() == 1 && layout[0][0][0][0] == color && layout[4][0][2][0] == color && layout[2][2][2][0] == color)
				  changeArr("M' R' U' R U' R' U2 R U' M"); //12
				else
				  arr = ["U"];
			  }
		  }
		  else if(layout[2][1][2][0] == color && layout[2][0][1][0] == color) //L
		  {
			  if(cornerOLL() == 2)
			  {
				  if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
					  changeArr("R' U' F U R U' R' F' R"); //31
				  else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color)
					  changeArr("F' U' L' U L F");//43
				  else if(layout[2][0][0][0] == color && layout[2][2][2][0] == color && layout[0][0][2][0] == color)
					  changeArr("L' U' L U' L' U L U L F' L' F");//36
				  else if(layout[2][2][2][0] == color && layout[2][2][0][0] == color && layout[4][0][2][0] == color)
				  {
					  flipmode = 1;
					  changeArr("M U F R U R' U' F' M'"); //42
				  }
				  else
					  arr = ["U'"];
			  }
			  else if(cornerOLL() == 0 && layout[1][0][0][0] == color && layout[4][0][0][0] == color && layout[5][0][0][0] == color)
				  changeArr("F' L' U' L U L' U' L U F"); //47
			  else if(cornerOLL() == 0 && layout[5][0][2][0] == color && layout[0][0][2][0] == color && layout[0][0][0][0] == color)
				  changeArr("r U' r2 U r2 U r2 U' r"); //49
			  else if(cornerOLL() == 0 && layout[5][0][0][0] == color && layout[5][0][2][0] == color && layout[4][0][0][0] == color)
				  changeArr("l' U2 L U L' U' L U L' U l"); //53
			  else if(cornerOLL() == 1 && layout[2][2][2][0] == color && layout[0][0][0][0] == color && layout[5][0][0][0] == color)
				  changeArr("l' U' L U' L' U2 l"); //8
			  else if(cornerOLL() == 1 && layout[2][0][2][0] == color && layout[0][0][0][0] == color && layout[5][0][0][0] == color)
				  changeArr("r U2 R' U' R U' r'"); //6
			  else if(cornerOLL() == 1 && layout[1][0][2][0] == color && layout[5][0][0][0] == color && layout[2][0][0][0] == color)
				  changeArr("M' R' U' R U' R' U2 R U' M"); //12
			  else if(cornerOLL() == 1 && layout[2][2][0][0] == color && layout[1][0][0][0] == color && layout[4][0][0][0] == color)
			  {
				  flipmode = 1;
				  changeArr("R U R' B' R B U' B' R' B"); //10
			  }
			  else  
				  arr = ["U'"];
				  
		  }
		  else if(layout[2][1][2][0] == color && layout[2][2][1][0] == color) //r
		  {
			  if(cornerOLL() == 0 && layout[0][0][2][0] == color && layout[5][0][2][0] == color && layout[0][0][0][0] == color)
				  changeArr("r' U r2 U' r2 U' r2 U r'"); //50
			  else if(cornerOLL() == 2 && layout[2][2][2][0] == color && layout[5][0][0][0] == color && layout[2][0][0][0] == color)
				  changeArr("R U2 R2 F R F' R U2 R'"); //35
			  else
			  {
				 flipmode = 1;
				if(cornerOLL() == 4)
				  changeArr("M U M' U2 M U M'"); //28
				else if(cornerOLL() == 0)
				{
				  if(layout[1][0][2][0] == color && layout[1][0][0][0] == color && layout[4][0][0][0] == color && layout[5][0][0][0] == color)
					  changeArr("F R U R' U' R U R' U' F'"); // 48
				  else if(layout[1][0][2][0] != color && layout[1][0][0][0] != color && layout[4][0][0][0] == color && layout[4][0][0][0] == color)
					  changeArr("r U2 R' U' R U R' U' R U' r'"); //54
				  else
					  arr = ["U"];
				}
				else if(cornerOLL() == 1)
				{
				  if(layout[1][0][2][0] == color && layout[4][0][2][0] == color && layout[2][0][0][0] == color)
					  changeArr("R' U' R b U' b' U b U b'"); //9
				  else if(layout[2][0][2][0] == color && layout[4][0][0][0] == color && layout[0][0][2][0] == color)
					  changeArr("r U R' U R U2 r'"); //7
				  else if(layout[2][2][0][0] == color && layout[1][0][0][0] == color && layout[4][0][0][0] == color)
					  changeArr("r U R' U R' F R F' R U2 r'"); //11
				  else if(layout[2][2][2][0] == color && layout[1][0][0][0] == color && layout[4][0][0][0] == color)
					  changeArr("l' U2 L U L' U l"); //5
				  else
					  arr = ["U"]
				}
				else
				{
				  if(layout[2][2][0][0] == color && layout[2][0][0][0] == color && layout[4][0][2][0] == color)
					  changeArr("S' U F U F' U' F' L F L' S"); //29
				  else if(layout[2][0][0][0] == color && layout[2][0][2][0] == color && layout[1][0][2][0] == color)
					  changeArr("F U R U' B R' F' R B' R'"); //30
				  else if(layout[2][0][0][0] == color && layout[2][0][2][0] == color)
					  changeArr("M' R' F' U' F U R U' M"); //41
				  else if(layout[2][2][2][0] == color && layout[2][0][0][0] == color && layout[4][0][2][0] == color)
					  changeArr("F R' F' R U R U' R'"); //37
				  else if(layout[2][2][2][0] == color && layout[2][0][2][0] == color && layout[4][0][0][0] == color)
					  changeArr("L U F' U' L' U L F L'"); //32
				  else if(layout[2][2][2][0] == color && layout[2][0][2][0] == color)
					  changeArr("F U R U' R' F'"); //44
				  else if(layout[2][0][2][0] == color && layout[2][2][0][0] == color && layout[4][0][0][0] != color)
					  changeArr("R U R' U R U' R' U' R' F R F'"); //38
				  else
					  arr = ["U"]
				}		
			  }
			  
		  }
		  else if(layout[2][0][1][0] != color && layout[2][1][0][0] != color && layout[2][1][2][0] != color) //Dot Cases (Dot Product Haha)
		  {
			  if(cornerOLL() == 4)
				  changeArr("S' R U R' S U' M' U R U' r'"); //20
			  else if(cornerOLL() == 0 && layout[0][0][2][0] == color && layout[1][0][2][0] == color && layout[0][0][0][0] == color)
				  changeArr("R U2 R2 F R F' U2 R' F R F'"); //1
			  else if(cornerOLL() == 0 && layout[0][0][2][0] == color && layout[0][0][0][0] == color)
				  changeArr("F R U R' U' S R U R' U' f'"); //2
			  else if(cornerOLL() == 1 && layout[2][2][0][0] == color && layout[4][0][0][0] == color && layout[5][0][2][0] == color)
				  changeArr("M R U R' U r U2 r' U M'"); //3
			  else if(cornerOLL() == 1 && layout[2][2][2][0] == color && layout[5][0][0][0] == color && layout[0][0][0][0] == color)
				  changeArr("M U' r U2 r' U' R U' R' M'"); //4
			  else if(cornerOLL() == 2 && layout[2][2][2][0] == color && layout[5][0][0][0] == color && layout[2][0][0][0] == color)
			  {
				  changeArr("F R' F' R2 r' U R U' R' U' M'"); //17
				  console.log("17.0")
			  }
			  else if(cornerOLL() == 2 && layout[2][2][2][0] == color && layout[4][2][0][0] == color && layout[2][2][0][0] == color)
				  changeArr("F R U R' d R' U2 R' F R F'"); //18
			  
			  else if(cornerOLL() == 2 && layout[2][0][2][0] == color && layout[2][0][0][0] == color && layout[0][0][2][0] == color)
				  changeArr("M U R U R' U' M' R' F R F'"); //19
			  else
			  {
				flipmode = 1;
				if(cornerOLL() == 0 && layout[1][0][0][0] == color && layout[1][0][2][0] == color)
				  changeArr("F R U R' U' S R U R' U' f'"); //2
				else if(cornerOLL() == 1 && layout[2][0][2][0] == color && layout[5][0][2][0] == color && layout[4][0][0][0] == color)
				  changeArr("M R U R' U r U2 r' U M'"); //3
				else if(cornerOLL() == 1 && layout[2][0][0][0] == color && layout[4][0][2][0] == color && layout[1][0][2][0] == color)
				  changeArr("M U' r U2 r' U' R U' R' M'"); //4
				else if(cornerOLL() == 2 && layout[2][0][0][0] == color && layout[4][0][2][0] == color && layout[2][2][2][0] == color)
				{
				  changeArr("F R' F' R2 r' U R U' R' U' M'"); //17
				  console.log("17.1");
				}
				else if(cornerOLL() == 2 && layout[2][0][2][0] == color && layout[5][0][2][0] == color && layout[2][0][0][0] == color)
				  changeArr("F R U R' d R' U2 R' F R F'"); //18
				else if(cornerOLL() == 2 && layout[2][2][0][0] == color && layout[2][2][2][0] == color && layout[1][0][0][0] == color)
				  changeArr("M U R U R' U' M' R' F R F'"); //19
				else
					arr = ["U"];
			  }
		  }
		  else{
			  arr = ["U'"];
		  }
		  console.log("17.2" + " " + arr);
		  multipleCross3(0);
	  }
	  else if(layout[2][0][0][0] != color || layout[2][0][2][0] != color || layout[2][2][0][0] != color || layout[2][2][2][0] != color && saystep < 15)
	  {
		  flipmode2 = 0;
		   setLayout();
		  document.getElementById("step").innerHTML = "Orientation of Last Layer (OLL)";
		  document.getElementById("fraction").innerHTML = "8/10):";
		  flipmode = 0;
		  saystep = 14;
		  arr = [];
		  if(cornerOLL() == 0){
			  if(layout[0][0][0][0] == color && layout[0][0][2][0] == color)
			  {
				  if(layout[5][0][2][0] == color)
					  changeArr("R U' L' U R' U L U L' U L"); //22
				  else
					  changeArr("R U R' U R U' R' U R U2 R'"); //21
			  }
			  else if(layout[1][0][0][0] == color && layout[1][0][2][0] == color && layout[4][0][0][0] == color)
			  {
				  flipmode = 1;
				  changeArr("R U' L' U R' U L U L' U L"); //22
			  }
			  else
				  arr = ["U'"]
		  }
		  else if(cornerOLL() == 1){
			  if(layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				  changeArr("L' U' L U' L' U2 L"); //26 antisune
			  else if(layout[2][2][0][0] == color && layout[5][0][2][0] == color)
				  changeArr("R U R' U R U2 R'"); //27 sune
			  else
			  {
				  flipmode = 1;
				  if(layout[2][0][0][0] == color && layout[4][0][2][0] == color)
					changeArr("L' U' L U' L' U2 L"); //26 antisune
				  else if(layout[2][0][2][0] == color && layout[4][0][0][0] == color)
					changeArr("R U R' U R U2 R'"); //27 sune
				  else
					arr = ["U"];
			  }
		  }else{
			  if(layout[2][0][0][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				  changeArr("F R' F' r U R U' r'"); //25
			  else if(layout[2][0][0][0] == color && layout[2][0][2][0] == color && layout[5][0][2][0] == color)
				  changeArr("R2 D R' U2 R D' R' U2 R'"); //23
			  else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				  changeArr("r U R' U' r' F R F'"); //24
			  else
			  {
				  flipmode = 1;
				  if(layout[2][2][2][0] == color && layout[2][0][0][0] == color && layout[4][0][2][0] == color)
					changeArr("F R' F' r U R U' r'"); //25
				  else if(layout[2][2][2][0] == color && layout[2][2][0][0] == color && layout[4][0][0][0] == color)
					changeArr("R2 D R' U2 R D' R' U2 R'"); //23
				  else if(layout[2][2][0][0] == color && layout[2][0][0][0] == color && layout[4][0][2][0] == color)
					changeArr("r U R' U' r' F R F'"); //24
				  else
				    arr = ["U"];
			  }
		  }
		  multipleCross3(0);
	  }
	  else if(!(layout[0][0][0][0] == layout[0][0][2][0] && layout[5][0][0][0] == layout[5][0][2][0]) && saystep <16)
	  {
		flipmode2 = 0;
		 setLayout();
		document.getElementById("step").innerHTML = "Permutation of the Last Layer (PLL)";
		document.getElementById("fraction").innerHTML = "9/10):";
		saystep = 15;
		arr = [];
		flipmode = 0;
		if(layout[0][0][0][0] == layout[0][0][2][0])
		{
			flipmode = 0;
			if(layout[5][0][0][0] == layout[5][0][1][0] && opposite[layout[0][0][1][0]] == layout[0][0][2][0]) //T
				changeArr("R U R' U' R' F R2 U' R' U' R U R' F'")
			else if(layout[5][0][1][0] == layout[5][0][2][0] && layout[1][0][2][0] == layout[1][0][1][0]) //Aa
				changeArr("B' R B' L2 B R' B' L2 B2");
			else if(layout[1][0][0][0] == layout[1][0][1][0] && layout[4][0][2][0] == layout[4][0][1][0]) //Ab
				changeArr("F R' F L2 F' R F L2 F2");
			else if(layout[0][0][1][0] == layout[0][0][2][0] && layout[5][0][0][0] == layout[5][0][1][0]) //Ja
			{
				changeArr("R' U2 R U R' U2 L U' R U L'");
			}
			else if(layout[0][0][1][0] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][1][0]) //F
				changeArr("R2 F R F' R' U' F' U F R2 U R' U' R");
			else if(layout[0][0][1][0] == layout[5][0][0][0] && layout[0][0][2][0] == layout[5][0][1][0]) //Rb
				changeArr("R2 F R U R U' R' F' R U2 R' U2 R");
			else if(layout[5][0][0][0] == layout[5][0][1][0]) //Ra
				changeArr("R U' R' U' R U R D R' U' R D' R' U2 R'");
			else if(layout[0][0][1][0] == layout[0][0][2][0] && layout[5][0][1][0] == layout[5][0][2][0]) //Jb
			{
				changeArr("R U2 R' U' R U2 L' U R' U' L")
				//RIP MY BELOVED changeArr("R U R' F' R U R' U' R' F R2 U' R'"); 
			}
			else if(layout[5][0][1][0] == layout[5][0][2][0]) //Ga
				changeArr("L F2 R F' L' F U R' U' F' L F' L'");
			else if(opposite[layout[0][0][1][0]] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][1][0]) //Gb
				changeArr("R' U' R B2 D L' U L U' L D' B2");
			else if(opposite[layout[0][0][1][0]] == layout[0][0][2][0]) //Gd
				changeArr("R U R' F2 D' L U' L' U L' D F2");
			else
				changeArr("R2 Uw' R U' R U R' u R2 B U' B'"); //Gc
		}
		else if(layout[1][0][0][0] == layout[1][0][2][0])
		{
			flipmode = 1;
			if(layout[4][0][2][0] == layout[4][0][1][0] && opposite[layout[1][0][1][0]] == layout[1][0][0][0]) //T
				changeArr("R U R' U' R' F R2 U' R' U' R U R' F'")
			else if(layout[4][0][1][0] == layout[4][0][0][0] && layout[0][0][0][0] == layout[0][0][1][0]) //Aa
				changeArr("B' R B' L2 B R' B' L2 B2");
			else if(layout[0][0][2][0] == layout[0][0][1][0] && layout[5][0][0][0] == layout[5][0][1][0]) //Ab
				changeArr("F R' F L2 F' R F L2 F2");
			else if(layout[1][0][1][0] == layout[1][0][0][0] && layout[4][0][2][0] == layout[4][0][1][0]) //Ja
				changeArr("R' U2 R U R' U2 L U' R U L'");
			else if(layout[1][0][1][0] == layout[1][0][0][0] && opposite[layout[4][0][2][0]] == layout[4][0][1][0]) //F
				changeArr("R2 F R F' R' U' F' U F R2 U R' U' R");
			else if(layout[1][0][1][0] == layout[4][0][2][0] && layout[1][0][0][0] == layout[4][0][1][0]) //Rb
				changeArr("R2 F R U R U' R' F' R U2 R' U2 R");
			else if(layout[4][0][2][0] == layout[4][0][1][0]) //Ra
				changeArr("R U' R' U' R U R D R' U' R D' R' U2 R'");
			else if(layout[1][0][1][0] == layout[1][0][0][0] && layout[4][0][1][0] == layout[4][0][0][0]) //Jb
				changeArr("R U2 R' U' R U2 L' U R' U' L")
				//RIP MY BELOVED changeArr("R U R' F' R U R' U' R' F R2 U' R'"); 
			else if(layout[4][0][1][0] == layout[4][0][0][0]) //Ga
				changeArr("L F2 R F' L' F U R' U' F' L F' L'");
			else if(opposite[layout[1][0][1][0]] == layout[1][0][0][0] && opposite[layout[4][0][2][0]] == layout[4][0][1][0]) //Gb
				changeArr("R' U' R B2 D L' U L U' L D' B2");
			else if(opposite[layout[1][0][1][0]] == layout[1][0][0][0]) //Gd
				changeArr("R U R' F2 D' L U' L' U L' D F2");
			else
				changeArr("R2 Uw' R U' R U R' u R2 B U' B'"); //Gc
		}
		else if(opposite[layout[0][0][0][0]] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][2][0])
		{
			if(layout[5][0][0][0] == layout[5][0][1][0] && layout[0][0][1][0] == layout[0][0][2][0]) //V
				changeArr("R' U R' d' R' F' R2 U' R' U R' F R F");
			else if(layout[5][0][0][0] == layout[5][0][1][0] && layout[1][0][0][0] == layout [1][0][1][0]) //Y
				changeArr("R2 U' R' U R U' B' R' F R' F' R' B R");
			else if(layout[5][0][0][0] == layout[5][0][1][0] && layout[0][0][0][0] == layout[0][0][1][0]) //Nb
				changeArr("L' U R' d2 R U' L R' U L' U2 l F' r");
			else if(layout[5][0][1][0] == layout[5][0][2][0] && layout[0][0][1][0] == layout[0][0][2][0]) //Na
				changeArr("R U' L d2 L' U L R' U' R U2 r' F l'")
			else if(layout[5][0][0][0] != layout[5][0][1][0] && layout[5][0][2][0] != layout[5][0][1][0]
			&& layout[4][0][0][0] != layout[4][0][1][0] && layout[4][0][2][0] != layout[4][0][1][0] && layout[5][0][0][0] == opposite[layout[0][0][1][0]])
				changeArr("R B L B' R' B F R F' L' F R' B' F'"); //E 
			else if(layout[4][0][2][0] == layout[4][0][1][0] && layout[1][0][1][0] == layout[1][0][0][0]) //V
			{
				flipmode = 1;
				changeArr("R' U R' d' R' F' R2 U' R' U R' F R F");
			}
			else if(layout[4][0][2][0] == layout[4][0][1][0] && layout[0][0][2][0] == layout [0][0][1][0]) //Y
			{
				flipmode = 1
				changeArr("F R U' R' U' R U R' F' R U R' U' R' F R F'");
			}
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
		document.getElementById("fraction").innerHTML = "9/10):";
		flipmode2 = 0;
		flipmode = 0;
		 setLayout();
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
				changeArr("M2 u M2 u' S M2 S'")
			}
			else
				changeArr("M' U M2 U M2 U M' U2 M2")
		}
		if(correctPFL() == 1)
		{
			if(layout[4][0][1][0] == layout[4][0][2][0])
			{
				if(layout[5][0][1][0] == layout[0][0][0][0])
				{
					changeArr("M2 U' M U2 M' U' M2");
					console.log("Sfs");
				}
				else
				{
					changeArr("M2 U M U2 M' U M2");
					console.log("esf");
				}
			}
			else if(layout[5][0][1][0] == layout[5][0][2][0])
			{
				flipmode = 1;
				if(layout[4][0][1][0] == layout[1][0][2][0])
				{
					changeArr("M2 U' M U2 M' U' M2");
					console.log("fdsfsd");
				}
				else
				{
					changeArr("M2 U M U2 M' U M2");
					console.log("sdff")
				}
					
			}
			else
			{
				arr = ["U'"]
			}
		}
		multipleCross3(0);
	}
	else if(layout[5][0][1][0] != layout[5][1][1][0])
	{
		document.getElementById("step").innerHTML = "Adjusting Upper Face (AUF)";
		document.getElementById("fraction").innerHTML = "10/10):";
		flipmode2 = 0;
		flipmode = 0;
		 setLayout();
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
		movesarr.push(moves);
		if(ao5.length<5)
		{
			ao5.push(Math.round(timer.getTime() / 100)/10.0);
			mo5.push(Math.round(timer.getTime() / 100)/10.0);
		}
		else
		{
			ao5.push(Math.round(timer.getTime() / 100)/10.0);
			mo5.push(Math.round(timer.getTime() / 100)/10.0);
			ao5.shift()
		}
		saystep = 0;
		canMan = true;
	}
  }
  function multipleCross3(nb) {
	if(MODE != "normal")
	{
		flipmode = 0;
		flipmode2 = 0;
		return;
	}
	flipmode2=0;
	setLayout();
    if (nb < arr.length) {
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		moves++;
		let secs = 375-SPEED*225;
		secs += DELAY*1000;
		if(secs < 20)
			secs = 20;
		setTimeout(multipleCross3.bind(null, nb + 1), secs);
    }
	else
	{
		//sleep(1000);
		flipmode2 = 0;
		setLayout();
		stepThree();
		console.log("done");
	}
  }
  function multipleCross2(nb) {
	if(MODE != "normal")
	{
		flipmode = 0;
		flipmode2 = 0;
		return;
	}
	setLayout();
    if (nb < arr.length) {
		canMan = false;
		moves++;
		notation(arr[nb]);
		console.log(nb);
		let secs = 375-SPEED*225;
		secs += DELAY*1000;
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
		moves++;
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		let secs = 375-SPEED*225;
		secs += DELAY*1000;
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
	  setLayout();
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
			  i = -1;
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
  function goodF2L(){
	  if(layout[5][2][2][0] == color && layout[3][2][2][0] == layout[0][2][1][0] && layout[1][2][2][0] == layout[3][1][0][0]) return 2;
	  if(layout[1][2][2][0] == color && layout[5][2][2][0] == layout[3][0][1][0] && layout[3][2][2][0] == layout[4][2][1][0]) return 2;
	  if(layout[5][2][2][0] == color && layout[3][2][2][0] == layout[3][1][2][0] && layout[1][2][2][0] == layout[1][2][1][0]) return 2;
	  if(layout[1][2][2][0] == color && layout[5][2][2][0] == layout[5][2][1][0] && layout[3][2][2][0] == layout[3][2][1][0]) return 2;
	  if(layout[0][2][2][0] == color && layout[5][2][0][0] == layout[3][0][1][0] && layout[3][2][0][0] == layout[4][2][1][0]) return 1;
	  if(layout[5][2][0][0] == color && layout[0][2][2][0] == layout[3][1][2][0] && layout[3][2][0][0] == layout[1][2][1][0]) return 1;
	  if(layout[0][2][2][0] == color && layout[5][2][0][0] == layout[5][2][1][0] && layout[3][2][0][0] == layout[3][2][1][0]) return 1;
	  if(layout[5][2][0][0] == color && layout[0][2][2][0] == layout[0][2][1][0] && layout[3][2][0][0] == layout[3][1][0][0]) return 1;
	  if(layout[1][2][0][0] == color && layout[4][2][2][0] == layout[3][2][1][0] && layout[3][0][2][0] == layout[5][2][1][0]) return 3;
	  if(layout[1][2][0][0] == layout[3][1][0][0] && layout[4][2][2][0] == color && layout[3][0][2][0] == layout[0][2][1][0]) return 3;
	  if(layout[1][2][0][0] == color && layout[4][2][2][0] == layout[4][2][1][0] && layout[3][0][2][0] == layout[3][0][1][0]) return 3;
	  if(layout[1][2][0][0] == layout[1][2][1][0] && layout[4][2][2][0] == color && layout[3][0][2][0] == layout[3][1][2][0]) return 3;
	  if(layout[4][2][0][0] == color && layout[0][2][0][0] == layout[3][1][2][0] && layout[3][0][0][0] == layout[1][2][1][0]) return 4;
	  if(layout[4][2][0][0] == layout[3][2][1][0] && layout[0][2][0][0] == color && layout[3][0][0][0] == layout[5][2][1][0]) return 4;
	  if(layout[4][2][0][0] == color && layout[0][2][0][0] == layout[0][2][1][0] && layout[3][0][0][0] == layout[3][1][0][0]) return 4;
	  if(layout[4][2][0][0] == layout[4][2][1][0] && layout[0][2][0][0] == color && layout[3][0][0][0] == layout[3][0][1][0]) return 4;
	  return 0;
  }
  function goodF2L2(){
	  if(layout[5][2][2][0] == color) return 2;
	  if(layout[1][2][2][0] == color) return 2;
	  if(layout[0][2][2][0] == color) return 1;
	  if(layout[5][2][0][0] == color) return 1;
	  if(layout[1][2][0][0] == color) return 3;
	  if(layout[4][2][2][0] == color) return 3;
	  if(layout[4][2][0][0] == color) return 4;
	  if(layout[0][2][0][0] == color) return 4;
	  return 0;
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
	//flipmode2 = 1;
	//console.log("flipmode is " + flipmode2)
	if(flipmode2 == 1)
	{
		//console.log("Got in here");
		for(let x = 0; x < 3; x++)
		{
			for(let y = 0; y < 3; y++)
			{
				let temp2 = layout[0][x][y];
				layout[0][x][y] = layout[1][2-x][y];
				layout[1][2-x][y] = temp2;
			}
		}
		for(let x = 0; x < 3; x++)
		{
			for(let y = 0; y < 3; y++)
			{
				let temp2 = layout[2][x][y];
				layout[2][x][y] = layout[3][x][2-y];
				layout[3][x][2-y] = temp2;
			}
		}
		for (let i = 4; i < 6; i++)
		{
			for(let x = 0; x < 2; x++)
			{
				for(let y = 0; y < 3; y++)
				{
					let temp2 = layout[i][x][y];
					if(y>0 && x == 1)
						continue;
					layout[i][x][y] = layout[i][2-x][2-y];
					layout[i][2-x][2-y] = temp2;
				}
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
	  /*
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
	  */
	  let cl = [];
	  cl[0] = Math.abs(color[0] - 250) + Math.abs(color[1] - 250) + Math.abs(color[2] - 250);
	  cl[1] = Math.abs(color[0] - 219) + Math.abs(color[1] - 18) + Math.abs(color[2] - 18);
	  cl[2] = Math.abs(color[0] - 18) + Math.abs(color[1] - 105) + Math.abs(color[2] - 219);
	  cl[3] = Math.abs(color[0] - 219) + Math.abs(color[1] - 125) + Math.abs(color[2] - 18);
	  cl[4] = Math.abs(color[0] - 209) + Math.abs(color[1] - 219) + Math.abs(color[2] - 18);
	  cl[5] = Math.abs(color[0] - 18) + Math.abs(color[1] - 219) + Math.abs(color[2] - 31);
	  let minpos = 0;
	  for(let i = 0; i < 6; i++)
	  {
		  if(cl[i] < cl[minpos])
		  {
			  minpos = i
		  }
	  }
	  if(minpos == 0)
		  return "w";
	  if(minpos == 1)
		  return "r";
	  if(minpos == 2)
		  return "b";
	  if(minpos == 3)
		  return "o";
	  if(minpos == 4)
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
	dragAction();
  }
  p.touchMoved = () => {
	dragAction();
  }
	function dragAction()
	{
		const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);
		if (hoveredColor) {
			const cuby = getCubyIndexByColor2(hoveredColor);
			if (cuby !== false) {
				if (selectedCuby !== false) {
					dragCube(selectedCuby, selectedColor, cuby, hoveredColor);
				}
			}
		}
	}
	function dragCube(cuby1, color1, cuby2, color2)
	{
		let turnface = [];
		let colorx = -1;
		let colory = -1;
		if(!canMan)
			return;
		if(cuby1 == cuby2 && getColor(color1) == getColor(color2))
			return;
		console.log(cuby1, color1, cuby2, color2)
		for(let i = 0; i < 6; i++)
		{
			colorx = -1;
			colory = -1;
			let times = 0;
			for(let x = 0; x < 3; x++)
			{
				for(let y = 0; y < 3; y++)
				{
					let testnum = +(layout[i][x][y][2] + layout[i][x][y][3]);
					if(testnum == cuby1 || testnum == cuby2)
					{
						times++;
						if(cuby1 == cuby2) times++;
						if(testnum == cuby2)
						{
							colorx = x;
							colory = y;
						}
						
					}
				}
			}
			console.log("times " + times);
			if(times >= 2)
			{
				turnface.push([i,colorx,colory]);
			}
		}
		console.log("turnface is ", turnface);
		if(turnface.length == 1 || (turnface.length == 2 && cuby1 == cuby2))
		{
				console.log("Love me some middle slices");
				let i = turnface[0][0];
				let cuby3 = getPos(cuby1);
				let cuby4 = getPos(cuby2);
				let face1 = getFace(cuby1, color1);
				let face2 = getFace(cuby2, color2);
				if(getPos(cuby1)[0] == getPos(cuby2)[0] && getPos(cuby2)[0] == 0)
				{
					let arrange = [0, 5, 1, 4, 0];
					if(cuby1 == cuby2)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["E"];
						else
							arr = ["E'"]
					}
					else if(i == 0 || i == 5)
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["E'"];
						else
							arr = ["E"];
					else
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["E'"]
						else
							arr = ["E"];
					if(Math.round(timer.getTime() / 100)/10.0 == 0)
						timer.start();
					multiple(0);
					selectedCuby = -1;
					selectedColor = [];
					return;
				}
				if(getPos(cuby1)[1] == getPos(cuby2)[1] && getPos(cuby2)[1] == 0)
				{
					let arrange = [2, 1, 3, 0, 2];
					if(cuby1 == cuby2)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["S"];
						else
							arr = ["S'"];
					}
					else if(i == 1 || i == 2)
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["S'"];
						else
							arr = ["S"];
					else
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["S'"]
						else
							arr = ["S"];
					if(Math.round(timer.getTime() / 100)/10.0 == 0)
						timer.start();
					multiple(0);
					selectedCuby = -1;
					selectedColor = [];
					return;
				}
				if(getPos(cuby1)[2] == getPos(cuby2)[2] && getPos(cuby2)[2] == 0)
				{
					let arrange = [2, 5, 3, 4, 2];
					if(cuby1 == cuby2)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["M"];
						else
							arr = ["M'"]
					}
					else if(i == 2 || i == 5)
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["M'"];
						else
							arr = ["M"];
					else
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["M'"]
						else
							arr = ["M"];
					if(Math.round(timer.getTime() / 100)/10.0 == 0)
						timer.start();
					multiple(0);
					selectedCuby = -1;
					selectedColor = [];
					return;
				}
		}
		if(turnface.length < 2)
		{
			//console.log("length error", turnface);
			return false;
		}
		for(let i = 0; i < turnface.length; i++)
		{
			let testface = turnface[i][0];
			let testx = turnface[i][1];
			let testy = turnface[i][2];
			let testface2 = 0;
			if(turnface.length == 2)
				testface2 = turnface[1-i][0];
			if(Math.round(timer.getTime() / 100)/10.0 == 0)
				timer.start();
			if(layout[testface][testx][testy][0] != getColor(color2) && (turnface.length == 2 || layout[testface][testx][testy][0] != getColor(color1)))
			{
				console.log("working", turnface, layout[testface][testx][testy][0], testface, getColor(color2), getColor(color1));
				let cuby3 = getPos(cuby1);
				let cuby4 = getPos(cuby2);
				let face1 = getFace(cuby1, color1);
				let face2 = getFace(cuby2, color2);
				if(testface == 0){
					let arrange = [2, 5, 3, 4, 2];
					if(turnface.length == 3)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["L"];
						else
							arr = ["L'"]
					}
					else if(testface2 == 3 || testface2 == 4)
					{
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["L"]
						else
							arr = ["L'"];
					}
					else
					{
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["L"]
						else
							arr = ["L'"];
					}
				}
				if(testface == 1){
					let arrange = [2, 5, 3, 4, 2];
					if(turnface.length == 3)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["R'"];
						else
							arr = ["R"]
					}
					else if(testface2 == 3 || testface2 == 4)
					{
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["R"]
						else
							arr = ["R'"];
					}
					else
					{
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["R"]
						else
							arr = ["R'"];
					}
				}
				if(testface == 2){
					let arrange = [0, 5, 1, 4, 0];
					if(turnface.length == 3)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["U'"];
						else
							arr = ["U"]
					}
					else if(testface2 == 0 || testface2 == 5)
					{
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["U"]
						else
							arr = ["U'"];
					}
					else
					{
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["U"]
						else
							arr = ["U'"];
					}
				}
				if(testface == 3){
					let arrange = [0, 5, 1, 4, 0];
					if(turnface.length == 3)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["D"];
						else
							arr = ["D'"]
					}
					else if(testface2 == 0 || testface2 == 5)
					{
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["D"]
						else
							arr = ["D'"];
					}
					else
					{
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["D"]
						else
							arr = ["D'"];
					}
				}
				if(testface == 4){
					let arrange = [0, 2, 1, 3, 0];
					if(turnface.length == 3)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["B'"];
						else
							arr = ["B"];
					}
					else if(testface2 == 2 || testface2 == 1)
					{
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["B"]
						else
							arr = ["B'"];
					}
					else
					{
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["B"]
						else
							arr = ["B'"];
					}
				}
				if(testface == 5){
					let arrange = [0, 2, 1, 3, 0];
					if(turnface.length == 3)
					{
						let index = arrange.indexOf(face1);
						if(arrange[index+1] == face2)
							arr = ["F"];
						else
							arr = ["F'"];
					}
					else if(testface2 == 2 || testface2 == 1)
					{
						if(cuby3[0] < cuby4[0] || cuby3[1] < cuby4[1] || cuby3[2] < cuby4[2])
							arr = ["F"]
						else
							arr = ["F'"];
					}
					else
					{
						if(cuby3[0] > cuby4[0] || cuby3[1] > cuby4[1] || cuby3[2] > cuby4[2])
							arr = ["F"]
						else
							arr = ["F'"];
					}
				}
				multiple(0);
				selectedCuby = -1;
				selectedColor = [];
				return true;
			}
		}
		console.log("Loser_error")
		return false;
	}
  p.windowResized = () => {
	let cnv_div = document.getElementById("cnv_div");
	p.resizeCanvas(DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth, p.windowHeight*0.9, p.WEBGL);
    PICKER.buffer.resizeCanvas(DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth, p.windowHeight * 0.9);
  }

  p.draw = () => {
    const hoveredColor = PICKER.getColor(p.mouseX, p.mouseY);
    //if (hoveredColor && getCubyByColor(hoveredColor) && !p.mouseIsPressed) {	
	
	if (hoveredColor && getCubyByColor(hoveredColor) && !p.mouseIsPressed) {
		CAM.removeMouseListeners();
    } else {
		if(hoveredColor[0] == BACKGROUND_COLOR)
			CAM.attachMouseListeners();
    }

    CAM_PICKER.setState(CAM.getState(), 0);

    renderCube();
  }
  function getFace(cuby1, color1)
  {
	  for(let i = 0; i < 6; i++)
	  {
		  for(let x = 0; x < 3; x++)
		  {
			  for(let y = 0; y < 3; y++)
			  {
				  let testnum = +(layout[i][x][y][2] + layout[i][x][y][3]);
				  if(layout[i][x][y][0] == getColor(color1) && testnum == cuby1)
				  {
					  return i;
				  }
			  }
		  }
	  }
	  return;
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
	  //flipmode2 = 1;
	  return true;
  }
  function defineFlipper()
  {
	flipper["F"] = "B"; flipper["F'"] = "B'"; flipper["U"] = "U"; flipper["U'"] = "U'"; flipper["R"] = "L"; flipper["R'"] = "L'"; flipper["L"] = "R"; 
	flipper["L'"] = "R'"; flipper["B"] = "F"; flipper["B'"] = "F'"; flipper["D"] = "D"; flipper["D'"] = "D'"; flipper["M"] = "M'"; flipper["M'"] = "M"; 
	flipper["E"] = "E"; flipper["E'"] = "E'"; flipper["S'"] = "S"; flipper["S"] = "S'"; flipper["Fw"] = "Bw"; flipper["Fw'"] = "Bw'"; flipper["Uw"] = "Uw"; 
	flipper["Uw'"] = "Uw'"; flipper["Rw"] = "Lw"; flipper["Rw'"] = "Lw'"; flipper["Lw"] = "Rw"; flipper["Lw'"] = "Rw'"; flipper["Bw"] = "Fw"; 
	flipper["Bw'"] = "Fw'"; flipper["Dw"] = "Dw"; flipper["Dw'"] = "Dw'"; flipper["x"] = "x'"; flipper["x'"] = "x";
	flipper["y"] = "y"; flipper["y'"] = "y'"; flipper["z'"] = "z"; flipper["z"] = "z'";
  }
  function defineFlipper2(){ //180 degree rotation around y-axis
	flipper2["F"] = "F"; flipper2["F'"] = "F'"; flipper2["U"] = "D"; flipper2["U'"] = "D'"; flipper2["R"] = "L"; flipper2["R'"] = "L'"; flipper2["L"] = "R"; 
	flipper2["L'"] = "R'"; flipper2["B"] = "B"; flipper2["B'"] = "B'"; flipper2["D"] = "U"; flipper2["D'"] = "U'"; flipper2["M"] = "M'"; flipper2["M'"] = "M"; 
	flipper2["E"] = "E'"; flipper2["E'"] = "E"; flipper2["S'"] = "S'"; flipper2["S"] = "S"; flipper2["Fw"] = "Fw"; flipper2["Fw'"] = "Fw'"; flipper2["Uw"] = "Dw"; 
	flipper2["Uw'"] = "Dw'"; flipper2["Rw"] = "Lw"; flipper2["Rw'"] = "Lw'"; flipper2["Lw"] = "Rw"; flipper2["Lw'"] = "Rw'"; flipper2["Bw"] = "Bw"; 
	flipper2["Bw'"] = "Bw'"; flipper2["Dw"] = "Uw"; flipper2["Dw'"] = "Uw'"; flipper2["x"] = "x'"; flipper2["x'"] = "x";
	flipper2["y"] = "y'"; flipper2["y'"] = "y"; flipper2["z'"] = "z'"; flipper2["z"] = "z";  
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
//WEIRD
//R L' B D U2 R F' D' U L2 F' U' R U R' B D B' (82)

//BELOW 60 MOVES
//R' B D F L' D B L2 D' L' R' U' F U R' U2 B D' (59)
// F D L' R' B' L U F R F' D' R B U D' R L F R F' (57)
// U2 R U' B D B U' L2 F R2 D2 F2 L2 F2 R2 U2 F L2 U' (57, Jaden's WR Scramble)
// R F' D' F U L' B2 R' B' L' R B2 F2 B' R' D' U' (57)
// D F' B2 L D' F L U2 F2 U' D F2 L' R' F L (56, 1.2 second WR)
// F B2 L' F B L' B' F R L' B F' B' L' D' F R2 U (55)
// B R' U B' F R D U' D' L' B F U' B F' D' U' D B' U (55)
//WORLD RECORD SCRAMBLES
//D L' D' F2 U' L F U' B D' U' B' F2 D U' L' U D y y(53, was 60)
//B2 U' R U F' B' U' B F L D R U' B' L' F D' R' U y y (was 59, 69)
//L D' B' D B2 R' D' F' U' L' B U D L' F B D' F' U' y y (was 58, 60)
//D' R' U' L R F' L2 D' U B' D U F D F2 L' D2 (46, was 55)