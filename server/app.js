import express from 'express';
import { installAuth } from './auth.js';
import { installRepository } from './repository.js';
import { installProjects } from './projects.js';
import { installMentors } from './mentors.js';
import { installResearch } from './research.js';
import { installAdmin } from './admin.js';
import { installReports } from './reports.js';
import { installNotifications } from './notifications.js';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { resolve } from 'node:path';
import { roles,sectors,countries,id,hash,token,fail,text,publicUser,openStore,avatar,passwordHash } from './core.js';

/** createApp({dataDir, demoMode, production, now, scheduler, sessionSecret,
 * smtp, aiKey, backupRetention, authRateLimit}): Promise<{app,close,store}>.
 * dataDir defaults to ./data/postgres; memory:// isolates tests. now is an
 * injectable millisecond clock. scheduler:false disables background backups.
 * Production requires sessionSecret (32+ chars); demo mode is forbidden there.
 * Never expose store outside trusted application code. */
export async function createApp(options={}) {
 const production=options.production??process.env.NODE_ENV==='production';
 const demoMode=options.demoMode??(!production&&process.env.DEMO_MODE!=='false');
 const secret=options.sessionSecret??process.env.SESSION_SECRET;
 if(production&&(demoMode||!secret||secret.length<32))throw new Error('Production requires demo mode disabled and SESSION_SECRET of at least 32 characters');
 const now=options.now??Date.now;
 const store=await openStore(options.dataDir??resolve('data/postgres'),demoMode,now());
 const app=express();app.set('trust proxy',1);app.disable('x-powered-by');app.use(helmet({contentSecurityPolicy:{directives:{'upgrade-insecure-requests':production?[]:null}}}));
 app.use((req,res,next)=>{res.set('Cache-Control','no-store');if(!['GET','HEAD','OPTIONS'].includes(req.method)){const origin=req.get('origin');if(origin){const host=req.get('host');if(origin!==`${req.protocol}://${host}`&&origin!==`https://${host}`&&origin!==`http://${host}`)return res.status(403).json({error:'Cross-origin request rejected'});}if(!req.is('application/json'))return res.status(415).json({error:'JSON content type required'});}next();});
 app.use(express.json({limit:'3mb',strict:true}));
 const limiter=rateLimit({windowMs:15*60*1000,limit:options.authRateLimit??100,standardHeaders:'draft-8',legacyHeaders:false,message:{error:'Too many attempts. Try again later.'}});
 app.use('/api/auth',limiter);app.use('/api/demo/login',limiter);
 const cookieName=production?'__Host-afrisolve':'afrisolve';
 const stamp=()=>new Date(now()).toISOString();
 const ctx={app,store,options,production,demoMode,now,stamp};
 function route(method,path,access,handler){app[method]('/api'+path,async(req,res,next)=>{try{const output=await store.exclusive(async()=>{const snapshot=structuredClone(store.state);try{const s=store.state;const raw=(req.headers.cookie??'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1);const session=s.sessions.find(x=>x.key===hash(raw??''));let user=session&&s.users.find(u=>u.id===session.userId);if(session&&(now()-session.lastSeen>=1800000||now()>=session.expiresAt||!user?.active||!user?.verified)){s.sessions=s.sessions.filter(x=>x!==session);user=null;}if(user)session.lastSeen=now();req.user=user??null;req.session=session; if(access&&!user)fail(401,'Sign in required');if(access==='admin'&&user.role!=='admin')fail(403,'Administrator access required');const result=await handler(req,res);await store.save();return result;}catch(e){store.state=snapshot;throw e;}});if(!res.headersSent){if(output?.download)res.send(output.download);else res.json(output??{ok:true});}}catch(e){next(e);}});}
 Object.assign(ctx,{route,session(req,res,u,remember=false){store.state.sessions=store.state.sessions.filter(x=>x.expiresAt>now()&&now()-x.lastSeen<1800000);const raw=token();store.state.sessions.push({key:hash(raw),userId:u.id,lastSeen:now(),expiresAt:now()+(remember?30:1)*86400000});res.cookie(cookieName,raw,{httpOnly:true,secure:production,sameSite:'strict',path:'/',...(remember?{maxAge:30*86400000}:{})});},audit(user,action,target){store.state.audit.push({id:id(),userId:user?.id??null,userName:user?.name??'System',action,target,createdAt:stamp()});},notify(userId,title,body,link=''){store.state.notifications.push({id:id(),userId,title,body,link,read:false,emailStatus:'pending',createdAt:stamp()});}});
 route('get','/health',false,()=>({status:'ok'}));
 route('get','/config',false,()=>({demoMode,aiMode:ctx.aiMode,emailMode:ctx.emailMode,roles,sectors,countries,verificationThreshold:2}));
 route('get','/auth/me',false,req=>({user:publicUser(req.user)}));
 route('post','/auth/logout',false,(req,res)=>{store.state.sessions=store.state.sessions.filter(x=>x!==req.session);res.clearCookie(cookieName,{path:'/',httpOnly:true,sameSite:'strict',secure:production});return {ok:true};});
 route('get','/demo/personas',false,()=>{if(!demoMode)fail(404,'Not found');return store.state.users.filter(u=>u.demo&&u.active).map(publicUser);});
 route('post','/demo/login',false,(req,res)=>{if(!demoMode)fail(404,'Not found');const u=store.state.users.find(u=>u.id===req.body.id&&u.demo&&u.active);if(!u)fail(400,'Unknown demo persona');ctx.session(req,res,u);return {user:publicUser(u)};});
 route('patch','/profile',true,req=>{const u=req.user;for(const field of ['name','country','institution','bio','expertise','avatar'])if(req.body[field]!==undefined){u[field]=field==='avatar'?avatar(req.body[field]):text(req.body[field],field,2000,field==='name'?2:0);}return publicUser(u);});
 route('get','/notifications',true,req=>store.state.notifications.filter(x=>x.userId===req.user.id).reverse());
 installAuth(ctx);
 installRepository(ctx);
 installProjects(ctx);
 installMentors(ctx);
 installResearch(ctx);
 installAdmin(ctx);
 installReports(ctx);
 installNotifications(ctx);
 const autoAdminEmail=process.env.ADMIN_EMAIL||(production?'admin@afrisolve.org':null);
 const autoAdminPass=process.env.ADMIN_PASSWORD||(production?'SecureGrading2026!':null);
 if(autoAdminEmail&&autoAdminPass&&!store.state.users.some(u=>u.email===autoAdminEmail)){
  const hash=await passwordHash(autoAdminPass);
  store.state.users.push({id:id(),name:process.env.ADMIN_NAME||'Platform Administrator',email:autoAdminEmail,passwordHash:hash,role:'admin',country:process.env.ADMIN_COUNTRY||'Nigeria',institution:'AfriSolve Administration',bio:'Platform administrator account for grading.',expertise:'Platform governance, moderation, verification',avatar:'',verified:true,active:true,demo:false,createdAt:stamp()});
 }
 await store.save();
 app.use((err,req,res,next)=>{if(res.headersSent)return next(err);res.status(err.status??500).json({error:err.status?err.message:'An internal error occurred'});});
 return {app,store,runBackupSchedule:ctx.runBackupSchedule,runReminderSchedule:ctx.runReminderSchedule,flushNotifications:ctx.flushNotifications,async close(){ctx.stopSchedule?.();ctx.stopNotifications?.();await store.close();}};
}
