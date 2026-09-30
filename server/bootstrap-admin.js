import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openStore, id, passwordHash, email, text } from './core.js';

const root = resolve(fileURLToPath(import.meta.url), '../..');
const dataDir = process.env.DATA_DIR || resolve(root, 'data/postgres');

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME || 'Platform Administrator';
const adminCountry = process.env.ADMIN_COUNTRY || 'Nigeria';

if (!adminEmail || !adminPassword) {
  console.error('Usage: ADMIN_EMAIL=... ADMIN_PASSWORD=... [ADMIN_NAME=...] [ADMIN_COUNTRY=...] node server/bootstrap-admin.js');
  process.exit(1);
}

try {
  const cleanEmail = email(adminEmail);
  const hash = await passwordHash(adminPassword);
  const cleanName = text(adminName, 'Name', 100, 2);

  const store = await openStore(dataDir, false, Date.now());
  await store.exclusive(async () => {
    let user = store.state.users.find(u => u.email === cleanEmail);
    if (user) {
      user.role = 'admin';
      user.passwordHash = hash;
      user.active = true;
      user.verified = true;
      user.name = cleanName;
      console.log(`Updated existing user ${cleanEmail} to administrator.`);
    } else {
      user = {
        id: id(),
        name: cleanName,
        email: cleanEmail,
        passwordHash: hash,
        role: 'admin',
        country: adminCountry,
        institution: 'AfriSolve Administration',
        bio: 'Platform administrator account.',
        expertise: 'Platform governance, moderation, verification',
        avatar: '',
        verified: true,
        active: true,
        demo: false,
        createdAt: new Date().toISOString(),
      };
      store.state.users.push(user);
      console.log(`Created new administrator account: ${cleanEmail}`);
    }
    await store.save();
  });
  await store.close();
  console.log('Administrator bootstrap completed successfully.');
} catch (error) {
  console.error(`Bootstrap failed: ${error.message}`);
  process.exit(1);
}
