class Canvas {
    constructor(_typ = "2d") {
        this.DOM = { canvas: document.createElement("canvas"), ctx: _typ, type: _typ },
            this.dimensions = { WIDTH: 100, HEIGHT: 100 },
            this.mouse = { x: 0, y: 0, lx: 0, ly: 0 },
            this.frames = [],
            this.frameIndex = 0,
            this.MODE = "None",
            this.MODES = ["Pen", "Object Editor", "Select Object", "None"],
            this.addingObject = false,
            this.OBJECTS = {
                //Defaults
                x: this.DOM.canvas.width / 2,
                y: this.DOM.canvas.height / 2,
                r: 20,
                lw: 2,
                strokeStyle: "#000000",
                w: 100,
                h: 100,
                text: "Hello World",
                fontFamily: "sans-serif",
                fontSize: 20,
                names: ["Rectangle", "StrokeRect", "Circle", "StrokeCircle", "Image", "FillText", "StrokeText"],
                draw: false,
                col: "black",
                objects: [],
                object: null,
                Rectangle,
                Circle,
                Img,
                StrokeCircle,
                StrokeRect,
                StrokeText,
                FillText,
                setDefault: () => {
                    this.OBJECTS.x = this.DOM.canvas.width / 2,
                        this.OBJECTS.y = this.DOM.canvas.height / 2,
                        this.OBJECTS.r = 20,
                        this.OBJECTS.w = 100,
                        this.OBJECTS.h = 100;
                },
                setColor: function (_col) {
                    this.col = _col;
                },
                setPos: function (_x, _y) {
                    this.x = _x,
                        this.y = _y;
                },
                getObjectNames: function () {
                    var objects = this.objects.map((obj) => {
                        return obj.object_name;
                    });
                    return objects;
                },
                getObjectIds: function () {
                    var objects = this.objects.map((obj) => {
                        return obj.id;
                    });
                    return objects;
                },
                getObjectInfo: function () {
                    var objects = this.objects.map((obj) => {
                        return { obj_name: obj.object_name, id: obj.id };
                    });
                    return objects;
                },
                center: () => {
                    var dim, x, y;
                    dim = this.getDimensions();
                    if (this.OBJECTS.object.object_name != "Circle" && this.OBJECTS.object.object_name != "StrokeCircle") {
                        x = this.DOM.canvas.width / 2 - this.OBJECTS.object.w / 2;
                        y = this.DOM.canvas.height / 2 - this.OBJECTS.object.h / 2;
                    } else {
                        x = this.DOM.canvas.width / 2;
                        y = this.DOM.canvas.height / 2;
                    }
                    this.OBJECTS.object.x = x;
                    this.OBJECTS.object.y = y;
                },
                setDimensions: function (_w, _h) {
                    this.w = _w, this.h = _h;
                },
                setRadius: function (_r) {
                    this.r = _r;
                },
                addObject: function (_obj) {
                    this.objects.push(_obj);
                },
                resetObjects: function () {
                    this.objects = [];
                },
                generateIcon: function (_name) {
                    var icon;
                    switch (_name.toString().toLowerCase()) {
                        case "circle":
                            icon = "fa fa-circle"
                            break;
                        case "strokecircle":
                            icon = "fa fa-circle";
                            break;
                        case "rectangle":
                            icon = "fa fa-square";
                            break;
                        case "strokerect":
                            icon = "fa fa-square";
                            break;
                        case "image":
                            icon = "fas fa-image";
                            break;
                        case "filltext":
                            icon = "fas fa-shapes"
                            break;
                        default:
                            icon = "fas fa-shapes";
                    }
                    return icon;
                },
                deleteObject: function (_st, _count) {
                    this.objects.splice(_st, _count);
                }
            },
            this.PEN = { color: "#000000", type: "round", width: 2, draw: false, lcap: "round", ljoin: "round" },
            this.info = { pname: "ImageEditor" };
    }

    render(_parent) {
        if (document.querySelector(_parent)) {
            this.DOM.ctx = this.DOM.canvas.getContext(this.DOM.type),
                document.querySelector(_parent).appendChild(this.DOM.canvas);
        } else {
            console.info(`${this.info.pname}: given selector (${_parent}) not found`);
        }
    }

