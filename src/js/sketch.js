import './lib/p5.easycam.js';
import Picker from './picker.js';
import Cuby from './cuby.js';
import {modeData, getUsers, printUsers, putUsers, matchPassword} from "./backend.js";
//Thanks to Antoine Gaubert https://github.com/angauber/p5-js-rubik-s-cube
export default function (p) {
	const CUBYESIZE = 50;
	const DEBUG = false;
	let bruh = 0;
	let CAM;
	let CAM_PICKER;
	let CAMZOOM = -170;
	let alldown;
	let PICKER;
	let CUBE = {};
	let DIM = 50; //50 means 3x3, 100 means 2x2
	let DIM2 = 50;
	let DIM3 = 3;
	let DIM4 = 3;
	let DIM5 = 50;
	let goodsound = true;
	let goodsolved = false;
	let RND_COLORS;
	let GAP = 0;
	let SIZE = 3;
	let nextcuby = [];
	let BORDER_SLIDER;
	let SIZE_SLIDER2;
	let GAP_SLIDER;
	let SPEED_SLIDER;
	let DELAY_SLIDER;
	let TWOBYTWO;
	let THREEBYTHREE;
	let NBYN;
	let ROTX = 2.8
	let ROTY = 7;
	let ROTZ = 2;
	let ZOOM3 = -170;
	let ZOOM2 = -25;
	let CHECK = [];
	let custom = 0;
	let inp;
	let MODE = "normal";
	let INPUT;
	let SPEED = 0.01;
	let DELAY = 0;
	let shufflespeed = 5;
	let easystep = 0;
	let medstep = 0;
	let pllstep = 0;
	let ollstep = 0;
	let m_34step = 0;
	let m_type = 0;
	let m_4step = 0;
	let PLL;
	let REGULAR;
	let SPEEDMODE;
	let TIMEDMODE;
	let MOVESMODE;
	let REGULAR2;
	let SPEEDMODE2;
	let TIMEDMODE2;
	let MOVESMODE2;
	let TIMEGONE;
	let audioon = true;
	let input = "keyboard";
	let scramblemoves = 0;
	let edgeback = false;
	let edgeleft = false;
	let edgebackleft = false;
	let easytime;
	let mindist;
	let minaction;
	let WINDOW = 0.9
	let special = [false, 0.3, false, 0];
	let BACKGROUND_COLOR = 230; //p.color(201, 255, 218);
	let arr = [];
	let obj2 = [];
	let pbls = [];
	let olls = [];
	let m_points = 0;
	let link1 = document.getElementById("link1");
	let m_scramble = [];
	let m_offset = 0;
	let m_pass = 0;
	let inspect = false;
	let giveups = 0;
	let ONEBYTHREE, SANDWICH, CUBE3, CUBE4, CUBE5, CUBE13;
	let SEL, SEL2, SEL3, SEL4, SEL5, SEL6, SEL7, IDMODE, IDINPUT, GENERATE, SETTINGS, VOLUME, HOLLOW, TOPWHITE, TOPPLL, SOUND, KEYBOARD, DARK;
	let SCRAM;
	let INPUT2 = [];
	let CUBE6, CUBE7, CUBE8, CUBE9, CUBE10, CUBE11, CUBE12, CUBE14;
	let bandaged = [];
	let colororder = ["", "r", "o", "y", "g", "b", "w"];
	let colororder2 = ["", "red", "orange", "yellow", "green", "blue", "white"];
	let LEFTMOD;
	let RIGHTMOD;
	let LEFTBAN, RIGHTBAN;
	let modnum = 0;
	let CUSTOM, CUSTOM2;
	let MODDIM = [7,8,9,10,11,12,14];
	let ADDBANDAGE, VIEWBANDAGE;
	let customb = 0;
	let bandaged2 = [];
	let bandaged3 = [];
	let bannum = 1;
	let rotation = [];
	let rotationx = 0;
	let rotationz = 0;
	let round = 1;
	let roundresult = [0, 0]; //left = you, right = bot
	let race = 0;
	let shuffling = false;
	let realtop;
	let colorvalues = [];
	let saveao5 = [];
	let ao5 = [];
	let mo5 = [];
	let movesarr = [];
	let scrambles = [];
	let savesetup = [];
	let song = "CcDdEFfGgAaB";
	const MAX_WIDTH = "767px";
	colorvalues["b"] = "6BAPpVI 3iÐqtUì 4oìz÷óÐ 5þ÷";
	colorvalues["w"] = "4oìyzI# 5v8Hj*Ø 3iÐrò00 4dV";
	colorvalues["y"] = "4oìyÖ@A 5v8GÜOô 6BAQ3Úô 4vP";
	colorvalues["g"] = "2cUin*s 16saûók 5v8HýçA 2OJ";
	colorvalues["o"] = "5v8H}Ô# 4oìAL6U 16s9DI0 5Hñ";
	colorvalues["r"] = "5v8Iècì 4oìzdÎ8 2cUhJvÐ 5ÝP";
	let expandc = {
		"w": "White",
		"y": "Yellow",
		"g": "Green",
		"b": "Blue",
		"o": "Orange",
		"r": "Red"
	 };
	 let allcubies = IDtoReal(IDtoLayout(decode(colorvalues["b"])));
	// attach event

	link1.onclick = function(e) { return myHandler(e); };
	fetch('src/PLL.json')
	.then((response) => response.json())
	.then((obj) => (setPLL(obj)));

	fetch('src/PBL.json')
	.then((response) => response.json())
	.then((obj0) => (setPBL(obj0)));

	fetch('src/OLL.json')
	.then((response) => response.json())
	.then((obj9) => (setOLL(obj9)));
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

if (localStorage.saveao5) {
	saveao5 = JSON.parse(localStorage.saveao5);
	ao5 = saveao5[0];
	mo5 = saveao5[1];
	scrambles = saveao5[2];
	movesarr = saveao5[3];
}
let opposite = [];
opposite["g"] = "b";
opposite["b"] = "g";
opposite["y"] = "w";
opposite["w"] = "y";
opposite["o"] = "r";
opposite["r"] = "o";

let opposite2 = [];
opposite2["L"] = "R";
opposite2["R"] = "L";
opposite2["F"] = "B";
opposite2["B"] = "F";
opposite2["U"] = "D";
opposite2["D"] = "U";
opposite2["M"] = "bruh"


let selectedCuby = -1;
let selectedColor = [];
let dev = 0;
let color = "lol";
let colorTwo = "lmao";
let colorThree = "lmaoliest";
let cubyColors = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
let saystep = 0;
let moves = 0;
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
	
	PICKER = new Picker(p, DEBUG);
	let cnv_div = document.getElementById("cnv_div");
	if (window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches)
	{
		WINDOW = 0.6;
		p.createCanvas(DEBUG ? p.windowWidth / 2 : cnv_div.offsetWidth, p.windowHeight*WINDOW, p.WEBGL);
		PICKER.buffer.resizeCanvas(DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth, p.windowHeight * WINDOW);
	}
	else
	{
		WINDOW = 0.9;
		p.createCanvas(DEBUG ? p.windowWidth / 2 : cnv_div.offsetWidth, p.windowHeight*WINDOW, p.WEBGL);
		PICKER.buffer.resizeCanvas(DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth, p.windowHeight * WINDOW);
	}
	
	p.pixelDensity(1);
	p.frameRate(60);
	p.smooth();
	
	CAM = p.createEasyCam(p._renderer);
	CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
	if(DIM2 == 100)
		CAM.zoom(CAMZOOM+140);
	else
		CAM.zoom(CAMZOOM);
	CAM.rotateX(-p.PI / ROTX);
	CAM.rotateY(-p.PI / ROTY);
	CAM.rotateZ(-p.PI / ROTZ);
	
	reSetup();
	
	
	// hardcoded to do size 50 (3x3x3) 
	//SIZE_SLIDER = p.createSlider(2, 5, 3, 1);
	if(canMan)
	{
		
		GAP_SLIDER = p.createSlider(0, 20, 0, 1);
		GAP_SLIDER.input(() => {
			special[3] = GAP_SLIDER.value();
			reSetup();
		});
		GAP_SLIDER.parent("gap");
		
		if (!localStorage.speed) {
			SPEED_SLIDER = p.createSlider(0.01, 2, 0.01, 0.01);
		} else {
			SPEED = localStorage.speed;
			SPEED_SLIDER = p.createSlider(0.01, 2, SPEED, 0.01);
			SPEED_SLIDER.value(SPEED);
		}
		SPEED_SLIDER.input(sliderUpdate);
		SPEED_SLIDER.parent("slider_div");
		
		DELAY_SLIDER = p.createSlider(0, 4, 0, 0.1);
		DELAY_SLIDER.input(sliderUpdate);
		DELAY_SLIDER.parent("delay");
		DELAY_SLIDER.style('width', '100px');

		if(window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches) //phone computer
		{
			ZOOM3 = -250;
			ZOOM2 = -100;
			CAMZOOM = ZOOM3;
			audioon = false;
			document.getElementById("audio").style.display = 'none';
			goodsound = false;
		}
		var isSafari = window.safari !== undefined || isIpad(); //safari
		if(isSafari) {
			audioon = false;
			document.getElementById("audio").style.display = 'none';
			goodsound = false;
		}
		SIZE_SLIDER2 = p.createSlider(-1000, 300, -(ZOOM3), 5);
		SIZE_SLIDER2.input(sliderUpdate2);
		SIZE_SLIDER2.parent("size");
		SIZE_SLIDER2.style('width', '100px');

		BORDER_SLIDER = p.createSlider(0, 4, 0.3, 0.1);
		BORDER_SLIDER.input(sliderUpdate);
		BORDER_SLIDER.parent("border");
		BORDER_SLIDER.style('width', '100px');
	}
	REGULAR = p.createButton('Normal Mode');
	SPEEDMODE = p.createButton('Speed Mode');
	TIMEDMODE = p.createButton('Stats Mode');
	MOVESMODE = p.createButton('Fewest Moves');
	IDMODE = p.createButton('Save/Load ID');
	SETTINGS = p.createButton('⚙️');
	VOLUME = p.createButton('🔊');
	REGULAR2 = p.createButton('Normal');
	SPEEDMODE2 = p.createButton('Speed');
	TIMEDMODE2 = p.createButton('Stat');
	MOVESMODE2 = p.createButton('FMC');
	
	ONEBYTHREE = p.createButton('1x3x3');
	SANDWICH = p.createButton('Sandwich Cube');
	CUBE3 = p.createButton('Plus Cube');
	CUBE4 = p.createButton('Christmas 3x3');
	CUBE5 = p.createButton('Christmas 2x2');
	CUBE6 = p.createButton('The Jank 2x2');
	CUBE7 = p.createButton('Slice Bandage');
	CUBE8 = p.createButton('The Pillars');
	CUBE9 = p.createButton('Triple Quad');
	CUBE10 = p.createButton('Bandaged 2x2');
	CUBE11 = p.createButton('Z Perm');
	CUBE12 = p.createButton('T Perm');
	CUBE13 = p.createButton('Sandwich Cube');
	CUBE14 = p.createButton('Cube Bandage');
	refreshButtons();


	setDisplay("none", ["mode4", "mode5", "mode6", "mode8", "link1", "timegone"]);

	const SHUFFLE_BTN = p.createButton('Scramble');
	setButton(SHUFFLE_BTN, "shuffle_div", 'btn btn-light', 'border-color: black;', shuffleCube.bind(null, 0));

	TWOBYTWO = p.createButton('2x2');
	setButton(TWOBYTWO, "type", 'btn btn-light btn-sm', 'border-color: black;', changeTwo.bind(null, 0));

	THREEBYTHREE = p.createButton('3x3');
	setButton(THREEBYTHREE, "type2", 'btn btn-warning btn-sm', 'border-color: black;', changeThree.bind(null, 0));

	NBYN = p.createButton('More');
	setButton(NBYN, "type4", 'btn btn-light btn-sm', 'border-color: black; ', cubemode.bind(null, 0));

	SEL = p.createSelect(); //Top
	SEL.parent("select1")

	SEL2 = p.createSelect(); //Left
	SEL2.parent("select2")

	SEL3 = p.createSelect(); //front
	SEL3.parent("select3")

	SEL4 = p.createSelect(); //right
	SEL4.parent("select4")

	SEL5 = p.createSelect(); //bottom
	SEL5.parent("select5")

	SEL6 = p.createSelect(); //right
	SEL6.parent("select6")

	INPUT = p.createSelect(); 
	INPUT.parent("input")

	IDINPUT = p.createSelect(); 
	IDINPUT.parent("idinput")
	IDINPUT.option("Default (solved)");
	IDINPUT.option("Checkerboard");
	IDINPUT.option("Impossible Donut");
	IDINPUT.option("Impossible Solved");
	IDINPUT.option("Autosolve WR scramble");
	IDINPUT.option("3x3 WR scramble");

	SCRAM = p.createSelect(); 
	SCRAM.parent("scram");
	SCRAM.option("Normal");
	SCRAM.option("Last Layer");
	SCRAM.option("Double Turns");
	SCRAM.option("Middle Slices");
	SCRAM.option("Like a 3x3x2")
	SCRAM.option("Gearcube")
	SCRAM.option("Pattern");

	let colors2 = ["blue", "white", "red", "green", "yellow", "orange", "black", "magenta"];
	for(let i = 0; i < colors2.length; i++)
	{
		SEL.option(colors2[i]);
		SEL2.option(colors2[i]);
		SEL3.option(colors2[i]);
		SEL4.option(colors2[i]);
		SEL5.option(colors2[i]);
		SEL6.option(colors2[i]);
	}
	SEL.selected('blue');
	SEL2.selected('orange');
	SEL3.selected('white');
	SEL4.selected('red');
	SEL5.selected('green');
	SEL6.selected('yellow');

  	SEL.changed(change9.bind(null, 0));
	SEL2.changed(change9.bind(null, 0));
	SEL3.changed(change9.bind(null, 0));
	SEL4.changed(change9.bind(null, 0));
	SEL5.changed(change9.bind(null, 0));
	SEL6.changed(change9.bind(null, 0));

	INPUT2[0] = p.createButton("L'", "L'");
	INPUT2[1] = p.createButton("U'", "U'");
	INPUT2[2] = p.createButton("U", "U");
	INPUT2[3] = p.createButton("R", "R");
	for(let i = 0; i < 4; i++)
	{
		INPUT2[i].parent("mover1")
		INPUT2[i].style("margin-right:4px; width:75px; text-align:center;");
		INPUT2[i].mousePressed(inputPressed.bind(null, INPUT2[i].value()));
	}
	INPUT2[4] = p.createButton("B", "B");
	INPUT2[5] = p.createButton("F'", "F'");
	INPUT2[6] = p.createButton("F", "F");
	INPUT2[7] = p.createButton("B'", "B'");
	for(let i = 4; i < 8; i++)
	{
		INPUT2[i].parent("mover2")
		INPUT2[i].style("margin-right:4px; width:75px; text-align:center;");
		INPUT2[i].mousePressed(inputPressed.bind(null, INPUT2[i].value()));
	}
	INPUT2[8] = p.createButton("L", "L");
	INPUT2[9] = p.createButton("D", "D");
	INPUT2[10] = p.createButton("D'", "D'");
	INPUT2[11] = p.createButton("R'", "R'");
	for(let i = 8; i < 12; i++)
	{
		INPUT2[i].parent("mover3")
		INPUT2[i].style("margin-right:4px; width:75px; text-align:center;");
		INPUT2[i].mousePressed(inputPressed.bind(null, INPUT2[i].value()));
	}
	INPUT2[12] = p.createButton("&larr;", "y");
	INPUT2[13] = p.createButton("&rarr;", "y'");
	INPUT2[14] = p.createButton("&uarr;", "x");
	INPUT2[15] = p.createButton("&darr;", "x'");
	for(let i = 12; i < 16; i++)
	{
		INPUT2[i].parent("mover4")
		INPUT2[i].style("margin-right:4px; width:75px; text-align:center;");
		INPUT2[i].mousePressed(inputPressed.bind(null, INPUT2[i].value()));
	}
	INPUT2[16] = p.createButton("M'", "M'");
	INPUT2[17] = p.createButton("M", "M");
	INPUT2[18] = p.createButton("Undo", "Undo");
	INPUT2[19] = p.createButton("Redo", "Redo");
	for(let i = 16; i < 20; i++)
	{
		INPUT2[i].parent("mover5")
		INPUT2[i].style("margin-right:4px; width:75px; text-align:center;");
	}
	INPUT2[16].mousePressed(inputPressed.bind(null, INPUT2[16].value()));
	INPUT2[17].mousePressed(inputPressed.bind(null, INPUT2[17].value()));
	INPUT2[18].mousePressed(Undo.bind(null, 0));
	INPUT2[19].mousePressed(Redo.bind(null, 0));
	

	for(let i = 0; i < 27; i++)
	{
		if(i < 9)
			CHECK[i] = p.createCheckbox('a' + ((i%9)+1), true);
		else if(i < 18)
			CHECK[i] = p.createCheckbox('b' + ((i%9)+1), true);
		else
			CHECK[i] = p.createCheckbox('c' + ((i%9)+1), true);
		if(i < 9)
			CHECK[i].parent("check1");
		else if(i < 18)
			CHECK[i].parent("check2");
		else
			CHECK[i].parent("check3");
		CHECK[i].style("display:inline; padding-right:5px")
		CHECK[i].changed(change9.bind(null, 0));
	}
	SEL7 = p.createSelect();
	SEL7.option("2x2");
	SEL7.option("3x3");
	SEL7.parent("select8")
	SEL7.selected('3x3');
	SEL7.changed(change9.bind(null, 0));

	INPUT.option("Keyboard");
	INPUT.option("Key-Double");
	INPUT.option("Key-3x3x2");
	INPUT.option("Key-Gearcube");
	INPUT.option("Button");
	if(('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && !matchMedia('(pointer:fine)').matches) //phone computer
		INPUT.selected('Button');
	else
		INPUT.selected('Keyboard');
	
	INPUT.changed(changeInput.bind(null, 0));


	const BACK = p.createButton('Back');
	setButton(BACK, "custom3", 'btn btn-light', 'border-color: black;', cubemode.bind(null, 0));

	const BACK2 = p.createButton('Back');
	setButton(BACK2, "custom5", 'btn btn-light', 'border-color: black;', cubemode.bind(null, 0));

	const IDBACK = p.createButton('Back');
	setButton(IDBACK, "idback", 'btn btn-light', 'font-size:20px; border-color: black;', regular.bind(null, 0));

	const SETTINGSBACK = p.createButton('Back');
	setButton(SETTINGSBACK, "settingsback", 'btn btn-light', 'font-size:20px; border-color: black;', regular.bind(null, 0));

	const IDDEFAULT = p.createButton('Restore defaults');
	setButton(IDDEFAULT, "iddefault", 'btn btn-light', 'font-size:20px; border-color: black;', () => {
		allcubies = false;
		reSetup();
		TOPWHITE.value("White");
		topWhite();
	});

	const SETTINGSDEFAULT = p.createButton('Restore defaults');
	setButton(SETTINGSDEFAULT, "settingsdefault", 'btn btn-light', 'font-size:20px; border-color: black;', settingsDefault.bind(null, 0));

	const DEFAULT = p.createButton('Restore');
	setButton(DEFAULT, "select7", 'btn btn-light', 'font-size:15px; border-color: black;', changeZero.bind(null, 0));

	const DEAFULT2 = p.createButton('Restore');
	setButton(DEAFULT2, "select9", 'btn btn-light', 'font-size:15px; border-color: black;', bandageZero.bind(null, 0));

	const RNG = p.createButton(String.fromCharCode(0x2684));
	setButton(RNG, "rng", 'btn btn-light', 'font-size:15px; border-color: black;', changeRandom.bind(null, 0));

	const RNG2 = p.createButton(String.fromCharCode(0x2684));
	setButton(RNG2, "rng2", 'btn btn-light', 'font-size:15px; border-color: black;', randomBandage.bind(null, 0));

	HOLLOW = p.createCheckbox("", localStorage.hollow === "true" ? true : false);
	HOLLOW.parent("hollow")
	HOLLOW.style("display:inline; padding-right:5px; font-size:20px; height:200px;")
	HOLLOW.changed(hollowCube.bind(null, 0));

	hollowCube();

	DARK = p.createCheckbox("", false);
	DARK.parent("dark")
	DARK.style("display:inline; padding-right:5px; font-size:20px; height:200px;")
	DARK.changed((darkMode.bind(null, 0)));
	
	if (localStorage.background && localStorage.background == 5) {
		darkMode();
	}

	TOPWHITE = p.createSelect(); 
	TOPWHITE.parent("topwhite");
	TOPWHITE.option("White");
	TOPWHITE.option("Blue");
	TOPWHITE.option("Yellow");
	TOPWHITE.option("Green");
	TOPWHITE.option("Orange");
	TOPWHITE.option("Red");
	TOPWHITE.changed(topWhite.bind(null, 0));

	if (localStorage.topwhite) {
		TOPWHITE.value(localStorage.topwhite);
	}

	SOUND = p.createSelect(); 
	if(goodsound){
		SOUND.parent("sounddiv");
		SOUND.option("Speedcube");
		SOUND.option("Windows XP");
	}
	else{
		SOUND.option("Not supported on this device/browser");
	}
	SOUND.parent("sounddiv");

	KEYBOARD = p.createSelect(); 
	KEYBOARD.parent("keyboard");
	KEYBOARD.option("Default");
	KEYBOARD.option("Alt Keyboard");
	changeKeys();
	KEYBOARD.changed(() => {
		changeKeys();
	});

	if(localStorage.keyboard) {
		KEYBOARD.value(localStorage.keyboard);
		changeKeys();
	}

	
	TOPPLL = p.createSelect(); 
	TOPPLL.parent("toppll");
	TOPPLL.option("Opposite of above");
	TOPPLL.option("Same as above");
	TOPPLL.changed(topWhite.bind(null, 0));

	if (localStorage.toppll) {
		TOPPLL.value(localStorage.toppll);
	}

	if(goodsound)
		SETTINGS.position(cnv_div.offsetWidth-140,5);
	else
		SETTINGS.position(cnv_div.offsetWidth-80,5);


	CUSTOM = p.createButton('Custom Shape');
	setButton(CUSTOM, "custom", 'btn btn-primary', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', Custom.bind(null, 0));

	CUSTOM2 = p.createButton('Custom Bandage');
	setButton(CUSTOM2, "customb", 'btn btn-primary', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', Custom2.bind(null, 0));
	
	const RESET = p.createButton('Reset');
	setButton(RESET, "reset_div", 'btn btn-light', 'border-color: black;', reSetup.bind(null, 0));

	const RESET2 = p.createButton('Reset');
	RESET2.parent("reset2_div");
	RESET2.class('btn btn-light');
	RESET2.style('border-color: black;');
	RESET2.mousePressed(moveSetup.bind(null, 0));

	const RESET3 = p.createButton('Reset');
	RESET3.parent("reset3_div");
	RESET3.class('btn btn-light');
	RESET3.style('border-color: black;');
	RESET3.mousePressed(speedSetup.bind(null, 0));

	const STOP = p.createButton('Stop Time');
	setButton(STOP, "stop_div", 'btn btn-light', 'border-color: black;', stopTime.bind(null, 0));

	const HINT = p.createButton('Hint');
	setButton(HINT, "hint", 'btn btn-light', 'border-color: black;', Hint.bind(null, 0));
	
	const GIVEUP = p.createButton('Give Up');
	setButton(GIVEUP, "giveup", 'btn btn-light', 'border-color: black;', giveUp.bind(null, 0));

	const UNDO = p.createButton('Undo');
	setButton(UNDO, "undo", 'btn btn-light', 'border-color: black;', Undo.bind(null, 0));
	
	const REDO = p.createButton('Redo');
	setButton(REDO, "redo", 'btn btn-light', 'border-color: black;', Redo.bind(null, 0));
	
	const SOLVE = p.createButton('Auto-Solve');
	setButton(SOLVE, "solve", 'btn btn-light', 'border-color: black;', solveCube.bind(null, 0));
	
	const EASY = p.createButton('Easy');
	setButton(EASY, "s_easy", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color:#42ff58; border-color: black;', easy.bind(null, 0));

	const M_34 = p.createButton('3 to 5 Movers');
	setButton(M_34, "m_34", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color:#42ff58; border-color: black;', m_34.bind(null, 0));

	const M_4 = p.createButton('Endless (Medium)');
	setButton(M_4, "m_4", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color:#ff9ee8; border-color: black;', m_4.bind(null, 0));

	const IDCOPY = p.createButton('Copy');
	IDCOPY.parent("idcopy");
	IDCOPY.mousePressed();

	document.getElementById('idcopy').addEventListener('click', function() { //copy button
		// Thank you Stack Overflow
		navigator.clipboard.writeText(document.getElementById("idcurrent").innerText).then(
			function(){

			})
		  .catch(
			 function() {
				alert("Copying didn't work :("); // error
		  });
	  });

	GENERATE = p.createButton('Generate');
	GENERATE.style("background-color: #42ff58;")
	GENERATE.parent("generate");
	GENERATE.mousePressed(generateID.bind(null, 0));
	
	const MED = p.createButton('Medium');
	setButton(MED, "s_medium", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ff9ee8; border-color: black;', medium.bind(null, 0));

	const OLL = p.createButton('OLL Practice');
	setButton(OLL, "s_OLL", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ffb163; border-color: black;', speedOLL.bind(null, 0));
	
	PLL = p.createButton('PLL/PBL Practice');
	setButton(PLL, "s_PLL", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ffb163; border-color: black;', speedPLL.bind(null, 0));

	const RACE = p.createButton('Start Race');
	setButton(RACE, "s_RACE", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #fc5f53; border-color: black;', speedRace.bind(null, 0));

	const READYBOT = p.createButton('Ready');
	setButton(READYBOT, "readybot", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #42ff58; border-color: black;', speedRace2.bind(null, 0));

	const RACE2 = p.createButton('Continue');
	setButton(RACE2, "s_RACE2", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #42ff58; border-color: black;', speedRace2.bind(null, 0));
	
	inp = p.createInput('');
	inp.parent("test_alg_div");
	inp.size(150);
	
	const GO_BTN = p.createButton('Go!');
	GO_BTN.parent("test_alg_div");
	
	GO_BTN.mousePressed(testAlg.bind(null, 0));	

	TIMEGONE = p.createButton('Remove previous time');
	setButton(TIMEGONE, "timegone2", 'btn btn-light', 'border-color: black;', removeTime.bind(null, 0));

	let TIMEGONE2 = p.createButton('Remove all times');
	setButton(TIMEGONE2, "timegone3", 'btn btn-light', 'border-color: black;', removeAllTimes.bind(null, 0));
	regular();

	let TIMEGONE3 = p.createButton('🗑️');
	TIMEGONE3.parent("timegone5");
	TIMEGONE3.mousePressed(removeSpecificTime.bind(null, 0));	

	LEFTMOD = p.createButton('←');
	setButton(LEFTMOD, "leftmod", 'btn btn-light', 'font-size:15px; width:70px; margin-right:5px; border-color: black;', changeMod.bind(null, 0));

	RIGHTMOD = p.createButton('→');
	setButton(RIGHTMOD, "leftmod", 'btn btn-light', 'font-size:15px; width:70px; margin-right:5px; border-color: black;', changeMod.bind(null, 0));

	LEFTBAN = p.createButton('←');
	setButton(LEFTBAN, "leftban", 'btn btn-light', 'font-size:15px; width:70px; margin-right:5px; border-color: black;', leftBan.bind(null, 0));

	RIGHTBAN = p.createButton('→');
	setButton(RIGHTBAN, "rightban", 'btn btn-light', 'font-size:15px; width:70px; margin-right:5px; border-color: black;', rightBan.bind(null, 0));

	ADDBANDAGE = p.createButton('Add Bandage Group');
	setButton(ADDBANDAGE, "addbandage", 'btn btn-light', 'font-size:18px; border-color: black; margin-top:15px;', addBandage.bind(null, 0));


	VIEWBANDAGE = p.createButton('View/Delete Groups');
	setButton(VIEWBANDAGE, "addbandage4", 'btn btn-light', 'font-size:18px; border-color: black;', viewBandage.bind(null, 0));

	const OKBAN = p.createButton('Done');
	setButton(OKBAN, "okban", 'btn btn-success text-dark', 'width: 180px; height:40px; margin-right:5px; margin-top:5px; border-color: black;', doneBandage.bind(null, 0));

	const CANCELBAN = p.createButton('Cancel');
	setButton(CANCELBAN, "cancelban", 'btn btn-danger text-dark', 'width: 180px; height:40px; margin-right:5px; margin-top:5px; border-color: black;', cancelBandage.bind(null, 0));

	const DELETEBAN = p.createButton('Delete');
	setButton(DELETEBAN, "deleteban", 'btn btn-danger text-dark', 'width: 180px; height:40px; margin-right:5px; margin-top:5px; border-color: black;', deleteBan.bind(null, 0));
	topWhite();
}

//forever
setInterval(() => {
	const timeInSeconds = Math.round(timer.getTime() / 10)/100.0;
	document.getElementById('time').innerText = timeInSeconds;
	document.getElementById('moves').innerText = moves;
	document.getElementById('speed').innerText = Math.round(SPEED*100);
	document.getElementById('delay2').innerText = DELAY;
	document.getElementById('size2').innerText = CAMZOOM * -1;
	document.getElementById('border2').innerText = special[1];
	document.getElementById('gap2').innerText = special[3];
	displayAverage();
	displayTimes();
	setLayout();
	let secs = 375-SPEED*225;
	if(secs < 20)
	secs = 20;
	if(scrambles.length < mo5.length)
		scrambles.push(document.getElementById('scramble').innerText);
	let easyarr = [50,100,3,2,4,7,5,1,6,8,9,10,11,12,13,14,15,16,17,18];
	easytime = (easyarr.includes(DIM) || custom == 2 || (Array.isArray(DIM) && DIM[0] != "adding" && ((DIM4 == 2 && (DIM[6].length < 20 || difColors())) || (goodsolved && difColors()) || DIM[6].length == 0)));
	if(Array.isArray(DIM) && DIM[0] != "adding" && DIM[6].includes(4) && DIM[6].includes(10) && DIM[6].includes(12) && DIM[6].includes(13) &&
	DIM[6].includes(14) && DIM[6].includes(16) && DIM[6].includes(22) && special[0] == false)
		goodsolved = true;
	else
		goodsolved = false;

	if (MODE != "speed" && MODE != "moves") {
		saveao5 = [ao5, mo5, scrambles, movesarr];
	}
	//local
	localStorage.saveao5 = JSON.stringify(saveao5);
	localStorage.speed = SPEED;
	localStorage.topwhite = TOPWHITE.value();
	localStorage.toppll = TOPPLL.value();
	localStorage.keyboard = KEYBOARD.value();
	localStorage.background = BACKGROUND_COLOR;
	localStorage.hollow = HOLLOW.checked();
	localStorage.audioon = audioon;
	if (!localStorage.username) 
		localStorage.username = "signedout";
	document.getElementById("login").style.display = localStorage.username == "signedout" ? "inline" : "none";
	document.getElementById("account").style.display = localStorage.username == "signedout" ? "inline" : "none";
	document.getElementById("inaccount").style.display = localStorage.username == "signedout" ? "none" : "inline";
	document.getElementById("loginname").innerHTML = localStorage.username == "signedout" ? "Not logged in" : "<i class='bi bi-file-person'></i> " + localStorage.username;
	document.getElementById("l_form").style.display = localStorage.username == "signedout" ? "block" : "none";
	document.getElementById("l_bigforgot").style.display = localStorage.username == "signedout" ? "block" : "none";
	document.getElementById("l_load").style.display = localStorage.username == "signedout"  || MODE == "account" ? "none" : "block";
	document.getElementById("l_home").style.display = localStorage.username == "signedout" ? "none" : "block";
	updateScores();
	
	if(isSolved() && timer.getTime() > secs && timer.isRunning && (MODE == "normal" || MODE == "timed" || (MODE == "cube" && easytime) || race > 1))
	{
		timer.stop();
		flipmode2 = 0;
		console.log("okk " + canMan + " k");
		movesarr.push(moves);
		if(true == true)
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
				ao5.shift();
			}
		}
		if(race > 1){ //racedetect
			console.log("racedetect");
			round++;
			roundresult[1]++;
			roundresult.push([Math.round(timer.getTime() / 10)/100.0, 1]);
			if(roundresult[1] < 5){
				document.getElementById("s_INSTRUCT").innerHTML = "Bot Wins!";
				document.getElementById("s_instruct").innerHTML = "Press continue to go to the next round!";
				document.getElementById("s_instruct2").innerHTML = "Your points: <div style = 'color: green; display: inline;'>" + roundresult[0] + "</div><br>Bot points: <div style = 'color: red; display: inline;'>" + roundresult[1] + "</div>";
				document.getElementById("s_RACE2").style.display = "block";
				raceTimes();
			}
			else{
				document.getElementById("s_INSTRUCT").innerHTML = "You were defeated by the bot :(";
				document.getElementById("s_instruct").innerHTML = "Do you want to play again?";
				document.getElementById("s_instruct2").innerHTML = "Your points: <div style = 'color: green; display: inline;'>" + roundresult[0] + "</div><br>Bot points: <div style = 'color: red; display: inline;'>" + roundresult[1] + "</div>";
				document.getElementById("s_RACE").style.display = "block";
				raceTimes();
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
			ao5 = [Math.round(timer.getTime() / 10)/100.0];
			easy();
		}
		else if(((numCross() == 4 && DIM == 50) || (cornerCross()[0] == 4 && DIM == 100)) && easystep == 3)
		{
			timer.stop();
			easystep++;
			console.log("wefg")
			ao5.push(Math.round(timer.getTime() / 10)/100.0);
			easy();
		}
		else if(easystep == 5)
		{
			if(DIM == 50)
			{
				for(let i = 0; i < 6; i++)
				{
					if(layout[i][1][1][0] == "g" && layout[i][0][0][0] == layout[i][0][2][0] && layout[i][0][0][0] == layout[i][2][0][0] && 
					layout[i][0][0][0] == layout[i][2][2][0])
					{
						timer.stop();
						ao5.push(Math.round(timer.getTime() / 10)/100.0);
						easystep++;
						easy();
					}	
				}
			}
			else if(greenLayer() && DIM == 100)
			{
				timer.stop();
				ao5.push(Math.round(timer.getTime() / 10)/100.0);
				easystep++;
				easy();
			}
		}
		else if(easystep == 7)
		{
			if((twoLines() && DIM == 50) || (isSolved() && DIM == 100))
			{
				timer.stop();
				ao5.push(Math.round(timer.getTime() / 10)/100.0);
				easystep++;
				easy();
			}
		}
		else if(medstep == 1 && mostSolved() == 9 || medstep == 3 && isSolved() || medstep == 5 && oppositeCross() || medstep == 7 && twobytwo() >= 3)
		{
			timer.stop();
			if(ao5 == 0)
			ao5 = [Math.round(timer.getTime() / 10)/100.0];
			else
			ao5.push(Math.round(timer.getTime() / 10)/100.0);
			medstep++;
			medium();
		}
		else if(isSolved() && pllstep % 2 == 1)
		{
			timer.stop();
			if(ao5 == 0)
			ao5 = [Math.round(timer.getTime() / 10)/100.0];
			else
			ao5.push(Math.round(timer.getTime() / 10)/100.0);
			console.log("you", ao5);
			pllstep++;
			speedPLL();
		}
		else if(sideSolved(realtop) && ollstep % 2 == 1)
		{
			timer.stop();
			if(ao5 == 0)
			ao5 = [Math.round(timer.getTime() / 10)/100.0];
			else
			ao5.push(Math.round(timer.getTime() / 10)/100.0);
			console.log("you", ao5);
			ollstep++;
			speedOLL();
		}
		
	}
	else if(MODE == "moves")
	{
		document.getElementById("points_par").innerHTML = "Total Points: " + m_points;
		document.getElementById("giveup2").innerHTML = "&nbsp;&nbsp;Lives: " + giveups;
		for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
			if (CUBE[i].animating()) {
				return;
			}
		}  
		if(m_34step > 0 && m_34step % 2 == 1 && isSolved() && moves <= scramblemoves && moves > 0)
		{
			timer.stop();
			m_pass++;
			if(movesarr == 0)
			movesarr = [moves];
			else
			movesarr.push(moves);
			m_34step++;
			if(m_type == -1) m_points += 1;
			if(m_type == 0) m_points += 2;
			if(m_type == 1) m_points += 3;
			if(m_type == 2) m_points += 5;
			m_34();
		}
		else if(m_4step > 0 && m_4step % 2 == 1 && isSolved() && moves <= m_type && moves > 0)
		{
			timer.stop();
			m_pass++;
			if(movesarr == 0)
			movesarr = [moves];
			else
			movesarr.push(moves);
			m_4step++;
			m_points += parseInt(Math.pow(1.5, m_type));
			m_4();
		}
		else if((m_34step > 0 || m_4step > 0) && isSolved() && moves > 0)
		{
			document.getElementById("s_instruct").innerHTML = "Even though the cube might be solved, you used too many moves! Tip: You can press the 'reset' button to reset the scramble.";
		}
	}
	if(MODE != "cube")
	{
		if(DIM == 50)
			DIM4 = 3;
		else
			DIM4 = 2;
	}
	else{
		if(Array.isArray(DIM) && DIM[0] != "adding")
			DIM4 = DIM3;
		else if(DIM == 5 || DIM == 10)
			DIM4 = 2;
		else
			DIM4 = 3;
	}
	if(MODE == "cube" && Array.isArray(DIM) && DIM[0] != "adding")
	{
		if(!((DIM4 == 2 && (DIM[6].length < 20 || difColors())) || (goodsolved && difColors()) || DIM[6].length == 0)){
			document.getElementById("spacetime").style.display = "block";
			document.getElementById("stop_div").style.display = "inline";
		}
		else{
			document.getElementById("spacetime").style.display = "none";
			document.getElementById("stop_div").style.display = "none";
		}
	}
	if(MODE == "cube" && DIM != 2 && !MODDIM.includes(DIM)) document.getElementById("turnoff").innerHTML = "(Mouse inputs are turned off.)";
	else document.getElementById("turnoff").innerHTML = "(Mouse inputs are turned on.)";
	if(MODE == "cube" && modnum != 1)bandaged = [];
	if(document.getElementById("idcurrent").innerHTML != getID()) document.getElementById("idcurrent").innerHTML = getID();
	if(TOPPLL.value() == "Opposite of above" && MODE == "speed")
		realtop = opposite[TOPWHITE.value()[0].toLowerCase()];
	else
		realtop = TOPWHITE.value()[0].toLowerCase();
	special[2] = IDtoReal(IDtoLayout(decode(colorvalues[realtop])));
}, 10)
function reSetup(rot) {
	m_points = 0;
	CUBE = {};
	arr = [];
	undo = [];
	redo = [];
	canMan = true;
	flipmode = 0;
	flipmode2 = 0;
	easystep = 0;
	medstep = 0;
	//bruh = 0;
	m_34step = 0;
	ollstep = 0;
	pllstep = 0;
	CAM = p.createEasyCam(p._renderer);
	CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);

	if(MODE != "cube")
	{
		if(DIM == 50)
			DIM4 = 3;
		else
			DIM4 = 2;
	}
	else{
		if(Array.isArray(DIM) && DIM[0] != "adding")
			DIM4 = DIM3;
		else if(DIM == 5 || DIM == 10)
			DIM4 = 2;
		else
			DIM4 = 3;
	}
	if(DIM4 == 2)
		CAM.zoom(CAMZOOM+140);
	else
		CAM.zoom(CAMZOOM);

	if(window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches)
	{
		ROTX = 3;
		ROTY = 6;
		ROTZ = 2;
	}
	else{
		ROTX = 2.8;
		ROTY = 7;
		ROTZ = 2;
	}
	
	//undo = [];
	//redo = [];
	moves = 0;
	timer.stop();
	if(race < 2){
		timer.reset();
	}
	shufflespeed = 5;
	RND_COLORS = genRndColors();
	document.getElementById('scramble').innerText = "N/A";
	document.getElementById("step").innerHTML = "";
	document.getElementById("stepbig").innerHTML = "";
	document.getElementById("fraction").innerHTML = "";
	document.getElementById("s_instruct").innerHTML = "";
	setDisplay("none", ["s_easy", "s_medium", "s_OLL", "s_PLL", "s_bot", "s_high", "s_RACE", "m_34", "m_4", "m_high", "points_par", "reset2_div", "reset3_div", "giveup", "giveup2", "hint"]);
	
	let cnt = 0;
	//allcubies = false;
	for (let i = 0; i < SIZE; i++) {
		for (let j = 0; j < SIZE; j++) {
			for (let k = 0; k < SIZE; k++) {
				let offset = ((SIZE - 1) * (CUBYESIZE + GAP)) * 0.5;
				let x = (CUBYESIZE + GAP) * i - offset;
				let y = (CUBYESIZE + GAP) * j - offset;
				let z = (CUBYESIZE + GAP) * k - offset;
				if(x == -2)
				{
					CUBE[cnt] = new Cuby(100, x, y, z, RND_COLORS[cnt], PICKER, p, cnt, allcubies, special);
					console.log("here");
				}else
				CUBE[cnt] = new Cuby(DIM, x, y, z, RND_COLORS[cnt], PICKER, p, cnt, allcubies, special);
				cnt++;
			}
		}
	}
	if(rot)
	{
		arr = [];
		CAM.setRotation(rot, 0);
		if(rotationx * rotationz == 0){
			if(rotationx == 1) arr = ["y'"];
			if(rotationx == 2) arr = ["y", "y"];
			if(rotationx == 3) arr = ["y"];
			if(rotationz == 1) arr.push("x");
			if(rotationz == 2){
				arr.push("x");
				arr.push("x");
			}
			if(rotationz == 3) arr.push("x'");
			console.log("Arr is ", arr);
			multiple2(0);
		}
		else{
			rotationx = 0;
			rotationz = 0;
		}
	}
	else{
		rotateIt();
		rotationx = 0;
		rotationz = 0;
	}
	for(let i = 0; i < 27; i++){ //sets up nextcuby
		nextcuby[i] = [];
		for(let j = 0; j < 27; j++){
			if(j == i) continue;
			let sum = Math.abs(CUBE[i].x - CUBE[j].x) + Math.abs(CUBE[i].y - CUBE[j].y) + Math.abs(CUBE[i].z - CUBE[j].z);
			if(sum == 50){
				if(nextcuby[i].length == 0) nextcuby[i] = [j];
				else nextcuby[i].push(j);
			}
		}
	}
}
function to132(num) {
	var order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){|}~ÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
	var base = order.length;
	var str = "", r;
	while (num) {
		r = num % base
		num -= r;
		num /= base;
		str = order.charAt(r) + str;
	}
	return str;
}
function to10(num) {
	var order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){|}~ÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
	var base = order.length;
	let total = 0;
	num = num + "";
	for(let i = num.length-1; i >= 0; i--) {
	  let addto = Math.pow(base, num.length-i-1) * order.indexOf(num[i]); 
	  //console.log(base, num.length-i-1, num[i], order.indexOf(num[i]));
	  total += addto;
	}
	return total;
}
function rotateIt(){
	CAM.rotateX(-p.PI / ROTX);
	CAM.rotateY(-p.PI / ROTY);
	CAM.rotateZ(-p.PI / ROTZ);
}
function changeKeys(){
	if(KEYBOARD.value() == "Default"){
		document.getElementById("changekeys0").innerHTML = "<td><sup></sup><sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup>5</sup> <sub>M</sub></td><td><sup>6</sup> <sub>M</sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td>"
		document.getElementById("changekeys1").innerHTML = "<td><sup>Q</sup> <sub>z'</sub></td><td><sup>W</sup> <sub>B</sub></td><td><sup>E</sup> <sub>L'</sub></td><td><sup>R</sup> <sub>l'</sub></td><td><sup>T</sup> <sub>x</sub></td><td><sup>Y</sup> <sub>x</sub></td><td><sup>U</sup> <sub>r</sub></td><td><sup>I</sup> <sub>R</sub></td><td><sup>O</sup> <sub>B'</sub></td><td><sup>P</sup> <sub>z</sub></td>"
		document.getElementById("changekeys2").innerHTML = "<td><sup>A</sup> <sub>y'</sub></td><td><sup>S</sup> <sub>D</sub></td><td><sup>D</sup> <sub>L</sub></td><td><sup>F</sup> <sub>U'</sub></td><td><sup>G</sup> <sub>F'</sub></td><td><sup>H</sup> <sub>F</sub></td><td><sup>J</sup> <sub>U</sub></td><td><sup>K</sup> <sub>R'</sub></td><td><sup>L</sup> <sub>D'</sub></td><td><sup>;</sup> <sub>y</sub></td>";
		document.getElementById("changekeys3").innerHTML = "<td><sup>Z</sup> <sub>d</sub></td><td><sup>X</sup> <sub>M'</sub></td><td><sup>C</sup> <sub>u'</sub></td><td><sup>V</sup> <sub>l</sub></td><td><sup>B</sup> <sub>x'</sub></td><td><sup>N</sup> <sub>x'</sub></td><td><sup>M</sup> <sub>r'</sub></td><td><sup>,</sup> <sub>u</sub></td><td><sup>.</sup> <sub>M'</sub></td><td><sup>/</sup> <sub>d'</sub></td>";
		document.getElementById("changekeys4").innerHTML = "<td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td colspan = '4'><sup>Space</sup> <sub>stop time</sub></td><td><sup></sup><sub></sub></td><td><sup></sup><sub></sub></td><td><sup></sup><sub></sub></td>";
	}
	else{
		document.getElementById("changekeys0").innerHTML = ""
		document.getElementById("changekeys1").innerHTML = "<td><sup>Q</sup> <sub>S'</sub></td><td><sup>W</sup> <sub>B</sub></td><td><sup>E</sup> <sub>L'</sub></td><td><sup>R</sup> <sub>l'</sub></td><td><sup>T</sup> <sub>u'</sub></td><td><sup>Y</sup> <sub>u</sub></td><td><sup>U</sup> <sub>r</sub></td><td><sup>I</sup> <sub>R</sub></td><td><sup>O</sup> <sub>B'</sub></td><td><sup>P</sup> <sub>S</sub></td>"
		document.getElementById("changekeys2").innerHTML = "<td><sup>A</sup> <sub>E</sub></td><td><sup>S</sup> <sub>D</sub></td><td><sup>D</sup> <sub>L</sub></td><td><sup>F</sup> <sub>U'</sub></td><td><sup>G</sup> <sub>F'</sub></td><td><sup>H</sup> <sub>F</sub></td><td><sup>J</sup> <sub>U</sub></td><td><sup>K</sup> <sub>R'</sub></td><td><sup>L</sup> <sub>D'</sub></td><td><sup>;</sup> <sub>E'</sub></td>";
		document.getElementById("changekeys3").innerHTML = "<td><sup>Z</sup> <sub>d</sub></td><td><sup>X</sup> <sub></sub></td><td><sup>C</sup> <sub></sub></td><td><sup>V</sup> <sub>l</sub></td><td><sup>B</sup> <sub>f'</sub></td><td><sup>N</sup> <sub>f</sub></td><td><sup>M</sup> <sub>r'</sub></td><td><sup>,</sup> <sub>M'</sub></td><td><sup>.</sup> <sub>M</sub></td><td><sup>/</sup> <sub>d'</sub></td>";
		document.getElementById("changekeys4").innerHTML = "<td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td colspan = '3'><sup>Space</sup> <sub>stop time</sub></td><td><sup>&larr;</sup><sub>y</sub></td><td><sup>&rarr;</sup><sub>y'</sub></td><td><sup>&uarr;</sup><sub>x</sub></td><td><sup>&darr;</sup><sub>x'</sub></td>";
	}
}
function decode(num){
	//6BAPpVI 3iÐqtUì 4oìz÷óÐ
	//5ñFâwæo 3(Êçm80 4Gm!ðëA checkerboard
	//1ÏdL12T 4@nåCSN 3pllxäß rs3m
	if(num.length < 2) return "";
	let a = "";
	while(num[0] != " " && num.length > 0){
	  a += num[0];
	  if(num.length > 0)
	  num = num.slice(1);
	}
	a = to10(a);
	a = a.toString(7);
	//alert(a);
	if(num.length > 0)
	num = num.slice(1);
	return a + decode(num);
  }
function generateID(){
	let str = "";
	if(IDINPUT.value() == "Default (solved)") str = "4oìyzI# 5v8Hj*Ø 3iÐrò00 4dV";
	if(IDINPUT.value() == "Checkerboard") str = "4GmZGcM 5dÞgcáè 3(ÊèÜæô 4dV";
	if(IDINPUT.value() == "Impossible Donut") str = "5v8Hj*Ø 4oìyzI# 6BAQ3Úô 4dV";
	if(IDINPUT.value() == "Impossible Solved") str = "5v8HýçA 3iÐqtUì 16saûók 5W3";
	if(IDINPUT.value() == "Autosolve WR scramble") str = "2eñOäM( 2UhÑðî& 3éjrÒôÐ 4dV";
	if(IDINPUT.value() == "3x3 WR scramble") str = "4ÝW÷1i^ 31ß*XUY 4WÙIþlÉ 1~@";
	allcubies = IDtoReal(IDtoLayout(decode(str)));
	reSetup();
	setLayout();
	TOPWHITE.selected(expandc[layout[2][1][1][0]]);
}
function IDtoReal(id){
	let a = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	a[0] = ["k", id[4][0][0], "k", id[0][0][0], "k", id[2][0][0]];
	a[1] = ["k", id[4][0][1], "k", "k", "k", id[2][0][1]];
	a[2] = ["k", id[4][0][2], id[1][0][0], "k", "k", id[2][0][2]];
	a[3] = ["k", "k", "k", id[0][0][1], "k", id[2][1][0]];
	a[4] = ["k", "k", "k", "k", "k", id[2][1][1]];
	a[5] = ["k", "k", id[1][0][1], "k", "k", id[2][1][2]];
	a[6] = [id[5][0][0], "k", "k", id[0][0][2], "k", id[2][2][0]];
	a[7] = [id[5][0][1], "k", "k", "k", "k", id[2][2][1]];
	a[8] = [id[5][0][2], "k", id[1][0][2], "k", "k", id[2][2][2]];
	a[9] = ["k", id[4][1][0], "k", id[0][1][0], "k", "k"];
	a[10] = ["k", id[4][1][1], "k", "k", "k", "k"];
	a[11] = ["k", id[4][1][2], id[1][1][0], "k", "k", "k"];
	a[12] = ["k", "k", "k", id[0][1][1], "k", "k"];
	a[13] = ["k", "k", "k", "k", "k", "k"];
	a[14] = ["k", "k", id[1][1][1], "k", "k", "k"];
	a[15] = [id[5][1][0], "k", "k", id[0][1][2], "k", "k"];
	a[16] = [id[5][1][1], "k", "k", "k", "k", "k"];
	a[17] = [id[5][1][2], "k", id[1][1][2], "k", "k", "k"];
	a[18] = ["k", id[4][2][0], "k", id[0][2][0], id[3][0][0], "k"];
	a[19] = ["k", id[4][2][1], "k", "k", id[3][0][1], "k"];
	a[20] = ["k", id[4][2][2], id[1][2][0], "k", id[3][0][2], "k"];
	a[21] = ["k", "k", "k", id[0][2][1], id[3][1][0], "k"];
	a[22] = ["k", "k", "k", "k", id[3][1][1], "k"];
	a[23] = ["k", "k", id[1][2][1], "k", id[3][1][2], "k"];
	a[24] = [id[5][2][0], "k", "k", id[0][2][2], id[3][2][0], "k"];
	a[25] = [id[5][2][1], "k", "k", "k", id[3][2][1], "k"];
	a[26] = [id[5][2][2], "k", id[1][2][2], "k", id[3][2][2], "k"];

	return a;
	//[front,back,right,left,bottom,top]
	//alert(allcubies);
}
function IDtoLayout(num){
	let copynum = num;
	let bignum = false;
	if(num.length == 54) bignum = true;
	let layout2 = [[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
	[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
	[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
	[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
	[[0, 0, 0],[0, 0, 0],[0, 0, 0]],
	[[0, 0, 0],[0, 0, 0],[0, 0, 0]]];
	let cnt = 0; //white
	for(let x = 2; x >= 0; x--){
		for(let y = 0; y < 3; y++){
		if(cnt == 4){
			layout2[5][x][y] = "w";
			if(bignum && cnt == 4) layout2[5][x][y] = colororder2[copynum[48]][0];
		}
		else {
			layout2[5][x][y] = colororder2[num[0]][0];
			num = num.slice(1);
		}
		cnt++;
		}
	}
	cnt = 0; //red
	for(let x = 2; x >= 0; x--){
		for(let y = 2; y >= 0; y--){
		if(cnt == 4){ 
			layout2[1][x][y] = "r";
			if(bignum && cnt == 4) layout2[1][x][y] = colororder2[copynum[49]][0];
		}
		else {
			layout2[1][x][y] = colororder2[num[0]][0];
			num = num.slice(1);
		}
		cnt++;
		}
	}
	cnt = 0; //yellow
	for(let x = 2; x >= 0; x--){
		for(let y = 2; y >= 0; y--){
		if(cnt == 4){
			layout2[4][x][y] = "y";
			if(bignum && cnt == 4) layout2[4][x][y] = colororder2[copynum[50]][0];
		}
		else {
			layout2[4][x][y] = colororder2[num[0]][0];
			num = num.slice(1);
		}
		cnt++;
		}
	}
	cnt = 0; //orange
	for(let x = 2; x >= 0; x--){
		for(let y = 0; y < 3; y++){
		if(cnt == 4){
			layout2[0][x][y] = "o";
			if(bignum && cnt == 4) layout2[0][x][y] = colororder2[copynum[51]][0];
		}
		else {
			layout2[0][x][y] = colororder2[num[0]][0];
			num = num.slice(1);
		}
		cnt++;
		}
	}
	cnt = 0; //green
	for(let y = 2; y >= 0; y--){
		for(let x = 0; x < 3; x++){
		if(cnt == 4){
			layout2[3][x][y] = "g";
			if(bignum && cnt == 4) layout2[3][x][y] = colororder2[copynum[52]][0];
		}
		else {
			layout2[3][x][y] = colororder2[num[0]][0];
			num = num.slice(1);
		}
		cnt++;
		}
	}
	cnt = 0; //blue
	for(let y = 0; y  < 3; y++){
		for(let x = 0; x < 3; x++){
		if(cnt == 4){
			layout2[2][x][y] = "b";
			if(bignum && cnt == 4) layout2[2][x][y] = colororder2[copynum[53]][0];
		}
		else {
			layout2[2][x][y] = colororder2[num[0]][0];
			num = num.slice(1);
		}
		cnt++;
		}
	}
	return layout2;
}
function setButton(BUTTON, parent, className, style, event) {
	BUTTON.parent(parent);
	BUTTON.class(className);
	BUTTON.style(style);
	BUTTON.mousePressed(event);
}
function getID(){
	let ID = "";
	let ID2 = "";
	let realID = "";
	let cnt = 0;
	for(let x = 2; x >= 0; x--){ //front
		for(let y = 0; y < 3; y++){
			if(cnt == 4)
				ID2 += colororder.indexOf(layout[5][x][y][0]) + "";
			else
				ID += colororder.indexOf(layout[5][x][y][0]) + "";
			cnt++;
		}
	}
	cnt = 0;
	for(let x = 2; x >= 0; x--){ //right
		for(let y = 2; y >= 0; y--){
			if(cnt == 4)
				ID2 += colororder.indexOf(layout[1][x][y][0]) + "";
			else
				ID += colororder.indexOf(layout[1][x][y][0]) + "";
			cnt++;
		}
	}
	let a = parseInt(ID, 7);
	a = to132(a);
	realID += a + " "; 
	ID = "";
	cnt = 0;
	for(let x = 2; x >= 0; x--){ //back
		for(let y = 2; y >= 0; y--){
			if(cnt == 4)
				ID2 += colororder.indexOf(layout[4][x][y][0]) + "";
			else
				ID += colororder.indexOf(layout[4][x][y][0]) + "";
			cnt++;
		}
	}
	cnt = 0;
	for(let x = 2; x >= 0; x--){ //left
		for(let y = 0; y < 3; y++){
			if(cnt == 4)
				ID2 += colororder.indexOf(layout[0][x][y][0]) + "";
			else
				ID += colororder.indexOf(layout[0][x][y][0]) + "";
			cnt++;
		}
	}
	a = parseInt(ID, 7);
	a = to132(a);
	realID += a + " "; 
	ID = "";
	cnt = 0;
	for(let y = 2; y >= 0; y--){ //bottom
		for(let x = 0; x < 3; x++){
			if(cnt == 4)
				ID2 += colororder.indexOf(layout[3][x][y][0]) + "";
			else
				ID += colororder.indexOf(layout[3][x][y][0]) + "";
			cnt++;
		}
	}
	cnt = 0;
	for(let y = 0; y < 3; y++){ //top
		for(let x = 0; x < 3; x++){
			if(cnt == 4)
				ID2 += colororder.indexOf(layout[2][x][y][0]) + "";
			else
				ID += colororder.indexOf(layout[2][x][y][0]) + "";
			cnt++;
		}
	}
	a = parseInt(ID, 7);
	a = to132(a);
	realID += a + " "+ to132(parseInt(ID2, 7)); 
	return realID;
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
					CUBE[cnt] = new Cuby(100, x, y, z, RND_COLORS[cnt], PICKER, p, cnt, special[2], special);
					console.log("here");
				}else
				CUBE[cnt] = new Cuby(DIM, x, y, z, RND_COLORS[cnt], PICKER, p, cnt, special[2], special);
				cnt++;
			}
		}
	}
}
function speedSetup()
{
	if(document.getElementById("s_instruct").innerHTML.includes("In one game of") ||
	document.getElementById("s_instruct").innerHTML.includes("Your final"))
	{
		CAM = p.createEasyCam(p._renderer);
		CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
		if(DIM2 == 100)
			CAM.zoom(CAMZOOM+140);
		else
			CAM.zoom(CAMZOOM);
		rotateIt();
		quickSolve();
		return;
	}
	special[2] = savesetup;
	quickSolve();
	//reSetup();
}
function moveSetup()
{
	if(document.getElementById("s_instruct").innerHTML.includes("In one game of") ||
	document.getElementById("s_instruct").innerHTML.includes("Your final"))
	{
		CAM = p.createEasyCam(p._renderer);
		CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
		if(DIM2 == 100)
			CAM.zoom(CAMZOOM+140);
		else
			CAM.zoom(CAMZOOM);
		rotateIt();
		quickSolve();
		return;
	}
	moves = 0;
	special[2] = savesetup;
	quickSolve();
	
}
function Hint()
{
	if(document.getElementById("s_instruct").innerHTML.includes("The first move is a"))
	{
		return;
	}
	if(giveups <= 0.5)
	{
		document.getElementById("s_instruct").innerHTML = "You need at least one life to get a hint.";
		return;
	}
	if(m_4step > 0 && m_4step % 2 == 1)
	{
		document.getElementById("s_instruct").innerHTML = "The first move is a " + Reverse(m_scramble[m_scramble.length-1]) + " and the last move is a " + Reverse(m_scramble[0]);
		giveups -= 0.5;
	}
	else if(m_34step > 0 && m_34step % 2 == 1)
	{
		document.getElementById("s_instruct").innerHTML = "The first move is a " + Reverse(m_scramble[m_scramble.length-1]) + " and the last move is a " + Reverse(m_scramble[0]);
		giveups -= 0.5;
	}
}
function difColors()
{
	if(!Array.isArray(DIM)) return false;
	const colors = new Set();
	colors.add(DIM[0]);
	colors.add(DIM[1]);
	colors.add(DIM[2]);
	colors.add(DIM[3]);
	colors.add(DIM[4]);
	colors.add(DIM[5]);
	//console.log(colors);
	if(colors.size > 4 && DIM4 == 2) return true;
	if(colors.size > 5 && DIM4 == 3) return true;
	return false;
}
function stopTime(){
	//alert(moves);
	if(timer.isRunning && moves > 0)
	{
		timer.stop();
		movesarr.push(moves);
		if(ao5.length<5)
		{
			ao5.push(Math.round(timer.getTime() / 10)/100.0);
			mo5.push(Math.round(timer.getTime() / 10)/100.0);
		}
		else
		{
			ao5.push(Math.round(timer.getTime() / 10)/100.0);
			mo5.push(Math.round(timer.getTime() / 10)/100.0);
			ao5.shift()
		}
		displayAverage();
	}
}
function stopMoving(){
	timer.stop();
	arr = [];
	canMan = true;
	document.getElementById("stepbig").innerHTML = "";
	document.getElementById("step").innerHTML = "";
	document.getElementById("fraction").innerHTML = "";
}
function giveUp()
{
	if(m_4step > 0 && m_4step % 2 == 1)
	{
		if(giveups > 0.5)
			giveups--;
		else
			giveups = 0;
		if(giveups > 0)
		{
			m_4step++;
			m_4();
		}
		else
		{
			m_4step += 0.5;
			m_4();
		}
	}
	else if(m_34step > 0 && m_34step % 2 == 1)
	{
		if(giveups > 0.5)
			giveups--;
		else
			giveups = 0;
		if(giveups > 0)
		{
			m_34step++;
			m_34();
		}
		else
		{
			m_34step += 0.5;
			m_4();
		}
	}
}
function changeTwo()
{
	DIM2 = 100;
	DIM = 100;
	modeData("twobytwo");
	//if(CAMZOOM == ZOOM3) CAMZOOM = ZOOM2;
	THREEBYTHREE.remove();
	THREEBYTHREE = p.createButton('3x3');
	setButton(THREEBYTHREE, "type2", 'btn btn-light btn-sm', 'border-color: black;', changeThree.bind(null, 0));
	setButton(TWOBYTWO, "type", 'btn btn-warning btn-sm', 'border-color: black;', changeTwo.bind(null, 0));
	SIZE_SLIDER2.remove();
	SIZE_SLIDER2 = p.createSlider(-1000, 300, -CAMZOOM, 5);
	SIZE_SLIDER2.input(sliderUpdate2);
	SIZE_SLIDER2.parent("size");
	SIZE_SLIDER2.style('width', '100px');
	reSetup();
	if(MODE == "speed")
		speedmode();
	if(MODE == "moves")
		movesmode();
}
function changeThree()
{
	DIM2 = 50;
	DIM = 50;

	setButton(THREEBYTHREE, "type2", 'btn btn-warning btn-sm', 'border-color: black;', changeThree.bind(null, 0));
	TWOBYTWO.remove();
	TWOBYTWO = p.createButton('2x2');
	setButton(TWOBYTWO, "type", 'btn btn-light btn-sm', 'border-color: black;', changeTwo.bind(null, 0));
	SIZE_SLIDER2.remove();
	SIZE_SLIDER2 = p.createSlider(-1000, 300, -CAMZOOM, 5);
	SIZE_SLIDER2.input(sliderUpdate2);
	SIZE_SLIDER2.parent("size");
	SIZE_SLIDER2.style('width', '100px');
	reSetup();
	if(MODE == "speed")
		speedmode();
	if(MODE == "moves")
		movesmode();
}
function changeCam(dim)
{
	reSetup();
}
function bandageZero(){
	bandaged = [];
	doneBandage();
}
function changeZero()
{
	SEL.selected("blue");
	SEL2.selected("orange");
	SEL3.selected("white");
	SEL4.selected("red");
	SEL5.selected("green");
	SEL6.selected("yellow");
	for(let i = 0; i < 27; i++)
	{
		CHECK[i].remove();
	}
	for(let i = 0; i < 27; i++)
	{
		if(i < 9)
			CHECK[i] = p.createCheckbox('a' + ((i%9)+1), true);
		else if(i < 18)
			CHECK[i] = p.createCheckbox('b' + ((i%9)+1), true);
		else
			CHECK[i] = p.createCheckbox('c' + ((i%9)+1), true);
		if(i < 9)
			CHECK[i].parent("check1");
		else if(i < 18)
			CHECK[i].parent("check2");
		else
			CHECK[i].parent("check3");
		CHECK[i].style("display:inline; padding-right:5px")
		CHECK[i].changed(change9.bind(null, 0));
	}
	change9();
}
function changeFour(){
	DIM = 1;
	changeCam(3);
	refreshButtons();
	ONEBYTHREE.style('background-color', "#8ef5ee");
}
function changeFive(){
	DIM = 2;
	changeCam(3);
	refreshButtons();
	SANDWICH.style('background-color', "#8ef5ee");
}
function changeSix(){
	DIM = 3;
	changeCam(3);
	refreshButtons();
	CUBE3.style('background-color', "#8ef5ee");
}
function changeSeven(){
	DIM = 4;
	changeCam(3);
	refreshButtons();
	CUBE4.style('background-color', "#8ef5ee");
}
function change8(){
	DIM = 5;
	DIM2 = 100;
	changeCam(2);
	refreshButtons();
	CUBE5.style('background-color', "#8ef5ee");
}
function change10(){
	DIM = 6;
	changeCam(3);
	refreshButtons();
	CUBE6.style('background-color', "#8ef5ee");
}
function changeBan(dim, b)
{
	bandaged = b;
	DIM = dim;
	changeCam(3);
	refreshButtons();
}
function change11(dim, b){
	changeBan(dim, b)
	CUBE7.style('background-color', "#8ef5ee");
}
function change12(dim, b){
	changeBan(dim, b)
	CUBE8.style('background-color', "#8ef5ee");
}
function change13(dim, b){
	changeBan(dim, b)
	CUBE9.style('background-color', "#8ef5ee");
}
function change14(dim, b){
	bandaged = b;
	DIM = dim;

	changeCam(2);
	refreshButtons();
	CUBE10.style('background-color', "#8ef5ee");
}
function change15(dim, b){
	changeBan(dim, b)
	CUBE11.style('background-color', "#8ef5ee");
}
function change16(dim, b){
	changeBan(dim, b)
	CUBE12.style('background-color', "#8ef5ee");
}
function change17(){
	DIM = 13;

	changeCam(3);
	refreshButtons();
	CUBE13.style('background-color', "#8ef5ee");
}
function change18(dim, b){
	changeBan(dim, b)
	CUBE14.style('background-color', "#8ef5ee");
}
function changeMod(){
	modnum = 1 - modnum;
	if(modnum == 0){ 
		document.getElementById("custom").style.display = "block"; 
		document.getElementById("customb").style.display = "none"; 
	}
	else {
		document.getElementById("custom").style.display = "none"; 
		document.getElementById("customb").style.display = "block"; 
	}
	refreshButtons();
}
function leftBan(){
	if(bannum == 1) bannum = 13;
	else bannum--;
	if(bandaged.length >= bannum) document.getElementById("deleteban").style.display = "block";
	else document.getElementById("deleteban").style.display = "none";

	viewBandage(true);
}
function rightBan(){
	if(bannum == 13) bannum = 1;
	else bannum++;
	if(bandaged.length >= bannum) document.getElementById("deleteban").style.display = "block";
	else document.getElementById("deleteban").style.display = "none";
	viewBandage(true);

}
function change9(cubies)
{

	DIM = [];
	DIM[0] = SEL.value();
	DIM[1] = SEL2.value();
	DIM[2] = SEL3.value();
	DIM[3] = SEL4.value();
	DIM[4] = SEL5.value();
	DIM[5] = SEL6.value();
	if(SEL7.value() == "3x3")
	{
	
		if(DIM3 == 2)
		{
			for(let i = 0; i < 27; i++)
			{
				CHECK[i].remove();
			}
			for(let i = 0; i < 27; i++)
			{
				if(Array.isArray(cubies))
				{
					if(i < 9)
						CHECK[i] = p.createCheckbox('a' + ((i%9)+1), cubies[i]);
					else if(i < 18)
						CHECK[i] = p.createCheckbox('b' + ((i%9)+1),  cubies[i]);
					else
						CHECK[i] = p.createCheckbox('c' + ((i%9)+1),  cubies[i]);
				}
				else{
					if(i < 9)
						CHECK[i] = p.createCheckbox('a' + ((i%9)+1), true);
					else if(i < 18)
						CHECK[i] = p.createCheckbox('b' + ((i%9)+1), true);
					else
						CHECK[i] = p.createCheckbox('c' + ((i%9)+1), true);
				}
				if(i < 9)
					CHECK[i].parent("check1");
				else if(i < 18)
					CHECK[i].parent("check2");
				else
					CHECK[i].parent("check3");
				CHECK[i].style("display:inline; padding-right:5px")
				CHECK[i].changed(change9.bind(null, 0));
			}
			DIM3 = 3;
		}
	}
	else
	{
		DIM3 = 2;
		let arr3 = [1, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25];
		for(let i = 0; i < 27; i++)
		{
			if(arr3.includes(i))
				CHECK[i].remove();
		}

	}

	let checked = [];
	for(let i = 0; i < 27; i++)
	{
		if(!CHECK[i].checked())
			checked.push(i);
	}
	if(DIM3 == 2)
		checked.push(1, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25);
	DIM[6] = checked; 
	DIM[7] = DIM3;
	if(SEL7.value() == "3x3")
	{
		document.getElementById("selectm").style.display = "block";
		//changeCam(3);
	}
	else
	{
		document.getElementById("selectm").style.display = "none";
		//changeCam(2);
	}
	rotation = CAM.getRotation();
	reSetup(rotation);
}
function changeRandom()
{
	let cube;
	if(Math.random() > 0.66)
		cube = 2;
	else
		cube = 3;
	let face = [];
	let cubies = [];
	let colors = ["blue", "white", "red", "green", "yellow", "orange", "black", "magenta"];
	for(let i = 0; i < 6; i++)
	{
		face.push(colors[Math.floor(Math.random()*colors.length)]);
	}
	let close = 8;
	let pick = Math.random()
	if(pick > 0.65)
	close = 6;
	else if(pick > 0.3)
	close = 5;

	if(cube == 2)
	{
		for(let i = 0; i < 8; i++)
		{
			cubies.push(!(Math.random() > (close/8)));
		}
	}
	else
	{
		for(let i = 0; i < 27; i++)
		{
			cubies.push(!(Math.random() > (close/8)));
		}
	}
	if(cube == 2)
	SEL7.selected('2x2');
	else
	SEL7.selected('3x3');
	SEL.selected(face[0]); SEL2.selected(face[1]); SEL3.selected(face[2]); 
	SEL4.selected(face[3]); SEL5.selected(face[4]); SEL6.selected(face[5]);
	let twos = [0, 2, 6, 8, 18, 20, 24, 26];
	if(cube == 3)
	{
		for(let i = 0; i < 27; i++)
		{
			CHECK[i].checked(cubies[i]);
		}
	}
	else{
		for(let i = 0; i < 8; i++)
		{
			CHECK[twos[i]].checked(cubies[i]);
		}
	}
	console.log(cube, cubies);
	change9(cubies);
}
function changeInput()
{
	if(MODE == "normal")
	{
		DELAY_SLIDER.value(0);
		DELAY = 0;
	}
	input = INPUT.value();
	if(input == "Button"){
		document.getElementById("keymap").style.display = "none";
		document.getElementById("test_alg_div").style.display = "none";
		document.getElementById("undo").style.display = "none";
		document.getElementById("redo").style.display = "none";
		document.getElementById("input2").style.display = "block";
	}
	else{
		document.getElementById("keymap").style.display = "table";
		if(MODE == "normal" || MODE == "timed" || MODE == "cube")
			document.getElementById("test_alg_div").style.display = "block";
		document.getElementById("input2").style.display = "none";
		document.getElementById("undo").style.display = "inline";
		document.getElementById("redo").style.display = "inline";
	}

}
function ban9(){
	DIM = [];
	DIM[0] = "adding";
	DIM[1] = bandaged2;
	DIM[2] = bandaged;
	rotation = CAM.getRotation();
	reSetup(rotation);
}
function viewBandage(def){
	customb = 2;
	if(!def)
		bannum = 1;
	setDisplay("block", ["okban"]); 
	setDisplay("none", ["addbandage", "addbandage4", "custom5", "select9", "rng2", "input", "scram", "cancelban"]); 
	setDisplay("inline", ["leftban", "rightban"]);

	if(bandaged.length >= bannum)
		document.getElementById("deleteban").style.display = "block";
	document.getElementById("addbandage2").innerHTML= "<b>Bandaged Group #" + bannum + "</b>";
	if(bandaged.length >= bannum)
		document.getElementById("addbandage3").innerHTML= "Size: " + bandaged[bannum-1].length + " (shown in pink)";
	else
		document.getElementById("addbandage3").innerHTML= "Group is empty";
	if(bandaged.length >= bannum) bandaged2 = bandaged[bannum - 1];
	else bandaged2 = [-2];
	
	ban9();
	//canMan = false;
	
}
function addBandage(){
	customb = 1;
	document.getElementById("addbandage2").innerHTML= "<b>Click the cubies to join bandage group #" + (bandaged.length+1) + "</b>";
	document.getElementById("addbandage3").innerHTML= "Avoid clicking on already bandaged cubies (shown in black).";
	setDisplay("none", ["rng2", "addbandage", "addbandage4", "custom5", "select9", "input", "scram", "deleteban"]);
	setDisplay("block", ["okban", "cancelban"]);
	bandaged2 = [-1];
	ban9();
	reSetup();
}
function doneBandage(){
	document.getElementById("addbandage2").innerHTML= "";
	document.getElementById("addbandage3").innerHTML= "";
	setDisplay("none", ["okban", "leftban", "rightban", "deleteban", "cancelban"]); 
	setDisplay("block", ["addbandage", "addbandage4", "input", "scram"]); 
	setDisplay("inline", ["custom5", "select9", "rng2"]); 

	if(bandaged2.length > 1 && customb == 1)
		bandaged.push(bandaged2);
	bandaged2 = [];
	customb = 0;
	ban9();
}
function cancelBandage(){
	customb = 0;
	bandaged2 = [];
	doneBandage();
}
function allBandaged(){
	let possible = [];
	let allbandaged = [];
	for(let j = 0; j < bandaged.length; j++){
		for(let k = 0; k < bandaged[j].length; k++){
			console.log(bandaged[j][k]);
			allbandaged[allbandaged.length] = bandaged[j][k];
		}
	}
	console.log("allbandaged is", allbandaged);
	for(let j = 0; j < 27; j++){
		if(!allbandaged.includes(j) && j != 13) possible.push(j);
	}
	return possible;
}
function randomBandage(){
	let numB = parseInt(Math.random()*3)+2;
	let possible = [];
	let possible2 = [];
	bandaged = [];
	let size = 3;
	if(numB == 3) size = 4
	if(numB == 2) size == 5
	for(let i = 0; i < numB; i++){
		possible = allBandaged();
		possible2 = [];
		let sizeB = parseInt(Math.random()*size)+2;
		let rnd = p.random(possible);
		bandaged[i] = [rnd];
		for(let j = 1; j < sizeB; j++){
			possible = allBandaged();
			for(let k = 0; k < possible.length; k++){ //loops through non bandaged selected cubies
				let bool = false;
				for(let l = 0; l < bandaged[i].length; l++){
					if(nextcuby[bandaged[i][l]].includes(possible[k])) //if non-b cuby is next to current b
						bool = true;
				}
				if(bool) possible2[possible2.length] = possible[k]
			}
			rnd = p.random(possible2);
			bandaged[i].push(rnd);
		}
	}
	bandaged2 = [];
	ban9();
	
}
function deleteBan(){
	if(bandaged.length >= bannum) 
		bandaged.splice(bannum-1, 1);
	doneBandage();
}
function inputPressed(move)
{
	redo = [];
	if(customb > 0 && move[0] != "y" && move[0] != "x") return;
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].animating()) {
			return;
		}
	}
	if(move[0] == "y" && customb == 1 && rotationz != 0) return;
	if(move[0] == "x" && customb == 1 && rotationx != 0) return;
	if(move == "y'"){
		rotationx++;
		if(rotationx == 4) rotationx = 0;
	}
	if(move == "y"){
		rotationx--;
        if(rotationx == -1) rotationx = 3;
	}
	if(move == "x"){
		rotationz++;
		if(rotationz == 4) rotationz = 0;
	}
	if(move == "x'"){
		rotationz--;
        if(rotationz == -1) rotationz = 3;
	}
	let cubies = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
	if(DIM == 6) cubies = [4,5,7,8,13,14,16,17];
	if(DIM == 1) cubies = [9,10,11,12,13,14,15,16,17];
	if(DIM == 2) cubies = [0,1,2,3,4,5,6,7,8,18,19,20,21,22,23,24,25,26];
	if(Array.isArray(DIM)  && DIM[0] != "adding")
	{
		cubies = [];
		for(let i = 0; i < 27; i++)
		{
			if(!DIM[6].includes(i))
				cubies.push(i);
		}
	}
	let onedown = false;
	let alldown = false;
	if(((DIM == 1 || DIM == 6 || DIM == 2 || Array.isArray(DIM))) && move[0] !="x" && move[0] != "y"){
		alldown = true;
		if(move == "D" || move == "D'"){ //D
			for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == 50);
			for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].x == 50);
			}
		if(move == "U" || move == "U'"){ //U
			for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == -50);
			for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].x == -50);
			}
		if(move == "L" || move == "L'"){ //L
			for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == -50);
			for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].z == -50);
			}
		if(move == "R" || move == "R'"){ //R
			for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == 50);
			for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].z == 50);
			}
		if(move == "F" || move == "F'"){ //F
			for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].y == 50);
			for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].y == 50);
			}
		if(move == "B" || move == "B'"){ //B
			for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].y == -50);
			for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].y == -50);
			}
		if(move == "E" || move == "E'"){ //E
			for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == 0);
			for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].x == 0);
		}
		if(move == "M" || move == "M'"){ //M
			for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == 0);
			for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].z == 0);
			}
		if(onedown == false) return;
	}
	console.log("momve is " + move);
	if(canMan)
	{
		notation(move, true);
		let bad = -1;
		if(undo.length > 0)
		{
			let rnd = undo[undo.length-1];
			if(rnd.slice(-1) == "'")
				bad = rnd.substring(0, rnd.length-1);
			else
				bad = rnd + "'";
		}
		if(timer.isRunning && MODE != "moves")
		{
			moves++
		}
		else if(MODE == "moves")
		{
			if(undo[undo.length-2] == bad)
			{
				undo.pop();
				undo.pop();
				if(move != "y" && move != "y'" && move != "x" && move != "x'")
					moves--;
			}
			else
				if(move != "y" && move != "y'" && move != "x" && move != "x'")
					moves++;
		}
	}
}
function Custom2(){
	custom = 2;
	customb = 0;
	document.getElementById("allmodes").style.display = "none";
	document.getElementById("cube").style.display = "none";
	document.getElementById("modarrow").style.display = "none";
	document.getElementById("custom2").style.display = "none";
	document.getElementById("custom4").style.display = "block";
	document.getElementById("okban").style.display = "none";
	document.getElementById("leftban").style.display = "none";
	document.getElementById("rightban").style.display = "none";

	changeCam(3);
	doneBandage()
	bandaged = bandaged3;
	modeData("custombandage");
	ban9();
}
function Custom()
{
	custom = 1;
	document.getElementById("allmodes").style.display = "none";
	document.getElementById("cube").style.display = "none";
	document.getElementById("modarrow").style.display = "none";
	document.getElementById("input").style.display = "none";
	document.getElementById("custom2").style.display = "block";
	document.getElementById("custom4").style.display = "none";
	modeData("customshape");
	change9();
}
function Reverse(move)
{
	if(move.slice(-1) == "'")
		return move.substring(0, move.length-1);
	return move + "'";
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
	//SIZE = SIZE_SLIDER.value();
	//GAP = GAP_SLIDER.value();
	SPEED = SPEED_SLIDER.value();
	if(MODE == "normal" || MODE == "timed" || MODE == "cube" || race > 0)
	DELAY = DELAY_SLIDER.value();
	special[1] = BORDER_SLIDER.value();
}
function sliderUpdate2(){
	CAMZOOM = SIZE_SLIDER2.value() * -1;
	//let rotation = CAM.getRotation();
	CAM = p.createEasyCam(p._renderer);
	CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
	rotateIt();
	if(DIM2 == 100)
		CAM.zoom(CAMZOOM+140);
	else
		CAM.zoom(CAMZOOM);
}
//Henry
function regular(nocustom){
	modeData("normal");

	if(MODE != "timed" && MODE != "cube" && MODE != "normal")
	{
		ao5 = [];
		mo5 = [];
		movesarr = [];
		scrambles = [];
	}
	if(MODE == "speed" || MODE == "moves" || (saveao5[1] && saveao5[1].length > 0)){
		ao5 = saveao5[0];
		mo5 = saveao5[1];
		scrambles = saveao5[2];
		movesarr = saveao5[3];
	}
	document.getElementById("scramble").innerHTML = "N/A";
	document.getElementById('password').value = '';
	DELAY_SLIDER.value(0);
	DELAY = 0;
	canMan = true;
	DIM = DIM2;
	if(MODE == "cube")
	{
		if(DIM == 100)
			changeTwo();
		else
			changeThree();
	}
	MODE = "normal";
	reSetup();
	race = 0;
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='block';
	}
	elements = document.getElementsByClassName('pictures');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	bandaged = [];
	refreshButtons();
	REGULAR.style('background-color', '#8ef5ee');
	//REGULAR.class('btn btn-secondary');

	document.getElementById("test_alg_span").innerHTML = "Test Algorithm:";
	setDisplay("block", ["or_instruct", "or_instruct2", "or_instruct4", "test_alg_div", "type3", "mode", "mode2", "mode3", "mode7", "ID1", "settings", "scram"]);
	setDisplay("inline", ["shuffle_div", "reset_div", "solve", "undo", "redo", "speed", "slider_div", "outermoves", "outertime", "input", "delayuseless"]);
	setDisplay("none", ["or_instruct3", "points_par", "readybot", "mode4", "mode5", "mode6", "mode8", "alltimes", "ID3", "s_easy", "s_medium", "s_OLL", "s_PLL", "m_34", "m_4", 
		"m_high", "link1", "timegone", "reset2_div", "reset3_div", "giveup", "giveup2", "hint", "cube", "custom2", "custom4", "spacetime", "stop_div", "modarrow", "s_bot", 
		"s_high", "s_RACE", "s_RACE2", "settings1", "loginform", "highscore"]);
	setInnerHTML(["s_INSTRUCT", "s_instruct", "s_instruct2", "s_RACE3", "s_difficulty", "l_message"]);

	changeInput();
	easystep = 0;
	medstep = 0;
	ollstep = 0;
	pllstep = 0;
	m_34step = 0;
	m_4step = 0;
	
}
function timedmode()
{
	if(MODE != "normal" && MODE != "cube" && MODE != "timed")
	{
		ao5 = [];
		mo5 = [];
		movesarr = [];
		scrambles = [];
	}
	if(MODE != "normal" || document.getElementById("test_alg_span").innerHTML == "Paste ID here:" || document.getElementById("settings1").style.display == "block")
		regular(true);
	DIM = DIM2;
	MODE = "timed";
	reSetup();

	refreshButtons();
	TIMEDMODE2.style('background-color', "#8ef5ee");

	setDisplay("none", ["mode", "ID1", "settings", "mode2", "mode3", "mode7", "or_instruct", "or_instruct2", "or_instruct3", "or_instruct4", "scram", "timegone", "custom2", "custom4", "cube", "input"]);
	setDisplay("inline", ["mode4", "mode5", "mode6", "mode8"]);
	setDisplay("block", ["alltimes", "type3"]);

	document.getElementById("or_instruct3").innerHTML = "";

	changeInput();

	modeData("stats");
}
function cubemode()
{
	bandaged3 = bandaged;
	custom = 0;
	if(MODE == "speed" || MODE == "moves"){
		ao5 = saveao5[0];
		mo5 = saveao5[1];
		scrambles = saveao5[2];
		movesarr = saveao5[3];
	}
	//if(MODE != "normal")
	regular(true);
	reSetup();
	MODE = "cube";
	setDisplay("none", ["mode", "ID1", "settings", "mode2", "mode3", "mode7", "solve", "type3", "or_instruct", "or_instruct2", "or_instruct4", "custom2", "custom4"]);
	setDisplay("block", ["scram", "input", "allmodes", "modarrow", "cube"]);
	setDisplay("inline", ["mode4", "mode5", "mode6", "mode8"]);
	if(modnum == 1) document.getElementById("customb").style.display = "block"; 
	else document.getElementById("customb").style.display = "none"; 

	modeData("other");
}
function idmode()
{
	//regular(true);
	//MODE = "speed"
	if(document.getElementById("ID3").style.display == "block"){
		regular();
		return;
	}
	DIM = DIM2;
	//reSetup();
	stopMoving();

	refreshButtons();
	REGULAR.style('background-color', '#10caf0');
	IDMODE.style('background-color', '#8ef5ee');

	document.getElementById("s_instruct2").innerHTML = "";
	document.getElementById("s_RACE3").innerHTML = "";

	setDisplay("none", ["shuffle_div", "settings", "input", "reset_div", "solve", "settings1", "input2"]);
	setDisplay("block", ["ID3", "test_alg_div"]);
	
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}

	document.getElementById("test_alg_span").innerHTML = "Paste ID here:";

	modeData("id");
}
document.getElementById("account").onclick = accountmode;
function accountmode() {
	if(MODE != "normal" && MODE != "cube" && MODE != "timed")
	{
		ao5 = [];
		mo5 = [];
		movesarr = [];
		scrambles = [];
	}
	regular(true);
	DIM = DIM2;
	MODE = "account";
	reSetup();

	refreshButtons();
	document.getElementById("l_title").innerHTML = "Create an Account";
	document.getElementById("l_forgot").innerText = "Have an account?";
	document.getElementById("l_link").innerText = "Log in";
	setDisplay("none", ["test_alg_div"]);
	setDisplay("block", ["loginform"]);
	
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
}
document.getElementById("login").onclick = loginmode;
document.getElementById("l_link").onclick = () => MODE == "account" ? loginmode() : accountmode();
function loginmode() {
	if(MODE != "normal" && MODE != "cube" && MODE != "timed")
	{
		ao5 = [];
		mo5 = [];
		movesarr = [];
		scrambles = [];
	}
	regular(true);
	DIM = DIM2;
	MODE = "login";
	reSetup();

	refreshButtons();
	document.getElementById("l_title").innerHTML = "Enter your Login Credentials";
	document.getElementById("l_forgot").innerText = "Don't have an account?";
	document.getElementById("l_link").innerText = "Sign up";
	setDisplay("none", ["test_alg_div"]);
	setDisplay("block", ["loginform"]);
	
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
}
function settingsmode()
{
	//regular(true);
	//MODE = "speed"

	if(document.getElementById("settings1").style.display == "block"){
		regular();
		return;
	}
	DIM = DIM2;
	reSetup();
	stopMoving();
	//quickSolve();
	refreshButtons();

	//regular();
	REGULAR.style('background-color', '#10caf0');
	//REGULAR.class('btn btn-info');
	if(!isIpad() && !(window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches))
		SETTINGS.style('background-color', "#8ef5ee");

	document.getElementById("s_instruct2").innerHTML = "";
	document.getElementById("s_RACE3").innerHTML = "";
	setDisplay("none", ["shuffle_div", "reset_div", "solve", "input", "input2", "test_alg_div"]);
	setDisplay("block", ["settings1"]);
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}

}
function speedmode()
{
	regular(true);
	DELAY_SLIDER.value(0);
	DELAY = 0;
	canMan = false;
	MODE = "speed"
	DIM = DIM2;
	reSetup();
	saveao5 = [ao5, mo5, scrambles, movesarr];
	ao5 = [];
	mo5 = [];
	scrambles = [];
	movesarr = [];

	refreshButtons();
	SPEEDMODE.style('background-color', '#8ef5ee');

	setDisplay("none", ["test_alg_div", "shuffle_div", "ID1", "settings", "reset_div", "solve", "input", "input2", "scram", "s_RACE2"]);
	setDisplay("inline", ["s_easy", "s_OLL", "s_PLL"]);
	setDisplay("block", ["s_bot", "s_high", "s_RACE"]);

	document.getElementById("s_instruct2").innerHTML = "";
	document.getElementById("s_RACE3").innerHTML = "";
	document.getElementById("s_INSTRUCT").innerHTML = "Instructions for Speed Mode";
	document.getElementById("s_instruct").innerHTML = "In one game of speed mode, there will be <b>4</b> stages, each requiring you to complete a challenge. Your score will be the time it takes to do all the tasks.";
	document.getElementById("s_difficulty").innerHTML = "Select Difficulty/Mode";
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	if(DIM == 50) document.getElementById("s_medium").style.display = "inline";
	easystep = 0;
	medstep = 0;
	ollstep = 0;
	pllstep = 0;
	
	if(DIM == 50)
		PLL.html("PLL Practice");
	else
		PLL.html("PBL Practice");
	if(INPUT.value()[0] == "K")
		INPUT.selected("Keyboard");

	updateScores();
	modeData("speed");
}
function movesmode()
{
	regular(true);
	DELAY_SLIDER.value(0);
	DELAY = 0;
	m_points = 0;
	m_offset = 0;
	canMan = false;
	MODE = "moves"
	DIM = DIM2;
	reSetup();
	saveao5 = [ao5, mo5, scrambles, movesarr];
	ao5 = [];
	mo5 = [];
	scrambles = [];
	movesarr = [];

	refreshButtons();
	MOVESMODE.style('background-color', '#8ef5ee');


	setDisplay("none", ["test_alg_div", "shuffle_div", "reset_div", "ID1", "settings", "solve", "input", "input2", "scram"]);
	setDisplay("inline", ["m_34", "m_4"]);
	setDisplay("block", ["m_high"]);


	document.getElementById("s_INSTRUCT").innerHTML = "Instructions for the Fewest Moves Challenge";
	document.getElementById("s_instruct").innerHTML = "In one game of the FMC, there will be infinite stages, each requiring you to solve the cube in the <b>most optimal way</b>.<br> Completing a stage will increase your total points, depending on its difficulty. If stuck, you can press the 'hint' button or the 'give up' button, which will cause you to lose 0.5 and 1 lives respectively.";
	document.getElementById("s_difficulty").innerHTML = "Select Scramble Difficulty";
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	m_34step = 0;
	m_4step = 0;
	if(INPUT.value()[0] == "K")
		INPUT.selected("Keyboard");

	modeData("moves");
}
function setSettings(obj) {
	// localStorage.speed = SPEED;
	// localStorage.topwhite = TOPWHITE.value();
	// localStorage.toppll = TOPPLL.value();
	// localStorage.keyboard = KEYBOARD.value();
	// localStorage.background = BACKGROUND_COLOR;
	// localStorage.hollow = HOLLOW.checked();
	// localStorage.audioon = audioon;
	// TOPWHITE.selected("Blue");
	// TOPPLL.selected("Same as above");
	// SPEED_SLIDER.value(2);
	// SPEED = 2;
	// topWhite();
	// KEYBOARD.value("Alt Keyboard");
	// changeKeys();
	SPEED_SLIDER.value(obj.speed);
	SPEED = obj.speed;
	audioon = obj.audioon;
	localStorage.audioon = obj.audioon;
	KEYBOARD.value(obj.keyboard);
	TOPWHITE.selected(obj.topwhite);
	TOPPLL.selected(obj.toppll);
	HOLLOW.checked(obj.hollow);
	let newdarkmode = obj.background;
	if (newdarkmode != BACKGROUND_COLOR) {
		DARK.checked(!DARK.checked());
		darkMode();
	}
	topWhite();
	changeKeys();
	refreshButtons();
	hollowCube();
	if (MODE != "login") regular();
}
function setDisplay (display, ids) {
	ids.forEach(id => document.getElementById(id).style.display = display)
};
function setInnerHTML (ids) {
	 ids.forEach(id => document.getElementById(id).innerHTML = "");
}
function showSpeed()
{
	DELAY_SLIDER.value(0);
	DELAY = 0;
	canMan = false;
	document.getElementById("s_difficulty").innerHTML = "";
	setDisplay("none", ["s_easy", "s_medium", "m_34", "m_4", "m_high", "s_OLL", "s_PLL", "s_bot", "s_high", "s_RACE", "highscore"]);
	setDisplay("inline", ["input", "speed", "slider_div", "undo", "redo"]);

	changeInput();
	if(MODE == "speed")
	{
		document.getElementById("reset3_div").style.display = "inline";
		document.getElementById("times_par").style.display = "block";
		document.getElementById("time").style.display = "inline";
		document.getElementById("outertime").style.display = "inline";
	}
	if(MODE == "moves")
	{
		setDisplay("inline", ["points_par", "outermoves", "reset2_div", "giveup", "giveup2", "hint"]);
	}
}
function reCam()
{
	CAM = p.createEasyCam(p._renderer);
	CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
	if(DIM2 == 100)
		CAM.zoom(CAMZOOM+140);
	else
		CAM.zoom(CAMZOOM);
	rotateIt();
}
function updateScores() {
	if (DIM == 50) {
		// speedmode scores
		let modes = ["easy", "medium", "oll", "pll"];
		let display = {easy: "Easy", medium: "Medium", oll: "OLL", pll: "PLL"};
		modes.forEach((mode) => {
			const score = localStorage[mode];
			if (score != null && score != -1) {
				document.getElementById("s_" + mode + "score").innerHTML = display[mode] +  ": " + score;
			} else {
				document.getElementById("s_" + mode + "score").innerHTML = display[mode] +  ": " + "N/A";
			}
		})
		document.getElementById("s_pllscore").style.display = "block";
		// movesmode scores
		modes = ["m_easy", "m_medium"];
		display = {m_easy: "Easy", m_medium: "Medium"};
		modes.forEach((mode) => {
			const score  = localStorage[mode];
			if (score != null && score != -1) {
				document.getElementById(mode + "score").innerHTML = display[mode] +  ": " + score;
			} else {
				document.getElementById(mode + "score").innerHTML = display[mode] +  ": " + "N/A";
			}
		})


	} else {
		if (localStorage["easy2"] != null  && localStorage["easy2"] != -1) {
			document.getElementById("s_easyscore").innerHTML = "Easy: " + localStorage["easy2"];
		} else {
			document.getElementById("s_easyscore").innerHTML = "Easy: N/A";
		}

		if (localStorage["oll2"] != null  && localStorage["oll2"] != -1) {
			document.getElementById("s_mediumscore").innerHTML = "OLL: " + localStorage["oll2"];
		} else {
			document.getElementById("s_mediumscore").innerHTML = "OLL: N/A";
		}

		if (localStorage["pbl2"] != null && localStorage["pbl2"] != -1) {
			document.getElementById("s_ollscore").innerHTML = "PBL: " + localStorage["pbl2"];
		} else {
			document.getElementById("s_ollscore").innerHTML = "PBL: N/A";
		}
		document.getElementById("s_pllscore").style.display = "none";
	}
}
function setScore(mode, total) {
	const highscores = localStorage[mode];
	console.log("In setscore ", mode, total, localStorage[mode], !highscores);
	if (!highscores || highscores == -1 || (MODE == "speed" && total < highscores) || (MODE == "moves" && total > highscores)) {
		if (localStorage.username != "signedout")
			document.getElementById("highscore").style.display = "block";
		localStorage[mode] = total;
		updateScores();
	}
}
function easy() 
{
	undo = [];
	redo = [];
	let pics = ["pic1", "pic2", "pic3", "pic4"];
	if(DIM == 100)
		pics = ["pic11", "pic12", "pic13","pic14"]
	if(easystep % 2 == 0)
	{
		var elements = document.getElementsByClassName('pictures');
		for(var i=0; i<elements.length; i++) { 
			elements[i].style.display='none';
		}
		if(easystep < 7)
		{
			document.getElementById(pics[easystep/2]).style.display = "inline";
			if(easystep == 6 && DIM == 50)
			document.getElementById("pic5").style.display = "inline";
			if(easystep == 4 && DIM == 100)
			document.getElementById("pic15").style.display = "inline";
		}
	}
	if(easystep == 0)
	{
		ao5 = 0;
		quickSolve();
		reCam();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #1: Solve the Cube";
		document.getElementById("s_instruct").innerHTML = "Move any layer to start time, solve the cube to stop it.";
		
		showSpeed();
		timer.stop();
		timer.reset();
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
		if(DIM == 50)
		{
			document.getElementById("s_INSTRUCT").innerHTML = "Challenge #2: Solve the Cross In Any Face";
			document.getElementById("s_instruct").innerHTML = "A cross is solved when all the edge pieces in a face match its center piece.";
		}
		else
		{
			document.getElementById("s_INSTRUCT").innerHTML = "Challenge #2: Solve a Face";
			document.getElementById("s_instruct").innerHTML = "The challenge is complete when all the pieces in a side have the same color.";
		
		}
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
		if(DIM == 50)
		{
			document.getElementById("s_INSTRUCT").innerHTML = "Challenge #3: Same Colored Corners in the Green Face";
			document.getElementById("s_instruct").innerHTML = "This challenge is complete when all 4 corners in the green face are the same color. The green face is the face where the center piece is green.";
		}
		else
		{
			document.getElementById("s_INSTRUCT").innerHTML = "Challenge #3: Solve the Green Layer";
			document.getElementById("s_instruct").innerHTML = "This challenge is complete when a side has only green squares, and the cubies are permutated in their correct position.";
		}
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
		let numsc = 0;
		if(DIM == 50)
		{
			document.getElementById("s_INSTRUCT").innerHTML = "Challenge #4: Construct a Line of Solved Edges in Two Faces";
			document.getElementById("s_instruct").innerHTML = "This means a middle layer must be half solved.";
			numsc = 20;
		}
		else
		{
			quickSolve();
			document.getElementById("s_INSTRUCT").innerHTML = "Challenge #4: Solve the Cube";
			document.getElementById("s_instruct").innerHTML = "This is a 3 move scramble, good luck!";
			numsc = 3;
		}
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		let bad = "";
		for(let i = 0; i < numsc; i++)
		{
			while(true)
			{
				let rnd = p.random(possible);
				console.log("rnd is " + rnd);
				if(rnd == bad || (arr.length>1 && rnd == arr[i-2]))
				continue;
				
				if(rnd.slice(-1) == "'")
					bad = rnd.substring(0, rnd.length-1);
				else
					bad = rnd + "'";
				arr.push(rnd);
				m_scramble.push(rnd);
				break;
			}
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
		for(let i = 0; i < ao5.length; i++)
		{
			total += ao5[i];
		}
		total = Math.round(total * 100) / 100;
		document.getElementById("s_INSTRUCT").innerHTML = "Congrats on completing all the challenges!";
		let grade = "F-";
		let grades = ["A++", "A+", "A", "A-", "B+", "B", "B-", "C++", "C+", "C", "C-", "D+", "D", "D-", "F"];
		let scores = [2, 3, 6, 10, 15, 25, 40, 60, 90, 120, 200, 300, 400, 500, 600];
		if(medstep == 8)
		scores = [20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200, 300, 400, 500, 600];
		if(pllstep == 8 || ollstep == 8)
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
		if(DIM == 50)
		document.getElementById("s_medium").style.display = "inline";
		document.getElementById("s_OLL").style.display = "inline";
		document.getElementById("s_PLL").style.display = "inline";
		document.getElementById("s_high").style.display = "block";
		if (medstep == 8) {
			setScore("medium", total);
		} else if (ollstep == 8) {
			setScore(DIM == 50 ? "oll" : "oll2", total);
		} else if (pllstep == 8) {
			setScore(DIM == 50 ? "pll" : "pbl2", total);
		} else {
			setScore(DIM == 50 ? "easy" : "easy2", total);
		}
		modeData("speedwin");
		easystep = 0;
		medstep = 0;
		pllstep = 0;
		ollstep = 0;
		timer.reset();
	}
	
}
function medium(){ 
	undo = [];
	redo = [];
	let pics = ["pic6", "pic7", "pic8", "pic9"];
	if(medstep % 2 == 0)
	{
		var elements = document.getElementsByClassName('pictures');
		for(var i=0; i<elements.length; i++) { 
			elements[i].style.display='none';
		}
		if(medstep < 7)
		{
			document.getElementById(pics[medstep/2]).style.display = "inline";
			if(medstep == 4)
			document.getElementById("pic10").style.display = "inline";
		}

	}
	if(medstep == 0)
	{
		reCam();
		showSpeed();
		ao5 = 0;
		quickSolve();
		timer.stop();
		timer.reset();
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
		easystep = 8;
		easy();
	}
}
function speedPLL()
{
	undo = [];
	redo = [];
	if(pllstep == 0) reCam();
	if(pllstep % 2 == 0 && pllstep != 8)
	{
		timer.reset();
		if(pllstep == 0)
		ao5 = 0;
		quickSolve();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #" + (pllstep/2+1) + ": Solve the Cube";
		showSpeed();
		timer.stop();
		timer.reset();
		let possible = ["Aa", "Ab", "F", "Ja", "Jb", "Ra", "Rb", "T", "Ga", "Gb", "Gc", "Gd", "E", "Na", 
		"Nb", "V", "Y", "H", "Ua", "Ub", "Z"];
		if(DIM == 100)
			possible = ["AA", "AD", "DD", "Jb", "Y"];
		let rnd = p.random(possible);
		let str = "";
		if(DIM == 50) 
		{
			changeArr(obj2[rnd][1])
			str = obj2[rnd][0];
		}
		else
		{
			changeArr(pbls[rnd][1])
			str = pbls[rnd][0];
		}
		document.getElementById("s_instruct").innerHTML = "Move any layer to start time, solve the cube to stop it. <p style = 'font-size:12px;'>Suggested algorithm with unsolved layer in the top: <br>" + str +  " </p>";
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
function speedOLL()
{
	undo = [];
	redo = [];
	if(ollstep == 0) reCam();
	if(ollstep % 2 == 0 && ollstep != 8)
	{
		timer.reset();
		if(ollstep == 0)
		ao5 = 0;
		quickSolve();
		document.getElementById("s_INSTRUCT").innerHTML = "Challenge #" + (ollstep/2+1) + ": Solve the Top Layer";
		showSpeed();
		timer.stop();
		timer.reset();
		let possible = ["21", "51", "45", "33", "37", "26", "27"];
		if(DIM == 50)
		{
			possible = [];
			for(let i = 1; i < 58; i++)
			{
				possible.push(i);
			}
		}
		let rnd = p.random(possible);
		let str = "";
		changeArr(olls[rnd][1])
		str = olls[rnd][0];
		document.getElementById("s_instruct").innerHTML = "Move any layer to start time, solve the cube to stop it. <p style = 'font-size:12px;'>Suggested algorithm with unsolved layer in the top: <br>" + str +  " </p>";
		shufflespeed = 2;
		let rnd2 = Math.floor(Math.random()*4);
		for(let i = 0; i < rnd2; i++)
		{
			arr.push("U");
		}
		multipleEasy(0, 5);
	}
	else if(ollstep == 8)
	{
		timer.reset();
		easystep = 8;
		easy();
	}
}
//onclick
document.getElementById("l_home").onclick = regular;
document.getElementById("l_load").onclick = () => loadData(true);
document.getElementById("savedata").onclick = () => saveData(localStorage.username, localStorage.password, "POST", true);
document.getElementById("savedata2").onclick = () => saveData(localStorage.username, localStorage.password, "POST", true);
async function saveData(username, password, method, al) {
	if (document.getElementById("logindesc").innerHTML == "")
		document.getElementById("logindesc").innerHTML = "Saving data...";
	const data = {
		username: username,
		password: password,
		data: "random",
		easy: localStorage.easy ?? -1,
		medium: localStorage.medium ?? -1,
		oll: localStorage.oll ?? -1,
		pll: localStorage.pll ?? -1,
		easy2: localStorage.easy2 ?? -1,
		oll2: localStorage.oll2 ?? -1,
		pbl2: localStorage.pbl2 ?? -1,
		m_easy: localStorage.m_easy ?? -1,
		m_medium:localStorage.m_medium ?? -1,
		audioon:localStorage.audioon,
		background:localStorage.background,
		hollow:localStorage.hollow,
		keyboard:localStorage.keyboard,
		speed:localStorage.speed,
		toppll:localStorage.toppll,
		topwhite:localStorage.topwhite
	};
	const obj = await putUsers(data, method);
	successSQL("Data saved");
}
document.getElementById("loaddata").onclick = () => loadData(true);
async function loadData(times) {
	if (document.getElementById("logindesc").innerHTML == "") {
		document.getElementById("logindesc").innerHTML = "Loading data...";
	}
	const userdata = await getUsers();
	let index = 0;
	if (!userdata[0]) {
		alert("Load failed, please try again");
		document.getElementById("logindesc").innerHTML = "";
		return;
	}
	userdata.forEach((obj, i) => {
		if (localStorage.username == obj.username) {
			index = i;
		}
	});
	console.log("Userdata is ", userdata[index]);
	if (times) {
		let params = ["easy", "medium", "oll", "pll", "easy2", "oll2", "pbl2"];
		params.forEach((param) => {
			if (userdata[index][param] != -1 && (localStorage[param] == undefined || localStorage[param] == -1 || localStorage[param] > userdata[index][param]))
				localStorage[param] = userdata[index][param];
		})
		params = ["m_easy", "m_medium"];
		params.forEach((param) => {
			if (userdata[index][param] != -1 && (localStorage[param] == undefined || localStorage[param] == -1 || localStorage[param] < userdata[index][param]))
				localStorage[param] = userdata[index][param];
		})
	}
	successSQL("Loaded data");
	updateScores();
	setSettings(userdata[index]);
}
document.getElementById("signout").onclick = () => {
	localStorage.username = "signedout";
	localStorage.password = "signedout";
};
document.getElementById("l_submit").onclick = () => MODE == "account" ? submitAccount() : submitLogin();
async function submitLogin() {
	const username = document.getElementById("username").value;
	if (username == "") {
		alert("Please enter a username");
		return;
	}
	const password = document.getElementById("password").value;
	if (password == "") {
		alert("Please enter a password");
		return;
	}
	document.getElementById("l_message").innerHTML = "Attemping to log in...";
	const success = await matchPassword(username, password);
	document.getElementById('password').value = '';
	if (!success) {
		alert("Incorrect credentials");
		document.getElementById("l_message").innerHTML = "";
		return;
	} else {
		document.getElementById("l_message").innerHTML = "Logged in successfully! Your settings have been updated. To load your previously saved scores, click Load Data.";
		localStorage.username = username;
		localStorage.password = password;
	
		loadData(true);
	}
}
async function submitAccount() {
	const username = document.getElementById("username").value;
	if (username == "") {
		alert("Please enter a username");
		return;
	}
	const password = document.getElementById("password").value;
	if (password == "") {
		alert("Please enter a password");
		return;
	}
	document.getElementById("l_message").innerHTML = "Attemping to create account...";
	const userdata = await getUsers();
	console.log("UserData", userdata);

	let matches = false;
	
	userdata.forEach((obj) => {
		if (obj.username == username) {
			document.getElementById("l_message").innerHTML = "";
			matches = true;
		}
	})

	if (matches) {
		alert("This username is taken.")
		return;
	}
	document.getElementById('password').value = '';
	await saveData(username, password, "PUT", false);
	document.getElementById("l_message").innerHTML = "Account Created! You are logged in.";
	localStorage.username = username;
	localStorage.password = password;
}
function successSQL(text) {
	document.getElementById("logindesc").innerHTML = text;
	setTimeout(() => {
		if (document.getElementById("logindesc").innerHTML == text) {
			document.getElementById("logindesc").innerHTML = "";
		}
	}, 2000)
}
function speedRace(){
	race = 1;
	round = 1;
	roundresult = [0, 0];
	showSpeed();
	setDisplay("none", ["keymap", "input", "input2", "undo", "scram", "redo", "reset3_div", "outermoves", "outertime", "times_par", "delayuseless", "scramble_par"]); 
	setDisplay("block", ["readybot", "delaywhole"]);


	document.getElementById("s_instruct2").innerHTML = "";
	document.getElementById("s_RACE3").innerHTML = "";
	document.getElementById("s_INSTRUCT").innerHTML = "Pre-Setup";
	document.getElementById("s_instruct").innerHTML = "First, adjust bot turn speed (1 = slow, 200 = fast)<br>Then, adjust bot turn delay (in seconds)";
	modeData("race");
	canMan = true;
}
function speedRace2(){
	canMan = true;
	shuffling = true;
	race = 2;
	quickSolve();
	shuffleCube();
	document.getElementById("readybot").style.display = "none";
	document.getElementById("delaywhole").style.display = "none";
	document.getElementById("slider_div").style.display = "none";
	document.getElementById("speed").style.display = "none";
	document.getElementById("scramble_par").style.display = "block";
	document.getElementById("outertime").style.display = "block";
	document.getElementById("s_INSTRUCT").innerHTML = "Round " + round;
	document.getElementById("s_instruct").innerHTML = "Scramble YOUR OWN cube to the given scramble. Release space/touch screen to start solving, and press any key/touch anywhere to stop. Winner gets a point, first to 5 wins!";
	document.getElementById("s_instruct2").innerHTML = "Your points: <div style = 'color: green; display: inline;'>" + roundresult[0] + "</div><br>Bot points: <div style = 'color: red; display: inline;'>" + roundresult[1] + "</div>";
	document.getElementById("s_RACE2").style.display = "none";
	canMan = false;
}
function raceTimes(){
	let str = "";
	for(let i = 2; i < roundresult.length; i++){
		if(roundresult[i][1] == 0)
			str += "<div style = 'color: green; display: inline;'>" + roundresult[i][0] + " </div>";
		else
			str += "<div style = 'color: red; display: inline;'>" + roundresult[i][0] + " </div>";
	}
	console.log("str is " + str);
	document.getElementById("s_RACE3").innerHTML = "Winning times: " + str;
}
function m_34() 
{
	undo = [];
	redo = [];
	moves = 0;
	if(m_34step == 0) 
	{ 
		reCam();
		giveups = 3;
		m_pass = 0;
		m_points = 0;
	}
	if(m_34step % 2 == 0)
	{
		let rand = parseInt(Math.random()*100);
		m_scramble = [];
		arr = [];
		if(m_34step == 0)
		{
			m_type = -1;
			timer.stop();
			timer.reset();
		}
		else if(m_34step <= 4)
		{
			m_type = 0;
		}
		else if(m_34step < 16)
		{
			if(rand <= 50) m_type = 0;
			else m_type = 1;
		}
		else if(m_34step < 30)
		{
			if(rand <= 33) m_type = 0;
			else if(rand <= 66) m_type = 1;
			else m_type = 2;
		}
		else
		{
			if(rand <= (60 - m_34step) || rand % 5 == 0) m_type = 1;
			else m_type = 2;
		}
		quickSolve();
		showSpeed();
		if(m_type == -1){
			scramblemoves = 2;
			document.getElementById("s_INSTRUCT").innerHTML = "Stage " + (m_34step/2+1) + ": Solve the cube in at most 2 moves (1 point)";
			document.getElementById("s_instruct").innerHTML = "<i>Prerequisite: This 2-move scramble is guaranteed to not have any one-move slice moves.</i><br><br>Tip: Undoing a move will also subtract 1 from the move counter. Press 'reset' to revamp to the orginial scramble and set the move counter to 0.";
		}else if(m_type == 0){
			scramblemoves = 3;
			document.getElementById("s_INSTRUCT").innerHTML = "Stage " + (m_34step/2+1) + ": Solve the cube in at most 3 moves (2 points)";
			document.getElementById("s_instruct").innerHTML = "<i>Prerequisite: This 3-move scramble is guaranteed to not have any one-move slice moves.</i><br><br>Tip: Undoing a move will also subtract 1 from the move counter. Press 'reset' to revamp to the orginial scramble and set the move counter to 0.";
		}else if(m_type == 1){
			scramblemoves = 4;
			document.getElementById("s_INSTRUCT").innerHTML = "Stage " + (m_34step/2+1) + ": Solve the cube in at most 4 moves (3 points)";
			document.getElementById("s_instruct").innerHTML = "<i>Prerequisite: This 4-move scramble is guaranteed to not have any one-move slice moves.</i><br><br>Tip: Undoing a move will also subtract 1 from the move counter. Press 'reset' to revamp to the orginial scramble and set the move counter to 0.";
		}else if(m_type == 2){
			scramblemoves = 5;
			document.getElementById("s_INSTRUCT").innerHTML = "Stage " + (m_34step/2+1) + ": Solve the cube in at most 5 moves (5 points)";
			document.getElementById("s_instruct").innerHTML = "<i>Prerequisite: This 5-move scramble is guaranteed to not have any one-move slice moves.</i><br><br>Tip: Undoing a move will also subtract 1 from the move counter. Press 'reset' to revamp to the orginial scramble and set the move counter to 0.";
		}
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		let bad = "";
		for(let i = 0; i < scramblemoves; i++)
		{
			while(true)
			{
				let rnd = p.random(possible);
				console.log("rnd is " + rnd);
				if(rnd == bad || (arr.length>1 && rnd == arr[i-2]))
				continue;
				
				if(rnd.slice(-1) == "'")
					bad = rnd.substring(0, rnd.length-1);
				else
					bad = rnd + "'";
				arr.push(rnd);
				m_scramble.push(rnd);
				break;
			}
		}
		console.log("arr.length is " + arr.length);
		shufflespeed = 2;
		canMan = false;
		multipleEasy(0, 3);
	}
}
function m_4() 
{
	undo = [];
	redo = [];
	moves = 0;
	if(m_4step == 0 && m_34step == 0) 
	{
		reCam();
		m_pass = 0;
		giveups = 3;
		m_points = 0;
	}
	if(m_4step % 2 == 0)
	{
		let rand = parseInt(Math.random()*100);
		m_scramble = [];
		arr = [];
		m_type = m_4step/2+4;
		if(m_4step == 0)
			m_type = 2;
		else 
		{
			if(rand < 20) m_type = 2 + m_offset
			if(rand < 40) m_type = 3 + m_offset;
			else if(rand < 80) m_type = 4 + m_offset;
			else m_type = 5 + m_offset;
		}
		if(m_type > 20) m_type = 20;
		if(rand % 5 == 0 && m_4step > 6) m_offset++;
		quickSolve();
		showSpeed();
		document.getElementById("s_INSTRUCT").innerHTML = "Stage " + (m_4step/2+1) + ": Solve the cube in at most " + m_type + " moves (" + parseInt(Math.pow(1.5, m_type)) + " points)";
		if(m_type < 20)
			document.getElementById("s_instruct").innerHTML = "<i>Prerequisite: This " + m_type + "-move scramble is guaranteed to not have any one-move slice moves.</i><br><br>Tip: Undoing a move will also subtract 1 from the move counter. Press 'reset' to revamp to the orginial scramble and set the move counter to 0.";
		else
			document.getElementById("s_instruct").innerHTML = "<i>Prerequisite: This 20+ move scramble is guaranteed to not have any one-move slice moves.</i><br><br>Tip: Any scramble can be solved in at most 20 moves...HOW ARE YOU STILL PLAYING?";
		const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'"];
		arr = [];
		let bad = "";
		for(let i = 0; i < m_type; i++)
		{
			while(true)
			{
				let rnd = p.random(possible);
				console.log("rnd is " + rnd);
				if(rnd == bad || (arr.length>1 && rnd == arr[i-2]))
				continue;
				
				if(rnd.slice(-1) == "'")
					bad = rnd.substring(0, rnd.length-1);
				else
					bad = rnd + "'";
				arr.push(rnd);
				m_scramble.push(rnd);
				break;
			}
		}
		console.log("arr.length is " + arr.length);
		shufflespeed = 2;
		canMan = false;
		multipleEasy(0, 4);
	}
	else if((m_4step*2 % 2) == 1 || (m_34step*2) % 2 == 1)
	{
		var elements = document.getElementsByClassName('normal');
		for(var i=0; i<elements.length; i++) { 
			elements[i].style.display='none';
		}
		document.getElementById("s_INSTRUCT").innerHTML = "You Lost! Stages Passed: " + m_pass;
		let grade = "F";
		let grades = ["A++", "A+", "A", "A-", "B", "C", "D"];
		let scores = [100, 70, 50, 25, 15, 6, 2];
		if (m_34step > 0) {
			scores = [40, 15, 10, 6, 3, 2, 1];
			setScore("m_easy", m_points)
		} else {
			setScore("m_medium", m_points)
		}
		for(let i = 0; i < grades.length; i++)
		{
			if(m_points >= scores[i])
			{
				grade = grades[i];
				break;
			}
		}
		document.getElementById("s_instruct").innerHTML = "Your final score is " + m_points + ", granting you a grade of a <span style = 'color: #bf2222'>" + grade + "</span> <p>Play again?</p>";
		document.getElementById("m_34").style.display = "inline";
		document.getElementById("m_4").style.display = "inline";
		document.getElementById("m_high").style.display = "block";


		m_34step = 0;
		m_4step = 0;
		timer.reset();
	}
}
function multipleEasy(nb, dificil) {
	if (nb < arr.length) {
		canMan = false;
		shufflespeed = 2;
		notation(arr[nb]);
		console.log(nb, "easy", dificil);
		waitForCondition(multipleEasy.bind(null, nb + 1, dificil), false);
	}
	else
	{
		shufflespeed = 5;
		setLayout();
		savesetup = IDtoReal(IDtoLayout(decode(getID())));
		if(dificil == 0)
		{
			if(!isSolved())
			easystep++;
			easy();
		}
		else if(dificil == 0.5)
		{
			undo = [];
			//easy();
		}
		else if (dificil == 1){
			if(!isSolved())
			medstep++;
			medium();
		}
		else if(dificil == 1.5)
		{
			undo = [];
			//medium();
		}
		else if(dificil == 2)
		{
			if(!isSolved())
			pllstep++;
			speedPLL();
		}
		else if(dificil == 2.5)
		{
			undo = [];
			//speedPLL();
		}
		else if(dificil == 3)
		{
			if(!isSolved())
			m_34step++;
			m_34();
		}
		else if(dificil == 3.5)
		{
			m_34();
		}
		else if(dificil == 4)
		{
			if(!isSolved())
			m_4step++;
			m_4();
		}
		else if(dificil == 4.5)
		{
			m_4();
		}
		else if(dificil == 5)
		{
			if(!isSolved())
			ollstep++;
			speedOLL();
		}
		else if(dificil == 5.5)
		{
			speedOLL();
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
			tmp[i] = new Cuby(DIM, CUBE[i].x, primes.x, primes.y, RND_COLORS[i], PICKER, p, i, false, special);
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
			tmp[i] = new Cuby(DIM, primes.x, CUBE[i].y, primes.y, RND_COLORS[i], PICKER, p, i, false, special); // buffer theme in a new cubye
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
			tmp[i] = new Cuby(DIM, primes.x, primes.y, CUBE[i].z, RND_COLORS[i], PICKER, p, i, false, special); // buffer theme in a new cubye
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
function isAnimating() {
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].animating()) {
			return true;
		}
	}
	return false;
}
function animate(axis, row, dir, time) {
	if (isAnimating()) return;
	let total = 0;
	let cuthrough = false;
	if(bandaged.length > 0){
		for(let i = 0; i < bandaged.length; i++){
			total = 0;
			for(let j = 0; j < bandaged[i].length; j++){
				if(CUBE[bandaged[i][j]][axis] == row)
					total++
			}
			if(total > 0 && total < bandaged[i].length)
				cuthrough = true;
		}
		if(cuthrough){
			undo.pop();
			if(timer.isRunning)
				moves--;
			return;
		}
	}
	if(Math.round(timer.getTime() / 10)/100.0 == 0 && time)
	{
		if(!(MODE == "cube" && alldown == true) && document.getElementById("ID3").style.display == "none")
			timer.start();
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

	if(!audioon) return;
	let m = Math.random();
	if(SOUND.value() == "Windows XP"){
		if(m < 0.1)
			var audio = document.getElementById("audio6");
		else if(m < 0.2)
			var audio = document.getElementById("audio7");
		else
			var audio = document.getElementById("audio8");
		audio.volume = 0.7;
	}
	else if(row == 0){
		var audio = document.getElementById("audio5");
		audio.volume = 0.7;
	}
	else if(m < 0.25){
		var audio = document.getElementById("audio4");
		audio.volume = 0.2;
	}else if(m<0.5){
		var audio = document.getElementById("audio1");
		audio.volume = 0.5;
	}else if(m<0.75){
		var audio = document.getElementById("audio2");
		audio.volume = 0.8;
	}
	else{
		var audio = document.getElementById("audio3");
		audio.volume = 0.5;
	}
	console.log(m)
	audio.currentTime = 0;
    audio.play();
}

function cleanAllSelectedCubies() {
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		CUBE[i].is_selected = false;
		CUBE[i].selected_color = null;
	}
}

function getCubyByColor(arr1) {
	for(let i = 0; i < SIZE * SIZE * SIZE; i++)
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
	//console.log(arr1);
	let realcolor = getColor(arr1);
	//console.log(realcolor);
	let allcolors = [];
	allcolors["w"] = [250, 250, 250];
	allcolors["r"] = [219, 25, 25];
	allcolors["b"] = [25, 105, 219];
	allcolors["o"] = [219, 125, 25];
	allcolors["g"] = [25, 219, 31];
	allcolors["y"] = [209, 219, 25];
	allcolors["k"] = [25, 25, 25];
	allcolors["m"] = [245, 25, 245];

	if(customb == 1 || allcubies)
	{
		let distcolor = [];
		allcolors["k"] = [0,0,0];
		distcolor[0] = allcolors[realcolor][0] - arr1[0];
		distcolor[1] = allcolors[realcolor][1] - arr1[1];
		distcolor[2] = allcolors[realcolor][2] - arr1[2];

		console.log(distcolor);

		let addon = 0;
		if(distcolor[0] == 0) addon += 9;
		else if(distcolor[0] == -1) addon += 18;
		else if(distcolor[0] == 1) addon += 0;
		else return false;

		if(distcolor[1] == 0) addon += 3;
		else if(distcolor[1] == -1) addon += 6;
		else if(distcolor[1] == 1) addon += 0;
		else return false;

		if(distcolor[2] == 0) addon += 1;
		else if(distcolor[2] == -1) addon += 2;
		else if(distcolor[2] == 1) addon += 0;
		else return false;
		if(addon == 13) return false;
		if(addon >= 0 && addon <= 26) return addon;
		return false;
	}

	const lookup = {
		"[218,124,24,255]": 0, "[218,125,24,255]": 3, "[218,126,24,255]": 6,
		"[219,124,24,255]": 9, "[219,125,24,255]": 12, "[219,126,24,255]": 15,
		"[220,124,24,255]": 18, "[220,125,24,255]": 21, "[220,126,24,255]": 24,
		"[249,251,249,255]": 6, "[249,251,250,255]": 7, "[249,251,251,255]": 8,
		"[250,251,249,255]": 15, "[250,251,250,255]": 16, "[250,251,251,255]": 17,
		"[251,251,249,255]": 24, "[251,251,250,255]": 25, "[251,251,251,255]": 26,
		"[24,104,218,255]": 0, "[24,104,219,255]": 1, "[24,104,220,255]": 2,
		"[24,105,218,255]": 3, "[24,105,219,255]": 4, "[24,105,220,255]": 5,
		"[24,106,218,255]": 6, "[24,106,219,255]": 7, "[24,106,220,255]": 8,
		"[218,26,26,255]": 8, "[218,25,26,255]": 5, "[218,24,26,255]": 2,
		"[219,26,26,255]": 17, "[219,25,26,255]": 14, "[219,24,26,255]": 11,
		"[220,26,26,255]": 26, "[220,25,26,255]": 23, "[220,24,26,255]": 20,
		"[26,220,30,255]": 24, "[26,220,31,255]": 25, "[26,220,32,255]": 26,
		"[26,219,30,255]": 21, "[26,219,31,255]": 22, "[26,219,32,255]": 23,
		"[26,218,30,255]": 18, "[26,218,31,255]": 19, "[26,218,32,255]": 20,
		"[208,218,26,255]": 2, "[208,218,25,255]": 1, "[208,218,24,255]": 0,
		"[209,218,26,255]": 11, "[209,218,25,255]": 10, "[209,218,24,255]": 9,
		"[210,218,26,255]": 20, "[210,218,25,255]": 19, "[210,218,24,255]": 18
	};

	return lookup[JSON.stringify(arr1)] ?? false;
	//if(JSON.stringify(arr1) == "[0,0,0,255]")
}

function getActionStartCuby() {
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].is_selected) {
			return CUBE[i];
		}
	}
	
	return null;
}
function stringArray()
{
	let str = "";
	for(let i = 0; i < arr.length; i++){
		if(i < arr.length - 1 && arr[i] == arr[i+1])
		{
			str += arr[i][0] + "2 ";
			i += 1;
		}
		else
			str += arr[i] + " ";
	}
	return str;
}
function randomLL()
{
	let possible = ["Aa", "Ab", "F", "Ja", "Jb", "Ra", "Rb", "T", "Ga", "Gb", "Gc", "Gd", "E", "Na", 
		"Nb", "V", "Y", "H", "Ua", "Ub", "Z"];
	if(DIM == 100)
		possible = ["Jb", "Y"];
	let rnd = p.random(possible);
	let possible2 = ["21", "51", "45", "33", "37", "26", "27"];
	if(DIM == 50)
	{
		possible2 = [];
		for(let i = 1; i < 58; i++)
		{
			possible2.push(i);
		}
	}
	let rnd2 = p.random(possible2);
	changeArr(obj2[rnd][1] + " " + olls[rnd2][1])
	document.getElementById("scramble").innerHTML = (stringArray());
}
function shufflePossible(len, total2, prev){
	document.getElementById("scramble").innerHTML = total2;
	console.log("total is " + total2);
	if(canMan == false || len < 1)return;
	arr = [];
	shufflespeed = 2;
	moves = 0;
	timer.reset();
	timer.stop();
	let possible = [['x', 50, 'D'], ['x', -50, 'U'], ['y', 50, 'F'], ['y', -50, 'B'], ['z', 50, 'R']
, ['z', -50, 'L'], ['z', 0, 'M'], ['x', 0, 'E'], ['y', 0, 'S']];
	if(SCRAM.value() == "Middle Slices")
		possible = [['z', 0, 'M'], ['x', 0, 'E'], ['y', 0, 'S']];
	if(DIM4 == 2)
		possible = [['x', 50, 'D'], ['x', -50, 'U'], ['y', 50, 'F'], ['y', -50, 'B'], ['z', 50, 'R']
		, ['z', -50, 'L']];
	let possible2 = [];
	for(let h = 0; h < possible.length; h++){
		let total = 0;
		let cuthrough = false;
		let axis = possible[h][0];
		let row = possible[h][1];
		let move = possible[h][2];

		for(let i = 0; i < bandaged.length; i++){
			total = 0;
			for(let j = 0; j < bandaged[i].length; j++){
				if(CUBE[bandaged[i][j]][axis] == row)
					total++
			}
			if(total > 0 && total < bandaged[i].length)
				cuthrough = true;
		}
		if(!cuthrough){
			possible2.push(move);
		}
	}
	if(possible2.length == 0) return;
	let actualmove = p.random(possible2);
	if(prev[0] == actualmove[0] && possible2.length > 1)
	{
		shufflePossible(len, total2, prev);
		return;
	}
	let rnd2 = Math.random();
	if(SCRAM.value() == "Double Turns" || (SCRAM.value() == "Like a 3x3x2" && actualmove != "U" && actualmove != "D" && actualmove != "E"))
	{
		arr.push(actualmove);
		arr.push(actualmove);
		total2 += actualmove + "2 ";
	}
	else if(rnd2 < 0.25)
	{
		arr.push(actualmove);
		total2 += actualmove + " ";
	}
	else if(rnd2 < 0.75)
	{
		arr.push(actualmove);
		arr.push(actualmove);
		total2 += actualmove + "2 ";
	}else
	{
		arr.push(actualmove + "'");
		total2 += actualmove + "' ";
	}
	prev = actualmove;
	canMan = false;
	multipleMod(0, len, total2, prev);
}
function shuffleCube(nb) { 
	if(canMan == false || customb == 1)return;
	if(MODDIM.includes(DIM) || custom == 2){
		if(DIM4 == 3)
			shufflePossible(35, "", "  ");
		else
			shufflePossible(15, "", "  ");
		return;
	}


	modeData("scramble");

	shufflespeed = 2;
	moves = 0;
	timer.reset();
	timer.stop();
	let possible = ["R", "L", "U", "D", "B", "F"];
	//const possible = ["R'", "R", "L", "L'", "U", "U'", "D", "D'", "B", "B'", "F", "F'", "M", "M'", 
	//"E", "E'", "Lw'", "Lw'", "Uw", "Uw'", "Rw", "Rw'", "Dw", "Dw'", "Bw", "Bw'", "Fw", "Fw'"];
	let doubly = false;
	let dontdo = false;
	arr = [];
	let bad = "";
	let total = "";
	if(MODE == "normal" || MODE == "cube" || MODE == "timed" || MODE == "speed" && race > 0)
	{
		if(SCRAM.value() == "Middle Slices")
			possible = ["E", "M", "S"];
		else if(SCRAM.value() == "Double Turns")
			doubly = true;
		else if(SCRAM.value() == "Last Layer" && DIM != 7)
		{
			randomLL();
			dontdo = true;
		}
		else if(SCRAM.value() == "Pattern" && DIM != 7)
		{
			quickSolve();
			dontdo = true;
			let rnd = Math.random();
			if(DIM4 == 3)
			{
				let random = ["R2 L' D F2 R' D' R' L U' D R D B2 R' U D2",
							"F L F U' R U F2 L2 U' L' B D' B' L2 U",
							"L U B' U' R L' B R' F B' D R D' F'",
							"F B2 R' D2 B R U D' R L' D' F' R2 D F2 B'",
							"F2 R' B' U R' L F' L F' B D' R B L2",
							"M2 E2 S2",
							"M S M' S' M2 E2 S2",
							"U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2",
						"L R F B U' D' L' R'",
						"R L U2 F' U2 D2 R2 L2 F' D2 F2 D R2 L2 F2 B2 D B2 L2",
					"U' B2 U L2 D L2 R2 D' B' R D' L R' B2 U2 F' L' U'",
				"F U F R L2 B D' R D2 L D' B R2 L F U F",
				"M S M' S'"];
				let rnd = parseInt(Math.random()*random.length);
				total = random[rnd];
			}
			else{
				if(rnd < 0.2)
					total = "F2 R2 U' F' U R' U2 R U' F'";
				else if(rnd < 0.4)
					total = "F2 R2 U2 F2";
				else if(rnd < 0.6)
					total = "U F2 U2 R2 U";
				else if(rnd < 0.8)
					total = "U R F2 U R F2 R U F' R";
				else
					total = "U R U' R2 U' R' F' U F2 R F'"
			}
			changeArr(total);
		}
	}
	let s = 18;
	if(DIM == 7 && SCRAM.value() != "Middle Slices"){
		quickSolve();
		possible = ["E", "D", "B"];
	}
	if(DIM4 == 2)
		s = 10;
	for(let i = 0; i < s; i++)
	{
		if(dontdo) break;
		while(true)
		{
			let rnd = p.random(possible);
			console.log("rnd is " + rnd);
			if(rnd == bad || (arr.length>1 && rnd == arr[i-2] ))
			continue;

			if(rnd == opposite2[bad])
				continue;
			
			let rnd2 = Math.random();
			if(SCRAM.value() == "Gearcube"){
				if(rnd2 < 0.5){
					arr.push((rnd + "w"));
					arr.push(rnd);
					total += rnd + "w " + rnd + " ";
				}
				else{
					arr.push((rnd + "w'"));
					arr.push((rnd+"'"));
					total += rnd + "w' " + rnd + "' ";
				}
			}
			else if(doubly || (SCRAM.value() == "Like a 3x3x2" && rnd != "U" && rnd != "D"))
			{
				arr.push(rnd);
				arr.push(rnd);
				total += rnd + "2 ";
			}
			else if(rnd2 < 0.25)
			{
				arr.push(rnd);
				total += rnd + " ";
			}
			else if(rnd2 < 0.75)
			{
				arr.push(rnd);
				arr.push(rnd);
				total += rnd + "2 ";
			}else
			{
				arr.push(rnd + "'");
				total += rnd + "' ";
			}
			
			bad = rnd;

			console.log("bad is " + bad);
			break;
		}
	}
	if(SCRAM.value() != "Last Layer")
	document.getElementById("scramble").innerHTML = total;
	multiple2(0);
}
function downloadAll()
{
	let total = "";
	for(let i = 0; i < mo5.length; i++)
	{
		total += (i+1) + ") " + mo5[i] + "s, " + movesarr[i] + " moves, Scramble: " + scrambles[i] + "\n";
	}
	download('cubestats.txt', total);
}

