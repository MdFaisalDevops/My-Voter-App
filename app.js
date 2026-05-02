// ── State ──────────────────────────────────────────────────────────
let currentPage='home', fcIndex=0, fcFilter='All', fcKnown=new Set(), quizIndex=0, quizScore=0, quizAnswered=false, journeyStep=0, darkMode=true;

// ── Router ──────────────────────────────────────────────────────────
function goPage(p){
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(el=>el.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  document.querySelector(`[data-page="${p}"]`)?.classList.add('active');
  currentPage=p;
  document.getElementById('sidebar').classList.remove('open');
  renders[p]?.();
}

const renders={
  chat:renderChat, flashcards:renderFlashcards, quiz:renderQuiz,
  journey:renderJourney, timeline:renderTimeline, faq:renderFaq,
  helpline:renderHelpline, content:renderContent
};

// ── NAV EVENTS ───────────────────────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(a=>{
  a.addEventListener('click',e=>{e.preventDefault();goPage(a.dataset.page);});
});
document.getElementById('hamburger').addEventListener('click',()=>{
  document.getElementById('sidebar').classList.toggle('open');
});
document.getElementById('btnA11y').addEventListener('click',()=>{
  const p=document.getElementById('a11yPanel');
  p.style.display=p.style.display==='none'?'block':'none';
});
document.getElementById('themeToggle').addEventListener('click',()=>{
  darkMode=!darkMode;
  document.body.style.background=darkMode?'':'#f0f2f5';
  document.getElementById('themeToggle').textContent=darkMode?'🌙':'☀️';
});

// ── ACCESSIBILITY ────────────────────────────────────────────────────
function setFont(s){document.body.className=document.body.className.replace(/font-\w+/,'');document.body.classList.add('font-'+s);}
function toggleContrast(){document.body.classList.toggle('high-contrast');}

// ── CHAT ─────────────────────────────────────────────────────────────
let chatHistory=[];
function renderChat(){
  const el=document.getElementById('page-chat');
  el.innerHTML=`
  <div class="page-header"><h2>🤖 AI Election Assistant</h2><p>Ask anything about India's election process</p></div>
  <div class="chat-wrap">
    <div class="chat-chips" id="chatChips">
      <span class="chip" onclick="askChip('How to register as a voter?')">📝 Voter Registration</span>
      <span class="chip" onclick="askChip('Explain the election process step by step')">🗳️ Election Process</span>
      <span class="chip" onclick="askChip('What is EVM and how does it work?')">⚡ About EVM</span>
      <span class="chip" onclick="askChip('What is NOTA?')">🚫 NOTA</span>
      <span class="chip" onclick="askChip('What is Model Code of Conduct?')">📋 MCC</span>
      <span class="chip" onclick="askChip('What is VVPAT?')">🧾 VVPAT</span>
      <span class="chip" onclick="askChip('Voter helpline numbers')">📞 Helplines</span>
      <span class="chip" onclick="askChip('Voter eligibility criteria')">✅ Eligibility</span>
    </div>
    <div class="chat-msgs" id="chatMsgs">
      <div class="msg bot"><div class="msg-avatar">🤖</div><div class="msg-bubble">Namaste! 🙏 I'm your <strong>India Election Assistant</strong>.<br/><br/>I can help you with:<br/>• Voter registration & EPIC card<br/>• EVM & VVPAT explained<br/>• Election timeline & process<br/>• MCC, NOTA, polling day guide<br/>• Helpline numbers<br/><br/>What would you like to know?</div></div>
    </div>
    <div class="chat-input-row">
      <textarea class="chat-input" id="chatInput" rows="1" placeholder="Ask about elections, registration, voting..." onkeydown="handleChatKey(event)"></textarea>
      <button class="chat-send" onclick="sendChat()">Send ➤</button>
    </div>
  </div>`;
}

function handleChatKey(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChat();}}
function askChip(q){document.getElementById('chatInput').value=q;sendChat();}

function sendChat(){
  const input=document.getElementById('chatInput');
  const q=input.value.trim();
  if(!q) return;
  input.value='';
  addMsg('user',q);
  const typing=addTyping();
  setTimeout(()=>{
    typing.remove();
    addMsg('bot',getResponse(q));
  },800+Math.random()*600);
}

function addMsg(role,text){
  const msgs=document.getElementById('chatMsgs');
  const div=document.createElement('div');
  div.className=`msg ${role}`;
  const formatted=text.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br/>');
  div.innerHTML=`<div class="msg-avatar">${role==='user'?'👤':'🤖'}</div><div class="msg-bubble">${formatted}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
  return div;
}

function addTyping(){
  const msgs=document.getElementById('chatMsgs');
  const div=document.createElement('div');
  div.className='msg bot';
  div.innerHTML=`<div class="msg-avatar">🤖</div><div class="msg-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
  return div;
}

