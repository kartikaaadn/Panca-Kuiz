const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const reflectionScreen = document.getElementById('reflection-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const reflectBtn = document.getElementById('reflect-btn');
const restartBtn = document.getElementById('restart-btn');
const restartBtn2 = document.getElementById('restart-btn2');
const submitReflection = document.getElementById('submit-reflection');
const reflectionAnswer = document.getElementById('reflection-answer');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questions = [
    // Soal definisi dasar
    {
        question: "Apa sila pertama Pancasila?",
        answers: [
            { text: "Kemanusiaan yang Adil dan Beradab", correct: false },
            { text: "Ketuhanan yang Maha Esa", correct: true, explanation: "Sila pertama menekankan pengakuan terhadap Tuhan Yang Maha Esa dan kebebasan beragama." },
            { text: "Persatuan Indonesia", correct: false },
            { text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan", correct: false }
        ]
    },
    {
        question: "Apa lambang sila kedua Pancasila?",
        answers: [
            { text: "Bintang", correct: false },
            { text: "Rantai", correct: true, explanation: "Rantai melambangkan hubungan antar manusia yang saling terikat dalam nilai kemanusiaan." },
            { text: "Pohon Beringin", correct: false },
            { text: "Banteng", correct: false }
        ]
    },
    {
        question: "Apa bunyi sila ketiga?",
        answers: [
            { text: "Persatuan Indonesia", correct: true, explanation: "Sila ketiga menegaskan pentingnya menjaga persatuan bangsa tanpa membedakan suku, agama, atau ras." },
            { text: "Kemanusiaan yang Adil dan Beradab", correct: false },
            { text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia", correct: false },
            { text: "Ketuhanan yang Maha Esa", correct: false }
        ]
    },
    {
        question: "Apa lambang sila keempat?",
        answers: [
            { text: "Kepala Banteng", correct: true, explanation: "Banteng melambangkan musyawarah dan kekuatan rakyat dalam mengambil keputusan bersama." },
            { text: "Rantai", correct: false },
            { text: "Pohon Beringin", correct: false },
            { text: "Padi dan Kapas", correct: false }
        ]
    },
    {
        question: "Apa arti simbol pohon beringin?",
        answers: [
            { text: "Persatuan Indonesia", correct: true, explanation: "Pohon beringin melambangkan tempat berteduh dan persatuan bangsa Indonesia." },
            { text: "Ketuhanan", correct: false },
            { text: "Keadilan Sosial", correct: false },
            { text: "Kerakyatan", correct: false }
        ]
    },
    {
        question: "Sila kelima berbunyi?",
        answers: [
            { text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia", correct: true, explanation: "Sila kelima menekankan pentingnya keadilan dan pemerataan kesejahteraan bagi semua rakyat Indonesia." },
            { text: "Ketuhanan yang Maha Esa", correct: false },
            { text: "Persatuan Indonesia", correct: false },
            { text: "Kemanusiaan yang Adil dan Beradab", correct: false }
        ]
    },
    {
        question: "Lambang padi dan kapas melambangkan?",
        answers: [
            { text: "Keadilan Sosial bagi Seluruh Rakyat Indonesia", correct: true, explanation: "Padi dan kapas melambangkan kebutuhan pokok rakyat, simbol keadilan sosial." },
            { text: "Persatuan Indonesia", correct: false },
            { text: "Kerakyatan", correct: false },
            { text: "Ketuhanan", correct: false }
        ]
    },
    {
        question: "Bintang emas di Pancasila melambangkan?",
        answers: [
            { text: "Ketuhanan yang Maha Esa", correct: true, explanation: "Bintang emas melambangkan cahaya Tuhan yang menjadi dasar spiritual bangsa Indonesia." },
            { text: "Kemanusiaan", correct: false },
            { text: "Kerakyatan", correct: false },
            { text: "Persatuan", correct: false }
        ]
    },
    {
        question: "Urutan sila keempat adalah?",
        answers: [
            { text: "Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan", correct: true, explanation: "Sila ini menegaskan pentingnya musyawarah dalam pengambilan keputusan bersama." },
            { text: "Keadilan Sosial", correct: false },
            { text: "Persatuan Indonesia", correct: false },
            { text: "Ketuhanan yang Maha Esa", correct: false }
        ]
    },
    {
        question: "Apa isi dasar negara Indonesia?",
        answers: [
            { text: "Pancasila", correct: true, explanation: "Pancasila adalah dasar negara Indonesia yang menjadi pedoman hidup berbangsa dan bernegara." },
            { text: "UUD 1945", correct: false },
            { text: "Proklamasi", correct: false },
            { text: "Bhinneka Tunggal Ika", correct: false }
        ]
    },
    // Soal situasi & penerapan nilai
    {
        question: "Kamu melihat temanmu berbeda agama sedang beribadah. Sikap yang benar adalah?",
        answers: [
            { text: "Menghormatinya dan menjaga ketenangan di sekitar", correct: true, explanation: "Sikap ini sesuai dengan sila pertama, menghargai kebebasan beragama." },
            { text: "Menertawakannya", correct: false },
            { text: "Mengajak berhenti ibadah", correct: false },
            { text: "Mengabaikan saja", correct: false }
        ]
    },
    {
        question: "Jika kamu melihat temanmu kesulitan dalam belajar, apa yang sebaiknya kamu lakukan?",
        answers: [
            { text: "Membantunya agar bisa memahami pelajaran", correct: true, explanation: "Ini mencerminkan nilai gotong royong dan kemanusiaan (sila kedua dan ketiga)." },
            { text: "Membiarkannya saja", correct: false },
            { text: "Menertawakannya", correct: false },
            { text: "Memberikan contekan", correct: false }
        ]
    },
    {
        question: "Dalam rapat kelas, semua keputusan diambil oleh satu orang tanpa musyawarah. Sikapmu?",
        answers: [
            { text: "Mengingatkan agar dilakukan musyawarah", correct: true, explanation: "Sesuai sila keempat: Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan." },
            { text: "Diam saja", correct: false },
            { text: "Ikut mendukung keputusan sepihak", correct: false },
            { text: "Menolak semua keputusan", correct: false }
        ]
    },
    {
        question: "Temanmu berasal dari daerah berbeda dan berbicara dengan logat yang unik. Apa yang kamu lakukan?",
        answers: [
            { text: "Menghargai dan menghormatinya", correct: true, explanation: "Sesuai sila ketiga: Persatuan Indonesia — menghargai keberagaman budaya dan bahasa." },
            { text: "Menirukan untuk lucu-lucuan", correct: false },
            { text: "Menjauhinya", correct: false },
            { text: "Mengabaikannya", correct: false }
        ]
    },
    {
        question: "Kamu melihat pembagian bantuan di lingkunganmu tidak adil. Sikap yang mencerminkan Pancasila?",
        answers: [
            { text: "Menegur dan menyarankan agar pembagian lebih adil", correct: true, explanation: "Ini sesuai sila kelima: keadilan sosial bagi seluruh rakyat Indonesia." },
            { text: "Membiarkan saja", correct: false },
            { text: "Ikut ambil lebih banyak", correct: false },
            { text: "Marah tanpa alasan", correct: false }
        ]
    },
    {
        question: "Jika ada teman yang berbuat salah, apa yang kamu lakukan?",
        answers: [
            { text: "Menegurnya dengan sopan", correct: true, explanation: "Sikap ini mencerminkan kemanusiaan yang adil dan beradab (sila kedua)." },
            { text: "Membicarakannya di belakang", correct: false },
            { text: "Marah besar", correct: false },
            { text: "Diam saja", correct: false }
        ]
    },
    {
        question: "Apa contoh penerapan sila ketiga di sekolah?",
        answers: [
            { text: "Kerja bakti membersihkan kelas", correct: true, explanation: "Gotong royong dan kerja sama mencerminkan nilai persatuan Indonesia." },
            { text: "Membeda-bedakan teman", correct: false },
            { text: "Tidak mau ikut kegiatan", correct: false },
            { text: "Berkompetisi tanpa sportifitas", correct: false }
        ]
    },
    {
        question: "Sikap yang mencerminkan sila kelima adalah...",
        answers: [
            { text: "Berbagi makanan dengan teman yang kurang mampu", correct: true, explanation: "Berbagi dan peduli pada sesama mencerminkan keadilan sosial." },
            { text: "Mengambil semua untuk diri sendiri", correct: false },
            { text: "Tidak mau berbagi", correct: false },
            { text: "Menyuruh orang lain bekerja sendiri", correct: false }
        ]
    },
    {
        question: "Jika kamu berbeda pendapat dengan teman, apa sikap yang sesuai nilai Pancasila?",
        answers: [
            { text: "Mendengarkan pendapat teman dengan bijak", correct: true, explanation: "Sesuai sila keempat: menghargai pendapat dan musyawarah untuk mufakat." },
            { text: "Memaksakan pendapat sendiri", correct: false },
            { text: "Pergi tanpa bicara", correct: false },
            { text: "Menyerah saja", correct: false }
        ]
    },
    {
        question: "Mengapa gotong royong penting dalam kehidupan sehari-hari?",
        answers: [
            { text: "Karena mencerminkan semangat persatuan dan saling membantu", correct: true, explanation: "Gotong royong mencerminkan nilai sila ketiga dan mempererat persaudaraan." },
            { text: "Supaya cepat selesai saja", correct: false },
            { text: "Karena disuruh guru", correct: false },
            { text: "Tidak penting", correct: false }
        ]
    }
];

document.getElementById('start-btn').addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', startQuiz);
reflectBtn.addEventListener('click', goToReflection);
restartBtn2.addEventListener('click', startQuiz);
submitReflection.addEventListener('click', submitReflectionAnswer);

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
        feedback.innerHTML = `✅ Benar! <br><small>${answer.explanation}</small>`;
        score++;
        showConfetti();
    } else {
        button.classList.add('wrong');
        const correctAnswer = questions[currentQuestionIndex].answers.find(a => a.correct);
        feedback.innerHTML = `❌ Salah! <br><small>Jawaban benar: <b>${correctAnswer.text}</b><br>${correctAnswer.explanation}</small>`;
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
    confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff6f91', '#ff9671', '#f9f871', '#c2f970', '#00c9a7']
    });
}

function goToReflection() {
    resultScreen.classList.add('hidden');
    reflectionScreen.classList.remove('hidden');
}

function submitReflectionAnswer() {
    const answer = reflectionAnswer.value.trim();
    if (answer === "") {
        alert("Silakan tulis refleksimu terlebih dahulu 🙏");
        return;
    }

    // Simpan atau tampilkan hasil refleksi
    alert("Terima kasih atas refleksimu! ❤️\n\n" + answer);

    // Kembali ke awal kuis
    reflectionScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    reflectionAnswer.value = "";
}