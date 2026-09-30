# AfriSolve AI — Complete Video Presentation Script

**Presenter:** Chibuzor Moses Uzowuru  
**Project:** AfriSolve AI — African-Centered Problem Intelligence Platform  
**Target Duration:** 8 minutes 30 seconds (within the 5–10 minute requirement)  
**Deliverable:** Final Project: Software Prototype [S:A]  
**Recording Advice:** Speak at a steady, natural pace (~130 words per minute). Keep your browser open at `http://127.0.0.1:5173` in full screen. You can either read this script aloud while recording or follow the screen action cues step-by-step.

---

## Technical & Recording Pre-Flight Checklist
- [ ] Application started locally via `npm start` or `npm run dev` and accessible at `http://127.0.0.1:5173`.
- [ ] Browser window maximized with clean cache/cookies (or started from default seed state).
- [ ] Screen recorder (OBS Studio, Open Screen, or SimpleScreenRecorder) set to 1080p 30fps.
- [ ] Microphone tested with a 15-second sample to verify audible, crisp volume.
- [ ] A small test file named `field-notes.txt` created on your desktop containing:  
  `"Fictional classroom demonstration notes. Community interviews pending."`

---

## Timed Presentation Script & Screen Action Cues

```
========================================================================================
PART 1: INTRODUCTION & PROBLEM STATEMENT (0:00 – 1:00 | ~130 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Show the AfriSolve AI Landing Page (`http://127.0.0.1:5173`). Scroll gently down the hero section showing the mission statement, the 8 sectors, and the African problem intelligence summary.*

**[SPOKEN SCRIPT]:**  
> "Hello, my name is Chibuzor Moses Uzowuru. Today, I am presenting the final software prototype for **AfriSolve AI**, an African-centered problem intelligence and collaborative innovation platform.
>
> In technology and entrepreneurship across Africa, we frequently witness the phenomenon of **solution-first development**. Engineering teams often build digital solutions based on untested assumptions—without deeply understanding grassroots infrastructure constraints, cultural contexts, purchasing power, or real community priorities. The result is that well-funded applications frequently fail to achieve adoption or long-term sustainability.
>
> AfriSolve AI directly addresses this gap. It provides a structured pipeline that compels innovators and researchers to discover, document, and independently validate problems before writing code or building hardware. 
>
> Today, I will walk you through our working prototype, demonstrating how it fulfills all functional requirements and business rules from my Software Requirements Specification (SRS) and UML System Design."

---

