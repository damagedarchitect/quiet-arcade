const C='qa-15cd50405d',F=['index.html','manifest.webmanifest','favicon.png','icon-192.png','icon-512.png','icon-180.png','icon-maskable.png','sc-surprise.png','sc-continue.png','sc-quests.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.add(F[0]).then(()=>Promise.all(F.slice(1).map(u=>c.add(u).catch(()=>{}))))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const nav=r.mode==='navigate';
e.respondWith((async()=>{const hit=await caches.match(nav?'index.html':r,{ignoreSearch:true});if(hit)return hit;
try{const res=await fetch(r);if(res.ok&&new URL(r.url).origin===location.origin){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}
catch(_){return nav?((await caches.match('index.html'))||Response.error()):Response.error();}})())});
