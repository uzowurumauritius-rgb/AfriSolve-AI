export function installNotifications(c){
 const {store}=c;let draining=null;
 // SMTP runs outside the state lock. The in-app notification is authoritative;
 // email is best-effort, with persisted honest acceptance/failure status.
 c.flushNotifications=()=>draining??=drain().finally(()=>{draining=null;});
 async function drain(){
  const jobs=await store.exclusive(async()=>store.state.notifications.filter(n=>n.emailStatus==='pending').map(n=>{const u=store.state.users.find(u=>u.id===n.userId&&u.active&&u.verified);return {id:n.id,to:u?.email,subject:n.title,body:n.body,link:n.link};}));
  for(const job of jobs){let status;
   if(!job.to)status='skipped: recipient inactive';
   else try{status=await c.sendMail(job.to,job.subject,`${job.body}\nOpen AfriSolve: ${c.appOrigin??'http://127.0.0.1:5173'}/#${job.link||'/notifications'}`);}catch{status='failed: email unavailable (in-app notification retained)';}
   await store.exclusive(async()=>{const n=store.state.notifications.find(n=>n.id===job.id);if(n){n.emailStatus=status;n.emailAttemptedAt=c.stamp();await store.save();}});
  }
 }
 c.runReminderSchedule=async()=>{
  const count=await store.exclusive(async()=>{const now=c.now(),day=new Date(now).toISOString().slice(0,10);let count=0;
   for(const p of store.state.projects.filter(p=>!['completed','archived'].includes(p.status)))for(const task of p.tasks){if(task.status==='done'||!task.dueDate||task.reminderDay===day)continue;const due=Date.parse(task.dueDate+'T23:59:59Z');if(due>now+172800000)continue;task.reminderDay=day;c.notify(task.assigneeId,due<now?'Task overdue':'Task due soon',`${p.name}: ${task.title} (due ${task.dueDate})`,'/projects/'+p.id);count++;}
   for(const m of store.state.mentorships){const meeting=Date.parse(m.meetingAt);if(m.status!=='accepted'||!Number.isFinite(meeting)||meeting<now||meeting>now+86400000||m.reminderDay===day)continue;m.reminderDay=day;for(const uid of [m.mentorId,m.requesterId])c.notify(uid,'Mentorship meeting reminder',`Your meeting is scheduled for ${m.meetingAt}`,'/mentors');count++;}
   await store.save();return count;
  });await c.flushNotifications();return count;
 };
 let timer;if(c.options.scheduler!==false){timer=setInterval(()=>c.runReminderSchedule().catch(()=>console.error('Reminder delivery failed; in-app records retained.')),60000);timer.unref();}
 c.stopNotifications=()=>clearInterval(timer);
}
