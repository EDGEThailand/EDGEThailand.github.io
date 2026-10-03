const members=window.EDGE_MEMBERS||[];
const $=s=>document.querySelector(s);
const escapeHtml=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let shown=12;
const ready=members.filter(m=>m.file).length;
for(const category of [...new Set(members.map(m=>m.category))].sort()){
 const option=document.createElement('option');option.value=category;option.textContent=category;$('#category').append(option);
}
function filtered(){const term=$('#search').value.trim().toLocaleLowerCase();return members.filter(m=>(!term||[m.name,m.brand,m.description].join(' ').toLocaleLowerCase().includes(term))&&(!$('#category').value||m.category===$('#category').value)&&($('#availability').value!=='ready'||m.file)).sort((a,b)=>Number(!!b.file)-Number(!!a.file)||a.id-b.id)}
function render(){const list=filtered();$('#result-count').textContent=`พบ ${list.length} ราย · ทำเนียบพร้อมอ่านทั้งหมด ${ready} ราย`;$('#members').innerHTML=list.length?list.slice(0,shown).map(m=>`<article class="member-card"><div class="member-thumb">${m.preview?`<img loading="lazy" src="${m.preview}" alt="ทำเนียบของ ${escapeHtml(m.name)}">`:`<span class="initial" aria-hidden="true">${escapeHtml(m.name.replace(/^(นางสาว|นาง|นาย|น\.ส\.|นส\.?)/,'').trim().slice(0,1))}</span>`}${m.file?'<span class="member-status">เปิดอ่านทำเนียบได้</span>':''}</div><div class="member-body"><span class="category">${escapeHtml(m.category)}</span><h3>${escapeHtml(m.name)}</h3><p>${escapeHtml(m.brand||'สมาชิกเครือข่าย EDGE')}</p><button data-member="${m.id}">ดูธุรกิจและทำเนียบ</button></div></article>`).join(''):'<p class="empty">ไม่พบรายชื่อที่ตรงกับคำค้น ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง</p>';$('#more').hidden=shown>=list.length;}
for(const selector of ['#search','#category','#availability'])$(selector).addEventListener('input',()=>{shown=12;render()});
$('#more').addEventListener('click',()=>{shown+=12;render()});
$('#reset').addEventListener('click',()=>{$('#search').value='';$('#category').value='';$('#availability').value='all';shown=12;render()});
let lastFocus;
function openDialog(dialog){lastFocus=document.activeElement;dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('.close').focus()}
document.addEventListener('click',e=>{const button=e.target.closest('[data-member]');if(button){const m=members.find(x=>x.id===Number(button.dataset.member));$('#profile-content').innerHTML=`<div class="${m.preview?'profile-layout':'profile-text-only'}">${m.preview?`<img src="${m.preview}" alt="ทำเนียบฉบับสมาชิกจัดทำของ ${escapeHtml(m.name)}">`:''}<div><p class="eyebrow">สมาชิกเครือข่าย EDGE</p><h2>${escapeHtml(m.name)}</h2>${m.brand?`<h3>${escapeHtml(m.brand)}</h3>`:''}<p>${escapeHtml(m.description||'รายละเอียดสินค้าและบริการอยู่ระหว่างเพิ่มเติม')}</p>${m.file?`<a class="button dark" href="${m.file}" target="_blank" rel="noopener">เปิดทำเนียบต้นฉบับ</a><a class="button outline" href="${m.file}" download>ดาวน์โหลด</a><p class="source">ข้อมูลและช่องทางธุรกิจตามเอกสารที่สมาชิกจัดทำ โปรดตรวจสอบรายละเอียดล่าสุดกับเจ้าของธุรกิจ</p>`:'<p class="muted">รายละเอียดทำเนียบอยู่ระหว่างเพิ่มเติม</p>'}<button class="button outline" data-connect="profile">แจ้งแก้ไขข้อมูลกับทีมงาน</button></div></div>`;openDialog($('#profile-dialog'));}
const contact=e.target.closest('[data-connect]');if(contact){const cfg=window.EDGE_CONFIG||{};const url=contact.dataset.connect==='profile'?cfg.profileFormUrl:cfg.contactFormUrl;if(url&&/^https:\/\//i.test(url)){window.open(url,'_blank','noopener,noreferrer')}else{openDialog($('#contact-dialog'))}}
});
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}});d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.style.overflow='';lastFocus?.focus()})});
$('#menu').addEventListener('click',()=>{const open=$('#nav').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(open))});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{$('#nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false')}));
render();
