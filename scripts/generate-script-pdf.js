import PDFDocument from 'pdfkit';
import { createWriteStream, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const targetPdf = resolve(__dirname, '../docs/AfriSolve_AI_Full_Video_Recording_Script.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 36, bottom: 40, left: 40, right: 40 },
  info: {
    Title: 'AfriSolve AI — Full Video Presentation Script',
    Author: 'Chibuzor Moses Uzowuru',
    Subject: 'Verbatim Spoken Video Script & Action Cues for Software Prototype Demo'
  },
  bufferPages: true,
  autoFirstPage: false
});

const stream = createWriteStream(targetPdf);
doc.pipe(stream);

const PRIMARY = '#145c43';
const SECONDARY = '#1e293b';
const SCRIPT_COLOR = '#0f172a';
const MUTED = '#64748b';
const ACCENT = '#0f766e';
const ACTION_BG = '#f1f5f9';
const SPOKEN_BG = '#f0fdf4';
const BORDER_COLOR = '#cbd5e1';

function newPage() {
  doc.addPage({ margins: { top: 36, bottom: 42, left: 40, right: 40 } });
  doc.rect(40, 24, doc.page.width - 80, 3).fill(PRIMARY);
}

function heading1(text) {
  doc.moveDown(0.5);
  doc.fontSize(12).font('Helvetica-Bold').fillColor(PRIMARY).text(text);
  doc.rect(40, doc.y + 2, doc.page.width - 80, 0.8).fill(PRIMARY);
  doc.moveDown(0.3);
}

function screenAction(text) {
  const width = doc.page.width - 80;
  const contentWidth = width - 14;
  const padding = 5;
  const textHeight = doc.heightOfString(text, { width: contentWidth, font: 'Helvetica-Oblique', size: 8 });
  const totalHeight = 12 + textHeight + (padding * 2);

  if (doc.y + totalHeight > doc.page.height - 45) {
    newPage();
  }

  const curY = doc.y + 2;
  doc.rect(40, curY, width, totalHeight).fillAndStroke(ACTION_BG, BORDER_COLOR);
  doc.fontSize(8).font('Helvetica-Bold').fillColor('#334155').text('[SCREEN ACTION]:', 47, curY + padding);
  doc.fontSize(8).font('Helvetica-Oblique').fillColor('#334155').text(text, 47, curY + padding + 10, {
    width: contentWidth,
    lineGap: 1.5
  });
  doc.y = curY + totalHeight + 3;
}

function spokenBlock(text) {
  const width = doc.page.width - 80;
  const contentWidth = width - 16;
  const padding = 6;
  const textHeight = doc.heightOfString(text, { width: contentWidth, font: 'Helvetica', size: 8.5 });
  const totalHeight = 13 + textHeight + (padding * 2);

  if (doc.y + totalHeight > doc.page.height - 45) {
    newPage();
  }

  const curY = doc.y + 2;
  doc.rect(40, curY, width, totalHeight).fillAndStroke(SPOKEN_BG, '#86efac');
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(PRIMARY).text('SAY ALOUD (Spoken Narration):', 48, curY + padding);
  doc.fontSize(8.5).font('Helvetica').fillColor(SCRIPT_COLOR).text(text, 48, curY + padding + 11, {
    width: contentWidth,
    lineGap: 2
  });
  doc.y = curY + totalHeight + 4;
}

// ==================== PAGE 1 ====================
newPage();

// Title Block
doc.fontSize(16).font('Helvetica-Bold').fillColor(PRIMARY).text('AfriSolve AI — Complete Video Presentation Script');
doc.fontSize(9.5).font('Helvetica').fillColor(MUTED).text('Word-for-Word Narration Script & Live Screen Actions (Target: 8–9 Minutes)', { lineGap: 2 });
doc.moveDown(0.2);

