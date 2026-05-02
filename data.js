
const FLASHCARDS = [
  {cat:"Basics", q:"What is the full form of ECI?", a:"Election Commission of India — the constitutional body that oversees free & fair elections."},
  {cat:"Basics", q:"Which Article of the Constitution establishes the ECI?", a:"Article 324 — grants the ECI superintendence, direction, and control of elections."},
  {cat:"Basics", q:"What is the minimum voting age in India?", a:"18 years. Lowered from 21 to 18 by the 61st Constitutional Amendment Act, 1988."},
  {cat:"Basics", q:"What is FPTP?", a:"First Past The Post — India's electoral system where the candidate with the most votes wins, even without a majority."},
  {cat:"Basics", q:"How many Lok Sabha seats are there?", a:"543 directly elected seats (plus 2 Anglo-Indian nominated seats, now discontinued after 104th Amendment)."},
  {cat:"Basics", q:"What is the term of Lok Sabha?", a:"5 years from the date of its first sitting, unless dissolved earlier by the President."},
  {cat:"Basics", q:"What is NOTA?", a:"None Of The Above — a ballot option introduced in 2013 allowing voters to reject all candidates."},
  {cat:"Basics", q:"What is an EPIC card?", a:"Elector's Photo Identity Card — the official voter ID issued by the ECI."},
  {cat:"Registration", q:"What is Form 6?", a:"Application form to register as a new voter in the Electoral Roll."},
  {cat:"Registration", q:"What is Form 7?", a:"Form used to object to or request deletion of an entry in the electoral roll."},
  {cat:"Registration", q:"What is Form 8?", a:"Form for corrections/modifications in existing voter registration details."},
  {cat:"Registration", q:"What is NVSP?", a:"National Voters' Service Portal (nvsp.in) — online platform to register, update, and check voter status."},
  {cat:"Registration", q:"What is the voter helpline number?", a:"1950 — National Voter Helpline, toll-free, available in multiple languages."},
  {cat:"Registration", q:"Who is eligible to vote in India?", a:"Indian citizen, aged 18+, ordinarily resident in the constituency, registered on electoral roll."},
  {cat:"Registration", q:"Can NRIs vote in India?", a:"Yes. NRIs can register in their home constituency using Form 6A and vote in person (not by proxy/postal ballot yet)."},
  {cat:"Polling Day", q:"What documents can be used as voter ID at the booth?", a:"EPIC, Aadhaar, passport, driving licence, PAN card, MNREGA job card, pension document, and 11 others approved by ECI."},
  {cat:"Polling Day", q:"What is a polling booth?", a:"A designated location where voters cast their ballots. Each booth covers ~1,500 voters on average."},
  {cat:"Polling Day", q:"What is Model Code of Conduct (MCC)?", a:"Guidelines issued by ECI to political parties and candidates once election schedule is announced. Ensures level playing field."},
  {cat:"Polling Day", q:"What is VVPAT?", a:"Voter Verifiable Paper Audit Trail — a machine that prints a paper slip showing your vote for 7 seconds after you press EVM button."},
  {cat:"Polling Day", q:"What is mock poll?", a:"A test conducted before actual voting to verify EVM is working correctly. Minimum 50 votes are cast."},
  {cat:"EVM", q:"What is an EVM?", a:"Electronic Voting Machine — a standalone, tamper-proof device used for casting and recording votes in Indian elections since 1999 nationally."},
  {cat:"EVM", q:"Can EVMs be hacked remotely?", a:"No. EVMs are standalone machines with no Wi-Fi, Bluetooth, or internet connectivity. They cannot be hacked remotely."},
  {cat:"EVM", q:"What are the two units of an EVM?", a:"Control Unit (with the presiding officer) and Balloting Unit (where voter presses button). Connected by a 5-metre cable."},
  {cat:"ECI", q:"How many Election Commissioners are there?", a:"3 — Chief Election Commissioner (CEC) + 2 Election Commissioners. Appointed by the President."},
  {cat:"ECI", q:"What is cVIGIL?", a:"A mobile app by ECI allowing citizens to report election code violations with photo/video evidence in real-time."},
  {cat:"ECI", q:"What is the Suvidha portal?", a:"ECI's online portal for political parties and candidates to apply for election-related permissions."},
  {cat:"Legal", q:"What is the Representation of the People Act?", a:"The RP Act 1950 & 1951 — primary laws governing elections in India, covering voter registration, conduct of elections, and disputes."},
  {cat:"Legal", q:"What is delimitation?", a:"The process of redrawing constituency boundaries based on Census data. Done by the Delimitation Commission."},
  {cat:"Legal", q:"What is a by-election?", a:"An election held to fill a vacancy in a constituency between general elections, caused by death, resignation, or disqualification."},
  {cat:"Post-Election", q:"What is the role of the President after elections?", a:"The President invites the leader of the majority party/coalition to form the government and appoints them as Prime Minister."},
  {cat:"Post-Election", q:"What is an election petition?", a:"A legal challenge to election results filed in High Court within 45 days of the result declaration."},
];

