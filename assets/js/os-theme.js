'use strict';

/* ═══════════════════════════════════════════════════════════════
   NICOLE TEO — OS THEME JAVASCRIPT
   Extracted from index_os_code.html + URL routing for Option B
═══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════
   AUDIO
══════════════════════════════════════════════════ */
let AC=null, musicGain=null, musicOn=true, musicStarted=false;

function getAC() {
  if (!AC) AC = new (window.AudioContext||window.webkitAudioContext)();
  return AC;
}
function tone(freq,dur,vol=0.05,type='sine') {
  try {
    const c=getAC(),o=c.createOscillator(),g=c.createGain();
    o.type=type; o.frequency.value=freq;
    g.gain.setValueAtTime(vol,c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+dur);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime+dur);
  } catch(e){}
}
function sndClick() {
  try {
    const c=getAC();
    [880,1108].forEach((f,i)=>setTimeout(()=>{
      const o=c.createOscillator(),g=c.createGain();
      o.type='sine'; o.frequency.value=f;
      g.gain.setValueAtTime(0.06,c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+.12);
      o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime+.12);
    },i*55));
  } catch(e){}
}
function sndHover() {
  try {
    const c=getAC(),o=c.createOscillator(),g=c.createGain();
    o.type='triangle'; o.frequency.value=660;
    g.gain.setValueAtTime(0.04,c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+.08);
    o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime+.08);
  } catch(e){}
}
function sndConfirm() {
  try {
    const c=getAC();
    [523,659,784].forEach((f,i)=>setTimeout(()=>{
      const o=c.createOscillator(),g=c.createGain();
      o.type='sine'; o.frequency.value=f;
      g.gain.setValueAtTime(0.07,c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+.18);
      o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime+.18);
    },i*80));
  } catch(e){}
}
function sndOpen()  { tone(440,.06,.04); setTimeout(()=>tone(554,.1,.04),60); }
function sndClose() { tone(330,.08,.03,'triangle'); }
let lastSc=0;
function scrollSnd() { const n=Date.now(); if(n-lastSc>700){tone(660,.05,.02);lastSc=n;} }

/* OS click sound on every interaction */
document.addEventListener('click', ()=>{ try{getAC();}catch(e){} });

/* Ambient music */
function createReverb(ctx) {
  const conv=ctx.createConvolver();
  const len=ctx.sampleRate*2.5;
  const buf=ctx.createBuffer(2,len,ctx.sampleRate);
  for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.2);}
  conv.buffer=buf; return conv;
}

function startMusic() {
  if(musicStarted) return; musicStarted=true;
  try {
    const ctx=getAC();
    musicGain=ctx.createGain();
    musicGain.gain.setValueAtTime(0,ctx.currentTime);
    musicGain.gain.linearRampToValueAtTime(musicOn?0.28:0,ctx.currentTime+3);
    musicGain.connect(ctx.destination);
    const rev=createReverb(ctx), rg=ctx.createGain();
    rg.gain.value=0.45; rev.connect(rg); rg.connect(musicGain);

    const chords=[
      [146.83,174.61,220,261.63],
      [110,130.81,164.81,220],
      [116.54,146.83,174.61,233.08],
      [98,116.54,146.83,174.61],
    ];
    const barLen=7;
    const mel=[[293.66,0,1.8],[349.23,2.2,1],[329.63,4,1.5],[293.66,7,2.2],[261.63,10,1],[293.66,12,1.5],[349.23,14.5,1.2],[392,16.5,3],[349.23,21,1.5],[293.66,23,2.5]];

    let loopT=ctx.currentTime+0.5;
    const doLoop=()=>{
      chords.forEach((chord,ci)=>{
        const cStart=loopT+ci*barLen;
        chord.forEach(freq=>{
          const o=ctx.createOscillator(),g=ctx.createGain();
          o.type='sine'; o.frequency.value=freq; o.detune.value=(Math.random()-.5)*6;
          g.gain.setValueAtTime(0,cStart);
          g.gain.linearRampToValueAtTime(0.055,cStart+1.8);
          g.gain.setValueAtTime(0.055,cStart+barLen-1.8);
          g.gain.linearRampToValueAtTime(0,cStart+barLen);
          o.connect(g); g.connect(rev); o.start(cStart); o.stop(cStart+barLen+.2);
        });
      });
      mel.forEach(([freq,time,dur])=>{
        const o=ctx.createOscillator(),g=c.createGain();
        o.type='triangle'; o.frequency.value=freq;
        const t=loopT+time;
        g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.04,t+.08); g.gain.exponentialRampToValueAtTime(0.001,t+dur);
        o.connect(g); g.connect(rev); o.start(t); o.stop(t+dur+.2);
      });
      loopT+=chords.length*barLen;
      setTimeout(doLoop,(chords.length*barLen-2)*1000);
    };
    doLoop();
  } catch(e){ console.warn('Music error',e); }
}

