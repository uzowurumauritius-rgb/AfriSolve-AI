import assert from 'node:assert/strict';
import request from 'supertest';
import {createApp} from '../server/app.js';

export async function fixture(t, options={}) {
 const ctx=await createApp({dataDir:'memory://',demoMode:true,scheduler:false,...options});
 t.after(()=>ctx.close());
 const personas=(await request(ctx.app).get('/api/demo/personas').expect(200)).body;
 const login=async role=>{const a=request.agent(ctx.app);const user=personas.find(u=>u.role===role);assert.ok(user,role);await a.post('/api/demo/login').send({id:user.id}).expect(200);return a;};
 return {...ctx,personas,login};
}