const QUIZ = [
  {q:"Which constitutional article establishes the Election Commission of India?",opts:["Article 315","Article 324","Article 326","Article 329"],ans:1,cat:"Constitutional",exp:"Article 324 vests the superintendence, direction and control of elections in the Election Commission of India."},
  {q:"NOTA was introduced in Indian elections after a Supreme Court order in which year?",opts:["2009","2011","2013","2015"],ans:2,cat:"History",exp:"The Supreme Court directed ECI to introduce NOTA in September 2013, first used in 5 state elections in Nov 2013."},
  {q:"What is the minimum age to contest Lok Sabha elections?",opts:["18","21","25","30"],ans:2,cat:"Eligibility",exp:"A person must be at least 25 years old to contest elections to the Lok Sabha or State Legislative Assembly."},
  {q:"Which amendment reduced the voting age from 21 to 18?",opts:["42nd","52nd","61st","73rd"],ans:2,cat:"Constitutional",exp:"The 61st Constitutional Amendment Act, 1988 reduced the voting age to 18, effective from 1989 elections."},
  {q:"The Model Code of Conduct comes into effect when?",opts:["1 month before polling","On announcement of election schedule","On filing of nominations","On last date of withdrawal"],ans:1,cat:"MCC",exp:"MCC kicks in immediately when the Election Commission announces the election schedule/dates."},
  {q:"What does VVPAT stand for?",opts:["Voter Verified Paper Audit Trail","Voter Verifiable Paper Audit Trail","Verified Voter Paper Audit Trail","Voter Verified Poll Audit Track"],ans:1,cat:"EVM",exp:"VVPAT = Voter Verifiable Paper Audit Trail. It shows a paper slip of your vote for 7 seconds."},
  {q:"Which form is used for NEW voter registration?",opts:["Form 6","Form 7","Form 8","Form 8A"],ans:0,cat:"Registration",exp:"Form 6 is for new registration. Form 7 is for deletion, Form 8 for corrections, Form 8A for shifting within constituency."},
  {q:"How many Lok Sabha constituencies are there in India?",opts:["530","543","552","560"],ans:1,cat:"Structure",exp:"There are 543 Lok Sabha constituencies in India, each electing one Member of Parliament."},
  {q:"What is the term of the Rajya Sabha?",opts:["4 years","5 years","6 years","Permanent body"],ans:3,cat:"Structure",exp:"Rajya Sabha is a permanent body that is never dissolved. One-third of its members retire every 2 years; each member serves 6 years."},
  {q:"EVM was first used nationally in which general election?",opts:["1989","1996","1999","2004"],ans:2,cat:"EVM",exp:"EVMs were used in all constituencies for the first time in the 1999 general elections."},
  {q:"The Chief Election Commissioner can be removed by?",opts:["President alone","Parliament by special majority","Supreme Court","Council of Ministers"],ans:1,cat:"ECI",exp:"CEC can only be removed through a process like that for removing a Supreme Court judge — address by both Houses of Parliament."},
  {q:"Which article of the Constitution grants universal adult suffrage?",opts:["Article 324","Article 325","Article 326","Article 327"],ans:2,cat:"Constitutional",exp:"Article 326 provides for elections to Lok Sabha and State Assemblies on the basis of adult suffrage."},
  {q:"What is the national voter helpline number?",opts:["100","1950","1800","112"],ans:1,cat:"Helpline",exp:"1950 is the National Voter Helpline — a toll-free number operated by ECI for voter queries."},
  {q:"NOTA votes are counted but can they cause re-election?",opts:["Yes, if NOTA gets most votes","No, candidate with most votes still wins","Only if NOTA > 50%","Depends on the state"],ans:1,cat:"NOTA",exp:"Even if NOTA gets the most votes, the candidate with the next highest votes wins. NOTA has no re-election trigger currently."},
  {q:"Which body conducts delimitation of constituencies?",opts:["ECI","Supreme Court","Delimitation Commission","Parliament"],ans:2,cat:"Legal",exp:"The Delimitation Commission, appointed by the President, redraws constituency boundaries based on Census data."},
];

