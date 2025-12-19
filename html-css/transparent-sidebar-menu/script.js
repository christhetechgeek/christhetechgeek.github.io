/**
 * PROJECT: THE KINGDOM (Systems Architecture v1.0)
 * ARCHITECT: Chris (AI Solutions & Human-Centric Architect)
 * PHILOSOPHY: Human-First / Zero-Friction
 */

const kingdomData = {
    ai: { 
        logo: "A.I. <span class='accent'>ORACLE</span>", 
        class: "stage-ai",
        desc: "Advanced intelligence tools for high-stakes productivity. Search for prompts or AI models to streamline your workflow.",
        examples: ["Code Auditor", "Budget Strategist", "Technical Writer"],
        label: "INITIALIZE AI SEARCH",
        placeholder: "Enter tool or objective..."
    },
    hardware: { 
        logo: "THE <span class='accent'>ARMORY</span>", 
        class: "stage-hardware",
        desc: "Precision hardware mapping. Search your system architecture to verify the ceiling for high-performance upgrades.",
        examples: ["Surface Pro", "Alienware 32", "Western Digital 8TB"],
        label: "MAP SYSTEM COMPATIBILITY",
        placeholder: "Search device..."
    },
    gaming: { 
        logo: "THE <span class='accent'>ARENA</span>", 
        class: "stage-gaming",
        desc: "Performance calibration for visual fidelity. Acquire 'Golden Setting' configurations for your hardware and titles.",
        examples: ["Cyberpunk", "HDR Calibration", "OLED Peak"],
        label: "CALIBRATE PERFORMANCE",
        placeholder: "Search Game or Monitor..."
    },
    tech: { 
        logo: "TECH <span class='accent'>INFRA</span>", 
        class: "stage-tech",
        desc: "System blueprints for high-performance living. Search for verified networking, power, and smart-home standards.",
        examples: ["WiFi 7", "GaN Charging", "Smart Lighting"],
        label: "SYSTEM BLUEPRINT",
        placeholder: "Search Network/Power..."
    },
    dev: { 
        logo: "THE <span class='accent'>FORGE</span>", 
        class: "stage-dev",
        desc: "High-integrity boilerplate and automation logic. Select your tech stack to inject clean structure into your projects.",
        examples: ["React/Tailwind", "Python/Docker", "Node/Express"],
        label: "INJECT BOILERPLATE LOGIC",
        placeholder: "Select Tech Stack..."
    }
};

// Global State
let activePillar = 'ai';

/**
 * REBUILD UI ON PILLAR SELECTION
 */
function ignitePillar(pillar, event) {
    activePillar = pillar;
    const stage = document.getElementById('pillar-stage');
    const logo = document.getElementById('pillar-logo');
    const config = kingdomData[pillar];

    // Smooth UX Fade
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

    // Update Nav Buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');
}

/**
 * AUTO-FILL SEARCH
 */
function fillSearch(term) {
    const input = document.getElementById('globalSearch');
    if (input) {
        input.value = term;
        unifiedSearch();
    }
}

/**
 * DETERMINISTIC SEARCH ENGINE
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
        const response = await fetch(`./data/${activePillar}.json`);
        if (!response.ok) throw new Error(`Data Stream Offline`);
        
        const data = await response.json();

        // Exact & Keyword Matching
        const matches = data.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(query);
            const keywordMatch = item.keywords.toLowerCase().includes(query);
            return nameMatch || keywordMatch;
        });

        container.classList.remove('results-hidden');

        if (matches.length > 0) {
            list.innerHTML = matches.map(item => `
                <div class="card">
                    <span class="card-title">${item.name}</span>
                    <p class="card-desc">${item.info}</p>
                    <a href="${item.link}" target="_blank" class="action-btn">ACQUIRE VERIFIED COMPONENT</a>
                </div>
            `).join('');
        } else {
            // HUMAN-FIRST FALLBACK: Pure Search, No Jargon
            list.innerHTML = `
                <div class="card" style="border-style: dashed; border-color: #444;">
                    <span class="card-title">GLOBAL SEARCH</span>
                    <p class="card-desc">No local verified entries for "${query}" found in the Vault. Search the global web?</p>
                    <button class="action-btn" onclick="consultOracle('${query}')">SEARCH THE WEB</button>
                </div>
            `;
        }
    } catch (err) {
        console.error("Pathing/Data Error:", err);
    }
}

/**
 * PURE HUMAN-CENTRIC ORACLE
 */
function consultOracle(query) {
    // Zero manipulation. Just the user's specific term.
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

// Initial Launch
window.onload = () => ignitePillar('ai');