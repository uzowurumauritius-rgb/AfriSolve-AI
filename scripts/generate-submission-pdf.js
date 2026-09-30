import PDFDocument from 'pdfkit';
import { createWriteStream, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, '../docs');
mkdirSync(outputDir, { recursive: true });
const targetPdf = resolve(outputDir, 'AfriSolve_AI_Final_Project_Submission_Guide.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 36, bottom: 40, left: 40, right: 40 },
  info: {
    Title: 'AfriSolve AI — Final Project Software Prototype Submission Guide',
    Author: 'Chibuzor Moses Uzowuru',
    Subject: 'Software Development Final Summative Submission Instructions',
    Keywords: 'AfriSolve AI, Final Project, Submission Guide, Software Prototype'
  },
  bufferPages: true,
  autoFirstPage: false
});

const stream = createWriteStream(targetPdf);
doc.pipe(stream);

// Color Palette
const PRIMARY = '#145c43';      // Deep Forest Green
const SECONDARY = '#1e293b';    // Slate Gray Body
const MUTED = '#64748b';        // Muted Gray
const ACCENT = '#0f766e';       // Teal Accent
const CODE_BG = '#f8fafc';      // Code Box Light Gray
const CALLOUT_BG = '#f0fdf4';   // Green Tint
const BORDER_COLOR = '#cbd5e1'; // Subtle Border
const WARN_BG = '#fffbeb';      // Warning Yellow Box

function newPage() {
  doc.addPage({ margins: { top: 36, bottom: 42, left: 40, right: 40 } });
  // Top green banner accent
  doc.rect(40, 24, doc.page.width - 80, 3).fill(PRIMARY);
}

function heading1(text) {
  doc.moveDown(0.7);
  doc.fontSize(13.5).font('Helvetica-Bold').fillColor(PRIMARY).text(text);
  doc.rect(40, doc.y + 2, doc.page.width - 80, 1).fill(PRIMARY);
  doc.moveDown(0.35);
}

function heading2(text) {
  doc.moveDown(0.5);
  doc.fontSize(11).font('Helvetica-Bold').fillColor(ACCENT).text(text);
  doc.moveDown(0.2);
}

function paragraph(text) {
  doc.fontSize(9).font('Helvetica').fillColor(SECONDARY).text(text, {
    lineGap: 2.2,
    paragraphGap: 3
  });
}

function bullet(text, boldPrefix = '') {
  doc.fontSize(9).font('Helvetica').fillColor(SECONDARY);
  if (boldPrefix) {
    doc.font('Helvetica-Bold').text('•  ' + boldPrefix, { continued: true });
    doc.font('Helvetica').text(text, { lineGap: 1.8 });
  } else {
    doc.text('•  ' + text, { lineGap: 1.8 });
  }
}

function codeBox(code) {
  const padding = 6;
  const width = doc.page.width - 80;
  const codeWidth = width - (padding * 2);
  const textHeight = doc.heightOfString(code, { width: codeWidth, font: 'Courier', size: 8 });
  const totalHeight = textHeight + (padding * 2);
  const curY = doc.y + 2;

  doc.rect(40, curY, width, totalHeight).fillAndStroke(CODE_BG, BORDER_COLOR);
  doc.fontSize(8).font('Courier').fillColor('#0f172a').text(code, 40 + padding, curY + padding, {
    width: codeWidth,
    lineGap: 1.8
  });
  doc.y = curY + totalHeight + 4;
}

function callout(title, text, type = 'tip') {
  const bg = type === 'warn' ? WARN_BG : CALLOUT_BG;
  const border = type === 'warn' ? '#f59e0b' : PRIMARY;
  const titleColor = type === 'warn' ? '#b45309' : PRIMARY;
  const padding = 6;
  const width = doc.page.width - 80;
  const contentWidth = width - 18;
  const textHeight = doc.heightOfString(text, { width: contentWidth, font: 'Helvetica', size: 8.5 });
  const totalHeight = 16 + textHeight + (padding * 2);
  const curY = doc.y + 3;

  doc.rect(40, curY, width, totalHeight).fillAndStroke(bg, border);
  doc.fontSize(9).font('Helvetica-Bold').fillColor(titleColor).text(title, 48, curY + padding);
  doc.fontSize(8.5).font('Helvetica').fillColor(SECONDARY).text(text, 48, curY + padding + 13, {
    width: contentWidth,
    lineGap: 1.8
  });
  doc.y = curY + totalHeight + 4;
}

