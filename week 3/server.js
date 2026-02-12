// server.mjs
import { createServer } from 'node:http';

const content = [
  {
    title:"Welcome to the Home Page!",
    body:"Welcome Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    url:"/"
  },
  {
    title:"Welcome to the About Page!",
    body:"Welcome Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    url:"/about"
  },
  {
    title:"Welcome to the Contact Page!",
    body:"Contact Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    url:"/contact"
  },
  {
    title:"Welcome to the Support Page!",
    body:"Help Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    url:"/help"
  }
];

function answerRequest(statusCode, contentObj, response){

  let template = `<!DOCTYPE html>
<html lang="en">
    <head>
        <title>${contentObj.title}</title>
    </head>
    <body>
        <ul>
            <li> <a href="/">Home</a></li>
            <li> <a href="/about">About Us</a></li>
            <li> <a href="/contact">Contact Us</a></li>
            <li> <a href="/help">Support</a></li>
            <li> <a href="/catalog">Catalog</a></li>
        </ul>

        <h1>${contentObj.title}</h1>
        <p>${contentObj.body}</p>
        
    </body>
</html>`;

  response.writeHead(statusCode, { 'Content-Type': 'text/html'});
  response.end(template);
}

const notfound = {
  title:"404 Not Found",
  body:"We didn't find your page"
}

const server = createServer((req, res) => {
    console.log('Received request for ${req.url}');

    const page = content.find((element) => element.url == req.url);

  if(page){
    answerRequest(200, page, res);
  } else {
    answerRequest(404, notfound, res);
  }
});
// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000. To close, use CTRL + C');
});
// run with `node server.mjs`