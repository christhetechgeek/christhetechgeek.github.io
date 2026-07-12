const audioLibrary = [
    { id: 0, title: 'The Sakura Shadow', path: 'audio/The Sakura Shadow.mp3', char: 'onyx' },
    { id: 1, title: 'Sakura Tree', path: 'audio/Sakura Tree.mp3', char: 'aero' },
    { id: 2, title: 'Sakuras Walkway', path: 'audio/Sakura’s Walkway.mp3', char: 'onyx' },
    { id: 3, title: 'Aero & Onyx', path: 'audio/Aero & Onyx.mp3', char: 'aero' },
    { id: 4, title: 'Cyber Venom', path: 'audio/Cyber Venom.mp3', char: 'onyx' },
    { id: 5, title: 'Shinobi', path: 'audio/Shinobi.mp3', char: 'aero' },
    { id: 6, title: 'Shadow of Shinobi', path: 'audio/Shadow of Shinobi.mp3', char: 'onyx' },
    { id: 7, title: 'Sword Through Neck', path: 'audio/Sword Through Neck.mp3', char: 'aero' }
];

const selector = document.getElementById('track-selector');
let currentAudio = new Audio();
let currentTrackIndex = 0; // Tracks the loop position

// Initialize Selector
audioLibrary.forEach(track => {
    let opt = document.createElement('option');
    opt.value = track.id;
    opt.innerHTML = track.title;
    selector.appendChild(opt);
});

function updateSelection() {
    currentTrackIndex = parseInt(selector.value);
    playCurrentTrack(audioLibrary[currentTrackIndex].char);
}

function playCurrentTrack(char) {
    // Update the index to the next track automatically
    const track = audioLibrary[currentTrackIndex];
    const el = document.getElementById(`${char}-side`);
    const items = document.querySelectorAll('.gallery-item');
    
    // Audio Execution
    currentAudio.pause();
    currentAudio.src = track.path;
    currentAudio.play();
    document.getElementById('now-playing').innerText = `NOW PLAYING: ${track.title}`;
    
    // Update selector UI to match
    selector.value = currentTrackIndex;

    // Visual Feedback
    el.classList.add(char === 'aero' ? 'glitch-active' : 'petal-active');
    setTimeout(() => el.classList.remove('glitch-active', 'petal-active'), 1000);

    // Gallery Sync Logic
    items.forEach((item, index) => {
        item.classList.remove('active-asset');
        if (char === 'aero' && index < 4) item.classList.add('active-asset');
        if (char === 'onyx' && index >= 4) item.classList.add('active-asset');
    });

    // Increment for next click, loop back to 0 if at end
    currentTrackIndex = (currentTrackIndex + 1) % audioLibrary.length;
}

// Scroll Logic
document.getElementById('start-journey').addEventListener('click', () => {
    document.getElementById('wasteland-stage').scrollIntoView({ behavior: 'smooth' });
});