// ==============================================================================
// PAGE 1: RUBRIC OVERVIEW & GITHUB PUBLICATION
// ==============================================================================
newPage();

// Title Block
doc.fontSize(18).font('Helvetica-Bold').fillColor(PRIMARY).text('AfriSolve AI — Final Project Prototype');
doc.fontSize(10.5).font('Helvetica').fillColor(MUTED).text('Summative Software Prototype: Complete Submission & Deployment Guide', { lineGap: 2 });
doc.moveDown(0.2);

// Metadata Box
doc.rect(40, doc.y, doc.page.width - 80, 44).fillAndStroke('#f8fafc', BORDER_COLOR);
const mY = doc.y + 5;
doc.fontSize(8.5).font('Helvetica-Bold').fillColor(PRIMARY).text('Student Name:', 50, mY);
doc.font('Helvetica').fillColor(SECONDARY).text('Chibuzor Moses Uzowuru', 125, mY);
doc.font('Helvetica-Bold').fillColor(PRIMARY).text('Course Deliverable:', 50, mY + 12);
doc.font('Helvetica').fillColor(SECONDARY).text('Final Project: Software Prototype [S:A] (Summative Assessment)', 145, mY + 12);
doc.font('Helvetica-Bold').fillColor(PRIMARY).text('Target Total Score:', 50, mY + 24);
doc.font('Helvetica').fillColor(SECONDARY).text('30 Points (System Requirements, Presentation, Code Availability, Deployment, Operation)', 145, mY + 24);
doc.y = mY + 41;

heading1('1. Assessment Rubric Breakdown (30 Points Total)');
paragraph('Source: Final Project_ Software Prototype [S_A].pdf. Full rubric marks require concrete proof of execution:');

const tableY = doc.y + 2;
doc.rect(40, tableY, doc.page.width - 80, 16).fill(PRIMARY);
doc.fontSize(8.5).font('Helvetica-Bold').fillColor('#ffffff')
   .text('Criteria', 50, tableY + 4)
   .text('Max Pts', 225, tableY + 4)
   .text('Required Evidence for Top Marks (Band A)', 280, tableY + 4);

const rubricRows = [
  ['Reflections of Requirements', '10 pts', 'Captures all user functionalities highlighted in the SRS & system design (FR1–FR10 & BR1–BR8). Full problem → vote → verify → AI → project lifecycle.'],
  ['Presentation', '5 pts', 'Audible, clear 5–10 min video articulating problem, why it matters, proposed solution, and full interactive demo.'],
  ['Code Availability', '5 pts', 'Public GitHub repo; comprehensive step-by-step setup README allowing clean recreation.'],
  ['Solution Deployment', '5 pts', 'Live public URL accessible from anywhere on the internet (not localhost).'],
  ['Operation', '5 pts', 'Seamlessly functioning authentication, forms, buttons, redirections, and protected workflows.']
];

let curRowY = tableY + 16;
rubricRows.forEach((r, idx) => {
  const rowHeight = 22;
  const bg = idx % 2 === 0 ? '#f8fafc' : '#ffffff';
  doc.rect(40, curRowY, doc.page.width - 80, rowHeight).fillAndStroke(bg, BORDER_COLOR);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(SECONDARY).text(r[0], 50, curRowY + 5, { width: 165 });
  doc.font('Helvetica-Bold').fontSize(8).fillColor(PRIMARY).text(r[1], 225, curRowY + 5);
  doc.font('Helvetica').fontSize(7.5).fillColor(SECONDARY).text(r[2], 280, curRowY + 3, { width: doc.page.width - 80 - 245, lineGap: 1.2 });
  curRowY += rowHeight;
});
doc.y = curRowY + 5;

