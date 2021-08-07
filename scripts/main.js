
sayHello();
const IMAGES = [];
const canvas = new Canvas("2d");
window.canvas = canvas;
var anotherFiles = [];
canvas.preventDefault();
const DDim = canvas.getDeviceWindow();
const panel = canvas.findEl("#panel");
const customizeEl = canvas.findEl("#customizepen");
const createnewEl = canvas.findEl("#createnew");
const cropimageEl = canvas.findEl("#cropimage");
const readDocEl = canvas.findEl("#documentation");
const addstickersEl = canvas.findEl("#addstickers");
const downEl = canvas.findEl(".fixed47");
const focusEl = document.createElement("div");
focusEl.classList.add("focusEl");
// document.body.appendChild(focusEl);
const fileEl = canvas.findEl("#file");
const aboutEl = canvas.findEl("#about");
const zplusEl = canvas.findEl("#zplus");
const zminusEl = canvas.findEl("#zminus");
const penEl = canvas.findEl("#pen");
var selectedItem = "Rectangle";
const filterEl = canvas.findEl("#filter");
const opacityEl = canvas.findEl("#opacity");
const saveEl = canvas.findEl("#save");
const objectsEl = canvas.findEl("#objectsel");
const coordsEl = canvas.findEl(".coords");
const objectsgetEl = canvas.findEl("#objectsgetel");
const allowgridEl = canvas.findEl("#allowgrid");
const editObjectsEl = canvas.findEl("#editobjects");
const currentObjectEl = canvas.findEl(".currentObject");
const objectsAddingEl = canvas.findEl("#objectsadding");
const centerObjectEl = canvas.findEl("#centerObject");
const undoEl = canvas.findEl("#undo");
const clearEl = canvas.findEl("#clear");
const redoEl = canvas.findEl("#redo");
const FILTER = { value: "", qual: "" };
canvas.setDimensions(500, 450);
const dimensions = canvas.getDimensions();
canvas.setAttribute("id", canvas.info.pname);
panel.style.height = dimensions.HEIGHT + "px";
canvas.render("#body");
canvas.frames[0] = canvas.captureScene();
var selectedItem2 = {};
var stat = {};
var INDEX = 0;
const focusObj = new canvas.OBJECTS.StrokeRect();
focusObj.x = -100,
    focusObj.y = -100,
    focusObj.w = 20,
    focusObj.h = 20,
    focusObj.col = "#099",
    focusObj.lw = 3,
    window.focusObj = focusObj;

function createFilter(_data, _type, _qual) {
    var curr = 0,
        width = 0,
        height = 0,
        actype;

    const types = [{ name: "white", r: true, g: true, b: true }, { name: "black", r: true, g: true, b: true }, { name: "purple", r: true, g: false, b: true }, { name: "yellow", r: true, g: true, b: false }, { name: "green", r: false, g: true, b: false }, { name: "blue", r: false, g: false, b: true }, { name: "cyan", r: false, g: true, b: true }, { name: "red", r: true, g: false, b: false }];

    actype = types.filter((typ) => typ.name === _type);
    for (height = 0; height < _data.height; height++) {
        for (width = 0; width < _data.width; width++) {
            if (actype[0].r) {
                _data.data[((height * _data.width) * 4) + (width * 4)] = _qual;
            }
            if (actype[0].g) {
                _data.data[((height * _data.width) * 4) + (width * 4 + 1)] = _qual;
            }
            if (actype[0].b) {
                _data.data[((height * _data.width) * 4) + (width * 4 + 2)] = _qual;
            }
        }
    }
    return _data;
}

function createFilter2(_data, _r, _g, _b) {
    var height, width;
    for (height = 0; height < _data.height; height++) {
        for (width = 0; width < _data.width; width++) {
            if (_r) {
                _data.data[((height * _data.width) * 4) + (width * 4)] = _r;
            }
            if (_g) {
                _data.data[((height * _data.width) * 4) + (width * 4 + 1)] = _g;
            }
            if (_b) {
                _data.data[((height * _data.width) * 4) + (width * 4 + 2)] = _b;
            }
        }
    }
    return _data;
}

function clearScene() {
    canvas.clearScene();
    var data;
    data = canvas.captureScene();
    canvas.frames.push(data);
    canvas.frameIndex = canvas.frames.length - 1;
    canvas.installFrame(canvas.getFrame(canvas.frames.length - 1));
}


const capitalize = (text) => {
    var sletter;
    sletter = text.charAt(0).toUpperCase();
    return sletter + text.substr(1, text.length - 1);
}

function frameRedo() {
    canvas.redo();
}

function frameUndo() {
    canvas.undo();
}

function checkFile(file) {
    return (file.type === "image.png" || file.type === "image/jpeg") && file.size <= 2377883;
}

