# AfriSolve AI: AI-Powered Problem Intelligence Platform

**Author:** Chibuzor Moses Uzowuru  
**Academic Prototype:** Final Project Summative Software Prototype [S:A]  
**Stack:** React 19, Vite, Node.js 22 (ESM), Express 5, Embedded PostgreSQL (`@electric-sql/pglite`), Supertest, Vitest, Playwright.

---

## 1. System Description

**AfriSolve AI** is an African-centered problem-intelligence platform that facilitates the discovery, validation, and contextual research of real African challenges before technological solutions are engineered. Rather than starting with assumptions or building software for the sake of novelty, AfriSolve AI enforces an evidence-based innovation lifecycle:

1. **Problem Discovery & Submission:** Surface everyday challenges across key sectors (Agriculture, Healthcare, Education, Energy, Water & Sanitation, Infrastructure, Technology, Environment) with explicit local context and documented evidence.
2. **Community Validation & Governance:** Community members vote and contribute discussion. Approval requires independent community validation (at least two non-author votes) coupled with administrator evidence review.
3. **Contextual AI Research:** An AI Research Studio provides structured briefs, identifying relevant Sustainable Development Goals (SDGs), possible ethical field methodologies, and scholarly discovery links (via OpenAlex, Crossref, and AJOL), with an honest local heuristic fallback when external AI models are unavailable.
4. **Collaborative Project Execution:** Verified problems can be turned into collaborative project workspaces featuring Kanban task tracking, document sharing (PDF, TXT, CSV, images), milestone tracking, and activity audit trails.
5. **Expert Mentorship Network:** Innovators connect with domain experts who review proposals, provide structured feedback, and schedule advisory sessions.
6. **Transparent Analytics & Exportable Reports:** Aggregated metrics across sectors and countries, downloadable as CSV and PDF reports with strict role-based access control.

---

## 2. Problem Statement & Motivation

### The Problem
Across Africa, numerous technological innovations and startup initiatives struggle to achieve long-term adoption or sustainability. Many digital solutions fail not due to inadequate technical implementation, but because they are designed without sufficient grounding in local community realities, cultural practices, infrastructure limitations (e.g., intermittent power, high data costs), and policy environments.

### Why It Is a Problem
- **Wasted Innovation Capital:** Scarce developer and financial resources are expended building software that communities do not adopt.
- **Solution-First Trap:** Teams frequently begin with an attractive technology (e.g., blockchain, mobile apps) before deeply understanding the underlying human and infrastructural problem.
- **Fragmented Problem Knowledge:** Challenges in healthcare, water sanitation, and agriculture often remain undocumented or isolated within local communities rather than visible to multidisciplinary problem solvers.

### The Proposed Solution
AfriSolve AI acts as a dedicated problem-intelligence platform that decouples problem understanding from solution building. By requiring community validation, stakeholder evidence, and administrative review before a project can be launched, the platform ensures that technological solutions are rooted in genuine, verified African needs.

---

## 3. Actors and Roles

The prototype implements server-enforced role-based access control (RBAC) across nine actor categories defined in the SRS and system design:

| Role | Responsibilities | Key Permissions |
|---|---|---|
| **Innovator** | Entrepreneurs, startup founders, developers | Submit problems, run AI research, lead/join projects, invite team members, request mentorship. |
| **Researcher** | Academic and field researchers | Contribute evidence, engage in community discussions, validate submissions, run research briefs. |
| **Student** | Learners and emerging technologists | Explore problem repository, vote on challenges, collaborate on project tasks. |
| **Community Member** | Local stakeholders and residents | Surface lived challenges, vote, comment, and report problematic submissions. |
| **Mentor** | Domain experts and advisors | Publish expertise profile, accept/decline mentorship requests, provide review feedback, schedule meetings. |
| **Administrator** | Platform governance and oversight | Moderate problem submissions (verify/reject/archive), resolve community reports, manage user roles/activation, create/restore backups, configure daily backup schedules. |
| **Developer** | Technical contributors | Build and maintain collaborative project tasks and documentation. |
| **Entrepreneur** | Venture builders | Track verified problem pipelines and progress toward commercialization. |
| **Institutional / NGO** | Governments and development agencies | Surface systemic challenges, inspect sector/country distributions, export analytical reports. |

