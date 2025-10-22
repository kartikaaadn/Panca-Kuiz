const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questions = [
    { question: "Apa sila pertama Pancasila?", answers: [{ text: "Kemanusiaan yang Adil dan Beradab", correct: false }, { text: "Ketuhanan yang Maha Esa", correct: true }, { text: "Persatuan Indonesia", correct: false }, { text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan", correct: false }] },
    { question: "Apa lambang sila kedua Pancasila?", answers: [{ text: "Bintang", correct: false }, { text: "Rantai", correct: true }, { text: "Pohon Beringin", correct: false }, { text: "Banteng", correct: false }] },
    { question: "Apa bunyi sila ketiga?", answers: [{ text: "Persatuan Indonesia", correct: true }, { text: "Kemanusiaan yang Adil dan Beradab", correct: false }, { text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia", correct: false }, { text: "Ketuhanan yang Maha Esa", correct: false }] },
    { question: "Apa lambang sila keempat?", answers: [{ text: "Kepala Banteng", correct: true }, { text: "Rantai", correct: false }, { text: "Pohon Beringin", correct: false }, { text: "Padi dan Kapas", correct: false }] },
    { question: "Apa arti simbol pohon beringin?", answers: [{ text: "Persatuan Indonesia", correct: true }, { text: "Ketuhanan", correct: false }, { text: "Keadilan Sosial", correct: false }, { text: "Kerakyatan", correct: false }] },
    { question: "Sila kelima berbunyi?", answers: [{ text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia", correct: true }, { text: "Ketuhanan yang Maha Esa", correct: false }, { text: "Persatuan Indonesia", correct: false }, { text: "Kemanusiaan yang Adil dan Beradab", correct: false }] },
    { question: "Lambang padi dan kapas melambangkan?", answers: [{ text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia", correct: true }, { text: "Persatuan Indonesia", correct: false }, { text: "Kerakyatan", correct: false }, { text: "Ketuhanan", correct: false }] },
    { question: "Bintang emas di Pancasila melambangkan?", answers: [{ text: "Ketuhanan yang Maha Esa", correct: true }, { text: "Kemanusiaan", correct: false }, { text: "Kerakyatan", correct: false }, { text: "Persatuan", correct: false }] },
    { question: "Urutan sila keempat adalah?", answers: [{ text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan", correct: true }, { text: "Keadilan Sosial", correct: false }, { text: "Persatuan Indonesia", correct: false }, { text: "Ketuhanan yang Maha Esa", correct: false }] },
    { question: "Apa isi dasar negara Indonesia?", answers: [{ text: "Pancasila", correct: true }, { text: "UUD 1945", correct: false }, { text: "Proklamasi", correct: false }, { text: "Bhinneka Tunggal Ika", correct: false }] }
];

document.getElementById('start-btn').addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn-answer');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    clearInterval(timer);
    timeLeft = 10;
    timeDisplay.textContent = timeLeft;
    feedback.textContent = "";
    nextBtn.classList.add('hidden');
    answerButtons.innerHTML = "";
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedback.textContent = "⏰ Waktu habis!";
            nextBtn.classList.remove('hidden');
        }
    }, 1000);
}

function selectAnswer(answer, button) {
    clearInterval(timer);
    if (answer.correct) {
        button.classList.add('correct');
        feedback.textContent = "✅ Benar!";
        score++;
        showConfetti();
    } else {
        button.classList.add('wrong');
        feedback.textContent = "❌ Salah!";
    }
    Array.from(answerButtons.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
            btn.classList.add('correct');
        }
    });
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreDisplay.textContent = `${score} / ${questions.length}`;
    showConfetti();
}

function showConfetti() {
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 }, colors: ['#ff6f91', '#ff9671', '#f9f871', '#c2f970', '#00c9a7'] });
}