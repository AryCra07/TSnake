class Snake {
    head: HTMLElement;
    bodies: HTMLCollection; // 蛇的身体（包括蛇头）, HTMLCollection 是一个类数组
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    set X(value: number) {
        if (this.X === value) {
            return;
        }

        if (value < 0 || value > 290) {
            throw new Error('Hit the Wall');
        }

        // 不能反向调头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        this.moveBody();
        this.head.style.left = value + 'px';
        this.checkHeadBody();
    }

    set Y(value: number) {
        if (this.Y === value) {
            return;
        }

        if (value < 0 || value > 290) {
            throw new Error("Hit the Wall");
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        this.moveBody();
        this.head.style.top = value + 'px';
        this.checkHeadBody();
    }

    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    }

    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let newX = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let newY = (this.bodies[i - 1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = newX + 'px';
            (this.bodies[i] as HTMLElement).style.top = newY + 'px';
        }
    }

    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            let cur = this.bodies[i] as HTMLElement;
            if (this.X === cur.offsetLeft && this.Y === cur.offsetTop) {
                throw new Error('Hit the Body');
            }
        }
    }
}

export default Snake;