callout('Zero-Tolerance Warning on Submission Links', 'The course instructions warn: "Make sure all the links are working correctly and your google doc has access granted. Any incorrect links that end up not working or opening during grading will be graded Zero/0 points." Test all 4 deliverables in a signed-out browser window.', 'warn');

heading1('2. Step 1: Push Codebase to a Public GitHub Repository (5 Pts)');
paragraph('The local repository is initialized and committed on branch "main" (Commit e10d2a9). Follow these steps:');
bullet('Go to https://github.com/new and create a repository named "AfriSolve-AI".', 'Create Repo: ');
bullet('Select PUBLIC. Leave "Add a README file", ".gitignore", and license UNCHECKED.', 'Public Visibility: ');
bullet('Run the following commands in your terminal to link and push your code:', 'Link & Push: ');
codeBox('cd /home/wurucyber/AfriSolve-AI\ngit remote add origin https://github.com/<your-github-username>/AfriSolve-AI.git\ngit push -u origin main');
bullet('Open https://github.com/<your-github-username>/AfriSolve-AI in an Incognito/Private window. Confirm that the README renders cleanly and all source files are visible.', 'Verify Signed-Out: ');

// ==============================================================================
// PAGE 2: DEPLOYMENT GUIDE (RENDER & FLY.IO)
// ==============================================================================
newPage();

heading1('3. Step 2: Deploy to a Public URL (5 Pts)');
paragraph('The rubric requires a publicly accessible URL reachable over the internet. AfriSolve AI is packaged with a multi-stage Dockerfile and embedded PostgreSQL (PGlite).');

heading2('Recommended Host: Render.com (Free & Zero-Config Docker)');
paragraph('Render provides free Docker web service hosting with persistent disk support:');
bullet('Navigate to https://dashboard.render.com and click New + > Web Service.', 'Create Web Service: ');
bullet('Connect your public GitHub repository "AfriSolve-AI".', 'Connect GitHub: ');
bullet('Configure Build & Runtime Settings:', 'Service Settings: ');
doc.moveDown(0.1);
doc.fontSize(8.5).font('Helvetica').fillColor(SECONDARY).text(
  '   • Name: afrisolve-ai (or your preferred name)\n' +
  '   • Runtime: Docker (Render automatically detects the root Dockerfile)\n' +
  '   • Region: Choose closest region (e.g., Frankfurt or Oregon)\n' +
  '   • Instance Type: Free tier',
  { lineGap: 2 }
);
bullet('Under Environment Variables, add the following production settings:', 'Environment Variables: ');
codeBox(
  'NODE_ENV=production\n' +
  'DEMO_MODE=false\n' +
  'SESSION_SECRET=c3f1b4a890e2d5c7f8a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f607\n' +
  'DATA_DIR=/app/data'
);
bullet('Add a Persistent Disk under the Disks tab. Name: "afrisolve_data", Mount Path: "/app/data", Size: 1 GB. This ensures that created user accounts, problem validations, and projects survive restarts.', 'Persistent Disk: ');
bullet('Click Create Web Service. Render will build and deploy the container (approx. 2–3 minutes).', 'Deploy: ');
bullet('Bootstrap Grading Administrator Account. Once the service is live, open the Render "Shell" tab and run:', 'Initialize Grader Admin: ');
codeBox('ADMIN_EMAIL=admin@afrisolve.org ADMIN_PASSWORD=SecureGrading2026! node server/bootstrap-admin.js');

heading2('Alternative Host: Fly.io CLI Deployment');
paragraph('If you prefer Fly.io, run these commands from the project directory:');
codeBox(
  '# Authenticate and launch container\n' +
  'fly launch --dockerfile Dockerfile --name afrisolve-ai\n' +
  'fly volumes create afrisolve_data --size 1\n' +
  'fly secrets set NODE_ENV=production DEMO_MODE=false SESSION_SECRET=c3f1b4a890e2d5c7f8a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f607 DATA_DIR=/app/data\n' +
  'fly deploy'
);

