# AfriSolve AI — Teleprompter Recording Script

**Presenter:** Chibuzor Moses Uzowuru  
**Project:** AfriSolve AI — African-Centered Problem Intelligence Platform  
**Target Duration:** `08:30` *(Course Window: 05:00 – 10:00)*  
**Pacing:** Steady, clear conversational delivery *(~130–140 words per minute)*  

---

### `[00:00]` — PART 1: INTRODUCTION & PROBLEM STATEMENT

> **`>>> [ACTION: SHOW LANDING PAGE (http://127.0.0.1:5173)]`**  
> **`>>> [ACTION: SLOWLY SCROLL HERO BANNER SHOWING 8 SECTORS & VERIFIED COUNTERS]`**

Hello...  
My name is Chibuzor Moses Uzowuru.  

Today, I am presenting the final software prototype...  
for **AFRISOLVE AI**...  
an African-centered problem intelligence...  
and collaborative innovation platform.  

### `[00:18]`

Across the African technology ecosystem...  
we frequently see a critical flaw:  
**SOLUTION-FIRST DEVELOPMENT**.  

Engineering teams often build digital products...  
based on untested assumptions...  
without truly understanding grassroots realities...  
such as infrastructure constraints...  
purchasing power...  
or local community priorities.  

The result?  
Well-funded applications frequently fail...  
to achieve adoption or sustainability.  

### `[00:45]`

AfriSolve AI directly solves this problem.  

It provides a structured pipeline...  
that compels innovators and researchers...  
to discover, document, and independently validate problems...  
**BEFORE** writing code or building hardware.  

Today, I will demonstrate our working prototype...  
showing how it fulfills all functional requirements...  
and business rules from my SRS and UML system design.  

---

### `[01:05]` — PART 2: ACTORS, RBAC & SECURE AUTHENTICATION

> **`>>> [ACTION: CLICK 'SIGN IN' BUTTON -> OPEN AUTH MODAL]`**  
> **`>>> [ACTION: SHOW PERSONA SWITCHER, THEN CLICK 'SIGN UP' TAB]`**  
> **`>>> [ACTION: CLICK 'DEMO MAILBOX' TO SHOW INCOMING VERIFICATION TOKENS]`**

As specified in my UML design...  
AfriSolve AI supports distinct actor roles:  
**INNOVATORS**...  
**RESEARCHERS**...  
**COMMUNITY MEMBERS**...  
**MENTORS**...  
and **ADMINISTRATORS**...  
all governed by server-enforced Role-Based Access Control.  

### `[01:25]`

Our authentication enforces enterprise-grade security:  
Server-side password hashing using `scrypt`...  
HTTP-only session cookies...  
strict origin checks...  
and mandatory email verification.  

For this local evaluation...  
a built-in demo mailbox previews verification tokens...  
without needing external SMTP servers.  

### `[01:45]`

> **`>>> [ACTION: CLICK 'ENTER AS NIA KAMAU (RESEARCHER)']`**  
> **`>>> [ACTION: WORKSPACE DASHBOARD LOADS]`**

Let us enter the workspace...  
as Nia Kamau...  
our registered Researcher from Kenya.  

---

### `[01:55]` — PART 3: PROBLEM DISCOVERY & EVIDENCE-BASED SUBMISSION

> **`>>> [ACTION: CLICK 'PROBLEM REPOSITORY' ON LEFT SIDEBAR]`**  
> **`>>> [ACTION: DEMONSTRATE FILTERS: SECTOR = AGRICULTURE, COUNTRY = KENYA]`**

This is Functional Requirement 1:  
**PROBLEM DISCOVERY AND SUBMISSION**.  

The repository enables users to search and filter...  
across eight key developmental sectors...  
and fourteen African nations...  
directly mapped to UN Sustainable Development Goals.  

### `[02:15]`

Under Business Rule 2...  
a problem cannot be a mere opinion.  
The author **MUST** separate the problem claim...  
from observable, documented evidence.  

Let us submit a new challenge.  

### `[02:30]`

> **`>>> [ACTION: CLICK 'SUBMIT PROBLEM' BUTTON]`**  
> **`>>> [ACTION: FILL FORM:]`**  
> - **Title:** `Unreliable Cold-Storage for Rural Agricultural Cooperatives`  
> - **Sector:** `Agriculture`  
> - **Country:** `Kenya` | **Region:** `Machakos County`  
> - **SDG:** `2` (Zero Hunger) | **Priority:** `High`  
> - **Description:** `Smallholder vegetable farmers experience up to 40% post-harvest spoilage due to recurring electrical grid outages and high fuel costs for diesel coolers.`  
> - **Evidence:** `Interviews conducted with 18 cooperative members in June 2026, harvest spoilage tonnage records, and Kenya Power grid outage logs.`  
> **`>>> [ACTION: CLICK 'SUBMIT FOR COMMUNITY REVIEW']`**

### `[02:50]`

Notice how the system validates all fields...  
and places the submission into a **PENDING** state.  