const FAQS = [
  {cat:"Registration", q:"How do I register as a new voter?", a:"Visit nvsp.in or the Voter Helpline App, fill Form 6 online. You can also visit your nearest BLO (Booth Level Officer) for offline registration. Documents needed: age proof, address proof, and a photograph."},
  {cat:"Registration", q:"Can I vote if I don't have an EPIC card?", a:"Yes! ECI has approved 12 alternative photo ID documents including Aadhaar, PAN card, passport, driving licence, MNREGA job card, and others."},
  {cat:"Registration", q:"How do I check if my name is on the electoral roll?", a:"Visit nvsp.in, call 1950, or use the Voter Helpline mobile app. Enter your name, district, and state to check."},
  {cat:"Registration", q:"What is the deadline to register before an election?", a:"Generally, the last date to file Form 6 is linked to the Summary Revision period, usually ending 30-45 days before polling day. Check ECI announcements."},
  {cat:"Registration", q:"Can I vote from a different city than where I am registered?", a:"No. You must vote in the constituency where you are registered. You cannot vote remotely unless you are a service voter or have a postal ballot."},
  {cat:"Voting", q:"What should I carry on polling day?", a:"Your EPIC card or any one of the 12 approved alternate ID documents. Ensure your name is in the electoral roll before going."},
  {cat:"Voting", q:"Is voting mandatory in India?", a:"No. Voting is not compulsory at the national level in India. Gujarat was the first state to introduce compulsory voting at local body level."},
  {cat:"Voting", q:"What is the voting process at a polling booth?", a:"1) Show ID to polling officer, 2) Get your finger marked with indelible ink, 3) Sign/thumbprint in register, 4) Enter the voting compartment, 5) Press button on EVM next to your choice, 6) VVPAT displays your vote for 7 seconds."},
  {cat:"Voting", q:"Can differently-abled voters get assistance?", a:"Yes. PwD voters can bring a companion of their choice into the voting compartment. Ramps and wheelchairs are provided at booths. Priority queues are available."},
  {cat:"EVM", q:"Is the EVM tamper-proof?", a:"Yes. EVMs are standalone machines with no external connectivity (no Wi-Fi, Bluetooth, or internet). They use one-time programmable chips and have multiple technical and administrative safeguards."},
  {cat:"EVM", q:"What happens to EVMs after voting?", a:"They are sealed, signed by candidates/agents, and stored in strong rooms under 24/7 CCTV surveillance and security. They are opened only during counting."},
  {cat:"MCC", q:"What is the Model Code of Conduct?", a:"A set of guidelines issued by ECI for political parties and candidates from the date of election announcement until results. It ensures a level playing field and prevents misuse of government resources."},
  {cat:"MCC", q:"Can the government announce new schemes during elections?", a:"No. The MCC prohibits the ruling party from announcing new schemes, projects, or policies that could influence voters once elections are announced."},
  {cat:"NRI", q:"Can NRIs vote in Indian elections?", a:"Yes. NRIs can register as overseas voters using Form 6A on nvsp.in. They must be present in their home constituency on polling day to vote — postal/proxy voting is not yet available for NRIs."},
  {cat:"Results", q:"When are election results declared?", a:"Counting begins on the day announced by ECI (usually 2-3 days after the last phase of polling). Results are typically known within one day of counting."},
  {cat:"Results", q:"What is an election petition?", a:"A legal challenge to election results. Must be filed in the High Court within 45 days of the result declaration. Grounds include corrupt practices, improper acceptance/rejection of nominations, etc."},
];

