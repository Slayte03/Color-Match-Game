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
        image: "[https://www.pngfind.com/pngs/m/30-304033_shrek-head-png-shrek-png-transparent-png.png]",
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
        image: "[https://assets.stickpng.com/images/59f87a353cec115efb3623a4.png]",
        part: "fur",
        correctColor: "#8B5A2B"
    },

    // NEW ADDITIONS

    {
        character: "Sonic the Hedgehog",
        image: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c337.png]",
        part: "body",
        correctColor: "#0F52BA"
    },
    {
        character: "Pikachu",
        image: "[https://www.freeiconspng.com/thumbs/pikachu-transparent/pikachu-transparent-hd-1.png]",
        part: "cheeks",
        correctColor: "#FF1C1C"
    },
    {
        character: "Homer Simpson",
        image: "https://upload.wikimedia.org/wikipedia/en/0/02/Homer_Simpson_2006.png",
        part: "pants",
        correctColor: "#3B5BA9"
    },
    {
    character: "Mario",
    image: "https://www.stickpng.com/img/games/new-super-mario-bros/mario",
    part: "eyes",
    correctColor: "#2B6CB0"
},
{
    character: "Garfield",
    image: "https://pngimg.com/image/109379",
    part: "fur",
    correctColor: "#FF8C00"
},
{
    character: "Link",
    image: "https://www.pngfind.com/mpng/hmxTmo_zelda-link-transparent-png-png-download/",
    part: "outfit",
    correctColor: "#2E7D32"
},
{
    character: "Stewie Griffin",
    image: "https://www.etsy.com/ca/listing/1465138045/stewie-griffin-family-guy-svg-pdf-png",
    part: "suspenders",
    correctColor: "#D00000"
},
{
    character: "Kirby",
    image: "https://freepngimg.com/png/14849-kirby-free-download-png/download",
    part: "skin",
    correctColor: "#FF6FAE"
},
{
    character: "Rick Sanchez",
    image: "https://pngimg.com/image/101088",
    part: "hair",
    correctColor: "#A7D8FF"
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

// =====================
// SHUFFLE
// =====================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// =====================
// GAME STATE
// =====================
let current = 0;
let score = 0;

// =====================
// ELEMENTS
// =====================
const colorPicker = document.getElementById("colorPicker");
const colorLayer = document.getElementById("color-layer");

if (colorPicker && colorLayer) {
    colorPicker.addEventListener("input", function () {
        colorLayer.style.backgroundColor = this.value;
    });
}

// =====================
// REAL-TIME COLOR CHANGE
// =====================
colorPicker.addEventListener("input", function () {
    colorLayer.style.backgroundColor = this.value;
});

// =====================
// LOAD QUESTION
// =====================
function loadQuestion() {
    if (current >= questions.length) {
        document.getElementById("character-image").style.display = "none";
        document.getElementById("color-layer").style.display = "none";

        document.getElementById("question").textContent =
            `🏆 Final Score: ${score}/${questions.length * 10}`;
        return;
    }

    const q = questions[current];

    const img = document.getElementById("character-image");

    img.src = q.image;
    img.alt = q.character;

    // reset overlay color
    colorLayer.style.backgroundColor = "transparent";

    document.getElementById("question").textContent =
        `What is the color of ${q.character}'s ${q.part}?`;

    document.getElementById("result").textContent = "";
}

// =====================
// COLOR CONVERSION
// =====================
function hexToRgb(hex) {
    hex = hex.replace("#", "");
    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

// =====================
// SCORING
// =====================
function calculatePoints(selected, correct) {
    const c1 = hexToRgb(selected);
    const c2 = hexToRgb(correct);

    const distance = Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
    );

    const maxDistance = Math.sqrt(3 * Math.pow(255, 2));

    const similarity = 1 - (distance / maxDistance);

    return Math.max(0, Math.round(similarity * 10));
}

// =====================
// ANSWER CHECK
// =====================
function checkAnswer() {
    const selected = colorPicker.value;
    const correct = questions[current].correctColor;

    const points = calculatePoints(selected, correct);
    score += points;

    document.getElementById("result").textContent =
        `You earned ${points}/10 points!`;

    document.getElementById("score").textContent =
        `Score: ${score}`;

    current++;

    setTimeout(loadQuestion, 1200);
}

// =====================
// START GAME
// =====================
shuffleArray(questions);
loadQuestion();