function displayTimes()
{
	if(scrambles.length > 1 & scrambles[scrambles.length-2] == scrambles[scrambles.length-1] && scrambles[scrambles.length-1] != "N/A")
		scrambles.pop();
	if(scrambles.length > mo5.length)
		scrambles.pop();
	if(canMan == false) return;
	if(MODE != "timed") return;
	if(mo5.length == 0)
	{
		document.getElementById('alltimes').innerHTML = "Your times/moves will be displayed here";
		document.getElementById("timegone").style.display = "none";
		document.getElementById("link1").style.display = "none";
		return;
	}
	else
	{
		document.getElementById("timegone").style.display = "block";
		document.getElementById("link1").style.display = "block";
	}
	document.getElementById("or_instruct3").style.display = "none";
	let alltimes = "";
	if(mo5.length > 1)
	{
		let mintime = mo5[0];
		let minmove = movesarr[0];
		for(let i = 0; i < mo5.length; i++)
		{
			mintime = Math.min(mintime, mo5[i])
			minmove = Math.min(minmove, movesarr[i]);
		}
		alltimes += "<a style = 'font-size:12px;'>Best: &nbsp&nbsp" + mintime + "s, " + minmove + " moves</a><br>";
	}
	if(mo5.length > 2)
	{
		let sumtime = 0;
		let summove = 0;
		for(let i = mo5.length-3; i < mo5.length; i++)
		{
			sumtime += mo5[i];
			summove += movesarr[i]
		}
		sumtime = sumtime/3;
		summove = summove/3;
		alltimes += "<a style = 'font-size:12px;';>Mo3: &nbsp&nbsp&nbsp" + parseFloat(sumtime).toFixed(2) + "s, " + (Math.round((summove)*100)/100) + " moves</a><br>";
	}
	if(mo5.length > 4)
	{
		let sum1 = 0;
		let min = mo5[mo5.length-5];
		let max = mo5[mo5.length-5];
		let sum2 = 0;
		let min2 = movesarr[movesarr.length-5];
		let max2 = movesarr[movesarr.length-5];
		for(let i = mo5.length-5; i < mo5.length; i++)
		{
			sum1 += mo5[i];
			min = Math.min(mo5[i], min);
			max = Math.max(mo5[i], max);
			sum2 += movesarr[i];
			min2 = Math.min(movesarr[i], min2);
			max2 = Math.max(movesarr[i], max2);
		}
		sum1 = (sum1 - min - max)/3;
		sum2 = (sum2 - min2 - max2)/3;
		alltimes += "<a style = 'font-size:12px;'>Ao5: &nbsp&nbsp&nbsp" + parseFloat(sum1).toFixed(2)  + "s, " + (Math.round((sum2)*100)/100) + " moves</a><br>";
	}
	if(mo5.length > 11)
	{
		let sum1 = 0;
		let min = mo5[mo5.length-12];
		let max = mo5[mo5.length-12];
		let sum2 = 0;
		let min2 = movesarr[movesarr.length-12];
		let max2 = movesarr[movesarr.length-12];
		for(let i = mo5.length-12; i < mo5.length; i++)
		{
			sum1 += mo5[i];
			min = Math.min(mo5[i], min);
			max = Math.max(mo5[i], max);
			sum2 += movesarr[i];
			min2 = Math.min(movesarr[i], min2);
			max2 = Math.max(movesarr[i], max2);
		}
		sum1 = (sum1 - min - max)/10;
		sum2 = (sum2 - min2 - max2)/10;
		alltimes += "<a style = 'font-size:12px;'>Ao12: &nbsp&nbsp" + parseFloat(sum1).toFixed(2) + "s, " + (Math.round((sum2)*100)/100) + " moves</a><br>";
	}
	if(mo5.length > 2)
	{
		let copy1 = [];
		let copy2 = [];
		for(let i = 0; i < mo5.length; i++)
		{
			copy1[i] = mo5[i];
			copy2[i] = movesarr[i];
		}
		let med1 = median(copy1);
		let med2 = median(copy2);
		alltimes += "<a style = 'font-size:12px;'>Median: " + parseFloat(med1).toFixed(2)  + "s, " + (Math.round((med2)*100)/100) + " moves</a><br>";
	}
	if(mo5.length > 2)
	{
		let sumtime = 0;
		let summove = 0;
		for(let i = 0; i < mo5.length; i++)
		{
			sumtime += mo5[i];
			summove += movesarr[i]
		}
		sumtime = sumtime/mo5.length;
		summove = summove/mo5.length;
		alltimes += "<a style = 'font-size:12px;'>Mean: &nbsp&nbsp" + parseFloat(sumtime).toFixed(2) + "s, " + (Math.round((summove)*100)/100) + " moves</a><br>";
	}
	if(alltimes.length > 0) alltimes += "<br>";
	let j = 0;
	if(mo5.length > 50) j = mo5.length-50;
	for(let i = j; i < mo5.length && i < 25+j; i++)
	{
		let a = mo5[i];
		let b = mo5[i+25];
		if(mo5[i] % 0.1 == 0 && mo5[i][mo5[i].length-1] != "0"){a = a + "0";}
		if(mo5.length > 25 && mo5[i+25] % 0.1 == 0 && mo5[i+25][mo5[i+25].length-1] != "0"){b = mo5[i+25] + "0";}
		

		if(i < 9) alltimes += "&nbsp;" + (i+1) + ") ";
		else alltimes += (i+1) + ") ";

		alltimes +=  parseFloat(a).toFixed(2) + "s, " + movesarr[i]+ "m&nbsp;";
		if((mo5.length > 25 && (i+25) < mo5.length) || (j > 0)) {
			alltimes += a < 100 ? "&nbsp": "";
			alltimes += a < 10 ? "&nbsp": "";
			alltimes += movesarr[i] < 10 ? "&nbsp": "";
			alltimes += movesarr[i] < 100 ? "&nbsp": "";
			alltimes += (i+26) + ") " + b + "s, " + movesarr[i+25] + "m";
		} 
		alltimes += "<br>"
	}

	document.getElementById('alltimes').innerHTML = alltimes;
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
		total = Math.round(total * 100) / 100;
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
	for(let i = 0; i < SIZE * SIZE * SIZE; i++)
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
	if(MODE == "cube" && DIM != 2 && !MODDIM.includes(DIM) && custom != 2) return; 
	if(timer.isRunning && race > 1 && Math.round(timer.getTime() / 10)/100.0 >= 0.5){ //racedetect
		raceDetect();
		return;
	}
	let hoveredColor;
	if(p.touches.length == 0)
		hoveredColor = p.get(p.mouseX, p.mouseY);
	else
	{
		let xx = p.touches[0].x;
		let yy = p.touches[0].y;
		hoveredColor = p.get(xx, yy);
	}

	setLayout();
	console.log(hoveredColor);
	if (hoveredColor !== false && hoveredColor[0] != BACKGROUND_COLOR) { 
		const cuby = getCubyIndexByColor2(hoveredColor);
		console.log(cuby);
		if (cuby !== false) {

			if(customb == 1){
				console.log("here5", cuby)
				if(!bandaged2.includes(cuby))
				{
					if(bandaged2[0] == -1) bandaged2 = [];
					bandaged2.push(cuby);
					
				}
				else if(!(window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches)){
					bandaged2 = bandaged2.filter(item => item != cuby)
					if(bandaged2.length == 0) bandaged2 = [-1];
				}
				ban9();
				return;
			} 
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
	let sum = 0;
	for(let i = 0; i < 27; i++)
	{
		if(CUBE[i][axis] == dir * 50){
			if(CUBE[i].border == 0)
				sum++;
		}
	}
	console.log("sum is " + sum);
	if(sum % 2 == 1)
		return;
	


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
function animateWide(axis, row, dir, timed) {
	let rows = [row, 0];
	
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].animating()) {
			// some cube is already in animation
			return;
		}
	}
	
	let total = 0;
	let cuthrough = false;
	if(bandaged.length > 0){
		for(let i = 0; i < bandaged.length; i++){
			total = 0;
			for(let j = 0; j < bandaged[i].length; j++){
				if(CUBE[bandaged[i][j]][axis] == row || CUBE[bandaged[i][j]][axis] == 0)
					total++
			}
			if(total > 0 && total < bandaged[i].length)
				cuthrough = true;
		}
		if(cuthrough){
			undo.pop();
			if(timer.isRunning())
				moves--;
			return;
		}
	}

	if(Math.round(timer.getTime() / 10)/100.0 == 0 && timed)
	{
		if(!(MODE == "cube" && alldown == true) && document.getElementById("ID3").style.display == "none")
			timer.start();
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
	if(!audioon) return;
	let m = Math.random();
	if(SOUND.value() == "Windows XP"){
		if(m < 0.1)
			var audio = document.getElementById("audio6");
		else if(m < 0.2)
			var audio = document.getElementById("audio7");
		else
			var audio = document.getElementById("audio8");
		audio.volume = 0.7;
	}
	else if(m < 0.25){
		var audio = document.getElementById("audio4");
		audio.volume = 0.2;
	}else if(m<0.5){
		var audio = document.getElementById("audio1");
		audio.volume = 0.5;
	}else if(m<0.75){
		var audio = document.getElementById("audio2");
		audio.volume = 0.8;
	}
	else{
		var audio = document.getElementById("audio3");
		audio.volume = 0.5;
	}
	console.log(m)
	audio.currentTime = 0;
    audio.play();
}
function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        inspect = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (!event.ctrlKey && !event.metaKey) {
        inspect = false;
    }
});

