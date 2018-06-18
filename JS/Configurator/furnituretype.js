let FurnitureTypes = [];
let FurnitureCategories = [];

class FurnitureType {
    constructor() {
        FurnitureTypes.push(this);

        this.name = "";
        this.imagePath = "";
        this.image = null;
        this.sizeX = 1;
        this.sizeY = 1;
    }
}

class FurnitureCategory {
    constructor() {
        FurnitureCategories.push(this);

        this.name = "";
        this.types = [];
    }
}

let x;
let y;

// Bed category
y = new FurnitureCategory();
y.name = "bed";

x = new FurnitureType();
x.name = "bed1";
x.imagePath = "Images/furniture/bed/bed (2).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

x = new FurnitureType();
x.name = "bed2";
x.imagePath = "Images/furniture/bed/bed (3).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

x = new FurnitureType();
x.name = "bed3";
x.imagePath = "Images/furniture/bed/bed (1).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

x = new FurnitureType();
x.name = "bed4";
x.imagePath = "Images/furniture/bed/bed (4).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

// Chair category
y = new FurnitureCategory();
y.name = "chair";

x = new FurnitureType();
x.name = "chair1";
x.imagePath = "Images/furniture/chair/chair (1).png";
y.types.push(x);

x = new FurnitureType();
x.name = "chair2";
x.imagePath = "Images/furniture/chair/chair (3).png";
y.types.push(x);

x = new FurnitureType();
x.name = "chair3";
x.imagePath = "Images/furniture/chair/chair (4).png";
y.types.push(x);

x = new FurnitureType();
x.name = "chair4";
x.imagePath = "Images/furniture/chair/chair (2).png";
y.types.push(x);

// Corner shelf category
y = new FurnitureCategory();
y.name = "cornershelf";

x = new FurnitureType();
x.name = "cornershelf1";
x.imagePath = "Images/furniture/corner shelf/shelf (1).png";
y.types.push(x);

x = new FurnitureType();
x.name = "cornershelf2";
x.imagePath = "Images/furniture/corner shelf/shelf (4).png";
y.types.push(x);

x = new FurnitureType();
x.name = "cornershelf3";
x.imagePath = "Images/furniture/corner shelf/shelf (3).png";
y.types.push(x);

x = new FurnitureType();
x.name = "cornershelf4";
x.imagePath = "Images/furniture/corner shelf/shelf (2).png";
y.types.push(x);

// Fridge shelf category
y = new FurnitureCategory();
y.name = "fridge";

x = new FurnitureType();
x.name = "fridge1";
x.imagePath = "Images/furniture/fridge/fridge (1).png";
y.types.push(x);

x = new FurnitureType();
x.name = "fridge2";
x.imagePath = "Images/furniture/fridge/fridge (2).png";
y.types.push(x);

x = new FurnitureType();
x.name = "fridge3";
x.imagePath = "Images/furniture/fridge/fridge (3).png";
y.types.push(x);

x = new FurnitureType();
x.name = "fridge4";
x.imagePath = "Images/furniture/fridge/fridge (4).png";
y.types.push(x);

// Toilet shelf category
y = new FurnitureCategory();
y.name = "toilet";

x = new FurnitureType();
x.name = "toilet1";
x.imagePath = "Images/furniture/toilet/toilet (2).png";
y.types.push(x);

x = new FurnitureType();
x.name = "toilet2";
x.imagePath = "Images/furniture/toilet/toilet (3).png";
y.types.push(x);

x = new FurnitureType();
x.name = "toilet3";
x.imagePath = "Images/furniture/toilet/toilet (4).png";
y.types.push(x);

x = new FurnitureType();
x.name = "toilet4";
x.imagePath = "Images/furniture/toilet/toilet (1).png";
y.types.push(x);

// Table shelf category
y = new FurnitureCategory();
y.name = "table";

x = new FurnitureType();
x.name = "table1";
x.imagePath = "Images/furniture/table/table (1).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

x = new FurnitureType();
x.name = "table2";
x.imagePath = "Images/furniture/table/table (2).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

// Couch category
y = new FurnitureCategory();
y.name = "couch";

x = new FurnitureType();
x.name = "couch1";
x.imagePath = "Images/furniture/couch/couch (2).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

x = new FurnitureType();
x.name = "couch2";
x.imagePath = "Images/furniture/couch/couch (3).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

x = new FurnitureType();
x.name = "couch3";
x.imagePath = "Images/furniture/couch/couch (4).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

x = new FurnitureType();
x.name = "couch4";
x.imagePath = "Images/furniture/couch/couch (1).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

// Shower category
y = new FurnitureCategory();
y.name = "shower";

x = new FurnitureType();
x.name = "shower1";
x.imagePath = "Images/furniture/shower/shower (2).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

x = new FurnitureType();
x.name = "shower2";
x.imagePath = "Images/furniture/shower/shower (3).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

x = new FurnitureType();
x.name = "shower3";
x.imagePath = "Images/furniture/shower/shower (4).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

x = new FurnitureType();
x.name = "shower4";
x.imagePath = "Images/furniture/shower/shower (1).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

// Sink category
y = new FurnitureCategory();
y.name = "sink";

x = new FurnitureType();
x.name = "sink1";
x.imagePath = "Images/furniture/sink/sink (2).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

x = new FurnitureType();
x.name = "sink2";
x.imagePath = "Images/furniture/sink/sink (3).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

x = new FurnitureType();
x.name = "sink3";
x.imagePath = "Images/furniture/sink/sink (4).png";
x.sizeX = 2;
x.sizeY = 1;
y.types.push(x);

x = new FurnitureType();
x.name = "sink4";
x.imagePath = "Images/furniture/sink/sink (1).png";
x.sizeX = 1;
x.sizeY = 2;
y.types.push(x);

// Stove category
y = new FurnitureCategory();
y.name = "stove";

x = new FurnitureType();
x.name = "stove";
x.imagePath = "Images/furniture/stovetop/stove.png";
x.sizeX = 1;
x.sizeY = 1;
y.types.push(x);