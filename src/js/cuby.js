export default class Cuby {
  constructor(size, x, y, z, buff, picker, p, index, custom) {
    //size = 50;
    this.cubysize = size;
    this.x = x;
    this.y = y;
    this.z = z;
    this.picker = picker;
    this.p = p;
	  this.index = index;
    this.stroke = 0.5;

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
	 this.colors = {
      def:   p.color(25 + this.x*0.02,  25 + this.y*0.02, 25 + this.z*0.02,),
      white: p.color(250 + this.x*0.02, 250 + this.y*0.02, 250 + this.z*0.02),
      red:   p.color(219 + this.x*0.02, 25 + this.y*0.02,  25 + this.z*0.02),
      blue:  p.color(25 + this.x*0.02,  105 + this.y*0.02, 219 + this.z*0.02),
      orange:p.color(219 + this.x*0.02, 125 + this.y*0.02, 25 + this.z*0.02),
      green: p.color(25 + this.x*0.02,  219 + this.y*0.02, 31 + this.z*0.02),
      yellow:p.color(209 + this.x*0.02, 219 + this.y*0.02, 25 + this.z*0.02),
      black:p.color(25 + this.x*0.02,  25 + this.y*0.02, 25 + this.z*0.02),
      magenta:p.color(245 + this.x*0.02,  25 + this.y*0.02, 245 + this.z*0.02),
    };
    this.c = {
      def:   p.color(25 + this.x*0.02,  25 + this.y*0.02, 25 + this.z*0.02,),
      w: p.color(250 + this.x*0.02, 250 + this.y*0.02, 250 + this.z*0.02),
      r:   p.color(219 + this.x*0.02, 25 + this.y*0.02,  25 + this.z*0.02),
      b:  p.color(25 + this.x*0.02,  105 + this.y*0.02, 219 + this.z*0.02),
      o: p.color(219 + this.x*0.02, 125 + this.y*0.02, 25 + this.z*0.02),
      g: p.color(25 + this.x*0.02,  219 + this.y*0.02, 31 + this.z*0.02),
      y: p.color(209 + this.x*0.02, 219 + this.y*0.02, 25 + this.z*0.02),
      k: p.color(25 + this.x*0.02,  25 + this.y*0.02, 25 + this.z*0.02),
      m: p.color(245 + this.x*0.02,  25 + this.y*0.02, 245 + this.z*0.02),
    };
	
    this.top = this.colors.white;
    this.bottom = this.colors.yellow;
    this.front = this.colors.red;
    this.right = this.colors.blue;
    this.back = this.colors.orange;
    this.left = this.colors.green;
    
    if(size == 4 || size == 5)
    {
      this.bottom = this.colors.white;
      this.right = this.colors.green;
      this.back = this.colors.red;
    }
    if(custom){
      let opposite = [];
      opposite["g"] = "b";
      opposite["b"] = "g";
      opposite["y"] = "w";
      opposite["w"] = "y";
      opposite["o"] = "r";
      opposite["r"] = "o";
      if((size == 4 || size == 5) && (custom[this.index][0] == "y" || custom[this.index][0] == "b" || custom[this.index][0] == "o")) this.top = this.c[opposite[custom[this.index][0]]];
      else this.top = this.c[custom[this.index][0]];
      if((size == 4 || size == 5) && (custom[this.index][1] == "y" || custom[this.index][1] == "b" || custom[this.index][1] == "o")) this.bottom = this.c[opposite[custom[this.index][1]]];
      else this.bottom = this.c[custom[this.index][1]];
      if((size == 4 || size == 5) && (custom[this.index][2] == "y" || custom[this.index][2] == "b" || custom[this.index][2] == "o")) this.front = this.c[opposite[custom[this.index][2]]];
      else this.front = this.c[custom[this.index][2]];
      if((size == 4 || size == 5) && (custom[this.index][3] == "y" || custom[this.index][3] == "b" || custom[this.index][3] == "o")) this.back = this.c[opposite[custom[this.index][3]]];
      else this.back = this.c[custom[this.index][3]];
      if((size == 4 || size == 5) && (custom[this.index][4] == "y" || custom[this.index][4] == "b" || custom[this.index][4] == "o")) this.left = this.c[opposite[custom[this.index][4]]];
      else this.left = this.c[custom[this.index][4]];
      if((size == 4 || size == 5) && (custom[this.index][5] == "y" || custom[this.index][5] == "b" || custom[this.index][5] == "o")) this.right = this.c[opposite[custom[this.index][5]]];
      else this.right = this.c[custom[this.index][5]];
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
  
  show() {
    let arr = [];
    if(Array.isArray(this.cubysize) && this.cubysize[0] != "adding")
    {
      arr = this.cubysize[6];
    }
    else if(this.cubysize == 100 || this.cubysize == 5 || this.cubysize == 10)
      arr = [1, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 22, 23, 25];
    else if(this.cubysize == 1)
      arr = [0,1,2,3,4,5,6,7,8,18,19,20,21,22,23,24,25,26];
    else if(this.cubysize == 2)
      arr = [9,10,11,12,13,14,15,16,17];
    else if(this.cubysize == 3)
      arr = [0,2,6,8,18,20,24,26];
    else if(this.cubysize == 6)
      arr = [0,1,2,3,6,9,10,11,12,15,18,19,20,21,22,23,24,25,26];

    if(arr.includes(this.index) && this.cubysize != 50) return;
    let r = 25;
    if(this.cubysize == 100 || this.cubysize == 5 || this.cubysize == 10 || (Array.isArray(this.cubysize) && this.cubysize[7] == 2))
      r = 50;
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
  }
  if(this.cubysize == 7) bandaged = [3,4,5,6,7,8];
  if(this.cubysize == 8) bandaged = [0,2,3,5,6,8];
  if(this.cubysize == 9) bandaged = [7,8,5,4,16,15,12,25,26,23,22];
  if(this.cubysize == 10) bandaged = [6,8];
  if(this.cubysize == 11) bandaged = [0,20,24,8,9,11,15,17];
  if(this.cubysize == 12) bandaged = [0,9,2,11,24,15,26,17];
  if(bandaged.includes(this.index)){
    this.p.strokeWeight(0);
	  this.p.stroke('black');
    this.stroke = 0;
  }
  else{
    this.p.strokeWeight(0.5);
	  this.p.stroke('black');
    this.stroke = 0.5;
  }
	// p1, p2, p3, p4 coordinates
	
	this.p.fill(this.back);
	//this.p.quad(-r, -r, -r, r, -r, -r, r, r, -r, -r, r, -r);
	this.p.quad(-r, -r, -r,    r, -r, -r,  r, r, -r,   -r, r, -r, 2, 2);
	
	this.p.fill(this.front);
	//this.p.quad(-r, -r, r, r, -r, r, r, r, r, -r, r, r);
	this.p.quad(-r, -r, r, r, -r, r, r, r, r, -r, r, r, 2, 2);	  

	this.p.fill(this.bottom);
	//this.p.quad(-r, -r, -r, r, -r, -r, r, -r, r, -r, -r, r);
	this.p.quad(-r, -r, -r, r, -r, -r, r, -r, r, -r, -r, r, 2, 2);	  	  

	this.p.fill(this.top);
	//this.p.quad(-r, r, -r, r, r, -r, r, r, r, -r, r, r);
	this.p.quad(-r, r, -r, r, r, -r, r, r, r, -r, r, r, 2, 2);	  
  
	this.p.fill(this.right);
	//this.p.quad(-r, -r, -r, -r, r, -r, -r, r, r, -r, -r, r);
	this.p.quad(-r, -r, -r, -r, r, -r, -r, r, r, -r, -r, r, 2, 2);     	  	  

	this.p.fill(this.left);
	//this.p.quad(r, -r, -r, r, r, -r, r, r, r, r, -r, r);
	this.p.quad(r, -r, -r, r, r, -r, r, r, r, r, -r, r, 2, 2);
	/*this.p.line(r,r,r,-r,-r,-r);
	this.p.line(r,r,r,-r,-r,-r);
	this.p.line(r,r,r,-r,-r,-r);*/
	this.p.pop();
    /*
	this.picker.buffer.push();
      
    this.picker.buffer.strokeWeight(0);
    this.picker.buffer.translate(this.x, this.y, this.z);
    this.picker.buffer.fill(this.buff_back);
    this.picker.buffer.quad(-r, -r, -r, r, -r, -r, r, r, -r, -r, r, -r);
    this.picker.buffer.fill(this.buff_front);
    this.picker.buffer.quad(-r, -r, r, r, -r, r, r, r, r, -r, r, r);
    this.picker.buffer.fill(this.buff_bottom);
    this.picker.buffer.quad(-r, -r, -r, r, -r, -r, r, -r, r, -r, -r, r);
    this.picker.buffer.fill(this.buff_top);
    this.picker.buffer.quad(-r, r, -r, r, r, -r, r, r, r, -r, r, r);
    this.picker.buffer.fill(this.buff_right);
    this.picker.buffer.quad(-r, -r, -r, -r, r, -r, -r, r, r, -r, -r, r);
    this.picker.buffer.fill(this.buff_left);
    this.picker.buffer.quad(r, -r, -r, r, r, -r, r, r, r, r, -r, r);
      
    this.picker.buffer.pop();*/
  }
}