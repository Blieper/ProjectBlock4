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
let currentFurnitureCategoryID = 0;
let currentFurnitureCategory = FurnitureCategories[0];
let currentFurnitureType = currentFurnitureCategory.types[0]//FurnitureTypes[currentFurnitureTypeID];

function setup() {
    var canvas = createCanvas(1000, 900);
    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    background(200);

    NewFurnitureClickable = new Clickable(0,-100,100,100,anchorTypes.BOTTOM);
    NewFurnitureClickable.image = currentFurnitureType.image;
    NewFurnitureClickable.constrainImage = true;
    NewFurnitureClickable.imageScale = 0.9;
    NewFurnitureClickable.onPressed = function () {
        let newFurniture = new Furniture(this.realX,this.realY,100,100);
        newFurniture.setGridDimension(currentFurnitureType.sizeX, currentFurnitureType.sizeY);
        newFurniture.setRenderLayer("furniture");
        newFurniture.image = currentFurnitureType.image;
        newFurniture.drawFrame = false;
        newFurniture.constrainImage = true;

        this.pressed = function () {
            newFurniture.pressed();
        }

        this.onUnpressed = function () {
            newFurniture.onUnpressed();
            this.pressed = null;
        }
    }

    NextFurnitureClickable = new Clickable(100,-100,75,75,anchorTypes.BOTTOM);
    NextFurnitureClickable.image = loadImage("Images/buttons/next-01.png");
    NextFurnitureClickable.constrainImage = true;
    NextFurnitureClickable.imageScale = 0.9;
    NextFurnitureClickable.onUnpressed = function () {
        currentFurnitureCategoryID++;
        if (currentFurnitureCategoryID > FurnitureCategories.length - 1) {currentFurnitureCategoryID = 0}

        currentFurnitureCategory = FurnitureCategories[currentFurnitureCategoryID];

        currentFurnitureTypeID = currentFurnitureTypeID > currentFurnitureCategory.types.length - 1 ? currentFurnitureTypeID = 0 : currentFurnitureTypeID = currentFurnitureTypeID;
        currentFurnitureType = currentFurnitureCategory.types[currentFurnitureTypeID];

        NewFurnitureClickable.image = currentFurnitureType.image;
    }

    PrevFurnitureClickable = new Clickable(-100,-100,75,75,anchorTypes.BOTTOM);
    PrevFurnitureClickable.image = loadImage("Images/buttons/Prev-01.png");
    PrevFurnitureClickable.constrainImage = true;
    PrevFurnitureClickable.imageScale = 0.9;
    PrevFurnitureClickable.onUnpressed = function () {
        currentFurnitureCategoryID--;
        if (currentFurnitureCategoryID < 0) {currentFurnitureCategoryID =FurnitureCategories.length - 1}

        currentFurnitureCategory = FurnitureCategories[currentFurnitureCategoryID];

        currentFurnitureTypeID = currentFurnitureTypeID > currentFurnitureCategory.types.length - 1 ? currentFurnitureTypeID = 0 : currentFurnitureTypeID = currentFurnitureTypeID;
        currentFurnitureType = currentFurnitureCategory.types[currentFurnitureTypeID];

        NewFurnitureClickable.image = currentFurnitureType.image;
    }

    TurnFurnitureClickable = new Clickable(190,-100,75,75,anchorTypes.BOTTOM);
    TurnFurnitureClickable.image = loadImage("Images/buttons/Rotate-01.png");
    TurnFurnitureClickable.constrainImage = true;
    TurnFurnitureClickable.imageScale = 0.9;
    TurnFurnitureClickable.onUnpressed = function () {
        currentFurnitureTypeID--;
        if (currentFurnitureTypeID < 0) {currentFurnitureTypeID = currentFurnitureCategory.types.length - 1}

        currentFurnitureType = currentFurnitureCategory.types[currentFurnitureTypeID];
        NewFurnitureClickable.image = currentFurnitureType.image;
    }

    GarbageCan = new Clickable(100,-100,100,100,anchorTypes.BOTTOMLEFT);
    GarbageCan.isClickable = false;
    GarbageCan.image = loadImage("Images/buttons/garbage1.png");

    for (f of FurnitureTypes) {
        f.image = loadImage(f.imagePath);
    }

    BackgroundObject = new Clickable(0,350,1000,700,anchorTypes.TOP);
    BackgroundObject.image = loadImage("Images/designer/designer9.png");
    BackgroundObject.isClickable = false;
    BackgroundObject.drawFrame = false;

    NextFurnitureClickable.onUnpressed();
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