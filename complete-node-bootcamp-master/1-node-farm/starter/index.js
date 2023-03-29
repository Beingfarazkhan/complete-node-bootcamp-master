const fs = require("fs");

/*
// Synchronous :

// Read Files
const textIN = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIN);

// Write to Files
const textOUT = `this is what we know about avacado : ${textIN}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOUT);
console.log("File Written successfuly");

*/

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