callout('Testing Your Public Deployment', 'Open your deployed URL (e.g. https://afrisolve-ai.onrender.com) on your phone or in an incognito window. Verify that you can register a new account, sign in as the administrator, and browse problems.', 'tip');

// ==============================================================================
// PAGE 3: DEMONSTRATION VIDEO CUE SHEET (8–9 MINUTES)
// ==============================================================================
newPage();

heading1('4. Step 3: Record the 5–10 Minute Demo Video (5 Pts)');
paragraph('The assignment requires a self-recorded video clip between 5 and 10 minutes with your audible voice. Use OBS Studio, Open Screen, or SimpleScreenRecorder. Target 8 to 9 minutes following this exact cue sheet:');

const videoSteps = [
  ['0:00–0:55', 'System & Problem', 'Introduce yourself (Chibuzor Moses Uzowuru). State problem: solution-first development in Africa where software fails due to lack of local evidence and community validation. Introduce AfriSolve AI.'],
  ['0:55–1:40', 'Actors & Security', 'Highlight SRS/UML actors (Innovator, Researcher, Mentor, Admin). Show registration, demo mailbox preview (explaining real SMTP requirement), profile editor, and session security.'],
  ['1:40–2:45', 'Problem Repository', 'Filter by 8 sectors and 14 countries. Submit a new evidence-bearing problem ("Unreliable cold storage for rural cooperative"). Show claim vs evidence separation and author edit ability.'],
  ['2:45–3:40', 'Community Validation', 'Show two independent votes (BR3). Show that project creation is blocked before verification (BR5). Log in as Admin and approve/verify the problem (BR4).'],
  ['3:40–4:35', 'AI Decision Support', 'Query the AI research module. Explain honest labelling of local heuristic fallback vs live Ollama. Highlight SDG mapping, literature links, and feasibility recommendations.'],
  ['4:35–6:10', 'Project Collaboration', 'Create project from verified problem. Invite team member. Manage tasks on Kanban board (Todo/Doing/Done) and observe progress bar update. Upload file and view activity log.'],
  ['6:10–7:05', 'Mentorship & Alerts', 'Search mentor directory. Submit mentorship request. Switch to mentor account to accept and add review feedback. Inspect in-app notification center.'],
  ['7:05–8:00', 'Analytics & Admin', 'Show live database aggregate metrics. Download PDF and CSV reports. Switch to Admin: user activation toggles, audit logs, backup creation, and safe transactional restore.'],
  ['8:00–8:45', 'Architecture & Close', 'Summarize React 19 + Express 5 + PGlite architecture. State academic boundaries. Conclude by referencing the 4 published links in your Google Doc.']
];

videoSteps.forEach(s => {
  doc.fontSize(8.5).font('Helvetica-Bold').fillColor(PRIMARY).text(s[0] + '  ', { continued: true });
  doc.font('Helvetica-Bold').fillColor(SECONDARY).text(s[1] + ': ', { continued: true });
  doc.font('Helvetica').fillColor(SECONDARY).text(s[2], { lineGap: 1.5 });
});

doc.moveDown(0.2);
callout('Recording Recommendations', '• Speak at a deliberate, confident pace.\n• Rehearse once before recording.\n• Upload the finished video to YouTube (Unlisted/Public) or Google Drive.\n• Ensure Drive video permissions are set to "Anyone with the link can view".', 'tip');

// ==============================================================================
// PAGE 4: REQUIREMENTS VERIFICATION & GOOGLE DOC SUBMISSION
// ==============================================================================
newPage();

heading1('5. Step 4: System Requirements & Verification (10 + 5 Pts)');
paragraph('AfriSolve AI fulfills all functional requirements (FR1–FR10) and business rules (BR1–BR8):');

