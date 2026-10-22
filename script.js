'use strict';
const projects = [
  {name:'SadarBudget Android',type:'Android App',image:'sadarbudget-android.png',repo:'SadarBudget-Android',desc:'Aplikasi pencatatan keuangan pribadi versi Android. Visual pada kartu ini hanya ilustrasi antarmuka.'},
  {name:'OrbitControl',type:'Android / Networking',image:'orbit-control.png',repo:'OrbitControl',desc:'Proyek alat bantu manajemen perangkat modem. Ilustrasi status koneksi di sini bukan tangkapan layar aplikasi asli.'},
  {name:'DexBridge',type:'Desktop Utility',image:'dex-bridge.png',repo:'DexBridge',desc:'Repositori pengembangan alat bantu desktop. Visual mockup digunakan sebagai placeholder.'},
  {name:'SoundRIP',type:'Web / Multimedia',image:'sound-rip.png',repo:'SoundRIP',desc:'Proyek alat bantu konversi video musik menjadi berkas audio.'},
  {name:'MyDataset',type:'Data Tool',image:'my-dataset.png',repo:'MyDataset',desc:'Proyek pengumpulan data berbasis web. Tabel yang terlihat pada mockup hanyalah contoh.'},
  {name:'SadarBudget Web',type:'Web Application',image:'project-03.svg',repo:'SadarBudget-PHP',desc:'Versi web dari aplikasi pencatatan keuangan pribadi SadarBudget.'},
  {name:'Savings Goals',type:'Concept / SadarBudget',image:'project-07.svg',repo:'SadarBudget-Android',desc:'Eksplorasi visual dummy untuk area tabungan pada SadarBudget. Bukan proyek atau fitur baru yang telah diverifikasi.'},
  {name:'Network Insights',type:'Concept / OrbitControl',image:'project-08.svg',repo:'OrbitControl',desc:'Eksplorasi visual dummy panel jaringan untuk konteks OrbitControl. Bukan tangkapan layar produk asli.'},
  {name:'Monthly Reports',type:'Concept / SadarBudget',image:'project-09.svg',repo:'SadarBudget-PHP',desc:'Eksplorasi visual dummy untuk ringkasan laporan SadarBudget. Bukan bukti implementasi fitur.'}
];
const grid=document.getElementById('projectGrid');
const svgIcon = (name) => `<svg aria-hidden="true"><use href="#icon-${name}"/></svg>`;
projects.forEach((p,i)=>{
  const item=document.createElement('button'); item.className='project-card';item.type='button';item.setAttribute('aria-label',`Lihat detail ${p.name}`);item.dataset.index=i;
  item.innerHTML=`<span class="project-thumb"><img src="assets/${p.image}" alt="Visual dummy untuk ${p.name}" width="1200" height="820" loading="lazy"><span class="project-hover-icon">${svgIcon('ext')}</span></span><span class="project-text"><span class="project-info"><strong>${p.name}</strong><small>${p.type}</small></span><span class="project-number">${String(i+1).padStart(2,'0')} / 09</span></span>`;
  grid.appendChild(item);
});
const dialog=document.getElementById('projectDialog');
const closeDialog=document.getElementById('closeDialog');
grid.addEventListener('click',e=>{
  const card=e.target.closest('.project-card');if(!card)return;
  const p=projects[Number(card.dataset.index)];
  document.getElementById('dialogImage').src=`assets/${p.image}`;
  document.getElementById('dialogImage').alt=`Visual dummy ${p.name}`;
  document.getElementById('dialogTitle').textContent=p.name;
  document.getElementById('dialogTag').textContent=p.type;
  document.getElementById('dialogDescription').textContent=p.desc;
  document.getElementById('dialogLink').href=`https://github.com/andros38/${p.repo}`;
  dialog.showModal();
});
closeDialog.addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

