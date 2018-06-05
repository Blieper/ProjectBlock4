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
tabletype1.sizeX = 1;
tabletype1.sizeY = 2;


let couchtype = new FurnitureType();
couchtype.name = "couch";
couchtype.sizeX = 2;