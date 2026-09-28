// Legge .env locale e sincronizza le variabili su Vercel via REST API.
// Uso: $env:VERCEL_TOKEN="..."; node scripts/vercel-env-sync.mjs [--dry-run]
// Non stampa mai i valori, solo le chiavi.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const project = JSON.parse(readFileSync(join(root, '.vercel', 'project.json'), 'utf8'));
// Attenzione: alcuni token (es. i token con scope limitato) non hanno accesso
// al team endpoint: per loro ?teamId=... fa fallire la richiesta con 404, mentre
// le stesse chiamate senza teamId funzionano. Usa il teamId solo se richiesto.
const teamId = process.env.VERCEL_TEAM_ID;
const teamQuery = teamId ? `?teamId=${teamId}` : '';
const token = process.env.VERCEL_TOKEN;
const dryRun = process.argv.includes('--dry-run');

if (!token) {
  console.error('Manca VERCEL_TOKEN. Creo con: $env:VERCEL_TOKEN="xxxxx"; node scripts/vercel-env-sync.mjs');
  process.exit(1);
}

const SKIP = new Set(['PORT']);
const TARGETS = ['production', 'preview', 'development'];

const vars = new Map();
for (const line of readFileSync(join(root, '.env'), 'utf8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const i = t.indexOf('=');
  if (i < 1) continue;
  const k = t.slice(0, i).trim();
  const v = t.slice(i + 1).trim();
  if (SKIP.has(k) || !v) {
    console.log(`SKIP ${k}`);
    continue;
  }
  vars.set(k, v);
}

const api = async (method, path, body) => {
  const res = await fetch(`https://api.vercel.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  return data;
};

const existing = await api('GET', `/v9/projects/${project.projectId}/env${teamQuery}`);
console.log(`Variabili esistenti su Vercel: ${(existing.envs || []).length}`);

for (const [key, value] of vars) {
  const found = (existing.envs || []).filter((e) => e.key === key);
  if (dryRun) {
    console.log(`DRY-RUN ${key} (trovate ${found.length} esistenti)`);
    continue;
  }
  for (const f of found) {
    await api('DELETE', `/v9/projects/${project.projectId}/env/${f.id}${teamQuery}`);
  }
  await api('POST', `/v10/projects/${project.projectId}/env${teamQuery}`, {
    key,
    value,
    type: 'encrypted',
    target: TARGETS,
  });
  console.log(`OK ${key} -> ${TARGETS.join(',')} (sostituite ${found.length})`);
}
console.log('Sync completata. Ricorda: serve un Redeploy su Vercel per applicarle.');
