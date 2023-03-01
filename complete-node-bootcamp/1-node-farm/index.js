const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

const replaceTemplate = require(`${__dirname}/modules/replaceTemplate`);

////////////////////////////////////////////////////
// FILES

//Blocking, synchronous way
/* const textIn = fs.readFileSync("./starter/txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./starter/txt/output.txt", textOut);
console.log("File written!");
 */
//Non-blocking, asynchronous  way
/* EXAMPLE 1
fs.readFile("./starter/txt/start.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("Will read file!");

 EXAMPLE 2
fs.readFile("./starter/txt/stSSart.txt", "utf-8", (err, data1) => {
    if (!data1) return console.error(err);
    fs.readFile(`./starter/txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(data2);
        console.log();
        fs.readFile("./starter/txt/append.txt", "utf-8", (err, data3) => {
            console.log(data3);
            fs.writeFile(
                "./starter/txt/final2.txt",
                `${data2}\n${data3}`,
                "utf-8",
                (err) => {
                    console.log("Your file has been written!!!");
                }
                );
            });
        });
    });
    console.log("Will read this");
    */

////////////////////////////////////////////////////
//  SERVER

const templateOverview = fs.readFileSync(
    `${__dirname}/starter/templates/overview.html`,
    "utf-8"
);
const templateCard = fs.readFileSync(
    `${__dirname}/starter/templates/card.html`,
    "utf-8"
);
const templateProduct = fs.readFileSync(
    `${__dirname}/starter/templates/product.html`,
    "utf-8"
);

const data = fs.readFileSync(
    `${__dirname}/starter/dev-data/data.json`,
    "utf-8"
);
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

console.log(slugify("Fresh Avocados", { lower: true }));

const server = http.createServer((req, res) => {
    console.log(req.url);
    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "Content-Type": "text/html" });

        const cardsHtml = dataObj
            .map((el) => replaceTemplate(templateCard, el))
            .join("");
        const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

        res.end(output);

        // Products page
    } else if (pathname === "/product") {
        res.writeHead(200, { "Content-Type": "text/html" });
        const product = dataObj[query.id];
        const output = replaceTemplate(templateProduct, product);

        res.end(output);

        // API page
    } else if (pathname === "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);

        // Not found
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html",
            "my-own-header": "hello-world",
        });
        res.end("<h1>Page NOT FOUND!</h1>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listen to request on port 8000");
});
