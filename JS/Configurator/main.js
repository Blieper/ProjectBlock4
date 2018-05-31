let gridSize = 100;

let anchorTypes = {
    TOPLEFT: 0,
    LEFT: 1,
    BOTTOMLEFT: 2,
    TOP: 3,
    CENTER: 4,
    BOTTOM: 5,
    TOPRIGHT: 6,
    RIGHT: 7,
    BOTTOMRIGHT: 8,
};

let NewFurnitureClickable;
let GarbageCan;

let currentFurnitureTypeID = 0;
let currentFurnitureType = FurnitureTypes[currentFurnitureTypeID];

function setup() {
    createCanvas(1000, 900);
    background(200);

    NewFurnitureClickable = new Clickable(0,-100,100,100,anchorTypes.BOTTOM);
    NewFurnitureClickable.text = currentFurnitureType.name;
    NewFurnitureClickable.onPressed = function () {
        let newFurniture = new Furniture(this.realX,this.realY,100,100);
        newFurniture.setGridDimension(currentFurnitureType.sizeX, currentFurnitureType.sizeY);
        newFurniture.text = currentFurnitureType.name;
        newFurniture.setRenderLayer("furniture");

        this.pressed = function () {
            newFurniture.pressed();
        }

        this.onUnpressed = function () {
            newFurniture.onUnpressed();
            this.pressed = null;
        }
    }

    NextFurnitureClickable = new Clickable(100,-100,75,75,anchorTypes.BOTTOM);
    NextFurnitureClickable.text = ">";
    NextFurnitureClickable.onUnpressed = function () {
        currentFurnitureTypeID++;
        if (currentFurnitureTypeID > FurnitureTypes.length - 1) {currentFurnitureTypeID = 0}

        currentFurnitureType = FurnitureTypes[currentFurnitureTypeID];
        NewFurnitureClickable.text = currentFurnitureType.name;
    }

    PrevFurnitureClickable = new Clickable(-100,-100,75,75,anchorTypes.BOTTOM);
    PrevFurnitureClickable.text = "<";
    PrevFurnitureClickable.onUnpressed = function () {
        currentFurnitureTypeID--;
        if (currentFurnitureTypeID < 0) {currentFurnitureTypeID = FurnitureTypes.length - 1}

        currentFurnitureType = FurnitureTypes[currentFurnitureTypeID];
        NewFurnitureClickable.text = currentFurnitureType.name;
    }

    GarbageCan = new Clickable(100,-100,100,100,anchorTypes.BOTTOMLEFT);
    GarbageCan.text = "Garbage";
    GarbageCan.isClickable = false;
}

function draw() {
    clear();
    cursor(ARROW);
    background(200);

    // Update all clickables
    // for (let i = 0; i < clickables.length; i++) {
    //     if (clickables[i] != undefined) {
    //         clickables[i].update();
    //     }
    // }

    for (layer of clickableRenderLayers) {
        for (let i = 0; i < layer.objects.length; i++) {
            if (layer.objects[i] != undefined) {
                layer.objects[i].update();
            }
        }
    }
}