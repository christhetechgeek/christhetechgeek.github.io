const kingdomData = {
    ai: { logo: "A.I. <span class='accent'>ORACLE</span>", desc: "Human-First AI Prompt Engineering.", label: "INITIALIZE LOGIC", placeholder: "Search objective..." },
    hardware: { logo: "THE <span class='accent'>ARMORY</span>", desc: "Verified High-Performance Hardware.", label: "MAP COMPATIBILITY", placeholder: "Search device..." },
    gaming: { logo: "THE <span class='accent'>ARENA</span>", desc: "Golden Settings for Peak Fidelity.", label: "CALIBRATE PERFORMANCE", placeholder: "Search titles..." },
    tech: { logo: "TECH <span class='accent'>INFRA</span>", desc: "Infrastructure & Networking Blueprints.", label: "SYSTEM BLUEPRINT", placeholder: "Search network/power..." },
    dev: { logo: "THE <span class='accent'>FORGE</span>", desc: "Clean-Room Code & Boilerplates.", label: "INJECT LOGIC", placeholder: "Search stack..." }
};

let activePillar = 'ai';

function ignitePillar(pillar, event) {
    activePillar = pillar;
    const stage = document.getElementById('pillar-stage');
    const logo = document.getElementById('pillar-logo');
    const config = kingdomData[pillar];
    
    stage.style.opacity = 0;
    setTimeout(() => {
        logo.innerHTML = `<div class="pillar-icon">${config.logo}</div>`;
        stage.innerHTML = `
            <div class="manifesto"><h3>THE MISSION</h3><p>${config.desc}</p></div>
            <div class="search-anchor">
                <label>${config.label}</label>
                <input type="text" id="globalSearch" placeholder="${config.placeholder}" onkeyup="unifiedSearch()">
            </div>
            <div id="results-container" class="results-hidden"><div id="output-list"></div></div>
        `;
        stage.style.opacity = 1;
    }, 300);

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
}

async function unifiedSearch() {
    const input = document.getElementById('globalSearch');
    const query = input.value.toLowerCase().trim();
    const list = document.getElementById('output-list');
    const container = document.getElementById('results-container');

    if (query.length < 2) { container.classList.add('results-hidden'); return; }

    try {
        const response = await fetch(`./data/${activePillar}.json`);
        const data = await response.json();
        const matches = data.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.keywords.toLowerCase().includes(query)
        );

        container.classList.remove('results-hidden');
        if (matches.length > 0) {
            list.innerHTML = matches.map(item => `
                <div class="card">
                    <span class="card-title">${item.name}</span>
                    <p class="card-desc">${item.info}</p>
                    <a href="${item.link}" class="action-btn" target="_blank">ACQUIRE LOGIC</a>
                </div>
            `).join('');
        } else {
            list.innerHTML = `
                <div class="card" style="border-style: dashed; cursor: pointer; grid-column: 1/-1;" onclick="window.open('https://google.com/search?q=${query}')">
                    <span class="card-title">SEARCH GLOBAL LIBRARY</span>
                    <p class="card-desc">No local entries for "${query}". Click to search the global technical web.</p>
                </div>
            `;
        }
    } catch (e) { console.error("Vault Connection Error."); }
}

window.onload = () => ignitePillar('ai');