# Recording guide — target 8–9 minutes

**Presenter:** Chibuzor Moses Uzowuru  
**Project:** AfriSolve AI — African-centered problem intelligence  
**Format:** Your own screen recording with your audible voice. The assignment requires 5–10 minutes. This is a rehearsal script, not an already recorded submission. Use Open Screen or your preferred recorder and Kdenlive if you need trims. Do not substitute an AI voice for your own required presentation.

## Before recording

- Start the application using the README. Ensure the browser opens and refresh works.
- Rehearse once. Close unrelated/personal tabs and hide account keys and system credentials.
- Use fictional personas/data only. Keep your real email and confidential community information off screen.
- Open separate browser profiles/contexts for Researcher, Student, Innovator, Mentor and Administrator, or sign out and choose another clearly named demo persona. State when you change actor.
- Prepare a small text document named `field-notes.txt` with the text: “Fictional classroom demonstration. No interviews were conducted.”
- If live Ollama is available, test it before recording; otherwise say that the local heuristic fallback is running. Do not call a fallback response live AI.
- Stage the two independent votes beforehand if necessary to keep the recording under 10 minutes; show the resulting count and explain who supplied them. Do not pretend staged data is real community evidence.
- Test microphone volume; record a 15-second sample and listen back.

## 0:00–0:55 — Introduce the system and problem

“Hello, my name is Chibuzor Moses Uzowuru. My project is AfriSolve AI, an African-centered problem-intelligence platform. It helps innovators understand and validate a problem before committing to a technological solution.

“The problem my proposal addresses is solution-first development: teams may build software based on assumptions, without enough evidence about local infrastructure, affordability, culture or community needs. This can waste effort and produce systems people do not adopt.

“AfriSolve brings problem discovery, community validation, research, collaboration and mentorship into one workflow. The information in this demonstration is fictional seed data, not the results of real community research.”

## 0:55–1:40 — Actors, authentication and profile

Show the actor choices and describe their responsibilities. Show signup with a fictional address ending `@afrisolve.demo`, email verification from the demo mailbox, and login. If this takes too long, show the verified login and explain the previously rehearsed signup steps without claiming they appear in the recording.

“Users have distinct responsibilities. Innovators submit and build; community members and researchers validate; mentors review; administrators govern content and access. Authentication and permissions are checked by the server, not just hidden in the interface. Here is the profile editor and the logout action. This local mailbox previews verification messages; a configured SMTP server is needed for actual delivery.”

## 1:40–2:45 — Discover and submit a problem

Search and filter the repository. Open an existing problem, then submit a concise new one:

- **Title:** “Unreliable cold storage for a fictional farming cooperative”
- **Description:** “In this fictional classroom scenario, a farming cooperative cannot keep harvested vegetables cool during repeated power interruptions. The team must validate affordability, maintenance responsibilities and harvest timing before choosing technology.”
- **Evidence:** “Demonstration scenario only. Proposed evidence: interviews with farmers, electricity logs and a baseline of storage losses. No interviews have yet been conducted.”
- **Sector:** Agriculture; **Country:** Nigeria; **Region:** Fictional cooperative; **SDG:** 2; **Priority:** high.

“The repository captures country, region, sector, SDG and priority. Authors can revise unapproved submissions. Evidence is recorded separately from the problem claim.”

## 2:45–3:40 — Community validation and administrative review

Show votes/comments from independent personas and the admin review gate. If feasible, attempt verification below threshold to demonstrate a meaningful validation error. Then approve after two independent votes.

“Votes rank community relevance, but popularity alone does not establish truth. The prototype requires two independent non-author votes and administrator review. This combines community validation with the SRS rule that only administrators approve content. Before verification, a project cannot be created from this problem.”

Show the verified status and notification.

## 3:40–4:35 — Research support

Ask: “How should we validate affordable cold-storage needs for this cooperative before designing a solution?”

“This research output is decision support. The interface identifies whether it came from live Ollama or the local heuristic fallback. The brief includes problem context, possible approaches, SDG suggestions and similar problems. Literature links are discovery entry points, not a claim that these papers have been read or verified. We still need to check sources and involve stakeholders.”

If Ollama fails, demonstrate the explicit fallback warning. Do not hide or mislabel it.

## 4:35–6:10 — Project, team and progress

Create a project from a verified problem. Show the team invitation and acceptance, then assign a task, move it to Doing/Done, and observe calculated progress. Upload/download `field-notes.txt`, post a team discussion, update a milestone and open the activity log.

“The project originates from a verified problem, as in my UML activity and sequence diagrams. A leader forms the team and assigns work. Membership controls protect files and project data. Progress is calculated from tasks, while milestones and the activity log make the work traceable.”

## 6:10–7:05 — Mentorship and notifications

Search a mentor by expertise, send a request, switch explicitly to the mentor, accept it and add review feedback/meeting details. Show notifications and mark one read.

“Mentors decide whether to accept a request. Acceptance does not silently give unrestricted access to private workspaces. Invitations, task events and mentoring updates appear in the notification center; actual external email requires SMTP configuration.”

## 7:05–8:00 — Analytics, reports and administration

Show aggregate metrics; download/open the generated PDF and CSV. As administrator, show user roles/activation, moderation flags, audit history, backup creation and daily schedule controls. Do not restore the demo you are still recording unless you have deliberately prepared for logout and rollback.

“These metrics are calculated from stored application records, not invented impact statistics. Reports can be downloaded. Administrators have audit records and a backup workflow. Restoring requires explicit confirmation and invalidates sessions.”

## 8:00–8:45 — Architecture, limitations and close

“The prototype uses React, an Express API and persistent embedded PostgreSQL. It is a single-instance prototype, not a claim of continental production scale. My original design proposed separate database and cloud services; those are production expansion steps. Live AI depends on Ollama access and quota, and real emails depend on SMTP. Local heuristic research and demo mail are labelled honestly.

“The central lifecycle is working: discover a problem, validate it with people, research it, form a team, track work and review progress. My submission document links to the public source code, setup instructions, SRS, deployed application and this recording. Thank you.”

**Only say the final sentence about public links after you have actually published and verified them.**

## Delivery checks

- Recording is between 5 and 10 minutes, with clear voice and readable UI.
- The student can explain the source code and decisions rather than only read the script.
- Any AI assistance is disclosed according to the institution's academic-integrity rules.
- No unsupported statistics, invented user research or claims of guaranteed marks.
- Video plays while signed out and without requesting permission.
- All links in the submission document are the final published links, not localhost or draft placeholders.
