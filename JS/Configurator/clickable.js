//This is a clickable class. It's basically the base for every object in our game

var clickables = [];
var clickableRenderLayers = [];

function createRenderLayer(name, order) {
    clickableRenderLayers.push({ objects: [], order: order, name: name });
    clickableRenderLayers.sort((a, b) => { return a.order > b.order });
}

createRenderLayer("default", 0);
createRenderLayer("furniture1", 1);
createRenderLayer("furniture2", 2);
createRenderLayer("furniture3", 3);
createRenderLayer("furniture4", 4);
createRenderLayer("furniture5", 5);
createRenderLayer("furniture6", 6);
createRenderLayer("furniture7", 7);

var isPressingClickable = false;

class Clickable {

    constructor(x = 0, y = 0, width = 50, height = 25, anchor = anchorTypes.TOPLEFT) {
        clickables.push(this);

        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        this.realX = x;
        this.realY = y;

        this.anchor = anchor;
        this.anchorX = 0.5;
        this.anchorY = 0.5;

        this.drawFrame = true;
        this.textSize = 18;

        this.paused = false;

        // Can you even click the button?
        this.isClickable = true;
        // true -> only trigger onPressed if it was unpressed while the cursor was on the button. false -> will always unpress regardless of the cursor's position
        this.onlyUnpressOverButton = false;
        // only render and update if its active
        this.isActive = true;

        this.hoverScale = 1.05;
        this.hoverScaler = 1;

        this.standardWidth = this.width;
        this.standardHeight = this.height;

        this.speed = 0;
        this.targetX = 0;
        this.targetY = 0;

        this.textPaddingUp = 0;
        this.textPaddingDown = 0;
        this.textPaddingLeft = 0;
        this.textPaddingRight = 0;

        this.isPressed = false;
        this.onPressDown = false;
        this.onPressUp = false;
        this.mouseIsOver = false;
        this.isMoving = false;
        this.overPressed = false;
        this.offPressed = false;
        this.wasHovering = false;

        this.mouseIsPressedTrack = mouseIsPressed;

        this.text = '';
        this.image = null;
        this.constrainImage = false;

        this.setRenderLayer("default");

        this.delete = () => {
            clickables = clickables.filter(e => e !== this);

            let oldlayer = clickableRenderLayers.filter((x) => { return x.name == this.renderLayer })[0];
            oldlayer.objects = oldlayer.objects.filter(e => e !== this);

            delete this;
        }
    }

    setRenderLayer(name) {
        if (clickableRenderLayers.filter((x) => { return x.name == name })[0] == undefined) {
            return
        }

        if (this.renderLayer != undefined) {
            let oldlayer = clickableRenderLayers.filter((x) => { return x.name == this.renderLayer })[0];
            oldlayer.objects = oldlayer.objects.filter(e => e !== this);
        }

        let layer = clickableRenderLayers.filter((x) => { return x.name == name })[0];
        layer.objects.push(this);
        this.renderLayer = name;
    }

    render(ax, ay) {
        if (this.isPressed) {
            this.hoverScaler = this.hoverScale * 0.95;
        }

        if (this.drawFrame) {
            strokeWeight(1);
            stroke(50);
            fill(255);
            rect(ax - this.width * this.anchorX, ay - this.height * this.anchorY, this.width, this.height, 10);
        }

        fill(10);
        strokeWeight(0);
        textAlign(CENTER, CENTER);
        textSize(this.textSize * this.hoverScaler);
        text(this.text,
            ax + this.textPaddingLeft - this.width * this.anchorX,
            ay + this.textPaddingUp - this.height * this.anchorY,
            this.width - this.textPaddingLeft - this.textPaddingRight,
            this.height - this.textPaddingUp - this.textPaddingDown);


        if (this.image) {
            if (this.constrainImage === true) {
                let isWider = this.image.width > this.image.height;
                let ratio = isWider ? this.width / this.image.width : this.height / this.image.height;

                imageMode(CENTER);
                image(
                    this.image,
                    ax,
                    ay,
                    this.image.width * ratio * 0.9,
                    this.image.height * ratio * 0.9,
                );
            } else {
                imageMode(CORNER);
                image(this.image, ax - this.width * this.anchorX, ay - this.height * this.anchorY + this.height - this.image.height);
            }
        }
    }

