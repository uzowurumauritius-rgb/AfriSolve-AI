import React, { useId, useEffect, useState } from 'react';
import { ArrowUpRight, LoaderCircle, Inbox } from 'lucide-react';
export async function api(path, method='GET', body) {
 const response=await fetch('/api'+path,{method,credentials:'same-origin',...(body!==undefined?{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{})});
 let data; try {data=await response.json();} catch {throw new Error('The server returned an unreadable response. Please try again.');}
 if(!response.ok) throw new Error(data.error||'The request could not be completed.'); return data;
}
export function useData(path,initial=null){
 const [data,setData]=useState(initial),[error,setError]=useState(''),[loading,setLoading]=useState(true),[version,setVersion]=useState(0),[loaded,setLoaded]=useState(false);
 useEffect(()=>{let active=true;if(!loaded)setLoading(true);setError('');api(path).then(v=>{if(active){setData(v);setLoaded(true);}}).catch(e=>{if(active)setError(e.message);}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[path,version]);
 return {data,setData,error,loading,reload:()=>setVersion(v=>v+1)};
}
export function useAction(){const [busy,setBusy]=useState(false),[error,setError]=useState(''),[message,setMessage]=useState('');async function run(fn,success='Changes saved.'){setBusy(true);setError('');setMessage('');try {const result=await fn();setMessage(success);return result;}catch(e){setError(e.message);return undefined;}finally{setBusy(false);}}return {busy,error,message,run};}
export const list=v=>Array.isArray(v)?v:[];
export function Avatar({user,size='',preview=false}){const photo=/^data:image\/(png|jpeg);base64,/i.test(user?.avatar||'');return photo?<img className={'avatar '+size} src={user.avatar} alt={preview?'Profile photo preview':`${user.name} profile photo`}/>:<span className={'avatar '+size}>{user?.name?.slice(0,1)||'?'}</span>;}
export const date=v=>v?new Date(v).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}):'Not set';
export function Badge({children}){return <span className={'badge '+String(children).toLowerCase().replace(/\s/g,'-')}>{children||'Not set'}</span>;}
export function Notice({error,message}){return <>{error&&<div className="notice error" role="alert">{error}</div>}{message&&<div className="notice success" role="status">{message}</div>}</>;}
export function Loading(){return <div className="loading" role="status"><LoaderCircle size={20} className="spin"/> Loading your workspace…</div>;}
export function Empty({title='Nothing here yet',children}){return <div className="empty"><Inbox size={28}/><h3>{title}</h3><p>{children||'Your activity will appear here.'}</p></div>;}
export function Panel({title,children,action,className=''}){return <section className={'panel '+className}>{title&&<div className="section-heading"><h2>{title}</h2>{action}</div>}{children}</section>;}
export function PageTitle({eyebrow='Your workspace',title,description,children}){return <div className="page-title"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{description&&<p>{description}</p>}</div>{children&&<div className="actions">{children}</div>}</div>;}
export function LinkButton({to,children,secondary=false}){return <a className={'button '+(secondary?'secondary':'')} href={'#'+to}>{children}<ArrowUpRight size={16}/></a>;}
export function Field({label,name,type='text',options,children,id:explicitId,...props}){const autoId=useId();const fieldId=explicitId||(props.id)||((name?name:'f')+'-'+autoId.replace(/[^a-zA-Z0-9_-]/g,''));return <div className={'field '+(type==='checkbox'?'check':'')}><label htmlFor={fieldId}><span>{label}</span></label>{options?<select id={fieldId} name={name} {...props}>{options.map(o=>typeof o==='object'?<option key={o.value} value={o.value}>{o.label}</option>:<option key={o} value={o}>{o}</option>)}</select>:type==='textarea'?<textarea id={fieldId} name={name} rows="4" {...props}/>:<input id={fieldId} name={name} type={type} {...props}/>}{children&&<small>{children}</small>}</div>;}
export function ActionForm({onSubmit,children,submit='Save changes',className='',success='Changes saved.'}){const action=useAction();return <form className={'form '+className} onSubmit={e=>{e.preventDefault();const form=e.currentTarget;action.run(async()=>onSubmit(Object.fromEntries(new FormData(form)),form),success);}}><fieldset disabled={action.busy}>{children}<Notice {...action}/><button type="submit">{action.busy?'Working…':submit}</button></fieldset></form>;}
export function Resource({resource,children}){return resource.loading?<Loading/>:resource.error?<Notice error={resource.error}/>:children;}
export function ActionButton({onClick,children,success='',className='secondary',...props}){const action=useAction();return <span className="action-wrap"><button className={className} disabled={action.busy} onClick={()=>action.run(onClick,success)} {...props}>{action.busy?'Working…':children}</button><Notice {...action}/></span>;}
