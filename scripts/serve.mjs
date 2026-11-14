import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.ttf':'font/ttf' };
const port = Number(process.env.PORT || 5173);
http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    const relative = path.relative(root,file);
    if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(x=>x.startsWith('.')) || relative.startsWith('scripts')) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file,'index.html');
    const body = await readFile(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-store'});
    res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(port,'127.0.0.1',()=>console.log(`Portfólio: http://localhost:${port}`));
