console.log("Game JS loaded");

const questions = [
    {
        character: "SpongeBob",
        image: "images/[CITYPNG.COM]HD SpongeBob Transparent PNG - 2000x2000.png",
        part: "body",
        correctColor: "#F8D63D"
    },
    {
        character: "Patrick",
        image: "images/patrick.png",
        part: "body",
        correctColor: "#FF9BC1"
    },
    {
        character: "Shrek",
        image: "images/shrek.png",
        part: "skin",
        correctColor: "#7FBF4D"
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
        document.getElementById("character-image").style.display = "none";
        document.getElementById("character").innerHTML =
            `🏆 Game Over! Final Score: ${score}/${questions.length}`;
        document.getElementById("buttons").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        return;
    }

    const q = questions[current];

    // IMAGE
    const img = document.getElementById("character-image");
    img.src = q.image;
    img.alt = q.character;
    img.style.display = "block";

    // TEXT
    document.getElementById("character").textContent = q.character;
    document.getElementById("result").textContent = "";

    // BUTTONS
    const buttonsDiv = document.getElementById("buttons");
    buttonsDiv.innerHTML = "";

    q.choices.forEach(color => {
        const btn = document.createElement("button");
        btn.textContent = color;
        btn.className = "color-btn";
        btn.style.backgroundColor = colorMap[color] || "gray";

        btn.onclick = () => checkAnswer(color);

        buttonsDiv.appendChild(btn);
    });
}

function checkAnswer() {
    const selected =
        document.getElementById("colorPicker").value;

    const correct =
        questions[current].correctColor;

    if (selected.toLowerCase() === correct.toLowerCase()) {
        score += 100;
    }

    current++;
    loadQuestion();
}