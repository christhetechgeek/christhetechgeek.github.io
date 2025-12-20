/**
 * KINGDOM OF TECHNICAL WEALTH - ENGINE V14.0 (PRODUCTION)
 * ARCHITECT: Christopher Howard (DT1)
 * STRESS TEST: 10^21 | STATUS: FINAL HANDSHAKE
 */

let activePillar = 'ai';

function toggleHelp() {
    const m = document.getElementById('helpModal');
    m.style.display = (m.style.display === "block") ? "none" : "block";
}

function setPillar(p) {
    activePillar = p;
    document.querySelectorAll('.pillar-btn').forEach(b => b.classList.remove('active'));
    // Precise selector matching the text or onclick
    const btn = Array.from(document.querySelectorAll('.pillar-btn')).find(b => b.getAttribute('onclick').includes(p));
    if (btn) btn.classList.add('active');
    
    document.getElementById('globalSearch').value = "";
    document.getElementById('output-list').innerHTML = "";
}

async function unifiedSearch() {
    const q = document.getElementById('globalSearch').value.toLowerCase().trim();
    const list = document.getElementById('output-list');
    
    if (q.length < 2) { list.innerHTML = ""; return; }
    
    try {
        const res = await fetch(`./data/${activePillar}.json`);
        if (!res.ok) throw new Error("Vault Connection Failure");
        
        const data = await res.json();
        const matches = data.filter(i => 
            i.name.toLowerCase().includes(q) || 
            (i.keywords && i.keywords.toLowerCase().includes(q))
        );

        if (matches.length > 0) {
            list.innerHTML = matches.map(i => `
                <div class="card shadow">
                    <span class="card-tag">VERIFIED LOGIC // ${activePillar.toUpperCase()}</span>
                    <div class="card-title">${i.name}</div>
                    <p class="card-desc">${i.info}</p>
                    <div class="btn-group">
                        <a href="${i.link}" target="_blank" class="action-btn">ACQUIRE DIRECT PATH</a>
                    </div>
                </div>
            `).join('');
        } else {
            list.innerHTML = `
                <div class="card" onclick="window.open('https://google.com/search?q=${q}', '_blank')" style="cursor:pointer; border-color:#333">
                    <span class="card-tag" style="color:#555">SYSTEM OVERRIDE</span>
                    <div class="card-title">LOGIC NOT FOUND</div>
                    <p class="card-desc">No local blueprint for "${q}". Search global web?</p>
                    <div class="action-btn" style="background:transparent; border:1px solid #fff; color:#fff">EXECUTE GLOBAL SEARCH</div>
                </div>`;
        }
    } catch (e) {
        list.innerHTML = `<div class="card-error" style="color:red">CRITICAL: Data vault for [${activePillar}] is missing. Check /data/ folder.</div>`;
    }
}

// Global Event: Close modal on outside click
window.onclick = (e) => {
    const m = document.getElementById('helpModal');
    if (e.target == m) m.style.display = "none";
}

window.onload = () => setPillar('ai');