    append(_el) {
        this.DOM.canvas.appendChild(_el);
    }

    setDimensions(w = 100, h = 100) {
        this.DOM.canvas.width = w,
            this.DOM.canvas.height = h;
    }

    getDimensions() {
        const obj = Object.create({});
        Object.defineProperty(obj, "WIDTH", { value: this.DOM.canvas.width || 100 });
        Object.defineProperty(obj, "HEIGHT", { value: this.DOM.canvas.height || 100 });
        return obj;
    }

    pen(_pos, _lcap, _ljoin, _lw, _color) {
        this.DOM.ctx.strokeStyle = _color;
        this.DOM.ctx.lineCap = _lcap;
        this.DOM.ctx.lineWidth = _lw;
        this.DOM.ctx.lineJoin = _ljoin;
        this.DOM.ctx.beginPath();
        this.DOM.ctx.moveTo(_pos.lx, _pos.ly);
        this.DOM.ctx.lineTo(_pos.x, _pos.y);
        this.DOM.ctx.closePath();
        this.DOM.ctx.stroke();
    }

    getBoxInfo() {
        if (this.DOM.canvas) {
            return this.DOM.canvas.getBoundingClientRect();
        } else {
            console.info(`${this.info.pname}: Please render or initialise canvas element`);
        }
    }

    setAttribute(_prop, _val) {
        if (this.DOM.canvas) {
            this.DOM.canvas.setAttribute(_prop, _val);
        } else {
            console.info(`${this.info.pname}: Please render or initialise canvas element`);
        }
    }

    getDeviceWindow() {
        const obj = Object.create({});
        Object.defineProperty(obj, "WIDTH", { value: window.innerWidth || screen.width });
        Object.defineProperty(obj, "HEIGHT", { value: window.innerHeight || screen.height });
        return obj;
    }

    clearScene(_options) {
        // { width, height, x, y, fillColor }
        if (typeof _options === "object") {
            if (_options.fillColor) {
                this.DOM.ctx.fillStyle = _options.fillColor;
                this.DOM.ctx.fillRect(0, 0, this.DOM.canvas.width, this.DOM.canvas.height);
            } else {
                this.DOM.ctx.clearRect(_options.x, _options.y, _options.w, _options.h);
            }
        }
        else {
            this.DOM.ctx.clearRect(0, 0, this.DOM.canvas.width, this.DOM.canvas.height);
        }
    }

    getDataUrl(_type = "image/png", _exx = 1) {
        var data = "";
        if (this.DOM.canvas) {
            data = this.DOM.canvas.toDataURL(_type, +_exx);
        } else {
            console.info(`${this.info.pname}: Please render or initialise canvas element`);
            data = "Error";
        }
        return data;
    }

    async getImage(_imgBase64, _type, _exx, _w, _h) {
        const img = new Image();
        img.src = _imgBase64;
        var data = "";
        const prom = await this.waitFor(img);
        if (prom) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = _w;
            canvas.height = _h;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            data = canvas.toDataURL(_type, _exx);
        }
        return data;
    }

    waitFor(_img) {
        const prom = new Promise((resolve, reject) => {
            _img.onload = () => {
                resolve(true);
            };
            _img.onerror = () => {
                reject(false);
            };
        });
        return prom;
    }

    findEl(_name) {
        if (document.querySelector(_name)) {
            return document.querySelector(_name);
        } else {
            console.log(`${this.info.pname}: given ${_name} not found`);
        }
        return;
    }

    saveImage(_b64, _typ) {
        const obj = new Blob([_b64], { type: _typ });
        const path = URL.createObjectURL(obj);
        return path;
    }

    preventDefault() {
        this.DOM.canvas.oncontextmenu = (e) => {
            e.preventDefault();
        }
    }

    captureScene() {
        var dim = this.getDimensions();
        return this.DOM.ctx.getImageData(0, 0, dim.WIDTH, dim.HEIGHT);
    }

    undo() {
        console.log(this.frameUndoCheck());
        if (this.frameUndoCheck()) {
            this.frameIndex--;
            this.installFrame(this.frames[this.frameIndex]);
        }
    }

    redo() {
        console.log(this.frameRedoCheck());
        if (this.frameRedoCheck()) {
            this.frameIndex++;
            this.installFrame(this.frames[this.frameIndex]);
        }
    }

    getFrame(pos) {
        return this.frames[pos];
    }

    frameUndoCheck() {
        if (typeof this.frames[this.frameIndex - 1] !== "undefined") {
            return true;
        }
        return false;
    }

    frameRedoCheck() {
        if (typeof this.frames[this.frameIndex + 1] !== "undefined") {
            return true;
        }
        return false;
    }

    installFrame(_frame) {
        var dim = this.getDimensions();
        this.DOM.ctx.putImageData(_frame, 0, 0);
    }

    installCurrentFrame() {
        return this.installFrame(this.frames[this.frameIndex]);
    }
}