const HELPLINES = {
  national: [
    {title:"National Voter Helpline", num:"1950", desc:"Toll-free, multilingual voter information helpline by ECI"},
    {title:"cVIGIL (Report Violations)", num:"App", desc:"Download cVIGIL app to report MCC violations with photo/video"},
    {title:"NVSP Portal", num:"nvsp.in", desc:"Online voter registration, search, and services"},
    {title:"ECI Website", num:"eci.gov.in", desc:"Official Election Commission of India website"},
    {title:"Voter Helpline App", num:"Play/App Store", desc:"Search 'Voter Helpline' — official ECI mobile app"},
    {title:"Suvidha (Candidate Portal)", num:"suvidha.eci.gov.in", desc:"Online permission portal for candidates"},
  ],
  states: {
    "Andhra Pradesh": {ceo:"ceoap.gov.in", phone:"0863-2340202"},
    "Arunachal Pradesh": {ceo:"ceoarunachal.nic.in", phone:"0360-2212422"},
    "Assam": {ceo:"ceoassam.nic.in", phone:"0361-2237270"},
    "Bihar": {ceo:"ceobihar.nic.in", phone:"0612-2508044"},
    "Chhattisgarh": {ceo:"ceochhattisgarh.nic.in", phone:"0771-2234392"},
    "Goa": {ceo:"ceogoa.nic.in", phone:"0832-2419541"},
    "Gujarat": {ceo:"ceo.gujarat.gov.in", phone:"079-23250426"},
    "Haryana": {ceo:"ceoharyana.gov.in", phone:"0172-2701373"},
    "Himachal Pradesh": {ceo:"himachal.nic.in/ceo", phone:"0177-2624367"},
    "Jharkhand": {ceo:"jharkhand.gov.in/ceo", phone:"0651-2400533"},
    "Karnataka": {ceo:"ceokarnataka.kar.nic.in", phone:"080-22353700"},
    "Kerala": {ceo:"ceo.kerala.gov.in", phone:"0471-2321745"},
    "Madhya Pradesh": {ceo:"ceomadhyapradesh.nic.in", phone:"0755-2551500"},
    "Maharashtra": {ceo:"ceo.maharashtra.gov.in", phone:"022-22025000"},
    "Manipur": {ceo:"ceomanipur.nic.in", phone:"0385-2450085"},
    "Meghalaya": {ceo:"ceomeghalaya.nic.in", phone:"0364-2226098"},
    "Mizoram": {ceo:"ceomizoram.nic.in", phone:"0389-2327918"},
    "Nagaland": {ceo:"ceonagaland.nic.in", phone:"0370-2229916"},
    "Odisha": {ceo:"ceoodisha.nic.in", phone:"0674-2536953"},
    "Punjab": {ceo:"ceopunjab.nic.in", phone:"0172-2740632"},
    "Rajasthan": {ceo:"ceorajasthan.nic.in", phone:"0141-2227163"},
    "Sikkim": {ceo:"ceosikkim.nic.in", phone:"03592-202571"},
    "Tamil Nadu": {ceo:"elections.tn.gov.in", phone:"044-28521166"},
    "Telangana": {ceo:"ceotelangana.nic.in", phone:"040-23393400"},
    "Tripura": {ceo:"ceotripura.nic.in", phone:"0381-2326309"},
    "Uttar Pradesh": {ceo:"ceouttarpradesh.nic.in", phone:"0522-2638960"},
    "Uttarakhand": {ceo:"ceo.uk.gov.in", phone:"0135-2714008"},
    "West Bengal": {ceo:"ceowestbengal.nic.in", phone:"033-22143012"},
    "Delhi": {ceo:"ceodelhi.gov.in", phone:"011-23392874"},
    "Jammu & Kashmir": {ceo:"ceojk.nic.in", phone:"0194-2506093"},
    "Ladakh": {ceo:"ladakh.gov.in", phone:"01982-252126"},
    "Puducherry": {ceo:"ceopuducherry.nic.in", phone:"0413-2335236"},
  }
};

