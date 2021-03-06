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
        this.lastFreeGridX = null;
        this.lastFreeGridY = null;           

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

            xGrid = Math.max(this.gridSizeX + 1, Math.min(xGrid, 9));
            yGrid = Math.max(this.gridSizeY + 1, Math.min(yGrid, 6));

            this.targetGridX = xGrid;
            this.targetGridY = yGrid;

            let moveGridX = xGrid - (this.gridSizeX-1)/2;
            let moveGridY = yGrid - (this.gridSizeY-1)/2;

            this.desiredGridX = moveGridX;
            this.desiredGridY = moveGridY;

            if (!this.isColliding(moveGridX,moveGridY)) {
                this.lastFreeGridX = moveGridX;
                this.lastFreeGridY = moveGridY;     
            }

            if (mouseY < 600) {
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
                0.5)
        }

        this.isColliding = function (x = this.targetGridX,y = this.targetGridY) {
            let success = true;

            for (let f of furniture) {
                if (f === this) {continue;}

                for (let x1 = 0; x1 < this.gridSizeX; x1++) {
                    for (let y1 = 0; y1 < this.gridSizeY; y1++) {
                    
                        let testX = x - x1;//this.targetGridX - x1;
                        let testY = y - y1;//this.targetGridY - y1;

                        for (let x2 = 0; x2 < f.gridSizeX; x2++) {
                            for (let y2 = 0; y2 < f.gridSizeY; y2++) {
                            
                                let testX2 = f.currentGridX - x2;
                                let testY2 = f.currentGridY - y2;

                                if (testX == testX2 && testY == testY2) {
                                    success = false;
                                } 
                            }
                        }
                    }
                }
            }

            return !success;
        }

        this.onUnpressed = function () {
            //this.hoverScale = 1.05;

            if (this.targetY > 650) {
                this.throwInGarbage();
                return;
            } 

            if (this.targetY > 600) {
                if (this.justCreated == true) {
                    this.throwInGarbage();
                } else {
                    this.moveToGrid(this.lastDesiredGridX,this.lastDesiredGridY);
                }

                return;
            } 

            let success = !this.isColliding();

            if (success) {
                console.log("Success");

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
                // if (this.justCreated == true) {
                //     this.throwInGarbage();
                // } else {
                //     this.moveToGrid(this.lastDesiredGridX,this.lastDesiredGridY);
                // }

                if (this.lastFreeGridX != null && this.lastFreeGridY != null) {

                    this.currentGridX = this.lastFreeGridX;
                    this.currentGridY = this.lastFreeGridY;

                    this.moveToGrid(this.lastFreeGridX,this.lastFreeGridY);

                    if (this.justCreated == true) {
                        this.justCreated = false;
                        furniture.push(this);
                    }
                } else { 
                    this.throwInGarbage();
                }
            }
        }

        let oldDelete = this.delete;
        this.delete = () => {
            furniture = furniture.filter(e => e !== this);

            oldDelete();
        }

            
        this.render = function (ax, ay) {
            if (this.isPressed) {
                this.hoverScaler = this.hoverScale * 0.95;
            }
            
            imageMode(CORNER);
            image(this.image, ax - this.gridSizeX * gridSize * this.anchorX, ay - this.gridSizeY * gridSize * this.anchorY,this.gridSizeX * gridSize,this.gridSizeY * gridSize);
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