const menuPanel=document.getElementById('menuPanel');
const menuBackdrop=document.getElementById('menuBackdrop');
const trigger=document.getElementById('menuTrigger');
const menuClose=document.getElementById('closeMenu');
let returnFocus=null;
function setMenu(open){
  if(open){returnFocus=document.activeElement;menuBackdrop.hidden=false;menuPanel.inert=false;menuPanel.classList.add('is-open');menuPanel.setAttribute('aria-hidden','false');trigger.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');menuClose.focus();}
  else{menuPanel.classList.remove('is-open');menuPanel.setAttribute('aria-hidden','true');menuPanel.inert=true;trigger.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');menuBackdrop.hidden=true;if(returnFocus?.focus)returnFocus.focus();}
}
trigger.addEventListener('click',()=>setMenu(true));
menuClose.addEventListener('click',()=>setMenu(false));
menuBackdrop.addEventListener('click',()=>setMenu(false));
window.addEventListener('keydown',e=>{if(e.key==='Escape' && menuPanel.classList.contains('is-open'))setMenu(false);if(e.key==='Tab'&&menuPanel.classList.contains('is-open')){const focusable=[...menuPanel.querySelectorAll('button:not([disabled]),a[href]')];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});

const themeBtn=document.getElementById('themeBtn');
function applyTheme(t){document.documentElement.dataset.theme=t;themeBtn.setAttribute('aria-label', t==='dark'?'Aktifkan tema terang':'Aktifkan tema gelap');try{localStorage.setItem('andros_theme',t)}catch{}}
let storedTheme='light';try{storedTheme=localStorage.getItem('andros_theme')||'light'}catch{};applyTheme(storedTheme==='dark'?'dark':'light');
themeBtn.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));

let toastTimer;function showToast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),3700)}
function linkedinNotice(){showToast('Tautan LinkedIn belum diatur. Ganti URL-nya pada script.js setelah tersedia.');}
document.getElementById('linkedinContact').addEventListener('click',linkedinNotice);
document.getElementById('linkedinMenu').addEventListener('click',linkedinNotice);
document.getElementById('copyrightYear').textContent=new Date().getFullYear();

// One-page navigation: the Home target is on the HERO, not the sticky header.
// The sticky header is always on screen, so it cannot be used as a reliable
// anchor/scroll-spy target.
const header = document.querySelector('.site-header');
const sectionIds = ['home', 'projects', 'about', 'contact'];
const trackedSections = sectionIds.map(id => document.getElementById(id));
const sectionLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"], .menu-panel nav a[href^="#"]')];
const menuButton = document.getElementById('menuTrigger');
let activeSection = '';

function setActiveSection(id) {
  if (!sectionIds.includes(id)) return;
  activeSection = id;
  sectionLinks.forEach(link => {
    const selected = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  menuButton.setAttribute('aria-label', `Buka menu, bagian aktif: ${id.charAt(0).toUpperCase() + id.slice(1)}`);
}

function getSectionAtViewport() {
  const documentHeight = document.documentElement.scrollHeight;
  const atBottom = window.scrollY + window.innerHeight >= documentHeight - 6;
  if (atBottom) return 'contact';
  // Sample a line just below the sticky navbar to avoid an "active" marker
  // jumping as the next section barely peeks in at the bottom of the viewport.
  const marker = window.scrollY + header.getBoundingClientRect().height +
    Math.min(window.innerHeight * .25, 200);
  let found = 'home';
  trackedSections.forEach(section => {
    if (section.getBoundingClientRect().top + window.scrollY <= marker) {
      found = section.id;
    }
  });
  return found;
}

let scrollTicking = false;
function updateSectionOnScroll() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    setActiveSection(getSectionAtViewport());
    scrollTicking = false;
  });
}

// Intercept in-page section anchors so that Home reliably goes all the way
// to scrollY=0; compensate for the sticky header on all other sections.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  const id = link.getAttribute('href').slice(1);
  if (!sectionIds.includes(id)) return;
  link.addEventListener('click', event => {
    event.preventDefault();
    if (menuPanel.classList.contains('is-open')) setMenu(false);
    const section = document.getElementById(id);
    const top = id === 'home' ? 0 : Math.max(0, Math.round(
      section.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 16
    ));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reducedMotion ? 'instant' : 'smooth' });
    setActiveSection(id);
    try { history.replaceState(null, '', `#${id}`); } catch (_) { /* local file browsing */ }
  });
});

window.addEventListener('scroll', updateSectionOnScroll, { passive: true });
window.addEventListener('resize', updateSectionOnScroll, { passive: true });
window.addEventListener('hashchange', updateSectionOnScroll);
setActiveSection('home');
requestAnimationFrame(updateSectionOnScroll);
window.addEventListener('load', updateSectionOnScroll);


// On-scroll entrances are progressive enhancements: content stays readable
// without JS, IntersectionObserver, or when reduced motion is requested.
(function initScrollReveal() {
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealTargets = [
    ...document.querySelectorAll(
      '.selected-section > .section-pretitle, ' +
      '.selected-section > .selected-heading, ' +
      '.project-card, ' +
      '.gallery-footnote, ' +
      '.about-left, .about-right, ' +
      '.contact-section > .section-pretitle, .contact-layout'
    )
  ];
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      revealObserver.unobserve(target); // Animate once, no annoying replay on scroll up.
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  revealTargets.forEach((node) => {
    if (node.matches('.project-card')) {
      const column = Number(node.dataset.index) % 3;
      node.style.setProperty('--reveal-delay', `${column * 95}ms`);
    }
    node.classList.add('scroll-reveal');
    revealObserver.observe(node);
  });
})();