```
========================================================================================
PART 2: ACTORS, RBAC & SECURE AUTHENTICATION (1:00 – 1:50 | ~120 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Click the **Sign In** button to open the Auth modal. Show the persona switcher and then show the standard email/password tabs. Switch to **Sign Up**, show the fields (Name, Email, Role dropdown with Innovator, Researcher, Community, Mentor, Student), and then click **Demo Mailbox** to show where verification links arrive.*

**[SPOKEN SCRIPT]:**  
> "As designed in my UML use case and class diagrams, AfriSolve AI supports distinct actor roles: **Innovators**, **Researchers**, **Community Members**, **Mentors**, and **Administrators**—each governed by server-enforced Role-Based Access Control (RBAC).
>
> On our authentication screen, users can register with their name, country, and institution. Security is enforced through server-side password hashing using `scrypt`, HTTP-only session cookies with strict origin validation, and mandatory email verification. 
>
> For this local demonstration, the platform includes a built-in demo mailbox that previews outbound verification emails without requiring external SMTP configuration. 
>
> Let's enter the workspace as **Nia Kamau**, our registered Researcher from Kenya."

**[SCREEN ACTION]:**  
*Click **Enter as Nia Kamau (Researcher)**. The dashboard loads seamlessly.*

---

```
========================================================================================
PART 3: PROBLEM DISCOVERY & EVIDENCE-BASED SUBMISSION (1:50 – 3:00 | ~160 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Click **Problem Repository** on the sidebar. Show the live filters: filter by Sector (e.g., Agriculture), Country (e.g., Kenya), and Status. Then click the **Submit Problem** button to open the submission form.*

**[SPOKEN SCRIPT]:**  
> "This brings us to **Functional Requirement 1: Problem Discovery and Submission**. 
>
> The Problem Repository allows users to search, filter by eight key developmental sectors—such as Agriculture, Healthcare, and Water & Sanitation—across fourteen African nations, mapped to UN Sustainable Development Goals.
>
> In accordance with **Business Rule 2**, a problem cannot be a mere opinion. The author must explicitly separate the problem description from observable, verifiable evidence.
>
> Let's submit a new challenge."

**[SCREEN ACTION]:**  
*Fill in the form with:*  
- **Title:** `Unreliable Cold-Storage for Rural Agricultural Cooperatives`  
- **Sector:** `Agriculture`  
- **Country:** `Kenya`  
- **Region:** `Machakos County`  
- **SDG:** `2` (Zero Hunger)  
- **Priority:** `High`  
- **Description:** `Smallholder vegetable farmers experience up to 40% post-harvest spoilage due to recurring electrical grid outages and high fuel costs for diesel coolers.`  
- **Evidence & Sources:** `Interviews conducted with 18 cooperative members in June 2026, cooperative harvest logs showing spoilage tonnage, and Kenya Power outage logs.`  
*Click **Submit for Community Review**.*

**[SPOKEN SCRIPT]:**  
> "Notice how the system validates all fields and records the submission in a **Pending** state. As an author, Nia can edit her problem while it is pending, but she cannot approve her own submission."

---

```
========================================================================================
PART 4: COMMUNITY VALIDATION & ADMINISTRATOR APPROVAL GATE (3:00 – 4:10 | ~150 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Stay on the newly created problem page. Click the **Vote** button. An alert appears preventing the author from voting for their own submission.  
Now switch persona using the top switcher: select **Kwame Mensah (Student)** and vote. Then switch to **Lerato Molefe (Innovator)** and vote.*

**[SPOKEN SCRIPT]:**  
> "Now let's examine **Functional Requirement 2 and Business Rule 3: Community Validation**.
>
> If Nia tries to vote on her own problem, the server strictly rejects it. Community validation requires genuine grassroots support. To demonstrate this, Kwame Mensah casts an independent vote, and Lerato Molefe casts a second vote.
>
> However, popularity alone is not enough. Under **Business Rule 4**, community votes never bypass governance: only an Administrator can officially verify a problem for project initiation. Furthermore, if anyone attempts to create a project before verification, the server rejects it."

**[SCREEN ACTION]:**  
*Switch persona to **Amara Okafor (Administrator)**. Navigate to **System Administration** > **Moderation & Content Review**. Show the problem with its 2 independent votes. Click **Verify Problem**.*

**[SPOKEN SCRIPT]:**  
> "Here, Administrator Amara Okafor inspects the evidence and community score in the moderation queue, and clicks **Verify Problem**. The status immediately transitions to **Verified**, creating an immutable audit trail entry and notifying the author."

---

```
========================================================================================
PART 5: AI-POWERED RESEARCH & CONTEXTUAL INTELLIGENCE (4:10 – 5:10 | ~140 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Switch back to **Nia Kamau (Researcher)**. Click **AI Research** on the sidebar. In the problem selector, pick the newly verified cold-storage problem. In the question box, enter:  
`"What are viable low-cost solar-thermal or passive cooling methods suitable for rural Kenyan cooperatives?"`  
Click **Run Research Brief**.*

**[SPOKEN SCRIPT]:**  
> "Next is **Functional Requirement 3: Contextual AI Research Support**.
>
> AfriSolve AI incorporates an intelligent research assistant. When connected to a local Ollama instance, it performs generative analysis; when running offline, it seamlessly falls back to a deterministic, local NLP heuristic engine. 
>
> Most importantly, adhering to academic integrity and transparency, the user interface explicitly badges the output as **Offline Contextual Fallback** or **Live Ollama**, ensuring no false claims of artificial intelligence are made.
>
> The research brief synthesizes the problem context, identifies relevant SDG targets, evaluates feasibility constraints such as off-grid maintenance, and provides structured literature exploration links from verified scientific sources."

---

```
========================================================================================
PART 6: PROJECT INITIATION, KANBAN TASKS & COLLABORATION (5:10 – 6:20 | ~160 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Click **Projects & Teams** on the sidebar. Click **Create Project**.  
Select the verified cold-storage problem.  
- Project Name: `Machakos Solar Cooling Cooperative Pilot`  
- Team Name: `Kilimo Tech Collective`  
- Description: `Developing an evaporative charcoal cooling prototype with hybrid solar backup for rural produce.`  
Click **Create Project Workspace**.*

**[SPOKEN SCRIPT]:**  
> "Now we transition to **Functional Requirement 4: Collaborative Project Workspaces**.
>
> Under **Business Rule 5**, projects can only be created from verified problems. Here, Nia establishes the project workspace and names her team.
>
> Within the workspace, team members can collaborate effectively:"

**[SCREEN ACTION]:**  
*Show the project workspace tabs:*  
1. *Click **Tasks**: Create a new task: Title: `Draft engineering schematic for charcoal cooler`, Assignee: `Kwame Mensah`, Due Date: `Next Friday`. Click Create. Drag or click the status selector to move it from **Todo** to **Doing**.*  
2. *Show how the overall **Progress Bar** updates dynamically.*  
3. *Click **Documents**: Click upload and select `field-notes.txt`. Show it listed with size and timestamp.*  
4. *Click **Team Discussion**: Post: `"Kwame, please review the cooling pad water pump specifications."`*  
5. *Click **Activity Log**: Show the automatically logged timestamped audit trail.*

**[SPOKEN SCRIPT]:**  
> "The Kanban task board automatically recalculates project completion percentages as tasks move to Doing and Done. Team discussions are scoped to project members, document attachments are validated, and the activity log provides complete operational transparency."

---

```
========================================================================================
PART 7: MENTORSHIP MATCHING & NOTIFICATION CENTER (6:20 – 7:15 | ~135 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Click **Mentorship** on the sidebar. Search for `Agriculture`. Show **Dr. Amina Diallo** from Senegal. Click **Request Mentorship**. Select the Machakos project and enter message: `"We would appreciate your review on our off-grid cooling thermodynamics."` Click Send.*

**[SPOKEN SCRIPT]:**  
> "Moving to **Functional Requirement 5: Mentorship Matching**.
>
> Innovators and researchers can browse vetted mentors by domain expertise and institution. Under **Business Rule 8**, requesting mentorship does not automatically grant unrestricted access to private project files. The mentor must review and explicitly accept."

**[SCREEN ACTION]:**  
*Switch persona to **Dr. Amina Diallo (Mentor)**. Show the incoming request card. Click **Accept Request**, set a review note: `"Approved. Let's schedule a session to review the insulation materials."` Click Save.  
Click the **Notifications** bell icon in the top header.*

**[SPOKEN SCRIPT]:**  
> "Dr. Diallo accepts the engagement and provides feedback. In **Functional Requirement 6**, all lifecycle events—such as project invitations, task due-date reminders, and mentorship decisions—are delivered in real time to the in-app notification center, with unread indicators and actionable navigation links."

---

```
========================================================================================
PART 8: ANALYTICS, AUDIT LOGS, BACKUPS & DATA EXPORTS (7:15 – 8:05 | ~130 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Click **Analytics & Reports** on the sidebar. Show the live aggregate statistics (Total Problems, Verified Count, Active Projects, Task Completion Rate). Scroll to show Sector Breakdown and Geographic Distribution.  
Click **Export CSV Report** (save to downloads).  
Click **Export PDF Report** (browser opens/downloads the PDF document).*

**[SPOKEN SCRIPT]:**  
> "Under **Functional Requirement 7**, our Analytics module calculates live aggregates directly from our database. These are actual mathematical sums, not hardcoded mock numbers. 
>
> Users can download comprehensive analytics in both standard CSV format and formatted PDF reports generated server-side using `pdfkit`."

**[SCREEN ACTION]:**  
*Switch to **Amara Okafor (Administrator)**. Click **System Administration**.  
Show the **User Management** table (toggle active/inactive).  
Show the **Audit Trail** table showing recent actions.  
Show the **System Backups** tab. Click **Create Manual Backup Snapshot**. Point out the daily 2:00 AM automated backup schedule.*

**[SPOKEN SCRIPT]:**  
> "Under **Functional Requirements 8 and 9**, Administrators maintain governance: managing user roles, inspecting immutable audit logs, scheduling daily automated backups, and executing point-in-time database snapshots with safe transactional rollback."

---

```
========================================================================================
PART 9: ARCHITECTURE, RUBRIC SUMMARY & CONCLUSION (8:05 – 8:45 | ~90 words)
========================================================================================
```

**[SCREEN ACTION]:**  
*Navigate back to the **Overview / Dashboard** view. Show the clean layout and smooth navigation.*

**[SPOKEN SCRIPT]:**  
> "In summary, AfriSolve AI is built with modern, resilient engineering:
> - A **React 19** responsive frontend with Vite,
> - An **Express 5** ESM backend architecture,
> - Persistent embedded **PostgreSQL** using PGlite, and
> - A comprehensive test suite with 100% passing tests across backend APIs, UI components, and Playwright end-to-end browser workflows.
>
> All source code, setup instructions, the deployed application, and the original SRS specification are linked in my final submission Google Document.
>
> Thank you very much for your time and evaluation."

**[SCREEN ACTION]:**  
*End recording cleanly.*