function handleFile(e) {
    const file = {
        name: e.target.files[e.target.files.length - 1].name,
        type: e.target.files[e.target.files.length - 1].type,
        size: e.target.files[e.target.files.length - 1].size,
    };
    if (checkFile(file)) {
        var fileo, url, img;
        fileo = new Blob([e.target.files[e.target.files.length - 1]], { type: file.type });
        url = URL.createObjectURL(fileo);
        img = new Image();
        img.src = url;
        IMAGES[0] = img;
        IMAGES[0].onload = () => {
            canvas.DOM.ctx.drawImage(IMAGES[0], 10, 10, canvas.getDimensions().WIDTH - 20, canvas.getDimensions().HEIGHT - 20);
        }
        var data = canvas.captureScene();
        canvas.frames.push(data);
    } else {
        var dialog = duDialog("Oops!", "Something went wrong please use .png, .jpg formats and make sure the image size should be less than 2mb ", { init: true });
        dialog.show();
    }
}

const saveFile = (_type, _ftype, _pix) => {
    document.querySelector(".fixed47").innerHTML = "";
    var data, type, pix;
    type = _type;
    pix = _pix;
    data = canvas.getDataUrl(type, pix);
    canvas.saveImage(data, ftype, ".fixed47", "Download");
}

function sayHello() {
    if (localStorage.getItem("showing") === "true") {
        var dialog = duDialog("Hello!", "This is an ImageEditor and it is able to create modify and save Images via various formats such as image/jpeg, image/png. <br/><br/><b> <label><input type='checkbox' name='showing' id='showing' onchange='this.checked === true ? localStorage.setItem(`showing`, `false`) : localStorage.setItem(`showing`, `true`)' /> Do Not Show Again</label></b>", { init: true });
        dialog.show();
    } else {
        // do nothing
    }
}


function changePenAttrib() {
    var dial = duDialog("Customize Pen", `
    <p class="margin">Default Pen Settings:</p>
    <input type='color' id="color" placeholder='Choose Color...'/>
    <p class="margin">Width:</p>
    <select name="lwidth" id="lwidth" value="1" >
    <option name="1" >1</option>
    <option name="2" >2</option>
    <option name="3" >3</option>
    <option name="4" >4</option>
    <option name="5" >5</option>
    <option name="6" >6</option>
    <option name="7" >7</option>
    <option name="8" >8</option>
    <option name="9" >9</option>
    <option name="10" >10</option>
    </select>
    <p class="margin">LineCap:</p>
    <select name="linecap" id="linecap" >
    <option name="round">Round</option>
    <option name="butt">Butt</option>
    <option name="square">Square</option>
    </select>
    <p class="margin">LineJoin</p>
    <select name="linejoin" id="linejoin" >
    <option name="bevel">Bevel</option>
    <option name="round">Round</option>
    <option name="miter">Miter</option>
    </select>
    `, {
        init: true,
        buttons: duDialog.OK_CANCEL,
        callbacks: {
            okClick: function () {
                var colorEl, lwidthEl, linecapEl, linejoinEl;
                colorEl = canvas.findEl("#color");
                lwidthEl = canvas.findEl("#lwidth");
                linecapEl = canvas.findEl("#linecap");
                linejoinEl = canvas.findEl("#linejoin");
                canvas.PEN.color = colorEl.value;
                canvas.PEN.width = lwidthEl.value;
                canvas.PEN.lcap = linecapEl.value.toString().toLowerCase();
                canvas.PEN.ljoin = linejoinEl.value.toString().toLowerCase();
                this.hide();
            }
        }
    });
    setTimeout(() => {
        var colorEl, lwidthEl, linecapEl, linejoinEl;
        colorEl = canvas.findEl("#color");
        lwidthEl = canvas.findEl("#lwidth");
        linecapEl = canvas.findEl("#linecap");
        linejoinEl = canvas.findEl("#linejoin");
        colorEl.value = canvas.PEN.color;
        linecapEl.value = capitalize(canvas.PEN.lcap);
        linejoinEl.value = capitalize(canvas.PEN.ljoin)
        lwidthEl.value = canvas.PEN.width.toString();
    }, 20);
    dial.show();
}

function handlePen(e) {
    var target = penEl;
    if (canvas.PEN.draw) {
        canvas.PEN.draw = false;
        if (canvas.MODE == canvas.MODES[0]) {
            canvas.MODE = canvas.MODES[3];
        }
    } else {
        canvas.PEN.draw = true;
        canvas.MODE = canvas.MODES[0];
        if (canvas.addingObject) {
            toggleObjectAdding();
        }
    }
    if (canvas.addingObject) {
        if (canvas.OBJECTS.object) {
            currentObjectEl.innerHTML = "Current Object: <b>" + canvas.OBJECTS.object.object_name + "</b><br/>Current Mode:<b> " + canvas.MODE + "</b>";
        }
    } else {
        currentObjectEl.innerHTML = "Current Object: <b>None</b><br/>Current Mode:<b> " + canvas.MODE + "</b>";
    }
    canvas.PEN.draw ? target.style.backgroundColor = "#066" : target.style.backgroundColor = "#088";
}

