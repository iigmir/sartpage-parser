import { readFile, writeFile } from "fs";
import StartpageParser from "./lib/index.js";

readFile("./input.html", "utf-8", function(err, content) {
    if (err) throw err;
    const data = StartpageParser(content);
    const filename = `./results/${data.keyword}.json`;
    const result = JSON.stringify( data );
    writeFile( filename, result, (werr) => {
        if (werr) throw werr;
    });
});
