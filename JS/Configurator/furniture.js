let furniture = [];
let takenSlots = new Array(10);
for (i = 1; i < 11; i++) {
    takenSlots[i] = [];
    for (j = 1; j < 8; j++) {
        takenSlots[i][j] = false;
    }
}

console.table(takenSlots);

class Furniture extends Clickable {

    constructor(x = 25, y = 25, width = gridSize, height = gridSize, anchor = anchorTypes.TOPLEFT) {
        super(x, y, width, height);
        this.justCreated = true;

        this.targetGridX = 0;
        this.targetGridY = 0;

        this.gridSizeX = 1;
        this.gridSizeY = 1;

        this.currentGridX = 0;
        this.currentGridY = 0;

        this.inGarbage = false;

        this.offsetGrabX = 0;
        this.offsetGrabY = 0;   

        this.onPressed = function () {
            let deltaX = ((this.realX + this.standardWidth/2) - mouseX);
            deltaX = Math.floor(deltaX/gridSize);

            let deltaY =  ((this.realY + this.standardHeight/2) - mouseY);
            deltaY = Math.floor(deltaY/gridSize);
              
            this.offsetGrabX = deltaX;
            this.offsetGrabY = deltaY;  
        }

        this.pressed = function () {
            this.hoverScale = 1;
            this.hoverScaler = 1;

            let xGrid = Math.round((mouseX + gridSize/2)/gridSize) + this.offsetGrabX;
            let yGrid = Math.round((mouseY + gridSize/2)/gridSize) + this.offsetGrabY;

            xGrid = Math.max(1, Math.min(xGrid, 10));
            yGrid = Math.max(1, Math.min(yGrid, 7));

            this.targetGridX = xGrid
            this.targetGridY = yGrid

            let moveGridX = xGrid - (this.gridSizeX-1)/2
            let moveGridY = yGrid - (this.gridSizeY-1)/2

            if (mouseY < 700) {
                this.moveToGrid(moveGridX,moveGridY);  
            } else {
                this.moveTo(mouseX,mouseY, 0.25);  
            }
        }

        this.setGridDimension = function (x, y) {
            this.gridSizeX = x;
            this.gridSizeY = y;  
            
            this.width  = gridSize * x;
            this.height = gridSize * y;

            this.standardWidth  = gridSize * x;
            this.standardHeight = gridSize * y;
        }

        this.moveToGrid = function (xGrid,yGrid) {
            this.moveTo(
                xGrid * gridSize - gridSize/2,
                yGrid * gridSize - gridSize/2,
                0.65)
        }

        this.onUnpressed = function () {
            this.hoverScale = 1.05;

            if (this.targetY > 750) {
                this.throwInGarbage();
                if (takenSlots[this.currentGridX]) {
                    takenSlots[this.currentGridX][this.currentGridY] = false; 
                }
                return;
            } 

            if (this.targetY > 700) {
                if (this.justCreated == true) {
                    this.throwInGarbage();
                } else {
                    this.moveToGrid(this.currentGridX,this.currentGridY);
                }

                return;
            } 

            if (takenSlots[this.targetGridX][this.targetGridY] == false) {
                if (this.justCreated == true) {
                    this.justCreated = false;
                    furniture.push(this);
                } else {
                    takenSlots[this.currentGridX][this.currentGridY] = false;                  
                }

                this.currentGridX = this.targetGridX;
                this.currentGridY = this.targetGridY;       
                
                takenSlots[this.currentGridX][this.currentGridY] = true;  

            } else {
                if (this.justCreated == true) {
                    this.throwInGarbage();
                } else {
                    this.moveToGrid(this.currentGridX,this.currentGridY);
                }
            }
        }
    }

    throwInGarbage () {
        this.moveTo(GarbageCan.realX,GarbageCan.realY,0.15);
        this.isClickable = false;
        this.inGarbage = true;
        this.onArrived = this.delete;
    }

    onHovered () {
        this.setToFront();
    }
}