const CHAT_RESPONSES = {
  "how to register": "To register as a voter in India:\n\n1️⃣ Visit **nvsp.in** or download the **Voter Helpline App**\n2️⃣ Fill **Form 6** for new registration\n3️⃣ Upload: age proof + address proof + photo\n4️⃣ Submit and note your reference number\n5️⃣ A BLO will verify your details\n6️⃣ Your name is added to the electoral roll\n\n📞 Call **1950** for help!",
  "voter id": "Your **EPIC Card** (Voter ID) can be downloaded from nvsp.in after registration. If you've lost it, apply for a duplicate via Form 002 on NVSP. You can also use 12 other approved IDs on polling day like Aadhaar, PAN, Passport.",
  "evm": "**Electronic Voting Machines (EVMs)** are:\n\n🔒 **Standalone** — no internet, Wi-Fi, or Bluetooth\n🔒 **One-time programmable** chips — cannot be reprogrammed\n🔒 **Sealed & secured** in strong rooms after voting\n✅ Used nationally since **1999 elections**\n✅ Verified by **VVPAT** paper trail\n\nEVMs are tested in public mock polls before every election.",
  "nota": "**NOTA (None Of The Above)** was introduced in **2013** after a Supreme Court order.\n\n• You press NOTA if you don't want to vote for ANY candidate\n• NOTA votes ARE counted\n• But even if NOTA gets the most votes, the candidate with the next highest votes **still wins**\n• NOTA was first used in 5 state elections in November 2013",
  "mcc": "**Model Code of Conduct (MCC)** is activated the moment ECI announces the election schedule.\n\nIt prohibits:\n❌ Announcing new government schemes\n❌ Using government resources for campaign\n❌ Hate speech or communal appeals\n❌ Bribery of voters\n\nReport violations via **cVIGIL app** instantly!",
  "vvpat": "**VVPAT (Voter Verifiable Paper Audit Trail)**:\n\n• After pressing EVM button, a paper slip appears in VVPAT window\n• It shows your candidate's name, symbol, and serial number\n• Visible for **7 seconds** then drops into a sealed box\n• Used to audit/verify EVM results if needed\n• Mandatory in all polling stations since 2019",
  "helpline": "📞 **Key Helplines:**\n\n• **1950** — National Voter Helpline (toll-free)\n• **cVIGIL App** — Report MCC violations\n• **nvsp.in** — Voter portal\n• **eci.gov.in** — ECI official site\n• **1800-111-950** — Alternate helpline\n\nYour state CEO contact is in the Helpline section!",
  "election process": "**Indian General Election Process:**\n\n1️⃣ **ECI announces schedule** → MCC activated\n2️⃣ **Notification issued** → Nomination period begins\n3️⃣ **Scrutiny of nominations** by Returning Officer\n4️⃣ **Withdrawal of candidature** deadline\n5️⃣ **Campaign period** (no campaigning 48h before poll)\n6️⃣ **Polling day** — voting at booths\n7️⃣ **Counting of votes**\n8️⃣ **Declaration of results**\n9️⃣ **Government formation**",
  "postal ballot": "**Postal Ballot** allows certain voters to vote without visiting a booth:\n\n✅ Service voters (armed forces, paramilitary, police deployed outside)\n✅ Essential service workers on duty\n✅ Senior citizens (80+) — optional facility\n✅ PwD voters — optional facility\n✅ COVID patients/suspects — introduced during pandemic\n\nNRIs currently CANNOT use postal ballot.",
  "counting": "**Vote Counting Process:**\n\n1️⃣ Candidates/agents gather at counting centre\n2️⃣ Strong room with EVMs opened under observation\n3️⃣ VVPAT slips verified (5 per constituency)\n4️⃣ EVM results tabulated round-by-round\n5️⃣ Returning Officer announces winner\n6️⃣ Winner issued **Form 20** (election certificate)\n\nResults typically declared within one day of counting.",
  "eligibility": "**Voter Eligibility in India:**\n\n✅ Indian citizen\n✅ Age 18 or above on Jan 1 of qualifying year\n✅ Ordinary resident in the constituency\n✅ Not declared of unsound mind\n✅ Not disqualified under any law\n\n❌ Non-resident in constituency cannot vote there\n❌ Imprisonment for 2+ years disqualifies",
  "lok sabha": "**Lok Sabha Facts:**\n\n• **543** elected seats + 2 nominated (discontinued)\n• Members serve **5-year terms**\n• Minimum age to contest: **25 years**\n• Elected by **direct vote** from constituencies\n• Leader of majority party becomes **Prime Minister**\n• Can be dissolved by President on PM's advice",
};

