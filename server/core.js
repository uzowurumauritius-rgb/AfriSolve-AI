import { randomBytes, randomUUID, createHash, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { PGlite } from '@electric-sql/pglite';
const scrypt=promisify(scryptCb);
export const roles=['researcher','student','innovator','mentor','admin','community','developer','entrepreneur','institutional'];
export const sectors=['Agriculture','Healthcare','Education','Energy','Water & Sanitation','Technology','Environment','Infrastructure','Other'];
export const countries=['Nigeria','Kenya','Ghana','South Africa','Rwanda','Ethiopia','Uganda','Tanzania','Senegal','Egypt','Cameroon','Zambia','Zimbabwe','Other'];
export const id=()=>randomUUID();
export const hash=s=>createHash('sha256').update(s).digest('hex');
export const token=()=>randomBytes(32).toString('hex');
export function fail(status,message){throw Object.assign(new Error(message),{status});}
export function text(v,name,max=5000,min=1){if(typeof v!=='string'||v.trim().length<min||v.length>max)fail(400,`${name} must contain ${min}–${max} characters`);return v.trim();}
export function email(v){const e=text(v,'Email',254).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))fail(400,'Invalid email');return e;}
export function oneOf(v,values,name){if(!values.includes(v))fail(400,`Invalid ${name}`);return v;}
export function avatar(v){
 const value=text(v,'Avatar',350000,0);if(!value||/^#[0-9a-f]{6}$/i.test(value))return value;
 const m=/^data:image\/(png|jpeg);base64,([A-Za-z0-9+/]+={0,2})$/.exec(value);if(!m)fail(400,'Photo must be a PNG or JPEG data URL');const b=Buffer.from(m[2],'base64');if(!b.length||b.length>262144||b.toString('base64')!==m[2])fail(400,'Photo must be valid base64 and at most 256 KB');
 if(m[1]==='png'&&(b.length<45||b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a'||b.subarray(12,16).toString()!=='IHDR'||b.readUInt32BE(16)<1||b.readUInt32BE(20)<1||b.readUInt32BE(16)>4096||b.readUInt32BE(20)>4096||b.subarray(-8,-4).toString()!=='IEND'))fail(400,'Invalid PNG image or dimensions');
 if(m[1]==='jpeg'&&(b.length<4||b.subarray(0,3).toString('hex')!=='ffd8ff'||b.subarray(-2).toString('hex')!=='ffd9'))fail(400,'Invalid JPEG image');return value;
}
export function publicUser(u){if(!u)return null;const {id,name,email,role,country,institution,bio,expertise,avatar,verified,active}=u;return {id,name,email,role,country,institution,bio,expertise,avatar,verified,active};}
export async function passwordHash(p){text(p,'Password',128,10);if(!/[A-Za-z]/.test(p)||!/[0-9]/.test(p))fail(400,'Password needs letters and numbers');const salt=randomBytes(16).toString('hex');return salt+':'+(await scrypt(p,salt,64)).toString('hex');}
export async function passwordMatches(p,stored){if(typeof p!=='string'||p.length>128||!stored)return false;const [salt,key]=stored.split(':');return timingSafeEqual(await scrypt(p,salt,64),Buffer.from(key,'hex'));}
export function initialState(demo,now){const s={users:[],sessions:[],tokens:[],mail:[],problems:[],votes:[],comments:[],flags:[],research:[],projects:[],invitations:[],mentorships:[],notifications:[],audit:[],settings:{backupEnabled:true,backupHour:2},lastBackupDay:null};if(demo)for(const [role,name,country] of [['admin','Amara Okafor','Nigeria'],['researcher','Nia Kamau','Kenya'],['student','Kwame Mensah','Ghana'],['innovator','Lerato Molefe','South Africa'],['mentor','Dr. Amina Diallo','Senegal']])s.users.push({id:id(),name,email:`${role}@afrisolve.demo`,role,country,institution:'Fictional African Innovation Lab',bio:'Fictional demonstration persona.',expertise:role==='mentor'?'Sustainable agriculture, research methods':'',avatar:'',verified:true,active:true,demo:true,passwordHash:null,createdAt:new Date(now).toISOString()});return s;}
export async function openStore(dataDir,demo,now){const db=new PGlite(dataDir==='memory://'?undefined:dataDir);await db.exec('CREATE TABLE IF NOT EXISTS application_state (id INTEGER PRIMARY KEY CHECK(id=1), body JSONB NOT NULL); CREATE TABLE IF NOT EXISTS backups (id TEXT PRIMARY KEY, created_at TEXT NOT NULL, body JSONB NOT NULL)');const result=await db.query('SELECT body FROM application_state WHERE id=1');let state=result.rows[0]?.body??initialState(demo,now);if(!result.rows.length)await db.query('INSERT INTO application_state VALUES (1,$1)',[JSON.stringify(state)]);let queue=Promise.resolve();return {db,get state(){return state;},set state(s){state=s;},exclusive(fn){const p=queue.then(fn);queue=p.catch(()=>{});return p;},async save(){await db.query('UPDATE application_state SET body=$1 WHERE id=1',[JSON.stringify(state)]);},async close(){await queue;await db.close();}};}
