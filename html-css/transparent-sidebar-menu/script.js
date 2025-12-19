/**
 * PROJECT: THE KINGDOM (Systems Architecture v1.0)
 * ARCHITECT: Chris (AI Solutions & Human-Centric Architect)
 * LOGIC: Context-Adaptive Intelligence Engine
 */

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
        examples: ["Surface Pro", "Alienware 32", "Western Digital 8TB"],
        label: "MAP SYSTEM COMPATIBILITY",
        placeholder: "Search device architecture..."
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

// Global State Tracker
let activePillar = 'ai';

/**
 * REBUILD UI STRUCTURE ON PILLAR IGNITION
 */
function ignitePillar(pillar, event) {
    activePillar = pillar;
    const stage = document.getElementById('pillar-stage');
    const logo = document.getElementById('pillar-logo');
    const config = kingdomData[pillar];

    // Smooth UX Transition
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

    // Update Navigation UI
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
}

/**
 * AUTO-FILL SEARCH FROM EXAMPLES
 */
function fillSearch(term) {
    const input = document.getElementById('globalSearch');
    if (input) {
        input.value = term;
        unifiedSearch();
    }
}

/**
 * UNIFIED DETERMINISTIC SEARCH ENGINE
 */
async function unifiedSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase().trim();
    const list = document.getElementById('output-list');
    const container = document.getElementById('results-container');

    if (query.length < 2) {
        container.classList.add('results-hidden');
        return;
    }

    try {
        // Fetch from Pillar-Specific Data Vault
        const response = await fetch(`./data/${activePillar}.json`);
        if (!response.ok) throw new Error(`Vault Offline: ${activePillar}`);
        
        const data = await response.json();

        // Multi-Layer Matching Logic
        const matches = data.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(query);
            const keywordMatch = item.keywords.toLowerCase().includes(query);
            const infoMatch = item.info ? item.info.toLowerCase().includes(query) : false;
            return nameMatch || keywordMatch || infoMatch;
        });

        container.classList.remove('results-hidden');

        if (matches.length > 0) {
            list.innerHTML = matches.map(item => `
                <div class="card">
                    <span class="card-title">${item.name}</span>
                    <p class="card-desc">${item.info}</p>
                    <a href="${item.link}" target="_blank" class="action-btn">ACQUIRE VERIFIED LOGIC</a>
                </div>
            `).join('');
        } else {
            // GENERATIVE ORACLE FALLBACK (Forward Thinking 2025-2027)
            list.innerHTML = `
                <div class="card" style="border-style: dashed; border-color: #444;">
                    <span class="card-title">GLOBAL ORACLE SEARCH</span>
                    <p class="card-desc">No local verified entries for "${query}" found. Initialize Context-Adaptive Search for 2015-2026+ intelligence?</p>
                    <button class="action-btn" onclick="consultOracle('${query}')">CONSULT THE ORACLE</button>
                </div>
            `;
        }
    } catch (err) {
        console.error("Critical Architecture Error:", err);
    }
}

/**
 * CONTEXT-ADAPTIVE INTELLIGENCE (The Oracle Bridge)
 */
function consultOracle(query) {
    let searchPrefix = "";

    // Adapt search intent based on the active Pillar Territory
    switch(activePillar) {
        case 'ai':
            searchPrefix = `best+ai+prompt+architecture+for+${query}`;
            break;
        case 'hardware':
            searchPrefix = `site:techpowerup.com+${query}+specs+review`;
            break;
        case 'gaming':
            searchPrefix = `${query}+best+optimized+settings+hdr+calibration`;
            break;
        case 'tech':
            searchPrefix = `${query}+infrastructure+design+blueprint+standards`;
            break;
        case 'dev':
            searchPrefix = `${query}+boilerplate+code+snippet+github+best+practices`;
            break;
        default:
            searchPrefix = `${query}`;
    }

    window.open(`https://www.google.com/search?q=${searchPrefix}`, '_blank');
}

// Initialize Kingdom on Entry
window.onload = () => ignitePillar('ai');