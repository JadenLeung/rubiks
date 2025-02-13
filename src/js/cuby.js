export default class Cuby {
  constructor(size, x, y, z, buff, picker, p, index, custom, special, SIZE) {
    //size = 50;
    this.cubysize = size;
    this.x = x;
    this.y = y;
    this.z = z;
    this.picker = picker;
    this.p = p;
	  this.index = index;
    this.stroke = 0.5;
    this.custom = custom;
    this.special = special;
    this.adjustedcolor = false;
    this.savecolors = {};
    this.shown = true;

	/*
    this.colors = {
      def: p.color(25, 25, 25, 255),
      white: p.color(250, 250, 250, 255),
      red: p.color(219, 18, 18, 255),
      blue: p.color(18, 105, 219, 255),
      orange: p.color(219, 125, 18, 255),
      green: p.color(18, 219, 31, 255),
      yellow: p.color(209, 219, 18, 255),
    }; */
    let xmul = SIZE % 2 == 1 ? this.x*0.02 : (this.x - 25) * 0.02;
    let ymul = SIZE % 2 == 1 ? this.y*0.02 : (this.y - 25) * 0.02;
    let zmul = SIZE % 2 == 1 ? this.z*0.02 : (this.z - 25) * 0.02;
	 this.colors = {
      def:   p.color(25 + xmul,  25 + ymul, 25 + zmul),
      white: p.color(250 + xmul, 250 + ymul, 250 + zmul),
      red:   p.color(219 + xmul, 25 + ymul,  25 + zmul),
      blue:  p.color(25 + xmul,  105 + ymul, 219 + zmul),
      orange:p.color(219 + xmul, 125 + ymul, 25 + zmul),
      green: p.color(25 + xmul,  219 + ymul, 31 + zmul),
      yellow:p.color(209 + xmul, 219 + ymul, 25 + zmul),
      black:p.color(25 + xmul,  25 + ymul, 25 + zmul),
      magenta:p.color(245 + xmul,  25 + ymul, 245 + zmul),
    };
    this.c = {
      def:   p.color(25 + xmul,  25 + ymul, 25 + zmul,),
      w: p.color(250 + xmul, 250 + ymul, 250 + zmul),
      r:   p.color(219 + xmul, 25 + ymul,  25 + zmul),
      b:  p.color(25 + xmul,  105 + ymul, 219 + zmul),
      o: p.color(219 + xmul, 125 + ymul, 25 + zmul),
      g: p.color(25 + xmul,  219 + ymul, 31 + zmul),
      y: p.color(209 + xmul, 219 + ymul, 25 + zmul),
      k: p.color(25 + xmul,  25 + ymul, 25 + zmul),
      m: p.color(245 + xmul,  25 + ymul, 245 + zmul),
    };
	
    this.top = this.colors.white; // Red
    this.bottom = this.colors.yellow; // Orange
    this.front = this.colors.red; // white
    this.right = this.colors.blue; // Green
    this.back = this.colors.orange; // yellow
    this.left = this.colors.green; // Blue

    // const dirs = {"left":3, "right":2, "top":5, "bottom":4, "front":1, "back":0}
    
    const opposite = [];
    opposite["g"] = "b";
    opposite["b"] = "g";
    opposite["y"] = "w";
    opposite["w"] = "y";
    opposite["o"] = "r";
    opposite["r"] = "o";

    if([4,5].includes(size) || (Array.isArray(size) && [4,5].includes(size[3])))
    {
      this.bottom = this.colors.white;
      this.right = this.colors.green;
      this.back = this.colors.red;
    }
    if ([6, "2x2x4", "3x3x5", "3x3x4", "1x4x4", "2x3x4"].includes(size) ||
        ["3x2x4", "4x3x3", "1x3x2"].includes(this.special[6])) { // rainbow
      this.back = this.c[this.custom[0][3]];
      this.front = this.c[this.custom[5][2]];
      this.bottom = this.c[this.custom[0][1]];
      this.top = this.c[this.custom[16][0]];
      this.right = this.c[this.custom[0][5]];
      this.left = this.c[this.custom[26][4]];
    } else if (SIZE >= 4 && custom) {
      let map = {};
      for (let x = 0; x < SIZE; ++x) {
        for (let y = 0; y < SIZE; ++y) {
          for (let z = 0; z < SIZE; ++z) {
            let mapx = x == 0 ? 0 : x == SIZE - 1 ? 2 : 1;
            let mapy = y == 0 ? 0 : y == SIZE - 1 ? 2 : 1;
            let mapz = z == 0 ? 0 : z == SIZE - 1 ? 2 : 1;
            map[x * SIZE * SIZE + y * SIZE + z] = mapx * 9 + mapy * 3 + mapz;

          }
        }
      }
      let mapped = map[this.index];
      this.top = this.c[custom[mapped][0]];
      this.bottom = this.c[custom[mapped][1]];
      this.front = this.c[custom[mapped][2]];
      this.back = this.c[custom[mapped][3]];
      this.left = this.c[custom[mapped][4]];
      this.right = this.c[custom[mapped][5]];
    } else if(SIZE == 3 && custom){
      const cond = ([4,5].includes(size) || (Array.isArray(size) && [4,5].includes(size[3])))
      if(cond && (custom[this.index][0] == "y" || custom[this.index][0] == "b" || custom[this.index][0] == "o")) this.top = this.c[opposite[custom[this.index][0]]];
      else this.top = this.c[custom[this.index][0]];
      if(cond && (custom[this.index][1] == "y" || custom[this.index][1] == "b" || custom[this.index][1] == "o")) this.bottom = this.c[opposite[custom[this.index][1]]];
      else this.bottom = this.c[custom[this.index][1]];
      if(cond && (custom[this.index][2] == "y" || custom[this.index][2] == "b" || custom[this.index][2] == "o")) this.front = this.c[opposite[custom[this.index][2]]];
      else this.front = this.c[custom[this.index][2]];
      if(cond && (custom[this.index][3] == "y" || custom[this.index][3] == "b" || custom[this.index][3] == "o")) this.back = this.c[opposite[custom[this.index][3]]];
      else this.back = this.c[custom[this.index][3]];
      if(cond && (custom[this.index][4] == "y" || custom[this.index][4] == "b" || custom[this.index][4] == "o")) this.left = this.c[opposite[custom[this.index][4]]];
      else this.left = this.c[custom[this.index][4]];
      if(cond && (custom[this.index][5] == "y" || custom[this.index][5] == "b" || custom[this.index][5] == "o")) this.right = this.c[opposite[custom[this.index][5]]];
      else this.right = this.c[custom[this.index][5]];

      if(size == 1 && this.index > 8) this.right = this.c[custom[this.index-9][5]];
      if(size == 1 && this.index < 18) this.left = this.c[custom[this.index+9][4]];

      if(size == 6 && this.index < 18) this.left = this.c[custom[this.index+9][4]];
      if(size == 6 && this.index > 2) this.bottom = this.c[custom[this.index-3][1]];
      if(size == 6 && this.index > 0) this.back = this.c[custom[this.index-1][3]];

    }
    if([2,15].includes(special[6]) || size == 1){ //rainbow
        const directions = ["back", "front", "bottom", "top", "right", "left"];
        const op = {back: "front", front: "back", bottom: "top", top:"bottom", right:"left", left:"right"};
        const opposite = {o:"r", r:"o", g:"b", b:"g", g:"b", y:"w", w:"y", k:"k"};
        let s = "";
        directions.forEach((dir) => {
          s += getColor(this[dir].levels);
        });

        const possible = [
          "orbgwy", "ywbgor", "robgyw", "wybgro",
          "rogbwy", "ywgbro", "orgbyw", "wygbor",
          "roywgb", "bgywro", "orywbg", "gbywor",
          "orwygb", "bgwyor", "rowybg", "gbwyro",
          "wyrogb", "bgrowy", "ywrobg", "gbroyw",
          "yworgb", "bgoryw", "wyorbg", "gborwy"
        ];
        let newstr = "";
        possible.forEach((p) => {
          let matches = true;
          for (let i = 0; i < p.length; ++i) {
            if (s[i] != "k" && s[i] != p[i]) {
              matches = false;
              break;
            }
          }
          if (matches) {
            newstr = p;
            return;
          }
        });
        if (newstr != "") {
          directions.forEach((d, index) => {
            this[d] = this.c[newstr[index]];
          })
        }
    }
    if([13, "lasagna"].includes(size)){
      let a = "";
      let c1 = this.custom[4][5];
      let c2 = opposite[c1];
      const directions = ["back", "front", "bottom", "top", "right", "left"];
      let colors = [];
      directions.forEach((dir) => {
        colors.push(getColor(this[dir].levels))
      });
      console.log(colors);
      if(colors.includes(c1)) a = this.colors.green;
      else if(colors.includes(c2)) a = size == "lasagna" ? this.colors.green : this.colors.blue;
      else {
        a = size == "lasagna" ? this.colors.blue : this.colors.orange;
      }
      this.top = a;
      this.bottom = a;
      this.front = a;
      this.right = a;
      this.back = a;
      this.left = a;
    }
    if(Array.isArray(size) && size[0] != "adding")
    {
      this.top = this.colors[size[2]];
      this.bottom = this.colors[size[5]];
      this.front = this.colors[size[3]];
      this.right = this.colors[size[0]];
      this.back = this.colors[size[1]];
      this.left = this.colors[size[4]];
    }
    if(Array.isArray(size) && size[0] == "adding")
    {
      if(size[1].includes(index))
      {
        this.top = this.colors.magenta;
        this.bottom = this.colors.magenta;
        this.front = this.colors.magenta;
        this.right = this.colors.magenta;
        this.back = this.colors.magenta;
        this.left = this.colors.magenta;
      }
      else if(size[1].length > 0){
        for(let i = 0; i < size[2].length; i++)
        {
          if(size[2][i].includes(index))
          {
            this.top = this.colors.black;
            this.bottom = this.colors.black;
            this.front = this.colors.black;
            this.right = this.colors.black;
            this.back = this.colors.black;
            this.left = this.colors.black;
          }
        }
      }
    }
    if(special[0] == true && this.special[6] != 2 && this.special[6] != 15 && this.size != 1){ //hollow
      ["back", "front", "bottom", "top", "right", "left"].forEach((c) => {
        if (getColor(this[c].levels) == "k") {
          this[c] = "";
        }
      })
    }

    this.buff_top = buff[2];
    this.buff_bottom = buff[3];
    this.buff_front = buff[0];
    this.buff_back = buff[1];
    this.buff_left = buff[4];
    this.buff_right = buff[5];


  }
  
  get(foo) {
    if (foo === 'x') {
      return this.x;
    }
    if (foo === 'y') {
      return this.y;
    }
    if (foo === 'z') {
      return this.z;
    }
  }

  setBlack(dx = 0) {
    const directions = ["back", "front", "bottom", "top", "right", "left"];
    directions.forEach((face) => {
      this[face] = this.p.color(25 + dx,  25 + dx, 25 + dx);
    })
  }

  setColor(c, variance) {
    if (!this.adjustedcolor)
      this.savecolors = {top: this.top, bottom: this.bottom, left: this.left, right: this.right, front: this.front, back: this.back};
    this.top = c;
    this.bottom = c;
    this.front = c;
    this.right = c;
    this.back = c;
    this.left = c;
    this.adjustedcolor = true;
  }
  setFaceColor(c, face) {
    this.savecolors = {top: this.top, bottom: this.bottom, left: this.left, right: this.right, front: this.front, back: this.back};
    this[face] = c;
  }
  originalFaceColor(face) {
    this[face] = this.savecolors[face];
    this.adjustedcolor = false;
  }
  originalColor() {
    ({ top: this.top, bottom: this.bottom, front: this.front, 
      right: this.right, back: this.back, left: this.left } = this.savecolors);
    this.adjustedcolor = false;
  }
  
  animating() {
    return Boolean(this.anim_axis && this.anim_angle && this.dir);
  }
  
  debug() {
    this.debugging = true;
    
    this.front = COLORS.def;
    this.back = COLORS.def;
    this.top = COLORS.def;
    this.bottom = COLORS.def;
    this.left = COLORS.def;
    this.right = COLORS.def;
  }
  
  syncColors(cuby) {   
    this.front = cuby.front;
    this.back = cuby.back;
    this.top = cuby.top;
    this.bottom = cuby.bottom;
    this.left = cuby.left;
    this.right = cuby.right;
    
    this.buff_front = cuby.buff_front;
    this.buff_back = cuby.buff_back;
    this.buff_top = cuby.buff_top;
    this.buff_bottom = cuby.buff_bottom;
    this.buff_left = cuby.buff_left;
    this.buff_right = cuby.buff_right;
  }
  
  rotateX(dir) { // switch all but LEFT / RIGHT
    const tmp = this.front;
    const buff_tmp = this.buff_front;
    
    if (dir === -1) {
      this.front = this.bottom;
      this.bottom = this.back;
      this.back = this.top;
      this.top = tmp;
      
      this.buff_front = this.buff_bottom;
      this.buff_bottom = this.buff_back;
      this.buff_back = this.buff_top;
      this.buff_top = buff_tmp;
    } else {
      this.front = this.top;
      this.top = this.back;
      this.back = this.bottom;
      this.bottom = tmp;
      
      this.buff_front = this.buff_top;
      this.buff_top = this.buff_back;
      this.buff_back = this.buff_bottom;
      this.buff_bottom = buff_tmp;
    }
  }

  rotateY(dir) { // switch all but TOP / BOTTOM by it's predecessor..
    const tmp = this.front;
    const buff_tmp = this.buff_front;
    
    if (dir === -1) {
      this.front = this.right;
      this.right = this.back;
      this.back = this.left;
      this.left = tmp;
      
      this.buff_front = this.buff_right;
      this.buff_right = this.buff_back;
      this.buff_back = this.buff_left;
      this.buff_left = buff_tmp;
    } else {
      this.front = this.left;
      this.left = this.back;
      this.back = this.right;
      this.right = tmp;
      
      this.buff_front = this.buff_left;
      this.buff_left = this.buff_back;
      this.buff_back = this.buff_right;
      this.buff_right = buff_tmp;
    }
  }
  
  rotateZ(dir) { // switch all but FRONT / BACK
    const tmp = this.top;
    const buff_tmp = this.buff_top;
    
    if (dir === -1) {
      this.top = this.right;
      this.right = this.bottom;
      this.bottom = this.left;
      this.left = tmp;
      
      this.buff_top = this.buff_right;
      this.buff_right = this.buff_bottom;
      this.buff_bottom = this.buff_left;
      this.buff_left = buff_tmp;
    } else {
      this.top = this.left;
      this.left = this.bottom;
      this.bottom = this.right;
      this.right = tmp;
      
      this.buff_top = this.buff_left;
      this.buff_left = this.buff_bottom;
      this.buff_bottom = this.buff_right;
      this.buff_right = buff_tmp;
    }
  }
  
  // -1 / +1 because for some reasons the buffer does not have the exact same r,g,b values ? like whaaaatt
  hasColorFace(arr1) {
    let arr2;
    let face;
    //console.log("top", this.buff_top.levels, "bottom", this.buff_bottom.levels, this.buff_front.levels, this.buff_back.levels, this.buff_left.levels, this.buff_right.levels)
    for (let j = 0; j < 6; j++) {
      if (j === 0) {
        arr2 = this.buff_top.levels;
        face = 'top';
      } else if (j === 1) {
        arr2 = this.buff_bottom.levels;
        face = 'bottom';
      } else if (j === 2) {
        arr2 = this.buff_front.levels;
        face = 'front';
      } else if (j === 3) {
        arr2 = this.buff_back.levels;
        face = 'back';
      } else if (j === 4) {
        arr2 = this.buff_left.levels;
        face = 'left';
      } else {
        arr2 = this.buff_right.levels;
        face = 'right';
      }
      
      if (arr1 && arr2 && (arr1[0] === arr2[0] || arr1[0] === arr2[0] + 1 || arr1[0] === arr2[0] - 1) &&
          (arr1[1] === arr2[1] || arr1[1] === arr2[1] + 1 || arr1[1] === arr2[1] - 1) &&
          (arr1[2] === arr2[2] || arr1[2] === arr2[2] + 1 || arr1[2] === arr2[2] - 1)) {
        return face;
      }
    }
    
    return false
  }
  
  getMove(to, f2) {
    const from = this;
    const f1 = from.selected_face;
    
    let axe;    
    let row;
    let dir;
    
    // quick and dirty
    if (from === to && f1 !== f2) {  
      if ((f1 === 'front' && f2 === 'bottom') ||
          (f1 === 'bottom' && f2 === 'back') ||
          (f1 === 'back' && f2 === 'top') ||
          (f1 === 'top' && f2 === 'front')) {
        axe = 'x';
        row = from.x;
        dir = 1;
      } else if ((f1 === 'front' && f2 === 'top') ||
                 (f1 === 'top' && f2 === 'back') ||
                 (f1 === 'back' && f2 === 'bottom') ||
                 (f1 === 'bottom' && f2 === 'front')) {
        axe = 'x';
        row = from.x;
        dir = -1;
      } else if ((f1 === 'front' && f2 === 'right') ||
          (f1 === 'right' && f2 === 'back') ||
          (f1 === 'back' && f2 === 'left') ||
          (f1 === 'left' && f2 === 'front')) {
        axe = 'y';
        row = from.y;
        dir = 1;
      } else if ((f1 === 'front' && f2 === 'left') ||
          (f1 === 'left' && f2 === 'back') ||
          (f1 === 'back' && f2 === 'right') ||
          (f1 === 'right' && f2 === 'front')) {
        axe = 'y';
        row = from.y;
        dir = -1;
      } else if ((f1 === 'top' && f2 === 'right') ||
                (f1 === 'right' && f2 === 'bottom') ||
                (f1 === 'bottom' && f2 === 'left') ||
                (f1 === 'left' && f2 === 'top')) {
        axe = 'z';
        row = from.z;
        dir = 1;
      } else if ((f1 === 'top' && f2 === 'left') ||
                (f1 === 'left' && f2 === 'bottom') ||
                (f1 === 'bottom' && f2 === 'right') ||
                (f1 === 'right' && f2 === 'top')) {
        axe = 'z';
        row = from.z;
        dir = -1;
      }
    } else if (from !== to && f1 === f2) {    
      if (f1 === 'front' || f1 === 'back') {
        if (from.y !== to.y) {
          axe = 'x';
          row = from.x;
          dir = ((from.y > to.y && f1 === 'front') || (from.y < to.y && f1 === 'back')) ? 1 : -1;
        } else {
          axe = 'y';
          row = from.y;
          dir = ((from.x > to.x && f1 === 'front') || (from.x < to.x && f1 === 'back')) ? 1 : -1;
        }
      } else if (f1 === 'left' || f1 === 'right') {
        if (from.y !== to.y) {
          axe = 'z';
          row = from.z;
          dir = ((from.y > to.y && f1 === 'right') || (from.y < to.y && f1 === 'left')) ? 1 : -1;
        } else {
          axe = 'y';
          row = from.y;
          dir = ((from.z > to.z && f1 === 'right') || (from.z < to.z && f1 === 'left')) ? 1 : -1;
        }
      } else {
        if (from.z !== to.z) {
          axe = 'x';
          row = from.x;
          dir = ((from.z > to.z && f1 === 'bottom') || (from.z < to.z && f1 === 'top')) ? 1 : -1;
        } else {
          axe = 'z';
          row = from.z;
          dir = ((from.x > to.x && f1 === 'top') || (from.x < to.x && f1 === 'bottom')) ? 1 : -1;
        }
      }
    }
    
    return axe ? [axe, row, dir] : false;
  }
  
  show(SIZE = 3) {
    let arr = [];
    if(Array.isArray(this.cubysize) && this.cubysize[0] != "adding")
    {
      arr = this.cubysize[6];
    }
    else if(this.cubysize == 100 || this.cubysize == 5 || this.cubysize == 10)
      arr = [1, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25];
    else if(this.cubysize == 1)
      arr = [0,1,2,3,4,5,6,7,8,18,19,20,21,22,23,24,25,26];
    else if(this.cubysize == 2 || this.special[6] == 2)
      arr = [9,10,11,12,13,14,15,16,17];
    else if(this.cubysize == 3)
      arr = [0,2,6,8,18,20,24,26];
    else if(this.cubysize == 6)
      arr = [0,1,2,3,6,9,10,11,12,15,18,19,20,21,22,23,24,25,26];
    else if(this.special[6] == 15)
      arr = [1,3,4,5,7,10,12,13,14,16,19,21,22,23,25];
    else if(this.cubysize == "1x4x4") {
      arr = [];
      for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
          for (let z = 0; z < SIZE; z++) {
            if (x != 2 || y == 2 || z == 2) {
              arr.push(x * SIZE * SIZE + y * SIZE + z);
            }
          }
        }
      }
    } else if(["3x2x4", "1x3x2"].includes(this.special[6])) {
      arr = [];
      for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
          for (let z = 0; z < SIZE; z++) {
            let arraymap = {
              1: [0, 1, 3, 4],
              2: [0, 2, 4],
              3: [0, 4],
              4: [2],
              5: []
            }
            let dimarr = this.special[6].split("x").map(Number);
            if (arraymap[dimarr[0]].includes(x) || arraymap[dimarr[1]].includes(y) || arraymap[dimarr[2]].includes(z)) {
              arr.push(x * SIZE * SIZE + y * SIZE + z);
            }
          }
        }
      }
    }  else if(["2x2x4", "3x3x5"].includes(this.cubysize) || this.special[6] == "4x3x3") {
      arr = [0,1,2,3,4,7,8,11,12,13,14,15];
      if (["3x3x5"].includes(this.cubysize) || this.special[6] == "4x3x3") arr = [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24];
      let s = arr.length;
      for (let i = 1; i < SIZE; i++) {
        for (let j = 0; j < s; j++) {
          if (this.special[6] == "4x3x3" && i == 2) continue;
          arr.push(arr[j] + i * SIZE * SIZE);
        }
      }
      if (this.special[6] == "4x3x3") arr.push(...Array.from({ length: 25 }, (_, i) => i + 50));
    }


    if(arr.includes(this.index) && this.cubysize != 50) {
      this.shown = false;
      return;
    } else {
      this.shown = true;
    }
    let r = 25;
    if(this.cubysize == 100 || this.cubysize == 5 || this.cubysize == 10 || this.cubysize[7] == 2)
      r = 50;

      if (!this.special[0]) r -= this.special[3] * (r/25);
    this.p.push();
	this.p.translate(this.x, this.y, this.z);
  let bandaged = [];
  if(Array.isArray(this.cubysize) && this.cubysize[0] == "adding")
  {
    for(let i = 0; i < this.cubysize[2].length; i++)
    {
      for(let j = 0; j < this.cubysize[2][i].length; j++)
      {
        bandaged.push(this.cubysize[2][i][j]);
      }
    }
  } else {
    if (this.special && this.special[5] && this.special[5].length > 0)
      bandaged = this.special[5].flat();
  }
  // if(this.cubysize == 7) bandaged = [3,4,5,6,7,8];
  // if(this.cubysize == 8) bandaged = [0,2,3,5,6,8];
  // if(this.cubysize == 9) bandaged = [7,8,5,4,16,15,12,25,26,23,22];
  // if(this.cubysize == 10) bandaged = [6,8];
  // if(this.cubysize == 11) bandaged = [0,20,24,8,9,11,15,17];
  // if(this.cubysize == 12) bandaged = [0,9,2,11,24,15,26,17];
  // if(this.cubysize == 14) bandaged = [13,14,16,17,22,23,25,26];

  let g = !this.special[0] ? 0 : this.special[3] * (r/25);

  if(bandaged.includes(this.index)){
    this.p.strokeWeight(0);
	  this.p.stroke('black');
    this.stroke = 0;
    g = 0;
  }
  else{
    this.p.strokeWeight(this.special[1]);
	  this.p.stroke(this.special[4]);
    this.stroke = 0.5;
  }
	// p1, p2, p3, p4 coordinates


  const shift = (dir, x, y, z) => {
    if (dir == "back") this.p.quad(-r+x, -r+y, -r+z, r+x, -r+y, -r+z, r+x, r+y, -r+z, -r+x, r+y, -r+z, 2, 2);
    if (dir == "front") this.p.quad(-r+x, -r+y, r+z, r+x, -r+y, r+z, r+x, r+y, r+z, -r+x, r+y, r+z, 2, 2);	 
    if (dir == "bottom") this.p.quad(-r+x, -r+y, -r+z, r+x, -r+y, -r+z, r+x, -r+y, r+z, -r+x, -r+y, r+z, 2, 2);	 
    if (dir == "top") this.p.quad(-r+x, r+y, -r+z, r+x, r+y, -r+z, r+x, r+y, r+z, -r+x, r+y, r+z, 2, 2);
    if (dir == "right") this.p.quad(-r+x, -r+y, -r+z, -r+x, r+y, -r+z, -r+x, r+y, r+z, -r+x, -r+y, r+z, 2, 2); 
    if (dir == "left") this.p.quad(r+x, -r+y, -r+z, r+x, r+y, -r+z, r+x, r+y, r+z, r+x, -r+y, r+z, 2, 2);
  }
  

  if ([2, 15, "4x3x3", "1x4x4", "3x2x4", "1x3x2"].includes(this.special[6]) && this.cubysize[0] != "adding") {
    let c1 = this.custom[4][5];
    let c2 = this.custom[22][4];
    let c3 = this.custom[14][2];
    let c4 = this.custom[12][3]
    const opparr = [c1, c2];
    const sidearr = [c3, c4]
    let xshift = this.x < 0 ? 25 : this.x > 0 ? -25 : 0;
    let yshift = this.y < 0 ? 25 : this.y > 0 ? -25 : 0;
    let zshift = this.z < 0 ? 25 : this.z > 0 ? -25 : 0;
    const dirs = ["back", "front", "bottom", "top", "right", "left"];
    dirs.forEach((dir) => {
      if(this[dir] != ""){ // yellow
        this.p.fill(this[dir]);
        let shiftarr = [];
        if (this.special[6].length > 0 && this.special[6].includes("x")) {
          let dims = this.special[6].split("x");
          shiftarr = [(+dims[0] + 1) % 2, (+dims[1] + 1) % 2, (+dims[2] + 1) % 2];
        } else if ([15].includes(this.special[6])) { // 2x2x3
          shiftarr = [0, 1, 1];  
        } else {
          shiftarr = [1, 0, 0]; // 2x3x3, 3x3x4
        }
        if (shiftarr.length > 0) {
          if (opparr.includes(getColor(this.left.levels))) {
            if (sidearr.includes(getColor(this.front.levels))) {
              shift(dir, xshift * shiftarr[0], yshift * shiftarr[1], zshift * shiftarr[2]);
            } else {
              shift(dir, xshift * shiftarr[0], yshift * shiftarr[2], zshift * shiftarr[1]);
            }
          } else if (opparr.includes(getColor(this.top.levels))) {
            if (sidearr.includes(getColor(this.front.levels))) {
              shift(dir, xshift * shiftarr[1], yshift * shiftarr[0], zshift * shiftarr[2]);
            } else {
              shift(dir, xshift * shiftarr[2], yshift * shiftarr[0], zshift * shiftarr[1]);
            }
          } else {
            if (sidearr.includes(getColor(this.left.levels))) {
              shift(dir, xshift * shiftarr[2], yshift * shiftarr[1], zshift * shiftarr[0]);
            } else {
              shift(dir, xshift * shiftarr[1], yshift * shiftarr[2], zshift * shiftarr[0]);
            }
          }
        }
      }
    });
    this.p.pop();
  } else {
    if(this.back != ""){
      this.p.fill(this.back);
      this.p.quad(-r + g, -r + g, -r,    r - g, -r + g, -r,  r - g, r - g, -r,   -r + g, r - g, -r, 2, 2);
    }
    
    if(this.front != ""){
      this.p.fill(this.front);
      this.p.quad(-r+g, -r+g, r, r-g, -r+g, r, r-g, r-g, r, -r+g, r-g, r, 2, 2);	 
    } 
  
    if(this.bottom != ""){
      this.p.fill(this.bottom);
      this.p.quad(-r+g, -r, -r+g, r-g, -r, -r+g, r-g, -r, r-g, -r+g, -r, r-g, 2, 2);	  	 
    } 
  
    if(this.top != ""){
      this.p.fill(this.top);
      this.p.quad(-r+g, r, -r+g, r-g, r, -r+g, r-g, r, r-g, -r+g, r, r-g, 2, 2);	  
    }
    
    if(this.right != ""){
      this.p.fill(this.right);
      this.p.quad(-r, -r+g, -r+g, -r, r-g, -r+g, -r, r-g, r-g, -r, -r+g, r-g, 2, 2);     	 
    } 	  
  
    if(this.left != ""){
      this.p.fill(this.left);
      this.p.quad(r, -r+g, -r+g, r, r-g, -r+g, r, r-g, r-g, r, -r+g, r-g, 2, 2);
    }
    this.p.pop();
    }
  }
}

function getColor(color)
{
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

function decodeCubies() {

}