function addObject(_name) {
    var object;
    switch (_name.toString().toLowerCase()) {
        case "rectangle":
            object = new canvas.OBJECTS.Rectangle();
            break;
        case "circle":
            object = new canvas.OBJECTS.Circle();
            break;
        case "strokecircle":
            object = new canvas.OBJECTS.StrokeCircle();
            break;
        case "image":
            object = new canvas.OBJECTS.Img();
            break;
        case "strokerect":
            object = new canvas.OBJECTS.StrokeRect();
            break;
        case "filltext":
            object = new canvas.OBJECTS.FillText();
            break;
        case "stroketext":
            object = new canvas.OBJECTS.StrokeText();
            break;
    }
    canvas.OBJECTS.object = object;
    focusObj.drawing = true;
    if (canvas.OBJECTS.object.object_name == "Circle" || canvas.OBJECTS.object.object_name == "StrokeCircle") {
        focusObj.x = canvas.OBJECTS.object.x - canvas.OBJECTS.object.r - 4;
        focusObj.y = canvas.OBJECTS.object.y - canvas.OBJECTS.object.r - 4;
        focusObj.w = (canvas.OBJECTS.object.r * 2) + 8;
        focusObj.h = (canvas.OBJECTS.object.r * 2) + 8;
    } else {
        focusObj.x = canvas.OBJECTS.object.x - 4;
        focusObj.y = canvas.OBJECTS.object.y - 4;
        focusObj.w = (canvas.OBJECTS.object.w * 1) + 8;
        focusObj.h = (canvas.OBJECTS.object.h * 1) + 8;
    }
    canvas.OBJECTS.addObject(object);
}

function toggleObjectAdding(ev) {
    if (canvas.addingObject) {
        canvas.addingObject = false;
        focusObj.drawing = false;
        if (canvas.MODE == canvas.MODES[1]) {
            canvas.MODE = canvas.MODES[3];
        }
        currentObjectEl.innerHTML = "Current Object: None<br/>Current Mode: " + canvas.MODE;
        canvas.installCurrentFrame();
        canvas.OBJECTS.objects.forEach((obj) => {
            obj.draw(canvas.DOM.ctx);
        });
        var data;
        data = canvas.captureScene();
        canvas.frames.push(data);
        canvas.frameIndex = canvas.frames.length - 1;
        canvas.installFrame(canvas.getFrame(canvas.frames.length - 1));
    } else {
        canvas.OBJECTS.objects = [];
        canvas.MODE = canvas.MODES[1];
        canvas.addingObject = true;
        if (canvas.PEN.draw) {
            handlePen();
        }
        drawScene();
    }
    canvas.addingObject ? objectsAddingEl.style.backgroundColor = "#066" : objectsAddingEl.style.backgroundColor = "#088";
}

function handleObjects() {
    if (canvas.MODE == canvas.MODES[1]) {
        var dialog = duDialog("Objects", canvas.OBJECTS.names, {
            init: true,
            selection: true,
            selectedValue: this.selectedItem,
            allowSearch: true,
            callbacks: {
                itemSelect: function (e, i) {
                    selectedItem = this.value;
                    addObject(selectedItem);
                },
                itemRender: function (i) {
                    return '<span class="select-item"><i class="icon ' + (canvas.OBJECTS.generateIcon(i)) + '"></i>' + i + '</span>';
                }
            }
        });
        dialog.show();
    } else {
        var dialog = duDialog(null, "To Add Or Edit Objects You Need To Change Mode To <b>Object Editor</b>", { init: true });
        dialog.show();
    }
}

function handleOpacity() {
    var dialog;
    dialog = duDialog("Opacity", `
    <input type="range" id="opacityField" step="0.1" value="1" min="0" max="1" onchange="this.nextElementSibling.textContent = 'Opacity: ' + this.value;"/>
    <p>Opacity:</p>
    `, {
        init: true,
        butttons: duDialog.OK_CANCEL,
        callbacks: {
            okClick: function () {
                var opacityRange;
                opacityRange = canvas.findEl("#opacityField").value;
                changeOpacity(opacityRange);
                this.hide();
            }
        }
    });
    dialog.show();
}
var anotherFiles = [];
function getObject() {
    if (canvas.MODE == canvas.MODES[1]) {
        INDEX = -1;
        var dialog = duDialog("Get Object", canvas.OBJECTS.getObjectIds(),
            {
                init: true,
                selection: true,
                selectedValue: this.selectedItem2,
                allowSearch: true,
                callbacks: {
                    itemSelect: function (e, i) {
                        selectedItem2 = this.value;
                        var activeObject = canvas.OBJECTS.objects.findIndex((obj) => {
                            return obj.id == selectedItem2;
                        });
                        canvas.OBJECTS.object = canvas.OBJECTS.objects[activeObject];
                        focusObj.drawing = true;
                        if (canvas.OBJECTS.object.object_name == "Circle") {
                            focusObj.x = canvas.OBJECTS.object.x - canvas.OBJECTS.object.r - 4;
                            focusObj.y = canvas.OBJECTS.object.y - canvas.OBJECTS.object.r - 4;
                            focusObj.w = (canvas.OBJECTS.object.r * 2) + 8;
                            focusObj.h = (canvas.OBJECTS.object.r * 2) + 8;
                        } else {
                            focusObj.x = canvas.OBJECTS.object.x - 4;
                            focusObj.y = canvas.OBJECTS.object.y - 4;
                            focusObj.w = (canvas.OBJECTS.object.w * 1) + 8;
                            focusObj.h = (canvas.OBJECTS.object.h * 1) + 8;
                        }
                    },
                    itemRender: function (i) {
                        INDEX++;
                        return '<span class="select-item">' + canvas.OBJECTS.objects[INDEX].object_name + '</span><span class="select-sub">ID: ' + i + '</span>';
                    }
                }
            });
        dialog.show();
    } else {
        var dialog = duDialog(null, "To Add Or Edit Objects You Need To Change Mode To <b>Object Editor</b>", { init: true });
        dialog.show();
    }
}

