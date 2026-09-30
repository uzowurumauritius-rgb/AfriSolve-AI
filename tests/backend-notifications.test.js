import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './helpers.js';

test('due reminders are durable, recipient scoped and idempotent each UTC day',async t=>{
 const now=Date.parse('2027-01-14T12:00:00Z');const c=await fixture(t,{now:()=>now});const lead=await c.login('researcher'),other=await c.login('innovator');
 await c.runReminderSchedule();await c.runReminderSchedule();
 const all=(await lead.get('/api/notifications').expect(200)).body;const due=all.filter(n=>n.title==='Task due soon');assert.equal(due.length,1);
 await other.patch('/api/notifications/'+due[0].id).send({read:true}).expect(404);
 assert.equal((await lead.patch('/api/notifications/'+due[0].id).send({read:true}).expect(200)).body.read,true);
 await lead.patch('/api/notifications/'+due[0].id).send({read:false}).expect(400);
 await c.flushNotifications();const notes=(await lead.get('/api/notifications')).body;assert.match(notes.find(n=>n.id===due[0].id).emailStatus,/preview/);
});
