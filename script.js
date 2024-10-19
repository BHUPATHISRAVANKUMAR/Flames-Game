function flamesGame(name1, name2) {
    name1 = name1.replace(/ /g, "").toLowerCase();
    name2 = name2.replace(/ /g, "").toLowerCase();

    for (let letter of name1) {
        if (name2.includes(letter)) {
            name2 = name2.replace(letter, "", 1);
        }
    }

    const count = name1.length + name2.length;
    let flames = ['F', 'L', 'A', 'M', 'E', 'S'];

    while (flames.length > 1) {
        const index = (count % flames.length) - 1;
        flames.splice(index >= 0 ? index : flames.length - 1, 1);
    }

    return flames[0];
}

function playMusicForStatus(status) {
    const audioPlayer = document.getElementById("audioPlayer");
    const musicDict = {
        'F': 'music/friends.mp3',
        'L': 'music/love.mp3',
        'A': 'music/affection.mp3',
        'M': 'music/marriage.mp3',
        'E': 'music/enemy.mp3',
        'S': 'music/sister.mp3'
    };

    audioPlayer.src = musicDict[status];
    audioPlayer.play();
}

function toggleMusic() {
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
}

function displayError(message) {
    alert(message);
}

function calculate() {
    const boyName = document.getElementById("boyName").value;
    const girlName = document.getElementById("girlName").value;

    if (!boyName || !girlName) {
        displayError("Both names must be entered.");
        return;
    }

    const resultChar = flamesGame(boyName, girlName);
    const resultsDict = {
        'F': { text: "Friends", emoji: "👫" },
        'L': { text: "Love", emoji: "❤️" },
        'A': { text: "Affection", emoji: "🤗" },
        'M': { text: "Marriage", emoji: "💍" },
        'E': { text: "Enemy", emoji: "😠" },
        'S': { text: "Sister", emoji: "👧" }
    };

    const { text, emoji } = resultsDict[resultChar];
    const resultElement = document.getElementById("result");
    resultElement.innerText = `The relationship status is ${text} (${emoji})`;

    playMusicForStatus(resultChar);
    generateFallingEmojis(emoji);
}

function generateFallingEmojis(emoji) {
    const emojiBackground = document.getElementById("emojiBackground");
    emojiBackground.innerHTML = ''; // Clear previous emojis

    for (let i = 0; i < 30; i++) {
        const span = document.createElement("span");
        span.className = 'emoji';
        span.innerText = emoji;
        span.style.left = Math.random() * 100 + 'vw';
        span.style.animationDuration = Math.random() * 5 + 5 + 's'; // Random fall speed
        emojiBackground.appendChild(span);
    }
}

document.getElementById("musicContainer").addEventListener("dblclick", toggleMusic);
document.getElementById("calculateButton").addEventListener("click", calculate);

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculate();
    }
});