function changeOpacity(_value) {
    var data, img;
    img = new Image();
    img.width = canvas.DOM.canvas.width;
    img.height = canvas.DOM.canvas.height;
    img.src = canvas.getDataUrl("image/png", 1);
    img.onload = () => {
        canvas.clearScene();
        canvas.DOM.ctx.globalAlpha = _value;
        canvas.DOM.ctx.drawImage(img, 10, 10, img.width - 20, img.height - 20);
        canvas.DOM.ctx.globalAlpha = 1;
        var captured = canvas.captureScene();
        canvas.frames.push(captured);
        canvas.frameIndex = canvas.frames.length - 1;
        canvas.installFrame(canvas.frames[canvas.frameIndex]);
    }
}

function filterImage() {
    var dialog = duDialog("Filters", `
    <p>Filters:</p>
    <select onchange="if(this.value == 'Custom'){ document.querySelector('#disp').classList.remove('hidden');document.querySelector('#wrapperr').classList.add('hidden'); }else{ document.querySelector('#disp').classList.add('hidden');document.querySelector('#wrapperr').classList.remove('hidden');}" name="filter" id="filterel" >
    <option name="black">Custom</option>
    <option name="red">Red</option>
    <option name="purple">Purple</option>
    <option name="green">Green</option>
    <option name="yellow">Yellow</option>
    <option name="cyan">Cyan</option>
    </select>
    <div id='wrapperr'>
    <p>Color Range:</p>
    <input type="range" min="0" max="255" value="100" step="1" onchange="this.previousElementSibling.textContent = 'Color Range: ' + this.value"  id="range"/>  
    </div>
    <div id='disp' >
    <p onclick="this.nextElementSibling.disabled ? this.nextElementSibling.disabled = false : this.nextElementSibling.disabled = true;">Red (Click Me To Disable):</p>  
    <input onclick="this.nextElementSibling.disabled ? this.nextElementSibling.disabled = false : this.nextElementSibling.disabled = true;" type="range" min="0" max="255" value="100" id="r" />    
    <p onclick="this.nextElementSibling.disabled ? this.nextElementSibling.disabled = false : this.nextElementSibling.disabled = true;">Green (Click Me To Disable): </p>  
    <input type="range" min="0" max="255" value="100" id="g" />    
    <p onclick="this.nextElementSibling.disabled ? this.nextElementSibling.disabled = false : this.nextElementSibling.disabled = true;">Blue (Click Me To Disable):</p>  
    <input type="range" min="0" max="255" value="100" id="b" />
    </div>    
    `, {
        init: true,
        callbacks: {
            okClick: function () {
                var data, filterEl, filter, dfilter, qual;
                data = canvas.captureScene();
                filterEl = canvas.findEl("#filterel");
                qual = canvas.findEl("#range");
                filter = filterEl.value.toString().toLowerCase();
                FILTER.qual = qual.value;
                FILTER.value = filter;
                if (filter != "custom") {
                    dfilter = createFilter(data, filter, qual.value);
                    canvas.frames.push(dfilter);
                    canvas.frameIndex = canvas.frames.length - 1;
                    canvas.installFrame(canvas.getFrame(canvas.frames.length - 1));
                } else {
                    var dfilter, r, g, b;
                    r = canvas.findEl("#r");
                    g = canvas.findEl("#g");
                    b = canvas.findEl("#b")
                    if (r.disabled) {
                        r = null;
                    }
                    if (g.disabled) {
                        g = null;
                    }
                    if (b.disabled) {
                        b = null;
                    }
                    dfilter = createFilter2(data, r === null ? null : r.value, g === null ? null : g.value, b === null ? null : b.value);
                    canvas.frames.push(dfilter);
                    canvas.frameIndex = canvas.frames.length - 1;
                    canvas.installFrame(canvas.getFrame(canvas.frames.length - 1));
                }
                this.hide();
            }
        }
    });
    setTimeout(() => {
        var filterEl, qual;
        if (FILTER.value !== "custom") { document.querySelector('#disp').classList.add('hidden'); }
        filterEl = canvas.findEl("#filterel");
        qual = canvas.findEl("#range");
        filterEl.value = capitalize(FILTER.value);
        qual.value = FILTER.qual;
    }, 20);
    dialog.show();
}

function showAboutDialog() {
    var dialog = duDialog("About", `
    <img src="../res/icon.jpg" class="center">
    <h1 style="text-align:center">ImageEditor</h1>
    <br/>
    <p style="text-align: center">This application is created by Humoyun Sattoraliyev. Uses CanvasRenderingContext2D. 
    </p><p style="text-align: center; font-weight:bold;">Version: v1.0.1</p><br/>
    `, { init: true });
    dialog.show();
}

