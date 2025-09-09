//html2
// import * as http from 'http';
import * as http2 from 'http2';
import * as fs from 'node:fs';

const options = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
};

const server = http2.createSecureServer(options);

server.on('stream', (stream, headers) => {
  stream.respond({
    'content-type': 'text/html; charset=utf-8',
    ':status': 200,
  });
  stream.end('<h1>Hello World</h1>');
});

server.listen(8443, () => {
    console.log('Server 8443 running...')
});

// const server = http2.createSecureServer(options, (req, res) => {
//     console.log(req.url);
//     if( req.url === '/favicon.ico'){
//       console.log('favicon');
//       const responseContent = fs.readFileSync(`./public${ req.url}`, 'utf-8');
//       res.end(responseContent);
//     }
//     if( req.url === '.public/.well-known/appspecific/com.chrome.devtools.json'){
//       return;
//     }
//     if (req.url === '/') {
//         const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
//         res.writeHead(200, { 'accept': 'text/html' });
//         res.end(htmlFile);
//         return;
//     }

//     if (req.url?.endsWith('.css')) {
//         res.writeHead(200, { 'accept': 'text/css' });
//     } else if (req.url?.endsWith('.js')) {
//         res.writeHead(200, { 'accept': 'application/javascript' });
//     }

//     const responseContext = fs.readFileSync(`.public${req.url}`, 'utf-8');
//     res.end(responseContext);
// });

// server.listen(8000, () => {
//     console.log('Running 8000')
// });