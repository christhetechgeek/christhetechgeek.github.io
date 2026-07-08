const audioLibrary = [
    { id: 0, title: 'The Sakura Shadow', path: 'audio/The Sakura Shadow.mp3', char: 'onyx' },
    { id: 1, title: 'Sakura Tree', path: 'audio/Sakura Tree.mp3', char: 'aero' },
    { id: 2, title: 'Sakuras Walkway', path: 'audio/Sakura’s Walkway.mp3', char: 'onyx' },
    { id: 3, title: 'Aero & Onyx', path: 'audio/Aero & Onyx.mp3', char: 'aero' }
];

const selector = document.getElementById('track-selector');
let currentAudio = new Audio();

audioLibrary.forEach(track => {
    let opt = document.createElement('option');
    opt.value = track.id;
    opt.innerHTML = track.title;
    selector.appendChild(opt);
});

function updateSelection() {
    const track = audioLibrary[selector.value];
    playCurrentTrack(track.char, track);
}

function playCurrentTrack(char, manualTrack = null) {
    const track = manualTrack || audioLibrary[selector.value];
    const el = document.getElementById(`${char}-side`);
    
    currentAudio.pause();
    currentAudio.src = track.path;
    currentAudio.play();
    document.getElementById('now-playing').innerText = `NOW PLAYING: ${track.title}`;

    el.classList.add(char === 'aero' ? 'glitch-active' : 'petal-active');
    setTimeout(() => el.classList.remove('glitch-active', 'petal-active'), 1000);
}

document.getElementById('start-journey').addEventListener('click', () => {
    document.getElementById('wasteland-stage').scrollIntoView({ behavior: 'smooth' });
});