As the author...  
Nia can revise her submission while it is pending...  
but she **CANNOT** approve her own problem.  

---

### `[03:05]` — PART 4: COMMUNITY VALIDATION & ADMIN REVIEW GATE

> **`>>> [ACTION: CLICK 'VOTE' BUTTON AS NIA -> SHOW SELF-VOTE REJECTION ALERT]`**

Now we examine Functional Requirement 2...  
and Business Rule 3:  
**COMMUNITY VALIDATION**.  

If Nia attempts to vote on her own problem...  
the server strictly blocks it!  

Grassroots validation requires **INDEPENDENT** voices.  

### `[03:22]`

> **`>>> [ACTION: SWITCH PERSONA TO KWAME MENSAH (STUDENT) -> CAST VOTE 1]`**  
> **`>>> [ACTION: SWITCH PERSONA TO LERATO MOLEFE (INNOVATOR) -> CAST VOTE 2]`**

To demonstrate this...  
Kwame Mensah casts the first independent vote...  
and Lerato Molefe casts a second vote...  
reaching our required community threshold of two votes.  

### `[03:40]`

However... popularity alone is not truth!  

Under Business Rule 4...  
community votes **NEVER** bypass administrative governance.  
Only an Administrator can officially verify a problem.  

In fact... if anyone attempts to create a project right now...  
the system strictly rejects it!  

### `[04:00]`

> **`>>> [ACTION: SWITCH PERSONA TO AMARA OKAFOR (ADMINISTRATOR)]`**  
> **`>>> [ACTION: GO TO 'SYSTEM ADMINISTRATION' -> 'MODERATION & REVIEW QUEUE']`**  
> **`>>> [ACTION: LOCATE THE 2-VOTE PROBLEM -> CLICK 'VERIFY PROBLEM']`**

Here in the Moderation Queue...  
Administrator Amara Okafor inspects the evidence...  
and approves the problem.  

The status immediately transitions to **VERIFIED**...  
creating an immutable audit log entry...  
and notifying the author.  

---

### `[04:20]` — PART 5: AI RESEARCH & CONTEXTUAL INTELLIGENCE

> **`>>> [ACTION: SWITCH BACK TO NIA KAMAU (RESEARCHER)]`**  
> **`>>> [ACTION: CLICK 'AI RESEARCH' ON SIDEBAR]`**  
> **`>>> [ACTION: SELECT THE VERIFIED PROBLEM]`**  
> **`>>> [ACTION: ENTER QUERY: "What are viable low-cost solar-thermal or passive cooling methods suitable for rural Kenyan cooperatives?"]`**  
> **`>>> [ACTION: CLICK 'RUN RESEARCH BRIEF']`**

Next is Functional Requirement 3:  
**AI RESEARCH AND CONTEXTUAL INTELLIGENCE**.  

AfriSolve incorporates an intelligent research assistant.  
When connected to Ollama...  
it provides generative intelligence.  
When running offline...  
it seamlessly engages a deterministic, local NLP heuristic engine.  

### `[04:45]`

In accordance with academic integrity...  
the interface explicitly labels the output...  
as **OFFLINE CONTEXTUAL FALLBACK**... or **LIVE OLLAMA**.  
There are **NO** fabricated claims of live AI.  

The brief synthesizes technical context...  
identifies relevant SDG targets...  
evaluates off-grid feasibility...  
and provides discovery links to scientific publications.  

---

### `[05:15]` — PART 6: PROJECT WORKSPACES & COLLABORATION

> **`>>> [ACTION: CLICK 'PROJECTS & TEAMS' ON SIDEBAR]`**  
> **`>>> [ACTION: CLICK 'CREATE PROJECT']`**  
> **`>>> [ACTION: SELECT VERIFIED PROBLEM]`**  
> **`>>> [ACTION: NAME: Machakos Solar Cooling Cooperative Pilot]`**  
> **`>>> [ACTION: TEAM NAME: Kilimo Tech Collective]`**  
> **`>>> [ACTION: DESCRIPTION: Developing an evaporative charcoal cooling prototype with hybrid solar backup for rural produce.]`**  
> **`>>> [ACTION: CLICK 'CREATE PROJECT WORKSPACE']`**

Now we transition to Functional Requirement 4:  
**PROJECT WORKSPACES AND COLLABORATION**.  

Under Business Rule 5...  
projects can **ONLY** originate from verified problems.  
Nia establishes the workspace and names her team.  

### `[05:40]`

> **`>>> [ACTION: IN PROJECT WORKSPACE, CLICK 'TASKS' TAB]`**  
> **`>>> [ACTION: CREATE TASK: "Draft engineering schematic for charcoal cooler", ASSIGNED: Kwame Mensah, DUE: Next Friday]`**  
> **`>>> [ACTION: MOVE TASK FROM 'TODO' TO 'DOING' -> POINT TO PROGRESS BAR UPDATE]`**