p.keyPressed = (event) => {
	console.log(special);
	if (event.srcElement.nodeName == "INPUT") {
		event.stopPropagation;
		return;
	}	
	if(inspect == true) return;  
	console.log("keyCode is: " + p.keyCode);  
	let needsnew = [53,54,81,84,89,80,65,186,88,67,66,78,188,190,59];
	let newkey = {
		53: 190, 54: 190, 81: 1000, 84: 38, 89: 38, 80: 1001, 65: 39, 186: 37, 88: 188, 67: 84, 66: 40, 78: 40, 188: 89, 190: 188, 59: 37
	}
	if(KEYBOARD.value() == "Default"){
		if(needsnew.includes(p.keyCode)) p.keyCode = newkey[p.keyCode];
	}
	if(timer.isRunning && race > 1 && Math.round(timer.getTime() / 10)/100.0 > 0){ //racedetect
		raceDetect();
		return;
	}
	if(p.keyCode == 32 && MODE == "speed" && document.getElementById("s_RACE2").style.display == "block"){
		speedRace2();
	}
	if(p.keyCode == 32 && canMan == false && (MODE == "normal" || MODE == "timed")){ //space
		stopMoving();
		return;
	}
	if(p.keyCode == 16){ //shift
		//postUsers("Jaden", "Leung", "cool");
		matchPassword("a", "a");
		//console.log("audioon is "+ audioon);
	}
	if(customb > 0 && (p.keyCode <37 || p.keyCode > 40)) return;

	if(p.keyCode == 27 && (MODE == "normal" || MODE == "timed")) //escape
	{
		reSetup();
		return;
	}
	if(p.keyCode == 27 && (MODE == "speed" && race == 1)) //escape
	{
		quickSolve();
		return;
	}
	if(race > 1 && p.keyCode == 27 && document.getElementById("s_RACE2").style.display == "block"){
		quickSolve();
		return;
	}
	if(p.keyCode == 50 && race < 1) //2 //two
	{
		if(SPEED != 2)
		{
			SPEED_SLIDER.value(2);
			SPEED = 2;
		}
		else{
			SPEED_SLIDER.value(0.01);
			SPEED = 0.01;
		}
		return;
	}
	if(p.keyCode == 52) //4
	{
		CAM = p.createEasyCam(p._renderer);
		CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
		if(DIM2 == 100)
			CAM.zoom(CAMZOOM+140);
		else
			CAM.zoom(CAMZOOM);
		rotateIt();
		return;
	}
	if(p.keyCode == 55){ //7
		alert(getID());
		return;
	}
	if(p.keyCode == 45)
	{
		console.log("hello")
		inp.elt.focus();
		return;
	}
	if(canMan == true)
	{
		setLayout();
		//console.log("here");
		let include = "37 39 40 38 76 83 74 70 72 71 79 87 75 73 68 69 188 190 65 186 86 82 78 66 77 85 80 81 84 89 1000 1001 90 191 59";
		let bad2 = "188 190 65 186 80 81 77 85 86 82 78 66 84 89 59";
		let bad3 = "88c";
		if(DIM == 100)
			include = "37 39 40 38 76 83 74 70 72 71 79 87 75 73 68 69 80 81 1000 1001";
		if(bad2.includes(p.keyCode) && (DIM == 100 || DIM == 5) && p.keyCode > 9) return;
		if(bad3.includes(p.keyCode) && p.keyCode > 9 || p.keyCode == 18) return;
		let cubies = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
		if(DIM == 6) cubies = [4,5,7,8,13,14,16,17];
		if(DIM == 1) cubies = [9,10,11,12,13,14,15,16,17];
		if(DIM == 2) cubies = [0,1,2,3,4,5,6,7,8,18,19,20,21,22,23,24,25,26];
		if(DIM == 50){
			cubies = [];
			for(let i = 0; i < 27; i++){
				if(CUBE[i].stroke != 0) cubies.push(i);
			}
		}
		//console.log("cubies is " + cubies);
		if(Array.isArray(DIM) && DIM[0] != "adding")
		{
			cubies = [];
			for(let i = 0; i < 27; i++)
			{
				if(!DIM[6].includes(i))
					cubies.push(i);
			}
		}
		let onedown = false;
		alldown = false;
		let bad4 = [83,76,70,74,69,68,73,75,71,72,87,79,65,186,188,190,81,80,85,77,82,86,89,84,78,66,90,191,59]; //no rotations
		if(bad4.includes(p.keyCode) && (DIM == 1 || DIM == 6 || DIM == 2 || Array.isArray(DIM) || DIM == 50)){
			alldown = true;
			if(p.keyCode == 83 || p.keyCode == 76){ //D
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == 50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].x == 50);
			}
			if(p.keyCode == 70 || p.keyCode == 74){ //U
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == -50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].x == -50);
			}
			if(p.keyCode == 69 || p.keyCode == 68){ //L
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == -50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].z == -50);
			}
			if(p.keyCode == 73 || p.keyCode == 75){ //R
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == 50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].z == 50);
			}
			if(p.keyCode == 71 || p.keyCode == 72){ //F
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].y == 50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].y == 50);
			}
			if(p.keyCode == 87 || p.keyCode == 79){ //B
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].y == -50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].y == -50);
			}
			if(p.keyCode == 65 || p.keyCode == 186 || p.keyCode == 59){ //E
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == 0);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].x == 0);
			}
			if(p.keyCode == 188 || p.keyCode == 190){ //M
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == 0);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].z == 0);
			}
			if(p.keyCode == 81 || p.keyCode == 80){ //S
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].y == 0);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].y == 0);
			}
			if(p.keyCode == 85 || p.keyCode == 77){ //Rw
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == 50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].z == 50 || (CUBE[cubies[i]].z == 0));
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == 0);
			}
			if(p.keyCode == 82 || p.keyCode == 86){ //Lw
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == -50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].z == -50 || (CUBE[cubies[i]].z == 0));
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].z == 0);
			}
			if(p.keyCode == 89 || p.keyCode == 84){ //Uw
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == -50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].x == -50 || CUBE[cubies[i]].x == 0);
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == 0);
			}
			if(p.keyCode == 90 || p.keyCode == 191){ //Dw
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == 50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].x == 50 || CUBE[cubies[i]].x == 0);
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].x == 0);
			}
			if(p.keyCode == 78 || p.keyCode == 66){ //Fw
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].y == 50);
				for(let i = 0; i < cubies.length; i++) alldown = alldown && (CUBE[cubies[i]].y == 50 || CUBE[cubies[i]].y == 0);
				for(let i = 0; i < cubies.length; i++) onedown = onedown || (CUBE[cubies[i]].y == 0);
			}
			if(onedown == false) return;
		}
		
		
		for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
			if (CUBE[i].animating()) {
				return;
			}
		}
		let bad5 = [69,68,71,72,73,75,87,79,85,77,82,86,66,78,188,190,81,80] //for 3x3x2
		let setup = [CUBE[4].x, CUBE[4].y, CUBE[4].z];
		if(setup[0] == -50 || setup[0] == 50) //top
			bad5 = [69,68,71,72,73,75,87,79,85,77,82,86,66,78,188,190,81,80];
		else if(setup[2] == -50 || setup[2] == 50) //left
			bad5 = [71,72,87,79,66,78,81,80,70,74,76,83,89,84,186,65,90,191,59];
		else bad5 = [188,190,81,80,70,74,76,83,89,84,73,75,69,68,85,77,82,86,186,65,90,191,59]; // front
			
		let bad6 = [190,188,65,186,80,81,59];
		if((INPUT.value() == "Key-Double" && bad4.includes(p.keyCode)) || (INPUT.value() == "Key-3x3x2" && bad5.includes(p.keyCode))){
			redo = [];
			if(p.keyCode == 83) changeArr("D2")
			if(p.keyCode == 76) changeArr("D2'")
			if(p.keyCode == 74) changeArr("U2")
			if(p.keyCode == 70) changeArr("U2'")
			if(p.keyCode == 69) changeArr("L2'")
			if(p.keyCode == 68) changeArr("L2")
			if(p.keyCode == 73) changeArr("R2")
			if(p.keyCode == 75) changeArr("R2'")
			if(p.keyCode == 72) changeArr("F2")
			if(p.keyCode == 71) changeArr("F2'")
			if(p.keyCode == 87) changeArr("B2")
			if(p.keyCode == 79) changeArr("B2'")
			if(p.keyCode == 65) changeArr("E2")
			if(p.keyCode == 186 || p.keyCode == 59) changeArr("E2'")
			if(p.keyCode == 190) changeArr("M2")
			if(p.keyCode == 188) changeArr("M2'")
			if(p.keyCode == 80) changeArr("S2")
			if(p.keyCode == 81) changeArr("S2'")
			if(p.keyCode == 85) changeArr("Rw2")
			if(p.keyCode == 77) changeArr("Rw2'")
			if(p.keyCode == 86) changeArr("Lw2")
			if(p.keyCode == 82) changeArr("Lw2'")
			if(p.keyCode == 89) changeArr("Uw2")
			if(p.keyCode == 84) changeArr("Uw2'")
			if(p.keyCode == 78) changeArr("Fw2")
			if(p.keyCode == 66) changeArr("Fw2'")
			if(p.keyCode == 90) changeArr("Dw2")
			if(p.keyCode == 191) changeArr("Dw2'")
			multiple(0, true);	
			return;
		}
		else if(INPUT.value() == "Key-Gearcube" && bad4.includes(p.keyCode)){
			if(bad6.includes(p.keyCode))
				return;
			redo = [];
			if(p.keyCode == 83) changeArr("d D")
			if(p.keyCode == 76) changeArr("d' D'")
			if(p.keyCode == 74) changeArr("u U")
			if(p.keyCode == 70) changeArr("u' U'")
			if(p.keyCode == 69) changeArr("l' L'")
			if(p.keyCode == 68) changeArr("l L")
			if(p.keyCode == 73) changeArr("r R")
			if(p.keyCode == 75) changeArr("r' R'")
			if(p.keyCode == 72) changeArr("f F")
			if(p.keyCode == 71) changeArr("f' F'")
			if(p.keyCode == 87) changeArr("b B")
			if(p.keyCode == 79) changeArr("b' B'")
			multiple(0, true);	
			return;
		}
		switch (p.keyCode) {	
			case 37:
			if(customb > 0 && rotationz != 0) break;
			redo = [];
			console.log("Left Arrow/y");
			undo.push("y");
			animateRotate("x", -1);
			rotationx--;
			if(rotationx == -1) rotationx = 3;
			break;
			case 39:
			if(customb > 0 && rotationz != 0) break;
			redo = [];
			console.log("Right Arrow/y'");
			undo.push("y'");
			animateRotate("x", 1);
			rotationx++;
			if(rotationx == 4) rotationx = 0;
			break;	
			case 40:
			console.log("Down Arrow/x'");
			if(customb > 0 && rotationx != 0) break;
			redo = [];
			undo.push("x'");
			animateRotate("z", -1);
			rotationz--;
			if(rotationz == -1) rotationz = 3;
			break;
			case 38:
			console.log("Up Arrow/x");
			if(customb > 0 && rotationx != 0) break;
			redo = [];
			undo.push("x");
			animateRotate("z", 1);
			rotationz++;
			if(rotationz == 4) rotationz = 0;
			break;	
			case 1000:
			undo.push("z'");
			redo = [];
			animateRotate("y", 1);
			break;
			case 1001:
			undo.push("z");
			redo = [];
			animateRotate("y", -1);
			break;
			case 76:
			undo.push("D'");
			redo = [];
			animate('x', 50, -1, true);
			break;
			case 83:
			undo.push("D");
			redo = [];
			animate('x', 50, 1, true);
			break;
			case 74:
			undo.push("U");
			redo = [];
			animate('x', -50, -1, true);
			break;
			case 70:
			undo.push("U'");
			redo = [];
			animate('x', -50, 1, true);
			break;
			case 72:
			undo.push("F");
			redo = [];
			animate('y', 50, -1, true);
			break;
			case 71:
			undo.push("F'");
			redo = [];
			animate('y', 50, 1, true);
			break;
			case 79:
			undo.push("B'");
			redo = [];
			animate('y', -50, -1, true);
			break;
			case 87:
			undo.push("B");
			redo = [];
			animate('y', -50, 1, true);
			break;
			case 75:
			undo.push("R'");
			redo = [];
			animate('z', 50, -1, true);
			break;
			case 73:
			undo.push("R");
			redo = [];
			animate('z', 50, 1, true);
			break;
			case 68:
			undo.push("L");
			redo = [];
			animate('z', -50, -1, true);
			break;
			case 69:
			undo.push("L'");
			redo = [];
			animate('z', -50, 1, true);
			break;
			case 188:
			undo.push("M'");
			redo = [];
			animate('z', 0, 1, true);
			break;
			case 190:
			undo.push("M");
			redo = [];
			animate('z', 0, -1, true);
			break;
			case 65:
			undo.push("E");
			redo = [];
			animate('x', 0, 1, true);
			break;
			case 186:
			case 59:
			undo.push("E'");
			redo = [];
			animate('x', 0, -1, true);
			break;
			case 80:
			undo.push("S");
			redo = [];
			animate('y', 0, -1, true);
			break;
			case 81:
			undo.push("S'");
			redo = [];
			animate('y', 0, 1, true);
			break;
			case 77:
			undo.push("Rw'");
			redo = [];
			animateWide('z', 50, -1, true);
			break;
			case 85:
			undo.push("Rw");
			redo = [];
			animateWide('z', 50, 1, true);
			break;
			case 86:
			undo.push("Lw");
			redo = [];
			animateWide('z', -50, -1, true);
			break;
			case 82:
			undo.push("Lw'");
			redo = [];
			animateWide('z', -50, 1, true);
			break;
			case 78:
			undo.push("Fw");
			redo = [];
			animateWide('y', 50, -1, true);
			break;
			case 66:
			undo.push("Fw'");
			redo = [];
			animateWide('y', 50, 1, true);
			break;
			case 84:
			undo.push("Uw'");
			redo = [];
			animateWide('x', -50, 1, true);
			break;
			case 89:
			undo.push("Uw");
			redo = [];
			animateWide('x', -50, -1, true);
			break;
			case 90:
			undo.push("Dw");
			redo = [];
			animateWide('x', 50, 1, true);
			break;
			case 191:
			undo.push("Dw'");
			redo = [];
			animateWide('x', 50, -1, true);
			break;
			case 8: //backspace
			Undo();
			break;
			case 61:
			case 187: //equals
			Redo();
			break;
			case 27: //escape
			if(MODE == "normal" || MODE == "timed" || MODE == "cube" || MODE == "account" || MODE == "login") 
			reSetup();
			if(MODE == "moves")
			moveSetup();
			if(MODE == "speed")
			speedSetup();
			break;
			case 192: //`
			if(MODE == "normal" || MODE == "cube" || MODE == "timed" || MODE == "account" || MODE == "login")
				shuffleCube();
			break;
			case 49: //1
			if(document.getElementById("s_instruct").innerHTML.includes("In one game of"))
			regular();
			if(MODE == "moves")
			movesmode();
			if(MODE == "speed")
			speedmode();
			if(MODE == "timed" || (MODE == "cube" && custom == 0) || document.getElementById("test_alg_span").innerHTML == "Paste ID here:")
			regular();
			if(document.getElementById("settings1").style.display == "block")
			regular();
			if(MODE == "cube" && custom > 0)
			{
				cubemode();
				custom = 0
			}
			break;
			case 32: //space
			console.log(layout, cubyColors, CUBE)
			if(MODE == "cube" || MODE == "normal" || MODE == "timed")
			{
				stopTime();
			}
			let str = "";
			for(let i = undo.length-1; i >= 0; i--)
			{
				str += Inverse(undo[i]) + " ";
			}
			break;
			case 13: //enter
			/*fetch('src/PLL.json')
			.then((response) => response.json())
			.then((obj) => (setPLL(obj)));*/
			console.log("erger");
			break;
			case 56: //8
			removeTime();
			break;
			case 57: //9
			if(MODE != "normal" && MODE != "timed")
				break;
			TOPWHITE.selected("Blue");
			TOPPLL.selected("Same as above");
			SPEED_SLIDER.value(2);
			SPEED = 2;
			topWhite();
			KEYBOARD.value("Alt Keyboard");
			changeKeys();
			break;
			case 51: //3
			DARK.checked(!DARK.checked());
			darkMode();
			break;
		}
		let bad = -1;
		if(undo.length > 0)
		{
			let rnd = undo[undo.length-1];
			if(rnd.slice(-1) == "'")
				bad = rnd.substring(0, rnd.length-1);
			else
				bad = rnd + "'";
		}
		if(include.includes(p.keyCode) && p.keyCode != 8)
		{
			if(timer.isRunning && MODE != "moves")
			{
				moves++
			}
			else if(MODE == "moves")
			{
				if(undo[undo.length-2] == bad)
				{
					undo.pop();
					undo.pop();
					if(p.keyCode < 37 || p.keyCode > 40)
						moves--;
				}
				else if(p.keyCode < 37 || p.keyCode > 40)
					moves++;
			}
		}
	}
}
function setPLL(obj)
{
	obj2 = obj;
}
function setPBL(obj)
{
	pbls = obj;
}
function setOLL(obj)
{
	olls = obj;
}
function multiple(nb, timed) {
	if((MODE == "speed" || MODE == "moves") && arr.length > 2)
	return;
	if (nb < arr.length) {
		canMan = false;
		notation(arr[nb], timed);
		let bad = -1;
		if(undo.length > 0)
		{
			let rnd = arr[nb];
			if(rnd.slice(-1) == "'")
				bad = rnd.substring(0, rnd.length-1);
			else
				bad = rnd + "'";
		}
		if(timer.isRunning && MODE != "moves")
		{
			moves++;
		}
		else if(MODE == "moves")
		{
			if(undo[undo.length-2] == bad)
			{
				undo.pop();
				undo.pop();
				moves--;
			}
			else
				moves++;
		}
		console.log(nb);
		waitForCondition(multiple.bind(null, nb + 1), true);
	}
	else
	{
		canMan = true;
	}
}
function waitForCondition(callback, delay) {
    if (!isAnimating()) {
        callback();
    } else {
        setTimeout(function() {
            waitForCondition(callback);
        }, 0 + DELAY * 1000 * delay); // Check every milliseconds
    }
}

