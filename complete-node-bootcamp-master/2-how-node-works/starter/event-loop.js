const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

// Change threadpool size :
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => {
  console.log("Timer 1 is finished");
}, 0);
setImmediate(() => {
  console.log("Immediate 1 is finished ");
});

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------------------------");

  setTimeout(() => {
    console.log("Timer 2 is finished");
  }, 0);
  setTimeout(() => {
    console.log("Timer 3 is finished");
  }, 3000);
  setImmediate(() => {
    console.log("Immediate 2 is finished ");
  });

  process.nextTick(() => {
    console.log("Process.nexttick");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password Encryped");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password Encryped");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password Encryped");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "password Encryped");
  });
  //  Synchronous code blocking
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password Encryped sync");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password Encryped sync");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password Encryped sync");
});

console.log("Hello From the top level code !");
