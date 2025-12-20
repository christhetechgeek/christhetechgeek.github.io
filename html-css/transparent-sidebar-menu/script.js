/**
 * KINGDOM OF TECHNICAL WEALTH - CORE ENGINE v9.0
 * ARCHITECT: Christopher Howard (DT1)
 * MISSION: Direct Path / Filtered Authority / Zero Friction
 */

let activePillar = 'ai'; // Default Pillar

/**
 * Switch between the 5 Pillars of the Kingdom
 * @param {string} pillar - ai, gaming, hardware, tech, forge
 */
function setPillar(pillar) {
    activePillar = pillar;
    
    // Update UI highlights
    document.querySelectorAll('.pillar-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.pillar-btn[onclick="setPillar('${pillar}')"]`);
    if(activeBtn) activeBtn.classList.add('active');
    
    // Clear search and output for a fresh state
    document.getElementById('globalSearch').value = "";
    document.getElementById('output-list').innerHTML = "";
}

/**
 * Execute Search with Filtered Authority Logic
 */
async function unifiedSearch() {
    const q = document.getElementById('globalSearch').value.toLowerCase().trim();
    const list = document.getElementById('output-list');
    
    // Minimum 2 characters to trigger search
    if (q.length < 2) { 
        list.innerHTML = ""; 
        return; 
    }
    
    try {
        // Fetch the active JSON Vault
        const response = await fetch(`./data/${activePillar}.json`);
        if (!response.ok) throw new Error("Vault Connection Failure");
        
        const data = await response.json();
        
        // Filter logic: Matches name or keywords
        const matches = data.filter(i => 
            i.name.toLowerCase().includes(q) || 
            (i.keywords && i.keywords.toLowerCase().includes(q))
        );

        if (matches.length > 0) {
            // DIRECT PATH: Found Verified Logic
            list.innerHTML = matches.map(i => `
                <div class="card">
                    <span class="card-tag">VERIFIED LOGIC</span>
                    <span class="card-title">${i.name}</span>
                    <p class="card-desc">${i.info}</p>
                    
                    <div class="action-cluster" style="margin-top: 15px; display: flex; gap: 10px;">
                        ${(i.photos && i.photos !== "") ? 
                            `<a href="${i.photos}" target="_blank" class="action-btn-secondary">PREVIEW PROOF</a>` : ''}
                        
                        <a href="${i.link}" target="_blank" class="action-btn">ACQUIRE DIRECT PATH</a>
                    </div>
                </div>
            `).join('');
        } else {
            // SYSTEM OVERRIDE: Curated Fallback
            list.innerHTML = `
                <div class="card card-fallback" onclick="window.open('https://google.com/search?q=${q}', '_blank')">
                    <span class="card-tag" style="background: #444;">SYSTEM OVERRIDE</span>
                    <span class="card-title">NO LOCAL LOGIC FOUND</span>
                    <p class="card-desc">The Kingdom does not yet have a verified blueprint for "${q}". Use System Override to search the global web via Google's engine.</p>
                    <div class="action-btn" style="background: transparent; border: 1px solid #fff;">EXECUTE GLOBAL SEARCH</div>
                </div>
            `;
        }
    } catch (err) {
        console.error("Critical Engine Error:", err);
        list.innerHTML = `<div class="card-error">CRITICAL: VAULT OFFLINE. CHECK DATA SOURCE.</div>`;
    }
}

// Ensure the first pillar is active on load
window.onload = () => {
    setPillar('ai');
};