function getResponse(q){
  const ql=q.toLowerCase();
  for(const [key,val] of Object.entries(CHAT_RESPONSES)){
    if(ql.includes(key)) return val;
  }
  // keyword matching
  if(ql.includes('register')||ql.includes('enrollment')) return CHAT_RESPONSES['how to register'];
  if(ql.includes('evm')||ql.includes('machine')) return CHAT_RESPONSES['evm'];
  if(ql.includes('nota')) return CHAT_RESPONSES['nota'];
  if(ql.includes('mcc')||ql.includes('code of conduct')) return CHAT_RESPONSES['mcc'];
  if(ql.includes('vvpat')) return CHAT_RESPONSES['vvpat'];
  if(ql.includes('helpline')||ql.includes('number')||ql.includes('contact')) return CHAT_RESPONSES['helpline'];
  if(ql.includes('process')||ql.includes('step')||ql.includes('how does election')) return CHAT_RESPONSES['election process'];
  if(ql.includes('postal')) return CHAT_RESPONSES['postal ballot'];
  if(ql.includes('count')||ql.includes('result')) return CHAT_RESPONSES['counting'];
  if(ql.includes('eligib')||ql.includes('who can vote')) return CHAT_RESPONSES['eligibility'];
  if(ql.includes('lok sabha')||ql.includes('parliament')) return CHAT_RESPONSES['lok sabha'];
  if(ql.includes('epic')||ql.includes('voter id')) return CHAT_RESPONSES['voter id'];
  return `Great question! Here's what I know about **"${q}"**:\n\nThis relates to India's electoral process governed by the **Election Commission of India (ECI)**.\n\n📌 Try asking about:\n• "How to register as voter"\n• "What is EVM"\n• "Election process steps"\n• "What is NOTA"\n• "Voter helpline numbers"\n\nOr call **1950** for live assistance!`;
}

// ── FLASHCARDS ────────────────────────────────────────────────────────
function renderFlashcards(){
  const cats=['All',...new Set(FLASHCARDS.map(f=>f.cat))];
  const filtered=fcFilter==='All'?FLASHCARDS:FLASHCARDS.filter(f=>f.cat===fcFilter);
  if(fcIndex>=filtered.length) fcIndex=0;
  const card=filtered[fcIndex];
  const pct=Math.round((fcKnown.size/FLASHCARDS.length)*100);
  document.getElementById('page-flashcards').innerHTML=`
  <div class="page-header"><h2>📚 Flashcards</h2><p>Click card to reveal answer • Track your progress</p></div>
  <div class="fc-controls">
    ${cats.map(c=>`<button class="filter-btn ${fcFilter===c?'active':''}" onclick="setFcFilter('${c}')">${c}</button>`).join('')}
    <span style="margin-left:auto;color:var(--text2);font-size:13px">✅ Known: ${fcKnown.size}/${FLASHCARDS.length}</span>
  </div>
  <div class="fc-progress-bar"><div class="fc-progress-fill" style="width:${pct}%"></div></div>
  <br/>
  <div class="fc-stage">
    <div class="card-counter">${fcIndex+1} / ${filtered.length} — ${card.cat}</div>
    <div class="flip-card" id="flipCard" onclick="this.classList.toggle('flipped')">
      <div class="flip-inner">
        <div class="flip-front"><div class="card-label">Question</div><div class="card-q">${card.q}</div><div style="margin-top:12px;font-size:12px;color:var(--text2)">Click to reveal answer</div></div>
        <div class="flip-back"><div class="card-label">Answer</div><div class="card-a">${card.a}</div></div>
      </div>
    </div>
    <div class="fc-btns">
      <button class="btn-learning" onclick="fcNav(-1)">⬅ Previous</button>
      <button class="btn-know" onclick="markKnown(${fcIndex})">✅ I Know This</button>
      <button class="btn-learning" onclick="fcNav(1)">Next ➡</button>
    </div>
  </div>`;
}

function setFcFilter(f){fcFilter=f;fcIndex=0;renderFlashcards();}
function fcNav(d){
  const filtered=fcFilter==='All'?FLASHCARDS:FLASHCARDS.filter(f=>f.cat===fcFilter);
  fcIndex=(fcIndex+d+filtered.length)%filtered.length;
  renderFlashcards();
}
function markKnown(i){fcKnown.add(i);fcNav(1);}

