import {readFile,writeFile} from 'node:fs/promises';
import {LICENSES} from './collect-content.mjs';
const args=process.argv.slice(2),flag=n=>args[args.indexOf(n)+1];
if(!args.includes('--ids')||!args.includes('--reviewer')||!args.includes('--confirm-reviewed'))throw Error('Usage: node scripts/review-content.mjs --ids tatoeba-123,tatoeba-456 --reviewer NOM --confirm-reviewed');
const ids=new Set(flag('--ids').split(',')),reviewer=flag('--reviewer');if(!reviewer||reviewer.startsWith('--')||reviewer.length>80)throw Error('Reviewer name required.');
const pending=JSON.parse(await readFile('content/pending.json','utf8'));
const selected=pending.candidates.filter(c=>ids.has(c.id));if(selected.length!==ids.size)throw Error('Some requested IDs are absent from pending.json. Nothing changed.');
for(const c of selected){if(!/^tatoeba-\d+$/.test(c.id)||c.sourceUrl!==`https://tatoeba.org/en/sentences/show/${c.id.slice(8)}`||LICENSES[c.license]!==c.licenseUrl||!c.author||!c.text||c.status!=='pending')throw Error('Invalid provenance. Nothing changed.');}
const approved=JSON.parse(await readFile('content/approved.json','utf8'));
const reviewed=JSON.parse(await readFile('content/reviewed-ids.json','utf8'));
for(const c of selected){if(approved.some(a=>a.id===c.id))throw Error('Already approved. Nothing changed.');approved.push({...c,status:'approved',reviewer,reviewedAt:new Date().toISOString()});}
await writeFile('content/approved.json',JSON.stringify(approved,null,2)+'\n');
await writeFile('content/reviewed-ids.json',JSON.stringify([...new Set([...reviewed,...ids])],null,2)+'\n');
await writeFile('content/pending.json',JSON.stringify({...pending,candidates:pending.candidates.filter(c=>!ids.has(c.id))},null,2)+'\n');
await writeFile('public/community-data.js','globalThis.LITTLE_STEPS_COMMUNITY='+JSON.stringify(approved).replace(/</g,'\\u003c')+';\n');
console.log(`Approved ${selected.length} dictations. Commit the content files and public/community-data.js together. No deployment was performed.`);
