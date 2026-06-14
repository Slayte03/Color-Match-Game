const questions = [
    {
        character: "SpongeBob",
        image: "images/spongebob.png",
        correct: "Yellow",
        choices: ["Yellow", "Blue", "Red", "Green"]
    },
    {
        character: "Patrick Star",
        image: "images/patrick.png",
        correct: "Pink",
        choices: ["Pink", "Orange", "Purple", "Blue"]
    },
    {
        character: "Shrek",
        image: "images/shrek.png",
        correct: "Green",
        choices: ["Green", "Yellow", "Red", "Blue"]
    },
    {
        character: "Mickey Mouse",
        image: "images/mickey.png",
        correct: "Red",
        choices: ["Purple", "Red", "Green", "Brown"]
    },
    {
        character: "Smurf",
        image: "images/smurf.png",
        correct: "Blue",
        choices: ["Blue", "Red", "Yellow", "Pink"]
    },
    {
        character: "Scooby-Doo",
        image: "images/scooby.png",
        correct: "Brown",
        choices: ["Brown", "Blue", "Green", "Pink"]
    }
];

const colorMap = {
    Yellow: "gold",
    Blue: "dodgerblue",
    Red: "crimson",
    Green: "green",
    Pink: "deeppink",
    Brown: "saddlebrown",
    Purple: "purple",
    Orange: "orange"
};

let current = 0;
let score = 0;

function loadQuestion() {
    if (current >= questions.length) {
        document.getElementById("character").innerHTML =
            `🏆 Game Over! Final Score: ${score}/${questions.length}`;
        document.getElementById("buttons").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        return;
    }

    const q = questions[current];

    document.getElementById("character").textContent = q.character;
    document.getElementById("result").textContent = "";

    const buttonsDiv = document.getElementById("buttons");
    buttonsDiv.innerHTML = "";

    q.choices.forEach(color => {
        const btn = document.createElement("button");
        btn.textContent = color;
        btn.className = "color-btn";
        btn.style.backgroundColor = colorMap[color] || "gray";

        btn.addEventListener("click", () => checkAnswer(color));

        buttonsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const q = questions[current];

    if (selected === q.correct) {
        score++;
        document.getElementById("result").textContent = "✅ Correct!";
    } else {
        document.getElementById("result").textContent =
            `❌ Wrong! The correct answer was ${q.correct}.`;
    }

    document.getElementById("score").textContent = `Score: ${score}`;

    current++;

    setTimeout(loadQuestion, 1200);
}

loadQuestion();