// Metadata Box
doc.rect(40, doc.y, doc.page.width - 80, 36).fillAndStroke('#f8fafc', BORDER_COLOR);
const mY = doc.y + 4;
doc.fontSize(8).font('Helvetica-Bold').fillColor(PRIMARY).text('Presenter:', 48, mY);
doc.font('Helvetica').fillColor(SECONDARY).text('Chibuzor Moses Uzowuru', 95, mY);
doc.font('Helvetica-Bold').fillColor(PRIMARY).text('Project:', 240, mY);
doc.font('Helvetica').fillColor(SECONDARY).text('AfriSolve AI (Software Prototype [S:A])', 280, mY);
doc.font('Helvetica-Bold').fillColor(PRIMARY).text('Target Duration:', 48, mY + 11);
doc.font('Helvetica').fillColor(SECONDARY).text('8 Minutes 30 Seconds (Course Window: 5–10 Minutes)', 120, mY + 11);
doc.font('Helvetica-Bold').fillColor(PRIMARY).text('Spoken Word Count:', 240, mY + 11);
doc.font('Helvetica').fillColor(SECONDARY).text('~1,200 words (~140 wpm natural conversational pace)', 335, mY + 11);
doc.font('Helvetica-Bold').fillColor(PRIMARY).text('Key Objective:', 48, mY + 22);
doc.font('Helvetica').fillColor(SECONDARY).text('Full walkthrough of FR1–FR10, BR1–BR8, UML Actors, and Interactive Demo', 115, mY + 22);
doc.y = mY + 34;

heading1('PART 1: SYSTEM INTRODUCTION & THE AFRICAN PROBLEM CONTEXT (0:00 – 1:00)');
screenAction('Show the AfriSolve AI Landing Page (http://127.0.0.1:5173). Slowly scroll past the hero banner showing the African problem-intelligence mission, the 8 development sectors, and verified problem counters.');
spokenBlock('"Hello, my name is Chibuzor Moses Uzowuru. Today, I am presenting the final software prototype for AfriSolve AI, an African-centered problem intelligence and collaborative innovation platform.\n\nIn technology and entrepreneurship across Africa, we frequently witness the phenomenon of solution-first development. Engineering teams often build digital solutions based on untested assumptions—without deeply understanding grassroots infrastructure constraints, cultural contexts, purchasing power, or real community priorities. The result is that well-funded applications frequently fail to achieve adoption or long-term sustainability.\n\nAfriSolve AI directly addresses this gap. It provides a structured pipeline that compels innovators and researchers to discover, document, and independently validate problems before writing code or building hardware. Today, I will walk you through our working prototype, demonstrating how it fulfills all functional requirements and business rules from my Software Requirements Specification (SRS) and UML System Design."');

heading1('PART 2: ACTORS, RBAC & SECURE AUTHENTICATION (1:00 – 1:50)');
screenAction('Click "Sign In" to open the Auth modal. Show the persona switcher, then click the standard Sign In tabs. Switch to "Sign Up" to show registration fields (Name, Email, Role selector). Then click "Demo Mailbox" to show where verification emails arrive.');
spokenBlock('"As designed in my UML use case and class diagrams, AfriSolve AI supports distinct actor roles: Innovators, Researchers, Community Members, Mentors, and Administrators—each governed by server-enforced Role-Based Access Control (RBAC).\n\nOn our authentication screen, users can register with their name, country, and institution. Security is enforced through server-side password hashing using scrypt, HTTP-only session cookies with strict origin validation, and mandatory email verification. For this local demonstration, the platform includes a built-in demo mailbox that previews outbound verification emails without requiring external SMTP configuration. Let\'s enter the workspace as Nia Kamau, our registered Researcher from Kenya."');

// ==================== PAGE 2 ====================
newPage();

screenAction('Click "Enter as Nia Kamau (Researcher)". The dashboard workspace loads instantly.');

heading1('PART 3: PROBLEM DISCOVERY & EVIDENCE-BASED SUBMISSION (1:50 – 3:00)');
screenAction('Click "Problem Repository" on the sidebar. Demonstrate filtering by Sector (Agriculture), Country (Kenya), and Status. Then click "Submit Problem" to open the submission form.');
spokenBlock('"This brings us to Functional Requirement 1: Problem Discovery and Submission.\n\nThe Problem Repository allows users to search, filter by eight key developmental sectors—such as Agriculture, Healthcare, and Water & Sanitation—across fourteen African nations, mapped to UN Sustainable Development Goals.\n\nIn accordance with Business Rule 2, a problem cannot be a mere opinion. The author must explicitly separate the problem description from observable, verifiable evidence. Let\'s submit a new challenge."');