const moduleSummary = [
  ['FR1: Discovery & Submission', '8 sectors, 14 countries, SDG tags, evidence fields, author edit before verification.'],
  ['FR2: Community Validation', 'Multi-user independent voting, discussion comments, flag/report mechanism.'],
  ['FR3: AI Decision Support', 'Contextual research synthesis, SDG alignment, honest heuristic fallback labelling.'],
  ['FR4: Project Workspace', 'Verified-only creation, Kanban tasks, progress calculation, document attachments.'],
  ['FR5: Mentorship Matching', 'Expertise directory, structured requests, accept/decline, review feedback.'],
  ['FR6: Notifications & Alerts', 'In-app notification center, daily due-date reminders, demo mailbox preview.'],
  ['FR7: Analytics & Reporting', 'Real-time database aggregates, sector/country distributions, PDF & CSV export.'],
  ['FR8: Administration & Audit', 'Role governance, account activation, content review queue, immutable audit logs.'],
  ['FR9: Automated Backups', 'Daily automated schedule, manual snapshots, safe transactional restore.'],
  ['FR10: User Profile & Security', 'Email verification, scrypt password hashing, HTTP-only cookies, base64 photo validation.']
];

moduleSummary.forEach(m => {
  doc.fontSize(8).font('Helvetica-Bold').fillColor(PRIMARY).text('• ' + m[0] + ': ', { continued: true });
  doc.font('Helvetica').fillColor(SECONDARY).text(m[1], { lineGap: 1.2 });
});

doc.moveDown(0.2);
callout('Automated Test Suite Evidence (100% Passed)', '• Backend API Tests: 13/13 passed (node --test tests/api.test.js tests/backend-*.test.js)\n• UI Vitest Tests: 12/12 passed (vitest run)\n• Playwright E2E Tests: 3/3 passed (full browser navigation, lifecycle, and 390px mobile viewport)\n• Vite Client Build: Clean production build in 1.04s', 'tip');

heading1('6. Step 5: Prepare Google Doc Deliverable & 4 Mandatory Links');
paragraph('Create a Google Document titled with the required name structure:');
codeBox('Chibuzor_Moses_Uzowuru_[Summative]_[09302026]');
paragraph('Include the four verified links in the document:');
bullet('https://youtu.be/your-video-id (or Google Drive share link)', '1. Demonstration Video URL: ');
bullet('https://github.com/<your-username>/AfriSolve-AI', '2. Public GitHub Repository URL: ');
bullet('https://drive.google.com/file/d/your-srs-doc-id/view?usp=sharing', '3. SRS Document Link: ');
bullet('https://afrisolve-ai.onrender.com (or your hosting URL)', '4. Public Application URL: ');

heading1('7. Final Pre-Submission Inspection Checklist');
const checklist = [
  'Google Doc sharing set to "Anyone with the link can view".',
  'GitHub repository visibility is PUBLIC (tested in an incognito window).',
  'GitHub README contains complete step-by-step setup instructions.',
  'Deployed URL is live, reachable over HTTPS, and accessible from an outside device.',
  'Grading administrator account initialized on the live deployment.',
  'Demonstration video is 5–10 minutes, audible, and plays without requiring login.',
  'SRS document link opens to Assignment 1 / 2 without permission errors.',
  'All 4 links in the Google Doc have been tested and verified in a private window.'
];

checklist.forEach(c => {
  doc.fontSize(8).font('Helvetica').fillColor(SECONDARY).text('[  ]  ' + c, { lineGap: 1.8 });
});

// ==============================================================================
// FOOTER (ALL PAGES)
// ==============================================================================
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  // Suppress automatic page addition by temporarily removing bottom margin
  doc.page.margins.bottom = 0;
  doc.fontSize(7.5).font('Helvetica').fillColor(MUTED).text(
    `AfriSolve AI — Final Project Software Prototype Submission Guide | Student: Chibuzor Moses Uzowuru | Page ${i + 1} of ${range.count}`,
    40,
    doc.page.height - 24,
    { align: 'center', width: doc.page.width - 80 }
  );
}

doc.end();

stream.on('finish', () => {
  console.log(`PDF successfully generated: ${targetPdf} (Total Pages: ${range.count})`);
});