function toggleMusic(e) {
  e&&e.stopPropagation();
  musicOn=!musicOn;
  document.getElementById('music-btn').textContent=musicOn?'♪ MUSIC ON':'♪ MUSIC OFF';
  if(musicGain){const ctx=getAC();musicGain.gain.cancelScheduledValues(ctx.currentTime);musicGain.gain.linearRampToValueAtTime(musicOn?0.28:0,ctx.currentTime+0.8);}
  if(musicOn&&!musicStarted) startMusic();
}

/* ══════════════════════════════════════════════════
   GAME ENGINE
══════════════════════════════════════════════════ */
const STORY={
  n1: {type:'narr',text:'Somewhere between a lavender field and the edge of a dream...',next:'n2'},
  n2: {type:'narr',text:'A stone villa at the edge of Provence catches the last light of afternoon.',next:'n3'},
  n3: {type:'narr',text:'...and someone is waiting.',next:'d1',char:true},
  d1: {type:'talk',speaker:'Nicole',text:"Ah. You actually found this place.",next:'d2',char:true},
  d2: {type:'talk',speaker:'Nicole',text:"Not many do.",next:'c1',char:true},
  c1: {type:'choice',speaker:'Nicole',text:"Before we go further — who are you?",char:true,choices:[
    {text:'A marketer & strategist',next:'r1a'},
    {text:'A founder or builder',next:'r1b'},
    {text:'A recruiter',next:'r1c'},
    {text:'Just exploring',next:'r1d'},
  ]},
  r1a:{type:'talk',speaker:'Nicole',text:"A kindred spirit. Stories and strategy — my language too.",next:'c2',char:true},
  r1b:{type:'talk',speaker:'Nicole',text:"A builder. You know the gap between vision and execution.",next:'c2',char:true},
  r1c:{type:'talk',speaker:'Nicole',text:"Direct and purposeful. You'll find what you need here.",next:'c2',char:true},
  r1d:{type:'talk',speaker:'Nicole',text:"The best kind of visitor. Curiosity opens every door.",next:'c2',char:true},
  c2: {type:'choice',speaker:'Nicole',text:"And what brings you here today?",char:true,choices:[
    {text:'Looking to collaborate',next:'r2a'},
    {text:'Marketing help for a project',next:'r2b'},
    {text:'Inspiration & ideas',next:'r2c'},
    {text:'No particular reason',next:'r2d'},
  ]},
  r2a:{type:'talk',speaker:'Nicole',text:"Collaboration is where the real work happens.",next:'fin',char:true},
  r2b:{type:'talk',speaker:'Nicole',text:"Good. Let me show you what I've been building.",next:'fin',char:true},
  r2c:{type:'talk',speaker:'Nicole',text:"Then I hope something here is worth taking back with you.",next:'fin',char:true},
  r2d:{type:'talk',speaker:'Nicole',text:"The best journeys rarely have a destination at the start.",next:'fin',char:true},
  fin:{type:'talk',speaker:'Nicole',text:"Welcome to my world.",next:'END',char:true},
};

let currentBeat=null, typeTimer=null, typeDone=false, introActive=true, introStarted=false;

const $dw=()=>document.getElementById('dialogue-wrap');
const $dt=()=>document.getElementById('dialogue-text');
const $arr=()=>document.getElementById('dialogue-arrow');
const $stag=()=>document.getElementById('speaker-tag');
const $cm=()=>document.getElementById('choice-menu');
const $char=()=>document.getElementById('char-sprite');
const $ui=()=>document.getElementById('ui-top');
const $fade=()=>document.getElementById('scene-fade');

function typewrite(el,text,onDone) {
  el.textContent=''; el.classList.remove('done'); let i=0;
  clearInterval(typeTimer);
  typeTimer=setInterval(()=>{
    el.textContent+=text[i]; i++;
    if(i>=text.length){clearInterval(typeTimer);el.classList.add('done');typeDone=true;if(onDone)onDone();}
  },32);
}

function showBeat(id) {
  if(id==='END'){endIntro();return;}
  currentBeat=STORY[id]; typeDone=false;
  $cm().classList.remove('show'); $cm().innerHTML='';
  $arr().classList.remove('show'); $stag().classList.remove('show');
  if(currentBeat.char) $char().classList.add('show');
  else $char().classList.remove('show');
  if(currentBeat.speaker){$stag().textContent=currentBeat.speaker;$stag().classList.add('show');}
  $dw().classList.add('show');
  typewrite($dt(),currentBeat.text,()=>{
    if(currentBeat.type!=='choice') $arr().classList.add('show');
    if(currentBeat.type==='choice') showChoices(currentBeat.choices);
  });
}