screenAction('Fill the form: Title: "Unreliable Cold-Storage for Rural Agricultural Cooperatives", Sector: Agriculture, Country: Kenya, Region: Machakos County, SDG: 2 (Zero Hunger), Priority: High. Description: "Smallholder vegetable farmers experience up to 40% post-harvest spoilage due to recurring electrical grid outages and high fuel costs for diesel coolers." Evidence: "Interviews with 18 cooperative members in June 2026, harvest spoilage tonnage records, and Kenya Power grid outage logs." Click "Submit for Community Review".');
spokenBlock('"Notice how the system validates all fields and records the submission in a Pending state. As an author, Nia can edit her problem while it is pending, but she cannot approve her own submission."');

heading1('PART 4: COMMUNITY VALIDATION & ADMIN REVIEW GATE (3:00 – 4:10)');
screenAction('On the problem page, click the "Vote" button as Nia. Show the error alert preventing self-voting. Then switch persona to Kwame Mensah (Student) and vote. Switch to Lerato Molefe (Innovator) and vote (reaching 2 votes).');
spokenBlock('"Now let\'s examine Functional Requirement 2 and Business Rule 3: Community Validation.\n\nIf Nia tries to vote on her own problem, the server strictly rejects it. Community validation requires genuine grassroots support. To demonstrate this, Kwame Mensah casts an independent vote, and Lerato Molefe casts a second vote.\n\nHowever, popularity alone is not enough. Under Business Rule 4, community votes never bypass governance: only an Administrator can officially verify a problem for project initiation. Furthermore, if anyone attempts to create a project before verification, the server rejects it."');

screenAction('Switch persona to Amara Okafor (Administrator). Click "System Administration" > "Moderation & Review Queue". Locate the problem with its 2 independent votes. Click "Verify Problem".');
spokenBlock('"Here, Administrator Amara Okafor inspects the evidence and community score in the moderation queue, and clicks Verify Problem. The status immediately transitions to Verified, creating an immutable audit trail entry and notifying the author."');

// ==================== PAGE 3 ====================
newPage();

heading1('PART 5: AI-POWERED RESEARCH & CONTEXTUAL INTELLIGENCE (4:10 – 5:10)');
screenAction('Switch persona back to Nia Kamau. Click "AI Research" on sidebar. Pick the verified cold-storage problem. Enter query: "What are viable low-cost solar-thermal or passive cooling methods suitable for rural Kenyan cooperatives?" Click "Run Research Brief".');
spokenBlock('"Next is Functional Requirement 3: Contextual AI Research Support.\n\nAfriSolve AI incorporates an intelligent research assistant. When connected to a local Ollama instance, it performs generative analysis; when running offline, it seamlessly falls back to a deterministic, local NLP heuristic engine.\n\nMost importantly, adhering to academic integrity and transparency, the user interface explicitly badges the output as Offline Contextual Fallback or Live Ollama, ensuring no false claims of artificial intelligence are made.\n\nThe research brief synthesizes the problem context, identifies relevant SDG targets, evaluates feasibility constraints such as off-grid maintenance, and provides structured literature exploration links from verified scientific sources."');

heading1('PART 6: PROJECT INITIATION, KANBAN TASKS & COLLABORATION (5:10 – 6:20)');
screenAction('Click "Projects & Teams" > "Create Project". Select the verified cold-storage problem. Name: "Machakos Solar Cooling Cooperative Pilot", Team Name: "Kilimo Tech Collective", Description: "Developing an evaporative charcoal cooling prototype with hybrid solar backup for rural produce." Click "Create Project Workspace".');
spokenBlock('"Now we transition to Functional Requirement 4: Collaborative Project Workspaces.\n\nUnder Business Rule 5, projects can only be created from verified problems. Here, Nia establishes the project workspace and names her team.\n\nWithin the workspace, team members can collaborate effectively:"');

