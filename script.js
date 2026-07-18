let audioLibrary = [];
const selector = document.getElementById('track-selector');
let currentAudio = new Audio();
let currentTrackIndex = 0;

// Initialize Library from JSON
async function initLibrary() {
    try {
        const response = await fetch('data/assets.json');
        const data = await response.json();
        audioLibrary = data.projects;

        // Initialize Selector
        audioLibrary.forEach(track => {
            let opt = document.createElement('option');
            opt.value = track.id;
            opt.innerHTML = track.title;
            selector.appendChild(opt);
        });
    } catch (error) {
        console.error('Error loading library:', error);
    }
}

// Keep existing play logic, now using dynamic audioLibrary
function playCurrentTrack(char) {
    const track = audioLibrary[currentTrackIndex];
    if (!track) return;

    const el = document.getElementById(`${char}-side`);
    const items = document.querySelectorAll('.gallery-item');
    
    currentAudio.pause();
    currentAudio.src = track.path;
    currentAudio.play();
    document.getElementById('now-playing').innerText = `NOW PLAYING: ${track.title}`;
    
    selector.value = currentTrackIndex;

    el.classList.add(char === 'aero' ? 'glitch-active' : 'petal-active');
    setTimeout(() => el.classList.remove('glitch-active', 'petal-active'), 1000);

    items.forEach((item, index) => {
        item.classList.remove('active-asset');
        if (char === 'aero' && index < 4) item.classList.add('active-asset');
        if (char === 'onyx' && index >= 4) item.classList.add('active-asset');
    });

    currentTrackIndex = (currentTrackIndex + 1) % audioLibrary.length;
}

function updateSelection() {
    currentTrackIndex = parseInt(selector.value);
    playCurrentTrack(audioLibrary[currentTrackIndex].char);
}

document.getElementById('start-journey').addEventListener('click', () => {
    document.getElementById('wasteland-stage').scrollIntoView({ behavior: 'smooth' });
});

// Run initialization
initLibrary();