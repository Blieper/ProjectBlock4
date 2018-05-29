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

function setup() {
    createCanvas(1000, 700);
    background(200);

    for (i = 0; i < 5; i++) {
        let button;
        button = new Clickable(gridSize/2 * (i + 1), gridSize/2, gridSize, gridSize);
        button.text = "Chair";

        button.pressed = function () {
            this.hoverScale = 1;
            this.hoverScaler = 1

            let xGrid = Math.round((mouseX + gridSize/2)/gridSize);
            let yGrid = Math.round((mouseY + gridSize/2)/gridSize);

            xGrid = Math.max(1, Math.min(xGrid, 10))
            yGrid = Math.max(1, Math.min(yGrid, 7))

            this.moveTo(
                xGrid * gridSize - gridSize/2,
                yGrid * gridSize - gridSize/2,
                0.65)
        }

        button.onUnpressed = function () {
            this.hoverScale = 1.25;
        }
    }
}

function draw() {
    clear();
    cursor(ARROW);
    background(200);

    // Update all clickables
    for (let i = 0; i < clickables.length; i++) {
        if (clickables[i] != undefined) {
            clickables[i].update();
        }
    }
}