function editObject() {
    if (canvas.MODE == canvas.MODES[1]) {
        var dialog = duDialog("Edit Object", `
        <button class="button" title="Click This Button Get Last Object Properties"
        onclick='var text, fontFamily, fontSize; var skcol, lw, flcol, wh, ht, r; skcol = document.querySelector("#objectstrokecolor");  text = canvas.findEl("#objecttext"); fontFamily = canvas.findEl("#objectfontfamily"); fontSize = canvas.findEl("#objectfontsize"); fontFamily.value = canvas.OBJECTS.fontFamily; fontSize.value = canvas.OBJECTS.fontSize; text.value = canvas.OBJECTS.text; r = document.querySelector("#objectradius"); lw = document.querySelector("#objectlinewidth"); flcol = document.querySelector("#objectfillcolor"); wh = document.querySelector("#objectwidth"); ht = document.querySelector("#objectheight"); skcol.value = canvas.OBJECTS.strokeStyle; lw.value = canvas.OBJECTS.lw; flcol.value = canvas.OBJECTS.fillStyle; wh.value = canvas.OBJECTS.w; ht.value = canvas.OBJECTS.h; r.value = canvas.OBJECTS.r; canvas.OBJECTS.y = canvas.OBJECTS.object.y; canvas.OBJECTS.x = canvas.OBJECTS.object.x; '>
        Reset Properites To Last Object Properties
        </button>
    <p>Stroke Color:</p>    
    <input type="color" id="objectstrokecolor" />
    <p>Line Width:</p>
    <input type="range" id="objectlinewidth" value="3" max="10" min="1" step="1" onchange="this.previousElementSibling.textContent = 'Line Width: ' + this.value"/>
    <p>Fill Color:</p>    
    <input type="color" id="objectfillcolor" />
    <p>Width:</p>
    <input type="number" value="100" max="666" min="0" id="objectwidth" placeholder="Object Width"/>
    <p>Height:</p>
    <input type="number" value="100" max="666" min="0" id="objectheight" placeholder="Object Height"/>
    <p>Image:</p>
    <input type="file" onchange="window.anotherFiles = this.files[0];" id="anotherfile" />
    <p>Radius:</p>
    <input type="number" value="10" max="200" min="0" id="objectradius" placeholder="Object Radius"/>
    <p>Text:</p>
    <input type="text" id="objecttext" placeholder="Type Text Here..."/>
    <p>Font Family:</p>
    <select id="objectfontfamily" >
    <option name="-apple-system">-apple-system</option>
    <option name="BlinkMacSystemFont">BlinkMacSystemFont</option>
    <option name="Segoe UI">Segoe UI</option>
    <option name="Roboto">Roboto</option>
    <option name="Oxygen">Oxygen</option>
    <option name="Ubuntu">Ubuntu</option>
    <option name="Cantarell">Cantarell</option>
    <option name="Open Sans">Open Sans</option>
    <option name="Helvetica Neue">Helvetica Neue</option>
    <option name="sans-serif">sans-serif</option>
    <option name="Trebuchet MS">Trebuchet MS</option>
    <option name="Calibri">Calibri</option>
    <option name="Gill Sans MT">Gill Sans MT</option>
    <option name="Gill Sans">Gill Sans</option>
    <option name="fantasy">fantasy</option>
    <option name="monospace">monospace</option>
    <option name="Verdana">Verdana</option>
    <option name="Tahoma">Tahoma</option>
    <option name="cursive">cursive</option>
    </select>
    <p>Font Size:</p>
    <input name="fontsize" type="number" id="objectfontsize" placeholder="Input Font Size...">
    `, {
            init: true,
            callbacks: {
                buttons: duDialog.OK_CANCEL,
                okClick: function () {
                    var skcol, lw, flcol, anotherFilee, wh, ht, r, text, fontFamily, fontSize;
                    skcol = canvas.findEl("#objectstrokecolor").value;
                    r = canvas.findEl("#objectradius").value;
                    lw = canvas.findEl("#objectlinewidth").value;
                    flcol = canvas.findEl("#objectfillcolor").value;
                    anotherFilee = canvas.findEl("#anotherfile");
                    wh = canvas.findEl("#objectwidth").value;
                    text = canvas.findEl("#objecttext").value;
                    fontFamily = canvas.findEl("#objectfontfamily").value;
                    fontSize = canvas.findEl("#objectfontsize").value;
                    ht = canvas.findEl("#objectheight").value;
                    canvas.OBJECTS.strokeStyle = skcol;
                    canvas.OBJECTS.lw = lw;
                    canvas.OBJECTS.fillStyle = flcol;
                    canvas.OBJECTS.w = wh;
                    canvas.OBJECTS.r = r;
                    canvas.OBJECTS.h = ht;
                    canvas.OBJECTS.fontFamily = fontFamily;
                    canvas.OBJECTS.fontSize = fontSize;
                    canvas.OBJECTS.text = text;
                    if (canvas.OBJECTS.object.object_name == "Image") {
                        canvas.OBJECTS.src = URL.createObjectURL(new Blob([window.anotherFiles], { type: window.anotherFiles.type ? window.anotherFiles.type : "image/png" }));
                    }
                    if (canvas.OBJECTS.object) {
                        canvas.OBJECTS.object.install(canvas.OBJECTS);
                        if (canvas.OBJECTS.object.object_name == "Circle") {
                            focusObj.x = canvas.OBJECTS.object.x - canvas.OBJECTS.object.r - 4;
                            focusObj.y = canvas.OBJECTS.object.y - canvas.OBJECTS.object.r - 4;
                            focusObj.w = (canvas.OBJECTS.object.r * 2) + 8;
                            focusObj.h = (canvas.OBJECTS.object.r * 2) + 8;
                        } else {
                            focusObj.x = canvas.OBJECTS.object.x - 4;
                            focusObj.y = canvas.OBJECTS.object.y - 4;
                            focusObj.w = (canvas.OBJECTS.object.w * 1) + 8;
                            focusObj.h = (canvas.OBJECTS.object.h * 1) + 8;
                        }
                    }
                    this.hide();
                }
            }
        })
        dialog.show();
    } else {
        var dialog = duDialog(null, "To Add Or Edit Objects You Need To Change Mode To <b>Object Editor</b>", { init: true });
        dialog.show();
    }
}