screenAction('1. Click "Tasks": Add task: "Draft engineering schematic for charcoal cooler", Assignee: Kwame Mensah, Due Date: Next Friday. Click Create. Move task from Todo to Doing. Show dynamic progress bar change.\n2. Click "Documents": Upload "field-notes.txt". Show file name and size.\n3. Click "Team Discussion": Post message: "Kwame, please review the cooling pad pump specifications."\n4. Click "Activity Log": Show the chronological activity entries.');
spokenBlock('"The Kanban task board automatically recalculates project completion percentages as tasks move to Doing and Done. Team discussions are scoped to project members, document attachments are validated, and the activity log provides complete operational transparency."');

// ==================== PAGE 4 ====================
newPage();

heading1('PART 7: MENTORSHIP MATCHING & NOTIFICATION INBOX (6:20 – 7:15)');
screenAction('Click "Mentorship" on sidebar. Filter/search for "Agriculture". Show Dr. Amina Diallo (Senegal). Click "Request Mentorship". Select the Machakos project. Message: "We would appreciate your review on our off-grid cooling thermodynamics." Click Send.');
spokenBlock('"Moving to Functional Requirement 5: Mentorship Matching.\n\nInnovators and researchers can browse vetted mentors by domain expertise and institution. Under Business Rule 8, requesting mentorship does not automatically grant unrestricted access to private project files. The mentor must review and explicitly accept."');

screenAction('Switch persona to Dr. Amina Diallo (Mentor). Open incoming request. Click "Accept Request", note: "Approved. Let\'s schedule a session to review the insulation materials." Click Save. Click the Notifications bell in the top navigation.');
spokenBlock('"Dr. Diallo accepts the engagement and provides feedback. In Functional Requirement 6, all lifecycle events—such as project invitations, task due-date reminders, and mentorship decisions—are delivered in real time to the in-app notification center, with unread indicators and actionable navigation links."');

heading1('PART 8: ANALYTICS, AUDIT LOGS, BACKUPS & EXPORTS (7:15 – 8:05)');
screenAction('Click "Analytics & Reports" on sidebar. Show live aggregate numbers (Problems, Verified, Projects, Task Completion Rate). Scroll through Sector and Country distributions. Click "Export CSV Report", then click "Export PDF Report" (show download).');
spokenBlock('"Under Functional Requirement 7, our Analytics module calculates live aggregates directly from our database. These are actual mathematical sums, not hardcoded mock numbers. Users can download comprehensive analytics in both standard CSV format and formatted PDF reports generated server-side using pdfkit."');

screenAction('Switch to Amara Okafor (Administrator). Click "System Administration". Show User Management (activation toggle), Audit Trail, and System Backups. Click "Create Manual Backup Snapshot". Point to daily 2:00 AM automated backup setting.');
spokenBlock('"Under Functional Requirements 8 and 9, Administrators maintain governance: managing user roles, inspecting immutable audit logs, scheduling daily automated backups, and executing point-in-time database snapshots with safe transactional rollback."');

heading1('PART 9: ARCHITECTURE, RUBRIC SUMMARY & CONCLUSION (8:05 – 8:45)');
screenAction('Navigate back to the main Overview / Dashboard screen. Show the complete application view.');
spokenBlock('"In summary, AfriSolve AI is built with modern, resilient engineering:\n• A React 19 responsive frontend with Vite,\n• An Express 5 ESM backend architecture,\n• Persistent embedded PostgreSQL using PGlite, and\n• A comprehensive test suite with 100% passing tests across backend APIs, UI components, and Playwright end-to-end browser workflows.\n\nAll source code, setup instructions, the deployed application, and the original SRS specification are linked in my final submission Google Document.\n\nThank you very much for your time and evaluation."');
screenAction('Pause for 2 seconds on the clean dashboard, then end the screen recording.');

// ==================== FOOTER ====================
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.page.margins.bottom = 0;
  doc.fontSize(7.5).font('Helvetica').fillColor(MUTED).text(
    `AfriSolve AI — Full Video Presentation Script | Student: Chibuzor Moses Uzowuru | Page ${i + 1} of ${range.count}`,
    40,
    doc.page.height - 24,
    { align: 'center', width: doc.page.width - 80 }
  );
}

doc.end();

stream.on('finish', () => {
  console.log(`Video script PDF successfully generated: ${targetPdf} (Total Pages: ${range.count})`);
});