class Img {
    constructor() {
        this.x = 0,
            this.y = 0,
            this.state = false,
            this.w = 100,
            this.h = 100,
            this.id = getRandomCh(),
            this.object_name = "Image",
            this.img = new Image(),
            this.src = "";
    }

    draw(_buff) {
        _buff.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
    getCenterX() {
        return this.x + (this.w * 0.5);
    }

    getCenterY() {
        return this.y + (this.h * 0.5);
    }
    install(_obj) {
        this.x = _obj.x,
            this.y = _obj.y,
            this.w = _obj.w,
            this.h = _obj.h,
            this.src = _obj.src,
            this.img.src = this.src;
    }

    diff(_obj) {
        _obj.x = this.x,
            _obj.y = this.y,
            _obj.w = this.w,
            _obj.h = this.h,
            _obj.src = this.src;
    }
}

class Circle {
    constructor() {
        this.x = 0,
            this.y = 0,
            this.id = getRandomCh(),
            this.r = 20,
            this.object_name = "Circle",
            this.col = "black";
    }

    draw(_buff) {
        _buff.fillStyle = this.col;
        _buff.beginPath();
        _buff.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        _buff.closePath();
        _buff.fill();
    }

    getCenterX() {
        return this.x + (this.r * 0.5);
    }

    getCenterY() {
        return this.y + (this.r * 0.5);
    }

    install(_obj) {
        this.x = _obj.x,
            this.y = _obj.y,
            this.r = _obj.r,
            this.col = _obj.fillStyle;
    }

    diff(_obj) {
        _obj.x = this.x,
            _obj.y = this.y,
            _obj.r = this.r,
            _obj.fillStyle = this.col;
    }
}


class StrokeCircle {
    constructor() {
        this.x = 0,
            this.y = 0,
            this.id = getRandomCh(),
            this.r = 20,
            this.object_name = "Circle",
            this.col = "black";
    }

    draw(_buff) {
        _buff.strokeStyle = this.col;
        _buff.beginPath();
        _buff.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        _buff.closePath();
        _buff.stroke();
    }

    getCenterX() {
        return this.x + (this.r * 0.5);
    }

    getCenterY() {
        return this.y + (this.r * 0.5);
    }

    install(_obj) {
        this.x = _obj.x,
            this.y = _obj.y,
            this.r = _obj.r,
            this.lw = _obj.lw,
            this.col = _obj.strokeStyle;
    }

    diff(_obj) {
        _obj.x = this.x,
            _obj.y = this.y,
            _obj.r = this.r,
            _obj.lw = this.lw,
            _obj.strokeStyle = this.col;
    }
}

class StrokeRect {
    constructor() {
        this.x = 0,
            this.object_name = "StrokeRect",
            this.y = 0,
            this.w = 100,
            this.drawing = false;
        this.id = getRandomCh(),
            this.h = 100,
            this.lw = 2,
            this.col = "black";
    }

    draw(_buff) {
        _buff.lineWidth = this.lw;
        _buff.strokeStyle = this.col;
        _buff.strokeRect(this.x, this.y, this.w, this.h);
    }

    getCenterX() {
        return this.x + (this.w * 0.5);
    }

