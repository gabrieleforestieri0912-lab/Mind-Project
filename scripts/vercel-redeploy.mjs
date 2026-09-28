// Triggera un redeploy di produzione su Vercel via REST API.
// Uso: $env:VERCEL_TOKEN="..."; node scripts/vercel-redeploy.mjs
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const project = JSON.parse(readFileSync(join(root, '.vercel', 'project.json'), 'utf8'));
// Alcuni token non hanno accesso al team endpoint (?teamId=... -> 404).
// Usa il teamId solo se VERCEL_TEAM_ID e' impostato esplicitamente.
const teamId = process.env.VERCEL_TEAM_ID;
const teamQuery = teamId ? `?teamId=${teamId}` : '';
const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error('Manca VERCEL_TOKEN.');
  process.exit(1);
}

const api = async (method, path, body) => {
  const res = await fetch(`https://api.vercel.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${JSON.stringify(data).slice(0, 300)}`);
  return data;
};

// Redeploy via Git: Vercel ricostruisce dall'ultimo commit di main.
const projectInfo = await api('GET', `/v9/projects/${project.projectId}${teamQuery}`);
const repo = projectInfo.link;
if (!repo) throw new Error('Il progetto non risulta collegato a un repo Git.');
console.log(`Repo collegato: ${repo.org}/${repo.repo} (prod branch: ${repo.productionBranch || 'main'})`);

const sha = execSync('git rev-parse HEAD', { cwd: root }).toString().trim();
execSync('git commit --allow-empty -m "chore: trigger Vercel redeploy con nuove env"', { cwd: root });
execSync('git push origin main', { cwd: root, stdio: 'inherit' });
console.log(`Pushato commit vuoto sopra ${sha}. Vercel avvierà il deploy da Git entro ~30s.`);

await new Promise((r) => setTimeout(r, 20000));
const deps2 = await api('GET', `/v6/deployments?projectId=${project.projectId}${teamQuery}&limit=1&target=production`);
const newest = deps2.deployments?.[0];
if (newest) console.log(`Ultimo deployment: ${newest.uid} -> https://${newest.url} (stato: ${newest.state})`);