function zPlus() {
    if (canvas.MODE == canvas.MODES[1]) {
        if (canvas.OBJECTS.object) {
            var index = canvas.OBJECTS.objects.findIndex((obj) => {
                return obj.id == canvas.OBJECTS.object.id;
            });
            console.log("ZP: " + index);
            var saved = canvas.OBJECTS.objects[index - 1];
            if (index <= 0) {
                index = 0;
            } else {
                index--;
                canvas.OBJECTS.objects.splice(index, 1, canvas.OBJECTS.objects[index + 1]);
                canvas.OBJECTS.objects.splice(index + 1, 1, saved);
            }
        } else {
            var dialog = duDialog(null, "Oops you have not any <b>Active Object</b> To Add This Simple Click <b>OA</b>(Object Add) Button.", { init: true });
            dialog.show();
        }
    } else {
        var dialog = duDialog(null, "To Add Or Edit Objects You Need To Change Mode To <b>Object Editor</b>", { init: true });
        dialog.show();
    }
}

function centerObject() {
    if (canvas.MODE == canvas.MODES[1]) {
        if (canvas.OBJECTS.object) {
            canvas.OBJECTS.center();
            canvas.OBJECTS.object.diff(canvas.OBJECTS);
            if (canvas.OBJECTS.object.object_name == "Circle" || canvas.OBJECTS.object.object_name == "StrokeCircle") {
                focusObj.x = canvas.OBJECTS.object.x - canvas.OBJECTS.object.r - 4;
                focusObj.y = canvas.OBJECTS.object.y - canvas.OBJECTS.object.r - 4;
                focusObj.w = (canvas.OBJECTS.object.r * 2) + 8;
                focusObj.h = (canvas.OBJECTS.object.r * 2) + 8;
            } else {
                focusObj.x = canvas.OBJECTS.object.x - 4;
                focusObj.y = canvas.OBJECTS.object.y - 4;
                focusObj.w = (canvas.OBJECTS.object.w * 1) + 8;
                focusObj.h = (canvas.OBJECTS.object.h * 1) + 8;
            }
        }
    }
    else {
        var dialog = duDialog(null, "To Add Or Edit Objects You Need To Change Mode To <b>Object Editor</b>", { init: true });
        dialog.show();
    }
}

function zMinus() {
    if (canvas.MODE == canvas.MODES[1]) {
        if (canvas.OBJECTS.object) {
            var index = canvas.OBJECTS.objects.findIndex((obj) => {
                return obj.id == canvas.OBJECTS.object.id;
            });
            console.log("ZM: " + index);
            var saved = canvas.OBJECTS.objects[index + 1];
            if (index >= canvas.OBJECTS.objects.length - 1) {
                index = canvas.OBJECTS.objects.length - 1;
            } else {
                index++;
                canvas.OBJECTS.objects.splice(index, 1, canvas.OBJECTS.objects[index - 1]);
                canvas.OBJECTS.objects.splice(index - 1, 1, saved);
            }
        } else {
            var dialog = duDialog(null, "Oops you have not any <b>Active Object</b> To Add This Simple Click <b>OA</b>(Object Add) Button.", { init: true });
            dialog.show();
        }
    } else {
        var dialog = duDialog(null, "To Add Or Edit Objects You Need To Change Mode To <b>Object Editor</b>", { init: true });
        dialog.show();
    }
}

