import {readFile} from 'node:fs/promises';
const repo=process.env.GITHUB_REPOSITORY,token=process.env.GH_TOKEN,run=process.env.GITHUB_RUN_ID;
if(!/^[\w.-]+\/[\w.-]+$/.test(repo||'')||!token||!/^\d+$/.test(run||''))throw Error('This script runs inside GitHub Actions.');
const api=async(path,method='GET',body)=>{const r=await fetch(`https://api.github.com/repos/${repo}/${path}`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(25000)});if(!r.ok)throw Error(`GitHub approval proposal failed (${r.status}). No main branch update was requested.`);return r.json();};
const base=(await api('')).default_branch;
const pulls=await api(`pulls?state=open&base=${encodeURIComponent(base)}&per_page=100`);
const existing=pulls.find(p=>p.head.ref.startsWith('automation/approved-content-')&&p.head.repo?.full_name===repo);
if(existing){console.log(`An approval proposal already exists: ${existing.html_url}. Merge or close it before another approval.`);process.exit(0);}
const head=(await api(`git/ref/heads/${base}`)).object.sha;
const commit=await api(`git/commits/${head}`);
const paths=['content/approved.json','content/reviewed-ids.json','content/pending.json','public/community-data.js'];
const tree=[];for(const path of paths)tree.push({path,mode:'100644',type:'blob',content:await readFile(path,'utf8')});
const proposed=await api('git/trees','POST',{base_tree:commit.tree.sha,tree});
if(proposed.sha===commit.tree.sha){console.log('No approval changes.');process.exit(0);}
const saved=await api('git/commits','POST',{message:'Activate explicitly reviewed English dictations',tree:proposed.sha,parents:[head]});
const branch='automation/approved-content-'+run;
await api('git/refs','POST',{ref:'refs/heads/'+branch,sha:saved.sha});
const pr=await api('pulls','POST',{title:'Activer les dictées explicitement relues',head:branch,base,body:'Cette activation a été demandée manuellement depuis Actions avec les identifiants choisis et la confirmation de relecture. Le diff contient uniquement les données de contenu et le fichier de dictées publiques. Vérifier les phrases, auteurs, URL et licences. Fusionner cette pull request activera ces dictées lors du prochain déploiement Pages. Aucun auto-merge et aucun accès au site OVH.'});
console.log(`Activation proposal: ${pr.html_url}`);