---

## 4. Key Features & SRS Traceability (FR1–FR10)

- **FR1: User Account & Authentication:** Secure registration, scrypt password hashing, session tokens via HTTP-only same-site cookies, email verification, password reset, and configurable remember-me duration.
- **FR2: Problem Discovery & Repository:** Multi-parameter search and filtering by sector, country, region, SDG, priority, status, and submission date.
- **FR3: Community Validation (BR3 & BR4):** Toggled community voting (prevents self-voting), threaded discussions, and content reporting/flagging. Administrator verification requires at least two independent non-author votes.
- **FR4: Contextual AI Research Studio:** Structured research brief generation, sector classification, SDG mapping, discovery links, and local heuristic fallback.
- **FR5: Project Workspace & Collaboration:** Project creation restricted to administrator-verified problems, team invitations via verified email, document sharing (up to 2 MB with magic-byte validation), team discussions, and activity feed.
- **FR6: Task & Milestone Management:** Kanban board (`todo`, `doing`, `done`), assignee allocation, due date tracking, milestone completion, and automatic progress calculation.
- **FR7: Mentorship Network:** Mentor directory, expertise search, formal request workflow with message, mentor review with acceptance/decline and meeting scheduling.
- **FR8: Notifications & Alerts:** Real-time in-app notifications for task assignments, due-soon reminders, project invitations, mentorship responses, and moderation updates.
- **FR9: Analytics & Reporting:** Real-time platform aggregates by sector and country, task completion progress, and authenticated CSV/PDF report exports.
- **FR10: Administration & Governance:** User account management, moderation review queue, audit log, on-demand database snapshots, scheduled daily backups, and transactional restore with strict `RESTORE` confirmation.

---

## 5. Prerequisites

Before setting up AfriSolve AI, ensure your system has the following installed:

1. **Node.js**: Version **22.12.0** or higher (Node 22 LTS recommended).  
   Check your version with:
   ```bash
   node -v
   ```
2. **npm**: Version **10.0.0** or higher.  
   Check your version with:
   ```bash
   npm -v
   ```
3. **Git**: For cloning the repository.
4. *(Optional)* **Docker**: For containerized deployment.

---

## 6. Setup Instructions (Step-by-Step)

Follow these exact steps to clone, configure, build, and run AfriSolve AI locally:

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/AfriSolve-AI.git
cd AfriSolve-AI
```

### Step 2: Install Dependencies
Install all required production and development dependencies:
```bash
npm ci
```
*(Alternatively, run `npm install` if `npm ci` is not desired.)*

### Step 3: Configure Environment (Optional)
AfriSolve AI works out of the box in **Demo Mode** without any external configuration. If you wish to configure custom settings, create a `.env` file in the root directory:
```bash
cp .env.example .env
```
Key configuration parameters:
```env
# Server Port and Host
PORT=5173
HOST=127.0.0.1

# Application Mode
NODE_ENV=development
DEMO_MODE=true

# Persistent Database Directory
DATA_DIR=./data/postgres

# Session Secret (Required in production, 32+ characters)
# SESSION_SECRET=your-32-character-secret-key-goes-here

# AI Provider (Optional: Ollama integration)
# AI_BASE_URL=http://127.0.0.1:11434/api
# AI_MODEL=llama3.2
# OLLAMA_API_KEY=

