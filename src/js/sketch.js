import './lib/p5.easycam.js';
import Picker from './picker.js';
import Cuby from './cuby.js';
import {weeklyscrambles} from '../data/weekly.js'
import {patterndata} from '../data/pattern.js'
import { getMove } from '../data/notation.js';
import {modeData, getUsers, printUsers, putUsers, matchPassword} from "./backend.js";
const socket = io("https://giraffe-bfa2c4acdpa4ahbr.canadacentral-01.azurewebsites.net/");
// const socket = io("http://localhost:3000");
//Thanks to Antoine Gaubert https://github.com/angauber/p5-js-rubik-s-cube
export default function (p) {
	const CUBYESIZE = 50;
	const DEBUG = false;
	let week = sinceNov3('w') % weeklyscrambles.length;
	let bruh = 0;
	let CAM;
	let CAM_PICKER;
	let CAMZOOM = -170;
	let alldown;
	let PICKER;
	let room = 0;
	let compete_type = "1v1";
	let compete_alltimes = [];
	let fullscreen = false;
	let CUBE = {};
	const DNF = 99999999
	let DIM = 50; //50 means 3x3, 100 means 2x2
	let DIM2 = 50;
	let DIM3 = 3;
	let DIM4 = 3;
	let competeprogress = 0;
	let mids = {3: 4, 4: 5, 5: 12};
	let touchrotate = [];
	const NOMOUSE = [13, "lasagna"];
	const removedcubies = {100: [1, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25]};
	let pracalgs = [];
	let trackthin = null; // false means thin
	const bstyle = "btn btn-secondary";
	let SOLVE;
	let timeInSeconds;
	let goodsound = true;
	let goodsolved = false;
	let RND_COLORS;
	let GAP = 0;
	let SIZE = 3;
	let MAXX = (SIZE - 1) * 25;
	let ZOOMADD;
	let nextcuby = [];
	let BORDER_SLIDER;
	let SIZE_SLIDER2;
	let GAP_SLIDER;
	let saveao5data = {length: -1, session: -1};
	let SPEED_SLIDER;
	let DELAY_SLIDER;
	let TWOBYTWO;
	let THREEBYTHREE, FOURBYFOUR, FIVEBYFIVE, LASAGNA, THREEBYTHREEBYFOUR, TWOBYTHREEBYFOUR;
	let NBYN;
	let ROTX = 2.8
	let ROTY = 7;
	let ROTZ = 2;
	let ZOOM3 = -170;
	let ZOOM2 = -25;
	let CHECK = [];
	let CHECKALL = [];
	const COMPETE_YOU = `<b style = "color: blue">`;
	let PLLS = [];
	let pracmode;
	let SPACE = [];
	let custom = 0;
	let peeks = 0;
	let inp;
	let MODE = "normal";
	let MINIMODE = "normal";
	let INPUT, SESSION;
	let SPEED = 0.01;
	let DELAY = 0;
	let shufflespeed = 5;
	let easystep = 0;
	let medstep = 0;
	let pllstep = 0;
	let ollstep = 0;
	let pllpracstep = 0;
	let m_34step = 0;
	let m_type = 0;
	let m_4step = 0;
	let ma_data = {};
	let bstep = 0, cstep = 0, dstep = false, mastep = 0, comstep = 0;
	let OLL, PLL, PLLPRAC, OLLPRAC;
	let competedata = {};
	let REGULAR;
	let SPEEDMODE;
	let TIMEDMODE;
	let MOVESMODE;
	let REGULAR2;
	let SPEEDMODE2;
	let TIMEDMODE2;
	let MOVESMODE2;
	let TIMEGONE, COMPETE_1V1, COMPETE_GROUP;
	let audioon = true;
	let input = "keyboard";
	let scramblemoves = 0;
	let edgeback = false;
	let edgeleft = false;
	let edgebackleft = false;
	let easytime;
	let mindist;
	let minaction;
	let s_savedim = 0;
	let WINDOW = 0.9
	let special = [false, 0.3, false, 0];
	let BACKGROUND_COLOR = "#e7e5ff"; //p.color(230,230,230);
	let arr = [];
	let obj2 = [];
	let pbls = [];
	let olls = [];
	let CONTINUEMATCH;
	let m_points = 0;
	let link1 = document.getElementById("link1");
	let m_scramble = [];
	let m_offset = 0;
	let m_pass = 0;
	let inspect = false;
	let giveups = 0;
	let ONEBYTHREE, SANDWICH, CUBE3, CUBE4, CUBE5, CUBE13;
	let SEL, SEL2, SEL3, SEL4, SEL5, SEL6, SEL7, IDMODE, IDINPUT, GENERATE, SETTINGS, SWITCHER,
		VOLUME, HOLLOW, TOPWHITE, TOPPLL, SOUND, KEYBOARD, FULLSCREEN, ALIGN, DARKMODE, BANDAGE_SELECT, SMOOTHBANDAGE,
		BANDAGE_SLOT, CUSTOMSHIFT;
	let RESET, RESET2, RESET3, UNDO, REDO, SHUFFLE_BTN;
	let SCRAM;
	let INPUT2 = [];
	let CUBE6, CUBE7, CUBE8, CUBE9, CUBE10, CUBE11, CUBE12, CUBE14, CUBE15, CUBE16, TWOBYTWOBYFOUR, THREEBYTHREEBYFIVE,
		ONEBYFOURBYFOUR;
	let bandaged = [];
	let darkmode = false;
	let colororder = ["", "r", "o", "y", "g", "b", "w"];
	let colororder2 = ["", "red", "orange", "yellow", "green", "blue", "white"];
	let allplls = {1: ["Ua", "Ub", "Z", "H"], 2: ["Aa", "Ab", "F", "Ja", "Jb", "Ra", "Rb", "T", "Ga", "Gb", "Gc", "Gd"], 3: ["E", "Na", "Nb", "V", "Y"], 4: ["AD", "DD", "AU", "AA", "DU"],
		5:[1,2,3,4,17,18,19,20], 6:[5,6,7,8,9,10,11,12,28,29,30,31,32,35,36,37,38,41,42,43,44,47,48,49,50], 7:[13,14,15,16,33,34,39,40,45,46,51,52,55,56,57],
		8:[21,22,23,24,25,26,27], 9:["h","pi","antisune","sune","l","t","u"]
	};
	let LEFTMOD;
	let RIGHTMOD;
	let LEFTBAN, RIGHTBAN;
	let modnum = 0;
	let CUSTOM, CUSTOM2;
	let ADDBANDAGE, VIEWBANDAGE;
	let customb = 0;
	let bandaged2 = [];
	let bandaged3 = {};
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
	let savebandage = [];
	let song = "CcDdEFfGgAaB";
	let savedark = [];
	const MAX_WIDTH = "767px";
	const MAX_WIDTH2 = "1199px";
	// const nosavesetupdim = [1, 2, 15, 6];
	const nosavesetupdim = [1,6];
	let session = 0;
	let savetimes = Array.from({ length: 5 }, () => ({ao5: [], mo5: [], movesarr: [], scrambles: []}));
	let isthin = window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches;
	let ismid = window.matchMedia("(max-width: " + MAX_WIDTH2 + ")").matches;
	colorvalues["b"] = "6BAPpVI 3iÐqtUì 4oìz÷óÐ 5þ÷";
	colorvalues["w"] = "4oìyzI# 5v8Hj*Ø 3iÐrò00 4dV";
	colorvalues["y"] = "4oìyÖ@A 5v8GÜOô 6BAQ3Úô 4vP";
	colorvalues["g"] = "16saûók 2cUin*s 5v8HýçA 1ë9";
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
	let allcubestyle = 'text-align:center; font-size:20px; border: none;' + (!ismid ? "height:45px; width:180px;" : "");
	const b_selectdim = {"2x2": changeTwo, "3x3": changeThree, "3x3x2": changeFive, "2x2x3": change19,
		"Xmas 3x3": changeSeven, "4x4" : switchSize.bind(null, 4), "5x5" : switchSize.bind(null, 5), 
		"1x3x3" : changeFour, "1x2x3" : switchSize.bind(null, 5, "1x2x3", "1x3x2", "Double Turns"), 
		"2x2x4" : switchSize.bind(null, 4, "2x2x4"),
		"2x3x4" : switchSize.bind(null, 5, "2x3x4", "3x2x4", "3x3x2"), 
		"3x3x4" : switchSize.bind(null, 5, "3x3x4", "4x3x3", "3x3x2"), 
		"3x3x5" : switchSize.bind(null, 5, "3x3x5")};

	// attach event

	link1.onclick = function(e) { return myHandler(e); };
	fetch('src/data/PLL.json')
	.then((response) => response.json())
	.then((obj) => (setPLL(obj)));

	fetch('src/data/PBL.json')
	.then((response) => response.json())
	.then((obj0) => (setPBL(obj0)));

	fetch('src/data/OLL.json')
	.then((response) => response.json())
	.then((obj9) => (setOLL(obj9)));
	let canMan = true;
	let shuffleNB;
	let undo = [];
	let redo = [];
	let layout;
	

if (localStorage.saveao5 && JSON.parse(localStorage.saveao5) && !JSON.parse(localStorage.saveao5)[0].hasOwnProperty("ao5")) {
	localStorage.removeItem("saveao5")
}
if (localStorage.saveao5) {
	savetimes = JSON.parse(localStorage.saveao5);
	session = +localStorage.session ?? 0;
	({mo5, movesarr, ao5, scrambles} = savetimes[session]);
}
let opposite = [];
opposite["g"] = "b";
opposite["b"] = "g";
opposite["y"] = "w";
opposite["w"] = "y";
opposite["o"] = "r";
opposite["r"] = "o";
opposite["k"] = "k";

const opposite2 = {
	L: "R", R: "L", F: "B", B: "F", U: "D", D: "U",
	Lw: "Rw", Rw: "Lw", Fw: "Bw", Bw: "Fw", Uw: "Dw", Dw: "Uw",
	l: "r", r: "l", f: "b", b: "f", u: "d", d: "u",
	M: "bruh"
  };


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
		this.inspection = false;
	}

	setTime(s) {
		this.startTime = s;
		this.overallTime = s;
	}
	
	_getTimeElapsedSinceLastStart () {
		if (!this.startTime) {
			return 0;
		}
		
		return Date.now() - this.startTime;
	}
	
	start (inspection = false) {
		if (this.isRunning) {
			return;
			//return console.error('Timer is already running');
		}
		
		this.isRunning = true;
		this.inspection = inspection;
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
function isMobile() {  //phone computer
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function setWidth() {
	if (!ismid) {
		document.getElementById("fullscreen").style.display = "block";
		if(FULLSCREEN) FULLSCREEN.position(cnv_div.offsetWidth-50,window.innerHeight-145);
		document.getElementById('ID_left').appendChild(document.getElementById('ID1'));
		document.getElementById('timed_left').appendChild(document.getElementById('timed_all'));
	} else {
		document.getElementById("fullscreen").style.display = "none";
		document.getElementById('ID_right').appendChild(document.getElementById('ID1'));
		document.getElementById('timed_right').appendChild(document.getElementById('timed_all'));
	}
	if (isthin == trackthin) return;
	trackthin = isthin;
	let change = [ZOOM2, ZOOM3];
	document.getElementById("audio").style.display = 'block';
	if(window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches) //phone computer
	{
		ZOOM3 = -250;
		ZOOM2 = -100;
		CAMZOOM = ZOOM3;
		setDisplay("none", ["audio", "bannercube", "bannerlogin"]);
		getEl("challenge").innerHTML = "&nbsp;Weekly";
		getEl("banner").style.paddingBottom = "10px";
		getEl("or_instruct4").style.paddingTop = "10px";

	} else {
		ZOOM3 = -170;
		ZOOM2 = -25;
		CAMZOOM = ZOOM3;
	}
	// var isSafari = false; //window.safari !== undefined || isIpad(); //safari
	if (change[0] != ZOOM2 && change[1] != ZOOM3) {
		reSetup();
	}
}
let audioContext;
const audioFiles = {
	audio1: "audio/cubesound1.mp3",
	audio2: "audio/cubesound2.mp3",
	audio3: "audio/cubesound3.mp3",
	audio4: "audio/cubesound4.mp3",
	audio5: "audio/cubesound5.mp3",
	audio6: "audio/winxp.mp3",
	audio7: "audio/winxpshutdown.mp3",
	audio8: "audio/erro.mp3"
};

const audioBuffers = {};

function initAudioContext() {
	if (!audioContext) {
		audioContext = new (window.AudioContext || window.webkitAudioContext)();
	}
}

async function preloadAudio(url, key) {
	try {
		const response = await fetch(url);
		const arrayBuffer = await response.arrayBuffer();
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
		audioBuffers[key] = audioBuffer;
	} catch (error) {
		console.error(`Error loading ${key}:`, error);
	}
}

async function preloadAllAudio() {
	initAudioContext(); // Ensure AudioContext is initialized
	const preloadPromises = Object.entries(audioFiles).map(([key, url]) => preloadAudio(url, key));
	await Promise.all(preloadPromises);
	console.log("All audio files preloaded");
}

function playAudio() {
	if (!audioon && !isthin) return;
	if (!audioContext) {
		console.warn("AudioContext not initialized");
		return;
	}
	const m = Math.random();
	let selectedBuffer;
	let volume = 1.0;
	if (SOUND.value() === "Windows XP") {
		if (m < 0.1) {
			selectedBuffer = audioBuffers.audio6;
			volume = 0.7;
		} else if (m < 0.2) {
			selectedBuffer = audioBuffers.audio7;
			volume = 0.7;
		} else {
			selectedBuffer = audioBuffers.audio8;
			volume = 0.7;
		}
	} else if (m < 0.25) {
		selectedBuffer = audioBuffers.audio4;
		volume = 0.2;
	} else if (m < 0.5) {
		selectedBuffer = audioBuffers.audio1;
		volume = 0.5;
	} else if (m < 0.75) {
		selectedBuffer = audioBuffers.audio2;
		volume = 0.8;
	} else {
		selectedBuffer = audioBuffers.audio3;
		volume = 0.5;
	}

	if (!selectedBuffer) {
		console.warn("No audio buffer selected");
		return;
	}

	const source = audioContext.createBufferSource();
	source.buffer = selectedBuffer;

	const gainNode = audioContext.createGain();
	gainNode.gain.value = volume;

	source.connect(gainNode).connect(audioContext.destination);
	source.start(0);
}

window.onload = preloadAllAudio;
const timer = new Timer();
p.setup = () => {
	
	PICKER = new Picker(p, DEBUG);
	let cnv_div = document.getElementById("cnv_div");
	const WINDOW = (window.matchMedia("(max-width: 767px)").matches || isMobile) ? 0.6 : 0.9;

	p.createCanvas(cnv_div.offsetWidth, window.innerHeight * WINDOW, p.WEBGL);
	PICKER.buffer.resizeCanvas(cnv_div.offsetWidth, window.innerHeight * WINDOW);
	
	p.pixelDensity(p.displayDensity());
	p.frameRate(60);
	p.smooth();
	
	CAM = p.createEasyCam(p._renderer);
	CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
	CAM.zoom(CAMZOOM + ZOOMADD);
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

		setWidth();
		SIZE_SLIDER2 = p.createSlider(-1000, 300, -(ZOOM3), 5);
		SIZE_SLIDER2.input(sliderUpdate2);
		SIZE_SLIDER2.parent("size");
		SIZE_SLIDER2.style('width', '100px');
		BORDER_SLIDER = p.createSlider(0, 4, localStorage.border_width ?? 0.3, 0.1);
		special[1] = localStorage.border_width ?? 0.3;
		BORDER_SLIDER.input(sliderUpdate);
		BORDER_SLIDER.parent("border");
		BORDER_SLIDER.style('width', '100px');
	}
	REGULAR = p.createButton('Normal Mode');
	SPEEDMODE = p.createButton('Speed Mode');
	TIMEDMODE = p.createButton('Stats Mode');
	MOVESMODE = p.createButton('Misc Challenges');
	IDMODE = p.createButton('Save/Load ID');
	SETTINGS = p.createButton('');
	SWITCHER = p.createButton('');
	VOLUME = p.createButton('');
	REGULAR2 = p.createButton('Normal');
	SPEEDMODE2 = p.createButton('Speed');
	TIMEDMODE2 = p.createButton('Stat');
	MOVESMODE2 = p.createButton('FMC');
	
	ONEBYTHREE = p.createButton('1x3x3');
	SANDWICH = p.createButton('3x3x2');
	CUBE3 = p.createButton('Plus Cube');
	CUBE4 = p.createButton('Christmas 3x3');
	CUBE5 = p.createButton('Christmas 2x2');
	CUBE6 = p.createButton('Jank 2x2');
	CUBE7 = p.createButton('Slice Bandage');
	CUBE8 = p.createButton('The Pillars');
	CUBE9 = p.createButton('Triple Quad');
	CUBE10 = p.createButton('Bandaged 2x2');
	CUBE11 = p.createButton('Z Perm');
	CUBE12 = p.createButton('T Perm');
	CUBE13 = p.createButton('Sandwich Cube');
	CUBE14 = p.createButton('Cube Bandage');
	CUBE15 = p.createButton('2x2x3');
	CUBE16 = p.createButton('Bandaged 3x3x2');
	FOURBYFOUR = p.createButton('4x4');
	FIVEBYFIVE = p.createButton('5x5');
	ONEBYFOURBYFOUR = p.createButton('1x1x4');
	TWOBYTWOBYFOUR = p.createButton('2x2x4');
	TWOBYTHREEBYFOUR = p.createButton('2x3x4');
	THREEBYTHREEBYFIVE = p.createButton('3x3x5');
	THREEBYTHREEBYFOUR = p.createButton('3x3x4');
	LASAGNA = p.createButton('Lasagna Cube');
	refreshButtons();


	setDisplay("none", ["mode4", "mode5", "mode6", "mode8", "link1", "timegone"]);


	TWOBYTWO = p.createButton('2x2');
	setButton(TWOBYTWO, "type", 'btn btn-light btn-sm', 'border-color: black;', changeTwo.bind(null, 0));

	THREEBYTHREE = p.createButton('3x3');
	setButton(THREEBYTHREE, "type2", 'btn btn-warning btn-sm', 'border-color: black;', changeThree.bind(null, 0));

	NBYN = p.createButton('More');
	setButton(NBYN, "type4", 'btn btn-light btn-sm', 'border-color: black; ', cubemode.bind(null, 0));

	CUSTOMSHIFT = p.createCheckbox(" Shape Shift", true);
	CUSTOMSHIFT.parent("customshift")

	SEL = p.createSelect(); //Top
	SEL.parent("select1");

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

	SESSION = p.createSelect(); 
	SESSION.parent("timeselectmini");
	for (let i = 1; i <= 5; ++i) {
		SESSION.option(i);
	}
	SESSION.selected(session + 1);
	SESSION.changed(changeSession);

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
	SCRAM.option("3x3x2");
	SCRAM.option("Double Turns");
	SCRAM.option("Middle Slices");
	SCRAM.option("Gearcube");
	SCRAM.option("Gearcube II");
	SCRAM.option("Last Layer");
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
	INPUT2[18].mousePressed(() => {flexDo(Undo, undo)});
	INPUT2[19].mousePressed(() => {flexDo(Redo, redo)});
	

	setCustomShape();

	const colors = [
		{ name: 'Red', className: 'red', c: "#da1a18"},
		{ name: 'Orange', className: 'orange', c: "#db7c19"},
		{ name: 'Yellow', className: 'yellow', c: "yellow"},
		{ name: 'Green', className: 'green', c: "#19dc1f"},
		{ name: 'Blue', className: 'blue', c: "#1b69db"},
		{ name: 'White', className: 'white', c: "white"}
	];
	colors.forEach(color => {
		const button = p.createButton('');
		setButton(button, "colorContainer", 'btn btn-info', `background-color:${color.c};height:60px;width:60px;border-width:0px;padding:2px;margin:2px;`, 
			() => {
				if (MODE == "paint" && (!activeKeys || (activeKeys.size < 1 || (p.keyIsDown(p.SHIFT) && activeKeys.size < 2)))) {
					paintit(color.className)
					activeKeys.add("button");
				}
				button.mouseReleased(() => { activeKeys.delete("button");});
				return button;
			}
		);
	});

	for (const plltype in allplls) {
		let a = 0;
		allplls[plltype].forEach((pll, n) => {
			// Create and configure the checkbox
			const checkbox = p.createCheckbox(" " + pll, true);
			checkbox.parent("s_checkbox" + plltype);
			checkbox.style(`display:inline; padding-right:1px;`);
			PLLS.push(checkbox);
	
			// Create and configure the image
			const img = document.createElement("img");
			img.src = `../../images/${plltype > 4 ? "OLL" : plltype == 4 ? "PBL" : "PLL"}/` + pll + ".png"; // Set the source of the image
			img.alt = pracmode; // Optional: Add alt text for accessibility
			img.style = "display:inline; padding-right:10px; width:60px; height:auto;"; // Set size to 20% of original
			img.onclick = function () {
				checkbox.checked(!checkbox.checked());
			};
			document.getElementById("s_checkbox" + plltype).appendChild(img); // Append the image to the parent
	
			// Add a <br> element for line breaks every 4 iterations
			if ((a + 1) % ((isMobile() && isthin || plltype == 4) ? 3 : plltype == 9? 2 : plltype >= 4 ? 10 : 4) === 0) {
				const br = document.createElement("br");
				document.getElementById("s_checkbox" + plltype).appendChild(br);
				SPACE.push(br);
			}
			++a;
		});
	} // images from https://cubingapp.com/algorithms/2x2-PBL/

	SEL7 = p.createSelect();
	SEL7.option("2x2");
	SEL7.option("3x3");
	SEL7.option("4x4");
	SEL7.option("5x5");
	SEL7.parent("select8")
	SEL7.selected('3x3');
	SEL7.changed(() => {b_selectdim[SEL7.value()](); change9(true)});

	BANDAGE_SELECT = p.createSelect();
	BANDAGE_SELECT.option("3x3");
	BANDAGE_SELECT.option("4x4");
	BANDAGE_SELECT.option("5x5");
	BANDAGE_SELECT.option("2x2x3");
	BANDAGE_SELECT.option("2x2x4");
	BANDAGE_SELECT.option("2x3x4");
	BANDAGE_SELECT.option("3x3x2");
	BANDAGE_SELECT.option("3x3x4");
	BANDAGE_SELECT.option("3x3x5");
	// BANDAGE_SELECT.option("Xmas 3x3");
	BANDAGE_SELECT.parent("bandage_select")
	BANDAGE_SELECT.selected('3x3');
	BANDAGE_SELECT.changed(() => {
		bandaged = [];
		if (bandaged3[BANDAGE_SELECT.value()] && bandaged3[BANDAGE_SELECT.value()].slot) {
			BANDAGE_SLOT.selected(bandaged3[BANDAGE_SELECT.value()].slot)
		} else {
			BANDAGE_SLOT.selected(1)
		}
		if (bandaged3.hasOwnProperty(BANDAGE_SELECT.value()) && bandaged3[BANDAGE_SELECT.value()][BANDAGE_SLOT.value()]) {
			bandaged = bandaged3[BANDAGE_SELECT.value()][BANDAGE_SLOT.value()];
		}
		b_selectdim[BANDAGE_SELECT.value()]();
	});

	BANDAGE_SLOT = p.createSelect();
	for (let i = 1; i <= 5; i++) {
		BANDAGE_SLOT.option(i);
	}
	BANDAGE_SLOT.parent("bandage_slot");
	BANDAGE_SLOT.changed(() => {
		console.log(bandaged,bandaged3);
		bandaged = [];
		if (bandaged3[BANDAGE_SELECT.value()])
			bandaged3[BANDAGE_SELECT.value()].slot = BANDAGE_SLOT.value();
		if (bandaged3.hasOwnProperty(BANDAGE_SELECT.value()) && bandaged3[BANDAGE_SELECT.value()][BANDAGE_SLOT.value()]) {
			bandaged = bandaged3[BANDAGE_SELECT.value()][BANDAGE_SLOT.value()];
		}
		console.log(bandaged, bandaged3)
		reSetup();
	})

	INPUT.option("Normal");
	INPUT.option("3x3x2");
	INPUT.option("Double Turns");
	INPUT.option("Gearcube");
	INPUT.option("Gearcube II")
	setInput();
	
	INPUT.changed(changeInput.bind(null, 0));

	const hotkeys = [
		["Esc", "Reset"],
		["⇧ Esc", "Restart"],
		["`", "Scramble"],
		["⇧ `", "Autosolve"],
		["=", "Redo"],
		["⇧ =", "Redo Til Rotate"],
		["Bspace", "Undo"],
		["⇧ Bspace", "Undo Til Rotate"],
		["Tab", "Toggle fullscreen"],
		["⇧ Tab", "Toggle halfscreen"],
		["Space", "Stop Time"],
		["", ""],
		["1", "Quit"],
		["⇧ 1", "Home"],
		["2", "Max/Min turn speed"],
		["⇧ 2", "Stats Mode"],
		["3", "On/Off Dark Mode"],
		["⇧ 3", "Speed Mode"],
		["4", "Align Camera"],
		["⇧ 4", "Challenges"],
		["7", "Alert Position ID"],
		["⇧ 7", "Copy Position ID"],
		["8", "Delete previous time"],
		["⇧ 8", "Remove all times"],
		["9", "Load Data"],
		["⇧ 9", "Load Default ID"],
		["0", "Save Data"],
		["⇧ 0", "Save Position ID"],
		["-", "Switch to 2x2/3x3"],
		["⇧ -", "Other Cubes"],
	];

    const table = document.getElementById('hotkeytable');

    for (let i = 0; i < hotkeys.length; i += 2) {
        const row = document.createElement('tr');
        
        // Create first cell set (number and description)
        row.innerHTML += `<td><b>${hotkeys[i][0]}</b></td><td>${hotkeys[i][1]}</td>`;
        
        // Check if there's a second cell set (for odd-length arrays)
        if (i + 1 < hotkeys.length) {
            row.innerHTML += `<td><b>${hotkeys[i + 1][0]}</b></td><td>${hotkeys[i + 1][1]}</td>`;
        }
        
        table.appendChild(row);
    }

	const BACK = p.createButton('Back');
	setButton(BACK, "custom3", 'btn btn-light', 'border-color: black;', cubemode.bind(null, 0));

	const BACK2 = p.createButton('Back');
	setButton(BACK2, "custom5", 'btn btn-light', 'border-color: black;', cubemode.bind(null, 0));

	function setTogglePLL(c) {
		let arr = [];
		if (pracmode == "OLL") {
			arr = allplls[5].concat(allplls[6].concat(allplls[7].concat(allplls[8])));
		} else if (DIM == 100) {
			arr = allplls[4];
		} else {
			arr = allplls[1].concat(allplls[2].concat(allplls[3]))
		}
		console.log(arr)
		togglePLL(c, arr)
	}

	const S_SELECTALL = p.createButton('Select All');
	setButton(S_SELECTALL, "s_selectall", 'btn btn-light', 'border-color: black;', setTogglePLL.bind(null, "check"));

	const S_DESELECTALL = p.createButton('Deselect All');
	setButton(S_DESELECTALL, "s_deselectall", 'btn btn-light', 'border-color: black;', setTogglePLL.bind(null, "uncheck"));

	const IDBACK = p.createButton('Back');
	setButton(IDBACK, "idback", 'btn btn-light', 'font-size:20px; border-color: black;', () => {MODE == "finishpaint" ? paintmode() : MODE.includes("paint") ? idmode() : regular()});

	const SETTINGSBACK = p.createButton('Back');
	setButton(SETTINGSBACK, "settingsback", 'btn btn-light', 'font-size:20px; border-color: black;', regular.bind(null, 0));

	const HOTKEYBACK = p.createButton('Back');
	setButton(HOTKEYBACK, "hotkeyback", 'btn btn-light', 'font-size:20px; border-color: black;', settingsmode.bind(null, 0));

	const CHALLENGEBACK = p.createButton('Return to Challenges');
	setButton(CHALLENGEBACK, "challengeback", 'btn btn-light', 'font-size:20px; border-color: black;', challengemode.bind(null, 0));

	const IDDEFAULT = p.createButton('Restore defaults');
	setButton(IDDEFAULT, "iddefault", 'btn btn-light', 'font-size:20px; border-color: black;', iddefault);

	const SETTINGSDEFAULT = p.createButton('Restore defaults');
	setButton(SETTINGSDEFAULT, "settingsdefault", 'btn btn-light', 'font-size:20px; border-color: black;', settingsDefault.bind(null, 0));

	const SETTINGSHOTKEY = p.createButton('View Hotkeys');
	setButton(SETTINGSHOTKEY, "settingshotkey", 'btn btn-light', 'font-size:20px; border-color: black;', hotkeymode);

	const DEFAULT = p.createButton('Restore');
	setButton(DEFAULT, "select7", 'btn btn-light', 'font-size:15px; border-color: black;', changeZero.bind(null, 0));

	const DEAFULT2 = p.createButton('Restore');
	setButton(DEAFULT2, "select9", 'btn btn-light', 'font-size:15px; border-color: black;', bandageZero.bind(null, 0));

	const RNG = p.createButton(String.fromCharCode(0x2684));
	setButton(RNG, "rng", 'btn btn-light', 'font-size:15px; border-color: black;', changeRandom.bind(null, 0));

	const RNG2 = p.createButton(String.fromCharCode(0x2684));
	setButton(RNG2, "rng2", 'btn btn-light', 'font-size:15px; border-color: black;', randomBandage.bind(null, 0));

	const CREATE_MATCH = p.createButton("Create Match");
	setButton(CREATE_MATCH, "create_match", 'btn btn-primary', 'font-size: 25px; width: 180px;', createMatch);

	const FINISH_MATCH = p.createButton("Done");
	setButton(FINISH_MATCH, "finish_match", 'btn btn-success', 'font-size: 25px;', finishMatch);

	const STARTMATCH = p.createButton("Start Match");
	setButton(STARTMATCH, "startmatch", 'btn btn-success', 'font-size: 25px;', startMatch);

 	CONTINUEMATCH = p.createButton("Start Next Round");
	setButton(CONTINUEMATCH, "continuematch", 'btn btn-success', 'font-size: 25px;', continueMatch);

	const JOINROOM = p.createButton("Join Room");
	setButton(JOINROOM, "joinroom", 'btn btn-primary', 'font-size: 25px; width:180px;', joinRoom);
	
	const COMPETE_AGAIN = p.createButton("Play Again");
	setButton(COMPETE_AGAIN, "compete_again", 'btn btn-light', 'font-size: 25px; width:180px;  border-color: black; ', competeAgain);

	const COMPETEHOME = p.createButton("Home");
	setButton(COMPETEHOME, "compete_home", 'btn btn-light', 'font-size: 25px; width:180px; border-color: black; ', competemode);


	HOLLOW = p.createCheckbox("", localStorage.hollow === "true" ? true : false);
	HOLLOW.parent("hollow")
	HOLLOW.style("display:inline; padding-right:5px; font-size:20px; height:200px;")
	HOLLOW.changed(hollowCube);

	DARKMODE = p.createCheckbox("", false);
	DARKMODE.parent("dankmode")
	DARKMODE.style("display:inline; padding-right:5px; font-size:20px; height:200px;")
	DARKMODE.changed(darkMode);

	hollowCube(false);
	
	let temp = ["#d6f1ff", "#e7e5ff", "#0a1970"]
	if (localStorage.background && localStorage.background.length >= 23) {
		temp = localStorage.background.split(' ');
	}
	setColors(temp[0], temp[1], temp[2], temp[3]);

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
	if(localStorage.bandaged3) {
		bandaged3 = JSON.parse(localStorage.bandaged3);
	}

	
	TOPPLL = p.createSelect(); 
	TOPPLL.parent("toppll");
	TOPPLL.option("Opposite of above");
	TOPPLL.option("Same as above");
	TOPPLL.changed(topWhite.bind(null, 0));

	if (localStorage.toppll) {
		TOPPLL.value(localStorage.toppll);
	}




	CUSTOM = p.createButton('Custom Shape');
	setButton(CUSTOM, "custom", 'btn btn-primary', allcubestyle, Custom.bind(null, 0));

	CUSTOM2 = p.createButton('Custom Bandage');
	setButton(CUSTOM2, "customb", 'btn btn-primary', allcubestyle, Custom2.bind(null, 0));
	
	RESET = p.createButton('Reset');
	setButton(RESET, "reset_div", bstyle, '', reSetup.bind(null, 0));

	RESET2 = p.createButton('Reset');
	setButton(RESET2, "reset2_div", bstyle, '', moveSetup.bind(null, 0));

	RESET3 = p.createButton('Reset');
	setButton(RESET3, "reset3_div", bstyle, '', speedSetup.bind(null, 0));

	SHUFFLE_BTN = p.createButton('Scramble');
	setButton(SHUFFLE_BTN, "shuffle_div", 'btn btn-primary', '', shuffleCube.bind(null, 0));

	const STOP = p.createButton('Stop Time');
	setButton(STOP, "stop_div", bstyle, '', stopTime.bind(null, 0));

	const HINT = p.createButton('Hint');
	setButton(HINT, "hint", 'btn btn-primary', '', Hint.bind(null, 0));
	
	const GIVEUP = p.createButton('Give Up');
	setButton(GIVEUP, "giveup", 'btn btn-danger', '', giveUp.bind(null, 0));

	UNDO = p.createButton('Undo');
	setButton(UNDO, "undo", bstyle, '', () => {flexDo(Undo, undo)});
	
	REDO = p.createButton('Redo');
	setButton(REDO, "redo", bstyle, '', () => {flexDo(Redo, redo)});
	
	SOLVE = p.createButton(window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches ? 'Solve' : 'Autosolve');
	setButton(SOLVE, "solve", 'btn btn-success', '', solveCube.bind(null, 0));
	
	const EASY = p.createButton('Easy');
	setButton(EASY, "s_easy", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color:#42ff58; border-color: black;', easy.bind(null, 0));

	const M_34 = p.createButton('3 to 5 Movers');
	setButton(M_34, "m_34", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color:#42ff58; border-color: black;', m_34.bind(null, 0));

	const M_4 = p.createButton('Endless (Medium)');
	setButton(M_4, "m_4", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color:#ff9ee8; border-color: black;', m_4.bind(null, 0));

	const IDCOPY = p.createButton('Copy');
	setButton(IDCOPY, "idcopy", 'btn btn-primary', 'margin-left: 10px', () => {
		navigator.clipboard.writeText(document.getElementById("idcurrent").innerText).then(
			function(){
				successSQL("Position ID Copied");
			})
		  .catch(
			 function() {
				alert("Copying didn't work :("); // error
		  });
	});

	const PEEK = p.createButton('Peek');
	setButton(PEEK, "peekbutton", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color:#42ff58; border-color: black;', () => {toggleOverlay(false);});

	FULLSCREEN = p.createButton('');
	setButton(FULLSCREEN, "fullscreen", 'bi bi-arrows-fullscreen', 'font-size: 40px; height: 60px; width: 60px;  border: none;', () => {fullScreen(!fullscreen)});
	FULLSCREEN.position(cnv_div.offsetWidth-50,window.innerHeight-145);
	FULLSCREEN.style("background-color: transparent; color: " + document.body.style.color);
	FULLSCREEN.attribute('title', 'Fullscreen');

	ALIGN = p.createButton('');
	setButton(ALIGN, "align", 'bi bi-camera', 'font-size: 40px; height: 60px; width: 60px;  border: none;', alignIt);
	ALIGN.position(30,window.innerHeight-145);
	ALIGN.attribute("title", "Align Camera");
	ALIGN.style("background-color: transparent; color: " + document.body.style.color);

	GENERATE = p.createButton('Generate');
	setButton(GENERATE, 'generate', 'btn btn-success', '', generateID.bind(null, 0));

	const PAINT = p.createButton('Start Paint');
	setButton(PAINT, 'startpaint', 'btn btn-info', '', paintmode);

	const FINISHPAINT = p.createButton('Finish Paint');
	setButton(FINISHPAINT, 'finishpaint', 'btn btn-success', 'font-size: 20px;', finishpaint);
	
	const MED = p.createButton('Medium');
	setButton(MED, "s_medium", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ff9ee8; border-color: black;', medium.bind(null, 0));

	OLL = p.createButton('OLL Attack');
	setButton(OLL, "s_OLL", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ffb163; border-color: black;', speedOLL.bind(null, 0));
	
	PLL = p.createButton('PLL/PBL Attack');
	setButton(PLL, "s_PLL", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ffb163; border-color: black;', speedPLL.bind(null, 0));

	const RACE = p.createButton('Start Race');
	setButton(RACE, "s_RACE", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #fc5f53; border-color: black;', speedRace.bind(null, 0));

	const S_START = p.createButton('Start Practice');
	setButton(S_START, "s_start", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #42ff58; border-color: black;', practicePLL.bind(null, 0));

	PLLPRAC = p.createButton('PLL Practice');
	setButton(PLLPRAC, "s_pllprac", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #FBF35B; border-color: black;', selectPLL.bind(null, "PLL"));

	OLLPRAC = p.createButton('OLL Practice');
	setButton(OLLPRAC, "s_ollprac", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #FBF35B; border-color: black;', selectPLL.bind(null, "OLL"));

	const READYBOT = p.createButton('Ready');
	setButton(READYBOT, "readybot", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #42ff58; border-color: black;', speedRace2.bind(null, 0));

	const RACE2 = p.createButton('Continue');
	setButton(RACE2, "s_RACE2", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #42ff58; border-color: black;', speedRace2.bind(null, 0));
	
	const STARTCHAL = p.createButton('Start Weekly');
	setButton(STARTCHAL, "c_start", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #42ff58; border-color: black;', startchallenge);

	const STARTDCHAL = p.createButton('Start Daily 3x3');
	setButton(STARTDCHAL, "cd_start", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ffb163; border-color: black;', () => {dailychallenge(3)});

	const STARTDCHAL2 = p.createButton('Start Daily 2x2');
	setButton(STARTDCHAL2, "cd2_start", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ff9ee8; border-color: black;', () => {dailychallenge(2)});

	const STARTBLIND = p.createButton('Start Blind');
	setButton(STARTBLIND, "b_regular", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #FBF35B; border-color: black;', () => {movesmode(); blindmode()});

	const STARTBLIND2 = p.createButton('Blind Marathon');
	setButton(STARTBLIND2, "b_marathon", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #FBF35B; border-color: black;', () => {movesmode(); startMarathon("blind")});

	const STARTMARATHON = p.createButton('Shape Marathon');
	setButton(STARTMARATHON, "ma_start", 'btn btn-info', 'height:60px; width:180px; text-align:center; font-size:20px; background-color: #ffb163; border-color: black;', () => {startMarathon("shape")});
	
	const STARTMARATHON2 = p.createButton('Bandage Marathon');
	setButton(STARTMARATHON2, "ma_start2", 'btn btn-info', 'height:60px; width:200px; text-align:center; font-size:20px; background-color: #ffb163; border-color: black;', () => {startMarathon("bandage")});

	const SAVEPOSITION = p.createButton('Save Current Position');
	setButton(SAVEPOSITION, "saveposition", 'btn btn-success', '', () => {
		try {
			allcubies = IDtoReal(IDtoLayout(decode(getID())));
			setLayout();
			successSQL("Current ID Saved");
		} catch(e){

		}
	});

	inp = p.createInput('');
	inp.parent("test_alg_input");
	
	const GO_BTN = p.createButton('Go!');
	setButton(GO_BTN, 'test_alg_button', 'btn btn-success', 'height: 30px; width: 40px; display: flex; padding: 0;', testAlg.bind(null, 0));
	GO_BTN.style("display", "inline-block");

	TIMEGONE = p.createButton('Remove previous');
	setButton(TIMEGONE, "timegone2", 'btn btn-light btn-sm', 'border-color: black;', removeTime.bind(null, 0));

	let TIMEGONE2 = p.createButton('Clear all');
	setButton(TIMEGONE2, "timegone3", 'btn btn-light btn-sm', 'border-color: black;', removeAllTimes.bind(null, 0));
	regular();

	let TIMEGONE3 = p.createButton('🗑️');
	TIMEGONE3.parent("timegone5");
	TIMEGONE3.mousePressed(removeSpecificTime.bind(null, 0));	

	LEFTMOD = p.createButton('←');
	setButton(LEFTMOD, "leftmod", 'btn btn-light', 'font-size:15px; width:70px; margin-right:5px; border-color: black;', changeMod.bind(null, -1));

	RIGHTMOD = p.createButton('→');
	setButton(RIGHTMOD, "leftmod", 'btn btn-light', 'font-size:15px; width:70px; margin-right:5px; border-color: black;', changeMod.bind(null, 1));

	let LEFTPAINT, RIGHTPAINT, DOWNPAINT, UPPAINT;

	function createArrowButton(direction, key, keyCode, id, button) {
		button = p.createButton(direction);
		setButton(button, id, 'btn btn-light', 'font-size:15px; width:70px; border-color: black;', () => {
			if (MODE == "paint" && (!activeKeys || (activeKeys.size < 1 || (p.keyIsDown(p.SHIFT) && activeKeys.size < 2)))) {
				const event = new KeyboardEvent("keydown", { key, keyCode, code: key, bubbles: true });
				document.dispatchEvent(event);
				activeKeys.add("button");
			}
		});
		button.mouseReleased(() => { activeKeys.delete("button"); activeKeys.delete(key) });
		return button;
	}

	LEFTPAINT = createArrowButton('←', 'ArrowLeft', 37, "leftpaint", LEFTPAINT);
	RIGHTPAINT = createArrowButton('→', 'ArrowRight', 39, "rightpaint", RIGHTPAINT);
	DOWNPAINT = createArrowButton('↓', 'ArrowDown', 40, "downpaint", DOWNPAINT);
	UPPAINT = createArrowButton('↑', 'ArrowUp', 38, "uppaint", UPPAINT);  // Added Up arrow button

		
	
	LEFTBAN = p.createButton('←');
	setButton(LEFTBAN, "leftban", 'btn btn-light', 'font-size:15px; width:70px; margin-right:5px; border-color: black;', leftBan.bind(null, 0));

	RIGHTBAN = p.createButton('→');
	setButton(RIGHTBAN, "rightban", 'btn btn-light', 'font-size:15px; width:70px; margin-right:5px; border-color: black;', rightBan.bind(null, 0));

	ADDBANDAGE = p.createButton('Add Bandage Group');
	setButton(ADDBANDAGE, "addbandage", 'btn btn-primary', 'font-size:18px;', addBandage.bind(null));


	VIEWBANDAGE = p.createButton('View/Delete Groups');
	setButton(VIEWBANDAGE, "addbandage4", 'btn btn-secondary', 'font-size:18px;', viewBandage.bind(null, false));

	SMOOTHBANDAGE = p.createCheckbox(' Auto-smooth bandages ', true);
	SMOOTHBANDAGE.parent("smoothbandage"); 
	SMOOTHBANDAGE.style("font-size: 12px;");
	SMOOTHBANDAGE.changed(() => {
		if (SMOOTHBANDAGE.checked()) smoothBandage();
	})

	const OKBAN = p.createButton('Done');
	setButton(OKBAN, "okban", 'btn btn-success text-dark', 'width: 180px; height:40px; margin-right:5px; margin-top:5px; border-color: black;', doneBandage.bind(null, 0));

	const CANCELBAN = p.createButton('Cancel');
	setButton(CANCELBAN, "cancelban", 'btn btn-danger text-dark', 'width: 180px; height:40px; margin-right:5px; margin-top:5px; border-color: black;', cancelBandage.bind(null, 0));

	const DELETEBAN = p.createButton('Delete');
	setButton(DELETEBAN, "deleteban", 'btn btn-danger text-dark', 'width: 180px; height:40px; margin-right:5px; margin-top:5px; border-color: black;', deleteBan.bind(null, 0));
	topWhite();
	startCube();

	COMPETE_1V1 = p.createButton('2 Player');
	setButton(COMPETE_1V1, "compete_1v1", 'btn btn-primary', 'margin-right: 5px; borderWidth: 0px;', competeSettings.bind(null, "1v1"));

	COMPETE_GROUP = p.createButton('Group Battle');
	setButton(COMPETE_GROUP, "compete_group", 'btn btn-primary', 'margin-right: 10px; borderWidth: 0px;', competeSettings.bind(null, "group"));
}


setInterval(() => {
	timeInSeconds = Math.round(timer.getTime() / 10)/100.0;
	document.getElementById('time').innerText = timeInSeconds;
	document.getElementById('moves').innerText = moves + (window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches ? " m" : " moves");
	document.getElementById('speed').innerText = Math.round(SPEED*100);
	document.getElementById('delay2').innerText = DELAY;
	document.getElementById('size2').innerText = CAMZOOM * -1;
	document.getElementById('border2').innerText = special[1];
	document.getElementById('gap2').innerText = special[3];
	displayAverage();
	displayTimes();
	setLayout();
	isthin = window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches;
	ismid = window.matchMedia("(max-width: " + MAX_WIDTH2 + ")").matches;
	let secs = 375-SPEED*225;
	if(secs < 20)
	secs = 20;
	if(scrambles.length < mo5.length)
		scrambles.push(document.getElementById('scramble').innerText);
	easytime = (custom == 0 || custom == 2 || (Array.isArray(DIM) && DIM[0] != "adding" && ((DIM4 == 2 && (DIM[6].length < 20 || difColors())) || (goodsolved && difColors()) || DIM[6].length == 0)));
	if(Array.isArray(DIM) && DIM[0] != "adding" && DIM[6].includes(4) && DIM[6].includes(10) && DIM[6].includes(12) && DIM[6].includes(13) &&
	DIM[6].includes(14) && DIM[6].includes(16) && DIM[6].includes(22) && special[0] == false)
		goodsolved = true;
	else
		goodsolved = false;

	if (!["compete", "competing", "speed", "moves"].includes(MODE)) {
		saveao5 = [ao5, mo5, scrambles, movesarr];
		updateSession();
	}
	//local
	// alert("here2")
	localStorage.saveao5 = JSON.stringify(savetimes);
	localStorage.session = session;
	localStorage.speed = SPEED;
	localStorage.topwhite = TOPWHITE.value();
	localStorage.toppll = TOPPLL.value();
	localStorage.keyboard = KEYBOARD.value();
	localStorage.background = stringrgbToHex(document.body.style.backgroundColor) + " " + BACKGROUND_COLOR + " " + stringrgbToHex(document.body.style.color ) + " " + special[4];
	localStorage.hollow = HOLLOW.checked();
	localStorage.border_width = BORDER_SLIDER.value();
	localStorage.audioon = audioon;
	if (localStorage.c_today == 0) localStorage.c_today = "DNF";
	if (localStorage.c_today2 == 0) localStorage.c_today2 = "DNF";
	if (!localStorage.username) 
		localStorage.username = "signedout";
	document.getElementById("login").style.display = localStorage.username == "signedout" ? "inline" : "none";
	document.getElementById("account").style.display = localStorage.username == "signedout" ? "inline" : "none";
	document.getElementById("inaccount").style.display = localStorage.username == "signedout" ? "none" : "inline";
	document.getElementById("loginname").innerHTML = localStorage.username == "signedout" ? "Not logged in" : "<i style = 'float:left; margin-right:5px; ' class='bi bi-file-person'></i>" + escapeHtml(localStorage.username);
	document.getElementById("l_form").style.display = localStorage.username == "signedout" ? "block" : "none";
	document.getElementById("l_bigforgot").style.display = localStorage.username == "signedout" ? "block" : "none";
	document.getElementById("l_home").style.display = localStorage.username != "signedout" && MODE == "login" ? "block" : "none";
	updateScores();
	if(isSolved() && timer.getTime() > secs && timer.isRunning && (["normal", "timed", "cube"].includes(MODE) || race > 1))
	{
		timer.stop();
		flipmode2 = 0;
		movesarr.push(moves);
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
			pllstep++;
			speedPLL();
		} else if(((isSolved() && pracmode == "PLL") || (sideSolved(realtop) && pracmode == "OLL")) && pllpracstep % 2 == 1) {
			timer.stop();
			movesarr.push(moves);
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
			pllpracstep++;
			practicePLL();
		} else if(sideSolved(realtop) && ollstep % 2 == 1) {
			timer.stop();
			if(ao5 == 0)
			ao5 = [Math.round(timer.getTime() / 10)/100.0];
			else
			ao5.push(Math.round(timer.getTime() / 10)/100.0);
			ollstep++;
			speedOLL();
		}
		
	}
	else if(MODE == "moves")
	{
		if (mastep % 2 == 1 && isSolved()) {
			timer.stop();
			let value = ma_data.type == "blind" ? peeks : Math.round(timer.getTime() / 10)/100.0;
			ao5.push(value);
			mastep++;
			peeks = 0;
			shapemarathon();
		} else if (bstep == 2 && isSolved()) {
			bstep = 3;
			blindmode();
		}
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
			setScore("m_easy", m_points, false);
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
			setScore("m_medium", m_points, false);
			m_4();
		}
		else if((m_34step > 0 || m_4step > 0) && isSolved() && moves > 0)
		{
			document.getElementById("s_instruct").innerHTML = "Even though the cube might be solved, you used too many moves! Tip: You can press the 'reset' button to reset the scramble.";
		}
	} else if (MODE == "daily" || MODE == "weekly") {
		if (isSolved() && cstep >= 2) {
			timer.stop();
			cstep++;
			endchallenge();
		} else if (timer.isRunning && timer.inspection && timer.getTime() > 0 && cstep < 2) {
			timer.stop();
			cstep++;
			endchallenge(false);
		} else if (timer.isRunning && timer.inspection && timer.getTime() > -3000 && cstep == 1) {
			fadeInText(1, "3 secs");
			setTimeout(() => {fadeInText(0, "3 secs")}, 400);
			cstep = 1.5;
		}
	} else if (comstep > 1 && comstep % 2 == 0) {
		if (isSolved()) {
			comstep++;
			timer.stop();
			if(ao5 == 0) ao5 = [Math.round(timer.getTime() / 10)/100.0];
			else ao5.push(Math.round(timer.getTime() / 10)/100.0);
			socket.emit("solved", room, Math.round(timer.getTime() / 10)/100.0);
			canMan = false;
		} else if (timer.isRunning && timer.inspection == 2 && timer.getTime() > 0) {
			timer.stop();
			timer.reset();
			comstep++;
			if(ao5 == 0) ao5 = ["DNF"];
			else ao5.push("DNF");
			socket.emit("solved", room, "DNF");
			fadeInText(1, "DNF");
			setTimeout(() => {fadeInText(0, "DNF")}, 400);
			canMan = false;
		} else if (timer.isRunning && timer.inspection == 1 && timer.getTime() > -3000 && timer.getTime() < 0) {
			timer.inspection = 2;
			fadeInText(1, "3 secs");
			setTimeout(() => {fadeInText(0, "3 secs")}, 400);
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
		// if(!((DIM4 == 2 && (DIM[6].length < 20 || difColors())) || (goodsolved && difColors()) || DIM[6].length == 0)){
		// 	document.getElementById("spacetime").style.display = "block";
		// 	document.getElementById("stop_div").style.display = "inline";
		// }
		// else{
		// 	document.getElementById("spacetime").style.display = "none";
		// 	document.getElementById("stop_div").style.display = "none";
		// }
	}
	let tempalg = [];
	const possible = pracmode == "OLL" ? (DIM == 50 ?Array.from({ length: 57 }, (_, i) => (i + 1).toString()) : allplls[9]) : 
	DIM == 50 ? ["Aa", "Ab", "F", "Ja", "Jb", "Ra", "Rb", "T", "Ga", "Gb", "Gc", "Gd", "E", "Na", "Nb", "V", "Y", "H", "Ua", "Ub", "Z"] : ["AA", "AD", "DD", "AU", "DU"];
	PLLS.forEach((checkbox) => {
		if (checkbox.checked() && possible.includes(checkbox.elt.querySelector('span').innerText.substring(1))) {
		  let labelText = checkbox.elt.querySelector('span').innerText;		  
		  tempalg.push(labelText.substring(1));
		}
	  });
	pracalgs = tempalg;
	if (getEl("s_prac2").style.display != "none") {
		getEl("s_start").style.display = (pracalgs.length == 0 ? "none" : "block");
	}
	if(MODE == "cube" && (!mouseAllowed() || (custom == 1 && !canMouse()))) document.getElementById("turnoff").innerHTML = "(Mouse inputs are turned off.)";
	else document.getElementById("turnoff").innerHTML = "(Mouse inputs are turned on.)";
	if(MODE == "cube" && modnum != 1)bandaged = [];
	if(document.getElementById("idcurrent").innerHTML != getID()) document.getElementById("idcurrent").innerHTML = getID();
	if(TOPPLL.value() == "Opposite of above" && (["PLL", "OLL", "pracPLL"].includes(MINIMODE)))
		realtop = opposite[TOPWHITE.value()[0].toLowerCase()];
	else
		realtop = TOPWHITE.value()[0].toLowerCase();
	special[2] = IDtoReal(IDtoLayout(decode(colorvalues[realtop])));
	special[4] = getEl("colorPicker4").value;
	VOLUME.position(cnv_div.offsetWidth-(document.getElementById("settings").style.display == "none"? 60 : 130), 5);
	if (document.getElementById("settings1").style.display == "none") {
		SETTINGS.style("background-color: transparent; color: " + document.body.style.color);
	} else if (!isthin){
		SETTINGS.style("background-color: #8ef4ee; color: " + document.body.style.color);
	}
	if (document.getElementById("cnv_div").style.display == "none" && (getEl("s_prac3x3o").style.display == "none" || pracmode != "OLL")) {
		document.getElementById("cnv_div").style.display = "block";
		fullScreen(false);
		reCam();
		resized();
	} 
	getEl("peeks").innerHTML = peeks + " peek" + (peeks == 1 ? "" : "s");
	if (MODE == "speed") SPEEDMODE.style('background-color', '#8ef5ee');
	if (MODE == "timed") { TIMEDMODE2.style('background-color', '#8ef5ee');  TIMEDMODE.style('background-color', '#8ef5ee');}
	if (MODE == "normal") REGULAR.style('background-color', '#8ef5ee');
	if (MODE == "moves") MOVESMODE.style('background-color', '#8ef5ee');
	getEl("wannapeek").style.display = getEl("overlay").style.display;
	getEl("peekbutton").style.display = getEl("overlay").style.display;
	getEl("overlay").style.backgroundColor = BACKGROUND_COLOR;
	getEl("custommouse").innerHTML = canMouse() ? "(Mouse inputs are turned on.)" : "(Mouse inputs are turned off.)";
	getEl("switcher").style.display = (getEl("blind").style.display == "block" || (getEl("s_prac").style.display != "none")) ? "block" : "none";
	FULLSCREEN.style("background-color: transparent; color: " + document.body.style.color);
	ALIGN.style("background-color: transparent; color: " + document.body.style.color);
	VOLUME.style("background-color: transparent; color: " + document.body.style.color);
	ALIGN.position(30,window.innerHeight-145);
	FULLSCREEN.position(cnv_div.offsetWidth-55,window.innerHeight-145);
	special[5] = bandaged;
	setSpecial();
	if (isthin) getEl("delaywhole").style.display = "none";
	allcubestyle = 'text-align:center; font-size:20px; border: none;' + (!ismid ? "height:45px; width:180px;" : "");
	if(Array.isArray(DIM) && DIM[0] == "adding") {
		for (let i = 0; i < SIZE * SIZE * SIZE; ++i) {
			const key = +Object.entries(mapCuby()).find(([key, value]) => value == i)?.[0];
			if (DIM[1].includes(i) && !CUBE[i].adjustedColor) {
				CUBE[i].setColor(CUBE[key].colors.magenta);
			} else if(DIM[2].flat().includes(i) && !CUBE[i].adjustedColor) {
					let index = 0;
					DIM[2].forEach((group, j) => {
						if (group.includes(i)) {
							index = j;
						}
					})
					CUBE[i].setBlack((index * 15) % 150);
			} else if (!DIM[1].includes(i) && getColor(CUBE[i].right.levels) == "m") {
				CUBE[i].originalColor();
			}
		}
	}
	getEl("leftpaint").style.opacity = colorindex == 0 ? 0.3 : 1;
	getEl("rightpaint").style.opacity = colorindex == 54 ? 0.3 : 1;
	getEl("uppaint").style.opacity = colorindex == 0 ? 0.3 : 1;
	getEl("downpaint").style.opacity = colorindex == 54 ? 0.3 : 1;
	if (colorindex > 52) activeKeys.clear();
	// bandaged3[BANDAGE_SELECT.value()][BANDAGE_SLOT.value()] = bandaged;
	// bandaged3[BANDAGE_SELECT.value()].slot = BANDAGE_SLOT.value();
	localStorage.bandaged3 = JSON.stringify(bandaged3);
	if (typeof bandaged3[BANDAGE_SELECT.value()] !== "object") {
		bandaged3[BANDAGE_SELECT.value()] = {}; // Ensure it's an object
	  }
	setDisplay(SIZE > 3 ? "block" : "none", ["customshift"]);
	if (comstep > 0 && competedata.stage == "ingame") {
		socket.emit("progress-update", room, competeprogress, Math.round(timer.getTime() / 10)/100.0);
	}
}, 10)
//forever
function reSetup(rot) {
	m_points = 0;
	CUBE = {};
	arr = [];
	undo = [];
	redo = [];
	canMan = true;
	MAXX = (SIZE - 1) * 25;
	flipmode = 0;
	flipmode2 = 0;
	easystep = 0;
	medstep = 0;
	//bruh = 0;
	m_34step = 0;
	ollstep = 0;
	pllstep = 0;
	pllpracstep = 0;
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
	CAM.zoom(CAMZOOM + ZOOMADD);

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
	setDisplay("none", ["s_easy", "s_medium", "s_OLL", "s_PLL", "s_bot", "s_high", "s_RACE", "m_34", "m_4", "m_high", "points_par", "giveup2", "hint"]);
	setSpecial();
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
					CUBE[cnt] = new Cuby(100, x, y, z, RND_COLORS[cnt], PICKER, p, cnt, allcubies, special, SIZE);
					console.log("here");
				}else
				CUBE[cnt] = new Cuby(DIM, x, y, z, RND_COLORS[cnt], PICKER, p, cnt, allcubies, special, SIZE);
				cnt++;
			}
		}
	}
	for(let i = 0; i < SIZE * SIZE * SIZE; i++){ //sets up nextcuby
		nextcuby[i] = [];
		for(let j = 0; j < SIZE * SIZE * SIZE; j++){
			if(j == i) continue;
			let sum = Math.abs(CUBE[i].x - CUBE[j].x) + Math.abs(CUBE[i].y - CUBE[j].y) + Math.abs(CUBE[i].z - CUBE[j].z);
			if(sum == 50){
				if(nextcuby[i].length == 0) nextcuby[i] = [j];
				else nextcuby[i].push(j);
			}
		}
	}
	if (DIM == 2) {
		for (let i = 0; i < nextcuby.length; i++) {
			for (let j = 0; j < nextcuby[i].length; ++j) {
				if (nextcuby[i][j] >= 9 && nextcuby[i][j] <= 17) {
					nextcuby[i][j] += (i >= 0 && i <= 8) ? 9 : -9;
				}
			}
		}
	}
	if (DIM == 15) {
		nextcuby[0] = [2,6,9]; nextcuby[2] = [0,8,11]; nextcuby[6] = [0,8,15]; nextcuby[8] = [2,6,17];
		nextcuby[9] = [0,11,15,18]; nextcuby[11] = [2,9,17,20]; nextcuby[15] = [6,9,17,24]; nextcuby[17] = [8,11,15,26];
		nextcuby[18] = [9,20,24]; nextcuby[20] = [11,18,26]; nextcuby[24] = [15,18,26]; nextcuby[26] = [17,20,24];
	}
	reCam();
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
function getCubyFromPos(x, y, z) {
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].x == x && CUBE[i].y == y && CUBE[i].z == z && CUBE[i].shown) {
			return i;
		}
	}
	return -1;
}

function findCubyNear(x, y, z, dx, dy, dz) {
	if ([x, y, z].some((i) => i > MAXX || i < -MAXX)) {
		return -1;
	}
	let cuby = getCubyFromPos(x, y, z);
	if (cuby != -1) {
		return cuby;
	}
	return findCubyNear(x + dx, y + dy, z + dz, dx, dy, dz)
}
function veryOutside(i) {
	return [-MAXX, MAXX].includes(CUBE[i].x) || [-MAXX, MAXX].includes(CUBE[i].y) || [-MAXX, MAXX].includes(CUBE[i].z)
}
function getNeighborsArr(cuby) {
	if (!CUBE[cuby]) return false;
	let adder = (DIM2 == 100) ? CUBYESIZE * 2: CUBYESIZE;
	return [findCubyNear(CUBE[cuby].x+adder, CUBE[cuby].y, CUBE[cuby].z, adder, 0, 0),
	findCubyNear(CUBE[cuby].x-adder, CUBE[cuby].y, CUBE[cuby].z, -adder, 0 ,0),
	findCubyNear(CUBE[cuby].x, CUBE[cuby].y+adder, CUBE[cuby].z, 0, adder, 0),
	findCubyNear(CUBE[cuby].x, CUBE[cuby].y-adder, CUBE[cuby].z, 0, -adder, 0),
	findCubyNear(CUBE[cuby].x, CUBE[cuby].y, CUBE[cuby].z+adder, 0, 0, adder),
	findCubyNear(CUBE[cuby].x, CUBE[cuby].y, CUBE[cuby].z-adder, 0, 0, -adder)]
}
function isInnerCube(cuby) {
	if (veryOutside(cuby) || !CUBE[cuby].shown) return false;
	let touching = getNeighborsArr(cuby);
	return !touching.includes(-1);
}
function getOuterCubes() {
	let outercubes = [];
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].shown && !isInnerCube(i)) {
			outercubes.push(i);
		}
	}
	return outercubes;
}
function rotateIt(){
	CAM.rotateX(-p.PI / ROTX);
	CAM.rotateY(-p.PI / ROTY);
	CAM.rotateZ(-p.PI / ROTZ);
}
function changeKeys(){
	if(KEYBOARD.value() == "Default"){
		document.getElementById("changekeys5").innerHTML = "<td colspan = '2'><sup>~</sup><sub>shuffle</sub></td><td><sup>1</sup><sub>quit</sub></td><td colspan = '2'><sup>Esc</sup><sub>reset</sub></td><td colspan = '2'><sup>=</sup><sub>redo</sub></td><td colspan = '3'><sup>Bspace</sup><sub>undo</sub></td></tr>";
		document.getElementById("changekeys0").innerHTML = "<td><sup></sup><sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup>5</sup> <sub>M</sub></td><td><sup>6</sup> <sub>M</sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td><td><sup></sup> <sub></sub></td>"
		document.getElementById("changekeys1").innerHTML = "<td><sup>Q</sup> <sub>z'</sub></td><td><sup>W</sup> <sub>B</sub></td><td><sup>E</sup> <sub>L'</sub></td><td><sup>R</sup> <sub>l'</sub></td><td><sup>T</sup> <sub>x</sub></td><td><sup>Y</sup> <sub>x</sub></td><td><sup>U</sup> <sub>r</sub></td><td><sup>I</sup> <sub>R</sub></td><td><sup>O</sup> <sub>B'</sub></td><td><sup>P</sup> <sub>z</sub></td>"
		document.getElementById("changekeys2").innerHTML = "<td><sup>A</sup> <sub>y'</sub></td><td><sup>S</sup> <sub>D</sub></td><td><sup>D</sup> <sub>L</sub></td><td><sup>F</sup> <sub>U'</sub></td><td><sup>G</sup> <sub>F'</sub></td><td><sup>H</sup> <sub>F</sub></td><td><sup>J</sup> <sub>U</sub></td><td><sup>K</sup> <sub>R'</sub></td><td><sup>L</sup> <sub>D'</sub></td><td><sup>;</sup> <sub>y</sub></td>";
		document.getElementById("changekeys3").innerHTML = "<td><sup>Z</sup> <sub>d</sub></td><td><sup>X</sup> <sub>M'</sub></td><td><sup>C</sup> <sub>u'</sub></td><td><sup>V</sup> <sub>l</sub></td><td><sup>B</sup> <sub>x'</sub></td><td><sup>N</sup> <sub>x'</sub></td><td><sup>M</sup> <sub>r'</sub></td><td><sup>,</sup> <sub>u</sub></td><td><sup>.</sup> <sub>M'</sub></td><td><sup>/</sup> <sub>d'</sub></td>";
		document.getElementById("changekeys4").innerHTML = "<td colspan = '3'><sup>Shift</sup> <sub>x2 move</sub></td><td colspan = '3'><sup>Space</sup> <sub>stop time</sub></td><td><sup>&larr;</sup><sub>y</sub></td><td><sup>&rarr;</sup><sub>y'</sub></td><td><sup>&uarr;</sup><sub>x</sub></td><td><sup>&darr;</sup><sub>x'</sub></td>";
	}
	else{
		document.getElementById("changekeys5").innerHTML = "<td colspan = '2'><sup>~</sup><sub>shuffle</sub></td><td><sup>1</sup><sub>quit</sub></td><td colspan = '2'><sup>Esc</sup><sub>reset</sub></td><td colspan = '2'><sup>=</sup><sub>redo</sub></td><td colspan = '3'><sup>Bspace</sup><sub>undo</sub></td></tr>";
		document.getElementById("changekeys0").innerHTML = ""
		document.getElementById("changekeys1").innerHTML = "<td><sup>Q</sup> <sub>S'</sub></td><td><sup>W</sup> <sub>B</sub></td><td><sup>E</sup> <sub>L'</sub></td><td><sup>R</sup> <sub>l'</sub></td><td><sup>T</sup> <sub>u'</sub></td><td><sup>Y</sup> <sub>u</sub></td><td><sup>U</sup> <sub>r</sub></td><td><sup>I</sup> <sub>R</sub></td><td><sup>O</sup> <sub>B'</sub></td><td><sup>P</sup> <sub>S</sub></td>"
		document.getElementById("changekeys2").innerHTML = "<td><sup>A</sup> <sub>E</sub></td><td><sup>S</sup> <sub>D</sub></td><td><sup>D</sup> <sub>L</sub></td><td><sup>F</sup> <sub>U'</sub></td><td><sup>G</sup> <sub>F'</sub></td><td><sup>H</sup> <sub>F</sub></td><td><sup>J</sup> <sub>U</sub></td><td><sup>K</sup> <sub>R'</sub></td><td><sup>L</sup> <sub>D'</sub></td><td><sup>;</sup> <sub>E'</sub></td>";
		document.getElementById("changekeys3").innerHTML = "<td><sup>Z</sup> <sub>d</sub></td><td><sup>X</sup> <sub></sub></td><td><sup>C</sup> <sub></sub></td><td><sup>V</sup> <sub>l</sub></td><td><sup>B</sup> <sub>f'</sub></td><td><sup>N</sup> <sub>f</sub></td><td><sup>M</sup> <sub>r'</sub></td><td><sup>,</sup> <sub>M'</sub></td><td><sup>.</sup> <sub>M</sub></td><td><sup>/</sup> <sub>d'</sub></td>";
		document.getElementById("changekeys4").innerHTML = "<td colspan = '3'><sup>Shift</sup> <sub>x2 move</sub></td><td colspan = '3'><sup>Space</sup> <sub>stop time</sub></td><td><sup>&larr;</sup><sub>y</sub></td><td><sup>&rarr;</sup><sub>y'</sub></td><td><sup>&uarr;</sup><sub>x</sub></td><td><sup>&darr;</sup><sub>x'</sub></td>";
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
	// TOPWHITE.selected(expandc[layout[2][1][1][0]]);
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
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
	BUTTON.mousePressed((e) => {
		event();
		e.preventDefault()
	});
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
function quickSolve(savesetup = false)
{
	if (!savesetup) {
		savesetup = special[2];
	}
	setSpecial();
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
					CUBE[cnt] = new Cuby(100, x, y, z, RND_COLORS[cnt], PICKER, p, cnt, savesetup, special, SIZE);
					console.log("here");
				}else
				CUBE[cnt] = new Cuby(DIM, x, y, z, RND_COLORS[cnt], PICKER, p, cnt, savesetup, special, SIZE);
				cnt++;
			}
		}
	}
}
function mouseAllowed() {
	return !NOMOUSE.includes(DIM) // && SIZE <= 3;
}
function speedSetup()
{
	if(document.getElementById("s_instruct").innerHTML.includes("In one game of") ||
	document.getElementById("s_instruct").innerHTML.includes("Your final"))
	{
		CAM = p.createEasyCam(p._renderer);
		CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
		CAM.zoom(CAMZOOM + ZOOMADD);
		rotateIt();
		quickSolve();
		return;
	}
	special[2] = savesetup;
	quickSolve();
	if (pllpracstep > 0) {
		moves = 0;
		timer.stop();
		timer.reset();

	}
	//reSetup();
}
function undoSetup() {
	funcMult(Undo, undo.length);
}
function moveSetup()
{
	if ((mastep > 0 || cstep > 0) && timer.getTime() <= 0) return;
	if (mastep > 0 && nosavesetupdim.includes(DIM)) {
		undoSetup();
		return;
	}
 	if(document.getElementById("s_instruct").innerHTML.includes("In one game of") ||
	document.getElementById("s_instruct").innerHTML.includes("Your final"))
	{
		CAM = p.createEasyCam(p._renderer);
		CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
		CAM.zoom(CAMZOOM + ZOOMADD);
		rotateIt();
		quickSolve();
		return;
	}
	moves = 0;
	special[2] = savesetup;
	bandaged = savebandage;
	quickSolve();
	undo = [];
	redo = [];
	
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
		localSetup("m_4");
	}
	else if(m_34step > 0 && m_34step % 2 == 1)
	{
		document.getElementById("s_instruct").innerHTML = "The first move is a " + Reverse(m_scramble[m_scramble.length-1]) + " and the last move is a " + Reverse(m_scramble[0]);
		giveups -= 0.5;
		localSetup("m_34");
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
	let flipmode = 0;
	let flipmode2 = 0;
	document.getElementById("stepbig").innerHTML = "";
	document.getElementById("step").innerHTML = "";
	document.getElementById("fraction").innerHTML = "";
}
function giveUp()
{
	if (comstep > 0) {
		timer.stop();
		timer.reset();
		comstep++;
		if(ao5 == 0) ao5 = ["DNF"];
		else ao5.push("DNF");
		socket.emit("solved", room, "DNF");
		fadeInText(1, "DNF");
		setTimeout(() => {fadeInText(0, "DNF")}, 400);
		canMan = false;
		getEl("giveup").style.display = "none";
	} else if(m_4step > 0 && m_4step % 2 == 1)
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
		if (giveups > 0) localSetup("m_4");
		else localStorage.removeItem("m_4");
	}
	else if(m_34step > 0 && m_34step % 2 == 1)
	{
		if(giveups > 0.5)
			giveups--;
		else
			giveups = 0;

		if (giveups > 0) localSetup("m_34");
		else localStorage.removeItem("m_34");
		
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
	SIZE = 3;
	MAXX = 50;
	DIM2 = 100;
	DIM = 100;
	DIM3 = 2;
	DIM4 = 2;
	localStorage.startcube = 2;
	modeData("twobytwo");
	THREEBYTHREE.class('btn btn-light btn-sm');
	TWOBYTWO.class('btn btn-warning btn-sm');
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
	if(MODE == "paint")
		idmode();
	changeCam(true);
}
function changeThree()
{
	DIM2 = 50;
	DIM = 50;
	SIZE = 3;
	MAXX = 50;
	DIM3 = 3;
	DIM4 = 3;
	localStorage.startcube = 3;
	THREEBYTHREE.class('btn btn-warning btn-sm');
	TWOBYTWO.class('btn btn-light btn-sm');
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
	if(MODE == "paint")
		idmode();
	changeCam(true);
}
function changeCam(changeinp = true)
{
	INPUT.selected("Normal");
	SCRAM.value("Normal");
	changeinp && changeInput();
	setSpecial();
	SIZE = 3;
	MAXX = 50;
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
	change9(true);
}
function changeFour(){
	DIM = 1;
	DIM2 = 50;
	changeCam(3);
	refreshButtons();
	ONEBYTHREE.style('background-color', "#8ef5ee");
}
function changeFive(){
	DIM = 2;
	DIM2 = 2;
	changeCam(3);
	INPUT.value("3x3x2");
	SCRAM.value("3x3x2");
	refreshButtons();
	SANDWICH.style('background-color', "#8ef5ee");
}
function changeSix(){
	DIM = 3;
	DIM2 = 50;
	changeCam(3);
	SCRAM.value("Middle Slices");
	refreshButtons();
	CUBE3.style('background-color', "#8ef5ee");
}
function changeSeven(){
	DIM = 4;
	DIM2 = 50;
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
	DIM2 = 50;
	changeCam(3);
	refreshButtons();
	CUBE6.style('background-color', "#8ef5ee");
}
function changeBan(dim, b)
{
	bandaged = b;
	DIM = dim;
	DIM2 = 50;
	special[6] = 50;
	changeCam(3);
	reCam();
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
	DIM2 = 100;
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
	DIM2 = 50;
	changeCam(3);
	refreshButtons();
	CUBE13.style('background-color', "#8ef5ee");
}
function change18(dim, b){
	changeBan(dim, b)
	CUBE14.style('background-color', "#8ef5ee");
}
function change19(){
	DIM = 15;
	DIM2 = 15;
	changeCam(3);
	INPUT.value("3x3x2");
	SCRAM.value("3x3x2");
	refreshButtons();
	CUBE15.style('background-color', "#8ef5ee");
}
function switchSize(s, d = 50, d2 = 50, input = "Normal") {
	DIM2 = d2;
	DIM = d;
	DIM3 = 3;
	DIM4 = 3;
	changeCam(3)
	INPUT.value(input);
	SCRAM.value(input);
	SIZE = s;
	MAXX = (SIZE - 1) * 25;
	reSetup();
	refreshButtons();
}
function change20(dim, b){
	changeFive();
	bandaged = b;
	changeCam(3);
	DIM2 = 2;
	INPUT.value("3x3x2");
	SCRAM.value("3x3x2");
	reCam();
	refreshButtons();
	CUBE16.style('background-color', "#8ef5ee");
}
function changeMod(dx){
	modnum = (modnum + dx + 3) % 3;
	document.getElementById("custom").style.display = modnum == 0 ? "block" : "none"; 
	document.getElementById("customb").style.display = modnum == 1 ? "block" : "none"; 
	refreshButtons();
}
function leftBan(){
	if (bandaged.length == 0) return;
	if(bannum == 1) bannum = bandaged.length;
	else bannum--;
	if(bandaged.length >= bannum) document.getElementById("deleteban").style.display = "block";
	else document.getElementById("deleteban").style.display = "none";

	viewBandage(true);
}
function rightBan(){
	if (bandaged.length == 0) return;
	if(bannum == bandaged.length) bannum = 1;
	else bannum++;
	if(bandaged.length >= bannum) document.getElementById("deleteban").style.display = "block";
	else document.getElementById("deleteban").style.display = "none";
	viewBandage(true);

}
function setCustomShape() {
	// Remove old checkboxes
	for (let i = 0; i < CHECK.length; i++) {
		CHECK[i].remove();
	}
	for (let i = 0; i < CHECKALL.length; i++) {
		CHECKALL[i].remove()
	}

	// Get parent container
	const parentElement = document.getElementById("check1");
	const checkboxesPerRow = SIZE;
	const totalCheckboxes = SIZE * SIZE * SIZE;

	// Clear existing content
	parentElement.innerHTML = "";

	// Create checkboxes and organize them in rows
	let row;
	for (let i = 0; i < totalCheckboxes; i++) {
		if (DIM3 == 2 && [1, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25].includes(i)) continue;
		if (i % checkboxesPerRow === 0) {
			row = document.createElement("div");
			row.classList.add("checkbox-row");
			parentElement.appendChild(row);
		}
		const checkboxContainer = document.createElement("div");
		checkboxContainer.classList.add("checkbox-container");
		CHECK[i] = p.createCheckbox('', true);
		CHECK[i].parent(checkboxContainer); 
		row.appendChild(checkboxContainer);
		const style = ((i % (SIZE * SIZE)) < SIZE && i > SIZE) ? "padding-right: 3px; padding-top: 15px;" : "padding-right: 3px;";
		CHECK[i].style(style);
		let layer = DIM3 != 2 ? (Math.floor(i / (SIZE * SIZE)) + 1) : i < 9 ? 1 : 2;
		let checkall = false;
		if ((i % (SIZE * SIZE) == SIZE - 1)) {
			CHECKALL[layer - 1] = p.createCheckbox(" Layer " + layer, true);
			CHECKALL[layer - 1].parent(row);
			CHECKALL[layer - 1].style(style + "padding-left: 30px; line-height: 0;");
			CHECKALL[layer - 1].changed(() => {
				let start = Math.floor(i / SIZE / SIZE) * SIZE * SIZE;
				for (let j = start; j < start + SIZE * SIZE; ++j) {
					CHECK[j].checked(CHECKALL[layer - 1].checked());
					change9();
				}
			})
		}

		if (DIM3 != 2 && i == SIZE * SIZE - 1) {
			let button = p.createButton("Apply Layer 1 to all");
            button.parent(row);
            setButton(button, row, 'btn btn-info', `text-align:center; font-size: 10px; margin-left: 30px; float: right;`, () => {
				for (let j = SIZE * SIZE; j < SIZE * SIZE * SIZE; ++j) {
                    CHECK[j].checked(CHECK[j - SIZE * SIZE].checked());
					change9();
                }
				// change9();
			});
			button.style('margin-top', '-10px');  // This moves the button up by 10px
		}

		CHECK[i].changed(() => {
			CHECKALL[layer - 1].checked(false);
			let start = Math.floor(i / SIZE / SIZE) * SIZE * SIZE;
			for (let j = start; j < start + SIZE * SIZE; ++j) {
				if (CHECK[j].checked()) {
					CHECKALL[layer - 1].checked(true);
				}
			}
			change9();
		});
	}
}
function change9(bigchange = false)
{

	DIM = [];
	DIM[0] = SEL.value();
	DIM[1] = SEL2.value();
	DIM[2] = SEL3.value();
	DIM[3] = SEL4.value();
	DIM[4] = SEL5.value();
	DIM[5] = SEL6.value();
	if(bigchange)
	{
		console.log("CHANGING")
		setCustomShape();
	}
	let checked = [];
	for(let i = 0; i < SIZE * SIZE * SIZE; i++)
	{
		if(!CHECK[i].checked())
			checked.push(i);
	}
	if(DIM3 == 2)
		checked.push(1, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25);
	DIM[6] = checked; 
	DIM[7] = DIM3;
	rotation = CAM.getRotation();
	reSetup(rotation);
}
function changeRandom()
{
	// let cube;
	// if(Math.random() > 0.66)
	// 	cube = 2;
	// else
	// 	cube = 3;
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

	for (let i = 0; i < CHECK.length; i++) {
		CHECK[i].checked(Math.random() <= (close/8))
	}

	// if(cube == 2)
	// SEL7.selected('2x2');
	// else
	// SEL7.selected('3x3');
	SEL.selected(face[0]); SEL2.selected(face[1]); SEL3.selected(face[2]); 
	SEL4.selected(face[3]); SEL5.selected(face[4]); SEL6.selected(face[5]);
	// let twos = [0, 2, 6, 8, 18, 20, 24, 26];
	// if(cube == 3)
	// {
	// 	for(let i = 0; i < 27; i++)
	// 	{
	// 		CHECK[i].checked(cubies[i]);
	// 	}
	// }
	// else{
	// 	for(let i = 0; i < 8; i++)
	// 	{
	// 		CHECK[twos[i]].checked(cubies[i]);
	// 	}
	// }
	change9();
}
function setInput() {
	if(('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && !matchMedia('(pointer:fine)').matches || isIpad()) { //button
		document.getElementById("keymap").style.display = "none";
		document.getElementById("test_alg_div").style.display = "none";
		document.getElementById("undo").style.display = "inline";
		document.getElementById("redo").style.display = "inline";
		document.getElementById("input2").style.display = "none";
		if ((MODE == "cube" && !mouseAllowed() && custom == 0) || custom == 1 && !canMouse()) {
			document.getElementById("input2").style.display = "block";
		}
		if (SHUFFLE_BTN) SHUFFLE_BTN.html('<i class="bi bi-shuffle"></i>');
		if (UNDO) UNDO.html('<i class="bi bi-arrow-90deg-left"></i>');
		if (REDO) REDO.html('<i class="bi bi-arrow-90deg-right"></i>');

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
function updateSession() {
	Object.assign(savetimes[session], { mo5, movesarr, ao5, scrambles});
}
function changeSession() {
	if (!SESSION) return;
	session = SESSION.value() - 1;
	({mo5, movesarr, ao5, scrambles} = savetimes[session]);
}
function changeInput()
{
	if(MODE == "normal")
	{
		DELAY_SLIDER.value(0);
		DELAY = 0;
	}
	SCRAM.selected(INPUT.value())
	input = INPUT.value();
	setInput();
}
function ban9(){
	let temp = DIM;
	DIM = [];
	DIM[0] = "adding";
	DIM[1] = bandaged2;
	DIM[2] = bandaged;
	if (!Array.isArray(temp))
		DIM[3] = temp;
	else
		DIM[3] = temp[3];
	// rotation = CAM.getRotation();
	// reSetup(rotation);
}
function viewBandage(def){
	customb = 2;
	if(!def) {
		bannum = 1;
	}
	setDisplay("block", ["okban"]); 
	setDisplay("none", ["addbandage", "addbandage4", "custom5", "select9", "rng2", "input", "scram", "cancelban","bandage_outer","bandage_outer2","smoothbandage"]); 
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
	if (!def) {
		reSetup();
	}
	//canMan = false;
	
}
function addBandage(reset = true){
	customb = 1;
	document.getElementById("addbandage2").innerHTML= "<b>Click the cubies to join bandage group #" + (bandaged.length+1) + "</b>";
	document.getElementById("addbandage3").innerHTML= "Avoid clicking on already bandaged cubies (shown in black).";
	setDisplay("none", ["rng2", "addbandage", "addbandage4", "smoothbandage", "custom5", "select9", "input", "scram", "deleteban","bandage_outer","bandage_outer2"]);
	setDisplay("block", ["okban", "cancelban"]);
	bandaged2 = [-1];
	ban9();
	if (reset && DIM2 != 50)
		reSetup();
}
function doneBandage(){
	document.getElementById("addbandage2").innerHTML= "";
	document.getElementById("addbandage3").innerHTML= "";
	setDisplay("none", ["okban", "leftban", "rightban", "deleteban", "cancelban"]); 
	setDisplay("block", ["addbandage", "addbandage4", "smoothbandage", "input", "scram","bandage_outer","bandage_outer2"]); 
	setDisplay("inline", ["custom5", "select9", "rng2"]); 

	let pushing = false
	if(bandaged2.length > 1 && customb == 1) {
		bandaged.push(bandaged2);
		pushing = true;
	}
	bandaged2 = [];
	customb = 0;
	ban9();
	// quickSolve(special[2])
	if (!bandaged3[BANDAGE_SELECT.value()]) {
		bandaged3[BANDAGE_SELECT.value()] = {
			[BANDAGE_SLOT.value()]: bandaged, 
			slot: BANDAGE_SLOT.value(), ...bandaged3[BANDAGE_SELECT.value()]
		  };
	} else {
		bandaged3[BANDAGE_SELECT.value()][BANDAGE_SLOT.value()] = bandaged;
		bandaged3[BANDAGE_SELECT.value()].slot = BANDAGE_SLOT.value();
	}
	if (pushing) {
		addBandage(false);
	} else {
		b_selectdim[BANDAGE_SELECT.value()]();
		if (SMOOTHBANDAGE.checked()) {
			smoothBandage();
		}
	}
}
function cancelBandage(){
	customb = 0;
	bandaged2 = [];
	doneBandage();
}
function allBandaged(){
	let possible = [];
	let allbandaged = bandaged.flat();
	console.log("allbandaged is", allbandaged);
	let cubies = getOuterCubes();
	for(let j = 0; j < cubies.length; j++){
		if(!allbandaged.includes(j) && cubies.includes(j)) possible.push(j);
	}
	return possible;
}
function randomBandage(){
	// BANDAGE_SELECT.value("3x3");
	// changeThree();
	let numB = parseInt(Math.random()*SIZE)+2;
	if (special[6] == 2) numB = parseInt(Math.random()*2)+1;
	if (special[6] == 15) numB = 1;
	let possible = [];
	let possible2 = [];
	bandaged = [];
	let size = 2;
	if(numB == 3) size = 2;
	if(numB == 2) size = 3;
	if (special[6] != 50) size = 2;
	if(shownCubies().length >= 50) size++;
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
	smoothBandage(true); 
	bandaged3[BANDAGE_SELECT.value()] = {
		[BANDAGE_SLOT.value()]: bandaged, 
		slot: BANDAGE_SLOT.value(), ...bandaged3[BANDAGE_SELECT.value()]
	  };
	bandaged2 = [];
	ban9();
	b_selectdim[BANDAGE_SELECT.value()]();
}
function smoothBandage(random = false) {
	let cnt = 0;
	console.log("way before", JSON.stringify(bandaged));
	while (cnt < 1000) {
		let nosmooth = true;
		bandaged.forEach((b) => {
			for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
				if (!getOuterCubes().includes(i)) continue;
				if (b.includes(i)) continue;
				if (b.reduce((acc, c) => acc + (nextcuby[i].includes(c) ? 1 : 0), 0) >= 2) {
					if (!bandaged.flat().includes(i)) {
						// console.log(!bandaged.flat().includes(i), nextcuby[i], i, bandaged);
						console.log("before add", JSON.stringify(bandaged));
						b.push(i);
						console.log("after add", JSON.stringify(bandaged));
					} else {
						for (let j = 0; j < bandaged.length; j++) {
							if (bandaged[j].includes(i) && i != j) {
								if (Math.random() < 0.5 || !random) b.push(...bandaged[j]);
								console.log("before splice", JSON.stringify(bandaged));
								bandaged.splice(j, 1);
								console.log("after splice", JSON.stringify(bandaged));
								break;
							}
						}
					}
					nosmooth = false;
					++cnt;
				}
				// bandaged.map(subArray => [...new Set(subArray)]);
			}
		})
		if (nosmooth) break;
	}
	reSetup();
}
function deleteBan(){
	let deleted = false;
	if(bandaged.length >= bannum)  {
		bandaged.splice(bannum-1, 1);
		deleted = true;
	}
	doneBandage();
	viewBandage();
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
	if(canMan)
	{
		arr = [move];
		if(INPUT.value() == "Double Turns")
			arr.push(arr[0]);
		if(INPUT.value() == "3x3x2" && bad5.includes(arr[0][0]))			
			arr.push(arr[0]);
		if(INPUT.value() == "Gearcube") {
			if (['M', 'S', 'E'].includes(arr[0][0])) {
				arr = []
			} else {
				arr.unshift(toGearCube(arr[0]));
			}
		}
		if(INPUT.value() == "Gearcube II") {
			if (['M', 'S', 'E'].includes(arr[0][0])) {
				arr = []
			} else {
				arr.push(arr[0]);
				console.log(arr[0][0])
				console.log(opposite2[arr[0][0]] + (arr[0].includes("'") ?  "" : "'"))
				arr.push(opposite2[arr[0][0]] + (arr[0].includes("'") ?  "" : "'"));
			}
		}
		multiple(0, true);
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
	if (bandaged3[BANDAGE_SELECT.value()] && bandaged3[BANDAGE_SELECT.value()].slot) {
		BANDAGE_SLOT.selected(bandaged3[BANDAGE_SELECT.value()].slot)
	} else {
		BANDAGE_SLOT.selected(1)
	}
	if (bandaged3.hasOwnProperty(BANDAGE_SELECT.value()) && bandaged3[BANDAGE_SELECT.value()][BANDAGE_SLOT.value()]) {
		bandaged = bandaged3[BANDAGE_SELECT.value()][BANDAGE_SLOT.value()];
	} else {
		bandaged = [];
	}
	changeCam(3);
	doneBandage();
	modeData("custombandage");
	ban9();
	b_selectdim[BANDAGE_SELECT.value()]();
}
function Custom()
{
	custom = 1;
	document.getElementById("allmodes").style.display = "none";
	document.getElementById("cube").style.display = "none";
	document.getElementById("modarrow").style.display = "none";
	document.getElementById("custom2").style.display = "block";
	document.getElementById("custom4").style.display = "none";
	INPUT.value("Normal");
	SCRAM.value("Normal");
	modeData("customshape");
	b_selectdim[SEL7.value()]();
	change9();
}
function Reverse(move)
{
	if(move.slice(-1) == "'")
		return move.substring(0, move.length-1);
	return move + "'";
}

function getProgress() { // temporary get progress
	let cubies = getOuterCubes();
	let sum = 0;
	let weight = 0;
	["right", "left", "front", "back", "top", "bottom"].forEach((dir) => {
		let colormap = {};
		let den = 0;
		cubies.forEach((cuby) => {
			const neighbors = getNeighborsArr(cuby);
			const map = {"right" : 1, "left" : 0, "front" : 4, "back" : 5, "top" : 2, "bottom" : 3};
			if (neighbors[map[dir]] == -1) {
				den++;
				if (colormap[getColor(CUBE[cuby][dir].levels)])
					colormap[getColor(CUBE[cuby][dir].levels)] += 1;
				else
					colormap[getColor(CUBE[cuby][dir].levels)] = 1;
			}
		})
		let max = 0;
		for (let color in colormap) {
			max = Math.max(max, colormap[color]);
		}
		let pigeonhole = Math.floor(den / 6) + 1; // Find min # of colors
		let ratio = (max - pigeonhole) / (den - pigeonhole);
		if (ratio == 1) {
			sum += ratio * 5;
			weight += 5;
		} else {
			sum += ratio;
			weight ++;
		}
	})
	return Math.round((sum / weight) * 100);
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
	CAM.zoom(CAMZOOM + ZOOMADD);
}
//Henry
function startCube() {
	if(localStorage.startcube && localStorage.startcube == 2) changeTwo();
	else changeThree();
}
function regular(nocustom){
	modeData("normal");
	MINIMODE = "normal";
	if(MODE != "timed" && MODE != "cube" && MODE != "normal")
	{
		ao5 = [];
		mo5 = [];
		movesarr = [];
		scrambles = [];
	}
	// console.log("Reseting", saveao5,["speed", "moves", "compete", "competing"].includes(MODE),(saveao5[1] && saveao5[1].length > 0) )
	if(["speed", "moves", "compete", "competing"].includes(MODE) || (saveao5[1] && saveao5[1].length > 0)){
		ao5 = saveao5[0];
		mo5 = saveao5[1];
		scrambles = saveao5[2];
		movesarr = saveao5[3];
	}
	if (DIM2 != 50 && DIM2 != 100) {
		startCube()
	}
	document.getElementById("scramble").innerHTML = "N/A";
	document.getElementById('password').value = '';
	DELAY_SLIDER.value(0);
	DELAY = 0;
	canMan = true;
	DIM = DIM2;
	if(["cube","daily", "weekly"].includes(MODE)) {
		startCube() 
	}
	MODE = "normal";
	if (mastep > 0) {
		startCube() 
	}
	fullScreen(false);
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
	setDisplay("block", ["or_instruct", "or_instruct2", "or_instruct4", "test_alg_div", "type3", "mode", "mode2", "mode3", "mode7", "ID1", "settings", "scram", "timeselect"]);
	setDisplay("inline", ["shuffle_div", "reset_div", "solve", "undo", "redo", "speed", "slider_div", "outermoves", "outertime", "input", "delayuseless"]);
	setDisplay("none", ["or_instruct3", "points_par", "readybot", "mode4", "mode5", "mode6", "mode8", "alltimes", "ID3", "s_easy", "s_medium", "s_OLL", "s_PLL", "m_34", "m_4", 
		"m_high", "link1", "timegone", "reset2_div", "reset3_div", "giveup", "giveup2", "hint", "cube", "custom2", "custom4", "spacetime", "stop_div", "modarrow", "s_bot", 
		"s_high", "s_RACE", "s_RACE2", "settings1", "loginform", "highscore", "c_INSTRUCT", "c_week", "challengeback", "hotkey1", "s_prac", "s_prac2", "s_image","s_start"
		,"blind", "overlay", "peeks", "b_win", "b_start", "divider", "beforetime", "marathon","marathon2","ma_buttons","paint","saveposition", "lobby", "creating_match", "waitingroom", "startmatch", "in_match", "continuematch", "com_1v1_div",
		"com_group_div", "finish_match", "cantmatch", "final_tally", "go!"]);
	setInnerHTML(["s_INSTRUCT", "s_instruct", "s_instruct2", "s_RACE3", "s_difficulty", "l_message", "lobby_warn"]);
	[COMPETE_1V1, COMPETE_GROUP].forEach((b) => b && b.style("backgroundColor", ""));
	if (ismid) {
		setDisplay("none", ["or_instruct", "or_instruct2"]);
	}
	getEl("times_desc").innerHTML = "Times:";
	getEl("outertime").style.color = document.body.style.color;
	if (document.getElementById("cnv_div").style.display == "none" && (getEl("s_prac3x3o").style.display == "none" || pracmode != "OLL")) {
		document.getElementById("cnv_div").style.display = "block";
		fullScreen(false);
		
		reCam();
		resized();
	} 
	document.getElementById("right").className = "col-xl-4 noselect";
	INPUT.removeAttribute('disabled');
	changeInput();
	changeCam();
	setInput();
	SCRAM.value("Normal");
	easystep = 0;
	medstep = 0;
	mastep = 0;
	ollstep = 0;
	pllstep = 0;
	customb = 0;
	comstep = 0;
	pllpracstep = 0;
	m_34step = 0;
	m_4step = 0;
	bstep = 0;
	ma_data.type = "";
	pracmode = "none";
	VOLUME.position(cnv_div.offsetWidth-(document.getElementById("settings").style.display == "none"? 60 : 130), 5);
	socket.emit("leave-room", room);
	room = 0;
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
	TIMEDMODE.style('background-color', '#8ef5ee');
	TIMEDMODE2.style('background-color', "#8ef5ee");

	setDisplay("none", ["mode", "ID1", "settings", "mode2", "mode3", "mode7", "or_instruct", "or_instruct2", "or_instruct3", "or_instruct4", "scram", "timegone", "custom2", "custom4", "cube", "input", "hotkey1"]);
	setDisplay("block", ["type3"]);
	document.getElementById("or_instruct3").innerHTML = "";
	VOLUME.position(cnv_div.offsetWidth-(document.getElementById("settings").style.display == "none"? 60 : 130), 5);
	changeInput();
	
	modeData("stats");
}
function cubemode()
{
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
	VOLUME.position(cnv_div.offsetWidth-(document.getElementById("settings").style.display == "none"? 60 : 130), 5);
	modeData("other");
}
function idmode()
{
	regular(true);
	//MODE = "speed"
	// if(document.getElementById("ID3").style.display == "block"){
	// 	regular();
	// 	return;
	// }
	DIM = DIM2;
	//reSetup();
	stopMoving();

	refreshButtons();
	REGULAR.style('background-color', '#10caf0');
	IDMODE.style('background-color', '#8ef5ee');

	document.getElementById("s_instruct2").innerHTML = "";
	document.getElementById("s_RACE3").innerHTML = "";

	setDisplay("none", ["shuffle_div", "settings", "input", "reset_div", "solve", "settings1", "input2", "scram", "timeselect"]);
	setDisplay("block", ["ID3", "test_alg_div","ID4","ID5"]);
	setDisplay("inline", ["iddefault"])
	
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}

	document.getElementById("test_alg_span").innerHTML = "Paste ID here:";

	modeData("id");
}
function sinceNov3(what) {
	const startDate = new Date('2024-11-03');
	const currentDate = new Date();
	const msDifference = currentDate - startDate;
	let div = what == "w" ? 1000 * 60 * 60 * 24 * 7 : 1000 * 60 * 60 * 24;
	const weeksDifference = msDifference / div;
	
	return Math.floor(weeksDifference); // Return whole weeks
  }

let colorindex = 0;
function getColoredCuby(index) {
	let obj = {}
	// const faces = ["right","top","front","bottom","back","left"];
	const faces = ["right", "top", "front", "top", "front", "top"];
	let cuby = [0,1,2,3,4,5,6,7,8,6,7,8,15,16,17,24,25,26,8,5,2,17,14,11,26,23,20,
		2,1,0,11,10,9,20,19,18,0,3,6,9,12,15,18,21,24,20,19,18,23,22,21,26,25,24
	];
	obj.face = faces[Math.floor(index / 9)]
	obj.cuby = cuby[index];
	return obj;
}
function paintmode() {
	modeData("paint");
	activeKeys.clear();
	MODE = "paint";
	special[2] = savesetup;
	// quickSolve(savesetup);
	setDisplay("none", ["ID4","test_alg_div","ID5","saveposition"]);
	setDisplay("block", ["paint","finishpaint"]);
	setDisplay("inline", ["iddefault"]);
	canMan = false;
	colorindex = 0;
	let obj = getColoredCuby(0);
	CUBE[obj.cuby].setFaceColor(CUBE[obj.cuby].colors["magenta"], obj.face);
}
function paintit(color, dx = 1) {
	if (MODE != "paint") return;
	if (isAnimating()) {
		return;
	}
	if (DIM == 100) {
		console.log(getColoredCuby(colorindex + dx), removedcubies[100], colorindex, dx)
		if (removedcubies[100].includes(getColoredCuby(colorindex + dx).cuby)) {
			dx += dx;
			paintit(color, dx);
			return;
		}
	}
	let obj;
	let colormap;
	if (colorindex != 54) {
		setDisplay("block", ["paint"]);
		obj = getColoredCuby(colorindex);
	 	colormap = +Object.entries(mapCuby()).find(([key, value]) => value == obj.cuby)?.[0];
		if (color != "original") {
			CUBE[obj.cuby].setFaceColor(CUBE[colormap].colors[color], obj.face);
		} else {
			CUBE[obj.cuby].originalFaceColor(obj.face);
		}
	}
	if (!(dx > 0 && colorindex == 54))
		colorindex+= dx;
	setDisplay(colorindex == 54 ? "none" : "block", ["colorbuttons"]);
	if (colorindex == 54) {
		return;
	}
	console.log("colorindex is " + colorindex)
	obj = getColoredCuby(colorindex);
	colormap = +Object.entries(mapCuby()).find(([key, value]) => value == obj.cuby)?.[0];
	if (dx > 0) {
		if (colorindex == 27) {
			arr = ["y", "y"];
			multiple2("scramble");
		}
		if (colorindex == 45) {
			arr = ["x"];
			multiple2("scramble");
		}
	}
	if (dx < 0) {
		if (colorindex == 44) {
			arr = ["x'"];
			multiple2("scramble");
		}
		if (colorindex == 26) {
			arr = ["y", "y"];
			multiple2("scramble");
		}
	}
	// CUBE[obj.cuby].setFaceColor(CUBE[colormap].colors["magenta"], obj.face);
	if (arr.length > 0) {
		setTimeout(() => {
			CUBE[obj.cuby].setFaceColor(CUBE[colormap].colors["magenta"], obj.face);
			canMan = false;
		}, 40);
	} else {
		CUBE[obj.cuby].setFaceColor(CUBE[colormap].colors["magenta"], obj.face);
	}
}
function finishpaint() {
	if (colorindex != 54) {
		let obj = getColoredCuby(colorindex);
		console.log(obj)
		CUBE[obj.cuby].originalFaceColor(obj.face);
		colorindex = 54;
	}
	MODE = "finishpaint";
	canMan = true;
	setDisplay("none", ["paint","iddefault"]);
	setDisplay("block", ["ID5","saveposition"]);
	setLayout();
	savesetup = IDtoReal(IDtoLayout(decode(getID())));
	special[2] = savesetup;
	setLayout();
	console.log(savesetup);
}
document.getElementById("compete").onclick = competemode;
function competemode() {
	modeData("compete");
	regular();
	setDisplay("none", ["test_alg_div", "ID1", "input", "scram", "challengeback", "settings", "timeselect","type3"]);
	setDisplay("block", ["lobby"]);
	SCRAM.value("Normal");
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	MODE = "compete";
}


socket.on("connect", () => {
	console.log("Youre are connected with id: ", socket.id)
});

socket.on("refresh_rooms", (data, r) => {
	competedata = data;
	enterLobby(data, r)
});

function enterLobby(data, r) {
	setDisplay("none", ["lobby", "in_match", "final_tally"]);
	setDisplay("block", ["waitingroom"]);
	console.log("Refreshed")
	room = r;
	getEl("waitingroomid").innerHTML = "Joined room " + room;
	setDisplay((data.userids.length > 1 || data.data.type == "group") && data.data.leader == socket.id ? "block" : "none", ["startmatch"]);
	setDisplay((data.userids.length > 1 || data.data.type == "group") && data.data.leader == socket.id ? "none" : "block", ["cantmatch"]);
	getEl("cantmatch").innerHTML = 
			`${data.data.leader != socket.id ? "Waiting for host to start match." : "Exactly 2 players are required to start."}`
	competedata = data;
	let str = ""
	data.userids.forEach((id, x) => {
		str += (x + 1) + ") "
		if (id == socket.id) {
			str += COMPETE_YOU;
		}
		str += data.names[id];
		if (id == socket.id) {
			str += `</b>`;
		}
		str += `<br>`;
	})
	getEl("waitingroomdata").innerHTML = str;
	str = ""
	str = `Total Rounds: ${data.data.dims.length} <br>`;
	if (data.data.type == "1v1") {
		data.data.dims.forEach((cube, x) => {
			str += `Round ${x + 1})`
			if (data.data.leader == socket.id) {
				str += `${COMPETE_YOU} ${data.names[socket.id]}: ${cube[0]}</b>, `;
				str += ` ${data.userids.length == 2 ? (data.userids[0] == socket.id ? data.names[data.userids[1]] : data.names[data.userids[0]]): "opponent"}: ${cube[1]}`;
				str += "<br>";
			} else {
				str += ` ${data.userids.length == 2 ? (data.userids[0] == socket.id ? data.names[data.userids[1]] : data.names[data.userids[0]]): "opponent"}: ${cube[0]}, `;
				str += `${COMPETE_YOU} ${data.names[socket.id]}: ${cube[1]}</b>`;
				str += "<br>";
			}
		})
	} else {
		data.data.dims.forEach((cube, x) => {
			str += `Round ${x + 1}): ${cube[0]}<br>`
		})
	}
	getEl("competerules").innerHTML = str;
}
function createMatch() {
	setDisplay("none", ["lobby"]);
	setDisplay("block", ["creating_match"]);
}

function finishMatch() {
	let dimarr = competeDims();
	let numrounds = getEl("compete_rounds").value;
	if (getEl("compete_rounds").value < 1 || isNaN(numrounds)) {
		alert("Please enter an integer greater than 1");
		return;
	}
	setDisplay("none", ["creating_match"]);
	setDisplay("block", ["waitingroom"]);
	getEl("waitingroomid").innerHTML = "Attempting to Create Room";
	socket.emit("create-room", {rounds: 3, dims: dimarr, type: compete_type, leader: socket.id}, localStorage.username);
}

function joinRoom() {
	const room = getEl("join_input").value;
	socket.emit("join-room", room, localStorage.username, (err) => {
		successSQL(err, "lobby_warn");
	})
}

function startMatch() {
	socket.emit("start-match", room);
}

function competeAgain() {
	socket.emit("restart-game", room, competedata, (err) => {
		successSQL(err, "final_warn");
	});
}

socket.on("started-match", (data, scramble) => {
	MODE = "competing";
	setDisplay("none", ["waitingroom", "startmatch"]);
	setDisplay("inline", ["in_match", "speed", "input", "slider_div", "undo", "redo","outertime", "time", "giveup"]);
	setDisplay("block", ["times_par"])
	changeInput();
	getEl("match_INSTRUCT").innerHTML = "Solve the cube faster than your opponent!";
	saveao5 = [ao5, mo5, scrambles, movesarr];
	ao5 = [];
	mo5 = [];
	scrambles = [];
	movesarr = [];
	comstep = 1;
	startRound(data, scramble);
});

socket.on("next-match", (data, scramble) => startRound(data, scramble))

function startRound(data, scramble) {
	setDisplay("none", ["continuematch", "waitingmatch"])
	setDisplay("inline", ["giveup"]);
	canMan = true;
	getEl("match_INSTRUCT").innerHTML = "Solve the cube faster than your opponent!";
	getEl("match_INSTRUCT3").innerHTML = "";
	getEl("match_INSTRUCT4").innerHTML = "";
	competedata = data;
	if (data.data.type == "group" || data.data.leader == socket.id)
		b_selectdim[data.data.dims[data.round][0]]();
	else
		b_selectdim[data.data.dims[data.round][1]]();
	setTimeout(() => {
		INPUT.attribute('disabled', true);
		competeTimes(data);
		if (scramble) {
			changeArr(scramble);
			multiple2("scramble");
		} else {
			shuffleCube();
		}
		competeprogress = 0;
		canMan = false;
		waitStopTurning(true);
	}, 10);
}

socket.on("someone-solved", (data) => competeTimes(data));

function competeTimes(data, end = false) {
	competedata = data;
	let strarr = [];
	data.userids.forEach((id) => {
		if (!data.solved[id]) strarr.push([id, data.progress[id] ?? 0, data.times[id] ?? 0])
		else strarr.push([id, data.progress[id] ?? 0, data.solved[id]])
	});
	strarr.sort((a, b) => {
		if (a[1] != b[1]) {
			return b[1] - a[1];
		}
		if (a[2] == "DNF") a[2] = DNF;
		if (b[2] == "DNF") b[2] = DNF;
		if (a[2] != b[2]) return a[2] - b[2];
		let copya = a[2];
		let copyb = b[2];
		if (a[0] == socket.id) copya--;
		if (b[0] == socket.id) copyb--;
		return copya - copyb;
	});
	let str = "";
	let rank = 1;
	for (let i = 0; i < strarr.length; ++i) {
		if (strarr[i][0] == socket.id) {
			str += COMPETE_YOU;
		}
		if (i == 0 || strarr[i][2] != strarr[i - 1][2]) {
			rank = (i + 1);
		}
		str += `${rank}) `;
		str += data.names[strarr[i][0]];
		if (!end) {
			str += ", progress: " + strarr[i][1] + "%";
		}
		str += ", time: " + (strarr[i][2] >= DNF ? "DNF" : strarr[i][2]) + "s";
		// if (rank == 1 && end) {
		// 	str += " 🔥";
		// }
		if (strarr[i][0] == socket.id) {
			str += `</b>`;
		}
		str += "<br>";
	}
	getEl("match_INSTRUCT2").innerHTML = str;
	getEl("match_TITLE").innerHTML = `Round ${data.round + 1}`;
}

function competePoints(data, el = "match_INSTRUCT4") {
	competedata = data;
	compete_alltimes = [];
	let strarr = [];
	let myrank = -1;
	data.userids.forEach((id) => {
		strarr.push([id, data.winners[id] ?? 0]);
	});
	strarr.sort((a, b) => {
		if (a[1] != b[1]) return b[1] - a[1];
		let copya = a[1];
		let copyb = b[1];
		if (a[0] == socket.id) copya++;
		if (b[0] == socket.id) copyb++;
		return copyb - copya;
	});
	let str = "";
	let rank = 1;
	for (let i = 0; i < strarr.length; ++i) {
		if (strarr[i][0] == socket.id) {
			str += COMPETE_YOU;
		}
		if (i == 0 || strarr[i][1] != strarr[i - 1][1]) {
			rank = (i + 1);
		}
		compete_alltimes.push([rank, strarr[i][0]]);
		str += `${rank}) `;
		str += data.names[strarr[i][0]];
		str += ", points: " + strarr[i][1];
		if (rank == 1) {
			str += " 👑";
		}
		if (strarr[i][0] == socket.id) {
			myrank = rank;
			str += `</b>`;
		}
		str += "<br>";
	}
	getEl(el).innerHTML = str;
	return myrank;
}

socket.on("all-solved", (data) => {
	canMan = false;
	competedata = data;
	console.log("DATA IS", data)
	getEl("match_INSTRUCT").innerHTML = "Round " + (data.round + 1) + " Final Times";
	getEl("match_INSTRUCT3").innerHTML = "Overall Points Ranking";
	competeTimes(data, true);
	competePoints(data);
	if (data.data.leader == socket.id || data.round >= competedata.data.dims.length - 1) {
		setDisplay("block", ["continuematch"]);
		setDisplay("none", ["waitingmatch"]);
	} else {
		setDisplay("block", ["waitingmatch"]);
	}
	CONTINUEMATCH.html(data.round < competedata.data.dims.length - 1 ? "Next Round" : "Final Tally")
});

function continueMatch() {
	setDisplay("none", ["continuematch"]);
	setDisplay("inline", ["giveup"]);
	if (competedata.round < competedata.data.dims.length - 1) {
		console.log("emitting")
		socket.emit("next-round", room);
	} else {
		setDisplay("none", ["in_match", "keymap"]);
		setDisplay("none", ["in_match", "keymap"]);
		SCRAM.value("Normal");
		var elements = document.getElementsByClassName('normal');
		for (var i = 0; i < elements.length; i++) {
			elements[i].style.display = 'none';
		}
		canMan = true;
		let myrank = competePoints(competedata, "final_points");
		getEl("match_rank").innerHTML = `You ranked #${myrank}. Good job!`;
		setDisplay("block", ["final_tally"]);
		
		let minarr = [];
		competedata.solvedarr.forEach((timeobj) => {
			let min = DNF;
			let minvalue = "DNF";
			for (let id in timeobj) {
				let res = timeobj[id];
				if (res == "DNF") {
					res = DNF;
				}
				if (res < min) {
					min = res;
					minvalue = res;
				}
			}
			minarr.push(minvalue);
		});
		
		console.log("YEE", minarr);
		
		let str = `<table style="border-collapse: collapse; width: auto; border: none;">`;
		str += `<tr><th style="text-align: center; white-space: nowrap; padding: 0 10px;">Name</th>`;
		competedata.solvedarr.forEach((_, i) => {
			str += `<th style="text-align: center; white-space: nowrap; padding: 0 10px;">r${i + 1}</th>`;
		});
		str += `</tr>`;
		
		compete_alltimes.forEach((arr) => {
			let nameStyle = arr[1] == socket.id ? "color: blue; font-family: Courier" : "";
			str += `<tr><td style="text-align: center; white-space: nowrap; padding: 0 10px;"><span style="${nameStyle}">${arr[0]}) ${competedata.names[arr[1]]}</span></td>`;
			
			competedata.solvedarr.forEach((timeobj, i) => {
				let timeStyle = minarr[i] == timeobj[arr[1]] ? "color: green;" : "";
				str += `<td style="text-align: center; white-space: nowrap; padding: 0 10px;"><span style="${timeStyle}">${timeobj[arr[1]]}</span></td>`;
			});
			str += `</tr>`;
		});
		
		str += `</table>`;
		
		getEl("final_times").innerHTML = str;

	
	}
}
function competeSettings(num = compete_type) {
    compete_type = num;
    getEl("com_1v1_div").style.display = num == "1v1" ? "block" : "none";
    getEl("com_group_div").style.display = num == "1v1" ? "none" : "block";
	console.log(num);
    COMPETE_1V1.style("backgroundColor", num == "1v1" ? "#00488F" : "");
    COMPETE_GROUP.style("backgroundColor", num != "1v1" ? "#00488F" : "");
    getEl("finish_match").style.display = "block";

    let container = document.getElementById(num == "1v1" ? "1v1_container" : "group_container");
    container.innerHTML = "";
    container.style.display = "block";

    const createEl = (tag, text = "", styles = {}) => {
        let el = document.createElement(tag);
        if (text) el.textContent = text;
        Object.assign(el.style, styles);
        return el;
    };

    const flexRow = { display: "flex", width: "400px", gap: "10px", alignItems: "center", marginBottom: "10px" };

    let rows = [];

    if (num == "1v1") {
        let headerRow = createEl("div", "", flexRow);
        headerRow.append(
            createEl("span", "", { width: "80px" }), 
            createEl("span", "You", { flex: "1", textAlign: "left" }), 
            createEl("span", "Opponent", { flex: "1", textAlign: "left" }),
            createEl("span", "", { width: "120px" }) // Extra column
        );
        container.appendChild(headerRow);
    }

	const alldims = ["3x3", "2x2",  "1x2x3", "1x3x3", "2x2x3", "2x2x4", "3x3x2", "3x3x4", "3x3x5"];
    for (let i = 0; i < getEl("compete_rounds").value; i++) {
        let row = createEl("div", "", flexRow);
        let label = createEl("span", `Round ${i + 1}`, { width: "80px" });
        let select1 = createEl("select", "", { flex: "1" });
       	alldims.forEach(text => select1.appendChild(createEl("option", text)));
        row.append(label, select1);
        
        let select2 = null;
        if (num == "1v1") {
            select2 = createEl("select", "", { flex: "1" });
            alldims.forEach(text => select2.appendChild(createEl("option", text)));
            row.append(select2);
        }
        
        let extraColumn = createEl("span", "", { width: "120px" });
        if (i === 0) {
            let applyButton = document.createElement("button");
            applyButton.textContent = "Apply row to all";
            applyButton.classList.add("btn", "btn-secondary");
            applyButton.style.marginLeft = "10px";
			applyButton.style.fontSize = "14px";
            applyButton.onclick = () => {
                for (let j = 1; j < rows.length; j++) {
                    rows[j].select1.value = rows[0].select1.value;
                    if (num == "1v1" && rows[j].select2) {
                        rows[j].select2.value = rows[0].select2.value;
                    }
                }
            };
            extraColumn.appendChild(applyButton);
        }
        row.append(extraColumn);
        
        container.appendChild(row);
        rows.push({ select1, select2 });
    }
}

function getSelectedValues(containerId, rows, cols) {
    let container = document.getElementById(containerId);
    let selects = container.getElementsByTagName("select");
    let result = [];

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            rowData.push(selects[i * cols + j].value);
        }
        result.push(rowData);
    }

    return result;
}

function competeDims() {
	let a = []
	if (compete_type == "1v1") a = getSelectedValues("1v1_container", getEl("compete_rounds").value, 2);
	else a = getSelectedValues("group_container", getEl("compete_rounds").value, 1);
	return a;
}


document.getElementById("challenge").onclick = challengemode;
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.blur();
    });
});
function challengemode() {
	modeData("challenge");
	if(MODE != "normal" && MODE != "cube" && MODE != "timed")
	{
		ao5 = [];
		mo5 = [];
		movesarr = [];
		scrambles = [];
	}
	regular(true);
	MODE = "challenge";
	refreshButtons();
	setDisplay("none", ["test_alg_div", "ID1", "input", "scram", "challengeback", "settings", "timeselect","type3"]);
	setDisplay("block", ["c_INSTRUCT", "c_week", "c_start", "cd", "c_desc2"]);
	document.getElementById('c_start').scrollIntoView({ behavior: 'smooth', block: "center" });
	SCRAM.value("Normal");
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	cstep = 0;
	dstep = false;
	document.getElementById('c_title').innerHTML = "Weekly Challenge";
	document.getElementById('c_desc').innerHTML = "You have <b>unlimited</b> attempts to solve the weekly scramble. There are 15 seconds of inspection time.";
	document.getElementById('c_desc2').innerHTML = "Scores are reset every Sunday.";
	document.getElementById('cd_title').innerHTML = "Daily Scramble";
	if (localStorage.cdate2 == sinceNov3()) {
		document.getElementById('cd_desc').innerHTML = "Today, you achieved a score of <b>" + localStorage.c_today + "</b> in the Daily 3x3. Come back tomorow for another attempt!";
		document.getElementById('cd_start').style.display = "none";
	} else {
		document.getElementById('cd_desc').innerHTML = "You have <b>1</b> attempt to solve the daily 3x3 scramble. There are 15 seconds of inspection time.";
		document.getElementById('cd_start').style.display = "block";
	}
	if (localStorage.cdate3 == sinceNov3()) {
		document.getElementById('cd2_desc').innerHTML = "Today, you achieved a score of <b>" + localStorage.c_today2 + "</b> in the Daily 2x2. Come back tomorow for another attempt!";
		document.getElementById('cd2_start').style.display = "none";
	} else {
		document.getElementById('cd2_desc').innerHTML = "You have <b>1</b> attempt to solve the daily 2x2 scramble. There are 15 seconds of inspection time.";
		document.getElementById('cd2_start').style.display = "block";
	}
}
function dailychallenge(cube) {
	if (localStorage.cdate3 == sinceNov3('d') && cube == 2) return;
	if (localStorage.cdate2 == sinceNov3('d') && cube == 3) return;
	DIM2 = cube == 3 ? 50 : 100;
	DIM = DIM2;
	reSetup();
	shuffleCube();
	timer.stop();
	timer.reset();
	MODE = "daily";
	// special[2] = savesetup;
	quickSolve();
	cstep = 1;
	setDisplay("none", ["c_INSTRUCT", "c_week"]);
	if (!isMobile()) setDisplay("table", ["keymap"]);
	setDisplay("inline", ["undo", "redo", "reset3_div",  "speed", "slider_div", "outertime"]);
	setDisplay("block", ["input"]);
	waitStopTurning();
	dstep = true;
	if (cube == 3) {
		localStorage.cdate2 = sinceNov3('d');
		localStorage.c_today = "DNF";
	} else {
		localStorage.cdate3 = sinceNov3('d');
		localStorage.c_today2 = "DNF";
	}
}
function blindmode() {
	if (bstep == 0) {
		peeks = 0;
		bstep = 1;
		setInput();
		setDisplay("none", ["s_easy", "s_medium", "m_34", "m_4", "m_high", "s_OLL", "s_PLL", "s_bot", "s_high", "s_RACE",
			 "highscore", "s_prac", "s_prac2","blind","b_win","b_start","marathon","ma_buttons"]);
		setDisplay("inline", ["input", "speed", "slider_div", "undo", "redo","reset2_div"]);
		setDisplay("block", ["input", "peeks"]);
		setInnerHTML(["s_INSTRUCT", "s_instruct", "s_instruct2", "s_difficulty"]);
		getEl("times_desc").innerHTML = "Times:";
		reSetup();
		shuffleCube();
		waitStopTurning(false);
	} else if (bstep == 3) {
		setDisplay("none", ["overlay", "keymap", "slider_div", "speed"]);
		setDisplay("block", ["b_win", "b_start","m_high"]);
		getEl("b_win").innerHTML = "You did it! You solved the cube in " + peeks + " peek" + (peeks == 1 ? "." : "s. <br> Play again?");
		setScore("blind" + (DIM == 50 ? "3x3" : "2x2"), peeks);
	}
}
function showMarathon() {
	setDisplay("none", ["s_easy", "s_medium", "m_34", "m_4", "m_high", "s_OLL", "s_PLL", "s_bot", "s_high", "s_RACE",
		"highscore", "s_prac", "s_prac2","blind","b_win","b_start","marathon","ma_buttons"]);
	setDisplay("inline", ["speed", "slider_div", "undo", "redo", "reset2_div"]);
	setDisplay("table", ["keymap"]);
	setDisplay("block", ["times_par", "outertime", "marathon2"]);
	setInnerHTML(["s_INSTRUCT", "s_instruct", "s_instruct2", "s_difficulty"]);
	if (ma_data.type == "blind") {
		setDisplay("block", ["peeks","times_par"]);
		setDisplay("none", ["outertime"]);
		getEl("times_desc").innerHTML = "Peeks:";
	} else {
		getEl("times_desc").innerHTML = "Times:";
	}
}
function startMarathon(type) {
	reSetup();
	ma_data.type = type;
	if (type == "shape" || type == "blind") {
		ma_data.dims = [changeFive, change19, changeFour, change10, changeSix, changeSeven, change8, change17];
		ma_data.cubes = ["3x3x2", "2x2x3", "1x3x3", "Jank 2x2", "Plus Cube", "Christmas 3x3", "Christmas 2x2", "Sandwich Cube"];
	} else if (type == "bandage") {
		ma_data.dims = [change18.bind(null, 14, [[3,4,6,7,12,13,15,16]]), 
		change11.bind(null, 7, [[3,4,5,6,7,8]]), 
		change14.bind(null, 10, [[6,8]]), 
		change20.bind(null, 16, [[0,1], [24,25]]), 
		change12.bind(null, 8, [[0,3,6], [2,5,8]]), 
		change13.bind(null, 9, [[7,8,5,4],[16,15,12],[25,26,23,22]]), 
		change15.bind(null, 11, [[0,9], [20,11], [24,15], [8,17]]), 
		change16.bind(null, 12, [[0,9], [2,11], [24,15], [26,17]])];
		ma_data.cubes = ["Cube Bandage", "Slice Bandage", "Bandaged 2x2", "Bandaged 3x3x2", "Pillars", "Triple Quad", "Z Perm", "T perm"];
	}
	mastep = 0;
	shapemarathon();
}
function shapemarathon() { 
	if (mastep == 0) {
		showMarathon();
		ao5 = [];
	}
	if (mastep % 2 == 0 && mastep / 2 < ma_data.dims.length) {
		getEl("ma_cube").innerHTML = "Cube " + (mastep / 2 + 1) + " of " + ma_data.dims.length;
		getEl("ma_small").innerHTML = "Solve the " + ma_data.cubes[mastep / 2] + (ma_data.type == "blind" ? " with the fewest peeks.": ".");
		ma_data.dims[mastep / 2]();
		shuffleCube();
		waitStopTurning(false, ma_data.type);
		toggleOverlay(false, false);

	}
	if (mastep / 2 == ma_data.dims.length) {
		setDisplay("none", ["overlay", "keymap", "slider_div", "speed", "peeks"]);
		setDisplay("block", ["m_high"]);
		let score = ao5.reduce((acc, curr) => acc + curr, 0).toFixed(2);
		getEl("ma_cube").innerHTML = "Marathon Complete! Your score: " + score + (ma_data.type == "blind" ? (peeks == 1 ? " peek" : " peeks") : "");
		getEl("ma_small").innerHTML = "Play again?";
		if (ma_data.type == "blind") {
			setDisplay("block", ["b_start"]);
		} else {
			setDisplay("block", ["ma_buttons"]);
		}
		const map = {shape:"marathon", bandage:"marathon2", blind: "marathon3"};
		setScore(map[ma_data.type], score, true);
	}
}
function waitStopTurning(timed = true, mode = "wtev") {
	const interval = setInterval(() => {
	console.log("canMan?" + canMan)
	  if (canMan) {
		clearInterval(interval); // Stop the interval when the cube stops animating
		if (timed) {
			timer.setTime(-15000); // Set the timer to -15000
			timer.start(true);      // Start the timer
		}
		if (bstep == 1) bstep = 2;
		if (comstep > 0 && comstep % 2 == 1) {
			comstep++;
			fadeInText(1, "Go!", "green", "go!");
			setTimeout(() => {fadeInText(0, "Go!", "green", "go!")}, 600);
		}
		console.log("CHANGING COMPSTEP", comstep);
		if (getEl("marathon2").style.display == "block" && (mode == "shape" || mode == "bandage" || mode == "blind")) mastep++;
		if (!nosavesetupdim.includes(DIM) && comstep == 0) {
			const interval2 = setInterval(() => {
				savesetup = IDtoReal(IDtoLayout(decode(getID())));
				special[2] = savesetup;
				savebandage = mapBandaged();
				if (timer.getTime() > 0 || isAnimating() || (bstep == 0 && cstep == 0 && mastep == 0)) {
					clearInterval(interval2); 
				}
			}, 10);
		} 
	  }
	}, 10);
  }

function mapCuby() {
	let map = {};
	for (let i = 0; i < SIZE * SIZE * SIZE; ++i) {
		map[i] = (CUBE[i].z + MAXX) / 50;
		map[i] += SIZE * (CUBE[i].y + MAXX) / 50;
		map[i] += SIZE * SIZE * (CUBE[i].x + MAXX) / 50;
	}
	return map;
}
function mapBandaged() {
	let copyban = bandaged.map(innerArray => [...innerArray]);
	for (let i = 0; i < bandaged.length; ++i) {
		for (let j = 0; j < bandaged[i].length; ++j) {
			copyban[i][j] = mapCuby()[bandaged[i][j]];
		}
	}
	return copyban;
}
function startchallenge() {
	const cubemap = {3 : 50, 2: 100, 4 : 2, 5 : 15};
	DIM2 = cubemap[weeklyscrambles[week].cube];
	DIM = DIM2;
	changeCam(weeklyscrambles[week].cube);
	if (weeklyscrambles[week].hasOwnProperty("bandaged")) {
		bandaged = weeklyscrambles[week].bandaged;
	}
	savebandage = bandaged;
	refreshButtons();
	CUBE4.style('background-color', "#8ef5ee");
	reSetup();
	timer.stop();
	timer.reset();
	MODE = "weekly";
	timer.setTime(-15000);
	timer.start(true);
	savesetup = IDtoReal(IDtoLayout(decode(weeklyscrambles[week].scramble)));
	special[2] = savesetup;
	quickSolve();
	setInput();
	cstep = 1;
	setDisplay("none", ["c_INSTRUCT", "c_week"]);
	setDisplay("inline", ["undo", "redo", "reset3_div",  "speed", "slider_div", "outertime"]);
	setDisplay("block", ["input"]);
	if ([2,15].includes(DIM2)) {
		INPUT.value("3x3x2");
		SCRAM.value("3x3x2");
		INPUT.attribute('disabled', true);
	}
}
function endchallenge(passed = true) {
	cstep = 0;
	setDisplay("none", ["test_alg_div"]);
	setDisplay("block", ["c_INSTRUCT", "c_week"]);
	
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	if (passed) {
		if (!dstep) {
			setScore("c_week", timeInSeconds);
		} else {
			if (DIM == 50) {
				setScore("c_day", timeInSeconds);
				localStorage.c_today = timeInSeconds;
			} else {
				setScore("c_day2", timeInSeconds);
				localStorage.c_today2 = timeInSeconds;
			}
		}
		document.getElementById('c_title').innerHTML = "Good Job!";
		document.getElementById('c_desc').innerHTML = "You got the scramble in " + timeInSeconds + " seconds!";
	} else {
		fadeInText(1, "DNF");
		setTimeout(() => {fadeInText(0, "DNF")}, 400);
		document.getElementById('c_title').innerHTML = "DNF (Did not finish)";
		document.getElementById('c_desc').innerHTML = "You exceeded the inspection time limit of 15 seconds.";
	}
	document.getElementById('c_desc2').innerHTML = "Try again?";
	if (dstep) {
		setDisplay("none", ["c_start", "cd", "c_desc2"]);
		setDisplay("block", ["challengeback"]);
	}
	dstep = false;
}
function toggleOverlay(show, p = true) {
	if (show) {
		setDisplay("block", ["overlay"]);
	} else {
		setDisplay("none", ["overlay"]);
		if (p) peeks++;
	}
	getEl("wannapeek").style.display = getEl("overlay").style.display;
	getEl("peekbutton").style.display = getEl("overlay").style.display;
	getEl("overlay").style.backgroundColor = BACKGROUND_COLOR;
}
function fullScreen(isfull) {
	if (document.getElementById("cnv_div").style.display == "none") return;
	if (isfull) {
		document.getElementById("cnv_div").className = "col-xl-12 noselect";
		document.getElementById("right").style.display = "none";
		document.getElementById("left").style.display = "none";
		FULLSCREEN.class("bi bi-fullscreen-exit");
	} else {
		document.getElementById("cnv_div").className = "col-xl-6 noselect";
		document.getElementById("left").style.display = "block";
		document.getElementById("right").style.display = "block";
		FULLSCREEN.class("bi bi-arrows-fullscreen");
	}
	fullscreen = isfull;
	resized();
}
function halfScreen(isfull) {
	if (isfull) {
		document.getElementById("cnv_div").className = "col-xl-8 noselect";
		document.getElementById("right").className = "col-xl-4 noselect";
		document.getElementById("left").style.display = "none";
		FULLSCREEN.class("bi bi-fullscreen-exit");
	} else {
		document.getElementById("cnv_div").className = "col-xl-6 noselect";
		document.getElementById("left").className = "col-xl-2 noselect";
		document.getElementById("right").className = "col-xl-4 noselect";
		setDisplay("block", ["right", "left"])
		FULLSCREEN.class("bi bi-arrows-fullscreen");
	}
	fullscreen = isfull;
	resized();
}
async function fadeInText(o, text, color = "red", el = "dnf") {
	const dnfElement = document.getElementById(el);
	dnfElement.style.display='block';
	dnfElement.innerHTML = text;
	dnfElement.style.color = color;
	dnfElement.style.opacity = o;
}

document.getElementById("account").onclick = accountmode;
function accountmode() {
	modeData("accountmode");
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
	setDisplay("none", ["test_alg_div", "timeselect"]);
	setDisplay("block", ["loginform"]);
	
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
}
document.getElementById("login").onclick = loginmode;
document.getElementById("l_link").onclick = () => MODE == "account" ? loginmode() : accountmode();
function loginmode() {
	modeData("loginmode");
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
	setDisplay("none", ["test_alg_div", "timeselect"]);
	setDisplay("block", ["loginform"]);
	
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
}
function hotkeymode() {
	MODE = "hotkey";
	setDisplay("none", ["settings1"]);
	setDisplay("block", ["hotkey1"]);
}
function settingsmode()
{
	if(document.getElementById("settings1").style.display == "block"){
		regular();
		return;
	}
	DIM = DIM2;
	reSetup();
	stopMoving();
	fullScreen(false);
	//quickSolve();
	refreshButtons();
	REGULAR.style('background-color', '#10caf0');
	SETTINGS.style('background-color: transparent; color: " + document.body.style.color')
	setDisplay("none", ["shuffle_div", "reset_div", "solve", "input", "input2", "test_alg_div", "hotkey1", "scram", "timeselect", "ID1"]);
	setDisplay("block", ["settings1"]);
	setInnerHTML(["s_instruct2", "s_RACE3"]);
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	document.getElementById('settings1').scrollIntoView({ behavior: 'smooth' });

}
function speedmode()
{
	regular(true);
	DELAY_SLIDER.value(0);
	DELAY = 0;
	canMan = false;
	MODE = MINIMODE = "speed";
	DIM = DIM2;
	reSetup();
	saveao5 = [ao5, mo5, scrambles, movesarr];
	ao5 = [];
	mo5 = [];
	scrambles = [];
	movesarr = [];
	document.getElementById('s_INSTRUCT').scrollIntoView({ behavior: 'smooth', block: "end" });
	refreshButtons();
	SPEEDMODE.style('background-color', '#8ef5ee');
	setDisplay("none", ["test_alg_div", "shuffle_div", "ID1", "settings", "reset_div", "solve", "input", "input2", "scram", "s_RACE2", "timeselect","s_start"]);
	setDisplay("inline", ["s_easy", "s_OLL", "s_PLL"]);
	setDisplay("block", ["s_bot", "s_high", "s_RACE", "s_prac"]);

	document.getElementById("s_instruct2").innerHTML = "";
	document.getElementById("s_RACE3").innerHTML = "";
	document.getElementById("s_INSTRUCT").innerHTML = DIM == 50 ? "3x3 Time Attack" : "2x2 Time Attack";
	document.getElementById("s_speedtitle").innerHTML = DIM == 50 ? "3x3 Speed Practice" : "2x2 Speed Practice";
	document.getElementById("s_bottitle").innerHTML = DIM == 50 ? "3x3 Bot Race" : "2x2 Bot Race";
	document.getElementById("s_instruct").innerHTML = "Complete <b>4</b> challenges, as fast as possible!<br>Select Difficulty/Mode";
	document.getElementById("s_difficulty").innerHTML = "";
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	if(DIM == 50) document.getElementById("s_medium").style.display = "inline";
	easystep = 0;
	medstep = 0;
	ollstep = 0;
	pllstep = 0;
	pllpracstep = 0;
	if(DIM == 50) {
		PLL.html("PLL Attack");
		PLLPRAC.html("PLL Practice");
	}
	else {
		PLL.html("PBL Attack");
		PLLPRAC.html("PBL Practice");
	}
	INPUT.selected("Normal");
	VOLUME.position(cnv_div.offsetWidth-(document.getElementById("settings").style.display == "none"? 60 : 130), 5);
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
	peeks = 0;
	scrambles = [];
	movesarr = [];

	refreshButtons();
	MOVESMODE.style('background-color', '#8ef5ee');

	if (DIM2 != 50 && DIM2 != 100) {
		startCube() 
	}
	setDisplay("none", ["test_alg_div", "shuffle_div", "reset_div", "ID1", "settings", 
		"solve", "input", "input2", "scram", "timeselect"]);
	setDisplay("inline", ["m_34", "m_4"]);
	setDisplay("block", ["m_high", "blind","b_start","marathon","ma_buttons"]);

	document.getElementById('s_INSTRUCT').scrollIntoView({ behavior: 'smooth', block: "center" });
	document.getElementById("s_INSTRUCT").innerHTML = DIM == 50 ? "3x3 Fewest Moves Challenge" : "2x2 Fewest Moves Challenge";
	document.getElementById("b_INSTRUCT").innerHTML = DIM == 50 ? "3x3 Blind Challenge" : "2x2 Blind Challenge";
	document.getElementById("s_instruct").innerHTML = "Solve the cube in the <b>most optimal way</b>.";
	document.getElementById("s_difficulty").innerHTML = "";
	var elements = document.getElementsByClassName('normal');
	for(var i=0; i<elements.length; i++) { 
		elements[i].style.display='none';
	}
	m_34step = 0;
	m_4step = 0;
	bstep = 0;
	mastep = 0;
	INPUT.selected("Normal");
	VOLUME.position(cnv_div.offsetWidth-(document.getElementById("settings").style.display == "none"? 60 : 130), 5);
	modeData("moves");
}
function setSettings(obj) {
	SPEED_SLIDER.value(obj.speed);
	SPEED = obj.speed;
	audioon = (obj.audioon == 1);
	localStorage.audioon = (obj.audioon == 1);
	KEYBOARD.value(obj.keyboard);
	TOPWHITE.selected(obj.topwhite);
	TOPPLL.selected(obj.toppll);
	HOLLOW.checked(obj.hollow == 1);
	let d = obj.background;
	localStorage.background = d;
	if (obj.bandaged3 && obj.bandaged3 != "null") {
		localStorage.bandaged3 = obj.bandaged3;
		bandaged3 = JSON.parse(localStorage.bandaged3);
	}
	console.log("d is " + d)
	let temp = d.split(' ');
	setColors(temp[0], temp[1], temp[2], temp.length > 3 ? temp[3] : "#000000");
	topWhite();
	changeKeys();
	refreshButtons();
	hollowCube();
	if (obj.border_width != -1) {
		special[1] = obj.border_width;
		BORDER_SLIDER.value(obj.border_width);
	}
	if (obj.m_34 != "none") localStorage.m_34 = obj.m_34;
	else localStorage.removeItem("m_34")
	if (obj.m_4 != "none") localStorage.m_4 = obj.m_4;
	else localStorage.removeItem("m_4")
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
	moves = 0;
	canMan = false;
	document.getElementById("s_difficulty").innerHTML = "";
	setDisplay("none", ["s_easy", "s_medium", "m_34", "m_4", "m_high", "s_OLL", "s_PLL", "s_bot", "s_high", "s_RACE", 
		"highscore", "s_prac", "s_prac2","blind", "b_start", "marathon","ma_buttons"]);
	setDisplay("inline", ["input", "speed", "slider_div", "undo", "redo"]);
	getEl("times_desc").innerHTML = "Times:";

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
		setDisplay("block", ["divider"]);
	}
}
function reCam()
{
	ZOOMADD = DIM == "1x2x3" ? 20 : DIM == "2x3x4" ? 60 : DIM == "1x4x4" ? 100 : DIM == "3x3x4" ? 60 : DIM == "3x3x5" ? 120 : DIM == "2x2x4" ? 50 :
				SIZE >= 5 ? 180 : SIZE == 4 ? 100 : DIM2 == 100 ? 140 : 0;
	CAM = p.createEasyCam(p._renderer);
	CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
	CAM.zoom(CAMZOOM + ZOOMADD);
	rotateIt();
}
function updateScores() {
	let modes = ["easy", "medium", "oll", "pll"];
	let display = {easy: "Easy", medium: "Medium", oll: "OLL", pll: "PLL"};
	if (DIM == 50) {
		// speedmode scores
		modes.forEach((mode) => {
			const score = localStorage[mode];
			if (score != null && score != -1) {
				document.getElementById("s_" + mode + "score").innerHTML = display[mode] +  ": " + score;
			} else {
				document.getElementById("s_" + mode + "score").innerHTML = display[mode] +  ": " + "N/A";
			}
		})
		document.getElementById("s_pllscore").style.display = "block";
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
	// movesmode scores
	modes = ["m_easy", "m_medium", "c_week", "c_day", "c_day2", "c_day_bweek", "c_day2_bweek", "blind2x2", "blind3x3", "marathon","marathon2","marathon3"];
	display = {m_easy: "3-5 Movers", m_medium: "Medium", c_week: "Weekly #" + (week+1) +  "", c_day2: "Daily 2x2 all time"
		, c_day: "Daily 3x3 all time", c_day_bweek : "Daily 3x3 this week", c_day2_bweek : "Daily 2x2 this week", 
			blind2x2 : "Blind 2x2", blind3x3: "Blind 3x3", marathon: "Shape Marathon", marathon2: "Bandage Marathon", marathon3: "Blind Marathon"};
	modes.forEach((mode) => {
		const score  = localStorage[mode];
		if (mode.includes("bweek") && score && JSON.parse(score) != null && score != -1 && score != "null" && JSON.parse(score).score != "null" && JSON.parse(score).week == week) {
			document.getElementById(mode + "score").innerHTML = display[mode] +  ": " + JSON.parse(score).score;
		} else if (!mode.includes("bweek") && score != null && score != -1 && !(mode == "c_week" && localStorage.cdate != week)) {
			document.getElementById(mode + "score").innerHTML = display[mode] +  ": " + score;
		} else {
			document.getElementById(mode + "score").innerHTML = display[mode] +  ": " + "N/A";
		}
	})
}
function setScore(mode, total, getlow = true) {
	const highscores = localStorage[mode];
	console.log("In setscore ", mode, total, localStorage[mode], !highscores);
	const chalday = {"c_week" : "cdate", "c_day" : "cdate2", "c_day2" : "cdate3"}
	if (!highscores || highscores == -1 || (MODE == "speed" && total < highscores) || 
	(MODE == "moves" && (total > highscores && !getlow) || (total < highscores && getlow))
	|| (["weekly", "daily"].includes(MODE) && (localStorage[chalday[mode]] != (mode == "c_week" ? week : sinceNov3('d')) || total < highscores))) {
		if (localStorage.username != "signedout")
			document.getElementById("highscore").style.display = "block";
			localStorage[mode] = total;
		if (["weekly", "daily"].includes(MODE)) {
			localStorage[chalday[mode]] = (mode == "c_week" ? week : sinceNov3('d'));
		}
		updateScores();
	}
	if (["c_day", "c_day2"].includes(mode)) {
		if (!localStorage[mode + "_bweek"] || localStorage[mode + "_bweek"] == "null" || 
			JSON.parse(localStorage[mode + "_bweek"]).week != week || total < JSON.parse(localStorage[mode + "_bweek"]).score) {
			document.getElementById("highscore").style.display = "block";
			localStorage[mode + "_bweek"] = JSON.stringify({week: week, score: total});
			updateScores();
		}
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
		setDisplay("none", ["s_image"]);
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
		pllpracstep = 0;
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
		document.getElementById("s_instruct").innerHTML = "Use your beginner last layer techniques to solve it! <p style = 'font-size:15px;'>Suggested algorithm with unsolved layer in the top: <br>" + sugalg[rnd2] +  " </p>";
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
function togglePLL(action, arr) {
	const parent = pracmode == "OLL" ? (DIM == 100 ? ["9"] : ["5","6","7","8"]) : DIM == 100 ? ["4"] : [1,2,3];
	if (action == "all") {
		PLLS.forEach(el => {el.checked(true)})
	} else if (action == "none") {
		PLLS.forEach(el => {el.checked(false)});
	} else {
		PLLS.forEach(el => {
			if (parent.some(item => item == el.elt.parentElement.id.substring(10))) {
				el.checked(action == "check");
			}
		});
	}
}
function selectPLL(mode) {
	MINIMODE = mode;
	pracmode = mode;
	moves = 0;
	setDisplay("none", ["s_easy", "s_medium", "m_34", "m_4", "m_high", "s_OLL", "s_PLL", "s_bot", "s_high", "s_RACE", "highscore", "s_prac"]);
	setDisplay("inline", ["s_prac2"]);
	getEl("s_plltitle").innerHTML = mode == "OLL" ? "Select OLL Algorithms" : DIM == 50 ? "Select PLL Algorithms" : "Select PBL Algorithms" 
	setInnerHTML(["s_INSTRUCT", "s_instruct", "s_instruct2", "s_RACE3", "s_difficulty", "l_message"]);
	setDisplay(DIM == 100 && mode == "PLL"? "block": "none", ["s_prac2x2"]);
	setDisplay(DIM == 50 && mode == "PLL"? "block": "none", ["s_prac3x3"]);
	setDisplay(DIM == 50 && mode == "OLL"? "block": "none", ["s_prac3x3o"]);
	setDisplay(DIM == 100 && mode == "OLL"? "block": "none", ["s_prac2x2o"]);
	if (mode == "OLL" && DIM == 50) {
		document.getElementById("cnv_div").style.display = "none";
		document.getElementById("right").className = "col-xl-10 noselect";
		canMan = false;
		// document.getElementById("left").style.display = "block";
		// document.getElementById("right").style.display = "block";
	}
}
function practicePLL() {
	undo = [];
	redo = [];
	MINIMODE = "pracPLL";
	if(pllpracstep % 2 == 0)
	{
		timer.reset();
		if(pllpracstep == 0) {
			document.getElementById("cnv_div").style.display = "block";
			fullScreen(false);
			document.getElementById("right").className = "col-xl-4 noselect";
			reCam();
			resized();
			ao5 = [];
			mo5 = [];
		}
		quickSolve();
		document.getElementById("s_INSTRUCT").innerHTML = "Suggested Algorithm";
		showSpeed();
		setDisplay("block", ["moves_par", "outermoves"]);
		timer.stop();
		timer.reset();
		let rnd = p.random(pracalgs);
		let str = "";
		let tempobj = pracmode == "OLL" ? olls : DIM == 50 ? obj2 : pbls;
		changeArr(tempobj[rnd][1])
		str = tempobj[rnd][0];
		document.getElementById("s_instruct").innerHTML = "<p style = 'font-size:15px;'>" + str + "</p>";
		getEl("s_image").src = `images/${pracmode == "OLL" ? "OLL" : DIM == 50 ? "PLL" : "PBL"}/${rnd}.png`;
		setDisplay("block", ["s_image"]);
		shufflespeed = 2;
		let rnd2 = Math.floor(Math.random()*4);
		for(let i = 0; i < rnd2; i++)
		{
			arr.push("U");
		}
		multipleEasy(0, 6);
	}

}
function speedPLL()
{
	MINIMODE = "PLL";
	if(TOPPLL.value() == "Opposite of above" && (["PLL", "OLL", "pracPLL"].includes(MINIMODE)))
		realtop = opposite[TOPWHITE.value()[0].toLowerCase()];
	else
		realtop = TOPWHITE.value()[0].toLowerCase();
	special[2] = IDtoReal(IDtoLayout(decode(colorvalues[realtop])));
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
			possible = ["AD", "DD", "AU", "AA", "DU"];
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
		document.getElementById("s_instruct").innerHTML = "<p style = 'font-size:15px;'>Suggested algorithm with unsolved layer in the top: <br>" + str +  " </p>";
		getEl("s_image").src = `images/${DIM == 50 ? "PLL" : "PBL"}/${rnd}.png`;
		setDisplay("block", ["s_image"]);
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
	MINIMODE = "OLL";
	if(TOPPLL.value() == "Opposite of above" && (["PLL", "OLL", "pracPLL"].includes(MINIMODE)))
		realtop = opposite[TOPWHITE.value()[0].toLowerCase()];
	else
		realtop = TOPWHITE.value()[0].toLowerCase();
	special[2] = IDtoReal(IDtoLayout(decode(colorvalues[realtop])));
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
		let possible = allplls[9];
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
		document.getElementById("s_instruct").innerHTML = "<p style = 'font-size:15px;'>Suggested algorithm with unsolved layer in the top: <br>" + str +  " </p>";
		getEl("s_image").src = `images/OLL/${rnd}.png`;
		setDisplay("block", ["s_image"]);
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
document.getElementById("savedata").onclick = () => saveData(localStorage.username, null, "POST", true);
document.getElementById("savedata2").onclick = () => saveData(localStorage.username, null, "POST", true);
async function saveData(username, password, method, al) {
	if (document.getElementById("logindesc").innerHTML == "")
		document.getElementById("logindesc").innerHTML = "Saving data...";
	const data = {
		username: username,
		password: password ?? "bruh",
		data: "random",
		c_day: localStorage.c_day ?? -1,
		c_day2: localStorage.c_day2 ?? -1,
		c_today: localStorage.c_today ?? -1,
		c_today2: localStorage.c_today2 ?? -1,
		c_week: localStorage.c_week ?? -1,
		cdate: localStorage.cdate ?? -1,
		cdate2: localStorage.cdate2 ?? -1,
		cdate3: localStorage.cdate3 ?? -1,
		easy: localStorage.easy ?? -1,
		medium: localStorage.medium ?? -1,
		oll: localStorage.oll ?? -1,
		pll: localStorage.pll ?? -1,
		easy2: localStorage.easy2 ?? -1,
		oll2: localStorage.oll2 ?? -1,
		pbl2: localStorage.pbl2 ?? -1,
		m_easy: localStorage.m_easy ?? -1,
		m_medium:localStorage.m_medium ?? -1,
		audioon:localStorage.audioon == 'true' ? 1 : 0,
		background:localStorage.background,
		hollow: localStorage.hollow == 'true' ? 1 : 0,
		keyboard:localStorage.keyboard,
		speed:localStorage.speed,
		toppll:localStorage.toppll,
		topwhite:localStorage.topwhite,
		m_34: localStorage.m_34 ?? "none",
		m_4: localStorage.m_4 ?? "none",
		c_day_bweek: localStorage.c_day_bweek ?? "null",
		c_day2_bweek: localStorage.c_day2_bweek ?? "null",
		border_width:localStorage.border_width ?? -1,
		blind2x2:localStorage.blind2x2 ?? -1,
		blind3x3:localStorage.blind3x3 ?? -1,
		marathon:localStorage.marathon ?? -1,
		marathon2:localStorage.marathon2 ?? -1,
		marathon3:localStorage.marathon3 ?? -1,
		bandaged3: localStorage.bandaged3 ?? "null",
	};
	console.log(data);
	await repeatUntilSuccess(() => putUsers(data, method));
	successSQL("Data saved");
	document.getElementById("highscore").style.display = "none";
}


  async function repeatUntilSuccess(callFunction){
	let obj = null;
	let time = -100;
	return new Promise((resolve, reject) => {
		const intervalId = setInterval(async () => {
			time += 100;
			if (obj == null && time % 5000 == 0) {
				console.log("Call #" + (time / 5000 + 1));
				obj = await callFunction();
			} else if (obj != null){
				clearInterval(intervalId);
				resolve(obj);
			}
		}, 100);
	});
  }

document.getElementById("loaddata").onclick = () => loadData(true);
async function loadData(times) {
	if (document.getElementById("logindesc").innerHTML == "") {
		document.getElementById("logindesc").innerHTML = "Loading data...";
	}
	const userdata = await repeatUntilSuccess(() => getUsers());
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
		let params = ["easy", "medium", "oll", "pll", "easy2", "oll2", "pbl2", "blind2x2", "blind3x3", "marathon", "marathon2","marathon3"];
		params.forEach((param) => {
			if (userdata[index][param] != -1 && (localStorage[param] == undefined || localStorage[param] == -1 || +localStorage[param] > +userdata[index][param]))
				localStorage[param] = userdata[index][param];
		})
		params = ["m_easy", "m_medium"];
		params.forEach((param) => {
			console.log(userdata[index][param], localStorage[param], (localStorage[param] < userdata[index][param]))
			if (userdata[index][param] != -1 && (localStorage[param] == undefined || localStorage[param] == -1 || +localStorage[param] < +userdata[index][param])) {
				localStorage[param] = userdata[index][param];
			}
		})
		params = ["c_today", "c_today2", "c_week", "c_day", "c_day2", "cdate", "cdate2","cdate3", "c_day_bweek", "c_day2_bweek"];
		params.forEach((param) => {
				localStorage[param] = userdata[index][param];
		})
	}
	successSQL("Loaded data");
	updateScores();
	setSettings(userdata[index]);
}
document.getElementById("signout").onclick = () => {
	document.getElementById("l_message").innerHTML = "";
	localStorage.username = "signedout";
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
	const success = await repeatUntilSuccess(() => matchPassword(username, password));
	document.getElementById('password').value = '';
	if (!success) {
		alert("Incorrect credentials");
		document.getElementById("l_message").innerHTML = "";
		return;
	} else {
		loginmode();
		document.getElementById("l_message").innerHTML = "Logged in successfully! Your settings and high scores have been updated.";
		localStorage.username = username;
	
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
	//const userdata = await repeatUntilSuccess(() => getUsers());
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
}
function successSQL(text, id = "logindesc") {
	document.getElementById(id).innerHTML = text;
	setTimeout(() => {
		if (document.getElementById(id).innerHTML == text) {
			document.getElementById(id).innerHTML = "";
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
function displayMoveTitle(mode){
	if (mode == "m_34") {
		scramblemoves = m_type + 3;
		const points = {"-1": 1, 0: 2, 1: 3, 2: 5};
		document.getElementById("s_INSTRUCT").innerHTML = "Stage " + (Math.floor(m_34step/2)+1) + ": Solve the cube in at most " + 
			scramblemoves + " moves <br>(" + points[m_type] + (points[m_type] == 1 ? " point)" : " points)");
	} else {
		document.getElementById("s_INSTRUCT").innerHTML = "Stage " + (Math.floor(m_4step/2)+1) + ": Solve the cube in at most " + m_type + " moves <br>(" + parseInt(Math.pow(1.5, m_type)) + " points)";
	}
	document.getElementById("s_instruct").innerHTML = "<i>This scramble won't have any one-move slice moves.</i><br><br>Take advantage of the undo and reset buttons. <br> Hints cost 0.5 lives.<br>Giving up costs 1 life.";
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
	} if (localStorage.m_34 && m_34step == 0 && JSON.parse(localStorage.m_34)) {
		let obj = JSON.parse(localStorage.m_34)
		savesetup = obj.savesetup;
		giveups = obj.giveups;
		m_type = obj.m_type;
		m_points = obj.m_points;
		savesetup = IDtoReal(IDtoLayout(decode(obj.savesetup)));
		special[2] = savesetup;
		quickSolve();
		arr = [];
		showSpeed();
		m_34step = Math.floor(obj.m_34step / 2) * 2;
		m_34step++;
		displayMoveTitle("m_34");
		canMan = true;
		setLayout();
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
		displayMoveTitle("m_34");
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
		multipleEasy(0, 3, "m_34");
	}
}
function localSetup(mode) {
	localStorage[mode] = JSON.stringify({savesetup : getID(), giveups: giveups, m_points: m_points, m_type: m_type, m_34step: m_34step, m_4step: m_4step, m_offset: m_offset});
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
		m_offset = 1;
	}
	if (localStorage.m_4 && m_4step == 0 && m_34step == 0 && JSON.parse(localStorage.m_4).savesetup) {
		let obj = JSON.parse(localStorage.m_4)
		console.log(obj)
		giveups = obj.giveups;
		m_type = obj.m_type;
		m_points = obj.m_points ?? 0;
		m_offset = obj.m_offset ?? 1;
		savesetup = IDtoReal(IDtoLayout(decode(obj.savesetup)));
		special[2] = savesetup;
		quickSolve();
		arr = [];
		showSpeed();
		m_4step = Math.floor(obj.m_4step / 2) * 2;
		m_4step++;
		displayMoveTitle("m_4");
		if(m_type >= 20)
			document.getElementById("s_instruct").innerHTML = "<i>This scramble won't have any one-move slice moves.</i><br><br>Tip: Any scramble can be solved in at most 20 moves...HOW ARE YOU STILL PLAYING?";
		canMan = true;
	} else if(m_4step % 2 == 0 && m_34step == 0)
	{
		let rand = parseInt(Math.random()*100);
		m_scramble = [];
		arr = [];
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
		if(m_type < 20)
			displayMoveTitle("m_4");
		else
			document.getElementById("s_instruct").innerHTML = "<i>This scramble won't have any one-move slice moves.</i><br><br>Tip: Any scramble can be solved in at most 20 moves...HOW ARE YOU STILL PLAYING?";
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
		multipleEasy(0, 4, "m_4");
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
			setScore("m_easy", m_points, false);
		} else {
			setScore("m_medium", m_points, false);
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

function multipleEasy(nb, dificil, mode = "") {
	if (nb < arr.length) {
		canMan = false;
		shufflespeed = 2;
		notation(arr[nb]);
		console.log(nb, "easy", dificil);
		waitForCondition(multipleEasy.bind(null, nb + 1, dificil, mode), false);
	}
	else
	{
		shufflespeed = 5;
		setLayout();
		savesetup = IDtoReal(IDtoLayout(decode(getID())));
		if ((MODE != "speed" && MODE != "moves")) return;
		if (mode == "m_4" || mode == "m_34") {
			if (MODE != "moves"  || getEl("m_high").style.display == "block") {
				localStorage.m_34 = m_34step;
				localStorage.m_4 = m_4step;
				return;
			}
		} else {
			if (MODE != "speed" || getEl("s_high").style.display == "block") {
				return;
			}
		}
		if (mode == "m_4" || mode == "m_34") {
			localSetup(mode);
		}
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
		else if(dificil == 6)
		{
			if(!isSolved())
				pllpracstep++;
			practicePLL();
		} else if (dificil == 6.5) {
			practicePLL();
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
function setSpecial() {
	special[6] = DIM2;
	special[7] = MODE;
}

function moveX(row, dir) { // switch `i` cubes and rotate theme..
	let stack = [];
	let primes, found, tmp; // x' y'
	setSpecial();
	tmp = {};
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		if (CUBE[i].x === row) {
			primes = rotateMatrix(CUBE[i].y, CUBE[i].z, dir);
			tmp[i] = new Cuby(DIM, CUBE[i].x, primes.x, primes.y, RND_COLORS[i], PICKER, p, i, allcubies, special, SIZE);
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
	setSpecial();
	tmp = {};
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) { // foreach cubes
		if (CUBE[i].y === row) { // if cubbie in the 'Y' face
			primes = rotateMatrix(CUBE[i].x, CUBE[i].z, dir); // calculate new position for that cube
			tmp[i] = new Cuby(DIM, primes.x, CUBE[i].y, primes.y, RND_COLORS[i], PICKER, p, i, allcubies, special, SIZE); // buffer theme in a new cubye
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
	setSpecial();
	tmp = {};
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) { // foreach cubes
		if (CUBE[i].z === row) { // if cubbie in the 'z' face
			primes = rotateMatrix(CUBE[i].x, CUBE[i].y, dir); // calculate new position for that cube
			tmp[i] = new Cuby(DIM, primes.x, primes.y, CUBE[i].z, RND_COLORS[i], PICKER, p, i, allcubies, special, SIZE); // buffer theme in a new cubye
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
function blinded() {
	return bstep == 2 || (mastep > 0 && ma_data.type == "blind" && mastep % 2 == 1);
}

function cleanAllSelectedCubies() {
	for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
		CUBE[i].is_selected = false;
		CUBE[i].selected_color = null;
	}
}

function getCubyByColor(arr1) {
	for(let i = 0; i < SIZE * SIZE * SIZE; i++) {
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
	// console.log(arr1);
	let realcolor = getColor(arr1);
	if (realcolor == "k") return false;
	//console.log(realcolor);
	let allcolors = [];
	let adder = SIZE % 2 == 0 ? MAXX + 25 : MAXX;
	allcolors["w"] = [250-adder*0.02, 250-adder*0.02, 250-adder*0.02];
	allcolors["r"] = [219-adder*0.02, 25-adder*0.02, 25-adder*0.02];
	allcolors["b"] = [25-adder*0.02, 105-adder*0.02, 219-adder*0.02];
	allcolors["o"] = [219-adder*0.02, 125-adder*0.02, 25-adder*0.02];
	allcolors["g"] = [25-adder*0.02, 219-adder*0.02, 31-adder*0.02];
	allcolors["y"] = [209-adder*0.02, 219-adder*0.02, 25-adder*0.02];
	allcolors["k"] = [25-adder*0.02, 25-adder*0.02, 25-adder*0.02];
	allcolors["m"] = [245-adder*0.02, 25-adder*0.02, 245-adder*0.02];

	if(true || customb == 1 || allcubies)
	{
		let distcolor = [];
		distcolor[0] = arr1[0] - allcolors[realcolor][0];
		distcolor[1] = arr1[1] - allcolors[realcolor][1];
		distcolor[2] = arr1[2] - allcolors[realcolor][2];
		let res = distcolor[0] * SIZE * SIZE + distcolor[1] * SIZE + distcolor[2];
		if(res >= 0 && res < SIZE * SIZE * SIZE) return res;
		return false;
	}

	// const lookup = {
	// 	"[218,124,24,255]": 0, "[218,125,24,255]": 3, "[218,126,24,255]": 6,
	// 	"[219,124,24,255]": 9, "[219,125,24,255]": 12, "[219,126,24,255]": 15,
	// 	"[220,124,24,255]": 18, "[220,125,24,255]": 21, "[220,126,24,255]": 24,
	// 	"[249,251,249,255]": 6, "[249,251,250,255]": 7, "[249,251,251,255]": 8,
	// 	"[250,251,249,255]": 15, "[250,251,250,255]": 16, "[250,251,251,255]": 17,
	// 	"[251,251,249,255]": 24, "[251,251,250,255]": 25, "[251,251,251,255]": 26,
	// 	"[24,104,218,255]": 0, "[24,104,219,255]": 1, "[24,104,220,255]": 2,
	// 	"[24,105,218,255]": 3, "[24,105,219,255]": 4, "[24,105,220,255]": 5,
	// 	"[24,106,218,255]": 6, "[24,106,219,255]": 7, "[24,106,220,255]": 8,
	// 	"[218,26,26,255]": 8, "[218,25,26,255]": 5, "[218,24,26,255]": 2,
	// 	"[219,26,26,255]": 17, "[219,25,26,255]": 14, "[219,24,26,255]": 11,
	// 	"[220,26,26,255]": 26, "[220,25,26,255]": 23, "[220,24,26,255]": 20,
	// 	"[26,220,30,255]": 24, "[26,220,31,255]": 25, "[26,220,32,255]": 26,
	// 	"[26,219,30,255]": 21, "[26,219,31,255]": 22, "[26,219,32,255]": 23,
	// 	"[26,218,30,255]": 18, "[26,218,31,255]": 19, "[26,218,32,255]": 20,
	// 	"[208,218,26,255]": 2, "[208,218,25,255]": 1, "[208,218,24,255]": 0,
	// 	"[209,218,26,255]": 11, "[209,218,25,255]": 10, "[209,218,24,255]": 9,
	// 	"[210,218,26,255]": 20, "[210,218,25,255]": 19, "[210,218,24,255]": 18
	// };

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
	let rnd3 = Math.floor(Math.random()*4);
	let auf = "";
	for(let i = 0; i < rnd3; i++)
	{
		auf += "U ";
	}
	changeArr(obj2[rnd][1] + " " + olls[rnd2][1] + " " + auf);
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
	let possible = [['x', [MAXX], 'D'], ['x', [-MAXX], 'U'], ['y', [MAXX], 'F'], ['y', [-MAXX], 'B'], ['z', [MAXX], 'R']
, ['z', [-MAXX], 'L']];
	if (SIZE >= 4) {
		possible.push(['x', [MAXX-CUBYESIZE],'d'], ['x', [CUBYESIZE-MAXX], 'u'], ['y', [MAXX-CUBYESIZE], 'f'],
			['y', [CUBYESIZE-MAXX], 'b'], ['z', [MAXX-CUBYESIZE], 'r'], ['z', [CUBYESIZE-MAXX], 'l'],
			['x', [MAXX, MAXX-CUBYESIZE],'Dw'], ['x', [-MAXX, CUBYESIZE-MAXX], 'Uw'], ['y', [MAXX, MAXX-CUBYESIZE], 'Fw'],
			['y', [CUBYESIZE, CUBYESIZE-MAXX], 'Bw'], ['z', [MAXX, MAXX-CUBYESIZE], 'Rw'], ['z', [CUBYESIZE, CUBYESIZE-MAXX], 'Lw']
		)
	} 
	
	if (SIZE % 2 == 1) {
		possible.push(['z', [0], 'M'], ['x', [0], 'E'], ['y', [0], 'S'])
	}
	if(SCRAM.value() == "Middle Slices")
		possible = [['z', [0], 'M'], ['x', [0], 'E'], ['y', [0], 'S']];
	if(DIM4 == 2 || DIM2 == 15 || DIM2 == 2)
		possible = [['x', [MAXX], 'D'], ['x', [-MAXX], 'U'], ['y', [MAXX], 'F'], ['y', [-MAXX], 'B'], ['z', [MAXX], 'R']
		, ['z', [-MAXX], 'L']];
	let possible2 = [];
	for(let h = 0; h < possible.length; h++){
		let total = 0;
		let cuthrough = false;
		let axis = possible[h][0];
		let rows = possible[h][1];
		let move = possible[h][2];

		for(let i = 0; i < bandaged.length; i++){
			total = 0;
			for(let j = 0; j < bandaged[i].length; j++){
				if(rows.includes(CUBE[bandaged[i][j]][axis]))
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
	let bad5 = [];
	let mid = mids[SIZE];
	let setup = [CUBE[mid].x, CUBE[mid].y, CUBE[mid].z];
	console.log("setup is ", setup)
	if(setup[0] == -MAXX || setup[0] == MAXX) //top
		bad5 = ['L','R','F','B','S','M','l','r','f','b', "Lw", "Rw", "Fw", "Bw", "Mw", "Sw"];
	else if(setup[2] == -MAXX || setup[2] == MAXX) //left
		bad5 = ['U','D','F','B','E','S','u','d','f','b',"Uw","Dw","Fw","Bw","Ew","Sw"];
	else bad5 = ['L','R','U','D','E','M','l','r','u','d',"Lw","Rw","Uw","Dw","Ew","Mw"]; // front

	
	if(SCRAM.value() == "Double Turns" || 
	((SCRAM.value() == "3x3x2" || (["2x2x4", "3x3x5"].includes(BANDAGE_SELECT.value()) && len < 15)) && bad5.includes(actualmove)))
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
	if(canMan == false || customb == 1) return;
	if(bandaged.length > 0){
		if (DIM == 8)
			shufflePossible(60, "", "  ");
		if(DIM4 == 3)
			shufflePossible(45, "", "  ");
		else
			shufflePossible(15, "", "  ");
		return;
	}


	modeData("scramble");
	console.log("shuffling");
	shufflespeed = 2;
	moves = 0;
	timer.reset();
	timer.stop();
	let possible = SIZE < 4 ? ["R", "L", "U", "D", "B", "F"] :
	["R", "L", "U", "D", "B", "F", "Rw", "Lw", "Uw", "Dw", "Bw", "Fw"];
	let doubly = false;
	let dontdo = false;
	arr = [];
	let bad = "";
	let total = "";
	let bad5 = [];
	let mid = mids[SIZE];
	let setup = [CUBE[mid].x, CUBE[mid].y, CUBE[mid].z];
	console.log("setup is ", setup)
	if(setup[0] == -MAXX || setup[0] == MAXX) //top
		bad5 = ['L','R','F','B','S','M','l','r','f','b'];
	else if(setup[2] == -MAXX || setup[2] == MAXX) //left
		bad5 = ['U','D','F','B','E','S','u','d','f','b'];
	else bad5 = ['L','R','U','D','E','M','l','r','u','d']; // front
	if(true)
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
			let size = DIM2 == 100 ? 2 : SIZE;
			let random = patterndata[size];
			let rnd = parseInt(Math.random()*random.length);
			total = random[rnd];
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
	if (SIZE == 4) s = 30;
	if (["2x2x4", "3x3x5"].includes(DIM) || SIZE > 4 || (SIZE == 4 && custom == 1)) s = 45;
	if (["3x3x4", "1x4x4"].includes(DIM)) s = 30;
	for(let i = 0; i < s; i++)
	{
		let mid = Math.floor(SIZE / 2);
		if(dontdo) break;
		while(true)
		{
			let rnd = p.random(possible);
			if(rnd == bad || (arr.length>1 && rnd == arr[i-2] ))
			continue;

			if(rnd == opposite2[bad])
				continue;
			
			let rnd2 = Math.random();
			let col = topColor();
			col = col.toLowerCase();
			let op = opposite[col];
			if(SCRAM.value() == "Gearcube"){
				rnd = rnd.replace(/w/g, '');
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
			} else if (SCRAM.value() == "Gearcube II") {
				rnd = rnd.replace(/w/g, '');
				if (rnd2 < 0.5) {
					arr.push(rnd);
					arr.push(rnd);
					arr.push(opposite2[rnd] + "'")
					total += rnd + "2 " + opposite2[rnd] + "' ";
				} else {
					arr.push(rnd + "'");
					arr.push(rnd + "'");
					arr.push(opposite2[rnd])
					total += rnd + "2' " + opposite2[rnd] + " ";
				}
			} else if(doubly || ((SCRAM.value() == "3x3x2" 
			|| ((["2x2x4", "3x3x5", "2x3x4"].includes(DIM) || (custom == 1 && SIZE > 3 && CUSTOMSHIFT.checked())) && i < 15))
			 &&  bad5.includes(rnd[0])))
			{
				console.log("HEREEEE")
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
			break;
		}
	}
	if(SCRAM.value() != "Last Layer")
	document.getElementById("scramble").innerHTML = total;
	multiple2("scramble");
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
	if (MODE == "timed") {
		setDisplay("block", ["alltimes", "timegone", "link1"]);
		if (!ismid) {
			setDisplay("inline", ["mode4", "mode5", "mode6", "mode8"]);
			setDisplay("none", ["mode", "mode2", "mode3", "mode7", "or_instruct4"]);

		} else {
			setDisplay("inline", ["mode", "mode2", "mode3", "mode7"]);
			setDisplay("none", ["mode4", "mode5", "mode6", "mode8"]);
			setDisplay("block", ["or_instruct4"]);
		}
		setDisplay(mo5.length == 0 && MODE == "timed" ? "block" : "none", ["beforetime"]);
		if(mo5.length == 0)
		{
			document.getElementById("timegone").style.display = "none";
			document.getElementById("link1").style.display = "none";
			return;
		}
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
	if (saveao5data.hasOwnProperty("length") && mo5.length == saveao5data.length && 
	saveao5data.hasOwnProperty("session") && session == saveao5data.session) {
		return;
	} else {
		saveao5data = {length: mo5.length, session: session};
	}
	document.getElementById("alltimes").innerHTML = alltimes;
}
function displayAverage()
{
	// if(canMan == false) return;
	let min = ao5[0];
	let max = ao5[0];
	let minpos = 0;
	let maxpos = 0;
	let display = "";
	let displaymoves = "";
	let actualao5 = 0;
	let meano5 = 0; //not actually limited to 5
	let meanmoves = 0;
	if(ao5[ao5.length-1] == 0 && MODE != "moves")
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
	if(ao5.length == 5 && mastep == 0)
	display += "&nbsp;Ao5: " + (Math.round((actualao5/3.0)*100)/100);
	if(mastep > 0) 
		display += "<br>&nbsp;Total: " + ao5.reduce((acc, curr) => acc + curr, 0).toFixed(2);;
	if(mo5.length > 2)
	display += " &nbsp;&nbsp;Mo" + mo5.length + ": " + (Math.round((meano5/(mo5.length * 1.0))*100)/100);
	if(ao5.length == 0)
	display = "N/A";
	if(MODE == "speed" && pllpracstep == 0)
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
	if (document.getElementById('ao5').innerHTML != display)
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
    if (document.getElementById('moves2').innerHTML != displaymoves)
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
function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value == arr2[index]);
}
function canMouse() {
	let cubies = shownCubies();
	const sides = ["front", "back", "left", "right", "top", "bottom"];
	for (let i = 0; i < cubies.length; ++i) {
		let set = new Set();
		for (let j = 0; j < sides.length; ++j) {
			const color = getColor(CUBE[i][sides[j]].levels);
			if (color == "k") {
				return false;
			}
			if (set.has(color)) return false;
			set.add(color);
		}
	}
	return true;
}
function hasColor(c) {
	const sides = ["front", "back", "left", "right", "top", "bottom"];
	let hasit = false;
	for (let i = 0; i < SIZE * SIZE * SIZE; ++i) {
		sides.forEach((side) => {
			if (getColor(CUBE[i][side].levels) == c) {
				hasit = true;
			}
		});
	}
	return hasit;
}
function startAction() {	
	if(MODE == "cube" && !mouseAllowed() && custom == 0) return; 
	if(custom == 1 && !canMouse()) return; 
	if(timer.isRunning && race > 1 && Math.round(timer.getTime() / 10)/100.0 >= 0.5){ //racedetect
		raceDetect();
		return;
	}
	let hoveredColor;
	if(p.touches.length == 0) {
		hoveredColor = p.get(p.mouseX, p.mouseY);
	} else {
		let xx = p.touches[0].x;
		let yy = p.touches[0].y;
		hoveredColor = p.get(xx, yy);
	}

	setLayout();

	if (hoveredColor !== false && !arraysEqual(hoveredColor, p.color(BACKGROUND_COLOR).levels)) { 
		const cuby = getCubyIndexByColor2(hoveredColor);
		console.log("Color", hoveredColor, "Cuby", cuby, "face", getFace(cuby, hoveredColor), "pos", CUBE[cuby] ? [CUBE[cuby].x, CUBE[cuby].y, CUBE[cuby].z] : "", "Neighbors ", getNeighborsArr(cuby));
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
	let rows = [];
	for (let i = -MAXX; i <= MAXX; i+= CUBYESIZE) {
		rows.push(i);
	}
	if (isAnimating()) return;
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
function animate(axis, rows, dir, timed, bcheck = true) {
	
	if(isAnimating()) return false;
	if (blinded()) {
		toggleOverlay(true);
	}
	let total = 0;
	let cuthrough = false;
	if(rows[0] < -MAXX || rows[rows.length - 1] > MAXX || rows.length > (MAXX * 2 / CUBYESIZE + 1)) {
		return false;
	}
	if(bandaged.length > 0){
		for(let i = 0; i < bandaged.length; i++){
			total = 0;
			for(let j = 0; j < bandaged[i].length; j++){
				if(rows.includes(CUBE[bandaged[i][j]][axis]))
					total++
			}
			if(total > 0 && total < bandaged[i].length)
				cuthrough = true;
		}
		if (cuthrough && !(DIM == 50 && SIZE > 3)) {
			undo.pop();
			if(timer.isRunning)
				moves--;
			return false;
		}
		if(cuthrough){
			let tryleft = animate(axis, [rows[0] - CUBYESIZE, ...rows], dir, timed, false);
			let tryright = animate(axis, [...rows, rows[rows.length - 1] + CUBYESIZE], dir, timed, false);
			if (tryleft && tryright) {
				rows = tryleft.length < tryright.length ? tryleft: tryright;
			} else if (tryleft) {
				rows = tryleft;
			} else if (tryright) {
				rows = tryright;
			} else if (bcheck) {
				undo.pop();
				if(timer.isRunning)
					moves--;
				return false;
			} else {
				return false;
			}
		}
	}
	if (!bcheck) {
		return rows;
	}
	if(Math.round(timer.getTime() / 10)/100.0 <= 0 && timed)
	{
		if(!alldown) {
			timer.reset();
			timer.start();
			if (cstep == 1 || cstep == 1.5) cstep++;
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
	initAudioContext(); // Ensure AudioContext is active
    playAudio();
	return true;
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
	if (event.key == "Tab") {
        event.preventDefault();
    }
});

document.addEventListener('keyup', function(event) {
    if (!event.ctrlKey && !event.metaKey) {
        inspect = false;
    }
});

p.keyPressed = (event) => {
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
	if(p.keyCode == 32){  //space
		console.log(getOuterCubes());
		console.log(DIM, DIM2, special, MODE);
		setLayout();
		console.log(layout)
		if (blinded() && getEl("overlay").style.display == "block") {
			toggleOverlay(false);
		} else if (canMan == false && (MODE == "normal" || MODE == "timed")) {
			stopMoving();
			return;
		} else if (getEl("s_start").style.display == "block") {
			practicePLL();
		} else if (getEl("readybot").style.display == "block") {
			speedRace2();
		} else if (race == 2 && !isAnimating()) {
			getEl("outertime").style.color = "green";
		}
	}
	if(p.keyCode == 49) { //1 //one
		if (p.keyIsDown(p.SHIFT)) {
			regular();
			return;
		}
		if(document.getElementById("s_instruct").innerHTML.includes("In one game of"))
		regular();
		if(MODE == "moves") {
			if (getEl("blind").style.display == "block") {
				regular();
			} else {
				movesmode();
			}
		}
		if(MODE == "speed") {
			if (getEl("s_prac").style.display != "none") {
				regular();
			} else {
				speedmode();
			}
			return;
		} 
		if(MODE == "compete") {
			if (getEl("lobby").style.display != "none") {
				regular();
			} else {
				competemode();
			}
			return;
		} 
		if(MODE == "paint") {idmode(); return;}
		if(MODE == "competing") {competemode(); return;}
		if(MODE == "finishpaint") {paintmode(); return;}
		if(MODE == "timed" || MODE == "challenge" || (MODE == "cube" && custom == 0) || document.getElementById("test_alg_span").innerHTML == "Paste ID here:" || MODE == "compete")
		regular();
		if(MODE == "daily" || MODE == "weekly")
		challengemode();
		if(document.getElementById("settings1").style.display == "block")
		regular();
		if(document.getElementById("hotkey1").style.display == "block")
		settingsmode();
		if(MODE == "cube" && custom > 0)
		{
			cubemode();
			custom = 0
		}
	}
	if(p.keyCode == 50 && race < 1) //2 //two
	{
		if (p.keyIsDown(p.SHIFT) && (getEl("mode3").style.display != "none" || getEl("mode6").style.display != "none")) {
			timedmode();
		} else if(SPEED != 2) {
			SPEED_SLIDER.value(2);
			SPEED = 2;
		} else {
			SPEED_SLIDER.value(0.01);
			SPEED = 0.01;
		}
		return;
	}
	if (p.keyCode == 51) { //3
		if (p.keyIsDown(p.SHIFT))
			speedmode();
		else
			darkMode();
		return;
	}
	if(p.keyCode == 52) //4
	{
		if (p.keyIsDown(p.SHIFT))
			movesmode();
		else {
			alignIt();
		}
		return;
	}
	if(p.keyCode == 16){ //shift
		// b_selectdim["1x2x3"]();
		// console.log(competedata, compete_alltimes);
		// quickSolve();
		// moveSetup();
		// switchFour();
		// console.log(mapBandaged())
		// console.log(mapBandaged());
	}
	if(p.keyCode == 9){ //tab
		if (p.keyIsDown(p.SHIFT)) 
			halfScreen(!fullscreen);
		else
			fullScreen(!fullscreen);
		return;
	}
	if(customb > 0 && (p.keyCode <37 || p.keyCode > 40)) return;

	if (p.keyCode == 27 && p.keyIsDown(p.SHIFT)) { //escape
		if (MODE == "speed") {
			let func = null;
			if (pllstep > 0) func = speedPLL;
			if (ollstep > 0) func = speedOLL; 
			if (easystep > 0) func = easy; 
			if (medstep > 0) func = medium; 
			if (pllpracstep > 0) {movesarr = []; mo5 = []; ao5 = [];}
			if (func) {
				speedmode();
				func();
			}
		} else if (MODE == "moves") {
			let func = null;
			if (m_34step > 0) func = m_34;
			if (m_4step > 0) func = m_4; 
			if (bstep > 0) func = blindmode; 
			if (mastep > 0) func = startMarathon.bind(0, ma_data.type);
			if (func) {
				if (mastep > 0 && layout[2][1][1][0] != TOPWHITE.value()[0].toLowerCase()) {
					movesmode();
					setTimeout(func, 0);
				}
				else {
					movesmode();
					func();
				}
			}
		} else if (MODE == "weekly") {
			let func = null;
			if (cstep > 0) {
				challengemode();
				startchallenge();
			}
		}
	} else if (p.keyCode == 27 && MODE == "finishpaint") {
		quickSolve(savesetup);
		return;
	} else if(p.keyCode == 27 && (MODE == "normal" || MODE == "timed" || MODE == "compete")) {
		reSetup();
		return;
	} else if(p.keyCode == 27 && (MODE == "speed" && (race == 1 || getEl("s_high").style.display != "none"))) {
		quickSolve();
		return;
	} else if(race > 1 && p.keyCode == 27 && document.getElementById("s_RACE2").style.display == "block"){
		quickSolve();
		return;
	}
	if(p.keyCode == 55){ //7
		if (p.keyIsDown(p.SHIFT)) {
			navigator.clipboard.writeText(getID());
			successSQL("Position ID Copied");
		} else {
			alert(getID());
		}
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
		// let bad2 = "188 190 65 186 80 81 77 85 86 82 78 66 84 89 59";
		let bad3 = "88c";
		if(DIM == 100)
			include = "37 39 40 38 76 83 74 70 72 71 79 87 75 73 68 69 80 81 1000 1001";
		// if(bad2.includes(p.keyCode) && (DIM == 100 || DIM == 5) && p.keyCode > 9) return;
		if(bad3.includes(p.keyCode) && p.keyCode > 9 || p.keyCode == 18) return;
		let cubies = shownCubies();
		let onedown = false;
		alldown = false;
		let bad4 = [83,76,70,74,69,68,73,75,71,72,87,79,65,186,188,190,81,80,85,77,82,86,89,84,78,66,90,191,59]; //no rotations
		
		for (let i = 0; i < SIZE * SIZE * SIZE; i++) {
			if (CUBE[i].animating()) {
				return;
			}
		}
		let bad5 = [69,68,71,72,73,75,87,79,85,77,82,86,66,78,188,190,81,80] //for 3x3x2
		let mid = mids[SIZE];
		let setup = [CUBE[mid].x, CUBE[mid].y, CUBE[mid].z];
		if(setup[0] == -MAXX || setup[0] == MAXX) //top
			bad5 = [69,68,71,72,73,75,87,79,85,77,82,86,66,78,188,190,81,80];
		else if(setup[2] == -MAXX || setup[2] == MAXX) //left
			bad5 = [71,72,87,79,66,78,81,80,70,74,76,83,89,84,186,65,90,191,59];
		else bad5 = [188,190,81,80,70,74,76,83,89,84,73,75,69,68,85,77,82,86,186,65,90,191,59]; // front
			
		let bad6 = [190,188,65,186,80,81,59];
		const keyMoveMap = {
			37: "y", 39: "y'", 40: "x'", 38: "x",
			1000: "z'", 1001: "z", 76: "D'", 83: "D",
			74: "U", 70: "U'", 72: "F", 71: "F'",
			79: "B'", 87: "B", 75: "R'", 73: "R",
			68: "L", 69: "L'", 188: "M'", 190: "M",
			65: "E", 186: "E'", 59: "E'", 80: "S",
			81: "S'", 77: "Rw'", 85: "Rw", 86: "Lw",
			82: "Lw'", 78: "Fw", 66: "Fw'", 84: "Uw'",
			89: "Uw", 90: "Dw", 191: "Dw'"
		};

		if (keyMoveMap[p.keyCode]) {
			arr = [keyMoveMap[p.keyCode]];
			if((!INPUT.value().includes("Gearcube") && p.keyIsDown(p.SHIFT) && bad4.includes(p.keyCode)) || 
			(INPUT.value() == "Double Turns" && bad4.includes(p.keyCode)) || (INPUT.value() == "3x3x2" && bad5.includes(p.keyCode))
			|| (p.keyIsDown(p.SHIFT) && ([37,38,39,40].includes(p.keyCode) || ([1000, 1001].includes(p.keyCode) && KEYBOARD.value() == "Default")))) {
				arr.push(arr[0]);
			} else if(INPUT.value() == "Gearcube") {
				if (arr[0].includes("w")) {
					arr[0] = arr[0].replace(/w/g, "");
				}
				if (['M', 'S', 'E','l','r','u','d','f','b'].includes(arr[0][0])) {
					arr = [];
				} else {
					arr.unshift(toGearCube(arr[0]));
				}
			}
			if(INPUT.value() == "Gearcube II") {
				if (arr[0].includes("w")) {
					arr[0] = arr[0].replace(/w/g, "");
				}

				if (['M', 'S', 'E','l','r','u','d','f','b'].includes(arr[0][0])) {
					arr = []
				} else {
					arr.push(arr[0]);
					console.log(arr[0][0])
					console.log(opposite2[arr[0][0]] + (arr[0].includes("'") ?  "" : "'"))
					arr.push(opposite2[arr[0][0]] + (arr[0].includes("'") ?  "" : "'"));
				}
			}
		} else switch (p.keyCode) {	
			case 8: 
			if (p.keyIsDown(p.SHIFT))
				flexDo(Undo, undo, true);
			else
				flexDo(Undo, undo);
			break;
			case 61:
			case 187: //equals
			if (p.keyIsDown(p.SHIFT))
				flexDo(Redo, redo, true);
			else
				flexDo(Redo, redo);
			break;
			case 27: //escape
			if(MODE == "normal" || MODE == "timed" || MODE == "cube" || MODE == "account" || MODE == "login" || (MODE == "challenge" && cstep == 0)) 
			reSetup();
			if((MODE == "moves" || cstep > 0)) {
				if(m_34step > 0 || m_4step > 0 || cstep > 0 || bstep > 0 || mastep > 0) 
					moveSetup();
				else
					quickSolve();
			}
			if(MODE == "speed" && getEl("s_high").style.display == "none" && getEl("s_prac2").style.display == "none")
			speedSetup();
			
			break;
			case 192: //`
			if (p.keyIsDown(p.SHIFT)) {
				(MODE == "normal" || MODE == "timed")  && solveCube();
			} else if(["normal", "cube", "timed", "account", "login", "compete"].includes(MODE)) {
				shuffleCube();
			} else if (["moves", "speed"].includes(MODE) && getEl("switcher").style.display == "block") {
				shuffleCube();
			}
			break;
			case 32: //space
			// quickSolve();
			console.log(DIM, DIM2, isSolved(), mastep, mapBandaged());
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
			if (p.keyIsDown(p.SHIFT)) {
				removeAllTimes();
			} else {
				removeTime();
			}
			break;
			case 57: //9
			if (p.keyIsDown(p.SHIFT)) {
				if (SIZE > 3 && DIM != 50) break;
				if(["normal", "timed", "cube"].includes(MODE)) {iddefault(); successSQL("Default ID Saved");}
			} else {
				if(localStorage.username == "signedout")
					break;
				loadData();
			}
			break;
			case 48: //0
			if (p.keyIsDown(p.SHIFT)) {
				if (!["normal", "timed", "cube","finishpaint"].includes(MODE)) {
					regular();
				}
				if (SIZE > 3) break;
				try {
					allcubies = IDtoReal(IDtoLayout(decode(getID())));
					setLayout();
					successSQL("Current ID Saved");
				} catch(e){
		
				}
			} else {
				if(localStorage.username == "signedout")
					break;
				saveData();
			}
			break;
			case 189: //-
			if (p.keyIsDown(p.SHIFT)) {
				cubemode();
			} else {
				if (getEl("type3").style.display == "block") {
					if (DIM2 == 50) {
						changeTwo();
					} else {
						changeThree();
					}
				}
			}
			break;
		}
		if (keyMoveMap[p.keyCode] && arr.length > 0) {
			multiple(0, true);
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
function shownCubies() {
	let cubies = [];
	for (let i = 0; i < SIZE * SIZE * SIZE; ++i) {
		if (CUBE[i].shown) {
			cubies.push(i);
		}
	}
	return cubies;
}
function adjustMove(move) {
	if (["2x2x4", "3x3x5", "2x3x4"].includes(DIM) || custom == 1 && CUSTOMSHIFT.checked() && SIZE > 3) {
		if (["M", "S", "E"].includes(move[0]) && !isCube() && DIM == "2x2x4") {
			console.log("Illegal!");
			return false;
		}
		if ("lfrbud".includes(move[0]) && !uniform(getMove(MAXX, CUBYESIZE, SIZE)[move][0])) {
			move = move[0].toUpperCase() + move.slice(1);
			console.log("changedmove ", move)
		}
		if (!(move.includes("w")) && ["L", "F", "R", "B", "U", "D"].includes(move[0]) && !uniform(getMove(MAXX, CUBYESIZE, SIZE)[move][0])) {
			if (move.includes("'")) move = move[0] + "w'";
			else move += "w";
		}
	}
	return move;
}
function multiple(nb, timed, use = "default") {
	if (nb < arr.length) {
		canMan = false;
		timer.inspection = false;
		let cubies = shownCubies();
		let onedown = true;
		alldown = false;
		if (!getMove(MAXX, CUBYESIZE, SIZE).hasOwnProperty(arr[nb]) && !["x", "y", "z"].includes(arr[nb][0])) { // Bad move
			multiple(nb + 1, timed, use)
			return;
		}
		if (adjustMove(arr[nb]) !== false) {
			arr[nb] = adjustMove(arr[nb]);
		} else {
			multiple(arr.length, timed, use);
			return;
		}
		if(!["x", "y", "z"].includes(arr[nb][0])){
			alldown = true;
			onedown = false;
			const move = arr[nb];
			const movemap = getMove(MAXX, CUBYESIZE, SIZE);
			const axis = movemap[move][0];
			const values = movemap[move][1];
			if ([move, move + "'"].includes(arr[nb])) {
				for(let i = 0; i < cubies.length; i++) {
					console.log("ONEDOWN ATTEMPT", values,  CUBE[cubies[i]][axis], MAXX);
					onedown = onedown || values.some((value) => value == CUBE[cubies[i]][axis]);
				}
				for(let i = 0; i < cubies.length; i++) {
					alldown = alldown && values.some((value) => value == CUBE[cubies[i]][axis]);
				}
			}
			console.log("ONEDOWN IS", onedown);
		}
		if(alldown == true) timed = false;
		if (!onedown) {
			console.log("NOTATION CHANGING", arr[nb]);
			const bewide = ["L", "R", "F", "B", "U", "D", "M", "S", "E"];
			const map = {Lw: "M", "Lw'": "M'", Rw: "M'", "Rw'": "M", Fw: "S", "Fw'": "S'",
				Bw: "S'", "Bw'": "S", Uw: "E'", "Uw'": "E", Dw: "E", "Dw'": "E'"};
			if (!arr[nb].includes("w") && bewide.includes(arr[nb][0])) {
				arr[nb] = arr[nb][0] + "w" + (arr[nb].includes("'") ? "'" : "");
				multiple(nb, timed, use);
				return;
			} else if (map.hasOwnProperty(arr[nb])) {
				arr[nb] = map[arr[nb]];
                multiple(nb, timed, use);
                return;
			} else {
				multiple(nb + 1, timed, use);
				return;
			}
		}
		console.log("NOTATION", arr[nb]);
		notation(arr[nb], timed);
		if (use == "default") {
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
		}
		waitForCondition(multiple.bind(null, nb + 1, timed, use), true);
	}
	else
	{
		canMan = true;
		if (use == "scramble" || use == "flexdo") {
			if (use == "scramble") {
				undo = [];
				redo = [];
			}
			shufflespeed = 5;
			canMan = true;
			if(race > 1){
				canMan = false;
				shuffling = false;
			}
		} else if (comstep > 0) {
			competeprogress = Math.max(competeprogress, getProgress());
		}
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

function multiple2(use) {
	if (0 < arr.length) {
		shufflespeed = 2;
		canMan = false;
		multiple(0, false, use);
	}
}
function changeArr(str)
{
	arr = [];
	const arr2 = SIZE == 3 ? ['r', 'u', 'd', 'b', 'l', 'f'] : [];
	//console.log("here");
	let temp = "";
	let end  = 1;
	while(str != "")
	{
		console.log(str, arr);
		end = 1;
		temp = "";
		let extra = "";
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
			extra = "'";
			end++;
		}
		let move = temp;
		let num = 0;
		while (str[end] >= '0' && str[end] <= '9') {
			num = num * 10 + +(str[end]);
			console.log("end is " + str[end], "num is " + num);
			end++;
			if(str[end] == "'") {
				extra = "'"
				end++;
				break;
			}
		}
		console.log("NUM IS ", num)
		if (num < 2) num = 1;

		for (let i = 0; i < num; i++) {
			arr.push(move + extra);
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
function alignIt() {
	CAM = p.createEasyCam(p._renderer);
	CAM_PICKER = p.createEasyCam(PICKER.buffer._renderer);
	CAM.zoom(CAMZOOM + ZOOMADD);
	rotateIt();
}
function undoTillRotate(arr) {
	if (!arr || arr.length == 0) return 0;
	let cnt = 1;
	for (let n = arr.length - 2; n >= 0; n--) {
		if (['x', 'y','z'].includes(arr[n][0])) {
			break;
		}
		cnt++;
	}
	return cnt;
}
function flexDo(foo, arr, shift = false) {
	if (arr.length == 0) return;
	console.log(INPUT.value());
	if (shift) {
		funcMult(foo, undoTillRotate(arr));
	} else if (['x', 'y', 'z'].some(c => arr[arr.length - 1].includes(c))) {
		funcMult(foo, 1);
	} else if (INPUT.value() == "Double Turns" || INPUT.value() == "Gearcube") {
		funcMult(foo, 2);
	} else if (INPUT.value() == "Gearcube II") {
		funcMult(foo, 3);
	} else if (INPUT.value() == "3x3x2") {
		let bad5 = [];
		let mid = mids[SIZE];
		// if (custom == 1) mid = shownCubies()[Math.floor(shownCubies().length / 2)];
		let setup = [CUBE[mid].x, CUBE[mid].y, CUBE[mid].z];
		if(setup[0] == -MAXX || setup[0] == MAXX) bad5 = ['L','R','F','B','S','M'];
		else if(setup[2] == -MAXX || setup[2] == MAXX) bad5 = ['U','D','F','B','E','S'];
		else bad5 = ['L','R','U','D','E','M']; // front
		if (bad5.includes(arr[arr.length - 1][0].toUpperCase())) {
			funcMult(foo, 2);
		} else {
			funcMult(foo, 1);
		}
	} else {
		funcMult(foo, 1);
	}
}
function funcMult(foo, times) {
	if (isAnimating() || times == 0) return;
	foo();
	let interval = setInterval(() => {
		if (!isAnimating()) {
			clearInterval(interval);
			canMan = true;
			funcMult(foo, times - 1);
			return;
		} else {
			canMan = false;
		}
	}, 0);
}
function getEl(id) {
	return document.getElementById(id);
}
function Undo()
{
	
	console.log(undo);
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
	multiple2("flexdo");
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
	multiple2("flexdo");
}
function refreshButtons()
{
	if(modnum == 0)
		document.getElementById("or_instruct5").innerHTML = "Shape Mods";
	else if(modnum == 1)
		document.getElementById("or_instruct5").innerHTML = "Bandaged Mods";
	else 
		document.getElementById("or_instruct5").innerHTML = "Big Cubes";
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
	FOURBYFOUR.remove();
	FIVEBYFIVE.remove();
	ONEBYFOURBYFOUR.remove();
	TWOBYTWOBYFOUR.remove();
	TWOBYTHREEBYFOUR.remove();
	THREEBYTHREEBYFIVE.remove();
	THREEBYTHREEBYFOUR.remove();
	LASAGNA.remove();
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
	CUBE15.remove();
	CUBE16.remove();
	SWITCHER.remove();

	let d = isthin? 1.5 : 1;
	let d2 = isthin? 2.5 : 1;
	let m = isthin? "" : " Mode";
	
	REGULAR = p.createButton(`Normal${m}`);
	setButton(REGULAR, "mode", 'btn btn-info', `text-align:center; font-size: ${20/d}px; width:${180/d2}px; border: none;`, regular.bind(null, 0));

	TIMEDMODE = p.createButton(`Stats${m}`);
	setButton(TIMEDMODE, "mode3", 'btn btn-info', `text-align:center; font-size:${20/d}px; width:${180/d2}px; border: none;`, timedmode.bind(null, 0));
	
	MOVESMODE = p.createButton(`Challenges`);
	setButton(MOVESMODE, "mode7", 'btn btn-info', `text-align:center; font-size:${20/d}px; width:${180/d}px; border: none;`, movesmode.bind(null, 0));

	SPEEDMODE = p.createButton(`Speed${m}`);
	setButton(SPEEDMODE, "mode2", 'btn btn-info', `text-align:center; font-size:${20/d}px; width:${180/d2}px; border: none;`, speedmode.bind(null, 0));

	IDMODE = p.createButton('View/Save ID');
	setButton(IDMODE, "ID2", 'btn btn-info', 'text-align:center; border: none;', idmode.bind(null, 0));

	SETTINGS = p.createButton('');
	SETTINGS.attribute('title', 'Settings');
	setButton(SETTINGS, "settings", 'bi bi-gear-wide-connected', 'font-size: 40px; height: 60px; width: 60px; background-color: white; border: none; border-radius: 10px; background-color: transparent; color:' + document.body.style.color, () => {settingsmode()});
	if (!isthin)
		SETTINGS.position(cnv_div.offsetWidth-60,5);
	else
		SETTINGS.position(cnv_div.offsetWidth-80,5);

	if (FULLSCREEN) {
		if (!ismid) {
			document.getElementById("fullscreen").style.display = "block";
			FULLSCREEN.position(cnv_div.offsetWidth-50,window.innerHeight-145);
		} else {
			document.getElementById("fullscreen").style.display = "none";
		}
	}

	SWITCHER = p.createButton(DIM2 == 50 ? "Switch to 2x2" : "Switch to 3x3");
	setButton(SWITCHER, "switcher", 'btn btn-primary', 'text-align:center; font-size:20px;', DIM == 50 ? changeTwo : changeThree);

	if (localStorage.audioon === "false") {
		audioon = false;
	}

	if(audioon){
		VOLUME = p.createButton('');
		VOLUME.class('btn btn-light bi bi-volume-up');
		VOLUME.attribute('title', 'Sound on');
	}
	else{
		VOLUME = p.createButton('');
		VOLUME.class('btn btn-light bi bi-volume-mute');
		VOLUME.attribute('title', 'Sound off');
	}
	VOLUME.parent("audio");
	VOLUME.style("font-size: 40px; border: none; background-color: transparent; color: " + document.body.style.color); 
	VOLUME.style("border-radius: 10px; height: 60px; width: 60px;");
	VOLUME.style("display: flex; align-items: center; justify-content: center");
	VOLUME.position(cnv_div.offsetWidth-(document.getElementById("settings").style.display == "none"? 60 : 130), 5);
	VOLUME.mousePressed((e) => {
		e.preventDefault();
		if(audioon){
			VOLUME.class('btn btn-light bi bi-volume-mute');
			VOLUME.attribute('title', 'Sound off');
		}
		else{
			VOLUME.class('btn btn-light bi bi-volume-up');
			VOLUME.attribute('title', 'Sound on');
		}
		audioon = !audioon;
	});
	

	REGULAR2 = p.createButton('Normal');
	setButton(REGULAR2, "mode4", 'btn btn-info btn-sm mode1', 'text-align:center; font-size:10px;', regular.bind(null, 0));
	
	SPEEDMODE2 = p.createButton('Speed');
	setButton(SPEEDMODE2, "mode5", 'btn btn-info btn-sm mode1', 'text-align:center; font-size:10px;', speedmode.bind(null, 0));

	TIMEDMODE2 = p.createButton('Stat');
	setButton(TIMEDMODE2, "mode6", 'btn btn-info btn-sm mode1', 'text-align:center; font-size:10px; border: none;', timedmode.bind(null, 0));

	MOVESMODE2 = p.createButton('Chal');
	setButton(MOVESMODE2, "mode8", 'btn btn-info btn-sm mode1', 'text-align:center; font-size:10px;', movesmode.bind(null, 0));
	if(modnum == 0)
	{
		ONEBYTHREE = p.createButton('1x3x3');
		setButton(ONEBYTHREE, "cube1", 'btn btn-info', allcubestyle, changeFour.bind(null, 0));

		SANDWICH = p.createButton('3x3x2');
		setButton(SANDWICH, "cube2", 'btn btn-info', allcubestyle, changeFive.bind(null, 0));

		CUBE3 = p.createButton('Plus Cube');
		setButton(CUBE3, "cube3", 'btn btn-info', allcubestyle, changeSix.bind(null, 0));

		CUBE4 = p.createButton(isthin ? 'Xmas 3x3' : 'Christmas 3x3');
		setButton(CUBE4, "cube4", 'btn btn-info', allcubestyle, changeSeven.bind(null, 0));

		CUBE5 = p.createButton(isthin ? 'Xmas 2x2' : 'Christmas 2x2');
		setButton(CUBE5, "cube5", 'btn btn-info', allcubestyle, change8.bind(null, 0));

		CUBE6 = p.createButton('Jank 2x2');
		setButton(CUBE6, "cube6", 'btn btn-info', allcubestyle, change10.bind(null, 0));

		CUBE13 = p.createButton('Sandwhich Cube');
		setButton(CUBE13, "cube13", 'btn btn-info', allcubestyle, change17.bind(null, 0));

		CUBE15 = p.createButton('2x2x3');
		setButton(CUBE15, "cube15", 'btn btn-info', allcubestyle, change19.bind(null, 0));
	}
	else if (modnum == 1) {
		CUBE7 = p.createButton('Slice Bandage');
		setButton(CUBE7, "cube7", 'btn btn-info', allcubestyle, change11.bind(null, 7, [[3,4,5,6,7,8]]));

		CUBE8 = p.createButton('The Pillars');
		setButton(CUBE8, "cube8", 'btn btn-info', allcubestyle, change12.bind(null, 8, [[0,3,6], [2,5,8]]));

		CUBE9 = p.createButton('Triple Quad');
		setButton(CUBE9, "cube9", 'btn btn-info', allcubestyle, change13.bind(null, 9, [[7,8,5,4],[16,15,12],[25,26,23,22]]));

		CUBE10 = p.createButton('Bandaged 2x2');
		setButton(CUBE10, "cube10", 'btn btn-info', allcubestyle, change14.bind(null, 10, [[6,8]]));

		CUBE11 = p.createButton('Z Perm');
		setButton(CUBE11, "cube11", 'btn btn-info', allcubestyle, change15.bind(null, 11, [[0,9], [20,11], [24,15], [8,17]]));

		CUBE12 = p.createButton('T Perm');
		setButton(CUBE12, "cube12", 'btn btn-info', allcubestyle, change16.bind(null, 12, [[0,9], [2,11], [24,15], [26,17]]));

		CUBE14 = p.createButton('Cube Bandage');
		setButton(CUBE14, "cube14", 'btn btn-info', allcubestyle, change18.bind(null, 14, [[3,4,6,7,12,13,15,16]]));

		CUBE16 = p.createButton('Bandaged 3x3x2');
		setButton(CUBE16, "cube16", 'btn btn-info', allcubestyle, change20.bind(null, 16, [[0,1], [24,25]]));
	} else {
		FOURBYFOUR = p.createButton('4x4');
		setButton(FOURBYFOUR, "4x4", 'btn btn-info', allcubestyle, () => {switchSize(4); FOURBYFOUR.style('background-color', "#8ef5ee");});

		FIVEBYFIVE = p.createButton('5x5');
		setButton(FIVEBYFIVE, "5x5", 'btn btn-info', allcubestyle, () => {switchSize(5); FIVEBYFIVE.style('background-color', "#8ef5ee");});

		ONEBYFOURBYFOUR = p.createButton('1x4x4');
		setButton(ONEBYFOURBYFOUR, "1x4x4", 'btn btn-info', allcubestyle, () => {switchSize(5, "1x4x4", "1x4x4", "3x3x2"); ONEBYFOURBYFOUR.style('background-color', "#8ef5ee");});

		TWOBYTWOBYFOUR = p.createButton('2x2x4');
		setButton(TWOBYTWOBYFOUR, "2x2x4", 'btn btn-info', allcubestyle, () => {switchSize(4, "2x2x4"); TWOBYTWOBYFOUR.style('background-color', "#8ef5ee");});

		TWOBYTHREEBYFOUR = p.createButton('2x3x4');
		setButton(TWOBYTHREEBYFOUR, "2x3x4", 'btn btn-info', allcubestyle, () => {switchSize(5, "2x3x4", "3x2x4", "3x3x2"); TWOBYTHREEBYFOUR.style('background-color', "#8ef5ee");});

		THREEBYTHREEBYFOUR = p.createButton('3x3x4');
		setButton(THREEBYTHREEBYFOUR, "3x3x4", 'btn btn-info', allcubestyle, () => {switchSize(5, "3x3x4", "4x3x3", "3x3x2"); THREEBYTHREEBYFOUR.style('background-color', "#8ef5ee");});

		THREEBYTHREEBYFIVE = p.createButton('3x3x5');
		setButton(THREEBYTHREEBYFIVE, "3x3x5", 'btn btn-info', allcubestyle, () => {switchSize(5, "3x3x5"); THREEBYTHREEBYFIVE.style('background-color', "#8ef5ee");});

		LASAGNA = p.createButton('Earth Cube');
		setButton(LASAGNA, "lasagna", 'btn btn-info', allcubestyle, () => {switchSize(4, "lasagna"); LASAGNA.style('background-color', "#8ef5ee");});
	}

}
function iddefault() {
	reSetup();
	TOPWHITE.value(localStorage.topwhite);
	topWhite();
	if (MODE == "paint") {
		paintmode();
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
	const moveMap = getMove(MAXX, CUBYESIZE, SIZE)
	if (moveMap.hasOwnProperty(move)) {
		animate(moveMap[move][0], moveMap[move][1], moveMap[move][2], timed);
		return;
	}
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
				changeArr("R U' R' U' F2 U' R U R' U F2");

				
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
				if(layout[0][2][1][0] == colorTwo && layout[3][1][0][0] == colorThree) {
					changeArr("R' D' R");
				} else if(layout[4][2][1][0] == colorThree && layout[3][0][1][0] == colorTwo) changeArr("F D F'");
				else if(layout[5][2][1][0] == colorThree && layout[3][2][1][0] == colorTwo) {
					changeArr("F D2 F'");
				} 
				else if(layout[1][2][1][0] == colorTwo && layout[3][1][2][0] == colorThree) {
					changeArr("R' D2 R");
				}
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

document.getElementById('colorPicker').addEventListener('input', (event) => {
	document.body.style.backgroundColor = event.target.value;
});

document.getElementById('colorPicker2').addEventListener('input', (event) => {
	let hoveredColor = p.color(event.target.value).levels;
	if (getCubyIndexByColor2(hoveredColor) == false) {
		BACKGROUND_COLOR = event.target.value;
	}
	document.getElementById('colorPicker2').value = BACKGROUND_COLOR;
	reSetup();
});
document.getElementById('colorPicker3').addEventListener('input', (event) => {
	document.body.style.color = event.target.value;
	reSetup();
});

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function stringrgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);  // This extracts the 3 numbers from 'rgb(r, g, b)'

    if (rgbValues) {
        const r = parseInt(rgbValues[0], 10);
        const g = parseInt(rgbValues[1], 10);
        const b = parseInt(rgbValues[2], 10);
        
        return rgbToHex(r, g, b);
    }

    return null;  // In case backgroundColor is not set
}

function setColors(a, b, c, d) {
	document.body.style.backgroundColor = a;
	BACKGROUND_COLOR = b;
	document.body.style.color = c;
	special[4] = d;
	document.getElementById("colorPicker").value=a;
	document.getElementById("colorPicker2").value=b;
	document.getElementById("colorPicker3").value=c;
	document.getElementById("colorPicker4").value=d;
	p.background(BACKGROUND_COLOR);
}
function darkMode(){
	if(!darkmode){
		savedark[0] = document.body.style.backgroundColor == '' ? "#d6f1ff" : stringrgbToHex(document.body.style.backgroundColor);
		savedark[1] = BACKGROUND_COLOR;
		savedark[2] = document.body.style.color  == '' ? "#0a1970" : stringrgbToHex(document.body.style.color);
		BACKGROUND_COLOR = "#050505"
		document.body.style.backgroundColor = "#050505";
		document.body.style.color = "#add8e6";
		document.getElementById("colorPicker").value="#050505";
		document.getElementById("colorPicker2").value="#050505";
		document.getElementById("colorPicker3").value="#add8e6";
		darkmode = true;
	}
	else{
		document.body.style.backgroundColor = savedark[0];
		BACKGROUND_COLOR = savedark[1];
		document.body.style.color = savedark[2];
		document.getElementById("colorPicker").value=savedark[0];
		document.getElementById("colorPicker2").value=savedark[1];
		document.getElementById("colorPicker3").value=savedark[2];
		darkmode = false;
		// reSetup();
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
	layout = new Array(6).fill(null).map(() => new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(0)))
	let temp = [];
	cubyColors = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	//left, right, top, bottom, back, front
	let axis = ["z", "z", "x", "x", "y", "y"];
	let row = [-MAXX, MAXX, -MAXX, MAXX, -MAXX, MAXX];
	let pos = ["back", "front", "right", "left", "bottom", "top"];
	for(let h = 0; h < row.length; h++)
	{
		for(let i = 0; i < SIZE * SIZE * SIZE; i++)
		{
			if(CUBE[i][axis[h]] == row[h])
			temp.push(i);
		}
		let temp2 = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
		let mapAxisToCoords = {};
		let cnt = 0;
		for (let i = -MAXX; i <= MAXX; i += CUBYESIZE) {
			mapAxisToCoords[i] = cnt;
			++cnt;
		}
		for(let i = 0; i < SIZE * SIZE; i++)
		{
			let temp3 = CUBE[temp[i]];
			//console.log((temp3.x*0.02+1) + " " + (temp3.y*0.02+1));
			let array = [];
			if(axis[h] == "z")
			temp2[mapAxisToCoords[temp3.x]][mapAxisToCoords[temp3.y]] = temp[i];
			if(axis[h] == "x")
			temp2[mapAxisToCoords[temp3.y]][mapAxisToCoords[temp3.z]] = temp[i];
			if(axis[h] == "y")
			temp2[mapAxisToCoords[temp3.x]][mapAxisToCoords[temp3.z]] = temp[i];
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
	if (SIZE > 3)
		return;
	if(Array.isArray(DIM) && DIM[0] != "adding") return;
	for(let i = 0; i < 6; i++)
	{
		for(let x = 0; x < SIZE; x++)
		{
			for(let y = 0; y < SIZE; y++)
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
	opposite["k"] = "k";
	
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
	if (!color) {
		return false;
	}
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
	if(["normal","cube","timed"].includes(MODE) || pllpracstep > 0){
		movesarr.pop();
		mo5.pop();
		ao5.pop();
		if (mo5.length >= 5) {
			ao5.splice(0, 0, mo5[mo5.length - 5]);
		}
	}
}
function hollowCube(adjust = false){
	if(HOLLOW.checked()){
		special[0] = true;
		// adjust && (special[1] = 0.1);
		special[3] = 3;
		BORDER_SLIDER.value(special[1]);
		GAP_SLIDER.value(3);
	}
	else{
		special[0] = false;
		// adjust && (special[1] = 0.3);
		special[3] = 0;
		BORDER_SLIDER.value(special[1]);
		GAP_SLIDER.value(0);
	}
	reSetup();
}
function topColor() {
	return allcubies[4][5];
}
function topWhite(){
	allcubies = IDtoReal(IDtoLayout(decode(colorvalues[TOPWHITE.value()[0].toLowerCase()])));
	reSetup();
}
function testAlg(){
	if(document.getElementById("test_alg_span").innerHTML == "Paste ID here:"){
		try {
			allcubies = IDtoReal(IDtoLayout(decode(inp.value())));
			reSetup();
			setLayout();
			successSQL("Position ID Saved");
		} catch(e){

		}
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
		else if(inp.value()[0].toLowerCase() == "p")
		{
			let shortpll = inp.value().substring(1);
			changeArr(obj2[shortpll][1])
		} else if(inp.value()[0].toLowerCase() == "o") {
			let shortoll = inp.value().substring(1);
			changeArr(olls[shortoll][1])
		} else {
			changeArr(inp.value());
		}
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
	// if(layout[2][1][1][0] != "w") return;
	let hoveredColor;
	if(p.touches.length == 0) {
		hoveredColor = p.get(p.mouseX, p.mouseY);
	} else {
		let xx = p.touches[0].x;
		let yy = p.touches[0].y;
		hoveredColor = p.get(xx, yy);
	}
	if (hoveredColor && arraysEqual(hoveredColor, p.color(BACKGROUND_COLOR).levels)) {
		touchrotate[2] = true;
		touchrotate[0] = p.touches[0].x;
		touchrotate[1] = p.touches[0].y;
		touchrotate[3] = touchrotate[0];
		touchrotate[4] = touchrotate[1];
		// alert("settings " + touchrotate[0] + " " + touchrotate[1])
		// alert(touchrotate[0] + " " + touchrotate[1]);
	} else {
		touchrotate[2] = false;
	}
	//alert(xx + " " + yy + " length is " + p.touches.length);
	// let deez = p.get(xx, p.windowHeight * WINDOW - yy);
	
	//alert(deez);
	//alert(getColor(deez));
	
	startAction();
}

p.touchEnded = () => {
	if (touchrotate[2] && !["paint"].includes(MODE)) {
		let xx = touchrotate[3];
		let yy = touchrotate[4];
		let difx = touchrotate[0] - xx;
		let dify = touchrotate[1] - yy;
		// alert(touchrotate[0] + " " + touchrotate[1] + " " + touchrotate[3] + " " + touchrotate[4] + " " + difx + " " + dify);
		const sensitivity = 25;
		if (Math.abs(difx) > sensitivity || Math.abs(dify) > sensitivity) {
			if (difx > sensitivity && Math.abs(difx) >= Math.abs(dify)) {
				changeArr("y");
			} else if (difx < -1 * sensitivity && Math.abs(difx) >= Math.abs(dify)) {
				changeArr("y'");
			} else if (dify > sensitivity) {
				changeArr("x");
			} else {
				changeArr("x'");
			}
			multiple(0, true);
		}
	}
	touchrotate[2] = false;
	if(MODE == "speed" && race > 1 && timer.getTime() == 0 && !shuffling){
		canMan = true;
		solveCube();
	}
}
function isTouchingGrayArea(x, y) {
    // Define gray area bounds (update based on your app's layout)
    const grayArea = document.getElementById("cnv_div"); // ID for the gray area
    const rect = grayArea.getBoundingClientRect();

    return x >= rect.left &&
           x <= rect.right &&
           y >= rect.top &&
           y <= rect.bottom;
}

p.mouseDragged = () => {
	dragAction();
}
p.touchMoved = () => {
	if (touchrotate[2]) {
		let xx = p.touches[0].x;
		let yy = p.touches[0].y;
		touchrotate[3] = xx;
		touchrotate[4] = yy;
	}
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
	if(!canMan)
	return;
	if(cuby1 == cuby2 && getColor(color1) == getColor(color2))
	return;
	if(Array.isArray(DIM) && DIM[0] == "adding") return; 
	if (cuby1 == -1 || cuby2 == -1) return;
	console.log("Drag that idiot", cuby1, color1, cuby2, color2);
	let bad5 = [];
	let mid = mids[SIZE];
	let setup = [CUBE[mid].x, CUBE[mid].y, CUBE[mid].z];
	console.log("setup is ", setup)
	if(setup[0] == -MAXX || setup[0] == MAXX) //top
		bad5 = ['L','R','F','B','S','M','l','r','f','b'];
	else if(setup[2] == -MAXX || setup[2] == MAXX) //left
		bad5 = ['U','D','F','B','E','S','u','d','f','b'];
	else bad5 = ['L','R','U','D','E','M','l','r','u','d']; // front

	const xaxis = SIZE > 4 ? ["L'", "l'", "M'", "r", "R"] :
	SIZE == 4 ? ["L'", "l'", "r", "R"] : ["L'", "M'", "R"];
	const yaxis = SIZE > 4 ? ["U'", "u'", "E", "d", "D"] :
	SIZE == 4 ? ["U'", "u'", "d", "D"] : ["U'", "E", "D"];
	const zaxis = SIZE > 4 ? ["B'", "b'", "S", "f", "F"] :
	SIZE == 4 ? ["B'", "b'", "f", "F"] : ["B'", "S", "F"];

	let turnorder = [];
	for (let i = -MAXX; i <= MAXX; i+=CUBYESIZE) {
		turnorder.push(i); // [-75,-25,25,75]
	}
	let revturnorder = turnorder.slice().reverse();
	
	let turning = false;
	let face1 = getFace(cuby1, color1);
	let face2 = getFace(cuby2, color2);

	if (cuby1 == cuby2) { // turning over
		console.log("Equal cubies")
		arr = [];
		const vec1 = [CUBE[cuby1].x, CUBE[cuby1].y, CUBE[cuby1].z];
		const vec2 = [CUBE[cuby2].x, CUBE[cuby2].y, CUBE[cuby2].z];
		const TURNARRS = [
		{dirs: [5, 2, 4, 3, 5], vec: 2, turn: xaxis, axis: 'z'},
		{dirs: [5, 1, 4, 0, 5], vec: 0, turn: yaxis, axis: 'x'},
		{dirs: [2, 1, 3, 0, 2], vec: 1, turn: zaxis, axis: 'y'},
		];
		let actions = [];
		TURNARRS.forEach((TURN) => {
			let index = TURN.dirs.indexOf(face1);
			let index2 = TURN.dirs.indexOf(face2);
			if (index != -1 && index2 != -1 && (TURN.dirs[index+1] == face2 || TURN.dirs[index2+1] == face1)) {
				turning = true;
				arr = [TURN.turn[(vec1[TURN.vec] + MAXX) / 50]];
				if (TURN.dirs[index2+1] == face1) {
					arr[0] = Inverse(arr[0]);
				}
			}
		})
	} else if (getFace(cuby1, color1) == getFace(cuby2, color2) && sharedAxis(cuby1, cuby2).timeshared > 1) {
		console.log("Same face cubies")
		let face1 = getFace(cuby1, color1);
		const TURNARR = [
			{axis: "z", turn: xaxis, faces:
			[{face: 5, order: revturnorder, upaxis: "x", lastaxis: "y"},
			{face: 2, order: revturnorder, upaxis: "y", lastaxis: "x"},
			{face: 4, order: turnorder, upaxis: "x", lastaxis: "y"},
			{face: 3, order: turnorder, upaxis: "y", lastaxis: "x"}]},

			{axis: "x", turn:yaxis, faces:
			[{face: 5, order: turnorder, upaxis: "z", lastaxis: "y"},
			{face: 1, order: revturnorder, upaxis: "y", lastaxis: "z"},
			{face: 4, order: revturnorder, upaxis: "z", lastaxis: "y"},
			{face: 0, order: turnorder, upaxis: "y", lastaxis: "z"}]},

			{axis: "y", turn:zaxis, faces:
			[{face: 2, order: turnorder, upaxis: "z", lastaxis: "x"},
			{face: 1, order: turnorder, upaxis: "x", lastaxis: "z"},
			{face: 3, order: revturnorder, upaxis: "z", lastaxis: "x"},
			{face: 0, order: revturnorder, upaxis: "x", lastaxis: "z"}]},
	
		];
		let good = false;
		TURNARR.forEach((FACE) => {
			if (CUBE[cuby1][FACE.axis] == CUBE[cuby2][FACE.axis]) {
				FACE.faces.forEach((f) => {
					if (face1 == f.face && !good && CUBE[cuby1][f.lastaxis] == CUBE[cuby2][f.lastaxis]) {
						turning = true;
						arr = [FACE.turn[(CUBE[cuby1][FACE.axis] + MAXX) / 50]]
						let index = f.order.indexOf(CUBE[cuby1][f.upaxis]);
						let index2 = f.order.indexOf(CUBE[cuby2][f.upaxis]);
						if (index > index2) {
							arr[0] = Inverse(arr[0]);
						}
						good = true;
					}
				});
			}
		})
	} else if (sharedAxis(cuby1, cuby2) && sharedAxis(cuby1, cuby2).timeshared == 1 && !special[0] && DIM != "2x3x4") {
		const sharedata = sharedAxis(cuby1, cuby2);
		const TURNOBJ = {
			z: {compare: ["x", "y"], vec: 2, turn: xaxis},
			x: {compare: ["y", "z"], vec: 0, turn: yaxis},
			y: {compare: ["z", "x"], vec: 1, turn: zaxis},
		};
		let compare = TURNOBJ[sharedata.axis].compare;
		arr = [TURNOBJ[sharedata.axis].turn[(sharedata.row + MAXX) / CUBYESIZE]];
		const x1 = CUBE[cuby1][compare[1]], y1 = CUBE[cuby1][compare[0]];
		const x2 = CUBE[cuby2][compare[1]], y2 = CUBE[cuby2][compare[0]];
		let dotproduct = x1 * y2 - y1 * x2
		console.log("dot product is ", dotproduct);
		if (dotproduct == 0) {
			let willinverse = false;
			let numzero = +(CUBE[cuby1].x == 0) + +(CUBE[cuby1].y == 0) + +(CUBE[cuby1].z == 0)
			if (numzero > 1) {
				[cuby1, cuby2] = [cuby2, cuby1];
				[color1, color2] = [color2, color1];
				[face1, face2] = [face2, face1];
				willinverse = true;
			}
			const direction = {
				0: {compare: ["x","y"], x : [4, 5], y: [2, 3]},
				1: {compare: ["x","y"], x : [4, 5], y: [2, 3]},
				2: {compare: ["y","z"], y : [0, 1], z: [4, 5]},
				3: {compare: ["y","z"], y : [0, 1], z: [4, 5]},
				4: {compare: ["x","z"], x : [0, 1], z: [2, 3]},
				5: {compare: ["x","z"], x : [0, 1], z: [2, 3]},
			}
			const dirobj = direction[face2];
			console.log(dirobj, getFace(cuby2, color2));
			let axis1 = dirobj.compare[0];
			let axis2 = dirobj.compare[1];
			let da = CUBE[cuby1][axis1] - CUBE[cuby2][axis1];
			let db = CUBE[cuby1][axis2] - CUBE[cuby2][axis2];
			let realaxis, reald;
			if (da != 0) {
				realaxis = axis1;
				reald = da; 
			} else if (db != 0) {
				realaxis = axis2;
				reald = db; 
			}
			if (face1 == face2) {
				console.log("Same faces ", getFace(cuby2, color2));
				const BANNED = {
					0: "z", 1: "z", 2: "x", 3: "x", 4: "y", 5: "y"
				}
				if (CUBE[cuby1][BANNED[face1]] == CUBE[cuby2][BANNED[face1]]) {
					return false;
				}
			}
			const g = (x, y) => x > y;
			const l = (x, y) => x < y;
			const DIAGOBJ = {
				0: {x : l, y : g},
				1: {x : g, y : l},
				2: {y : l, z : g},
				3: {y : g, z : l},
				4: {x : g, z : l},
				5: {x : l, z : g},
			};
			let func = DIAGOBJ[face2][realaxis];
			if (func(reald, 0)) {
				arr[0] = Inverse(arr[0]);
			}
			if (willinverse) {
				arr[0] = Inverse(arr[0]);
			}
		} else if (dotproduct > 0) {
			arr[0] = Inverse(arr[0]);
		}
		turning = true;
	}
	if (turning) {
		if(INPUT.value() == "Double Turns")
			arr.push(arr[0]);
		if(INPUT.value() == "3x3x2" && bad5.includes(arr[0][0]))			
			arr.push(arr[0]);
		if(INPUT.value() == "Gearcube") {
			if (['M', 'S', 'E','l','r','u','d','f','b'].includes(arr[0][0])) {
				arr = [];
			} else {
				arr.unshift(toGearCube(arr[0]));
			}
		}
		if(INPUT.value() == "Gearcube II") {
			if (['M', 'S', 'E','l','r','u','d','f','b'].includes(arr[0][0])) {
				arr = []
			} else {
				arr.push(arr[0]);
				console.log(arr[0][0])
				console.log(opposite2[arr[0][0]] + (arr[0].includes("'") ?  "" : "'"))
				arr.push(opposite2[arr[0][0]] + (arr[0].includes("'") ?  "" : "'"));
			}
		}
		alldown = false;
		multiple(0, true);
		selectedCuby = -1;
		selectedColor = [];
		return true;
	}
	return false;
}
function toGearCube(move){
	if(move.length == 2){
		return move[0] + "w'";
	}
	return move + "w";
}
p.windowResized = resized;
function resized(){
	let cnv_div = document.getElementById("cnv_div");
    setWidth(); // Ensure UI elements are adjusted
    const isMobile = window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches;
    const WINDOW = isMobile ? 0.6 : 0.9;
    const width = DEBUG ? (p.windowWidth / 2) : cnv_div.offsetWidth;
    const height = window.innerHeight * WINDOW;
    p.resizeCanvas(width, height, p.WEBGL);
    PICKER.buffer.resizeCanvas(width, height);
	SOLVE.html(window.matchMedia("(max-width: " + MAX_WIDTH + ")").matches ? 'Solve' : 'Autosolve');
	if (MODE == "normal") {
		if (ismid) {
			setDisplay("none", ["or_instruct", "or_instruct2"]);
		} else {
			setDisplay("block", ["or_instruct", "or_instruct2"]);
		}
	}
	refreshButtons();
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

		if (arraysEqual(hoveredColor, p.color(BACKGROUND_COLOR).levels)) {
            return; // Skip further event handling to allow scrolling
        }
	}
	
	if (hoveredColor && getCubyByColor(hoveredColor) && !(p.mouseIsPressed && p.touches.length == 0)) {
		CAM.removeMouseListeners();
	} else {
		if(arraysEqual(hoveredColor, p.color(BACKGROUND_COLOR).levels))
		{
			if(p.touches.length == 0) {
				CAM.attachMouseListeners();
			}
		
		}
	}
	
	CAM_PICKER.setState(CAM.getState(), 0);
	
	renderCube();
}
function getFace(cuby1, color1)
{
	const dirs = {"left":3, "right":2, "top":5, "bottom":4, "front":1, "back":0}
	let dir = null;
	Object.keys(dirs).forEach((d) => {
		if (!CUBE[cuby1] || !CUBE[cuby1].hasOwnProperty(d)) return;
		if (getColor(CUBE[cuby1][d].levels) == getColor(color1)) {
			dir = dirs[d];
		}
	})
	return dir;
	/*for(let i = 0; i < 6; i++)
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
	}*/
	return;
}
function sharedAxis(cuby1, cuby2) {
	let obj = false;
	let timeshared = 0;
	["x", "y", "z"].forEach((row) => {
		if (CUBE[cuby1][row] == CUBE[cuby2][row]) {
			timeshared++;
			obj = {axis: row, row: CUBE[cuby2][row], timeshared: timeshared};
		}
	})
	if (obj) {
		console.log("Returning", obj)
		return obj;
	}
	return false;
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
					CUBE[i].show(SIZE);
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
					CUBE[i].show(SIZE);
				}
			} else {
				CUBE[i].show(SIZE);
			}
		}
	}
$(document).on("keypress", "#test_alg_div", function(e){ //enter
	if(e.which == 13){
		testAlg();
	}
});
$(document).on("keypress", "#join_input", function(e){ //enter
	if(e.which == 13){
		joinRoom();
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
function uniform(dir) {
	let base = 0;
	for (let x = -MAXX; x <= MAXX; x += CUBYESIZE) {
		let numcubies = 0;
		for (let y = -MAXX; y <= MAXX; y += CUBYESIZE) {
			for (let z = -MAXX; z <= MAXX; z += CUBYESIZE) {
				let cuby;
				if (dir == "x") {
					cuby = getCubyFromPos(x, y, z);
				}
				if (dir == "y") {
					cuby = getCubyFromPos(z, x, y);
				}
				if (dir == "z") {
					cuby = getCubyFromPos(y, z, x);
				}
				numcubies += cuby != -1 ? 1 : 0;
			}
		}
		console.log(numcubies);
		if (base == 0) {
			base = numcubies;
		} else if (base != numcubies && numcubies != 0) {
			return false;
		}
	}
	return true;
}
function isCube() { // only works with no adjustments like the 2x2x3
	let base = 0;
	return uniform("x") && uniform("y") && uniform("z");
}
function isSolved()
{
	if([13, "lasagna"].includes(DIM)) {
		for(let i = 0; i < 6; i+=2){
			let same = true;
			let onecolor = layout[i][0][0][0];
			let othercolor = layout[i+1][0][0][0];
			for(let x = 0; x < SIZE; x++){
				for(let y = 0; y < SIZE; y++){
					if(layout[i][x][y][0] != onecolor) same = false;
					if(layout[i+1][x][y][0] != othercolor) same = false;
				}
			}
			if(same){
				return true;
			}
		}
		return false;
	} else {
		let cubies = getOuterCubes();
		let cuby = cubies[0];
		let top = getColor(CUBE[cuby].right.levels);
		let bottom = getColor(CUBE[cuby].left.levels);
		let back = getColor(CUBE[cuby].bottom.levels);
		let front = getColor(CUBE[cuby].top.levels);
		let right = getColor(CUBE[cuby].front.levels);
		let left = getColor(CUBE[cuby].back.levels);
		if (custom != 1) {
			if (top == 'k' || !top) top = opposite[bottom];
			if (bottom == 'k'|| !bottom) bottom = opposite[top];
			if (back == 'k'|| !back) back = opposite[front];
			if (front == 'k'|| !front) front = opposite[back];
			if (right == 'k'|| !right) right = opposite[left];
			if (left == 'k'|| !left) left = opposite[right];
		}
		if((Array.isArray(DIM) && DIM[0] != "adding" && (DIM4 == 2 || goodsolved))) {
			if (cubies.length <= 1) return true;
		}
		let solved = true;
		for(let i = 0; i < cubies.length; i++)
		{
			let curindex = cubies[i];
			const compare = {
				top: [top, getColor(CUBE[curindex].right.levels)],
				bottom: [bottom, getColor(CUBE[curindex].left.levels)],
				back: [back, getColor(CUBE[curindex].bottom.levels)],
                front: [front, getColor(CUBE[curindex].top.levels)],
                right: [right, getColor(CUBE[curindex].front.levels)],
                left: [left, getColor(CUBE[curindex].back.levels)],
			}
			const neighbors = getNeighborsArr(curindex);
			const map = {"bottom":0, "top":1, "front":2, "back":3, "right":4, "left":5}
			for (let dir in compare) {
				if (custom != 1 && (compare[dir][1] == "k" || !compare[dir][1])) continue;
				if (neighbors[map[dir]] != -1) continue;
				if (compare[dir][0] == "k") {
					compare[dir][0] = compare[dir][1];
					continue;
				}
				if (compare[dir][0] != compare[dir][1]) {
					return false;
				}
			}
        }
		return true;
	}
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
	BACKGROUND_COLOR = "#e7e5ff";
	document.body.style.backgroundColor = "#d6f1ff";
	document.body.style.color = "#0a1970";
	document.getElementById("colorPicker").value="#d6f1ff";
	document.getElementById("colorPicker2").value="#e7e5ff";
	document.getElementById("colorPicker3").value="#0a1970";
	document.getElementById("colorPicker4").value="#000000";
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
getEl("compete_rounds").addEventListener("input", function () {
	this.value = parseInt(this.value);
    if (this.value != "" && this.value <= 0 || isNaN(this.value)) {
        this.value = 1;
    }
	competeSettings();
});
function arrowPaint(dir) {
	if (dir == "left") {
		if (colorindex > 0) {
			if (p.keyIsDown(p.SHIFT)) {
				if (colorindex < 9) paintit("original", -colorindex);
				else paintit("original", -(colorindex % 9 + 1));
			} else {
				paintit("original", -1);
			}
		}
	}
	if (dir == "right") {
		if (colorindex < 54) {
			if (p.keyIsDown(p.SHIFT)) paintit("original", 9 - colorindex % 9);
			else paintit("original");
		}
	}
	if (dir == "down") {
		if (colorindex < 54) {
			if (p.keyIsDown(p.SHIFT)) paintit("original", 9 - colorindex % 9)
			else if (colorindex % 9 < 6) paintit("original", 3);
			else paintit("original", 9 - colorindex % 9);
		} 
	}
	if (dir == "up") {
		if (colorindex > 0) {
			if (p.keyIsDown(p.SHIFT)) {
				if (colorindex < 9) paintit("original", -colorindex);
				else paintit("original",-(colorindex % 9 + 1));
			}
			else if (colorindex < 3) paintit("original", -colorindex);
			else if (colorindex % 9 > 2) paintit("original", -3);
			else paintit("original", -(colorindex % 9 + 1));
		} 
	}
}
document.getElementById("bannercube").addEventListener("click", function(event) { //news
    event.preventDefault();
    competemode();
});
document.addEventListener("keydown", (event) => { //paint hotkey
	if (MODE == "paint" && (!activeKeys || (activeKeys.size < 2 || (p.keyIsDown(p.SHIFT) && activeKeys.size < 3)))) {
		if (event.key === "r" || event.key === "R") paintit("red");
		if (event.key === "o" || event.key === "O") paintit("orange");
		if (event.key === "y" || event.key === "Y") paintit("yellow");
		if (event.key === "g" || event.key === "G") paintit("green");
		if (event.key === "b" || event.key === "B") paintit("blue");
		if (event.key === "w" || event.key === "W") paintit("white");
		if (event.key == "ArrowLeft") arrowPaint("left");
		else if (event.key == "ArrowRight") arrowPaint("right");
		else if (event.key == "ArrowDown" && colorindex < 54) arrowPaint("down");
		else if (event.key == "ArrowUp") arrowPaint("up");
	}
});
let activeKeys = new Set();
document.onkeyup = function(e) { //space
	if (e.keyCode == 32 && getEl("outertime").style.color == "green") {
		getEl("outertime").style.color = document.body.style.color;
		if(MODE == "speed" && race > 1 && timer.getTime() == 0 && !shuffling){
			canMan = true;
			solveCube();
		}
	}
	activeKeys.delete(e.code);
}
document.onkeydown = function(event) {
	activeKeys.add(event.code);
	if(activeKeys.size === 1 && activeKeys.has('Space') && MODE == "speed" && document.getElementById("s_RACE2").style.display == "block"){
		speedRace2();
	} else if (event.keyCode == 13) { //enter
		if (getEl("s_start").style.display == "block") {
			practicePLL();
		} else if (getEl("okban").style.display == "block") {
			doneBandage();
		} else if (getEl("finishpaint").style.display == "block" && MODE == "paint") {
			finishpaint();
		} else if (getEl("s_start").style.display == "block") {
			practicePLL();
		} else if (getEl("readybot").style.display == "block") {
			speedRace2();
		} else if (getEl("startmatch").style.display == "block") {
			startMatch();
		} else if (getEl("creating_match").style.display == "block") {
			finishMatch();
		} else if (getEl("continuematch").style.display == "block") {
			continueMatch();
		}
	} else if (event.keyCode == 27) { //escape
		if (getEl("okban").style.display == "block") {
			cancelBandage();
		}
	}
}
document.getElementById('account').addEventListener('click', function() {
	document.getElementById('l_forgot').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('login').addEventListener('click', function() {
	document.getElementById('l_forgot').scrollIntoView({ behavior: 'smooth' });
});
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
/*
Mo50 virtual
71.80 moves
71.34
71.22
70.78
70.20
69.16
66.60
66.04
65.56
64.48
Mo50 virtual 2x2: 34.34, 33.08, 29.84, 28.26
Jaden WR 4x4: 139.71
Jaden WR 3x3: 25.4, 20.9, 19.7, 16.6, 16.07, 13.73, 11.3
Jaden WR 2x2: 3.88
3x3 PLL Attack: 6.9, 6.84, 6.2, 5.01
3x3 OLL Attack: 4.66, 4.31, 3.2, 3.06
3x3 Easy: 0.8, 0.52s
3x3 Medium: 15.4s, 13.58s
3x3 Easy: 1.4s
FMC: 193
Shape Mod All (3x3x2 in 3x3x2 mode): 234.85, 125.58s, 123.2s, 116.1, 91.27, 85.90, 60.69
Bandage Mod ALL: 672.28
Blind Marathon All: 13
ALL MARATHONS
Cube 	Speed 	Blind
3x3x2	12.65	4
2x2x3	1.64 	2		
3x3x1	6.16	1
Jank	12.04	1
Plus	1.17	0
Xmas3	13.89	4
Xmas2	4.86	0
Sand	8.28	1

*/

//BELOW 51 MOVES
// D R' B' L2 F D2 F2 L2 U2 F' U B' U B2 D2 (50)
// F2 R2 D R2 D' F2 L2 D2 B R U' L U2 F2 L' (50)
//  2)se$ÞG 17Þn6i~ 5HK8løå  (48)
// F2 R' D' B2 L' F D' L2 B R2 U2 R' D L' D2 F' L2 B (48)
// F2 U2 R2 D F2 L B' L' B R2 U F' D L F2 U2 B D2 (47)
// F2 U' L2 D2 R2 F2 R' F U' B' D' R U B2 R D' B2 R (47)
// R2 U2 B2 U' R' F' D2 L2 F' D2 R2 B' R2 D2 F2 L2 F' L2 (46)
// L2 F2 R2 B' U L' U' B U' R B2 U2 F2 L2 B U2 R2 D' (46)
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

I see plants that grow so tall
I see harvest in the fall
But to keep the plants a growing
Theres lots you should be knowing

If your gonna keep your garden
Youve gotta tend your garden
If you want to keep your garden in the green

7:25

I may not be a people but I live on farmlands too
If I don't get my greens and grains there'd be no milk for you
So the next time you are eating and you'd like to drink some moo
Just think about this song and how the moo juice gets to you

First the farmer grows the grass and grains that moo cows like the best
Wheat, corn, hay, and rye are better than the rest
Barns, sheds, and silos and the right home all along
It keeps me strong and healthy so I can sing this song

She may not be a people but she lives on farmlands too
If I don't get my greens and grains there'd be no milk for you
So the next time you are eating and you'd like to drink some moo
Just think about this song and how the moo juice gets to you

All day long I chew my cud as any cow would do
Until the grain has turned to milk my job is never through
Then it's off to the dairy where they turn the milk into
All the things you love to eat and drink (And they're all from me to you)

She may not be a people but she lives on farmlands too
If I don't get my greens and grains there'd be no milk for you
So the next time you are eating and you'd like to drink some moo
Just think about this song and how the moo juice gets to you

9:05
Mr Sunshine give us your rays
You're the one who brightens our days
Without your warmth there'll be no tommorow
Instead of smiling we'll cry tears of sorrow

Mr.Sunshine keep coming through
You know that we're counting on you
Your precious rays will brighten our days
Mr. Sunshine give us your rays/*


12:50

Start out with a seed
Plant it snuggly in the ground
Take a can of water and sprinkle all around
The sun comes out for warming the clouds will bring us rain
Stop the weeds from growing and the plants will be your friends

It's growing time in story land
All the plants have their done part
And now you know if you'll help them grow
They'll help to give your day a healthy start

We hope you had a good time at our show
And I hope you learned a lot from things I know
You've really been quite grand for our guest at storyland
And we surely hate to see you have to go

(repeat)

If you want to plant a garden on your very own
Our vegetables have shown you how they should be grown
Start off with our seeds and tend to all their needs
And we'll always be good eating in your home
*/ 