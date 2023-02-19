const fs = require("fs");

//Blocking, synchronous way
/* const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./starter/txt/output.txt", textOut);
console.log("File written!");
 */
//Non-blocking, asynchronous  way
/* Example 1
fs.readFile("./starter/txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("Will read file!");
*/

fs.readFile("./starter/txt/stSSart.txt", "utf-8", (err, data1) => {
    if (!data1) return console.error(err);
    fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(data2);
        console.log();
        fs.readFile("./starter/txt/append.txt", "utf-8", (err, data3) => {
            console.log(data3);
            fs.writeFile("./starter/txt/final2.txt", `${data2}\n${data3}`, "utf-8", (err) => {
                console.log("Your file has been written!!!");
            });
        });
    });
});
console.log("Will read this");
