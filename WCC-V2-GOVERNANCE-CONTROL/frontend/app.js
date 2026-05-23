const KEY='wcc_v2_state';
const state=JSON.parse(localStorage.getItem(KEY)||'null')||{
 decision:'FIX',priority:'High',backend:'V37700 — PROMOTE',frontend:'V38100 — HOLD/FIX',
 blocker:'EE frontend design fidelity and architecture stabilization.',
 next:'Build EE visual shell lock and MVC foundation under WCC governance.',
 versions:[{v:'V37700 Backend',s:'PROMOTE',n:'Stable backend'},{v:'WCC V1',s:'PROMOTE',n:'Online control app live'},{v:'V38100 Frontend',s:'HOLD',n:'Modular direction good; visual fidelity off'}],
 tests:[{n:'Backend /health',s:'PASS',d:'V37700 stable'},{n:'Frontend live',s:'FAIL',d:'Design fidelity off'},{n:'WCC live',s:'PASS',d:'Operational control app deployed'}],
 approvals:[{t:'Production deploy',r:'Requires Will approval'},{t:'Client-facing send',r:'Requires Will approval'},{t:'Pricing/final proposal',r:'Requires Will approval'}],
 assets:[{n:'Deployment Digital Asset',p:'Can prepare/test/report. Cannot deploy without approval.'},{n:'QA Digital Asset',p:'Can test/validate/report. Cannot promote alone.'},{n:'Proposal Digital Asset',p:'Can draft/structure. Cannot send or finalize pricing.'}]
};
const $=s=>document.querySelector(s);let view='overview';function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function report(){return `WCC V2 GOVERNANCE REPORT\n\nDECISION:\n${state.decision}\n\nPRIORITY:\n${state.priority}\n\nBACKEND:\n${state.backend}\n\nFRONTEND:\n${state.frontend}\n\nCURRENT BLOCKER:\n${state.blocker}\n\nNEXT EXACT ACTION:\n${state.next}\n\nVERSION REGISTRY:\n${state.versions.map(x=>`- ${x.v}: ${x.s} — ${x.n}`).join('\n')}\n\nVALIDATION:\n${state.tests.map(x=>`- ${x.n}: ${x.s} — ${x.d}`).join('\n')}\n\nAPPROVAL RULES:\n${state.approvals.map(x=>`- ${x.t}: ${x.r}`).join('\n')}\n\nDIGITAL ASSETS:\n${state.assets.map(x=>`- ${x.n}: ${x.p}`).join('\n')}\n\nASK:\nReview and give HOLD / FIX / PROMOTE / ROLLBACK plus next exact action.`}
function field(k,label,area=false){return `<label>${label}</label>${area?`<textarea data-k="${k}">${state[k]}</textarea>`:`<input data-k="${k}" value="${state[k]}">`}`}
function overview(){return `<div class=grid><div class=card><h3>Decision</h3><h2>${state.decision}</h2></div><div class=card><h3>Backend</h3><h2>${state.backend.split(' ')[0]}</h2></div><div class=card><h3>Frontend</h3><h2>${state.frontend.split(' ')[0]}</h2></div></div><div class=card>${field('decision','Decision')}${field('priority','Priority')}${field('backend','Backend')}${field('frontend','Frontend')}${field('blocker','Current Blocker',true)}${field('next','Next Exact Action',true)}</div>`}
function list(items,render){return `<div class=card>${items.map(render).join('')}</div>`}
function versions(){return list(state.versions,x=>`<div class=item><span class="pill ${x.s}">${x.s}</span><h3>${x.v}</h3><p>${x.n}</p></div>`)}
function tests(){return list(state.tests,x=>`<div class=item><h3>${x.n}</h3><p><b>${x.s}</b> — ${x.d}</p></div>`)}
function approvals(){return list(state.approvals,x=>`<div class=item><h3>${x.t}</h3><p>${x.r}</p></div>`)}
function assets(){return list(state.assets,x=>`<div class=item><h3>${x.n}</h3><p>${x.p}</p></div>`)}
function reportView(){return `<div class=card><button class=primary id=copy>Copy Report</button><hr><div class=report>${report()}</div></div>`}
function render(){document.querySelectorAll('aside button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));$('#badge').textContent=`WCC V2 ${state.decision}`;$('#view').innerHTML={overview,versions,tests,approvals,assets,report:reportView}[view]();document.querySelectorAll('[data-k]').forEach(el=>el.oninput=()=>{state[el.dataset.k]=el.value;save();render()});if($('#copy'))$('#copy').onclick=async()=>{await navigator.clipboard.writeText(report());alert('Report copied')}}document.querySelectorAll('aside button').forEach(b=>b.onclick=()=>{view=b.dataset.view;render()});window.addEventListener('storage',()=>location.reload());render();
