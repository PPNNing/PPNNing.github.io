const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numMeteors = 5;
let meteors = [];

class Meteor {
    constructor(x, y, length, speed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.speed = speed;
    }

    draw() {
        ctx.beginPath();
        // 新的结束点
        ctx.moveTo(this.x, this.y);
        // 新的起点
        ctx.lineTo(this.x - this.length, this.y - this.length);
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length, this.y - this.length);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;

        if (this.x > canvas.width || this.y > canvas.height) {
            this.x = Math.random() * canvas.width / 2;
            this.y = -this.length;
        }

        this.draw();
    }
}

function init() {
    for (let i = 0; i < numMeteors; i++) {
        const x = Math.random() * canvas.width / 2;
        const y = -200;
        const length = Math.random() * 150 + 50;
        const speed = Math.random() * 4 + 3;
        meteors.push(new Meteor(x, y, length, speed));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < meteors.length; i++) {
        meteors[i].update();
    }

    requestAnimationFrame(animate);
}

init();
animate();
