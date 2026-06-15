console.log("Game JS loaded");

const questions = [
    {
        character: "SpongeBob",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/SpongeBob_SquarePants_character.png/960px-SpongeBob_SquarePants_character.png",
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
        document.getElementById("colorPicker").style.display = "none";

        document.getElementById("question").innerHTML =
    `🏆 Final Score: ${score}/${questions.length * 10}`;

        document.getElementById("result").textContent = "";

        return;
    }

    const q = questions[current];

    document.getElementById("character-image").src = q.image;
    document.getElementById("character-image").alt = q.character;

    document.getElementById("question").textContent =
        `What is the color of ${q.character}'s ${q.part}?`;

    document.getElementById("result").textContent = "";
}

function hexToRgb(hex) {
    hex = hex.replace("#", "");

    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

function calculatePoints(selected, correct) {
    const c1 = hexToRgb(selected);
    const c2 = hexToRgb(correct);

    const distance = Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
    );

    const maxDistance = Math.sqrt(
        Math.pow(255, 2) +
        Math.pow(255, 2) +
        Math.pow(255, 2)
    );

    const similarity = 1 - (distance / maxDistance);

    return Math.max(0, Math.round(similarity * 10));
}

function checkAnswer() {
    const selected = document.getElementById("colorPicker").value;
    const correct = questions[current].correctColor;

    const points = calculatePoints(selected, correct);

    score += points;

    document.getElementById("result").textContent =
        `You earned ${points}/10 points!`;

    document.getElementById("score").textContent =
        `Score: ${score}`;

    current++;

    setTimeout(loadQuestion, 1500);
}