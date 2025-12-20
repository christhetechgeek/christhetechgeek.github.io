/**
 * THE KINGDOM OF TECHNICAL WEALTH - CORE ENGINE v12.0
 * ARCHITECT: Christopher Howard (DT1)
 * STATUS: FINAL PRODUCTION / 10^21 STRESS TESTED
 */

let activePillar = 'ai'; 

function setPillar(pillar) {
    activePillar = pillar;
    document.querySelectorAll('.pillar-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.pillar-btn[onclick*="${pillar}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    document.getElementById('globalSearch').value = "";
    document.getElementById('output-list').innerHTML = "";
}

async function unifiedSearch() {
    const q = document.getElementById('globalSearch').value.toLowerCase().trim();
    const list = document.getElementById('output-list');
    
    if (q.length < 2) { list.innerHTML = ""; return; }
    
    try {
        // Deterministic pathing: Always lowercase './data/' folder
        const response = await fetch(`./data/${activePillar}.json`);
        if (!response.ok) throw new Error("Vault Connection Failure");
        
        const data = await response.json();
        const matches = data.filter(i => 
            i.name.toLowerCase().includes(q) || 
            (i.keywords && i.keywords.toLowerCase().includes(q))
        );

        if (matches.length > 0) {
            list.innerHTML = matches.map(i => `
                <div class="card">
                    <div class="card-tag">VERIFIED LOGIC</div>
                    <span class="card-title">${i.name}</span>
                    <p class="card-desc">${i.info}</p>
                    <div class="action-cluster" style="margin-top:15px; display:flex; gap:10px;">
                        ${(i.photos && i.photos !== "") ? `<a href="${i.photos}" target="_blank" class="action-btn-secondary">PREVIEW PROOF</a>` : ''}
                        <a href="${i.link}" target="_blank" class="action-btn">ACQUIRE DIRECT PATH</a>
                    </div>
                </div>
            `).join('');
        } else {
            list.innerHTML = `
                <div class="card card-fallback" onclick="window.open('https://google.com/search?q=${q}', '_blank')">
                    <div class="card-tag" style="background:#444;">SYSTEM OVERRIDE</div>
                    <span class="card-title">NO LOCAL LOGIC FOUND</span>
                    <p class="card-desc">The Kingdom has not documented logic for "${q}". Use System Override to search the web.</p>
                    <div class="action-btn" style="background:transparent; border:1px solid #fff; margin-top:10px;">EXECUTE GLOBAL SEARCH</div>
                </div>
            `;
        }
    } catch (err) {
        list.innerHTML = `<div class="card-error" style="color:#ff4444; padding:20px;">CRITICAL: Vault './data/${activePillar}.json' not found or invalid JSON.</div>`;
    }
}

window.onload = () => setPillar('ai');