class Draw {
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    addObjectListToMap(movableObjectList) {
        movableObjectList.forEach(movableObject => {
            this.addObjectToMap(movableObject);
        });
    }


    addObjectToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.mirrorImage(movableObject);
        }

        movableObject.draw(this.ctx);
        movableObject.drawRectBounding(this.ctx);
        movableObject.drawRectBounding2(this.ctx);
        movableObject.drawText(this.ctx);
        movableObject.drawEnergyBar(this.ctx);

        if (movableObject.otherDirection) {
            this.removeMirrorImage(movableObject);
        }
    }


    mirrorImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }


    removeMirrorImage(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}