Within the workspace...  
the team manages tasks on an interactive Kanban board.  
Notice how the overall progress bar...  
automatically recalculates in real-time...  
as tasks move between states!  

### `[06:00]`

> **`>>> [ACTION: CLICK 'DOCUMENTS' TAB -> UPLOAD 'field-notes.txt']`**  
> **`>>> [ACTION: CLICK 'TEAM DISCUSSION' -> POST: "Kwame, please review cooling pad pump specs."]`**  
> **`>>> [ACTION: CLICK 'ACTIVITY LOG' -> SHOW THE TIMESTAMPED LOG]`**

Documents are validated and stored securely...  
team discussions are strictly scoped to project members...  
and the activity log provides complete traceability.  

---

### `[06:20]` — PART 7: MENTORSHIP MATCHING & NOTIFICATIONS

> **`>>> [ACTION: CLICK 'MENTORSHIP' ON SIDEBAR]`**  
> **`>>> [ACTION: FILTER FOR 'AGRICULTURE']`**  
> **`>>> [ACTION: CLICK 'REQUEST MENTORSHIP' ON DR. AMINA DIALLO (SENEGAL)]`**  
> **`>>> [ACTION: SELECT PROJECT, ENTER NOTE: "We would appreciate your review on our off-grid cooling thermodynamics."]`**  
> **`>>> [ACTION: CLICK 'SEND REQUEST']`**

This brings us to Functional Requirement 5:  
**MENTORSHIP MATCHING**.  

Innovators can search vetted mentors by domain expertise.  
Under Business Rule 8...  
requesting mentorship does **NOT** grant unrestricted access to project files.  
The mentor must review and explicitly accept.  

### `[06:45]`

> **`>>> [ACTION: SWITCH PERSONA TO DR. AMINA DIALLO (MENTOR)]`**  
> **`>>> [ACTION: OPEN REQUEST -> CLICK 'ACCEPT REQUEST' -> NOTE: "Approved. Let's schedule a session."]`**  
> **`>>> [ACTION: CLICK NOTIFICATIONS BELL ICON IN TOP HEADER]`**

Dr. Diallo accepts the engagement and provides feedback.  

Under Functional Requirement 6...  
all events—mentorship approvals, task deadlines, and invitations—  
are delivered instantly to the notification inbox...  
with unread badges and direct links.  

---

### `[07:15]` — PART 8: ANALYTICS, AUDIT LOGS & DATA EXPORTS

> **`>>> [ACTION: CLICK 'ANALYTICS & REPORTS' ON SIDEBAR]`**  
> **`>>> [ACTION: SHOW LIVE AGGREGATE STATS, SECTOR CHARTS, AND COUNTRY SPREAD]`**  
> **`>>> [ACTION: CLICK 'EXPORT CSV REPORT' -> DOWNLOAD]`**  
> **`>>> [ACTION: CLICK 'EXPORT PDF REPORT' -> SHOW GENERATED PDF]`**

Under Functional Requirement 7...  
our Analytics module calculates actual aggregates...  
directly from the database.  
These are real numbers, not mock displays.  

Users can export full reports...  
in CSV spreadsheet format...  
or formatted PDF documents generated by the server.  

### `[07:45]`

> **`>>> [ACTION: SWITCH TO AMARA OKAFOR (ADMINISTRATOR)]`**  
> **`>>> [ACTION: CLICK 'SYSTEM ADMINISTRATION']`**  
> **`>>> [ACTION: SHOW USER MANAGEMENT TABLE (ACTIVE/INACTIVE TOGGLE)]`**  
> **`>>> [ACTION: SHOW AUDIT TRAIL]`**  
> **`>>> [ACTION: SHOW 'SYSTEM BACKUPS' TAB -> CLICK 'CREATE MANUAL BACKUP SNAPSHOT']`**

Under Functional Requirements 8 and 9...  
Administrators govern the platform:  
Managing user accounts...  
inspecting immutable audit logs...  
and executing point-in-time database backups...  
with safe transactional restore capability.  

---

### `[08:10]` — PART 9: ARCHITECTURE, RUBRIC SUMMARY & CONCLUSION

> **`>>> [ACTION: NAVIGATE BACK TO 'OVERVIEW' DASHBOARD SCREEN]`**  
> **`>>> [ACTION: SHOW THE POLISHED, CLEAN USER INTERFACE]`**

To conclude...  
AfriSolve AI is engineered with modern, robust technologies:  
- A **React 19** responsive client with Vite...  
- An **Express 5** ESM backend...  
- Persistent embedded **PostgreSQL** with PGlite...  
- and a 100% green test suite...  
spanning backend APIs, UI components, and Playwright end-to-end tests.  

### `[08:30]`

All code, setup instructions, the deployed application,  
and the original SRS specification...  
are linked in my final submission Google Document.  

Thank you very much for your time and evaluation.  

> **`>>> [ACTION: PAUSE 2 SECONDS ON CLEAN DASHBOARD -> END RECORDING]`**
