console.log(arguments);
console.log(require("module").wrapper);

// module.exports
const C = require("./testModule-1");
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require('./testModule-2')
const { add, multiply, divide } = require("./testModule-2");
console.log(add(10, 5));
console.log(multiply(10, 5));
console.log(divide(10, 5));


//caching
require('./testModule-3')()
require('./testModule-3')()
require('./testModule-3')()