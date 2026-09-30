import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi, afterEach, beforeEach, test, expect } from 'vitest';
import App from '../src/App.jsx';
const user = {id:'u1', name:'Amina Demo', email:'amina@afrisolve.demo',role:'researcher',verified:true,country:'Nigeria'};
const config = {demoMode:true,aiMode:'offline',emailMode:'preview',roles:['student','researcher','mentor','admin'],sectors:['Agriculture','Health'],countries:['Nigeria','Kenya'],verificationThreshold:2};
let requests=[];
function mockAPI(routes={}) { global.fetch=vi.fn(async (url,options={})=>{ const path=String(url).replace('/api',''); requests.push({path, ...options,body:options.body?JSON.parse(options.body):undefined}); const value=routes[`${options.method||'GET'} ${path}`]??routes[path]??({'/config':config,'/auth/me':{user},'/analytics':{},'/notifications':[], '/invitations':[], '/problems':[], '/projects':[], '/research':[], '/mentors?q=':[], '/mentorships':[]}[path])??[]; return {ok:!value.error,status:value.error?400:200,json:async()=>value}; }); }
beforeEach(()=>{window.scrollTo=vi.fn();requests=[];window.location.hash='';mockAPI();});
afterEach(()=>{cleanup();window.history.replaceState({},'', '/');});
function input(label,value){fireEvent.change(screen.getByLabelText(label),{target:{value}});}
function go(path){act(()=>{window.location.hash=path;window.dispatchEvent(new Event('hashchange'));});}
test('notifications mark a server record read and profile edits persist',async()=>{
 mockAPI({'/notifications':[{id:'n1',title:'Invitation received',body:'Join a team',read:false,link:'/projects'}], 'PATCH /notifications/n1':{id:'n1',read:true}, 'PATCH /profile':{...user,name:'Amina Updated'}});
 go('/notifications');render(<App/>);fireEvent.click(await screen.findByRole('button',{name:'Mark as read'}));
 await waitFor(()=>expect(requests.find(r=>r.path==='/notifications/n1').body).toEqual({read:true}));
 go('/profile');await screen.findByLabelText('Full name');input('Full name','Amina Updated');fireEvent.click(screen.getByRole('button',{name:'Save profile'}));
 expect(await screen.findByText('Profile saved.')).toBeInTheDocument();expect(requests.find(r=>r.path==='/profile').body.name).toBe('Amina Updated');
});
test('overview uses live metrics and links to the actual repository and projects',async()=>{
 mockAPI({'/analytics':{users:12,problems:8,verified:3,projects:2,completedTasks:1,totalTasks:4},'/problems':[{id:'p2',title:'Solar cold storage',sector:'Agriculture',status:'verified'}],'/projects':[{id:'j2',name:'Harvest pilot',progress:25,status:'active'}]});
 render(<App/>);
 expect(await screen.findByRole('heading',{name:'Welcome back, Amina.'})).toBeInTheDocument();
 expect(await screen.findByText('12')).toBeInTheDocument();
 expect(await screen.findByRole('link',{name:'Solar cold storage'})).toHaveAttribute('href','#/problems/p2');
 expect(await screen.findByRole('link',{name:/Harvest pilot/})).toHaveAttribute('href','#/projects/j2');
});
test('analytics renders server aggregates and membership-scoped report links',async()=>{
 mockAPI({'/analytics':{users:12,problems:8,verified:3,projects:2,completedTasks:1,totalTasks:4,researchSessions:5,mentorships:2,sectors:[{name:'Agriculture',count:6}],countries:[{name:'Kenya',count:4}],recentActivity:[]},'/projects':[{id:'j2',name:'Harvest pilot'}]});
 go('/analytics');render(<App/>);
 expect(await screen.findByRole('heading',{name:'Analytics & reports'})).toBeInTheDocument();
 expect(await screen.findByText('Agriculture')).toBeInTheDocument();
 expect(screen.getByRole('progressbar',{name:'Completed project tasks'})).toHaveAttribute('value','1');
 expect(screen.getByRole('link',{name:'Download CSV'})).toHaveAttribute('href','/api/reports?format=csv');
 input('Report scope','j2');
 expect(screen.getByRole('link',{name:'Download PDF'})).toHaveAttribute('href','/api/reports?format=pdf&projectId=j2');
});
test('profile photo uploads as a data URL and renders after server save',async()=>{
 const photo='data:image/png;base64,iVBORw0KGgo=';
 mockAPI({'PATCH /profile':{...user,avatar:photo}});go('/profile');render(<App/>);
 const file=new File([new Uint8Array([137,80,78,71,13,10,26,10])],'portrait.png',{type:'image/png'});
 fireEvent.change(await screen.findByLabelText('Profile photo'),{target:{files:[file]}});
 await screen.findByRole('img',{name:'Profile photo preview'});
 fireEvent.click(screen.getByRole('button',{name:'Save profile'}));
 expect(await screen.findByText('Profile saved.')).toBeInTheDocument();
 expect(requests.find(r=>r.path==='/profile').body.avatar).toBe(photo);
 expect(screen.getAllByRole('img',{name:'Amina Demo profile photo'}).length).toBeGreaterThan(0);
});
test('email verification opens directly from the backend root query link',async()=>{
 window.history.replaceState({},'', '/?action=verify&token=mail-token');
 mockAPI({'/auth/me':{user:null},'/demo/personas':[],'POST /auth/verify':{message:'Email verified.'}});
 render(<App/>);
 await screen.findByRole('heading',{name:'Verify your email'});
 fireEvent.click(screen.getByRole('button',{name:'Verify email'}));
 expect(await screen.findByText('Email verified.')).toBeInTheDocument();
 expect(requests.find(r=>r.path==='/auth/verify').body).toEqual({token:'mail-token'});
});
test('administrator restore requires exact confirmation before server mutation',async()=>{
 mockAPI({'/auth/me':{user:{...user,role:'admin'}},'/admin':{users:[user],problems:[],flags:[],audit:[],backups:[{id:'b1',createdAt:'2026-09-20'}],settings:{backupEnabled:true,backupHour:2}},'POST /admin/backups/b1/restore':{ok:true}});
 go('/admin');render(<App/>);fireEvent.click(await screen.findByRole('button',{name:'Backups & schedule'}));
 fireEvent.click(screen.getByRole('button',{name:'Restore backup'}));
 expect(screen.getByRole('button',{name:'Confirm restore'})).toBeDisabled();
 input('Type RESTORE to confirm','RESTORE');fireEvent.click(screen.getByRole('button',{name:'Confirm restore'}));
 await waitFor(()=>expect(requests.find(r=>r.path==='/admin/backups/b1/restore').body).toEqual({confirmation:'RESTORE'}));
});
test('mentor request sends selected mentor and a contextual message',async()=>{
 mockAPI({'/mentors?q=':[{id:'m1',name:'Kofi Mentor',expertise:'Water systems',bio:'Community engineering'}], 'POST /mentorships':{id:'ms1'}});
 go('/mentors');render(<App/>);fireEvent.click(await screen.findByRole('button',{name:'Request mentorship from Kofi Mentor'}));
 input('Mentorship message','Please review our community water pilot.');fireEvent.click(screen.getByRole('button',{name:'Send mentorship request'}));
 expect(await screen.findByText('Mentorship request sent.')).toBeInTheDocument();
 expect(requests.find(r=>r.path==='/mentorships'&&r.method==='POST').body).toEqual({mentorId:'m1',message:'Please review our community water pilot.'});
});
test('project workspace creates assigned tasks and preserves server status changes',async()=>{
 const project={id:'j1',name:'School water pilot',leaderId:'u1',status:'active',members:[user],tasks:[],documents:[],messages:[],milestones:[]};
 mockAPI({'/projects/j1':project,'POST /projects/j1/tasks':{id:'t1'}});
 go('/projects/j1');render(<App/>);await screen.findByRole('heading',{name:project.name});
 input('Task title','Map water points');input('Assign to','u1');input('Due date','2026-10-20');
 fireEvent.click(screen.getByRole('button',{name:'Add task'}));
 await waitFor(()=>expect(requests.find(r=>r.path==='/projects/j1/tasks').body).toEqual({title:'Map water points',assigneeId:'u1',dueDate:'2026-10-20'}));
 expect(await screen.findByText('Task added.')).toBeInTheDocument();
});
test('research runs contextual analysis and labels offline output honestly',async()=>{
 mockAPI({'POST /research':{id:'r1',mode:'offline',summary:'Water access needs local field evidence.',classification:'Health',sdgs:[6],literature:[{title:'Catalogue search',url:'https://example.org/search'}],approaches:['Map seasonal availability'],cautions:['Not a verified publication']}});
 go('/research');render(<App/>);await screen.findByLabelText('Research question');input('Research question','How can rural schools improve drinking water access?');
 fireEvent.click(screen.getByRole('button',{name:'Generate research brief'}));
 expect(await screen.findByText('Water access needs local field evidence.')).toBeInTheDocument();
 expect(screen.getAllByText(/local heuristic/i).length).toBeGreaterThan(0);
 expect(screen.getByRole('link',{name:'Catalogue search'})).toHaveAttribute('href','https://example.org/search');
});
test('problem submission opens its discussion and sends a community comment',async()=>{
 const problem={id:'p1',title:'Water access in rural schools',description:'Schools need reliable drinking water.',sector:'Health',country:'Nigeria',status:'pending',authorId:'u1',score:0,comments:[]};
 mockAPI({'POST /problems':problem,'/problems/p1':problem,'POST /problems/p1/comments':{id:'c1'}});
 go('/problems/new');render(<App/>);
 await screen.findByRole('heading',{name:'Submit a problem'});
 input('Problem title',problem.title);input('Description',problem.description);input('Evidence and sources','School interviews, fictional demo observations.');input('Region or community','Enugu');
 fireEvent.click(screen.getByRole('button',{name:'Submit for community review'}));
 expect(await screen.findByRole('heading',{name:problem.title})).toBeInTheDocument();
 input('Add a comment','Please include seasonal availability.');fireEvent.click(screen.getByRole('button',{name:'Post comment'}));
 await waitFor(()=>expect(requests.find(r=>r.path==='/problems/p1/comments').body).toEqual({text:'Please include seasonal availability.'}));
});
test('registration submits a real account and recovery uses a token',async()=>{
 mockAPI({'/auth/me':{user:null},'/demo/personas':[], 'POST /auth/register':{message:'Check your verification email.'}, 'POST /auth/reset':{message:'Password reset complete.'}});
 render(<App/>);
 fireEvent.click(await screen.findByRole('button',{name:'Create account'}));
 input('Full name','Ada Demo'); input('Email address','ada@afrisolve.demo'); input('Password','Research123!');
 fireEvent.click(screen.getByRole('button',{name:'Register account'}));
 expect(await screen.findByText('Check your verification email.')).toBeInTheDocument();
 expect(requests.find(r=>r.path==='/auth/register').body.name).toBe('Ada Demo');
 go('/reset?token=test-token');
 input('New password','Changed123!'); fireEvent.click(screen.getByRole('button',{name:'Reset password'}));
 expect(await screen.findByText('Password reset complete.')).toBeInTheDocument();
 expect(requests.find(r=>r.path==='/auth/reset').body.token).toBe('test-token');
});
test('fictional persona signs in explicitly and opens workspace',async()=>{
 mockAPI({'/auth/me':{user:null},'/demo/personas':[user],'POST /demo/login':{user}});
 render(<App/>);
 expect(await screen.findByText(/fictional.*demonstration/i)).toBeInTheDocument();
 fireEvent.click(await screen.findByRole('button',{name:/Enter as Amina Demo/i}));
 expect(await screen.findByRole('heading',{name:/Overview/i})).toBeInTheDocument();
 expect(requests.find(r=>r.path==='/demo/login').body).toEqual({id:'u1'});
 expect(screen.getByRole('navigation',{name:'Workspace'})).toBeInTheDocument();
});
