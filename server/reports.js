import PDFDocument from 'pdfkit';
import {oneOf} from './core.js';

const cell=value=>{let s=String(value??'');if(/^[\s]*[=+\-@]/.test(s)||/^[\t\r\n]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
export function installReports(c){
 const {route,store}=c;
 function analytics(user){
  const s=store.state, projects=s.projects.filter(p=>p.memberIds.includes(user.id)),tasks=projects.flatMap(p=>p.tasks);
  const group=key=>Object.entries(s.problems.reduce((out,p)=>{out[p[key]]=(out[p[key]]??0)+1;return out;},Object.create(null))).map(([name,count])=>({name,count}));
  return {users:s.users.filter(u=>u.active).length,problems:s.problems.length,verified:s.problems.filter(p=>p.status==='verified').length,projects:projects.length,completedTasks:tasks.filter(t=>t.status==='done').length,totalTasks:tasks.length,researchSessions:s.research.filter(r=>r.userId===user.id).length,mentorships:s.mentorships.filter(m=>m.mentorId===user.id||m.requesterId===user.id).length,sectors:group('sector'),countries:group('country'),recentActivity:projects.flatMap(p=>p.activities.map(a=>({...a,projectName:p.name}))).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,20),note:c.demoMode?'Includes explicitly fictional demonstration data. Private project, task, research and mentorship counts are scoped to your access.':'Actual persisted data. Private project, task, research and mentorship counts are scoped to your access.'};
 }
 route('get','/analytics',true,req=>analytics(req.user));
 route('get','/reports',true,async(req,res)=>{
  const format=oneOf(req.query.format??'csv',['csv','pdf'],'report format');let rows,title;
  if(req.query.projectId){const p=c.project(req.query.projectId,req.user);title=`Project report: ${p.name}`;rows=[['Project',p.name],['Description',p.description],['Status',p.status],['Progress',`${c.projectView(p).progress}%`],['Team',p.teamName],['Problem',c.problem(p.problemId).title],[],['Task','Status','Due date','Assignee'],...p.tasks.map(t=>[t.title,t.status,t.dueDate,store.state.users.find(u=>u.id===t.assigneeId)?.name??'Unassigned']),[],['Milestone','Completed'],...p.milestones.map(m=>[m.title,m.completed?'Yes':'No'])];}
  else{title='AfriSolve analytics report';const a=analytics(req.user);rows=[['Metric','Count'],...Object.entries(a).filter(([,v])=>typeof v==='number'),[],['Sector','Problems'],...a.sectors.map(g=>[g.name,g.count]),[],['Country','Problems'],...a.countries.map(g=>[g.name,g.count])];}
  const note=analytics(req.user).note;rows.push([],['Note',note],['Generated at',c.stamp()]);
  if(format==='csv'){res.type('text/csv');res.attachment('afrisolve-report.csv');return {download:Buffer.from('\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n'))};}
  const doc=new PDFDocument({size:'A4',margin:48,info:{Title:title,Author:'AfriSolve AI'}});const chunks=[];const ready=new Promise((resolve,reject)=>{doc.on('data',chunk=>chunks.push(chunk));doc.on('end',()=>resolve(Buffer.concat(chunks)));doc.on('error',reject);});doc.fontSize(18).text(title);doc.moveDown();doc.fontSize(10);for(const row of rows)doc.text(row.join(' | ')||' ');doc.end();res.type('application/pdf');res.attachment('afrisolve-report.pdf');return {download:await ready};
 });
}
