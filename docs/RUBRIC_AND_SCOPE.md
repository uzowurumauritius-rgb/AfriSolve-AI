# AfriSolve AI — rubric, scope and evidence map

Prepared for Chibuzor Moses Uzowuru. Source of truth: `Final Project_ Software Prototype [S_A].pdf`, Assignment 1 (SRS), and Assignment 2 (UML design), supplied by the student. The source PDFs remain unchanged.

## Grade target, not a grade guarantee

The supplied rubric totals **30 points**. It does not specify extra credit. Only the lecturer can award a grade. The project must demonstrate operation, not merely show attractive screens. A non-working submission link risks zero under the instructions.

| Criterion | Maximum | Evidence to present |
|---|---:|---|
| Reflection of system requirements | 10 | Demonstrate FR1–FR10 and the problem → community validation → research → project lifecycle; identify actors and permissions |
| Presentation | 5 | Your own audible, clear 5–10 minute recording; explain system, problem, why it matters, solution, and demo |
| Code availability requirements | 5 | Public GitHub repository; README with every setup step; verify as a signed-out visitor |
| Solution deployment | 5 | Working public app URL with durable state and appropriate grader access |
| Operation | 5 | Working signup, verification, login/logout, forms, buttons, redirects and protected workflows |

## Publication boundary

The student explicitly chose **local preparation only** and will publish personally. This build does not create a public repository, deploy a public service, upload source PDFs, share a Google Doc, or record the student's voice. No local tunnel is an acceptable substitute for this choice.

Until the repository, public app, video, SRS and shared Google Doc links have been published and tested, the assignment is **not submission-ready**, even when the local software passes its tests.

## Baseline and prototype decisions

1. React + Express are retained from the design. Persistence uses PGlite, an embedded PostgreSQL engine, rather than a separate PostgreSQL service plus MongoDB. This is a single-process academic prototype. The current JSONB aggregate schema is not the normalized, horizontally scalable class-to-table design described as a future production architecture.
2. AI uses the student's requested Ollama integration, not the originally proposed OpenAI service. A local heuristic remains usable if live cloud access is unavailable; the interface must distinguish it from live generative AI. Cloud access still requires device authorization or a server-side API key and available quota.
3. In-app notifications work locally. Fictional mail preview is not email delivery. Real email verification and external alerts require SMTP configuration and a delivery test.
4. The SRS BR3 requires community validation; BR4 reserves content approval to administrators. The prototype combines them: at least two independent, non-author votes **and** an administrator's decision. Two is an explicit prototype policy, not a threshold specified numerically in the original SRS. The UML's threshold-only transition is refined to respect both rules.
5. Session cookies replace the UML's generic authentication-token transport. Tokens are opaque, HTTP-only and server-checked. This preserves the protected-action behavior while changing the implementation detail.
6. Fictional seed personas and challenges demonstrate the workflow. Their validation scores, projects, and metrics are not evidence of actual community research or real-world impact.
7. The current web interface uses request/response and refresh, not a WebSocket collaboration server. Geographic tags are implemented; external map APIs, push/SMS, mobile apps, multilingual support and blockchain are not claimed.
8. Do not claim 500-user capacity, 99.5% uptime, all-browser compatibility, legal compliance certification, or measured social impact without independent evidence. The local tests cannot establish those production properties.

## Actor mapping

- **Innovator:** students, developers, entrepreneurs and startup founders; submit problems, research, lead/join projects, request mentors.
- **Researcher:** contribute evidence and validation; research; collaborate.
- **Community user:** vote, discuss and flag challenges; receive updates.
- **Government/NGO:** publish societal challenges, validate context and inspect aggregate reports.
- **Mentor:** publish expertise, accept/decline requests and provide review feedback; a mentorship does not silently grant private team membership.
- **Administrator:** manage users/roles, moderate, inspect audit history and operate backups.
- **External services:** Ollama provider and SMTP server, configured separately with explicit service-status labels.

## Acceptance walkthrough

1. Register a fictional demo email, verify it through the clearly labelled demo mailbox, log in, edit the profile, recover the password, and sign out.
2. Submit an evidence-bearing problem; edit it before approval; search/filter it.
3. Show that an author cannot validate their own submission. Two different users vote and comment. Show report/flag and administrator resolution.
4. Show that project creation is rejected before verification. Administrator reviews and verifies after independent votes.
5. Run research for the problem; identify mode, summary, SDGs, similar problems, approaches, source-discovery links and limitations.
6. Create a project from the verified problem; name its team; invite another registered user and accept as that user.
7. Assign a task, move its status, upload/download a file, post a discussion, update milestones and inspect activity.
8. Request mentorship and accept/decline from the mentor account; add a meeting/review and inspect notifications.
9. Show aggregate metrics and download actual PDF and CSV reports; show access control on private project reports.
10. Show role management, account activation control, audit entries, backup creation, scheduled-backup settings and the explicit restore confirmation.

Use the detailed traceability and verification documents to distinguish implemented behavior from configuration-dependent features and unmeasured production requirements.
