class ScorePanel {
    score = 0;
    speed = 1;

    scoreElement: HTMLElement;
    speedElement: HTMLElement;

    maxSpeed: number;
    upScore: number;

    constructor(maxSpeed: number = 10, upScore: number = 2) {
        this.scoreElement = document.getElementById('score')!;
        this.speedElement = document.getElementById('speed')!;
        this.maxSpeed = maxSpeed;
        this.upScore = upScore;
    }

    addScore() {
        this.scoreElement.innerHTML = (++this.score).toString();
        if (this.score % this.upScore === 0) {
            this.speedUp();
        }
    }

    speedUp() {
        if (this.speed < this.maxSpeed) {
            this.speedElement.innerHTML = (++this.speed).toString();
        }
    }
}

export default ScorePanel;
