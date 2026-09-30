import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import {fixture} from './helpers.js';

test('configuration truthfully describes providers and preserves all actor roles',async t=>{
 const {app}=await fixture(t,{aiBaseUrl:'http://127.0.0.1:11434/api',aiModel:'test-cloud'});const cfg=(await request(app).get('/api/config').expect(200)).body;
 for(const role of ['community','developer','entrepreneur','institutional','researcher','student','innovator','mentor','admin'])assert.ok(cfg.roles.includes(role),role);
 assert.match(cfg.aiMode,/Ollama/);assert.match(cfg.emailMode,/not delivered/);
 for(const role of ['community','developer','entrepreneur','institutional'])await request(app).post('/api/auth/register').send({name:'Test Actor',email:`${role}-new@afrisolve.demo`,password:'SecurePass123',role,country:'Ghana'}).expect(200);
});

test('profile accepts bounded PNG/JPEG data URLs but rejects active or invalid payloads',async t=>{
 const {login}=await fixture(t);const a=await login('student');
 const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jgZkAAAAASUVORK5CYII=';
 assert.equal((await a.patch('/api/profile').send({avatar:png}).expect(200)).body.avatar,png);
 for(const avatar of ['data:image/svg+xml;base64,PHN2Zy8+','data:image/png;base64,PHNjcmlwdC8+','javascript:alert(1)','https://example.com/track.png','data:image/png;base64,'+Buffer.alloc(262145).toString('base64')])await a.patch('/api/profile').send({avatar}).expect(400);
 assert.equal((await a.get('/api/auth/me')).body.user.avatar,png);
 await a.patch('/api/profile').send({avatar:'#145c43'}).expect(200);
});
