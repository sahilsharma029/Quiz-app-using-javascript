const questionelement = document.getElementById("question");
const answerbutton = document.getElementById("answer-button");
const nextbtn = document.getElementById("next-btn");

const ques = [
    {
        question: "What is the capital of France?",
        answers: [
            {text: "London", correct: false},
            {text: "Paris", correct: true},
            {text: "Rome", correct: false},
            {text: "Berlin", correct: false}
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            {text: "Earth", correct: false},
            {text: "Mars", correct: false},
            {text: "Jupiter", correct: true},
            {text: "Venus", correct: false}
        ]
    },
    {
        question: "How many sides does a hexagon have?",
        answers: [
            {text: "4", correct: false},
            {text: "5", correct: false},
            {text: "6", correct: true},
            {text: "7", correct: false}
        ]
    },
    {
        question: "What is the symbol for water?",
        answers: [
            {text: "H2O", correct: true},
            {text: "CO2", correct: false},
            {text: "He", correct: false},
            {text: "Na", correct: false}
        ]
    },
    {
        question: "What is the name of the world wide web inventor?",
        answers: [
            {text: "Bill Gates", correct: false},
            {text: "Steve Jobs", correct: false},
            {text: "Tim Berners-Lee", correct: true},
            {text: "Mark Zuckerberg", correct: false}
        ]
    },
    {
        question: "What is the key currency used in the European Union?",
        answers: [
            {text: "Euro", correct: true},
            {text: "Dollar", correct: false},
            {text: "Yen", correct: false},
            {text: "Pound", correct: false}
        ]
    },
    {
        question: "Photosynthesis uses sunlight, water, and what gas?",
        answers: [
            {text: "Oxygen", correct: false},
            {text: "Carbon Dioxide", correct: true},
            {text: "Helium", correct: false},
            {text: "Nitrogen", correct: false}
        ]
    }
];

let currentquestionindex = 0;
let score = 0;

function startquiz(){
    currentquestionindex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showquestion();
}

function showquestion()
{   resetstate();
    let currentquestion = ques[currentquestionindex];
    let questionnum = currentquestionindex + 1;
    questionelement.innerHTML = questionnum + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}

function resetstate()
{
    nextbtn.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectanswer(e)
{
    const selectedbtn = e.target;
    const iscorrect = selectedbtn.dataset.correct === "true";
    if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbtn.style.display = "block";
}

function showscore(){
    resetstate();
    questionelement.innerHTML = `You scored ${score} out of ${ques.length} `;
    nextbtn.innerHTML = "Play again";
    nextbtn.style.display = "block";
}

function handlenextbtn()
{
    currentquestionindex++;
    if(currentquestionindex < ques.length)
    {
        showquestion();
    }
    else{
        showscore();
    }
}

nextbtn.addEventListener("click",()=>{
    if(currentquestionindex < ques.length){
        handlenextbtn();
    }
    else{
        startquiz();
    }
});

startquiz();