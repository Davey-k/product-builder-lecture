class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const number = this.getAttribute('number');
        const ball = document.createElement('div');
        ball.textContent = number;
        const style = document.createElement('style');
        style.textContent = `
            div {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.2rem;
                font-weight: bold;
                color: #fff;
                animation: fadeIn 0.5s ease-in-out;
            }
        `;
        const color = this.getColor(parseInt(number, 10));
        ball.style.backgroundColor = color;

        shadow.appendChild(style);
        shadow.appendChild(ball);
    }

    getColor(number) {
        if (number <= 10) return '#fbc400'; // 노란색
        if (number <= 20) return '#69c8f2'; // 파란색
        if (number <= 30) return '#ff7272'; // 빨간색
        if (number <= 40) return '#aaa'; // 회색
        return '#b0d840'; // 녹색
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    lottoNumbersContainer.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach(number => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            row.appendChild(lottoBall);
        });

        lottoNumbersContainer.appendChild(row);
    }
});