    getCenterY() {
        return this.y + (this.h * 0.5);
    }
    install(_obj) {
        this.x = _obj.x,
            this.y = _obj.y,
            this.w = _obj.w,
            this.h = _obj.h,
            this.lw = _obj.lw,
            this.col = _obj.strokeStyle;
    }

    diff(_obj) {
        _obj.x = this.x,
            _obj.y = this.y,
            _obj.w = this.w,
            _obj.h = this.h,
            _obj.lw = this.lw,
            _obj.strokeStyle = this.col;
    }
}

class Rectangle {
    constructor() {
        this.x = 0,
            this.object_name = "Rectangle",
            this.y = 0,
            this.w = 100,
            this.id = getRandomCh(),
            this.h = 100,
            this.col = "black";
    }

    draw(_buff) {
        _buff.fillStyle = this.col;
        _buff.fillRect(this.x, this.y, this.w, this.h);
    }

    getCenterX() {
        return this.x + (this.w * 0.5);
    }

    getCenterY() {
        return this.y + (this.h * 0.5);
    }
    install(_obj) {
        this.x = _obj.x,
            this.y = _obj.y,
            this.w = _obj.w,
            this.h = _obj.h,
            this.col = _obj.fillStyle;
    }

    diff(_obj) {
        _obj.x = this.x,
            _obj.y = this.y,
            _obj.w = this.w,
            _obj.h = this.h,
            _obj.fillStyle = this.col;
    }
}

class FillText {
    constructor() {
        this.x = 0,
            this.object_name = "Text",
            this.y = 0,
            this.id = getRandomCh(),
            this.fontSize = 16,
            this.fontFamily = "Sans",
            this.text = "Hello World",
            this.col = "black";
    }

    draw(_buff) {
        _buff.fillStyle = this.col;
        _buff.font = this.fontSize + "px " + this.fontFamily;
        _buff.fillText(this.text, this.x, this.y);
    }

    install(_obj) {
        this.x = _obj.x,
            this.y = _obj.y,
            this.fontSize = _obj.fontSize,
            this.fontFamily = _obj.fontFamily,
            this.text = _obj.text,
            this.col = _obj.fillStyle;
    }

    diff(_obj) {
        _obj.x = this.x,
            _obj.y = this.y,
            _obj.fontSize = this.fontSize,
            _obj.fontFamily = this.fontFamily,
            _obj.text = this.text,
            _obj.fillStyle = this.col;
    }
}


class StrokeText {
    constructor() {
        this.x = 0,
            this.object_name = "Text",
            this.y = 0,
            this.id = getRandomCh(),
            this.fontSize = 16,
            this.fontFamily = "Sans",
            this.text = "Hello World",
            this.col = "black";
    }

    draw(_buff) {
        _buff.strokeStyle = this.col;
        _buff.font = this.fontSize + "px " + this.fontFamily;
        _buff.strokeText(this.text, this.x, this.y);
    }
    install(_obj) {
        this.x = _obj.x,
            this.y = _obj.y,
            this.fontSize = _obj.fontSize,
            this.fontFamily = _obj.fontFamily,
            this.text = _obj.text,
            this.col = _obj.strokeStyle;
    }

    diff(_obj) {
        _obj.x = this.x,
            _obj.y = this.y,
            _obj.fontSize = this.fontSize,
            _obj.fontFamily = this.fontFamily,
            _obj.text = this.text,
            _obj.strokeStyle = this.col;
    }
}

function getRandomCh() {
    const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "g", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "%", "*", "&", 0, 1, 2, , 3, 4, 5, 6, 7, 8, 9];
    var a1, a2, a3, a4, a5, a6, a7, a8;
    a1 = chars[Math.floor(Math.random() * chars.length)];
    a2 = chars[Math.floor(Math.random() * chars.length)];
    a3 = chars[Math.floor(Math.random() * chars.length)];
    a4 = chars[Math.floor(Math.random() * chars.length)];
    a5 = chars[Math.floor(Math.random() * chars.length)];
    a6 = chars[Math.floor(Math.random() * chars.length)];
    a7 = chars[Math.floor(Math.random() * chars.length)];
    a8 = chars[Math.floor(Math.random() * chars.length)];
    return a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8;
}

// Humoyun Dev - @HumoyunDeveloper

