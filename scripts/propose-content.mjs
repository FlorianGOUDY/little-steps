import {readFile} from 'node:fs/promises';
const repo=process.env.GITHUB_REPOSITORY,token=process.env.GH_TOKEN;
if(!/^[\w.-]+\/[\w.-]+$/.test(repo||'')||!token)throw Error('GitHub Actions repository and token are required.');
const headers={Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
const api=async(path,method='GET',body)=>{const r=await fetch(`https://api.github.com/repos/${repo}/${path}`,{method,headers,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error(`GitHub ${method} ${path.split('?')[0]} failed (${r.status}). Check Actions permissions; no auto-merge is enabled.`);return r.status===204?null:r.json();};
const base=(await api('')).default_branch,path='content/pending.json';
const pending=await readFile(path,'utf8');if(!JSON.parse(pending).candidates.length){console.log('No pending candidates.');process.exit(0);}
const pulls=await api(`pulls?state=open&base=${encodeURIComponent(base)}&per_page=100`);
const existing=pulls.find(p=>p.head.ref.startsWith('automation/content-review-')&&p.head.repo?.full_name===repo);
if(existing){console.log(`An existing proposal awaits review: ${existing.html_url}. Fresh candidates are available in the workflow artifact; no existing branch was overwritten.`);process.exit(0);}
const current=await api(`contents/${path}?ref=${encodeURIComponent(base)}`);
if(Buffer.from(current.content,'base64').toString('utf8')===pending){console.log('No new candidates; no branch created.');process.exit(0);}
const suffix=process.env.GITHUB_RUN_ID||String(Date.now());if(!/^\d+$/.test(suffix))throw Error('Invalid run identifier.');
const branch='automation/content-review-'+suffix;
const head=await api(`git/ref/heads/${base}`);
await api('git/refs','POST',{ref:`refs/heads/${branch}`,sha:head.object.sha});
await api(`contents/${path}`,'PUT',{message:'Propose licensed English dictation candidates',content:Buffer.from(pending).toString('base64'),sha:current.sha,branch});
const pr=await api('pulls','POST',{title:'Ressources anglaises : ajouts à vérifier',head:branch,base,body:'Cette proposition contient des phrases Tatoeba avec auteur, URL et licence explicites. Aucun audio ni sujet officiel importé.\n\nVérifier le sens, la correction grammaticale, la licence et la pertinence. Fusionner cette proposition ne publie PAS les phrases dans les exercices. Pour les activer, utiliser scripts/review-content.mjs avec leurs identifiants et --confirm-reviewed, puis committer les fichiers générés. Voir AUTOMATISATION.md. Aucun auto-merge.'});
console.log(`Review proposal created: ${pr.html_url}`);
