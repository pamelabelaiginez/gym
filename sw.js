/* Gym: cache para funcionar sem internet. Versão: 2026-11-10 03:54 */
const V="gym-202611100354";
const FILES=["./", "index.html", "fonts.css", "jspdf.umd.min.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "figtree-latin-400-normal.woff2", "figtree-latin-500-normal.woff2", "figtree-latin-600-normal.woff2", "figtree-latin-700-normal.woff2", "bricolage-grotesque-latin-500-normal.woff2", "bricolage-grotesque-latin-700-normal.woff2", "bricolage-grotesque-latin-800-normal.woff2"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(FILES.map(function(u){return c.add(new Request(u,{cache:"reload"}))}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V&&k.indexOf("gym-")===0}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(caches.open(V).then(function(c){return c.match(r,{ignoreSearch:true}).then(function(hit){
    var net=fetch(r).then(function(res){if(res&&res.ok)c.put(r,res.clone());return res}).catch(function(){return hit||(r.mode==="navigate"?c.match("index.html"):undefined)});
    return hit||net})}))});