function multiple2(nb, timed) {
	if (nb < arr.length) {
		shufflespeed = 2;
		canMan = false;
		notation(arr[nb], timed);
		console.log(nb);
		waitForCondition(multiple2.bind(null, nb + 1));
	}
	else
	{
		if(arr.length > 1)
		{
			undo = [];
			redo = [];
		}
		shufflespeed = 5;
		canMan = true;
		if(race > 1){
			canMan = false;
			shuffling = false;
		}
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
			if(str[end] == "'")
			{
				end++;
				arr.push(temp + "'");
				arr.push(temp + "'");
			}
			else{
				arr.push(temp + "");
				arr.push(temp + "");
			}
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
function changeArr2(str, len)
{
	if(arr.length == 0 || len < arr.length)
		changeArr(str);
}
function Undo()
{
	
	console.log(undo);
	console.log(1596)
	if(undo.length == 0 || !canMan)
	return;
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].animating()) {
			return;
		}
	}
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
	if(timer.isRunning && MODE != "moves")
		moves++;
	else if(MODE == "moves")
	{
		if(!(move.includes("x") || move.includes("y") || move.includes("z")) && moves > 0)
		{
			moves--;
		}
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
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].animating()) {
			return;
		}
	}  
	flipmode = 0;
	setLayout();
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
	if(timer.isRunning && MODE != "moves")
		moves++;
	else if(MODE == "moves")
	{
		if(!(move.includes("x") || move.includes("y") || move.includes("z")))
		{
			moves++;
		}
	}
	arr = [move];
	multiple2(0);
}
function refreshButtons()
{
	if(modnum == 0)
		document.getElementById("or_instruct5").innerHTML = "Shape Mods";
	else
		document.getElementById("or_instruct5").innerHTML = "Bandaged Mods";
	SPEEDMODE.remove();
	REGULAR.remove();
	TIMEDMODE.remove();
	MOVESMODE.remove();
	IDMODE.remove();
	SETTINGS.remove();
	VOLUME.remove();
	SPEEDMODE2.remove();
	REGULAR2.remove();
	TIMEDMODE2.remove();
	MOVESMODE2.remove();
	ONEBYTHREE.remove();
	SANDWICH.remove();
	CUBE3.remove();
	CUBE4.remove();
	CUBE5.remove();
	CUBE6.remove();
	CUBE7.remove();
	CUBE8.remove();
	CUBE9.remove();
	CUBE10.remove();
	CUBE11.remove();
	CUBE12.remove();
	CUBE13.remove();
	CUBE14.remove();
	REGULAR = p.createButton('Normal Mode');
	setButton(REGULAR, "mode", 'btn btn-info', 'text-align:center; font-size:20px; width:180px; border: none;', regular.bind(null, 0));

	TIMEDMODE = p.createButton('Stats Mode');
	setButton(TIMEDMODE, "mode3", 'btn btn-info', 'text-align:center; font-size:20px; width:180px; border: none;', timedmode.bind(null, 0));
	
	MOVESMODE = p.createButton('Fewest Moves');
	setButton(MOVESMODE, "mode7", 'btn btn-info', 'text-align:center; font-size:20px; width:180px; border: none;', movesmode.bind(null, 0));

	SPEEDMODE = p.createButton('Speed Mode');
	setButton(SPEEDMODE, "mode2", 'btn btn-info', 'text-align:center; font-size:20px; width:180px; border: none;', speedmode.bind(null, 0));

	IDMODE = p.createButton('Save/Load ID');
	setButton(IDMODE, "ID2", 'btn btn-info', 'text-align:center; border: none;', idmode.bind(null, 0));

	SETTINGS = p.createButton('⚙️');
	SETTINGS.attribute('title', 'Settings');
	setButton(SETTINGS, "settings", '', 'font-size: 40px; height: 60px; width: 60px; background-color: white; border: none; border-radius: 10px;', settingsmode.bind(null, 0));
	if(goodsound)
		SETTINGS.position(cnv_div.offsetWidth-140,5);
	else{
		SETTINGS.position(cnv_div.offsetWidth-80,5);
		SETTINGS.style("background-color: #e6e6e6;")
	}

	if (localStorage.audioon === "false") {
		audioon = false;
	}

	if(audioon){
		VOLUME = p.createButton('🔊');
		VOLUME.attribute('title', 'Sound on');
	}
	else{
		VOLUME = p.createButton('🔇');
		VOLUME.attribute('title', 'Sound off');
	}
	VOLUME.parent("audio");
	VOLUME.style("font-size: 40px; border: none;"); 
	VOLUME.style("background-size: cover; background-color: white; border-radius: 10px; height: 60px; width: 60px;");
	VOLUME.position(cnv_div.offsetWidth-60,5);
	VOLUME.mousePressed(() => {
		if(audioon){
			VOLUME.html("🔇");
			VOLUME.attribute('title', 'Sound off');
		}
		else{
			VOLUME.html("🔊");
			VOLUME.attribute('title', 'Sound on');
		}
		audioon = !audioon;
	});
	

	REGULAR2 = p.createButton('Normal');
	setButton(REGULAR2, "mode4", 'btn btn-light btn-sm mode1', 'text-align:center; font-size:10px; border-color: black;', regular.bind(null, 0));
	
	SPEEDMODE2 = p.createButton('Speed');
	setButton(SPEEDMODE2, "mode5", 'btn btn-light btn-sm mode1', 'text-align:center; font-size:10px; border-color: black;', speedmode.bind(null, 0));

	TIMEDMODE2 = p.createButton('Stat');
	setButton(TIMEDMODE2, "mode6", 'btn btn-light btn-sm mode1', 'text-align:center; font-size:10px; border-color: black;', timedmode.bind(null, 0));

	MOVESMODE2 = p.createButton('FMC');
	setButton(MOVESMODE2, "mode8", 'btn btn-light btn-sm mode1', 'text-align:center; font-size:10px; border-color: black;', movesmode.bind(null, 0));

	if(modnum == 0)
	{
		ONEBYTHREE = p.createButton('1x3x3');
		setButton(ONEBYTHREE, "cube1", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', changeFour.bind(null, 0));

		SANDWICH = p.createButton('3x3x2');
		setButton(SANDWICH, "cube2", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', changeFive.bind(null, 0));

		CUBE3 = p.createButton('Plus Cube');
		setButton(CUBE3, "cube3", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', changeSix.bind(null, 0));

		CUBE4 = p.createButton('Christmas 3x3');
		setButton(CUBE4, "cube4", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', changeSeven.bind(null, 0));

		CUBE5 = p.createButton('Christmas 2x2');
		setButton(CUBE5, "cube5", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change8.bind(null, 0));

		CUBE6 = p.createButton('The Jank 2x2');
		setButton(CUBE6, "cube6", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change10.bind(null, 0));

		CUBE13 = p.createButton('Sandwhich Cube');
		setButton(CUBE13, "cube13", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change17.bind(null, 0));
	}
	else{
		CUBE7 = p.createButton('Slice Bandage');
		setButton(CUBE7, "cube7", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change11.bind(null, 7, [[3,4,5,6,7,8]]));

		CUBE8 = p.createButton('The Pillars');
		setButton(CUBE8, "cube8", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change12.bind(null, 8, [[0,3,6], [2,5,8]]));

		CUBE9 = p.createButton('Triple Quad');
		setButton(CUBE9, "cube9", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change13.bind(null, 9, [[7,8,5,4],[16,15,12],[25,26,23,22]]));

		CUBE10 = p.createButton('Bandaged 2x2');
		setButton(CUBE10, "cube10", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change14.bind(null, 10, [[6,8]]));

		CUBE11 = p.createButton('Z Perm');
		setButton(CUBE11, "cube11", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change15.bind(null, 11, [[0,9], [20,11], [24,15], [8,17]]));

		CUBE12 = p.createButton('T Perm');
		setButton(CUBE12, "cube12", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change16.bind(null, 12, [[0,9], [2,11], [24,15], [26,17]]));

		CUBE14 = p.createButton('Cube Bandage');
		setButton(CUBE14, "cube14", 'btn btn-info', 'height:45px; width:180px; text-align:center; font-size:20px; border: none;', change18.bind(null, 14, [[13,14,16,17,22,23,25,26]]));
	}

}
function solveCube()
{
	if(canMan == false)
	return;
	modeData("solvecube");
	setLayout();
	if(!isSolved())
	{
		if(timer.getTime() > 0)
		{
			document.getElementById("scramble").innerHTML = "N/A";
		}
		timer.reset();
		timer.start();
		moves = 0;
		document.getElementById("stepbig").innerHTML = "Current Solving Step (";
		canMan = false;
		if(DIM == 50){
			stepTwo();
		}
		else
		{
			color = layout[2][0][0][0];
			stepFour();
		}
	}
	
}
function notation(move, timed){
	if(flipmode2 == 1)
	{
		move = flipper2[move];
	}
	if(flipmode > 0)
	{
		move = flipper[move];
	}
	undo.push(move);
	setLayout();
	if(move == "D'")
	animate('x', 50, -1, timed);
	if(move == "D")
	animate('x', 50, 1, timed);
	if(move == "U")
	animate('x', -50, -1, timed);
	if(move == "U'")
	animate('x', -50, 1, timed);
	if(move == "F")
	animate('y', 50, -1, timed);
	if(move == "F'")
	animate('y', 50, 1, timed);
	if(move == "B'")
	animate('y', -50, -1, timed);
	if(move == "B")
	animate('y', -50, 1, timed);
	if(move == "R'")
	animate('z', 50, -1, timed);
	if(move == "R")
	animate('z', 50, 1, timed);
	if(move == "L")
	animate('z', -50, -1, timed);
	if(move == "L'")
	animate('z', -50, 1, timed);
	if(move == "M'")
	animate('z', 0, 1, timed);
	if(move == "M")
	animate('z', 0, -1, timed);
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
	animate('x', 0, 1, timed);
	if(move == "E'")
	animate('x', 0, -1, timed);
	if(move == "S")
	animate('y', 0, -1, timed);
	if(move == "S'")
	animate('y', 0, 1, timed);
	if(move == "Lw")
	animateWide('z', -50, -1, timed);
	if(move == "Lw'")
	animateWide('z', -50, 1, timed);
	if(move == "Rw'")
	animateWide('z', 50, -1, timed);
	if(move == "Rw")
	animateWide('z', 50, 1, timed);
	if(move == "Fw")
	animateWide('y', 50, -1, timed);
	if(move == "Fw'")
	animateWide('y', 50, 1, timed);
	if(move == "Bw'")
	animateWide('y', -50, -1, timed);
	if(move == "Bw")
	animateWide('y', -50, 1, timed);
	if(move == "Uw")
	animateWide('x', -50, -1, timed);
	if(move == "Uw'")
	animateWide('x', -50, 1, timed);
	if(move == "Dw'")
	animateWide('x', 50, -1, timed);
	if(move == "Dw")
	animateWide('x', 50, 1, timed);
}
function stepFour()
{
	flipmode = 0;
	flipmode2 = 1;
	//dev = 1;
	if(dev == 1)
	flipmode2 = 0;
	setLayout();
	arr = [];
	let cornerarr = cornerCross(); //0 = max, 1 = color, 2 = position
	console.log(cornerarr);
	color = cornerarr[1];
	if(cornerarr[2] != 2)
	{
		if(cornerarr[2] == 0) changeArr("z");
		else if(cornerarr[2] == 1) changeArr("z'");
		else if(cornerarr[2] == 3) changeArr("z2");
		else if(cornerarr[2] == 4) changeArr("x'");
		else if(cornerarr[2] == 5) changeArr("x");
		multipleCross2(0);
	}
	else if(layout[2][0][0][0] != color || layout[2][0][2][0] != color || layout[2][2][0][0] != color || layout[2][2][2][0] != color)
	{
		document.getElementById("step").innerHTML = "Solving Corners on Bottom";
		document.getElementById("fraction").innerHTML = "1/4):";
		flipmode = 0;
		console.log("color is " + color);
		for(let i = 0; i < 4; i++)
		{
			flipmode = i;
			if(flipmode == 1)defineFlipper();
			if(flipmode == 2)defineFlipper3();
			if(flipmode == 3)defineFlipper4();
			setLayout();
			if(layout[5][2][2][0] == color)
			{
				if(layout[2][2][2][0] != color){
					if(layout[2][0][2][0] != color) changeArr2("R", 1);
					else changeArr2("F, D, F'", 3)
				}
				if(layout[2][2][0][0] != color){
					if(layout[2][2][2][0] != color) changeArr2("D' F", 2);
					else changeArr2("D' L D L'", 4)
				}
				if(layout[2][0][2][0] != color){
					if(layout[2][0][0][0] != color) changeArr2("D B", 2);
					else changeArr2("B' D B", 3)
				}
				if(layout[2][0][0][0] != color){
					if(layout[2][0][0][0] != color) changeArr2("D2 L", 3);
					else changeArr2("D L' D L", 4)
				}
			}
			if(layout[1][2][2][0] == color)
			{
				if(layout[2][2][2][0] != color){
					if(layout[2][2][0][0] != color) changeArr2("F'", 1);
					else changeArr2("R', D', R", 3)
				}
				if(layout[2][2][0][0] != color){
					if(layout[2][0][0][0] != color) changeArr2("D' L'", 2);
					else changeArr2("L D' L'", 3)
				}
				if(layout[2][0][2][0] != color){
					if(layout[2][2][2][0] != color) changeArr2("D R'", 2);
					else changeArr2("D B' D' B", 4)
				}
				if(layout[2][0][0][0] != color){
					if(layout[2][0][2][0] != color) changeArr2("D2 B'", 3);
					else changeArr2("D' B D' B'", 4)
				}
			}
			if(layout[3][2][2][0] == color)
			{
				if(layout[2][2][2][0] != color){
					if(layout[2][0][2][0] != color) changeArr2("D R2", 3);
					else if(layout[2][2][0][0] != color) changeArr2("D' F2", 3);
					else changeArr2("R' B' D2 B R", 6)
				}
				if(layout[2][2][0][0] != color){
					if(layout[2][2][2][0] != color) changeArr2("F2", 2);
					else if(layout[2][0][0][0] != color) changeArr2("D2 L2", 2);
					else changeArr2("L D2 L' F' D' F", 7)
				}
				if(layout[2][0][2][0] != color){
					if(layout[2][2][2][0] != color) changeArr2("R2", 2);
					else if(layout[2][0][0][0] != color) changeArr2("D2 B2", 2);
					else changeArr2("B' D2 B R D R'", 7)
				}
				if(layout[2][0][0][0] != color){
					if(layout[2][2][0][0] != color) changeArr2("D' L2", 3);
					else if(layout[2][0][2][0] != color) changeArr2("D B2", 3);
					else changeArr2("R' D2 R B D' B'", 7)
				}
			}
			if(layout[1][0][2][0] == color)
			{
				if(layout[2][2][0][0] != color)
					changeArr2("F'", 1)
				else if(layout[2][0][2][0] != color && layout[2][0][0][0] != color)
					changeArr2("R B", 2)
				else changeArr2("F D' F' R' D' R", 6)
			}
			if(layout[5][0][2][0] == color)
			{
				if(layout[2][0][2][0] != color)
					changeArr2("R", 1)
				else if(layout[2][2][0][0] != color && layout[2][0][0][0] != color)
					changeArr2("F' L'", 2)
				else changeArr2("R' D R F D F'", 6)
			}
			if(arr.length > 0)break;
		}
		if(arr.length == 0) arr = ["y"];
		multipleCross2(0);
	}
	else if(!isSolved())
	{
		color = opposite[color];
		flipmode2 = 0;
		stepFive();
	}
	else
	{
		document.getElementById("step").innerHTML = "";
		document.getElementById("fraction").innerHTML = "";
		document.getElementById("stepbig").innerHTML = "";
		canMan = true;
		saystep = 0;
	}
}
function stepFive()
{
	flipmode2 = 0;
	setLayout();
	if(cornerOLL2() != 4)
	{
		document.getElementById("step").innerHTML = "Solving Corners on Top";
		document.getElementById("fraction").innerHTML = "2/4):";
		flipmode = 0;
		for(let i = 0; i < 4; i++)
		{
			flipmode = i;
			if(flipmode == 1)defineFlipper();
			if(flipmode == 2)defineFlipper4();
			if(flipmode == 3)defineFlipper3();
			setLayout();
			if(cornerOLL2() == 0)
			{
				if(layout[5][0][0][0] == color && layout[5][0][2][0] == color && layout[4][0][2][0] == color)
					changeArr("R2 U2 R U2 R2");
				else if(layout[0][0][0][0] == color && layout[0][0][2][0] == color && layout[5][0][2][0] == color)
					changeArr("F R U R' U' R U R' U' F'");
			}
			else if(cornerOLL2() == 1)
			{
				if(layout[2][2][0][0] == color && layout[5][0][2][0] == color)
					changeArr("R U R' U R U2 R'");
				else if(layout[2][0][2][0] == color && layout[5][0][0][0] == color)
					changeArr("R U2 R' U' R U' R'");
			}
			else
			{
				if(layout[2][0][0][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
					changeArr("F R' F' R U R U' R'");
				else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
					changeArr("R U R' U' R' F R F'");
				else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[0][0][0][0] == color)
					changeArr("F R U R' U' F'");
			}
			if(arr.length > 0)break;
		}
		if(arr.length == 0) arr = ["U'"];
		multipleCross3(0);
	}
	else if(layout[5][0][0][0] != layout[5][0][2][0] || layout[0][0][0][0] != layout[0][0][2][0] || layout[5][2][0][0] != layout[5][2][2][0] || layout[0][2][0][0] != layout[0][2][2][0])
	{
		document.getElementById("step").innerHTML = "Permutation of Both Layers (PBL)";
		document.getElementById("fraction").innerHTML = "3/4):";
		arr = [];
		setLayout();
		let a = cornerPLL()[0];
		let b = cornerPLL()[1];
		if(a == 4 && b == 0 || a == 4 && b == 1 || a == 0 && b == 1)
		{
			flipmode2 = 1;
			setLayout();
			a = cornerPLL()[0];
			b = cornerPLL()[1];
		}
		for(let i = 0; i < 4; i++)
		{
			flipmode = i;
			if(flipmode == 1)defineFlipper();
			if(flipmode == 2)defineFlipper4();
			if(flipmode == 3)defineFlipper3();
			setLayout();
			if(a == 0 && b == 0)
			{
				changeArr("R2 F2 R2")
			}
			else if(a == 1 && b == 1)
			{
				if(layout[5][0][0][0] == layout[5][0][2][0] && layout[5][2][0][0] == layout[5][2][2][0])
				{
					changeArr("R2 U' B2 U2 R2 U' R2");
				}
				else if(layout[0][0][0][0] == layout[0][0][2][0] && layout[5][2][0][0] == layout[5][2][2][0])
					changeArr("U'")
				else if(layout[1][0][0][0] == layout[1][0][2][0] && layout[5][2][0][0] == layout[5][2][2][0])
					changeArr("U")
				else if(layout[4][0][0][0] == layout[4][0][2][0] && layout[5][2][0][0] == layout[5][2][2][0])
					changeArr("U2");
			}
			else if(a == 1 && b == 0)
			{
				if(layout[5][0][0][0] == layout[5][0][2][0])
					changeArr("R U' R F2 R' U R'")
			}
			else if(a == 1 && b == 4)
			{
				if(layout[0][0][0][0] == layout[0][0][2][0])
					changeArr("B U2 R U' B' U B U R' U B'");
			}
			else if(a == 0 && b == 4)
			{
				changeArr("R' U R' F2 R F' U R' F2 R F' R");

				
			}
			if(arr.length > 0)break;
		}
		if(arr.length == 0) arr = ["U'"];
		console.log("arr is " + arr);
		multipleCross3(0);
	}
	else if(!isSolved())
	{
		document.getElementById("step").innerHTML = "Adjust Upper Face (AUF)";
		document.getElementById("fraction").innerHTML = "4/4):";
		if(layout[0][0][0][0] == layout[5][2][0][0])
			changeArr("U'");
		else
			changeArr("U")
		multipleCross3(0);
	}
	else{
		document.getElementById("step").innerHTML = "";
		document.getElementById("fraction").innerHTML = "";
		document.getElementById("stepbig").innerHTML = "";
		saystep = 0;
		canMan = true;
	}
}
function stepTwo(){
	console.log("attempt")
	flipmode2 = 1;
	//dev
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
		document.getElementById("step").innerHTML = 'Putting "best" solved side on top';
		document.getElementById("fraction").innerHTML = "1/8):";
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
		document.getElementById("fraction").innerHTML = "2/8):";
		saystep = 2;
		arr = [];
		flipmode = 0;
		let whichmode = 0;
		let whichlength = 99;
		console.log("color is " + color);
		for(let i = 0; i < 4; i++)
		{
			flipmode = i;
			if(flipmode == 1)defineFlipper();
			if(flipmode == 2)defineFlipper3();
			if(flipmode == 3)defineFlipper4();
			setLayout();
			let color2 = layout[5][1][1][0];
			console.log(flipmode);
			/*if(flipmode == 2) 
			{ 
				//console.log("lol");
				console.log("lol, " + (layout[2][0][1][0] == color && layout[2][0][1][5] == color2));
				return;
			}*/
			
			let edgenorth = false;
			let edgewest = false;
			let edgesouth = false;
			let edgeeast = false;
			if(layout[2][0][1][0] == color && layout[4][0][1][0] == layout[4][1][1][0]) edgenorth = true;
			if(layout[2][1][0][0] == color && layout[0][0][1][0] == layout[0][1][1][0]) edgewest = true;
			if(layout[2][1][2][0] == color && layout[1][0][1][0] == layout[1][1][1][0]) edgeeast = true;
			if(layout[2][2][1][0] == color && layout[5][0][1][0] == color2) edgesouth = true;
			
			if(edgesouth) continue;
			if(layout[2][1][0][0] == color && layout[2][1][0][5] == color2){
				if(edgenorth || edgewest || edgesouth) changeArr2("L U L' U'", 4)
				else changeArr2("U'", 0);
			}
			else if(layout[2][1][2][0] == color && layout[2][1][2][5] == color2){
				if(edgenorth || edgewest || edgesouth) changeArr2("R' U' R U", 4)
				else changeArr2("U", 0);
			}
			else if(layout[2][0][1][0] == color && layout[2][0][1][5] == color2){
				console.log("here5")
				if(edgenorth || edgewest || edgesouth) changeArr2("B2 D2 F2", 6)
				else changeArr2("U2", 0);
			}
			else if(layout[5][0][1][0] == color && layout[5][0][1][5] == color2){
				changeArr2("F U' R U", 4);
			}
			else if(layout[0][0][1][0] == color && layout[0][0][1][5] == color2){
				changeArr2("L F", 2);
			}
			else if(layout[1][0][1][0] == color && layout[1][0][1][5] == color2){
				changeArr2("R' F'", 2);
			}
			else if(layout[4][0][1][0] == color && layout[4][0][1][5] == color2){
				changeArr2("B' U' R' U", 4);
			}
			else if(layout[5][1][0][0] == color && layout[5][1][0][5] == color2){ //Middle layer
				changeArr2("U L' U'", 3);
			}
			else if(layout[5][1][0][0] == color2 && layout[5][1][0][5] == color){ 
				changeArr2("F", 1);
			}
			else if(layout[5][1][2][0] == color && layout[5][1][2][5] == color2){ 
				changeArr2("U' R U", 3);
			}
			else if(layout[5][1][2][5] == color && layout[5][1][2][0] == color2){ 
				changeArr2("F'", 1);
			}
			else if(layout[0][1][0][0] == color && layout[0][1][0][5] == color2){ 
				if(edgeeast) changeArr2("L2 F L2", 5);
				else changeArr2("L2 F", 3)
			}
			else if(layout[0][1][0][5] == color && layout[0][1][0][0] == color2){ 
				changeArr2("U L U'", 3);
			}
			else if(layout[1][1][0][0] == color && layout[1][1][0][5] == color2){ 
				if(edgeeast) changeArr2("R2 F' R2", 5);
				else changeArr2("R2 F'", 3)
			}
			else if(layout[1][1][0][5] == color && layout[1][1][0][0] == color2){ 
				changeArr2("U' R' U", 3);
			}
			else if(layout[5][2][1][0] == color && layout[5][2][1][5] == color2){ //bottom layer
				if(!edgeeast) changeArr2("D' L' F", 3);
				else if(!edgewest) changeArr2("D R F'", 3);
				else changeArr2("F' U' R U", 4);
			}
			else if(layout[5][2][1][5] == color && layout[5][2][1][0] == color2){ 
				changeArr2("F2", 2);
			}
			else if(layout[0][2][1][0] == color && layout[0][2][1][5] == color2){ 
				if(!edgeeast) changeArr2("L' F", 2);
				else changeArr2("L' F L", 3);
			}
			else if(layout[0][2][1][5] == color && layout[0][2][1][0] == color2){ 
				changeArr2("D F2", 3);
			}
			else if(layout[1][2][1][0] == color && layout[1][2][1][5] == color2){ 
				if(!edgewest) changeArr2("R F'", 2);
				else changeArr2("R F' R'", 3);
			}
			else if(layout[1][2][1][5] == color && layout[1][2][1][0] == color2){ 
				changeArr2("D' F2", 3);
			}
			else if(layout[4][2][1][0] == color && layout[4][2][1][5] == color2){ 
				if(!edgeeast) changeArr2("D L' F", 3)
				else if(!edgewest) changeArr2("D' R F'", 3);
				else changeArr2("D' R F' R'", 4);
			}
			else if(layout[4][2][1][5] == color && layout[4][2][1][0] == color2){ 
				changeArr2("D2 F2", 4);
			}
			
			if(arr.length != 0 && arr.length < whichlength){
				whichlength = arr.length;
				whichmode = i;
			}
		}
		flipmode = whichmode;
		if(flipmode == 1)defineFlipper();
		if(flipmode == 2)defineFlipper3();
		if(flipmode == 3)defineFlipper4();
		setLayout();
		if(arr.length == 0) arr = ["y"];
		multipleCross2(0);
	}
	else if(cornerPFL() < 210) 	//f2l2
	{
		console.log("cornerPFL " + cornerPFL());
		saystep = 7;
		document.getElementById("step").innerHTML = "Putting corner pieces on bottom";
		document.getElementById("fraction").innerHTML = "3/8):";
		arr = [];
		let color2 = layout[5][0][1][0];
		let color3 = layout[1][0][1][0];
		if(goodF2L() != 2 && goodF2L() != 0 && DIM == 50)
		{
			if(goodF2L() == 1)
			{
				if(flipmode == 0){
					flipmode = 3;
					defineFlipper4();
					
				}
				else if(flipmode == 3) {
					flipmode = 1;
					defineFlipper();

				}
				else if(flipmode == 1){
					flipmode = 2;
					defineFlipper3();
				}
				else if(flipmode == 2){
					flipmode = 0;
				}
				setLayout();
			}
			else if(goodF2L() == 3)
			{
				if(flipmode == 0){
					flipmode = 2;
					defineFlipper3();
					
				}
				else if(flipmode == 2) {
					flipmode = 1;
					defineFlipper();

				}
				else if(flipmode == 1){
					flipmode = 3;
					defineFlipper4();
				}
				else if(flipmode == 3){
					flipmode = 0;
				}
				setLayout();
			}
			else
			{
				if(flipmode == 0){
					defineFlipper();
					flipmode = 1;
				}
				else if(flipmode == 1) flipmode = 0;
				else if(flipmode == 2){
					flipmode = 3;
					defineFlipper4();
				}
				else if(flipmode == 3){
					flipmode = 2;
					defineFlipper3();
				}
				setLayout();
			}
		}
		else if(layout[3][0][0].includes(color) || layout[3][0][2].includes(color) || layout[3][2][0].includes(color) || layout[3][2][2].includes(color))
		{
			mindist = 99;
			minaction = -1;
			if(layout[5][2][2].includes(color)){ //minaction = 0
				console.log("hey her", layout[5][2][2]);
				let color1 = layout[5][2][2][0];
				let color2 = layout[5][2][2][5];
				let color3 = layout[5][2][2][7];
				let center1 = layout[5][1][1][0];
				let center2 = layout[1][1][1][0];
				let center3 = layout[4][1][1][0];
				let center4 = layout[0][1][1][0];
				F2ldist(color1, color2, color3, center1, center2, center3, center4, 0)
			}
			if(layout[0][2][2].includes(color)){ //minaction = 1
				let color1 = layout[0][2][2][0];
				let color2 = layout[0][2][2][5];
				let color3 = layout[0][2][2][7];
				let center1 = layout[0][1][1][0];
				let center2 = layout[5][1][1][0];
				let center3 = layout[1][1][1][0];
				let center4 = layout[4][1][1][0];
				F2ldist(color1, color2, color3, center1, center2, center3, center4, 1)
			}
			if(layout[1][2][0].includes(color)){ //minaction = 2
				let color1 = layout[1][2][2][0];
				let color2 = layout[1][2][2][5];
				let color3 = layout[1][2][2][7];
				let center1 = layout[1][1][1][0];
				let center2 = layout[4][1][1][0];
				let center3 = layout[0][1][1][0];
				let center4 = layout[5][1][1][0];
				F2ldist(color1, color2, color3, center1, center2, center3, center4, 2)
			}
			if(layout[4][2][0].includes(color)){ //minaction = 3
				let color1 = layout[4][2][2][0];
				let color2 = layout[4][2][2][5];
				let color3 = layout[4][2][2][7];
				let center1 = layout[4][1][1][0];
				let center2 = layout[0][1][1][0];
				let center3 = layout[5][1][1][0];
				let center4 = layout[1][1][1][0];
				F2ldist(color1, color2, color3, center1, center2, center3, center4, 3)
			}
		if(!layout[5][2][2].includes(color))
		{
			if(minaction == 1)
			{
				if(flipmode == 0){
					flipmode = 3;
					defineFlipper4();
					
				}
				else if(flipmode == 3) {
					flipmode = 1;
					defineFlipper();

				}
				else if(flipmode == 1){
					flipmode = 2;
					defineFlipper3();
				}
				else if(flipmode == 2){
					flipmode = 0;
				}
				setLayout();
			}
			else if(minaction == 2)
			{
				if(flipmode == 0){
					flipmode = 2;
					defineFlipper3();
					
				}
				else if(flipmode == 2) {
					flipmode = 1;
					defineFlipper();

				}
				else if(flipmode == 1){
					flipmode = 3;
					defineFlipper4();
				}
				else if(flipmode == 3){
					flipmode = 0;
				}
				setLayout();
			}
			else if(minaction == 3)
			{
				//return;
				if(flipmode == 0){
					defineFlipper();
					flipmode = 1;
				}
				else if(flipmode == 1) flipmode = 0;
				else if(flipmode == 2){
					flipmode = 3;
					defineFlipper4();
				}
				else if(flipmode == 3){
					flipmode = 2;
					defineFlipper3();
				}
				setLayout();
				//stepThree();
				//return;
			}
			console.log("flipmode", flipmode, "mindist", mindist, "minaction", minaction, layout);
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
		setEdgevars();
		if(layout[5][2][2][0] == color) //F2L F2l f2l
		{
			if(DIM == 100)
				changeArr("F, D, F'");
			else if(layout[1][2][1][0] == layout[1][2][2][0] && layout[3][1][2][0] == layout[3][2][2][0])
			arr.push("Uw'", "B'", "D", "B");
			else if(layout[1][2][2][0] == layout[0][2][1][0] && layout[3][2][2][0] == layout[3][1][0][0]){
				if(edgeleft && edgebackleft) changeArr("D R' D2 R D2 R' D R");
				else if(!edgeleft) changeArr("F' D2 F D' R' D R");
				else changeArr("D' L' D2 L R' D R");

			}
			else if (layout[1][2][2][0] == layout[3][2][1][0] && layout[3][2][2][0] == layout[5][2][1][0]){
				if(edgeback) changeArr("D' F D' F' D F D F'");
				else changeArr("R D' R' F D F'");
			}
			else if(layout[1][2][2][0] == layout[5][2][1][0] && layout[3][2][2][0] == layout[3][2][1][0]){
				changeArr("M' D' L' F L D M")
			}
			else if(layout[1][2][2][0] == layout[4][2][1][0] && layout[3][2][2][0] == layout[3][0][1][0]){
				if(edgeleft && edgebackleft) changeArr("D R' D' R D2 R' D R")
				else if (!edgeleft) changeArr("F' D' F D' R' D R");
				else changeArr("D' L' D' L R' D R")

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
				if(edgeback && edgeleft) changeArr("D' F D F' D F D F'");
				else if(edgeleft) changeArr("R D R' F D F'");
				else changeArr("F' D F2 D F'");
			}
			else if(layout[1][2][2][0] == layout[0][1][2][0] && layout[3][2][2][0] == layout[5][1][0][0]){
				changeArr("F' D' F2 D F'")
			}
			else if(layout[1][2][2][0] == layout[5][1][0][0] && layout[3][2][2][0] == layout[0][1][2][0]){
				changeArr("R U F U' R'");
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
				changeArr("R D2 R' F D F'");
			}
			else if(type < 1 && layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][2][0] == layout[1][1][1][0]){
				if(edgebackleft) changeArr("D F D F' D2 F D F'");
				else changeArr("E2 F D F' U2")
			}
			else 
			arr.push("F", "D", "F'");
		}
		else if(layout[1][2][2][0] == color)
		{
			if(DIM == 100)
				changeArr("R' D' R");
			else if(layout[5][2][2][0] == layout[5][2][1][0] && layout[3][2][1][0] == layout[3][2][2][0]){
				arr.push("Uw", "L", "D'", "L'");
			}
			else if(layout[5][2][2][0] == layout[4][2][1][0] && layout[3][2][2][0] == layout[3][0][1][0]){
				if(edgeback && edgebackleft) changeArr("D' F D2 F' D2 F D' F'");
				else if(!edgeback)changeArr("R D2 R' D F D' F'");
				else changeArr("D B D2 B' F D' F'")
			}
			else if(layout[5][2][2][0] == layout[3][1][2][0] && layout[3][2][2][0] == layout[1][2][1][0]){
				if(edgeleft) arr.push("D", "R'", "D" ,"R" ,"D'", "R'" ,"D'", "R");
				else changeArr("F' D F R' D' R");
			}
			else if(layout[5][2][2][0] == layout[1][2][1][0] && layout[3][2][2][0] == layout[3][1][2][0]){
				changeArr("S' D B R' B' D' S");
			}
			else if(layout[5][2][2][0] == layout[0][2][1][0] && layout[3][2][2][0] == layout[3][1][0][0]){
				if(edgeback && edgebackleft) changeArr("D' F D F' D2 F D' F'");
				else if(!edgeback) changeArr("R D R' D F D' F'")
				else changeArr("D B D B' F D' F'")
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
				if(edgeback && edgeleft) changeArr("D' F D' F' D R' D' R");
				else if(edgeback) changeArr("F' D' F R' D' R") 
				else changeArr("R D' R2 D' R");
			}
			else if(layout[5][2][2][0] == layout[1][1][0][0] && layout[3][2][2][0] == layout[4][1][2][0])
			changeArr("F' U' R' U F");
			else if(layout[5][2][2][0] == layout[4][1][2][0] && layout[3][2][2][0] == layout[1][1][0][0])
			changeArr("R D R2 D' R")
			else if(layout[5][2][2][0] == layout[0][1][0][0] && layout[3][2][2][0] == layout[4][1][0][0] )
			changeArr("B D B' D R' D R");
			else if(layout[5][2][2][0] == layout[4][1][0][0] && layout[3][2][2][0] == layout[0][1][0][0] )
			changeArr("D L' D' L R' D' R");
			else if(type < 1 && layout[5][1][2][0] == layout[5][1][1][0] && layout[1][1][2][0] == layout[1][1][1][0])
			{
				if(edgebackleft) changeArr("D' R' D' R D2 R' D' R");
				else changeArr("E2 R' D' R U2")
			}
			else if(layout[5][2][2][0] == layout[0][1][2][0] && layout[3][2][2][0] == layout[5][1][0][0] )
			changeArr("F' D2 F R' D' R");
			else
			arr.push("R'", "D'", "R");
		}
		else
		{
			if(DIM == 100)
				arr.push("R'", "B'" ,"D", "D" ,"B" ,"R");
			else if(layout[5][2][2][0] == layout[1][2][1][0] && layout[1][2][2][0] == layout[3][1][2][0])
			changeArr("R' D2 R D R' D' R");
			else if(layout[5][2][2][0] == layout[3][2][1][0] && layout[1][2][2][0] == layout[5][2][1][0])
			changeArr("F D2 F' D' F D F'");
			else if(layout[5][2][2][0] == layout[3][1][2][0] && layout[1][2][2][0] == layout[1][2][1][0])
			{
				if(edgeleft) changeArr("F D F' R' D R F D F'");
				else changeArr("F' D' F D' M' F2 M")
				
			}
			else if(layout[5][2][2][0] == layout[5][2][1][0] && layout[1][2][2][0] == layout[3][2][1][0])
			{
				if(edgeback) changeArr("R' D' R F D' F' R' D' R");
				else changeArr("R D R' D S' R2 S");
				
			}
			else if(layout[5][2][2][0] == layout[3][0][1][0] && layout[1][2][2][0] == layout[4][2][1][0])
				changeArr("F L D2 L' F'")
			else if(layout[5][2][2][0] == layout[4][2][1][0] && layout[1][2][2][0] == layout[3][0][1][0])
			{
				if(edgeback) changeArr("D' R' D2 R D' R' D R");
				else changeArr("R D' R' D S' R2 S")
			}
			else if(layout[5][2][2][0] == layout[0][2][1][0] && layout[1][2][2][0] == layout[3][1][0][0])
				changeArr("R' B' D2 B R");
			else if(layout[5][2][2][0] == layout[3][1][0][0] && layout[1][2][2][0] == layout[0][2][1][0])
			{
				if(edgeleft) changeArr("D F D2 F' D F D' F'")
				else changeArr("F' D F D' M' F2 M")
			}
			else if(layout[5][2][2][0] == layout[5][1][0][0] && layout[1][2][2][0] == layout[0][1][2][0])
			changeArr("L' F L F' D2 R' D' R");
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
			else if(layout[5][2][2][0] == layout[0][1][0][0] && layout[1][2][2][0] == layout[4][1][0][0])
			changeArr("D' B' L B L' D' R' D' R");
			else if(layout[5][2][2][0] == layout[4][1][0][0] && layout[1][2][2][0] == layout[0][1][0][0])
			changeArr("D2 F L' D L F'");
			else			
			arr.push("R'", "B'" ,"D", "D" ,"B" ,"R");

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
document.getElementById("fraction").innerHTML = "4/8):";
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
&& layout[1][1][0][0] == layout[1][1][1][0] && layout[1][1][1][0] == layout[1][1][2][0]) && saystep < 12 && DIM == 50)
{
	document.getElementById("step").innerHTML = "Solving middle layer";
	document.getElementById("fraction").innerHTML = "5/8):";
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
	movesarr.push(moves);
	scrambles.push(document.getElementById('scramble').innerText)
	flipmode = 0;
	saystep = 0;
	canMan = true;
	return;
}
console.log(color + " " + layout[2][1][1][0]);
if(!(layout[2][0][1][0] == color && layout[2][1][0][0] == color && layout[2][1][2][0] == color) && saystep < 14 && DIM == 50)
{
	flipmode2 = 0;
	setLayout();
	console.log(layout);
	document.getElementById("step").innerHTML = "Orientation of Last Layer (OLL)";
	document.getElementById("fraction").innerHTML = "6/8):";
	saystep = 13;
	flipmode = 0;
	arr = [];
	for(let i = 0; i < 4; i++)
	{
		flipmode = i;
		if(flipmode == 1)defineFlipper();
		if(flipmode == 2)defineFlipper4();
		if(flipmode == 3)defineFlipper3();
		setLayout();
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
			}
			else if(cornerOLL() == 1){
				if(layout[2][2][0][0] == color && layout[5][0][2][0] == color)
				changeArr("r U' r' U' r U r' F' U F"); //13
				else if(layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				changeArr("R' F R U R' F' R F U' F'"); //14
				else if(layout[2][0][0][0] == color && layout[5][0][2][0] == color)
				changeArr("l' U' M U' L U l' U l") //15
				else if(layout[2][0][2][0] == color && layout[5][0][0][0] == color)
				changeArr("r U M U R' U' r U' r'") //16
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
			}
		}
		else if(layout[2][0][1][0] == color && layout[2][2][1][0] == color) // |
		{
			if(cornerOLL() == 2)
			{
				if(layout[2][0][0][0] == color && layout[2][2][0][0] == color && layout[1][0][0][0] == color && layout[1][0][2][0] == color)
				changeArr("R' U' R' F R F' U R"); //46
			}
			else if(cornerOLL() == 0)
			{
				if(layout[5][0][0][0] == color && layout[4][0][0][0] == color && layout[1][0][0][0] == color && layout[1][0][2][0] == color)
				changeArr("R U R' U R U' B U' B' R'"); //52
			}
		}
		else if(layout[2][0][1][0] == color && layout[2][1][0][0] == color) //Normal (J)
		{
			if(cornerOLL() == 4)
			changeArr("M U M' U2 M U M'"); //28
			else if(cornerOLL() == 0)
			{
				if(layout[0][0][0][0] == color && layout[0][0][2][0] == color && layout[5][0][2][0] == color && layout[4][0][2][0] == color)
				changeArr("F R U R' U' R U R' U' F'"); //48
				else if(layout[0][0][0][0] != color && layout[0][0][2][0] != color && layout[5][0][2][0] == color && layout[5][0][2][0] == color)
				changeArr("r U2 R' U' R U R' U' R U' r'"); //54
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
			}
		}
		else if(layout[2][1][0][0] == color && layout[2][2][1][0] == color) //Backwards r
		{
			if(cornerOLL() == 2){
				if(layout[2][0][0][0] == color && layout[2][0][2][0] == color && layout[5][0][0][0] == color)
				changeArr("M U F R U R' U' F' M'"); //42
			}
			else if(cornerOLL() == 1 && layout[2][0][2][0] == color && layout[0][0][2][0] == color && layout[5][0][2][0] == color){
				changeArr("R U R' B' R B U' B' R' B"); //10
			}
		}
		else if(layout[2][1][2][0] == color && layout[2][0][1][0] == color) //L
		{
			if(cornerOLL() == 2)
			{
				if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
				changeArr("M' B U B' U' r' U' R"); //31
				else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color)
				changeArr("F' U' L' U L F");//43
				else if(layout[2][0][0][0] == color && layout[2][2][2][0] == color && layout[0][0][2][0] == color)
				changeArr("L' U' L U' L' U L U L F' L' F");//36
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
			
		}
		else if(layout[2][1][2][0] == color && layout[2][2][1][0] == color) //r
		{
			if(cornerOLL() == 0 && layout[0][0][2][0] == color && layout[5][0][2][0] == color && layout[0][0][0][0] == color)
			changeArr("r' U r2 U' r2 U' r2 U r'"); //50
			else if(cornerOLL() == 2 && layout[2][2][2][0] == color && layout[5][0][0][0] == color && layout[2][0][0][0] == color)
			changeArr("R U2 R2 F R F' R U2 R'"); //35
		}
		else if(layout[2][0][1][0] != color && layout[2][1][0][0] != color && layout[2][1][2][0] != color) //Dot Cases (Dot Product Haha)
		{
			console.log("here4");
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
			changeArr("F R' F' R2 r' U R U' R' U' M'"); //17
			else if(cornerOLL() == 2 && layout[2][2][2][0] == color && layout[4][0][2][0] == color && layout[2][2][0][0] == color)
			changeArr("F R U R' d R' U2 R' F R F'"); //18
			else if(cornerOLL() == 2 && layout[2][0][2][0] == color && layout[2][0][0][0] == color && layout[0][0][2][0] == color)
			changeArr("M U R U R' U' M' R' F R F'"); //19
		}
		if(arr.length > 0)break;
	}
	if(arr.length == 0) arr = ["U'"];
	multipleCross3(0);
}
else if(layout[2][0][0][0] != color || layout[2][0][2][0] != color || layout[2][2][0][0] != color || layout[2][2][2][0] != color && saystep < 15)
{
	flipmode2 = 0;
	setLayout();
	document.getElementById("step").innerHTML = "Orientation of Last Layer (OLL)";
	document.getElementById("fraction").innerHTML = "6/8):";
	flipmode = 0;
	saystep = 14;
	arr = [];
	for(let i = 0; i < 3; i++)
	{
		flipmode = i;
		if(flipmode == 1)defineFlipper();
		if(flipmode == 2)defineFlipper4();
		if(flipmode == 3)defineFlipper3();
		setLayout();
		if(cornerOLL() == 0){
			if(layout[0][0][0][0] == color && layout[0][0][2][0] == color)
			{
				if(layout[5][0][2][0] == color)
				changeArr("R U' L' U R' U L U L' U L"); //22
				else
				changeArr("R U R' U R U' R' U R U2 R'"); //21
			}
		}
		else if(cornerOLL() == 1){
			if(layout[2][2][2][0] == color && layout[5][0][0][0] == color)
			changeArr("L' U' L U' L' U2 L"); //26 antisune
			else if(layout[2][2][0][0] == color && layout[5][0][2][0] == color)
			changeArr("R U R' U R U2 R'"); //27 sune
		}else{
			if(layout[2][0][0][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
			changeArr("F R' F' r U R U' r'"); //25
			else if(layout[2][0][0][0] == color && layout[2][0][2][0] == color && layout[5][0][2][0] == color)
			changeArr("R2 D R' U2 R D' R' U2 R'"); //23
			else if(layout[2][0][2][0] == color && layout[2][2][2][0] == color && layout[5][0][0][0] == color)
			changeArr("r U R' U' r' F R F'"); //24
		}
		if(arr.length > 0)break;
	}
	if(arr.length == 0) arr = ["U'"];
	multipleCross3(0);
}
else if(!(layout[0][0][0][0] == layout[0][0][2][0] && layout[5][0][0][0] == layout[5][0][2][0]) && saystep <16)
{
	flipmode2 = 0;
	setLayout();
	document.getElementById("step").innerHTML = "Permutation of the Last Layer (PLL)";
	document.getElementById("fraction").innerHTML = "7/8):";
	saystep = 15;
	arr = [];
	flipmode = 0;
	for(let i = 0; i < 4; i++)
	{
		flipmode = i;
		if(flipmode == 1)defineFlipper();
		if(flipmode == 2)defineFlipper4();
		if(flipmode == 3)defineFlipper3();
		setLayout();
		if(layout[0][0][0][0] == layout[0][0][2][0])
		{
			setLayout();
			if(DIM == 100)
			changeArr("B U2 R U' B' U B U R' U B'")
			else if(layout[5][0][0][0] == layout[5][0][1][0] && opposite[layout[0][0][1][0]] == layout[0][0][2][0]) //T
			changeArr("R U R' U' R' F R2 U' R' U' R U R' F'")
			else if(layout[5][0][1][0] == layout[5][0][2][0] && layout[1][0][2][0] == layout[1][0][1][0]) //Aa
			changeArr("B' R B' L2 B R' B' L2 B2");
			else if(layout[1][0][0][0] == layout[1][0][1][0] && layout[4][0][2][0] == layout[4][0][1][0]) //Ab
			changeArr("F R' F L2 F' R F L2 F2");
			else if(layout[0][0][1][0] == layout[0][0][2][0] && layout[5][0][0][0] == layout[5][0][1][0]) //Ja
			changeArr("F' U B' U2 F U' F' U2 F B");
			else if(layout[0][0][1][0] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][1][0]) //F
			changeArr("B L U M B' U' B M' U B L' B R B R'");
			else if(layout[0][0][1][0] == layout[5][0][0][0] && layout[0][0][2][0] == layout[5][0][1][0]) //Rb
				changeArr("F' U2 F U' L' B L F' L' B' L U' F");
			else if(layout[5][0][0][0] == layout[5][0][1][0]) //Ra
			changeArr("B U2 B' U L F' L' B L F L' U B'");
			else if(layout[0][0][1][0] == layout[0][0][2][0] && layout[5][0][1][0] == layout[5][0][2][0]) //Jb
				changeArr("B U2 R U' B' U B U R' U B'")
				//RIP MY BELOVED changeArr("R U R' F' R U R' U' R' F R2 U' R'"); 
			else if(layout[5][0][1][0] == layout[5][0][2][0]) //Ga
			changeArr("L F2 R F' L' F U R' U' F' L F' L'");
			else if(opposite[layout[0][0][1][0]] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][1][0]) //Gb
			changeArr("R' U' R B2 D L' U L U' L D' B2");
			else if(opposite[layout[0][0][1][0]] == layout[0][0][2][0]) //Gd
			changeArr("R U R' F2 D' L U' L' U L' D F2");
			else
			changeArr("R2 Uw' R U' R U R' u R2 B U' B'"); //Gc
		}
		else if(opposite[layout[0][0][0][0]] == layout[0][0][2][0] && opposite[layout[5][0][0][0]] == layout[5][0][2][0])
		{
			if(DIM == 100)
			changeArr("R U' R' U' F2 U' R U R' U F2")
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
		}
		if(arr.length > 0)break;
	}
	if(arr.length == 0) arr = ["U'"];
	multipleCross3(0);
}
else if(correctPFL() < 3 && DIM == 50)
{
	document.getElementById("step").innerHTML = "Permutation of the Last Layer (PLL)";
	document.getElementById("fraction").innerHTML = "7/8):";
	flipmode2 = 0;
	flipmode = 0;
	setLayout();
	arr = [];
	for(let i = 0; i < 4; i++)
	{
		flipmode = i;
		if(flipmode == 1)defineFlipper();
		if(flipmode == 2)defineFlipper4();
		if(flipmode == 3)defineFlipper3();
		setLayout();

		if(correctPFL() == 0)
		{
			if(opposite[layout[5][0][1][0]] == layout[5][0][0][0])
			{
				changeArr("M2 U' M2 U2 M2 U' M2") //H
			}
			else if(layout[5][0][1][0] == layout[1][0][2][0])
			{
				changeArr("M2 u M2 u' S M2 S'") //Z
			}
		}
		if(correctPFL() == 1)
		{
			if(layout[4][0][1][0] == layout[4][0][2][0])
			{
				if(layout[5][0][1][0] == layout[0][0][2][0])
				{
					changeArr("M2 U' M U2 M' U' M2"); //Ub
				}
				else
				{
					changeArr("M2 U M U2 M' U M2"); //Ua
				}
				
			}
		}
		if(arr.length > 0)break;
	}
	if(arr.length == 0) arr = ["U'"];
	multipleCross3(0);
}
else if(layout[5][0][0][0] != layout[5][1][1][0])
{
	document.getElementById("step").innerHTML = "Adjusting Upper Face (AUF)";
	document.getElementById("fraction").innerHTML = "8/8):";
	flipmode2 = 0;
	flipmode = 0;
	setLayout();
	if(layout[5][0][0][0] == layout[0][1][1][0])
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
	saystep = 0;
	canMan = true;
}
}
function multipleCross3(nb) {
	if(canMan == true) return;
	if (document.getElementById("s_RACE2").style.display == "block" || document.getElementById("s_RACE").style.display == "block") return;
	if(MODE != "normal" && MODE != "timed" && race == 0)
	{
		flipmode = 0;
		flipmode2 = 0;
		return;
	}
	if(DIM == "50")
		flipmode2=0;
	setLayout();
	if (nb < arr.length) {
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		moves++;
		waitForCondition(multipleCross3.bind(null, nb + 1), true);
	}
	else
	{
		//sleep(1000);
		flipmode2 = 0;
		setLayout();
		if(DIM == 50)
		stepThree();
		else
		stepFive();
		console.log("done");
	}
}
function multipleCross2(nb) {
	if(canMan == true) return;
	if(MODE != "normal" && MODE != "timed" && race == 0)
	{
		flipmode = 0;
		flipmode2 = 0;
		return;
	}
	if (document.getElementById("s_RACE2").style.display == "block" || document.getElementById("s_RACE").style.display == "block") return;
	setLayout();
	if (nb < arr.length) {
		canMan = false;
		moves++;
		notation(arr[nb]);
		console.log(nb);
		waitForCondition(multipleCross2.bind(null, nb + 1), true);
	}
	else
	{
		//sleep(1000);
		setLayout();
		if(DIM == 50)
			stepTwo();
		else
		{
			stepFour();
		}
		console.log("done");
	}
}
function multipleMod(nb, len, total2, prev)
{
	if(canMan == true)return;
	if (nb < arr.length) {
		canMan = false;
		notation(arr[nb]);
		waitForCondition(multipleMod.bind(null, nb + 1, len, total2, prev));
	}
	else{
		if(arr.length > 1)
		{
			undo = [];
			redo = [];
		}
		shufflespeed = 5;
		canMan = true;
		shufflePossible(len-1, total2, prev);
	}
}
function multipleCross(nb) {
	setLayout();
	if (crossColor() == "nope") {
		moves++;
		canMan = false;
		notation(arr[nb]);
		console.log(nb);
		waitForCondition(multipleCross.bind(null, nb + 1), true);
	}
	else
	{
		//sleep(1000);
		console.log("Calling step 2");
		stepTwo();
		console.log("done");
	}
}
function darkMode(){
	if(BACKGROUND_COLOR != 5){
		BACKGROUND_COLOR = 5;
		document.body.style.backgroundColor = "black";
		document.body.style.color = "lightblue";
	}
	else{
		BACKGROUND_COLOR = 230;
		document.body.style.backgroundColor = "#c9ffda";
		document.body.style.color = "#0a1970";
	}
}
function greenLayer(){
	for(let i = 0; i < 6; i++)
	{
		if(layout[i][0][0][0] == "g" && layout[i][0][2][0] == "g" && layout[i][2][0][0] == "g" && layout[i][2][2][0] == "g")
		{
			if((layout[i][0][0].includes(layout[i][0][2][5]) || layout[i][0][0].includes(layout[i][0][2][7]))
				&&(layout[i][0][0].includes(layout[i][2][0][5]) || layout[i][0][0].includes(layout[i][2][0][7]))
				&&(layout[i][2][2].includes(layout[i][0][2][5]) || layout[i][2][2].includes(layout[i][0][2][7]))
				&&(layout[i][2][2].includes(layout[i][2][0][5]) || layout[i][2][2].includes(layout[i][2][0][7]))
				&&(layout[i][0][0]))
				{
					if(i == 0 && layout[5][0][0][0] == layout[5][2][0][0]) return true;
					if(i == 1 && layout[5][0][2][0] == layout[5][2][2][0]) return true;
					if(i == 2 && layout[5][0][0][0] == layout[5][0][2][0]) return true;
					if(i == 3 && layout[5][2][0][0] == layout[5][2][2][0]) return true;
					if(i == 4 && layout[2][0][0][0] == layout[2][0][2][0]) return true;
					if(i == 5 && layout[2][2][0][0] == layout[2][2][2][0]) return true;
					
				}
		}
	}
	return false;
}
function cornerCross(){
	setLayout();
	let max = 1;
	let maxarr = [];
	let maxcolor = layout[2][0][0][0];
	let maxpos = 2;
	for(let i = 2;; i--)
	{
		maxarr = [];
		maxarr["g"] = 0;
		maxarr["b"] = 0;
		maxarr["w"] = 0;
		maxarr["y"] = 0;
		maxarr["r"] = 0;
		maxarr["o"] = 0;
		maxarr[layout[i][0][0][0]]++;
		maxarr[layout[i][0][2][0]]++;
		maxarr[layout[i][2][0][0]]++;
		maxarr[layout[i][2][2][0]]++;
		let colors = ["g", "b", "w", "y", "r", "o"];
		for(let j = 0; j < 6; j++)
		{
			if(maxarr[colors[j]] > max)
			{
				max = maxarr[colors[j]];
				maxcolor = colors[j];
				maxpos = i;
			}
		}
		if(i == 0)
		i = 6;
		if(i == 3)
		break;
	}
	return [max, maxcolor, maxpos];
}
function Inverse(bad){
	if(bad.slice(-1) == "'")
	{
		bad = bad.substring(0, bad.length-1);
	}
	else
	{
		bad = bad + "'";
	}
	return bad;
}
function crossColor(){
	setLayout();
	let totalmax = 0;
	for(let i = 2;; i--)
	{
		let total = 0;
		let total2 = 0;
		let curcolor = layout[i][1][1][0];
		if(layout[i][0][1][0] == curcolor) total++;
		if(layout[i][1][0][0] == curcolor) total++;
		if(layout[i][1][2][0] == curcolor) total++;
		if(layout[i][2][1][0] == curcolor) total++;

		if(layout[2][0][1][0] == color && layout[4][0][1][0] == layout[4][1][1][0]) total2++;
		if(layout[2][1][0][0] == color && layout[0][0][1][0] == layout[0][1][1][0]) total2++;
		if(layout[2][1][2][0] == color && layout[1][0][1][0] == layout[1][1][1][0]) total2++;
		if(layout[2][2][1][0] == color && layout[5][0][1][0] == layout[5][1][1][0]) total2++;
		if(total > 0)
		{
			return [i, layout[i][1][1][0], total2];
		}
		if(i == 0)
		i = 6;
		if(i == 3)
		break;
	}
	return [2, layout[2][1][1][0], 0];
}
function numCross()
{
	let totalmax = 0;
	for(let i = 0; i < 6; i++)
	{
		let curcolor = layout[i][1][1][0];
		let total = 0;
		if(layout[i][0][1][0] == curcolor) total++;
		if(layout[i][1][0][0] == curcolor) total++;
		if(layout[i][1][2][0] == curcolor) total++;
		if(layout[i][2][1][0] == curcolor) total++;
		totalmax = Math.max(total, totalmax);
	}
	return totalmax;
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
	if(99 == 100)
	{
		if(layout[2][0][0][0] == color)
		cnt*=2;
		if(layout[2][0][2][0] == color)
		cnt*=3;
		if(layout[2][2][0][0] == color)
		cnt*=5;
		if(layout[2][2][2][0] == color)
		cnt*=7;
		return cnt;
	}
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
function cornerOLL2()
{
	let cnt = 0;
	if(layout[2][0][0][0] == color)cnt++;
	if(layout[2][0][2][0] == color)cnt++;
	if(layout[2][2][0][0] == color)cnt++;
	if(layout[2][2][2][0] == color)cnt++;
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
function cornerPLL()
{
	let a = 0;
	let b = 0;
	if(layout[5][0][0][0] == layout[5][0][2][0] && layout[0][0][0][0] == layout[0][0][2][0])
		a = 4;
	else if(layout[5][0][0][0] == opposite[layout[5][0][2][0]] && layout[0][0][0][0] == opposite[layout[0][0][2][0]])
		a = 0;
	else
		a = 1;

	if(layout[5][2][0][0] == layout[5][2][2][0] && layout[0][2][0][0] == layout[0][2][2][0])
		b = 4;
	else if(layout[5][2][0][0] == opposite[layout[5][2][2][0]] && layout[0][2][0][0] == opposite[layout[0][2][2][0]])
		b = 0;
	else
		b = 1;
	return [a, b];
}
function setEdgevars()
{
	edgeback = false;
	edgeleft = false;
	edgebackleft = false;
	if(layout[2][0][2][0] == color && layout[1][0][0][0] == layout[1][1][0][0] && layout[1][1][0][0] == layout[1][1][1][0] && layout[4][1][2][0] == layout[4][1][1][0])
	edgeback = true;
	if(layout[2][2][0][0] == color && layout[5][0][0][0] == layout[5][1][0][0] && layout[5][1][0][0] == layout[5][1][1][0] && layout[0][1][2][0] == layout[0][1][1][0])
	edgeleft = true;
	if(layout[2][0][0][0] == color && layout[0][0][0][0] == layout[0][1][0][0] && layout[0][1][0][0] == layout[0][1][1][0] && layout[4][1][0][0] == layout[4][1][1][0])
	edgebackleft = true; //3313
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
	let cnt = 0;
	if(MODE == "cube" && !easytime)return;
	let temp = [];
	cubyColors = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	//left, right, top, bottom, back, front
	let axis = ["z", "z", "x", "x", "y", "y"];
	let row = [-50, 50, -50, 50, -50, 50];
	let pos = ["back", "front", "right", "left", "bottom", "top"];
	for(let h = 0; h < row.length; h++)
	{
		for(let i = 0; i < SIZE * SIZE * SIZE; i++)
		{
			if(CUBE[i][axis[h]] == row[h])
			temp.push(i);
		}
		let temp2 = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
		for(let i = 0; i < SIZE * SIZE; i++)
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
		
		for(let x = 0; x < SIZE; x++) 
		{
			for(let y = 0; y < SIZE; y++)
			{
				if(temp2[x][y] > 9)
				layout[h][x][y] = getColor(CUBE[temp2[x][y]][pos[h]].levels) + " " + temp2[x][y];
				else
				layout[h][x][y] = getColor(CUBE[temp2[x][y]][pos[h]].levels) + " 0" + temp2[x][y];
			}
		}
		temp = [];
	}
	//if(DIM == 4 || DIM == 5)
	//return;
	if(Array.isArray(DIM) && DIM[0] != "adding") return;
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
	if(flipmode2 == 1)
	{
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
	if(flipmode == 1) //total 180 rotation
	{
		for(let x = 0; x < 3; x++){
			for(let y = 0; y < 3; y++){
				//console.log("here2");
				let temp2 = layout[0][x][y];
				layout[0][x][y] = layout[1][x][2-y];
				layout[1][x][2-y] = temp2;
			}
		}
		for (let i = 2; i < 4; i++){
			for(let x = 0; x < 2; x++){
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
		for(let x = 0; x < 3; x++){
			for(let y = 0; y < 3; y++){
				let temp2 = layout[4][x][y];
				layout[4][x][y] = layout[5][x][2-y];
				layout[5][x][2-y] = temp2;
			}
		}
	}
	if(flipmode == 2 && dev == 0 || flipmode == 3 && dev == 1) //clockwise z axis
	{
		for(let x = 0; x < 3; x++){
			for(let y = 0; y < 3; y++){
				let temp2 = layout[0][x][y];
				layout[0][x][y] = layout[5][x][y];
				layout[5][x][y] = layout[1][x][2-y];
				layout[1][x][2-y] = layout[4][x][2-y];
				layout[4][x][2-y] = temp2;
			}
		}
		for(let i = 2; i < 4; i++)
		{
			let temp2 = layout[i][0][0];
			layout[i][0][0] = layout[i][2][0];
			layout[i][2][0] = layout[i][2][2];
			layout[i][2][2] = layout[i][0][2];
			layout[i][0][2] = temp2;
			temp2 = layout[i][0][1];
			layout[i][0][1] = layout[i][1][0];
			layout[i][1][0] = layout[i][2][1];
			layout[i][2][1] = layout[i][1][2];
			layout[i][1][2] = temp2;
		}
	}
	if(flipmode == 3 && dev == 0 || flipmode == 2 && dev == 1) //Counterclockwise z axis
	{
		//console.log("here");
		for(let x = 0; x < 3; x++){
			for(let y = 0; y < 3; y++){
				let temp2 = layout[5][x][y];
				layout[5][x][y] = layout[0][x][y];
				layout[0][x][y] = layout[4][x][2-y];
				layout[4][x][2-y] = layout[1][x][2-y];
				layout[1][x][2-y] = temp2;
			}
		}
		for(let i = 2; i < 4; i++)
		{
			let temp2 = layout[i][0][0];
			layout[i][0][0] = layout[i][0][2];
			layout[i][0][2] = layout[i][2][2];
			layout[i][2][2] = layout[i][2][0];
			layout[i][2][0] = temp2;
			temp2 = layout[i][0][1];
			layout[i][0][1] = layout[i][1][2];
			layout[i][1][2] = layout[i][2][1];
			layout[i][2][1] = layout[i][1][0];
			layout[i][1][0] = temp2;
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
	opposite = [];
	opposite[layout[0][1][1][0]] = layout[1][1][1][0];
	opposite[layout[1][1][1][0]] = layout[0][1][1][0];
	opposite[layout[2][1][1][0]] = layout[3][1][1][0];
	opposite[layout[3][1][1][0]] = layout[2][1][1][0];
	opposite[layout[4][1][1][0]] = layout[5][1][1][0];
	opposite[layout[5][1][1][0]] = layout[4][1][1][0];
	
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
	cl[6] = Math.abs(color[0] - 25) + Math.abs(color[1] - 25) + Math.abs(color[2] - 25);
	cl[7] = Math.abs(color[0] - 245) + Math.abs(color[1] - 25) + Math.abs(color[2] - 245);
	let minpos = 0;
	for(let i = 0; i < 8; i++)
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
	if(minpos == 5)
	return "g";
	if(minpos == 6)
	return "k";
	if(minpos == 7)
	return "m"
}
function removeAllTimes()
{
	movesarr = [];
	mo5 = [];
	ao5 = [];
}
function removeSpecificTime(){
	if(document.getElementById("timegone4").value > 0){
		movesarr.splice(document.getElementById("timegone4").value - 1, 1);
		mo5.splice(document.getElementById("timegone4").value - 1, 1);
		ao5 = [];
		if(mo5.length <= 5){
			for(let i = 0; i < mo5.length; i++) {
				ao5[i] = mo5[i];
			}
		}
		else{
			let cnt = 0;
			for(let i = mo5.length-5; i < mo5.length; i++) {
				ao5[cnt] = mo5[i];
				cnt++;
			}
		}
	}
}
function removeTime()
{
	if(["normal","cube","timed"].includes(MODE)){
		movesarr.pop();
		mo5.pop();
		ao5.pop();
		if (mo5.length >= 5) {
			ao5.splice(0, 0, mo5[mo5.length - 5]);
		}
	}
}
function hollowCube(){
	if(HOLLOW.checked()){
		special[0] = true;
		special[1] = 0.1;
		special[3] = 3;
		BORDER_SLIDER.remove();
		BORDER_SLIDER = p.createSlider(0, 4, special[1], 0.1);
		BORDER_SLIDER.input(sliderUpdate);
		BORDER_SLIDER.parent("border");
		BORDER_SLIDER.style('width', '100px');
		GAP_SLIDER.value(3);
	}
	else{
		special[0] = false;
		special[1] = 0.3;
		BORDER_SLIDER.remove();
		special[3] = 0;
		BORDER_SLIDER = p.createSlider(0, 4, special[1], 0.1);
		BORDER_SLIDER.input(sliderUpdate);
		BORDER_SLIDER.parent("border");
		BORDER_SLIDER.style('width', '100px');
		GAP_SLIDER.value(0);
	}
	reSetup();
}
function topWhite(){

	allcubies = IDtoReal(IDtoLayout(decode(colorvalues[TOPWHITE.value()[0].toLowerCase()])));
	reSetup();
}
function testAlg(){
	if(document.getElementById("test_alg_span").innerHTML == "Paste ID here:"){
		allcubies = IDtoReal(IDtoLayout(decode(inp.value())));
		reSetup();
		setLayout();
		TOPWHITE.selected(expandc[layout[2][1][1][0]]);
	}
	else if(canMan && customb == 0)
	{
		if(inp.value() == "time")
		{
			removeTime();
			return;
		}
		else if(inp.value() == "dark"){
			darkMode();
		}
		else if(inp.value()[0] == "p")
		{
			console.log("mimni")
			let shortpll = inp.value().substring(1);
			changeArr(obj2[shortpll][1])
		}
		else
		changeArr(inp.value());
		multiple(0, false);	
	}
}
function raceDetect(){
	timer.stop();
	arr = [];
	//canMan = true;
	document.getElementById("stepbig").innerHTML = "";
	document.getElementById("step").innerHTML = "";
	document.getElementById("fraction").innerHTML = "";
	console.log("racedetect2");
	round++;
	roundresult[0]++;
	roundresult.push([Math.round(timer.getTime() / 10)/100.0, 0]);
	if(roundresult[0] < 5){
		document.getElementById("s_INSTRUCT").innerHTML = "You Win!";
		document.getElementById("s_instruct").innerHTML = "Press continue to go to the next round!";
		document.getElementById("s_instruct2").innerHTML = "Your points: <div style = 'color: green; display: inline;'>" + roundresult[0] + "</div><br>Bot points: <div style = 'color: red; display: inline;'>" + roundresult[1] + "</div>";
		document.getElementById("s_RACE2").style.display = "block";
		raceTimes();
	}
	else{
		document.getElementById("s_INSTRUCT").innerHTML = "You have defeated the bot!!!";
		document.getElementById("s_instruct").innerHTML = "Do you want to play again?";
		document.getElementById("s_instruct2").innerHTML = "Your points: <div style = 'color: green; display: inline;'>" + roundresult[0] + "</div><br>Bot points: <div style = 'color: red; display: inline;'>" + roundresult[1] + "</div>";
		document.getElementById("s_RACE").style.display = "block";
		raceTimes();
	}
	return;
}  
//   *************************************

p.mousePressed = () => {
	//if(MODE != "cube" || (MODE == "cube" && DIM == 2))
		startAction();
}

p.touchStarted = () => {
	//if(layout[2][1][1][0] != "w") return;
	let xx = p.touches[0].x;
	let yy = p.touches[0].y;
	//alert(xx + " " + yy + " length is " + p.touches.length);
	let deez = p.get(xx, p.windowHeight * WINDOW - yy);
	
	//alert(deez);
	//alert(getColor(deez));
	
	startAction();
}

p.touchEnded = () => {
	if(MODE == "speed" && race > 1 && timer.getTime() == 0 && !shuffling){
		canMan = true;
		solveCube();
	}
}

p.mouseDragged = () => {
	dragAction();
}
p.touchMoved = () => {
	dragAction();
}
function dragAction()
{
	let hoveredColor;
	if(p.touches.length == 0)
		hoveredColor = p.get(p.mouseX, p.mouseY);
	else
	{
		let xx = p.touches[0].x;
		let yy = p.touches[0].y;
		hoveredColor = p.get(xx, yy);
	}
	if (hoveredColor) {
		const cuby = getCubyIndexByColor2(hoveredColor);
		if (cuby !== false) {
			if (selectedCuby !== false) {
				if(dragCube(selectedCuby, selectedColor, cuby, hoveredColor))
					redo = [];
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
	
	let bad5 = [];
	let setup = [CUBE[4].x, CUBE[4].y, CUBE[4].z];
	if(setup[0] == -50 || setup[0] == 50) //top
		bad5 = ['L','R','F','B','S','M'];
	else if(setup[2] == -50 || setup[2] == 50) //left
		bad5 = ['U','D','F','B','E','S'];
	else bad5 = ['L','R','U','D','E','M']; // front

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
			if(INPUT.value() == "Key-Double")
				arr.push(arr[0]);
			if(INPUT.value() == "Key-3x3x2" && bad5.includes(arr[0][0]))			
				arr.push(arr[0]);
			if(INPUT.value() == "Key-Gearcube")
				arr = [];
			multiple(0, true);
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
			if(INPUT.value() == "Key-Double")
				arr.push(arr[0]);
			if(INPUT.value() == "Key-3x3x2" && bad5.includes(arr[0][0]))			
				arr.push(arr[0]);
			if(INPUT.value() == "Key-Gearcube")
				arr = [];
			multiple(0, true);
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
			if(INPUT.value() == "Key-Double")
				arr.push(arr[0]);
			if(INPUT.value() == "Key-3x3x2" && bad5.includes(arr[0][0]))			
				arr.push(arr[0]);
			if(INPUT.value() == "Key-Gearcube")
				arr = [];
			multiple(0, true);
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
			if(INPUT.value() == "Key-Double")
				arr.push(arr[0]);
			if(INPUT.value() == "Key-3x3x2" && bad5.includes(arr[0][0]))			
				arr.push(arr[0]);
			if(INPUT.value() == "Key-Gearcube")
				arr.unshift(toGearCube(arr[0]));
			multiple(0, true);
			selectedCuby = -1;
			selectedColor = [];
			return true;
		}
	}
	console.log("Loser_error")
	return false;
}
function toGearCube(move){
	if(move.length == 2){
		return move[0] + "w'";
	}
	return move + "w";
}
p.windowResized = () => {
	let cnv_div = document.getElementById("cnv_div");
	if ((window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches))
	{
		WINDOW = 0.6;
		p.resizeCanvas(DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth, p.windowHeight*WINDOW, p.WEBGL);
		PICKER.buffer.resizeCanvas(DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth, p.windowHeight * WINDOW);
	}
	else{
		WINDOW = 0.9;
		p.resizeCanvas(DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth, p.windowHeight*WINDOW, p.WEBGL);
		PICKER.buffer.resizeCanvas(DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth, p.windowHeight * WINDOW);
	}
	VOLUME.position(cnv_div.offsetWidth-60,5)
	if(goodsound)
		SETTINGS.position(cnv_div.offsetWidth-140,5);
	else{
		SETTINGS.position(cnv_div.offsetWidth-80,5);
		SETTINGS.style("background-color: #e6e6e6;")
	}
} 

p.draw = () => {
	let hoveredColor;
	if(p.touches.length == 0)
		hoveredColor = p.get(p.mouseX, p.mouseY);
	else
	{
		let xx = p.touches[0].x;
		let yy = p.touches[0].y;
		hoveredColor = p.get(xx, yy);
		CAM.removeMouseListeners();
	}
	
	if (hoveredColor && getCubyByColor(hoveredColor) && !(p.mouseIsPressed && p.touches.length == 0)) {
		CAM.removeMouseListeners();
	} else {
		if(hoveredColor[0] == BACKGROUND_COLOR)
		{
			if(p.touches.length == 0)
			CAM.attachMouseListeners();
		}
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
function F2ldist(color1, color2, color3, center1, center2, center3, center4, xx)
{
	if((center1 == color1 || center1 == color2 || center1 == color3) &&
		(center2 == color1 || center2 == color2 || center2 == color3) && mindist > 0){
		mindist = 0; minaction = xx;
	}
	if((center3 == color1 || center3 == color2 || center3 == color3) &&
		(center2 == color1 || center2 == color2 || center2 == color3) && mindist > 1){
		mindist = 1; minaction = xx;
	}
	if((center3 == color1 || center3 == color2 || center3 == color3) &&
		(center4 == color1 || center4 == color2 || center4 == color3) && mindist > 2){
		mindist = 2; minaction = xx;
	}
	if((center1 == color1 || center1 == color2 || center1 == color3) &&
		(center4 == color1 || center4 == color2 || center4 == color3) && mindist > 1){
		mindist = 1; minaction = xx;
	}
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
$(document).on("keypress", "input", function(e){
	if(e.which == 13){
		testAlg();
	}
});
$(document).on("keypress", "#password", function(e){
	if(e.which == 13){
		document.getElementById('l_submit').click();
	}
});
function isIpad(){
	return ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && !((window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches)) 
	&& !matchMedia('(pointer:fine)').matches;
}

function sideSolved(color)
{
	if(DIM == 50)
	{
		for(let i = 0; i < 6; i++)
		{
			let compare = layout[i][1][1][0];
			let isSolved = (compare == color);
			for(let x = 0; x < 3; x++)
			{
				for(let y= 0; y < 3; y++)
				{
					if(layout[i][x][y][0] != compare)
						isSolved = false;
				}
			}
			if(isSolved) return true;
		}
	}
	else
	{
		for(let i = 0; i < 6; i++)
		{
			let compare = layout[i][0][0][0];
			if(compare == color && layout[i][0][2][0] == compare && layout[i][2][0][0] == compare && layout[i][2][2][0] == compare)
				return true;
		}
	}
	return false;
}
function isSolved()
{
	//console.log("called");
	if(DIM == 100 || DIM == 5 || DIM == 10)
	{
		for(let i = 0; i < 6; i++)
		{
			let curcolor = layout[i][0][0][0]
			if(layout[i][0][2][0] != curcolor) return false;
			if(layout[i][2][0][0] != curcolor) return false;
			if(layout[i][2][2][0] != curcolor) return false;
		}
		return true;
	}
	if(DIM == 1)
	{
		let isgood = true;
		if(layout[2][1][1][0] == realtop || layout[2][1][1][0] == opposite[realtop])
		{
			if(layout[0][1][0][0] != layout[0][1][1][0] || layout[0][1][2][0] != layout[0][1][1][0])
				isgood = false;
			if(layout[5][1][0][0] != layout[5][1][1][0] || layout[5][1][2][0] != layout[5][1][1][0])
				isgood = false;
			if(layout[1][1][0][0] != layout[1][1][1][0] || layout[1][1][2][0] != layout[1][1][1][0])
				isgood = false;
			if(layout[4][1][0][0] != layout[4][1][1][0] || layout[4][1][2][0] != layout[4][1][1][0])
				isgood = false;
			let cuby1 = getColor(CUBE[+(layout[5][1][1][2] + layout[5][1][1][3])].right.levels);
			let cuby2 = getColor(CUBE[+(layout[0][1][1][2] + layout[0][1][1][3])].right.levels);
			let cuby3 = getColor(CUBE[+(layout[4][1][1][2] + layout[4][1][1][3])].right.levels);
			let cuby4 = getColor(CUBE[+(layout[1][1][1][2] + layout[1][1][1][3])].right.levels);
			let cuby5 = getColor(CUBE[+(layout[1][1][2][2] + layout[1][1][2][3])].right.levels);
			//console.log(cuby1, cuby2, cuby3, cuby4, cuby5);
			if(cuby1 != cuby5 || cuby2 != cuby5 || cuby3 != cuby5 || cuby4 != cuby5)
				isgood = false;
		}
		else if(layout[5][1][1][0] == realtop || layout[5][1][1][0] == opposite[realtop])
		{
			if(layout[2][1][0][0] != layout[2][1][1][0] || layout[2][1][2][0] != layout[2][1][1][0])
				isgood = false;
			if(layout[3][1][0][0] != layout[3][1][1][0] || layout[3][1][2][0] != layout[3][1][1][0])
				isgood = false;
			if(layout[1][0][1][0] != layout[1][1][1][0] || layout[1][2][1][0] != layout[1][1][1][0])
				isgood = false;
			if(layout[0][0][1][0] != layout[0][1][1][0] || layout[0][2][1][0] != layout[0][1][1][0])
				isgood = false;
			let cuby1 = getColor(CUBE[+(layout[2][1][1][2] + layout[2][1][1][3])].top.levels);
			let cuby2 = getColor(CUBE[+(layout[1][1][1][2] + layout[1][1][1][3])].top.levels);
			let cuby3 = getColor(CUBE[+(layout[3][1][1][2] + layout[3][1][1][3])].top.levels);
			let cuby4 = getColor(CUBE[+(layout[0][1][1][2] + layout[0][1][1][3])].top.levels);
			let cuby5 = getColor(CUBE[+(layout[2][1][2][2] + layout[2][1][2][3])].top.levels);
			//console.log(cuby1, cuby2, cuby3, cuby4, cuby5);
			if(cuby1 != cuby5 || cuby2 != cuby5 || cuby3 != cuby5 || cuby4 != cuby5)
				isgood = false;
		}
		else{
			if(layout[2][0][1][0] != layout[2][1][1][0] || layout[2][2][1][0] != layout[2][1][1][0])
				isgood = false;
			if(layout[3][0][1][0] != layout[3][1][1][0] || layout[3][2][1][0] != layout[3][1][1][0])
				isgood = false;
			if(layout[5][0][1][0] != layout[5][1][1][0] || layout[5][2][1][0] != layout[5][1][1][0])
				isgood = false;
			if(layout[4][0][1][0] != layout[4][1][1][0] || layout[4][2][1][0] != layout[4][1][1][0])
				isgood = false;
			let cuby1 = getColor(CUBE[+(layout[2][1][1][2] + layout[2][1][1][3])].front.levels);
			let cuby2 = getColor(CUBE[+(layout[5][1][1][2] + layout[5][1][1][3])].front.levels);
			let cuby3 = getColor(CUBE[+(layout[3][1][1][2] + layout[3][1][1][3])].front.levels);
			let cuby4 = getColor(CUBE[+(layout[4][1][1][2] + layout[4][1][1][3])].front.levels);
			let cuby5 = getColor(CUBE[+(layout[5][0][1][2] + layout[5][0][1][3])].front.levels);
			//console.log(cuby1, cuby2, cuby3, cuby4, cuby5);
			if(cuby1 != cuby5 || cuby2 != cuby5 || cuby3 != cuby5 || cuby4 != cuby5)
				isgood = false;
		}
		return isgood;
	}
	if(DIM == 3)
	{
		for(let i = 0; i < 6; i++)
		{
			let curcolor = layout[i][1][1][0];
			if(layout[i][0][1][0] != curcolor) return false;
			if(layout[i][1][0][0] != curcolor) return false;
			if(layout[i][1][2][0] != curcolor) return false;
			if(layout[i][2][1][0] != curcolor) return false;
		}
		return true;
	}
	if(DIM == 2)
	{
		for(let i = 0; i < 6; i++)
		{
			let curcolor = layout[i][1][1][0];
			if(curcolor == "b" || curcolor == "g")
			{
				for(let x = 0; x < 3; x++)
				{
					for(let y = 0; y < 3; y++)
					{
						if(layout[i][x][y][0] != curcolor)
							return false;
					}
				}
			}
			else
			{
				let possible = layout[i][0][0][0];
				let bool = false;
				if(layout[i][0][1][0] == possible && layout[i][0][2][0] == possible && layout[i][2][0][0] == possible 
					&& layout[i][2][1][0] == possible && layout[i][2][2][0] == possible && (layout[i][0][1].includes("g") || layout[i][0][1].includes("b")))
					bool = true;
				if(layout[i][1][0][0] == possible && layout[i][2][0][0] == possible && layout[i][0][2][0] == possible 
					&& layout[i][1][2][0] == possible && layout[i][2][2][0] == possible && (layout[i][1][0].includes("g") || layout[i][1][0].includes("b")))
					bool = true;
				if(bool == false)
					return false;
			}
		}
		return true;
	}
	if(DIM == 13){
		for(let i = 0; i < 6; i+=2){
			let same = true;
			let onecolor = layout[i][0][0][0];
			let othercolor = layout[i+1][0][0][0];
			for(let x = 0; x < 3; x++){
				for(let y = 0; y < 3; y++){
					if(layout[i][x][y][0] != onecolor) same = false;
					if(layout[i+1][x][y][0] != othercolor) same = false;
				}
			}
			if(same){
				return true;
			}
		}
		return false;
	}
	if(DIM == 6 || (Array.isArray(DIM) && DIM[0] != "adding" && goodsolved && difColors()))
	{
		let top = getColor(CUBE[13].right.levels);
		let bottom = getColor(CUBE[13].left.levels);
		let back = getColor(CUBE[13].bottom.levels);
		let front = getColor(CUBE[13].top.levels);
		let right = getColor(CUBE[13].front.levels);
		let left = getColor(CUBE[13].back.levels);
		let cubies = [4,5,7,8,13,14,16,17];
		if((Array.isArray(DIM)  && DIM[0] != "adding" && (DIM4 == 2 || goodsolved)))
		{
			cubies = [];
			for(let i = 0; i < 27; i++)
			{
				if(!DIM[6].includes(i))
					cubies.push(i);
			}
			top = getColor(CUBE[cubies[0]].right.levels);
			bottom = getColor(CUBE[cubies[0]].left.levels);
			back = getColor(CUBE[cubies[0]].bottom.levels);
			front = getColor(CUBE[cubies[0]].top.levels);
			right = getColor(CUBE[cubies[0]].front.levels);
			left = getColor(CUBE[cubies[0]].back.levels);
		}
		//console.log(cubies);
		//let cubies = [4];
		for(let i = 0; i < cubies.length; i++)
		{
			let curindex = cubies[i];
			let top2 = getColor(CUBE[curindex].right.levels);
			let bottom2 = getColor(CUBE[curindex].left.levels);
			let back2 = getColor(CUBE[curindex].bottom.levels);
			let front2 = getColor(CUBE[curindex].top.levels);
			let right2 = getColor(CUBE[curindex].front.levels);
			let left2 = getColor(CUBE[curindex].back.levels);
			if(DIM == 6){
				if((top != top2 && top != "k" && top2 != "k") || (bottom != bottom2 && bottom != "k" && bottom2 != "k") ||
				(left != left2 && left != "k" && left2 != "k") || (right != right2 && right != "k" && right2 != "k") ||
				(back != back2 && back != "k" && back2 != "k") || (front != front2 && front != "k" && front2 != "k"))
                return false;
			}
			else{
				if(top != top2 || bottom != bottom2 || left != left2|| right != right2 || back != back2 || front != front2)
					return false;
			}
        }
		return true;
        
	}
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
function median(values){  

	values.sort(function(a,b){
	  return a-b;
	});
  
	var half = Math.floor(values.length / 2);
	
	if (values.length % 2)
	  return values[half];
	
	return (values[half - 1] + values[half]) / 2.0;
  }
function myHandler(e) {
    downloadAll();
    return false;
}
function settingsDefault(){
	allcubies = false;
	special[0] = false;
	special[1] = 0.3;
	HOLLOW.checked(false);
	BORDER_SLIDER.value(0.3);
	special[3] = 0;
	GAP_SLIDER.value(0);
	TOPWHITE.value("White");
	SOUND.value("Speedcube")
	TOPPLL.value("Opposite of above");
	KEYBOARD.value("Default");
	changeKeys();
	CAMZOOM = -170;
	SIZE_SLIDER2.value(-CAMZOOM);
	GAP_SLIDER.value(0);
	topWhite();
}
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
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
function defineFlipper3(){ //Clockwise rotation around z axis
	flipper["F"] = "L"; flipper["F'"] = "L'"; flipper["U"] = "U"; flipper["U'"] = "U'"; flipper["R"] = "F"; flipper["R'"] = "F'"; flipper["L"] = "B"; 
	flipper["L'"] = "B'"; flipper["B"] = "R"; flipper["B'"] = "R'"; flipper["D"] = "D"; flipper["D'"] = "D'"; flipper["M"] = "S'"; flipper["M'"] = "S"; 
	flipper["E"] = "E"; flipper["E'"] = "E'"; flipper["S'"] = "M'"; flipper["S"] = "M"; flipper["Fw"] = "Lw"; flipper["Fw'"] = "Lw'"; flipper["Uw"] = "Uw"; 
	flipper["Uw'"] = "Uw'"; flipper["Rw"] = "Fw"; flipper["Rw'"] = "Fw'"; flipper["Lw"] = "Bw"; flipper["Lw'"] = "Bw'"; flipper["Bw"] = "Rw"; 
	flipper["Bw'"] = "Rw'"; flipper["Dw"] = "Dw"; flipper["Dw'"] = "Dw'"; flipper["x"] = "z"; flipper["x'"] = "z'";
	flipper["y"] = "y"; flipper["y'"] = "y'"; flipper["z'"] = "x"; flipper["z"] = "x'";  
}
function defineFlipper4(){ //Counterclockwise rotation around z axis
	flipper["F"] = "R"; flipper["F'"] = "R'"; flipper["U"] = "U"; flipper["U'"] = "U'"; flipper["R"] = "B"; flipper["R'"] = "B'"; flipper["L"] = "F"; 
	flipper["L'"] = "F'"; flipper["B"] = "L"; flipper["B'"] = "L'"; flipper["D"] = "D"; flipper["D'"] = "D'"; flipper["M"] = "S"; flipper["M'"] = "S'"; 
	flipper["E"] = "E"; flipper["E'"] = "E'"; flipper["S'"] = "M"; flipper["S"] = "M'"; flipper["Fw"] = "Rw"; flipper["Fw'"] = "Rw'"; flipper["Uw"] = "Uw"; 
	flipper["Uw'"] = "Uw'"; flipper["Rw"] = "Bw"; flipper["Rw'"] = "Bw'"; flipper["Lw"] = "Fw"; flipper["Lw'"] = "Fw'"; flipper["Bw"] = "Lw"; 
	flipper["Bw'"] = "Lw'"; flipper["Dw"] = "Dw"; flipper["Dw'"] = "Dw'"; flipper["x"] = "z'"; flipper["x'"] = "z";
	flipper["y"] = "y"; flipper["y'"] = "y'"; flipper["z'"] = "x'"; flipper["z"] = "x";  
}
document.onkeydown = function (e) {
	//console.log("here67")
	INPUT.elt.blur();
  };
  document.onkeyup = function(e) { //space
	if (e.keyCode == 32) {
		if(MODE == "speed" && race > 1 && timer.getTime() == 0 && !shuffling){
			canMan = true;
			solveCube();
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
//Mo50 virtual
//71.80 moves
//71.34
//71.22
//70.78
//70.20
//69.16
//66.60
//66.04
//65.56
//64.48
//Mo50 virtual 2x2: 34.34, 33.08, 29.84, 28.26
//Jaden WR 3x3: 25.4, 20.9, 19.7, 16.6, 16.07, 13.73
//Jaden WR 2x2: 3.88
//3x3 PLL Practice: 6.9, 6.84, 6.2, 5.01
//3x3 OLL Practice: 4.66, 4.31, 3.2, 3.06
//3x3 Easy: 0.8, 0.52s
//3x3 Medium: 15.4s, 13.58s
//3x3 Easy: 1.4s
//FMC: 193
//Shape Mod All (3x3x2 in 3x3x2 mode): 234.85, 125.58s, 123.2s 
//Shape Mod All WR times: (8.43, 16.39, 34.63, 20.54, 9.21, 29.57, 4.45)
//Bandage Mod ALL: 672.28

//BELOW 51 MOVES
// D R' B' L2 F D2 F2 L2 U2 F' U B' U B2 D2 (50)
// F2 R2 D R2 D' F2 L2 D2 B R U' L U2 F2 L' (50)
//  2)se$ÞG 17Þn6i~ 5HK8løå  (48)
// F2 R' D' B2 L' F D' L2 B R2 U2 R' D L' D2 F' L2 B (48)
// F2 U2 R2 D F2 L B' L' B R2 U F' D L F2 U2 B D2 (47)
// F2 U' L2 D2 R2 F2 R' F U' B' D' R U B2 R D' B2 R (47)
//?  L B2 U R' F2 D' L U L2 D2 B2 R B2 U R (43) LL Skip with no AUF!!! 
// B2 L2 D F' U2 R2 B2 D2 F' L' F D' F L2 F R2 U L2 (43)
// B2 R' F' D R2 U' R2 F2 L2 B2 U2 B2 L D R2 F' L' D2 (43)
//U2 B D' R2 U L2 D F D B R B2 U2 B' U B' L U' (41)

//WORLD RECORD SCRAMBLES
// D L' D' F2 U' L F U' B D' U' B' F2 D U' L' U D y y(was 60, 69)
// B2 U' R U F' B' U' B F L D R U' B' L' F D' R' U y y (was 59, 68)
// L D' B' D B2 R' D' F' U' L' B U D L' F B D' F' U' y y x x (was 58, 61)
// D' R' U' L R F' L2 D' U B' D U F D F2 L' D2 (was 55, 66)
// L' B2 L' R U D L2 U' F' U2 F L' U' B D2 L' (was 52, 69)
// L D F' L' R U' F' B F L' B2 U' D' R' F' D L' B2 (was 48, 71)
// R' F2 D U2 F2 D' R L2 U R B2 U L U' R' (was 41, 56)
//WORLD RECORD SCRAMBLES 2x2
//L' R B L' D L R' U F' B L R' F U L F' B' F R2 (4)
/*

Im a scare to all the crows
When I stand among the rows
But theres really more to growing
Than to keep the crows from crowing
If you want to keep the garden the green

I chase off the logs get outta here
And the wave to all the frogs hi guys
But theres really more to growing
Than to keep the crows from crowing
If you want to keep your garden the green

I know about the sun and moon
The planting in june
Animals and weeds
Watering the seeds

I know the birds and the bees
The flowers and the trees
Plants all in rows
Woah he dont know nothing about crows

I see plants that grow so
I see harvest in the fall
But to keep the plants a growing
Theres lots you should be knowing

If your gonna keep your garden
Youve gotta tend your garden
If you want to keep your garden in the green




Mr Sunshine give us your rays
You're the one who brightens our days
Without your warmth there'll be no tommorow
Instead of smiling we'll cry tears of sorrow

Mr.Sunshine keep coming through
You know that we're counting on you
Your precious rays will brighten our days
Mr. Sunshine give us your rays/*




It's growing time in story land
All the plants have their done part
And now you know if you'll help them grow
They'll help to give your day a healthy start

We hope you had a good time at our show
And I hope you learned a lot from things I know
You've really been grand for our guest at storyland
And we surely hate to see you have to go

(repeat)

If you want to plant a garden on your very own
Our vegetables have shown you how they should be grown
Start off with our seeds and tend to all their needs
And we'll always be good eating in your home
*/ 