const sveFile = () => {
    const dialog = duDialog("Save", `
            <p>Choose Formats:</p>
            <select name='selection' value='png' id='selection'><option name='png'>PNG</option><option name='jpeg'>JPG</option><option name="base64">Base64</option></select>
            <p class="margin">Choose Quality: </p>
            <select name='selection2' value='good' id='selection2'><option name='bad'>BAD</option><option name='normal'>NORMAL</option><option name='high'>HIGH</option></select>
            <p class="margin">Width:</p>
            <input type="number" placeholder="Type width of the image" id="width">
            <p class="margin">Height:</p>
            <input type="number" placeholder="Type height of the image" id="height">
            <p class="margin" >Save With Its Original Size:</p>
            <input type="checkbox" name="original" onchange="if(this.checked) {document.querySelector('#width').disabled = true;document.querySelector('#height').disabled = true}else{document.querySelector('#width').disabled = false;document.querySelector('#height').disabled = false}"/> 
            `, {
        init: true,
        buttons: duDialog.OK_CANCEL,
        callbacks: {
            okClick: async function () {
                var type, pix, format, url, saved, qual, width, height;
                type = document.querySelector("#selection");
                pix = document.querySelector("#selection2");
                width = document.querySelector("#width");
                height = document.querySelector("#height");
                switch (type.value.toString().toUpperCase()) {
                    case "PNG":
                        format = "image/png";
                        break;
                    case "JPG":
                        format = "image/jpeg";
                        break;
                    case "BASE64":
                        format = "text/plain";
                        break;
                }
                switch (pix.value.toString().toUpperCase()) {
                    case "BAD":
                        qual = "0.2";
                        break;
                    case "NORMAL":
                        qual = "0.5";
                        break;
                    case "HIGH":
                        qual = "1";
                        break;
                }
                saved = canvas.getDataUrl(format, qual);
                if (height.disabled != true) {
                    if (/[0-9]/gi.test(width.value) && /[0-9]/gi.test(height.value)) {
                        saved = await canvas.getImage(saved, format, qual, width.value, height.value);
                    }
                } else {
                    saved = await canvas.getImage(saved, format, qual, IMAGES[0].nationalWidth ? IMAGES[0].nationalWidth : 500, IMAGES[0].nationalHeight ? IMAGES[0].nationalHeight : 500);
                }
                url = format === "text/plain" ? canvas.saveImage(saved, format) : saved;
                var mess = "<a href=" + url + " download=" + new Date().getTime() + "." + (format === 'text/plain' ? 'txt' : format === 'image/jpeg' ? 'jpg' : 'png') + ">link</a>";
                this.hide();
                const downDial = duDialog(null, "Your download link is ready! Click this " + mess + " to start downloading...", { init: true });
                downDial.show();
            },

            cancelClick: function () {
                this.hide();
            }
        }
    });
    dialog.show();
}

function MouseDown(e) {
    var lx = e.clientX - e.target.getBoundingClientRect().left;
    var ly = e.clientY - e.target.getBoundingClientRect().top;
    canvas.mouse.active = true;
    // canvas.mouse.lx = lx;
    // canvas.mouse.ly = ly;
}

function MouseMove(e) {
    canvas.mouse.lx = canvas.mouse.x;
    canvas.mouse.ly = canvas.mouse.y;
    var x = e.clientX - e.target.getBoundingClientRect().left;
    var y = e.clientY - e.target.getBoundingClientRect().top;
    canvas.mouse.x = x;
    canvas.mouse.y = y;
    stat = { x: canvas.mouse.x, y: canvas.mouse.y, lx: canvas.mouse.lx, ly: canvas.mouse.ly };
    coordsEl.innerHTML = `
    X: <b>${Math.floor(canvas.mouse.x)}</b><br/>
    Y: <b>${Math.floor(canvas.mouse.y)}</b>
    `;
    if (canvas.addingObject) {
        if (canvas.OBJECTS.object) {
            currentObjectEl.innerHTML = "Current Object: <b>" + canvas.OBJECTS.object.object_name + "</b><br/>Current Mode:<b> " + canvas.MODE + "</b>";
        }
    } else {
        currentObjectEl.innerHTML = "Current Object: <b>None</b><br/>Current Mode:<b> " + canvas.MODE + "</b>";
    }

    if (canvas.MODE == canvas.MODES[0]) {
        if (canvas.mouse.active) {
            canvas.pen(stat, canvas.PEN.lcap, canvas.PEN.ljoin, canvas.PEN.width, canvas.PEN.color);
        }
    }

    if (canvas.MODE == canvas.MODES[1]) {
        if (canvas.mouse.active) {
            if (canvas.OBJECTS.object) {
                focusObj.drawing = true;
                canvas.OBJECTS.object.x = canvas.mouse.x;
                canvas.OBJECTS.object.y = canvas.mouse.y;
                if (canvas.OBJECTS.object.object_name == "Circle") {
                    focusObj.x = canvas.OBJECTS.object.x - canvas.OBJECTS.object.r - 4;
                    focusObj.y = canvas.OBJECTS.object.y - canvas.OBJECTS.object.r - 4;
                    focusObj.w = (canvas.OBJECTS.object.r * 2) + 8;
                    focusObj.h = (canvas.OBJECTS.object.r * 2) + 8;
                } else {
                    focusObj.x = canvas.OBJECTS.object.x - 4;
                    focusObj.y = canvas.OBJECTS.object.y - 4;
                    focusObj.w = (canvas.OBJECTS.object.w * 1) + 8;
                    focusObj.h = (canvas.OBJECTS.object.h * 1) + 8;
                }
            }
        }
    }
}