// ── QUIZ ──────────────────────────────────────────────────────────────
function renderQuiz(){
  if(quizIndex>=QUIZ.length){renderQuizResult();return;}
  const q=QUIZ[quizIndex];
  const pct=Math.round((quizIndex/QUIZ.length)*100);
  document.getElementById('page-quiz').innerHTML=`
  <div class="page-header"><h2>🧠 Election Quiz</h2><p>Test your knowledge of India's electoral system</p></div>
  <div class="quiz-wrap">
    <div class="quiz-header"><span style="color:var(--text2);font-size:14px">Question ${quizIndex+1} of ${QUIZ.length}</span><span class="quiz-score-badge">Score: ${quizScore}</span></div>
    <div class="quiz-prog"><div class="quiz-prog-fill" style="width:${pct}%"></div></div>
    <div class="quiz-cat">${q.cat}</div>
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-opts">${q.opts.map((o,i)=>`<button class="opt-btn" id="opt${i}" onclick="answerQuiz(${i})">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}</div>
    <div class="explanation" id="explanation">💡 ${q.exp}</div>
    <button class="btn-primary" id="nextBtn" style="display:none" onclick="nextQuestion()">Next Question →</button>
  </div>`;
}

function answerQuiz(i){
  if(quizAnswered) return;
  quizAnswered=true;
  const q=QUIZ[quizIndex];
  document.querySelectorAll('.opt-btn').forEach((b,idx)=>{
    b.disabled=true;
    if(idx===q.ans) b.classList.add('correct');
    else if(idx===i) b.classList.add('wrong');
  });
  if(i===q.ans) quizScore++;
  document.getElementById('explanation').classList.add('show');
  document.getElementById('nextBtn').style.display='block';
}

function nextQuestion(){quizIndex++;quizAnswered=false;renderQuiz();}

function renderQuizResult(){
  const pct=Math.round((quizScore/QUIZ.length)*100);
  const grade=pct>=80?'🏆 Excellent!':pct>=60?'👍 Good Job!':'📚 Keep Learning!';
  const color=pct>=80?'var(--green)':pct>=60?'var(--accent3)':'var(--accent2)';
  document.getElementById('page-quiz').innerHTML=`
  <div class="page-header"><h2>🧠 Quiz Complete!</h2></div>
  <div class="quiz-wrap"><div class="quiz-result">
    <div class="result-score" style="color:${color}">${pct}%</div>
    <div class="result-label">${grade}</div>
    <div class="result-sub">You scored ${quizScore} out of ${QUIZ.length} questions</div>
    ${pct>=80?'<div class="result-badge" style="background:#00d4aa22;color:var(--green);border:1px solid var(--green)">🎓 Certificate of Achievement Earned!</div>':''}
    <br/><br/>
    <button class="btn-primary" onclick="quizIndex=0;quizScore=0;quizAnswered=false;renderQuiz()">🔄 Retry Quiz</button>
  </div></div>`;
}

// ── VOTER JOURNEY ─────────────────────────────────────────────────────
const STEPS=[
  {icon:'✅',title:'Check Eligibility',sub:'Confirm you meet all requirements',items:['Indian citizen aged 18+','Resident of the constituency','Not disqualified by any law','Have valid identity proof']},
  {icon:'🔍',title:'Find Your Booth',sub:'Locate your designated polling station',items:['Visit nvsp.in and search your name','Note your booth number and address','Check Voter Helpline App for directions','Call 1950 for assistance']},
  {icon:'📝',title:'Register to Vote',sub:'Fill Form 6 on NVSP portal',items:['Visit nvsp.in or Voter Helpline App','Fill Form 6 with personal details','Upload age proof + address proof + photo','Note reference number for tracking']},
  {icon:'🪪',title:'Get Your EPIC Card',sub:'Download or collect your Voter ID',items:['Download e-EPIC from nvsp.in','Or collect physical card from BLO','Check your name on electoral roll','Keep EPIC or alternate ID ready']},
  {icon:'📅',title:'Pre-Election Preparation',sub:'Get ready before polling day',items:['Read about candidates and parties','Check polling date and booth address','Know what ID documents to carry','Download cVIGIL app to report violations']},
  {icon:'🗳️',title:'Election Day — Voting',sub:'Step-by-step guide at the booth',items:['Arrive at booth with ID proof','Join the queue (PwD/senior priority queue available)','Get finger marked with indelible ink','Press your choice button on EVM','Verify VVPAT paper slip (7 seconds)']},
  {icon:'📊',title:'Results Day',sub:'Follow the counting process',items:['Counting begins on declared date','Watch live on ECI website or DD News','Results typically declared within one day','Winner issued election certificate (Form 20)']},
  {icon:'🏛️',title:'Government Formation',sub:'How the new government is formed',items:['Majority party/coalition leader invited by President','PM appointed and sworn in','Cabinet ministers nominated by PM','Parliament session convened']},
];

function renderJourney(){
  document.getElementById('page-journey').innerHTML=`
  <div class="page-header"><h2>🗺️ Voter Journey Wizard</h2><p>Your complete step-by-step guide to participating in Indian elections</p></div>
  <div class="journey-steps">${STEPS.map((s,i)=>`
  <div class="journey-step ${i<journeyStep?'completed':i===journeyStep?'active':''}" id="jstep${i}" onclick="toggleStep(${i})">
    <div class="step-dot">${i<journeyStep?'✅':s.icon}</div>
    <div class="step-body">
      <div class="step-title">Step ${i+1}: ${s.title}</div>
      <div class="step-sub">${s.sub}</div>
      <div class="step-details">
        <ul class="step-list">${s.items.map(it=>`<li>${it}</li>`).join('')}</ul>
        <div class="journey-nav">
          ${i>0?`<button class="btn-step btn-step-prev" onclick="event.stopPropagation();setStep(${i-1})">← Back</button>`:''}
          ${i<STEPS.length-1?`<button class="btn-step btn-step-next" onclick="event.stopPropagation();setStep(${i+1})">Mark Complete & Next →</button>`:'<span style="color:var(--green);font-weight:600">🎉 Journey Complete!</span>'}
        </div>
      </div>
    </div>
  </div>`).join('')}</div>`;
}

function toggleStep(i){journeyStep=i;renderJourney();}
function setStep(i){journeyStep=i;renderJourney();setTimeout(()=>document.getElementById('jstep'+i)?.scrollIntoView({behavior:'smooth',block:'center'}),100);}

// ── TIMELINE ──────────────────────────────────────────────────────────
const TL_EVENTS=[
  {date:'Day 1',icon:'📢',title:'ECI Announces Election Schedule',body:'The Election Commission issues notification declaring election dates. Model Code of Conduct activates immediately. Multiple phases may be announced for Lok Sabha elections.'},
  {date:'Day 1-7',icon:'📋',title:'Notification & Nomination Filing',body:'Returning Officers issue official notifications. Candidates file nominations with security deposits (₹25,000 for general, ₹12,500 for SC/ST in Lok Sabha).'},
  {date:'Day 8-9',icon:'🔍',title:'Scrutiny of Nominations',body:'Returning Officer examines all nominations for validity. Objections heard and decided. Invalid nominations rejected with documented reasons.'},
  {date:'Day 11',icon:'↩️',title:'Last Date for Withdrawal',body:'Candidates can withdraw nominations till 3 PM on this date. Final list of contesting candidates prepared. Symbols allotted to candidates.'},
  {date:'Day 12-19',icon:'📣',title:'Campaign Period',body:'Active campaigning by parties and candidates. ECI monitors MCC compliance. cVIGIL reports processed. Campaign ends 48 hours before polling (silent period).'},
  {date:'Day 20',icon:'🗳️',title:'Polling Day',body:'Voters cast votes at designated booths. Polling from 7 AM to 6 PM (varies by state). Mock poll conducted before opening. VVPAT verification available.'},
  {date:'Day 23',icon:'📊',title:'Counting of Votes',body:'EVMs moved from strong rooms to counting centres. Postal ballots counted first. EVM results tabulated round by round. VVPAT audit of 5 machines per constituency.'},
  {date:'Day 23 (Evening)',icon:'🏆',title:'Declaration of Results',body:'Returning Officer declares winner. Form 20 (election certificate) issued. Losing candidates can file election petition within 45 days in High Court.'},
  {date:'Post Results',icon:'🏛️',title:'Government Formation',body:"President invites majority party/coalition leader. PM sworn in. Cabinet formed. New Parliament/Assembly convenes for first session."},
];

function renderTimeline(){
  document.getElementById('page-timeline').innerHTML=`
  <div class="page-header"><h2>📅 Election Timeline</h2><p>Click any event to expand details</p></div>
  <div class="timeline">${TL_EVENTS.map((e,i)=>`
  <div class="tl-item">
    <div class="tl-dot" onclick="toggleTl(${i})">${e.icon}</div>
    <div class="tl-date">${e.date}</div>
    <div class="tl-title" onclick="toggleTl(${i})">${e.title}</div>
    <div class="tl-body" id="tl${i}">${e.body}</div>
  </div>`).join('')}</div>`;
}
function toggleTl(i){const el=document.getElementById('tl'+i);el.classList.toggle('show');}

// ── FAQ ───────────────────────────────────────────────────────────────
let faqFilter='All';
function renderFaq(){
  const cats=['All',...new Set(FAQS.map(f=>f.cat))];
  const filtered=faqFilter==='All'?FAQS:FAQS.filter(f=>f.cat===faqFilter);
  document.getElementById('page-faq').innerHTML=`
  <div class="page-header"><h2>❓ Frequently Asked Questions</h2><p>Search or browse ${FAQS.length}+ questions about Indian elections</p></div>
  <input class="faq-search" id="faqSearch" placeholder="🔍 Search FAQs..." oninput="filterFaq()" />
  <div class="faq-cats">${cats.map(c=>`<button class="filter-btn ${faqFilter===c?'active':''}" onclick="setFaqCat('${c}')">${c}</button>`).join('')}</div>
  <div class="faq-count" id="faqCount">${filtered.length} questions</div>
  <div id="faqList">${renderFaqItems(filtered)}</div>`;
}
function renderFaqItems(list){return list.map((f,i)=>`
  <div class="faq-item" id="fi${i}">
    <div class="faq-q" onclick="toggleFaq(${i})">${f.q}</div>
    <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
  </div>`).join('');}
function toggleFaq(i){document.getElementById('fi'+i)?.classList.toggle('open');}
function setFaqCat(c){faqFilter=c;renderFaq();}
function filterFaq(){
  const q=document.getElementById('faqSearch').value.toLowerCase();
  const filtered=FAQS.filter(f=>f.q.toLowerCase().includes(q)||f.a.toLowerCase().includes(q));
  document.getElementById('faqList').innerHTML=renderFaqItems(filtered);
  document.getElementById('faqCount').textContent=`${filtered.length} questions`;
}

// ── HELPLINE ──────────────────────────────────────────────────────────
function renderHelpline(){
  const states=Object.keys(HELPLINES.states).sort();
  document.getElementById('page-helpline').innerHTML=`
  <div class="page-header"><h2>📞 Election Helpline Directory</h2><p>All official contacts for Indian election assistance</p></div>
  <div class="helpline-hero"><div class="helpline-num">1950</div><div class="helpline-label">National Voter Helpline — Toll Free • 24/7 • Multilingual</div></div>
  <div class="helpline-grid">${HELPLINES.national.map(h=>`
    <div class="helpline-card"><div class="hc-title">${h.title}</div><div class="hc-num">${h.num}</div><div class="hc-desc">${h.desc}</div></div>`).join('')}</div>
  <div class="page-header"><h2>🗺️ State CEO Contacts</h2><p>Select your state to find your Chief Electoral Officer</p></div>
  <select class="state-select" onchange="showState(this.value)"><option value="">-- Select Your State / UT --</option>${states.map(s=>`<option value="${s}">${s}</option>`).join('')}</select>
  <div class="state-result" id="stateResult"></div>`;
}
function showState(s){
  if(!s) return;
  const d=HELPLINES.states[s];
  const el=document.getElementById('stateResult');
  el.className='state-result show';
  el.innerHTML=`<strong style="font-size:18px">📍 ${s}</strong><br/><br/>
  <div style="display:flex;gap:24px;flex-wrap:wrap">
    <div><div style="color:var(--text2);font-size:12px">Phone</div><div style="font-size:22px;font-weight:700;color:var(--accent)">${d.phone}</div></div>
    <div><div style="color:var(--text2);font-size:12px">Website</div><div style="font-size:16px;font-weight:600"><a href="https://${d.ceo}" target="_blank" style="color:var(--accent)">${d.ceo}</a></div></div>
  </div>`;
}

// ── CONTENT ───────────────────────────────────────────────────────────
let activeArticle='evm';
function renderContent(){
  const keys=Object.keys(ARTICLES);
  document.getElementById('page-content').innerHTML=`
  <div class="page-header"><h2>📋 Learn More</h2><p>In-depth articles on India's electoral system</p></div>
  <div class="content-tabs">${keys.map(k=>`<button class="ctab ${activeArticle===k?'active':''}" onclick="setArticle('${k}')">${ARTICLES[k].title}</button>`).join('')}</div>
  <div class="content-article" id="articleBody">${ARTICLES[activeArticle].content}</div>`;
}
function setArticle(k){activeArticle=k;renderContent();}

// ── INIT ──────────────────────────────────────────────────────────────
goPage('home');
