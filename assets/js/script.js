const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const questionContainerElement = document.getElementById('questions-container');
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
    nextButton.classList.remove('hide')
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
function selectAnswer() {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else  {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    }
    else {
        element.classList.add("wrong")
    }
}
 function clearStatusClass(element) {
     element.classList.remove("correct")
     element.classList.remove("wrong")
 }
const questions = [
    {
        question: "What is a div tag for in HTML?",
        answers: [
            { text: "it defines a division or a section", correct: true },
            { text: "it divides the page", correct: false},
            { text: "it marks where the page begins", correct: false},
            { text: "it defines a class", correct: false}
        ]
    },
    {
        question: "Where would you find the line 'display: flex'?",
        answers: [
            { text: "HTML", correct: false},
            { text: "CSS", correct: true},
            { text: "Javascript", correct: false},
            { text: "None of the Above", correct: false}
        ]
    }
]