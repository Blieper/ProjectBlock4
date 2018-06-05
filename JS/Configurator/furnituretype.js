let FurnitureTypes = [];

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

let bedtype1 = new FurnitureType();
bedtype1.name = "bed1";
bedtype1.imagePath = "Images/furniture/bed/bed (1).png";
bedtype1.sizeX = 4;
bedtype1.sizeY = 2;

let bedtype2 = new FurnitureType();
bedtype2.name = "bed2";
bedtype2.imagePath = "Images/furniture/bed/bed (2).png";
bedtype2.sizeX = 2;
bedtype2.sizeY = 3;

let bedtype3 = new FurnitureType();
bedtype3.name = "bed3";
bedtype3.imagePath = "Images/furniture/bed/bed (3).png";
bedtype3.sizeX = 2;
bedtype3.sizeY = 3;

let chairtype1 = new FurnitureType();
chairtype1.name = "chair1";
chairtype1.imagePath = "Images/furniture/chair/chair (1).png";

let chairtype2 = new FurnitureType();
chairtype2.name = "chair2";
chairtype2.imagePath = "Images/furniture/chair/chair (2).png";

let chairtype3 = new FurnitureType();
chairtype3.name = "chair3";
chairtype3.imagePath = "Images/furniture/chair/chair (3).png";

let tabletype1 = new FurnitureType();
tabletype1.name = "table1";
tabletype1.imagePath = "Images/furniture/table/table (1).png";
tabletype1.sizeY = 2;

let tabletype2 = new FurnitureType();
tabletype2.name = "table2";
tabletype2.imagePath = "Images/furniture/table/table (2).png";
tabletype2.sizeX = 2;

let fridgetype1 = new FurnitureType();
fridgetype1.imagePath = "Images/furniture/fridge/fridge (1).png";
fridgetype1.name = "fridge1";
fridgetype1.sizeX = 2;
fridgetype1.sizeY = 2;

let fridgetype2 = new FurnitureType();
fridgetype2.imagePath = "Images/furniture/fridge/fridge (2).png";
fridgetype2.name = "fridge2";
fridgetype2.sizeX = 2;
fridgetype2.sizeY = 2;

let fridgetype3 = new FurnitureType();
fridgetype3.imagePath = "Images/furniture/fridge/fridge (3).png";
fridgetype3.name = "fridge3";
fridgetype3.sizeX = 2;
fridgetype3.sizeY = 2;

let minifridgetype1 = new FurnitureType();
minifridgetype1.imagePath = "Images/furniture/mini fridge/mini fridge (1).png";
minifridgetype1.name = "minifridge1";

let minifridgetype2 = new FurnitureType();
minifridgetype2.imagePath = "Images/furniture/mini fridge/mini fridge (2).png";
minifridgetype2.name = "minifridge2";

let minifridgetype3 = new FurnitureType();
minifridgetype3.imagePath = "Images/furniture/mini fridge/mini fridge (3).png";
minifridgetype3.name = "minifridge3";