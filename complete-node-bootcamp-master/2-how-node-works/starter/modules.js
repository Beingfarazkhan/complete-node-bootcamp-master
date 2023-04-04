// console.log(arguments);
// console.log("----------------------------------");
// console.log(require("module").wrapper);

// MOdule Exports
const C = require("./test-module1");
const calc1 = new C();
console.log(calc1.add(1, 4));

// Exports
const { add, multiply, divide } = require("./test-module2");
console.log(multiply(3, 4));

// Caching
require("./test-module3")();
require("./test-module3")();
require("./test-module3")();
