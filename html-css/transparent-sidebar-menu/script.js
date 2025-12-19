const kingdomData = {
    ai: { 
        logo: "A.I. <span class='accent'>ORACLE</span>", 
        class: "stage-ai",
        desc: "Human-centered intelligence. Use the Oracle to remove friction from your workflow and protect your creative time.",
        examples: ["Code Auditor", "Budget Strategist", "Wealth Strategy"],
        label: "INITIALIZE INTELLIGENCE",
        placeholder: "Define your objective..."
    },
    hardware: { 
        logo: "THE <span class='accent'>ARMORY</span>", 
        class: "stage-hardware",
        desc: "Architecture-level hardware verification. Search components to confirm technical ceilings and build stability.",
        examples: ["Surface Pro", "8TB NVMe", "OLED Monitor"],
        label: "MAP COMPATIBILITY",
        placeholder: "Search components..."
    },
    gaming: { 
        logo: "THE <span class='accent'>ARENA</span>", 
        class: "stage-gaming",
        desc: "The 'Golden Settings' standard. Calibrate your visual fidelity for maximum performance and immersion.",
        examples: ["Cyberpunk", "HDR Calibration", "Peak Brightness"],
        label: "CALIBRATE FIDELITY",
        placeholder: "Search titles or displays..."
    },
    tech: { 
        logo: "TECH <span class='accent'>INFRA</span>", 
        class: "stage-tech",
        desc: "System blueprints for high-performance living. Verified networking, power, and infrastructure standards.",
        examples: ["WiFi 7", "GaN Charger", "Smart Lighting"],
        label: "SYSTEM BLUEPRINT",
        placeholder: "Search infrastructure..."
    },
    dev: { 
        logo: "THE <span class='accent'>FORGE</span>", 
        class: "stage-dev",
        desc: "High-integrity boilerplate logic. Rapidly inject clean-room architecture into your programming projects.",
        examples: ["React Starter", "Python Auditor", "Node Infrastructure"],
        label: "INJECT LOGIC",
        placeholder: "Select Tech Stack..."
    }
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
        stage.className = "stage-" + pillar;

        stage.innerHTML = `
            <div class="manifesto"><h3>THE MISSION</h3><p>${config.desc}</p></div>
            <div class="example-cluster">${config.examples.map(ex => `<div class="example-tag" onclick="fillSearch('${ex}')">${ex}</div>`).join('')}</div>
            <div class="search-anchor">
                <div class="search-section">
                    <label>${config.label}</label>
                    <input type="text" id="globalSearch" placeholder="${config.placeholder}" onkeyup="unifiedSearch()">
                </div>
            </div>
            <div id="results-container" class="results-hidden">
                <div id="output-list"></div>
            </div>
        `;
        stage.style.opacity = 1;
    }, 300);

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
}

function fillSearch(term) {
    const input = document.getElementById('globalSearch');
    if (input) { input.value = term; unifiedSearch(); }
}

async function unifiedSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase().trim();
    const list = document.getElementById('output-list');
    const container = document.getElementById('results-container');

    if (query.length < 2) { container.classList.add('results-hidden'); return; }

    try {
        const response = await fetch(`./data/${activePillar}.json`);
        const data = await response.json();

        // Forward-Thinking Filter: Checks Name, Keywords, AND Info
        const matches = data.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.keywords.toLowerCase().includes(query) ||
            (item.info && item.info.toLowerCase().includes(query))
        );

        container.classList.remove('results-hidden');

        if (matches.length > 0) {
            list.innerHTML = matches.map(item => `
                <div class="card">
                    <span class="card-title">${item.name}</span>
                    <p class="card-desc">${item.info || ''}</p>
                    <a href="${item.link}" target="_blank" class="action-btn">ACQUIRE LOGIC</a>
                </div>
            `).join('');
        } else {
            list.innerHTML = `
                <div class="card" style="border-style: dashed; grid-column: 1/-1;">
                    <span class="card-title">GLOBAL ORACLE</span>
                    <p class="card-desc">No local verified entries found for "${query}". Search the global technical library?</p>
                    <button class="action-btn" onclick="consultOracle('${query}')">SEARCH WEB</button>
                </div>
            `;
        }
    } catch (err) { console.error("Data Audit Error:", err); }
}

function consultOracle(query) {
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

window.onload = () => ignitePillar('ai');