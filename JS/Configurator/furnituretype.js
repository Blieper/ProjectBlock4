let FurnitureTypes = [];

class FurnitureType {
    constructor() {
        FurnitureTypes.push(this);

        this.name = "";
        this.image = "";
        this.sizeX = 1;
        this.sizeY = 1;
    }
}

let chairtype = new FurnitureType();
chairtype.name = "chair";

let tabletype = new FurnitureType();
tabletype.name = "table";
tabletype.sizeX = 3;
tabletype.sizeY = 2;

let couchtype = new FurnitureType();
couchtype.name = "couch";
couchtype.sizeX = 2;