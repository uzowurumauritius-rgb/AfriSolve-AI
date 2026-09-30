import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../server/app.js';

import {fixture} from './helpers.js';
test('demo authentication is private, bounded and origin protected',async t=>{
 let time=Date.now();const {app,login}=await fixture(t,{now:()=>time});
 await request(app).get('/api/health').expect(200,{status:'ok'});
 assert.equal((await request(app).get('/api/config')).body.verificationThreshold,2);
 await request(app).get('/api/auth/me').expect(200,{user:null});
 await request(app).get('/api/notifications').expect(401);
 const a=await login('researcher');const me=(await a.get('/api/auth/me')).body.user;
 assert.equal(me.role,'researcher');assert.equal(me.passwordHash,undefined);
 await a.patch('/api/profile').set('Origin','https://evil.example').send({name:'Mallory'}).expect(403);
 await a.patch('/api/profile').send({name:'Updated Researcher',bio:'Fictional biography'}).expect(200);
 time+=30*60*1000+1;await a.get('/api/notifications').expect(401);
});