function showChoices(choices) {
  const cm=$cm(); cm.innerHTML='';
  choices.forEach(ch=>{
    const div=document.createElement('div');
    div.className='ci';
    div.innerHTML=`<span class="ci-cur">▶</span><span>${ch.text}</span>`;
    div.addEventListener('mouseenter',sndHover);
    div.addEventListener('click',e=>{
      e.stopPropagation(); sndConfirm();
      cm.classList.remove('show'); showBeat(ch.next);
    });
    cm.appendChild(div);
  });
  cm.classList.add('show');
}

function advanceStory() {
  if(!introActive||!currentBeat) return;
  if(!typeDone){
    clearInterval(typeTimer);
    $dt().textContent=currentBeat.text; $dt().classList.add('done'); typeDone=true;
    if(currentBeat.type!=='choice') $arr().classList.add('show');
    if(currentBeat.type==='choice') showChoices(currentBeat.choices);
    return;
  }
  if(currentBeat.type==='choice') return;
  sndClick();
  if(currentBeat.next) showBeat(currentBeat.next);
}

function startIntro() {
  if(introStarted) return; introStarted=true;
  startMusic();
  setTimeout(()=>$fade().classList.add('clear'),100);
  setTimeout(()=>$ui().classList.add('show'),2400);
  setTimeout(()=>showBeat('n1'),2800);
}

function endIntro() {
  introActive=false;
  if(musicGain){const ctx=getAC();musicGain.gain.linearRampToValueAtTime(0,ctx.currentTime+2);}
  const tc=document.getElementById('trans-cover');
  tc.classList.add('in');
  setTimeout(()=>{
    document.getElementById('game-intro').style.display='none';
    tc.classList.remove('in');
    setTimeout(()=>openWin('w-about'),400);
  },1800);
}

function skipIntro(e) { e&&e.stopPropagation(); endIntro(); }

document.getElementById('game-intro').addEventListener('click',()=>{
  if(!introStarted){startIntro();return;}
  advanceStory();
});
document.addEventListener('keydown',e=>{
  if(e.code==='Space'&&introActive){e.preventDefault();if(!introStarted){startIntro();return;}advanceStory();}
});

/* ══════════════════════════════════════════════════
   OS WINDOW SYSTEM
══════════════════════════════════════════════════ */
let topZ=200;

function focusWin(id) {
  document.querySelectorAll('.win').forEach(w=>w.classList.remove('foc'));
  document.querySelectorAll('.tb-wbtn').forEach(b=>b.classList.remove('act'));
  const w=document.getElementById(id);
  w.classList.add('foc'); w.style.zIndex=++topZ;
  const tb=document.getElementById('tb-'+id);
  if(tb) tb.classList.add('act');
}
function openWin(id) {
  const w=document.getElementById(id),tb=document.getElementById('tb-'+id);
  if(!w.classList.contains('open')){w.classList.add('open');sndOpen();}
  focusWin(id); if(tb) tb.classList.add('vis');
}
function closeWin(id) {
  const w=document.getElementById(id),tb=document.getElementById('tb-'+id);
  w.classList.remove('open');
  if(tb){tb.classList.remove('vis','act');} sndClose();
}
function minimizeWin(id) {
  document.getElementById(id).classList.remove('open');
  const tb=document.getElementById('tb-'+id);
  if(tb){tb.classList.add('vis');tb.classList.remove('act');}
}
function maxWin(id) {
  const w=document.getElementById(id);
  if(w.dataset.prev){
    const s=JSON.parse(w.dataset.prev);
    Object.assign(w.style,{left:s.l,top:s.t,width:s.w,height:s.h});
    delete w.dataset.prev;
  } else {
    w.dataset.prev=JSON.stringify({l:w.style.left,t:w.style.top,w:w.style.width,h:w.style.height});
    Object.assign(w.style,{left:'0',top:'0',width:'100vw',height:'calc(100vh - 40px)'});
  }
  focusWin(id);
}
function tbClick(id) {
  const w=document.getElementById(id);
  if(w.classList.contains('open')&&w.classList.contains('foc')) minimizeWin(id);
  else openWin(id);
}
document.querySelectorAll('.win').forEach(w=>{ w.addEventListener('mousedown',()=>focusWin(w.id)); });

