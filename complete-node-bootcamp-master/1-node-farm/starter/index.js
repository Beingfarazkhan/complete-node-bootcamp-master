const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
const slugify = require('slugify');

///////////////////////////////////////////////////////////
///////////////////FILES////////////////////////////////
/*
// Synchronous :

// Read Files
const textIN = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIN);

// Write to Files
const textOUT = `this is what we know about avacado : ${textIN}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOUT);
console.log("File Written successfuly");


// Asynchronous :

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
    //   console.log(data);
    // });
    // console.log("Reading Data File...");
    
    fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
        fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
            console.log(data2);
            fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
    });
    fs.writeFile("./txt/final.txt", "utf-8", (err) => {
        console.log("File Written Successfully !");
    });
});
});

console.log("Will Read File");


*/

///////////////////////////////////////////////////////////
///////////////////SERVER////////////////////////////////

// Templates
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

// Api Data Loaded
const apiData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(apiData);

// Slugs Created
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// Server Created
const server = http.createServer((req, res) => {
  const { query: newQuery, pathname } = url.parse(req.url, true);
  const query = JSON.parse(JSON.stringify(newQuery));

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHTML = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
    res.end(output);
  }

  //Product Page
  else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  }

  // Api Request
  else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(apiData);
  }

  // Error Request Not Found
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello-world',
    });
    res.end('<h1>PAGE NOT FOUND !</h1>');
  }
  //   res.end("Hello from the server !");
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
