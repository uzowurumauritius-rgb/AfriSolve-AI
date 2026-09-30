import express from 'express';
import { resolve } from 'node:path';
import { createApp } from '../server/app.js';

// In-memory, isolated fictional fixtures: browser checks never mutate user data.
process.env.APP_ORIGIN = 'http://127.0.0.1:5181';
const runtime = await createApp({ dataDir: 'memory://', demoMode: true, scheduler: false });
runtime.app.use(express.static(resolve('dist')));
runtime.app.get('/{*path}', (req, res) => res.sendFile(resolve('dist/index.html')));
const server = runtime.app.listen(5181, '127.0.0.1');
async function stop() {
  server.close(async () => { await runtime.close(); process.exit(0); });
}
process.on('SIGTERM', stop);
process.on('SIGINT', stop);