/* Drag */
document.querySelectorAll('.wtb').forEach(bar=>{
  const id=bar.dataset.win; let drag=false,sx,sy,sl,st;
  bar.addEventListener('mousedown',e=>{
    if(e.target.classList.contains('wbtn')) return;
    const w=document.getElementById(id);
    drag=true; sx=e.clientX; sy=e.clientY; sl=w.offsetLeft; st=w.offsetTop;
    focusWin(id); e.preventDefault();
  });
  document.addEventListener('mousemove',e=>{ if(!drag) return; const w=document.getElementById(id); w.style.left=Math.max(0,sl+e.clientX-sx)+'px'; w.style.top=Math.max(0,st+e.clientY-sy)+'px'; });
  document.addEventListener('mouseup',()=>{ drag=false; });
});

/* Resize */
document.querySelectorAll('.wgrip').forEach(grip=>{
  const win=grip.closest('.win'); let res=false,sx,sy,sw,sh;
  grip.addEventListener('mousedown',e=>{ res=true;sx=e.clientX;sy=e.clientY;sw=win.offsetWidth;sh=win.offsetHeight;e.preventDefault();e.stopPropagation(); });
  document.addEventListener('mousemove',e=>{ if(!res) return; win.style.width=Math.max(280,sw+e.clientX-sx)+'px'; win.style.height=Math.max(160,sh+e.clientY-sy)+'px'; });
  document.addEventListener('mouseup',()=>{ res=false; });
});

/* Library tabs */
function libTab(name) {
  document.querySelectorAll('.lib-tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.lib-panel').forEach(p=>p.classList.remove('on'));
  document.getElementById('lib-'+name).classList.add('on');
  document.querySelectorAll('.lib-tab').forEach(t=>{ if(t.getAttribute('onclick').includes(name)) t.classList.add('on'); });
  tone(440,.07,.03);
}

/* Clock */
function tick() {
  const d=new Date();
  document.getElementById('clock').textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
}
tick(); setInterval(tick,10000);

/* Icon select */
document.querySelectorAll('.icon').forEach(ic=>{
  ic.addEventListener('click',()=>{ document.querySelectorAll('.icon').forEach(i=>i.classList.remove('sel')); ic.classList.add('sel'); });
});

/* ══════════════════════════════════════════════════
   OPTION B: URL ROUTING & DEEP LINKING
══════════════════════════════════════════════════ */

/**
 * Handle URL hash routing for desktop windows
 * e.g., nicothyun.github.io#w-blog opens Blog window on load
 */
function handleHashRoute() {
  const hash = window.location.hash;
  if (!hash) return;

  // Hash format: #w-window-id or #w-blog
  const winId = hash.replace('#', '');
  const win = document.getElementById(winId);

  if (win && win.classList.contains('win')) {
    // Skip intro if deep-linking to a window
    if (introActive && !introStarted) {
      skipIntro();
    }
    // Small delay to ensure desktop is visible
    setTimeout(() => openWin(winId), 500);
  }
}

// Handle hash changes while on the page
window.addEventListener('hashchange', handleHashRoute);

// Check hash on initial load (after intro or if skipping)
document.addEventListener('DOMContentLoaded', () => {
  // If URL has a hash, skip intro and open that window
  if (window.location.hash && window.location.hash.startsWith('#w-')) {
    // Override the default intro behavior
    const originalEndIntro = endIntro;
    endIntro = function() {
      introActive = false;
      if(musicGain){const ctx=getAC();musicGain.gain.linearRampToValueAtTime(0,ctx.currentTime+2);}
      const tc=document.getElementById('trans-cover');
      tc.classList.add('in');
      setTimeout(()=>{
        document.getElementById('game-intro').style.display='none';
        tc.classList.remove('in');
        // Open the window from hash instead of default w-about
        setTimeout(()=>{
          const hash = window.location.hash;
          if (hash) {
            const winId = hash.replace('#', '');
            const win = document.getElementById(winId);
            if (win) openWin(winId);
            else openWin('w-about');
          } else {
            openWin('w-about');
          }
        }, 400);
      }, 1800);
    };
    // Auto-skip intro when deep-linking
    setTimeout(() => {
      if (introActive) skipIntro();
    }, 100);
  }
});

/**
 * Optional: Add browser history support for window opens
 * This makes the back button work between windows
 */
function openWinWithHistory(id) {
  openWin(id);
  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, null, '#' + id);
  }
}

// Override the global openWin for history tracking
const originalOpenWin = openWin;
openWin = function(id) {
  originalOpenWin(id);
  if (window.history && window.history.replaceState) {
    window.history.replaceState({window: id}, null, '#' + id);
  }
};
