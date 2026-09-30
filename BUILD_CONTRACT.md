# AfriSolve AI — implementation contract

Owner: Chibuzor Moses Uzowuru. Build a real working academic prototype, not a mockup. Source requirements are the three PDFs in /home/wurucyber/Downloads. Public release requires later confirmation. Local bind 127.0.0.1:5173. Never read secrets or alter other projects. No commits/pushes.

## Stack and scope
React + Vite client, Express 5 ESM API, durable embedded PostgreSQL via @electric-sql/pglite (single-instance prototype), JSON API. Real server-side RBAC, sessions, input validation, password hashing. SMTP and external AI configurable through environment, never false claims of delivered email or live AI. In local demo mode only, safe demo persona sessions and recipient-specific mail preview support recording without passwords. Production mode must forbid demo auth and mail preview. Clearly label all seed data fictional. Requirements FR1–FR10 and BR1–BR8 must be represented in working UI/API.

## Ownership
Backend agent owns server/** and tests/api.test.js, tests/backend-*.test.js. Frontend agent owns src/**, index.html, vite.config.js, tests/ui*.test.*. Parent owns package.json, docs/**, scripts/**, packaging and independent QA. Backend may add needed dependencies only by notifying parent. Do not rewrite files owned by another agent.

## API contract
All JSON errors {error: human readable string}. Responses below are plain objects/arrays (no data wrapper). All ids strings. Fields camelCase. API prefix /api. Use HTTP-only cookie session. Client fetch credentials same-origin; API origin-check unsafe requests (allow absent origin for tests, reject non-matching Origin). JSON requests. CSRF via same-site cookie plus strict origin/content-type checking. Auth middleware must check active user + idle timeout 30 minutes. Unauthorized 401, forbidden 403, bad inputs 400/409/422. GET /api/config returns {demoMode,aiMode,emailMode,roles,sectors,countries,verificationThreshold}.

### Authentication and profile
GET /auth/me -> {user:null|User}. User {id,name,email,role,country,institution,bio,expertise,avatar,verified,active}.
POST /auth/register {name,email,password,country,institution,role} -> {message,email}; only non-admin roles; email verification required.
POST /auth/login {email,password,remember} -> {user}; POST /auth/logout -> {ok:true}.
POST /auth/verify {token} -> {message}; POST /auth/forgot {email} -> {message}; POST /auth/reset {token,password} -> {message}.
GET /demo/personas -> User[]; POST /demo/login {id} -> {user} (demo-only seeded accounts only); GET /demo/mail?email=... -> [{id,to,subject,text,createdAt}] demo-only, fictional @afrisolve.demo recipients only.
PATCH /profile {name,country,institution,bio,expertise,avatar} -> User.

### Repository and community
GET /problems?q=&sector=&country=&status=&sdg=&priority=&region=&since=&sort= -> Problem[]. Each {id,title,description,evidence,sector,country,region,sdg,priority,status,authorId,authorName,score,voted,createdAt,commentsCount}. Status pending/verified/rejected/archived.
POST /problems {title,description,evidence,sector,country,region,sdg,priority} -> Problem.
GET /problems/:id -> Problem plus {comments:[{id,userId,userName,text,createdAt}],similar:Problem[]}.
PATCH /problems/:id same editable fields (author before verified only) -> Problem.
POST /problems/:id/vote {} toggles unique vote -> {score,voted}.
POST /problems/:id/comments {text} -> comment.
POST /problems/:id/flag {reason} -> {ok:true}.
Admin approval MUST require >=2 distinct non-author community votes, BR3+BR4 combined. Score alone never bypasses admin gate.

### AI
POST /research {problemId?,question} -> {id,mode,summary,classification,sdgs:[],literature:[{title,url}],similar:[],approaches:[],cautions:[],createdAt}. GET /research -> prior records owned by user. Working contextual offline NLP fallback (explicitly local heuristic, not fake generative AI) plus optional real provider integration with timeout and honest error status. No fabricated papers; literature links are search/catalogue entry points unless verified publications.

### Projects and collaboration
GET /projects -> Project[] (member/leader scoped); Project {id,name,description,problemId,problemTitle,leaderId,status,progress,milestones,createdAt,teamName}.
POST /projects {problemId,name,description,teamName} (verified problems only) -> Project.
GET /projects/:id -> Project plus {members:User[],tasks:Task[],messages:[],documents:[],activities:[],invitations:[]}.
PATCH /projects/:id {status,milestones} -> Project.
POST /projects/:id/invitations {email} -> invitation; GET /invitations -> []; POST /invitations/:id/respond {accept:boolean} -> {ok:true}.
POST /projects/:id/tasks {title,assigneeId,dueDate} -> Task {id,title,assigneeId,assigneeName,dueDate,status}; PATCH /projects/:id/tasks/:taskId {status} todo/doing/done -> Task.
POST /projects/:id/messages {text} -> {id,userName,text,createdAt}.
POST /projects/:id/documents {name,content,mime} -> document (base64 content, limit 2MB, allow PDF/text/png/jpeg/csv only). GET /projects/:id/documents/:documentId -> authenticated attachment.

### Mentors
GET /mentors?q= -> User[] with expertise,bio; POST /mentors/register {expertise,bio} -> User (role mentor).
GET /mentorships -> [{id,mentorId,mentorName,requesterId,requesterName,projectId,message,status,meetingAt,feedback}].
POST /mentorships {mentorId,projectId?,message} -> mentorship.
PATCH /mentorships/:id {status,meetingAt?,feedback?} accept/decline values accepted/declined; assigned mentor only.

### Notifications and analytics
GET /notifications -> [{id,title,body,read,createdAt,link}]; PATCH /notifications/:id {read:true} -> notification.
GET /analytics -> {users,problems,verified,projects,completedTasks,totalTasks,researchSessions,mentorships,sectors:[{name,count}],countries:[{name,count}],recentActivity:[]} with clear sample-data note.
GET /reports?format=csv|pdf&projectId=... -> download (project membership enforced). Optional no projectId platform aggregate only.

### Admin
GET /admin -> {users:User[],problems:Problem[],flags:[],audit:[],backups:[],settings:{backupEnabled,backupHour}}.
PATCH /admin/users/:id {role?,active?} -> User; protect last admin and self lockout.
PATCH /admin/problems/:id {status,reason?} -> Problem; approved status verified requires threshold; allow rejected/archived.
POST /admin/flags/:id/resolve {} -> {ok:true}.
POST /admin/backups {} -> {id,createdAt}; POST /admin/backups/:id/restore {confirmation:"RESTORE"} -> {ok:true}, safe transactional restore, sessions invalidated, audit preserved.
PATCH /admin/settings {backupEnabled,backupHour} -> settings. Schedule real daily backups while process running, configurable retention, backups not public, never returned raw.
GET /health -> {status:"ok"} public.

## Frontend design
Polished light editorial / professional dashboard. Deep forest green primary #145c43, lime accent #d9f279, off-white #f6f7f2, black-green text, fine neutral borders, generous white space; sidebar navigation, clear module labels. No dependency on external fonts/images. Responsive at 390px. Actual forms with labels, feedback, empty/loading/error states; no placeholder buttons. Accessible focus/contrast. All 10 modules navigable. Landing/login shows mission and fictional-data/demo disclaimer; one-click fictional persona demo entry only when config.demoMode. Secure standard login/signup/verify/recovery also supported. Notifications/invitations visible. UI shows profile, document upload/download, export CSV/PDF, mentor accept/decline, admin controls, backup restore confirmation, AI mode. Don't auto-switch between roles silently. React escaping, never dangerouslySetInnerHTML.

## Verification
Use node:test + supertest for API, Vitest/testing-library frontend where practical, Playwright end-to-end parent. Strict TDD vertical slices: write failing behavior test, run RED, implement, run GREEN, repeat; record evidence. No invented test results. Make npm test run all API tests and npm run build compile client. Parent performs browser screenshots and full workflow verification.
