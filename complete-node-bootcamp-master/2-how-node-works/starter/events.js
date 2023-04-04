const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("A new sale has been detected");
});

myEmitter.on("newSale", () => {
  console.log("Customer Name : Faraz Khan");
});

myEmitter.on("newSale", (quantity) => {
  console.log(`There are Now ${quantity} items remaining`);
});

myEmitter.emit("newSale", 10);

//////////////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request recieved");
  res.end("request recieved !");
});

server.on("request", (req, res) => {
  console.log("another request recieved .....");
});

server.on("close", () => {
  console.log("Server is Closed now");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("The server is now listening to requests........");
});
