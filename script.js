
function qs(s){return document.querySelector(s)}
function qsa(s){return Array.from(document.querySelectorAll(s))}

async function loadProfiles(){
  const res = await fetch('profiles.json');
  const data = await res.json();
  window.PROFILES = data;
  renderList(data);
}

function renderList(arr){
  const grid = qs('#grid');
  grid.innerHTML = '';
  arr.forEach((p, idx)=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p class="small"><span class="badge">${p.nickname||''}</span></p>
      <p class="small">Sinh: ${p.dob||''}</p>
      <button class="btn open" data-idx="${String(idx+1).padStart(2,'0')}">Mở quà</button>
    `;
    grid.appendChild(div);
  });
  qsa('.open').forEach(b=> b.addEventListener('click', (e)=>{
    const id = e.currentTarget.getAttribute('data-idx');
    location.href = `profiles/${id}.html`;
  }));
}

function doSearch(){
  const q = qs('#q').value.trim().toLowerCase();
  const arr = window.PROFILES.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.nickname && p.nickname.toLowerCase().includes(q))
  );
  renderList(arr);
}

window.addEventListener('DOMContentLoaded', ()=>{
  loadProfiles();
  qs('#q').addEventListener('input', doSearch);
});
