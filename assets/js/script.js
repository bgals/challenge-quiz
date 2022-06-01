const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const questionContainerElement = document.getElementById('questions-container');
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

//start button 
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

//timer code
const timerEl = document.createElement('div');
document.body.append(timerEl)
let originalTimer = 30;
timerEl.textContent = 0;

function countdown(time) {
    if (time <= 0) return;
    setTimeout(function() {
        timerEl.textContent = time;
        time--;
        countdown(time);
}, 1000)
}

countdown(originalTimer)

//start button initiates gameplay
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

//shows question and answer buttons
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

//answer button selected
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
//right or wrong answers defined
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

 //questions and answers for quiz
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
    },
    {
        question: "Where is Javascript placed inside an HTML document?",
        answers: [
            { text: "<footer> section", correct: false},
            { text: "<body> and <head> sections", correct: true},
            { text: "<meta> section", correct: false},
            { text: "<title> section", correct: false}
        ]
    },
    {
        question: "Inside which HTML element do we put the Javascript?",
        answers: [
            { text: "<scripting>", correct: false},
            { text: "<js>", correct: false},
            { text: "<javascript>", correct: false},
            { text: "<script>", correct: true}
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hypertext Markup Language", correct: true},
            { text: "Hyper Training Marking Language", correct: false},
            { text: "Hyper Text Marketing Language", correct: false},
            { text: "Hypertext Markup Leveler", correct: false}
        ]
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Python", correct: false},
            { text: "Java", correct: false},
            { text: "Banana", correct: true},
            { text: "Ruby", correct: false}
        ]
    },
    {
        question: "What is the value called that defines colors such as #FFF0F0?",
        answers: [
            { text: "Decimal Value", correct: false},
            { text: "Hex Value", correct: true},
            { text: "RGB Value", correct: false},
            { text: "Color Value", correct: false}
        ]
    },
]

