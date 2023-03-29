const fs = require("fs");
const http = require("http");
const url = require("url");

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

const server = http.createServer((req, res) => {
  const pathName = req.url;
  //   console.log(req);
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overview");
  } else if (pathName === "/product") {
    res.end("this is product");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello-world",
    });
    res.end("<h1>PAGE NOT FOUND !</h1>");
  }
  //   res.end("Hello from the server !");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
