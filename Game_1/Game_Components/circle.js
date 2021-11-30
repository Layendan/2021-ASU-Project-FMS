var circleSize, approachSize, accuracy, approachRate, approachSizeRate, radius, x, y, circleColor, number, time, isActive;

function Circle(circleSize, accuracy, approachRate, x, y, color, number, time) {
    this.circleSize = circleSize;
    this.radius = (54.4 - 4.48 * this.circleSize) * 7;
    this.accuracy = accuracy;
    this.approachRate = approachRate;
    this.approachSize = this.radius * 2;
    this.approachSizeRate = circleSize * 2;
    this.x = x;
    this.y = y;
    this.circleColor = color;
    this.number = number;
    this.time = time;
    this.isActive = false;

    this.update = function (currentTime) {
        let timeDiff = this.time - currentTime;
        if (timeDiff < 0) {
            fail();
            return -1;
        };

        if (!this.isActive) {
            this.approachSizeRate = (this.approachSize - this.radius)/(timeDiff*31);
            this.isActive = true;
        }

        this.approachSize -= this.approachSizeRate;

        addCircle(this.x, this.y, this.radius/2, this.approachSize/2, this.circleColor, this.number);

        return 0;
    };

    this.click = function (mouseX, mouseY, songTime) {
        let distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
        if (distance <= this.radius) {
            if (Math.abs(this.time - songTime) <= 1) { // success
                return 1;
            } else { // fail
                console.log("Fail 1");
                return -1;
            }
        } else if (distance <= this.approachSize) { // fail
            console.log("Fail 2");
            return -1;
        } else { // continue
            return 0;
        }
    };

    return this;
}