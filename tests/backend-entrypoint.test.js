import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm,writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';

test('entrypoint serves static build and health on loopback and reopens persisted state',async t=>{
 const {startServer}=await import('../server/index.js');
 const dir=await mkdtemp(join(tmpdir(),'afrisolve-entry-'));t.after(()=>rm(dir,{recursive:true,force:true}));
 const dist=join(dir,'dist');const {mkdir}=await import('node:fs/promises');await mkdir(dist);await writeFile(join(dist,'index.html'),'<!doctype html><title>Test build</title>');
 let server=await startServer({port:0,dataDir:join(dir,'postgres'),distDir:dist,demoMode:true,scheduler:false});
 try{assert.equal(server.server.address().address,'127.0.0.1');let base=server.url;assert.deepEqual(await(await fetch(base+'/api/health')).json(),{status:'ok'});
 const page=await fetch(base+'/');assert.match(await page.text(),/Test build/);assert.doesNotMatch(page.headers.get('content-security-policy'),/upgrade-insecure-requests/);assert.match(page.headers.get('content-security-policy'),/script-src 'self'/);
 const personas=await(await fetch(base+'/api/demo/personas')).json();const p=personas.find(p=>p.role==='student');const login=await fetch(base+'/api/demo/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:p.id})});const cookie=login.headers.get('set-cookie').split(';')[0];
 await fetch(base+'/api/profile',{method:'PATCH',headers:{'Content-Type':'application/json',Cookie:cookie},body:JSON.stringify({name:'Durable student'})});
 await server.close();server=await startServer({port:0,dataDir:join(dir,'postgres'),distDir:dist,demoMode:true,scheduler:false});base=server.url;
 const me=await(await fetch(base+'/api/auth/me',{headers:{Cookie:cookie}})).json();assert.equal(me.user.name,'Durable student');
 const missing=await fetch(base+'/api/not-a-route');assert.equal(missing.status,404);assert.equal(typeof(await missing.json()).error,'string');
 assert.equal((await fetch(base+'/server/auth.js')).status,404);
 }finally{await server.close();}
});