# SMTP Email Delivery (Optional)
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=noreply@example.com
# SMTP_PASS=your-smtp-password
# SMTP_FROM="AfriSolve AI <noreply@example.com>"
```

### Step 4: Build the Frontend Assets
Compile the React 19 application using Vite into the `dist/` directory:
```bash
npm run build
```

### Step 5: Start the Application Server
Start the unified Express server (serving both the API and client assets):
```bash
npm start
```
You should see:
```text
AfriSolve listening at http://127.0.0.1:5173
```

### Step 6: Open the Application in Your Browser
Open your browser and navigate to:
```text
http://127.0.0.1:5173
```

In Demo Mode, you can:
- Click **Explore a demo workspace** to log in instantly as one of the pre-seeded African personas:
  - **Amara Okafor** (Administrator, Nigeria)
  - **Nia Kamau** (Researcher, Kenya)
  - **Kwame Mensah** (Student, Ghana)
  - **Lerato Molefe** (Innovator, South Africa)
  - **Dr. Amina Diallo** (Mentor, Senegal)
- Or register a new account using standard email/password registration.

---

## 7. Running the Test Suites

AfriSolve AI includes comprehensive test coverage spanning unit, API integration, UI component, and end-to-end browser workflows:

### Run All Backend & Security Tests (13 tests)
```bash
npm test
```
Verifies session isolation, CSRF origin checking, rate limiting, token expiration, transactional backup restore, RBAC permissions, due-soon reminder schedules, and embedded database persistence.

### Run UI Component Tests (12 tests via Vitest)
```bash
npm run test:ui
```
Verifies React state management, routing, form submissions, photo uploading, filter state, and honest fallback labelling in a simulated JSDOM environment.

### Run End-to-End Browser Tests (Playwright)
```bash
npx playwright test
```
Executes complete user journeys in a real Chromium browser:
1. Desktop navigation across all 10 modules without browser console errors.
2. Full lifecycle: Problem submission &rarr; multi-user voting &rarr; administrator verification &rarr; AI research brief &rarr; project creation &rarr; task management.
3. Mobile responsive layout and viewport containment at 390px width.

Screenshots of every module are automatically captured into `artifacts/screenshots/`.

### Run Comprehensive Quality Check
```bash
npm run check
```
Executes backend tests, UI tests, and the client build sequentially.

---

## 8. Production Deployment

### Option A: Direct Node.js Deployment
1. Set production environment variables:
   ```bash
   export NODE_ENV=production
   export DEMO_MODE=false
   export SESSION_SECRET="your-ultra-secure-random-string-at-least-32-chars-long"
   export PORT=5173
   export HOST=0.0.0.0
   export DATA_DIR=/var/data/afrisolve/postgres
   ```
2. Build client assets:
   ```bash
   npm run build
   ```
3. Bootstrap the initial platform administrator:
   ```bash
   ADMIN_NAME="Amara Okafor" ADMIN_EMAIL="admin@afrisolve.org" ADMIN_PASSWORD="SecurePassword123" node server/bootstrap-admin.js
   ```
4. Start the server:
   ```bash
   node server/index.js
   ```

### Option B: Docker Container Deployment
1. Build the Docker container image:
   ```bash
   docker build -t afrisolve-ai .
   ```
2. Run the container with a persistent volume:
   ```bash
   docker run -d \
     -p 5173:5173 \
     -e NODE_ENV=production \
     -e DEMO_MODE=false \
     -e SESSION_SECRET="your-ultra-secure-random-string-at-least-32-chars-long" \
     -v afrisolve-data:/app/data \
     --name afrisolve \
     afrisolve-ai
   ```
3. Bootstrap the initial administrator inside the running container:
   ```bash
   docker exec -it -e ADMIN_NAME="Amara Okafor" -e ADMIN_EMAIL="admin@afrisolve.org" -e ADMIN_PASSWORD="SecurePassword123" afrisolve node server/bootstrap-admin.js
   ```

---

## 9. Prototype Limitations & Academic Disclosures

To uphold rigorous academic integrity, the following implementation boundaries are explicitly documented:

1. **Embedded Database Engine:** The prototype utilizes `@electric-sql/pglite` (embedded WebAssembly/C PostgreSQL) for single-instance persistence. Horizontal database clustering or distributed multi-region scaling would be future production enhancements.
2. **AI Provider Mode & Fallback:** The AI Research Studio supports live Ollama cloud/local inference. When no external provider is authorized or available, the system falls back to an ethical keyword-heuristic rule engine. The user interface explicitly labels heuristic outputs as such and never fabricates live AI claims.
3. **Email Notification Pipeline:** In local demo mode, emails to `@afrisolve.demo` addresses are captured and inspectable in the in-app Demo Mailbox. Real outbound delivery requires a configured SMTP server (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`).
4. **Fictional Demonstration Data:** Seed challenges, community personas, and validation metrics are provided solely to illustrate the platform lifecycle during evaluation and do not represent verified field research.
5. **No Dangerous Markup:** All client rendering uses native React escaping without any use of `dangerouslySetInnerHTML`.

