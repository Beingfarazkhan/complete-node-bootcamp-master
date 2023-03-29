const fs = require("fs");

// Read Files
const textIN = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIN);

// Write to Files
const textOUT = `this is what we know about avacado : ${textIN}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOUT);
console.log("File Written successfuly");

// Node
