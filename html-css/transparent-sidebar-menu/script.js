const kingdomData = {
    ai: { 
        logo: "A.I. <span class='accent'>ORACLE</span>", 
        class: "stage-ai",
        desc: "Advanced prompt engineering for high-stakes productivity. Input your objective to generate a human-centered logic engine.",
        examples: ["Code Auditor", "Budget Strategist", "Technical Writer"],
        label: "INITIALIZE PROMPT ARCHITECTURE",
        placeholder: "Define the objective..."
    },
    hardware: { 
        logo: "THE <span class='accent'>ARMORY</span>", 
        class: "stage-hardware",
        desc: "Precision compatibility for high-performance builds. Search your system to verify the architectural ceiling for hardware upgrades.",
        examples: ["Surface Pro", "Alienware 32", "ROG Ally"],
        label: "MAP SYSTEM COMPATIBILITY",
        placeholder: "Search device..."
    },
    gaming: { 
        logo: "THE <span class='accent'>ARENA</span>", 
        class: "stage-gaming",
        desc: "Dynamic calibration for high-refresh visual fidelity. Search your monitor or title to acquire 'Golden Setting' configurations.",
        examples: ["Cyberpunk", "HDR Calibration", "OLED Peak"],
        label: "CALIBRATE PERFORMANCE",
        placeholder: "Search Game or Monitor..."
    },
    tech: { 
        logo: "TECH <span class='accent'>INFRA</span>", 
        class: "stage-tech",
        desc: "Blueprints for high-performance living. Search for verified networking, power, and lighting infrastructure architectures.",
        examples: ["WiFi 7", "GaN Charging", "Smart Lighting"],
        label: "SYSTEM BLUEPRINT",
        placeholder: "Search Network/Power..."
    },
    dev: { 
        logo: "THE <span class='accent'>FORGE</span>", 
        class: "stage-dev",
        desc: "Clean-room boilerplate and automation logic. Select your stack to inject high-integrity structure into your programming workflow.",
        examples: ["React/Tailwind", "Python/Docker", "Node/Express"],
        label: "INJECT BOILERPLATE LOGIC",
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
        stage.className = config.class;

        stage.innerHTML = `
            <div class="manifesto">
                <h3>THE MISSION</h3>
                <p>${config.desc}</p>
            </div>

            <div class="example-cluster">
                ${config.examples.map(ex => `<div class="example-tag" onclick="fillSearch('${ex}')">${ex}</div>`).join('')}
            </div>

            <div class="search-anchor">
                <div class="search-section">
                    <label>${config.label}</label>
                    <input type="text" id="globalSearch" placeholder="${config.placeholder}" onkeyup="unifiedSearch()">
                </div>
            </div>
            
            <div id="results-container" class="results-hidden">
                <div class="glow-line"></div>
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
    input.value = term;
    unifiedSearch();
}

async function unifiedSearch() {
    const input = document.getElementById('globalSearch');
    if (!input) return;
    
    const query = input.value.toLowerCase().trim();
    const list = document.getElementById('output-list');
    const container = document.getElementById('results-container');

    // Return early if the query is too short
    if (query.length < 2) {
        container.classList.add('results-hidden');
        return;
    }

    try {
        const response = await fetch(`./data/${activePillar}.json`);
        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        
        const data = await response.json();

        // THE FIX: Improved logic to check names, descriptions, AND keywords
        const matches = data.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(query);
            const infoMatch = item.info.toLowerCase().includes(query);
            const keywordMatch = item.keywords.toLowerCase().split(' ').some(kw => kw.startsWith(query) || query.includes(kw));
            
            return nameMatch || infoMatch || keywordMatch;
        });

        if (matches.length > 0) {
            container.classList.remove('results-hidden');
            list.innerHTML = matches.map(item => `
                <div class="card">
                    <span class="card-title">${item.name}</span>
                    <p class="card-desc">${item.info}</p>
                    <a href="${item.link}" target="_blank" class="action-btn">ACQUIRE VERIFIED LOGIC</a>
                </div>
            `).join('');
        } else {
            container.classList.add('results-hidden');
        }
    } catch (err) {
        console.error("SYSTEM AUDIT ERROR:", err);
    }
}