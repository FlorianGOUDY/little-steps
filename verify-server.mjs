import {readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=new URL('./public/',import.meta.url);
async function walk(dir,prefix=''){const out=[];for(const entry of await readdir(dir,{withFileTypes:true})){const relative=prefix+entry.name;if(entry.isDirectory())out.push(...await walk(new URL(entry.name+'/',dir),relative+'/'));else out.push(relative);}return out;}
for(const file of await walk(root)){const response=await fetch('http://127.0.0.1:4173/'+file);assert.equal(response.status,200,file);assert.ok((await response.arrayBuffer()).byteLength||file==='.nojekyll',file);}
assert.equal((await fetch('http://127.0.0.1:4173/missing-file')).status,404);
console.log('PASS: all public files served successfully; missing files return 404.');
