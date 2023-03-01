const fs = require("fs");
const server = require("http").createServer();

// How to read a large file and send it to the client (browser)?
server.on("request", (req, res) => {
    // Solution 1
    /* fs.readFile("text-file.txt", (err, data) => {
        if (err) console.error(err);
        res.end(data);
    }); */

    //Solution 2: Streams
  /*   const readable = fs.createReadStream("text-file.txt");
    readable.on("data", (chunk) => {
        res.write(chunk);
    });

    readable.on("close", () => {
        res.end();
    });

    readable.on("error", (err) => {
        console.log(err);
        res.statusCode = 500;
        res.end("File not found!");
    }); */

    //Solution 3
    const readable = fs.createReadStream('text-file.txt')
    readable.pipe(res)
    //readableSource.pipe(writeableDest)
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening... (http://127.0.0.1:8000)");
});