const ARTICLES = {
  evm: {
    title:"How EVMs Work",
    content:`<h3>⚡ How Electronic Voting Machines Work</h3>
    <p>India's Electronic Voting Machine (EVM) is one of the most secure voting technologies in the world. Introduced nationally in 1999, EVMs have transformed India's electoral process.</p>
    <h4>Two Components</h4>
    <ul><li><strong>Control Unit:</strong> Operated by the Presiding Officer. Controls the voting process.</li><li><strong>Balloting Unit:</strong> What voters interact with. Has buttons for each candidate.</li></ul>
    <h4>Security Features</h4>
    <ul><li>No internet, Wi-Fi, Bluetooth, or any external connectivity</li><li>One-time programmable microchips — cannot be reprogrammed</li><li>Multiple layers of physical seals signed by candidates</li><li>Stored in strong rooms with 24/7 CCTV and security</li><li>Mock polls conducted publicly before actual voting</li></ul>
    <div class="highlight">💡 EVMs were first used in select constituencies in Kerala in 1982. They became universal across India in 1999.</div>
    <h4>VVPAT Integration</h4>
    <p>Since 2019, every EVM has a VVPAT unit that prints a paper slip showing your vote for 7 seconds, providing a physical audit trail.</p>`
  },
  nota: {
    title:"Understanding NOTA",
    content:`<h3>🗳️ Understanding NOTA</h3>
    <p>NOTA — None Of The Above — is a ballot option that allows voters to reject all candidates in an election without abstaining from voting entirely.</p>
    <h4>History</h4>
    <p>Introduced following a Supreme Court landmark judgment in <strong>People's Union for Civil Liberties vs Union of India (2013)</strong>. First used in November 2013 state elections.</p>
    <h4>How it Works</h4>
    <ul><li>NOTA appears as the last option on the ballot/EVM</li><li>Has its own symbol — a ballot with a cross</li><li>Votes for NOTA are counted separately</li><li>Even if NOTA gets the most votes, the candidate with the highest votes among candidates wins</li></ul>
    <div class="highlight">⚠️ In India, NOTA is essentially a "protest vote" — it does not trigger a re-election, unlike some countries.</div>
    <h4>NOTA in Numbers</h4>
    <p>In the 2019 Lok Sabha elections, over <strong>1.06% of total votes</strong> (approximately 65 lakh votes) were cast for NOTA.</p>`
  },
  mcc: {
    title:"Model Code of Conduct",
    content:`<h3>📋 Model Code of Conduct Explained</h3>
    <p>The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission of India for political parties, candidates, and the government during elections.</p>
    <h4>When it Applies</h4>
    <p>MCC comes into effect immediately when the election schedule is announced and remains in force until results are declared.</p>
    <h4>Key Provisions</h4>
    <ul><li><strong>No new schemes:</strong> Government cannot announce new projects or schemes</li><li><strong>No government resources:</strong> Cannot use official vehicles, bungalows for campaign</li><li><strong>Clean campaigning:</strong> No hate speech, no appeals on caste/religion</li><li><strong>No bribery:</strong> Distribution of cash, gifts, or liquor prohibited</li><li><strong>Equal access:</strong> All parties get equal opportunity at public venues</li></ul>
    <div class="highlight">📱 Report MCC violations instantly using the <strong>cVIGIL app</strong>. ECI guarantees action within 100 minutes!</div>
    <h4>Enforcement</h4>
    <p>ECI can issue notices, warn, and even recommend criminal action. Flying squads and video surveillance teams monitor compliance 24/7.</p>`
  },
  structure: {
    title:"India's Electoral Structure",
    content:`<h3>🏛️ India's Electoral Structure</h3>
    <p>India is the world's largest democracy with over 96 crore registered voters as of 2024. The electoral structure operates at multiple levels.</p>
    <h4>Levels of Government</h4>
    <ul><li><strong>Central:</strong> Lok Sabha (543 seats) — Lower House, forms government</li><li><strong>Central:</strong> Rajya Sabha (245 seats) — Upper House, permanent body</li><li><strong>State:</strong> Legislative Assembly (Vidhan Sabha) — state governments</li><li><strong>Local:</strong> Municipal corporations, panchayats</li></ul>
    <h4>Election System: FPTP</h4>
    <p>India uses <strong>First Past The Post (FPTP)</strong>: the candidate with the most votes wins, regardless of whether they got a majority. This is also called plurality voting.</p>
    <div class="highlight">🌍 India's general election spans multiple phases (up to 7 phases) over 4-6 weeks due to the country's vast size and security requirements.</div>
    <h4>Special Provisions</h4>
    <ul><li>Reserved constituencies for SC/ST communities</li><li>33% reservation for women in local body elections</li><li>Proportional representation for Rajya Sabha (state legislatures elect)</li></ul>`
  }
};
