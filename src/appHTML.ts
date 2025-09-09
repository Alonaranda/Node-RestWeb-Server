//html
import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer((req, res) => {
    console.log(req.url);
    
    // res.writeHead(200, {'content-type': 'text/html'});
    // res.write(`<h1>${req.url}: Hola mundo</h1>`);
    // res.end();

    // const data = {
    //     name: 'John Seller',
    //     age: 30,
    //     city: 'New York'
    // };

    // res.writeHead(200, {'content-type': 'application/json'});
    // res.end(JSON.stringify(data));

    if(req.url === '/' ){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(htmlFile);
        return;
    }
    
    if(req.url?.endsWith('.css')) {
        res.writeHead(200, {"Content-Type": 'text/css'});
    } else if(req.url?.endsWith('.js')) {
        res.writeHead(200, {"Content-Type": 'application/javascript'});
    }

    const responseContext = fs.readFileSync(`.public${req.url}`, 'utf-8');
    res.end(responseContext);

});


server.listen(8080, () => {
    console.log('Server running on port 8080')
});