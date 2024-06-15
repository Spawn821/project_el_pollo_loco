class Draw {

    /**
     * This function clear the canvas for the next draw.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * This function set multiple objects to the canvas.
     * @param {object} movableObjectList is the current image.
     */
    addObjectListToMap(movableObjectList) {
        movableObjectList.forEach(movableObject => {
            this.addObjectToMap(movableObject);
        });
    }


    /**
     * This function set objects toe the canvas and
     * if desired reflects this.
     * @param {object} movableObject is the current image.
     */
    addObjectToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.mirrorImage(movableObject);
        }

        movableObject.draw(this.ctx);
        movableObject.drawText(this.ctx);
        movableObject.drawEnergyBar(this.ctx);

        if (movableObject.otherDirection) {
            this.removeMirrorImage(movableObject);
        }
    }


    /**
     * This function reflect the objects.
     * @param {object} movableObject is the current image.
     */
    mirrorImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    /**
     * This function remove the reflection from the object.
     * @param {object} movableObject is the current image.
     */
    removeMirrorImage(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}