    update() {
        if (this.isActive) {
            switch (this.anchor) {
                case anchorTypes.TOPLEFT:
                    this.realX = this.x;
                    this.realY = this.y;
                    break;
                case anchorTypes.LEFT:
                    this.realX = this.x;
                    this.realY = this.y + height / 2;
                    break;
                case anchorTypes.BOTTOMLEFT:
                    this.realX = this.x;
                    this.realY = this.y + height;
                    break;
                case anchorTypes.TOP:
                    this.realX = this.x + width / 2;
                    this.realY = this.y;
                    break;
                case anchorTypes.CENTER:
                    this.realX = this.x + width / 2;
                    this.realY = this.y + height / 2;
                    break;
                case anchorTypes.BOTTOM:
                    this.realX = this.x + width / 2;
                    this.realY = this.y + height;
                    break;
                case anchorTypes.TOPRIGHT:
                    this.realX = this.x + width;
                    this.realY = this.y;
                    break;
                case anchorTypes.RIGHT:
                    this.realX = this.x + width;
                    this.realY = this.y + height / 2;
                    break;
                case anchorTypes.BOTTOMRIGHT:
                    this.realX = this.x + width;
                    this.realY = this.y + height;
                    break;
            }

            if (this.isClickable && !this.paused) {
                this.onPressDown = false;
                this.onPressUp = false;

                if ((mouseX >= (this.realX - this.width * this.anchorX)) && (mouseX <= (this.realX + this.width * (1 - this.anchorX))) && (mouseY >= (this.realY - this.height * this.anchorY)) && (mouseY <= (this.realY + this.height * (1 - this.anchorY)))) {
                    this.mouseIsOver = true;
                    cursor(HAND);
                } else {
                    this.mouseIsOver = false;
                }

                if (this.mouseIsPressedTrack != mouseIsPressed) {
                    this.mouseIsPressedTrack = mouseIsPressed;

                    if (this.mouseIsOver && mouseIsPressed) {
                        this.overPressed = true;
                    } else {
                        this.overPressed = false;
                    }

                    if (!this.mouseIsOver && !mouseIsPressed) {
                        this.offPressed = true;
                    } else {
                        this.offPressed = false;
                    }
                }

                if (this.mouseIsOver && this.overPressed && !isPressingClickable) {
                    if (!this.isPressed) { this.onPressDown = true; this.onPressed(); isPressingClickable = true }
                    this.isPressed = true;
                } else {
                    if (this.onlyUnpressOverButton) {
                        if (!this.offPressed && this.mouseIsOver) {
                            if (this.isPressed) { this.onPressUp = true; this.onUnpressed(); isPressingClickable = false }
                            this.isPressed = false;
                        } else {
                            this.isPressed = false;
                        }
                    } else {
                        if (!this.overPressed) {
                            if (this.isPressed) { this.onPressUp = true; this.onUnpressed(); isPressingClickable = false }
                            this.isPressed = false;
                        }
                    }
                }

                if (this.isPressed) {
                    this.pressed();
                }

                if (this.mouseIsOver && !isPressingClickable) {
                    this.hoverScaler += (this.hoverScale - this.hoverScaler) * 0.5;
                } else {
                    this.hoverScaler += (1 - this.hoverScaler) * 0.5;
                }

                if (this.wasHovering != this.mouseIsOver) {
                    if (this.mouseIsOver && !isPressingClickable) {
                        this.onHovered();
                    } else {
                        this.onStopHovered();
                    }

                    this.wasHovering = this.mouseIsOver;
                }

                this.width = lerp(this.width, this.standardWidth * this.hoverScaler, 0.25);
                this.height = lerp(this.height, this.standardHeight * this.hoverScaler, 0.25);
            }

            if (this.isMoving) {
                this.move(this.targetX, this.targetY, this.speed);
            }

            this.render(this.realX, this.realY);
            this.tick();
        }
    }

    onPressed() { }

    onUnpressed() { }

    pressed() { }

    onHovered() { }

    onStopHovered() { }

    onArrived() { }

    tick() { }

    moveTo(x, y, speed) {
        this.isMoving = true;
        this.speed = speed;
        this.targetX = x;
        this.targetY = y;
    }

    move(x, y, speed) {
        let distance = dist(x, y, this.x, this.y);

        if (distance > 0.05) {
            this.x += -(this.x - x) * speed;
            this.y += -(this.y - y) * speed;
        } else {
            this.x = x;
            this.y = y;

            this.isMoving = false;
            this.speed = 0;

            this.onArrived();
        }
    }

    setToFront() {
        let layer = clickableRenderLayers.filter((x) => { return x.name == this.renderLayer })[0];

        layer.objects = layer.objects.filter(e => e !== this);
        layer.objects.push(this);
    }

    setToBack() {
        let layer = clickableRenderLayers.filter((x) => { return x.name == this.renderLayer })[0];

        layer.objects = layer.objects.filter(e => e !== this);
        layer.objects.splice(0, 0, this);
    }
}

