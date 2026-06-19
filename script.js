const quizData = [
    { question: "O que é agricultura sustentável?", options: ["Uso excessivo de agrotóxicos", "Produção equilibrada e sustentável", "Monocultura intensiva", "Desmatamento para expansão"], correct: 1 },
    { question: "O que é rotação de culturas?", options: ["Troca de máquinas agrícolas", "Alternância de culturas no mesmo solo", "Plantio único durante anos", "Queimada controlada"], correct: 1 },
    { question: "Qual prática ajuda o solo?", options: ["Queimada frequente", "Plantio direto", "Arado intenso", "Desmatamento"], correct: 1 },
    { question: "O que significa ILPF?", options: ["Integração Lavoura-Pecuária-Floresta", "Indústria de Laticínios e Produtos Florestais", "Irrigação Linear por Faixa", "Insumos Líquidos e Proteção Foliar"], correct: 0 },
    { question: "Qual irrigação é mais eficiente?", options: ["Gotejamento", "Inundação total", "Mangueira aberta", "Aspersão convencional"], correct: 0 },
    { question: "Bioinsumos são:", options: ["Químicos fortes", "Produtos naturais e sustentáveis", "Embalagens plásticas", "Máquinas pesadas"], correct: 1 },
    { question: "O que é compostagem?", options: ["Queima de resíduos", "Decomposição orgânica", "Aplicação de veneno", "Sistema de irrigação"], correct: 1 },
    { question: "Qual é uma energia renovável?", options: ["Carvão mineral", "Gasolina", "Solar", "Diesel"], correct: 2 },
    { question: "Agricultura de precisão utiliza:", options: ["GPS e sensores", "Força manual", "Queimada", "Desmatamento"], correct: 0 },
    { question: "Pecuária sustentável inclui:", options: ["Queimada de pastagens", "Manejo rotacionado", "Desmatamento", "Confinamento extremo"], correct: 1 }
];

let current = 0;
let score = 0;
let streak = 0;
let hintsUsed = 0;
const maxHints = 3;

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const hintBtn = document.getElementById("hint-btn");
const toggleTheme = document.getElementById("toggle-theme");
const learnMoreBtn = document.getElementById("learn-more-btn");
const backToResultBtn = document.getElementById("back-to-result-btn");

toggleTheme.onclick = () => document.body.classList.toggle("dark");

startBtn.onclick = () => {
    document.getElementById("start-screen").classList.remove("active");
    document.getElementById("question-screen").classList.add("active");
    loadQuestion();
};

function loadQuestion() {
    const q = quizData[current];
    document.getElementById("question-text").innerText = q.question;

    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerText = opt;

        btn.onclick = () => selectAnswer(i, q.correct, btn);
        container.appendChild(btn);
    });

    document.getElementById("progress-text").innerText = `Pergunta ${current + 1} de ${quizData.length}`;
    document.getElementById("bar-inner").style.width = `${(current / quizData.length) * 100}%`;
    updateStreak();
    updateHintButton();
}

function selectAnswer(selected, correct, btn) {
    const allBtns = document.querySelectorAll(".option-btn");
    allBtns.forEach(b => b.disabled = true);

    if (selected === correct) {
        score++;
        streak++;
        btn.classList.add("correct");
        showMessage("Bom trabalho! ✅", "success");
    } else {
        streak = 0;
        btn.classList.add("wrong");
        showMessage("Resposta incorreta", "error");
    }

    updateStreak();

    setTimeout(() => {
        current++;
        if (current < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1200);
}

function showMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `feedback-msg ${type}`;
    msg.innerText = text;
    document.getElementById("question-screen").appendChild(msg);
    setTimeout(() => msg.remove(), 1500);
}

function updateStreak() {
    document.getElementById("streak-text").innerHTML = 
        `🔥 Sequência: <strong>${streak}</strong>`;
}

function updateHintButton() {
    document.getElementById("hints-remaining").innerText = maxHints - hintsUsed;
    if (hintsUsed >= maxHints) {
        hintBtn.style.opacity = "0.5";
        hintBtn.style.cursor = "not-allowed";
        hintBtn.title = "Dicas esgotadas";
    }
}

hintBtn.onclick = () => {
    if (hintsUsed >= maxHints) return;
    
    hintsUsed++;
    updateHintButton();

    const correctIndex = quizData[current].correct;
    const buttons = document.querySelectorAll(".option-btn");
    buttons[correctIndex].classList.add("hint-highlight");
    
    setTimeout(() => {
        buttons[correctIndex].classList.remove("hint-highlight");
    }, 2000);
};

function showResult() {
    document.getElementById("question-screen").classList.remove("active");
    document.getElementById("result-screen").classList.add("active");

    document.getElementById("score-text").innerText = 
        `Você acertou ${score} de ${quizData.length} questões!`;

    let feedback = "";
    if (score === quizData.length) feedback = "Parabéns! Você é um verdadeiro especialista em Agro Sustentável! 🌟";
    else if (score >= 8) feedback = "Muito bom! Você tem ótimo conhecimento sobre práticas sustentáveis.";
    else if (score >= 5) feedback = "Bom trabalho! Continue aprendendo sobre agricultura sustentável.";
    else feedback = "Ainda há muito para aprender. O Agro Sustentável é fundamental para o futuro!";

    document.getElementById("feedback-message").innerText = feedback;
}

learnMoreBtn.onclick = () => {
    document.getElementById("result-screen").classList.remove("active");
    document.getElementById("learn-screen").classList.add("active");
};

backToResultBtn.onclick = () => {
    document.getElementById("learn-screen").classList.remove("active");
    document.getElementById("result-screen").classList.add("active");
};

restartBtn.onclick = () => location.reload();