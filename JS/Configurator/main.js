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

    NewFurnitureClickable = new Clickable(0,-100,100,100,anchorTypes.BOTTOM);
    NewFurnitureClickable.image = currentFurnitureType.image;
    NewFurnitureClickable.constrainImage = true;
    NewFurnitureClickable.onPressed = function () {
        let newFurniture = new Furniture(this.realX,this.realY,100,100);
        newFurniture.setGridDimension(currentFurnitureType.sizeX, currentFurnitureType.sizeY);
        newFurniture.setRenderLayer("furniture");
        newFurniture.image = currentFurnitureType.image;
        newFurniture.drawFrame = false;

        this.pressed = function () {
            newFurniture.pressed();
        }

        this.onUnpressed = function () {
            newFurniture.onUnpressed();
            this.pressed = null;
        }
    }

    NextFurnitureClickable = new Clickable(100,-100,75,75,anchorTypes.BOTTOM);
    NextFurnitureClickable.image = loadImage("Images/buttons/next.png");
    //NextFurnitureClickable.drawFrame = false;
    NextFurnitureClickable.constrainImage = true;
    NextFurnitureClickable.onUnpressed = function () {
        currentFurnitureTypeID++;
        if (currentFurnitureTypeID > FurnitureTypes.length - 1) {currentFurnitureTypeID = 0}

        currentFurnitureType = FurnitureTypes[currentFurnitureTypeID];
        NewFurnitureClickable.image = currentFurnitureType.image;
    }

    PrevFurnitureClickable = new Clickable(-100,-100,75,75,anchorTypes.BOTTOM);
    PrevFurnitureClickable.image = loadImage("Images/buttons/back.png");
    //PrevFurnitureClickable.drawFrame = false;
    PrevFurnitureClickable.constrainImage = true;
    PrevFurnitureClickable.onUnpressed = function () {
        currentFurnitureTypeID--;
        if (currentFurnitureTypeID < 0) {currentFurnitureTypeID = FurnitureTypes.length - 1}

        currentFurnitureType = FurnitureTypes[currentFurnitureTypeID];
        NewFurnitureClickable.image = currentFurnitureType.image;
    }

    GarbageCan = new Clickable(100,-100,100,100,anchorTypes.BOTTOMLEFT);
    GarbageCan.isClickable = false;
    //GarbageCan.drawFrame = false;
    GarbageCan.image = loadImage("Images/buttons/garbage1.png");

    for (f of FurnitureTypes) {
        f.image = loadImage(f.imagePath);
    }

    BackgroundObject = new Clickable(0,350,1000,700,anchorTypes.TOP);
    BackgroundObject.image = loadImage("Images/designer/designer7.png");
    BackgroundObject.isClickable = false;
}

function draw() {
    clear();
    cursor(ARROW);
    background(255);

    // Update all clickables
    // for (let i = 0; i < clickables.length; i++) {
    //     if (clickables[i] != undefined) {
    //         clickables[i].update();
    //     }
    // }

    for (layer of clickableRenderLayers) {
        //console.log(layer);

        for (let i = 0; i < layer.objects.length; i++) {
            if (layer.objects[i] != undefined) {
                layer.objects[i].update();
            }
        }
    }
}