---

## 10. Repository File Structure

```text
AfriSolve-AI/
├── Dockerfile                   # Multi-stage production container definition
├── index.html                   # Vite HTML5 client entrypoint
├── package.json                 # Project manifest, dependencies and scripts
├── playwright.config.js         # Playwright end-to-end test configuration
├── vite.config.js               # Vite build & Vitest test configuration
├── docs/                        # Academic submission documentation
│   ├── DEMO_SCRIPT.md           # 5-10 minute video demonstration script
│   ├── RUBRIC_AND_SCOPE.md      # Rubric traceability and evidence map
│   └── SUBMISSION_TEMPLATE.md   # Google Doc submission template
├── server/                      # Express 5 backend modules
│   ├── admin.js                 # Admin moderation, users, and backup endpoints
│   ├── app.js                   # Application factory, routes, and middleware
│   ├── auth.js                  # Authentication, scrypt hashing, and sessions
│   ├── bootstrap-admin.js       # Production administrator CLI bootstrap script
│   ├── core.js                  # PGlite embedded store, schemas, and validators
│   ├── index.js                 # HTTP server entrypoint with graceful shutdown
│   ├── mentors.js               # Mentorship network and review endpoints
│   ├── notifications.js         # Due-date reminders and notification scheduler
│   ├── projects.js              # Projects, tasks, documents, and invitations
│   ├── reports.js               # Real-time analytics, CSV and PDF report generators
│   └── research.js              # AI Research Studio and ethical heuristic engine
├── src/                         # React 19 client components
│   ├── Account.jsx              # Profile management and notifications center
│   ├── Admin.jsx                # Moderation queue, user management, and backups
│   ├── Analytics.jsx            # Sector/country distributions and report exports
│   ├── App.jsx                  # Main application layout, sidebar, and routing
│   ├── Auth.jsx                 # Login, registration, token verify, and mail preview
│   ├── Dashboard.jsx            # Platform overview, metrics, and quick actions
│   ├── Mentors.jsx              # Mentor directory and request modal
│   ├── Problems.jsx             # Problem submission, voting, comments, and filters
│   ├── Projects.jsx             # Project workspace, Kanban board, and documents
│   ├── Research.jsx             # AI Research Studio question explorer and history
│   ├── shared.jsx               # Reusable UI primitives, useData, and api helper
│   ├── main.jsx                 # React DOM client mounting entrypoint
│   └── styles.css               # Editorial green/off-white stylesheet (responsive)
└── tests/                       # Automated test suites
    ├── api.test.js              # Core API security and session tests
    ├── backend-*.test.js        # Module-specific backend integration tests
    ├── helpers.js               # Test fixtures and memory database factory
    ├── ui.test.jsx              # React Testing Library component tests
    └── e2e/                     # Playwright browser end-to-end test specs
        └── workflows.spec.js    # Multi-persona complete lifecycle browser tests
```

---

## 11. Course Submission Checklist

Before submitting on Canvas:
- [x] All 13 backend and security tests pass (`npm test`).
- [x] All 12 UI component tests pass (`npm run test:ui`).
- [x] All 3 Playwright end-to-end workflow tests pass (`npx playwright test`).
- [x] Production client bundle builds cleanly without warnings (`npm run build`).
- [x] Dockerfile builds and runs cleanly with healthcheck.
- [x] Rehearsal video guide available in [DEMO_SCRIPT.md](file:///home/wurucyber/AfriSolve-AI/docs/DEMO_SCRIPT.md).
- [x] Rubric traceability mapped in [RUBRIC_AND_SCOPE.md](file:///home/wurucyber/AfriSolve-AI/docs/RUBRIC_AND_SCOPE.md).
- [x] Submission Google Doc template prepared in [SUBMISSION_TEMPLATE.md](file:///home/wurucyber/AfriSolve-AI/docs/SUBMISSION_TEMPLATE.md).
