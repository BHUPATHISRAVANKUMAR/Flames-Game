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

    audioPlayer.src = musicDict[status]; // Set the audio source
    audioPlayer.play(); // Play the audio
}

function toggleMusic() {
    const audioPlayer = document.getElementById("audioPlayer");

    if (audioPlayer.paused) {
        audioPlayer.play(); // Play if paused
    } else {
        audioPlayer.pause(); // Pause if playing
        audioPlayer.currentTime = 0; // Reset to the beginning
    }
}

function displayError(message) {
    alert(message); // Simple alert for error messages
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
        'F': "Friends",
        'L': "Love",
        'A': "Affection",
        'M': "Marriage",
        'E': "Enemy",
        'S': "Sister"
    };

    const resultElement = document.getElementById("result");
    resultElement.className = ''; // Clear previous animations
    resultElement.classList.add(resultChar); // Add new class
    resultElement.innerText =`The relationship status is: ${resultsDict[resultChar]}`; // Display single result

    playMusicForStatus(resultChar); // Play the corresponding music

    if (resultChar === 'L' || resultChar === 'M') {
        const crackerBlast = document.getElementById("crackerBlast");
        crackerBlast.style.display = 'block';
        setTimeout(() => crackerBlast.style.display = 'none', 100);
    }
}

// Toggle music on double-click of the container
document.getElementById("musicContainer").addEventListener("dblclick", toggleMusic);

document.getElementById("calculateButton").addEventListener("click", calculate);

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculate();
    }
});
