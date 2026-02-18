class LottoBall extends HTMLElement {
    static get observedAttributes() {
        return ['number'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number' && oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const number = this.getAttribute('number') || '';
        const color = this.getColor(parseInt(number, 10));
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    width: 42px;
                    height: 42px;
                }
                .ball {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1rem;
                    font-weight: 800;
                    color: white;
                    background: ${color};
                    box-shadow: inset -3px -3px 6px rgba(0,0,0,0.2), 2px 3px 8px rgba(0,0,0,0.15);
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                    animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                @keyframes popIn {
                    from { opacity: 0; transform: scale(0.5) rotate(-20deg); }
                    to { opacity: 1; transform: scale(1) rotate(0deg); }
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getColor(number) {
        if (!number) return '#ccc';
        if (number <= 10) return 'linear-gradient(135deg, #ffcd3c, #fbc400)';
        if (number <= 20) return 'linear-gradient(135deg, #69c8f2, #2d9cdb)';
        if (number <= 30) return 'linear-gradient(135deg, #ff7272, #eb5757)';
        if (number <= 40) return 'linear-gradient(135deg, #aaaaaa, #828282)';
        return 'linear-gradient(135deg, #b0d840, #27ae60)';
    }
}

customElements.define('lotto-ball', LottoBall);

// 번호 생성 로직
document.getElementById('generate-btn').addEventListener('click', () => {
    const container = document.getElementById('lotto-numbers');
    container.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.className = 'lotto-row';
        
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, idx) => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoBall.style.animationDelay = `${(i * 0.05) + (idx * 0.02)}s`;
            row.appendChild(lottoBall);
        });

        container.appendChild(row);
    }
});

// 초기화 로직
document.getElementById('reset-btn').addEventListener('click', () => {
    document.getElementById('lotto-numbers').innerHTML = '';
});

// 테마 변경 로직
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 기존 설정 확인
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드';
});
