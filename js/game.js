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
        part: "shorts",
        correctColor: "#D62828"
    },
    {
        character: "Smurf",
        image: "images/smurf.png",
        part: "skin",
        correctColor: "#4DA6FF"
    },
    {
        character: "Scooby-Doo",
        image: "images/scooby.png",
        part: "fur",
        correctColor: "#8B5A2B"
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
        document.getElementById("question").textContent = "";
        document.getElementById("result").textContent =
            `🏆 Game Over! Final Score: ${score}`;
        return;
    }

    const q = questions[current];

    document.getElementById("character-image").src = q.image;
    document.getElementById("character-image").alt = q.character;

    document.getElementById("question").textContent =
        `What is the color of ${q.character}'s ${q.part}?`;

    document.getElementById("result").textContent = "";
}

function checkAnswer() {
    const selected =
        document.getElementById("colorPicker").value;

    const correct =
        questions[current].correctColor;

    if (selected.toLowerCase() === correct.toLowerCase()) {
        score += 100;
        document.getElementById("result").textContent =
            "✅ Perfect match!";
    } else {
        document.getElementById("result").textContent =
            `❌ Correct color was ${correct}`;
    }

    current++;

    setTimeout(loadQuestion, 1500);
}