import express from 'express';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createApp} from './app.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
try { process.loadEnvFile(); } catch {}

export async function startServer(options={}){
 const port=Number(options.port??process.env.PORT??5173);
 if(!Number.isInteger(port)||port<0||port>65535)throw new Error('PORT must be a valid port number');
 const host=options.host??process.env.HOST??'127.0.0.1';
 const ctx=await createApp({...options,dataDir:options.dataDir??process.env.DATA_DIR??resolve(root,'data/postgres')});
 const dist=resolve(options.distDir??resolve(root,'dist'));
 ctx.app.use('/api',(req,res)=>res.status(404).json({error:'API route not found'}));
 ctx.app.use(express.static(dist,{dotfiles:'deny',index:'index.html',redirect:false}));
 ctx.app.use((req,res)=>res.status(404).json({error:'Not found. Build the client with npm run build.'}));
 let server;
 try{server=await new Promise((resolve,reject)=>{const s=ctx.app.listen(port,host,()=>resolve(s));s.once('error',reject);});}catch(e){await ctx.close();throw e;}
 let closing;
 return {...ctx,server,url:`http://${host}:${server.address().port}`,close(){return closing??=new Promise((resolve,reject)=>server.close(err=>err?reject(err):resolve())).then(()=>ctx.close());}};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 process.umask(0o077);
 try{const runtime=await startServer();console.log(`AfriSolve listening at ${runtime.url}`);const stop=()=>runtime.close().then(()=>process.exit(0)).catch(()=>{console.error('Shutdown failed');process.exit(1);});process.once('SIGINT',stop);process.once('SIGTERM',stop);}
 catch(error){console.error(error.code==='EADDRINUSE'?'Startup failed: port is already in use.':`Startup failed: ${error.message}`);process.exitCode=1;}
}
