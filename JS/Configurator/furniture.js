let furniture = [];

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

        this.desiredGridX = 0;
        this.desiredGridY = 0;
        this.lastDesiredGridX = 0;
        this.lastDesiredGridY = 0;       

        this.inGarbage = false;

        this.offsetGrabX = 0;
        this.offsetGrabY = 0;   

        this.hoverScale = 1;

        this.onPressed = function () {
            let deltaX = ((this.realX + this.standardWidth/2) - mouseX);
            deltaX = Math.floor(deltaX/gridSize);

            let deltaY =  ((this.realY + this.standardHeight/2) - mouseY);
            deltaY = Math.floor(deltaY/gridSize);
              
            this.offsetGrabX = deltaX;
            this.offsetGrabY = deltaY;  
        }

        this.pressed = function () {
            let xGrid = Math.round((mouseX + gridSize/2)/gridSize) + this.offsetGrabX;
            let yGrid = Math.round((mouseY + gridSize/2)/gridSize) + this.offsetGrabY;

            xGrid = Math.max(this.gridSizeX, Math.min(xGrid, 10));
            yGrid = Math.max(this.gridSizeY, Math.min(yGrid, 7));

            this.targetGridX = xGrid;
            this.targetGridY = yGrid;

            let moveGridX = xGrid - (this.gridSizeX-1)/2;
            let moveGridY = yGrid - (this.gridSizeY-1)/2;

            this.desiredGridX = moveGridX;
            this.desiredGridY = moveGridY;

            if (mouseY < 700) {
                this.moveToGrid(this.desiredGridX,this.desiredGridY);  
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
            this.setRenderLayer("furniture" + this.targetGridY);

            this.moveTo(
                xGrid * gridSize - gridSize/2,
                yGrid * gridSize - gridSize/2,
                0.65)
        }

        this.onUnpressed = function () {
            //this.hoverScale = 1.05;

            if (this.targetY > 750) {
                this.throwInGarbage();
                return;
            } 

            if (this.targetY > 700) {
                if (this.justCreated == true) {
                    this.throwInGarbage();
                } else {
                    this.moveToGrid(this.lastDesiredGridX,this.lastDesiredGridY);
                }

                return;
            } 

            let success = true;

            console.log("----Check----");

            for (let f of furniture) {
                if (f === this) {continue;}

                console.log("Object");

                for (let x1 = 0; x1 < this.gridSizeX; x1++) {
                    for (let y1 = 0; y1 < this.gridSizeY; y1++) {
                    
                        let testX = this.targetGridX - x1;
                        let testY = this.targetGridY - y1;

                        console.log("Own: ",testX,testY);

                        for (let x2 = 0; x2 < f.gridSizeX; x2++) {
                            for (let y2 = 0; y2 < f.gridSizeY; y2++) {
                            
                                let testX2 = f.currentGridX - x2;
                                let testY2 = f.currentGridY - y2;

                                console.log("Other: ",testX2,testY2);

                                if (testX == testX2 && testY == testY2) {
                                    success = false;
                                } 
                            }
                        }
                    }
                }
            }

            if (success) {
                this.currentGridX = this.targetGridX;
                this.currentGridY = this.targetGridY;

                this.lastDesiredGridX = this.desiredGridX;
                this.lastDesiredGridY = this.desiredGridY;

                if (this.justCreated == true) {
                    this.justCreated = false;
                    furniture.push(this);
                } else {
                    this.moveToGrid(this.lastDesiredGridX,this.lastDesiredGridY);
                }    
            } else {
                if (this.justCreated == true) {
                    this.throwInGarbage();
                } else {
                    this.moveToGrid(this.lastDesiredGridX,this.lastDesiredGridY);
                }
            }
        }

        let oldDelete = this.delete;
        this.delete = () => {
            furniture = furniture.filter(e => e !== this);

            oldDelete();
        }
    }


    throwInGarbage () {
        this.moveTo(GarbageCan.realX,GarbageCan.realY,0.15);
        this.isClickable = false;
        this.inGarbage = true;
        this.onArrived = this.delete;
    }

    onHovered () {
        //this.setToFront();
    }
}
