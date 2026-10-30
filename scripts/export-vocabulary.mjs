import {writeFile} from 'node:fs/promises';
import '../public/vocabulary.js';
const words=globalThis.LITTLE_STEPS_VOCAB;
const quote=s=>'"'+s.replace(/"/g,'""')+'"';
await writeFile('public/vocabulary.csv','\uFEFF'+[['Thème','Anglais','Français','Exemple'],...words.map(v=>[v.topic,v.term,v.translation,v.example])].map(row=>row.map(quote).join(';')).join('\r\n')+'\r\n');
await writeFile('public/vocabulary-anki.tsv',words.map(v=>`${v.term}\t${v.translation} — ${v.example}`).join('\n')+'\n');
console.log(`Exported ${words.length} vocabulary entries to CSV and Anki TSV.`);