function readDoc() {
    duDialog("Mini ImageEditor", `
    <p><i class="fa fa-upload " style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Upload Your Images Make Sure They SHould Be Less Than 2MB.</p> 
    <p><i class="fa fa-save"style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Save Image, Formats(PNG, JPEG, BASE64).</p> 
    <p><i class="fa fa-pen-fancy" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Enable Pen Mode, By Default It Will Be Dsiabled.</p> 
    <p><i class="fa fa-brush" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Change Pen Settings Such As Color, Line Width, LineCap, LineJoin. </p> 
    <p><i class="fa fas fa-undo" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: Undo/Redo Buttons Maximum Saving Is Unlimited.</p> 
    <p><i class="fa fas fa-eraser"style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Erase Whole Image.</p> 
    <p><i class="fa fas fa-image" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Change Opacity Of The Image (0 to 1) If It Is 0 And Then You Will No Longer See The Image..</p> 
    <p><i class="fa fas fa-shapes" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Enable Object Editor Mode, If You Click Enable This Mode The Pen Mode Will Be Disabled. </p>
    <p><i class="fa fas fa-plus" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Add Objects To The Image (If Object Mode Is Enabled) </p>
    <p><i class="fa fas fa-edit" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Edit Current Active Object (If Object Mode Is Enabled) </p>
    <p><i class="fa fas fa-ruler" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;" aria-hidden="true"></i>: To Center Objects (If Object Mode Is Enabled) </p>
    <p>Z+: To Increment Z Index Of an Object (If Object Mode Is Enabled) </p>
    <p>Z-: To Decrement Z Index Of an Object (If Object Mode Is Enabled) </p>
    <p><i class="fa fa-mouse-pointer" style="color: #099; margin: 0 .5em 0 0;font-size: 20px;"></i>: To Choose An Object To Use It As Active Object (If Object Mode Is Enabled) </p>

    `, {
        init: true,
        buttons: duDialog.OK_CANCEL
    }).show();
}

function createNew() {
    IMAGES[0] = undefined;
    if (canvas.MODE == canvas.MODES[0]) {
        if (canvas.PEN.draw) {
            handlePen();
        }
    } else {
        if (canvas.addingObject) {
            toggleObjectAdding();
        }
    }
    canvas.MODE = canvas.MODES[3];
    canvas.OBJECTS.setDefault();
    canvas.clearScene();
    canvas.frames = [];
    var data = canvas.captureScene();
    canvas.frames.push(data);
    canvas.frameIndex = canvas.frames.length - 1;
    canvas.installFrame(canvas.getFrame(canvas.frames.length - 1));
}

function MouseOut() {
    canvas.mouse.active = false;
    if (canvas.addingObject != true && focusObj.drawing != true) {
        var data = canvas.captureScene();
        canvas.frames.push(data);
        canvas.frameIndex = canvas.frames.length - 1;
        canvas.installFrame(canvas.getFrame(canvas.frames.length - 1));
    }
}

function notAvailable() {
    duDialog(null, "Sorry, Currently this functionality is not available...", { init: true }).show();
}

function allowGrid() {
    notAvailable();
}

function cropImage() {
    notAvailable();
}

function addStickers() {
    notAvailable();
}

function drawScene() {
    if (canvas.MODE == canvas.MODES[1]) {
        canvas.installCurrentFrame();
        if (canvas.OBJECTS.object) {
            currentObjectEl.innerHTML = "Current Object: <b>" + canvas.OBJECTS.object.object_name + "</b><br/>Current Mode: <b>" + canvas.MODE + "</b>";
        } else {
            currentObjectEl.innerHTML = "Current Object: <b>Not Chosen</b><br/>Current Mode:<b> " + canvas.MODE + "</b>";
        }
        canvas.OBJECTS.objects.forEach((obj) => {
            obj.draw(canvas.DOM.ctx);
        });
        if (focusObj.drawing) {
            focusObj.draw(canvas.DOM.ctx);
        }
        window.requestAnimationFrame(drawScene);
    }
}

zplusEl.addEventListener("click", zMinus);
zminusEl.addEventListener("click", zPlus);
readDocEl.addEventListener("click", readDoc);
centerObjectEl.addEventListener("click", centerObject);
editObjectsEl.addEventListener("click", editObject);
objectsgetEl.addEventListener("click", getObject);
objectsAddingEl.addEventListener("click", toggleObjectAdding);
objectsEl.addEventListener("click", handleObjects);
opacityEl.addEventListener("click", handleOpacity);
clearEl.addEventListener("click", clearScene);
penEl.addEventListener("click", handlePen);
undoEl.addEventListener("click", frameUndo);
redoEl.addEventListener("click", frameRedo);
filterEl.addEventListener("click", filterImage);
canvas.DOM.canvas.addEventListener("mousedown", MouseDown);
canvas.DOM.canvas.addEventListener("mousemove", MouseMove);
canvas.DOM.canvas.addEventListener("mouseup", MouseOut);
customizeEl.addEventListener("click", changePenAttrib);
saveEl.addEventListener("click", sveFile);
aboutEl.addEventListener("click", showAboutDialog);
fileEl.addEventListener("change", handleFile);
createnewEl.addEventListener("click", createNew);


//Not Created
allowgridEl.addEventListener("click", allowGrid);
addstickersEl.addEventListener("click", addStickers);
cropimageEl.addEventListener("click", cropImage);


// Created By Humoyun Dev - @HumoyunDeveloper