/*const name1 = 'amila';
console.log(name1);*/

//import os from "node:os";
import path from "node:path";
import { readFile } from "node:fs";
import { fileURLToPath } from "url";
import { join } from "node:path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

readFile(join(__dirname, "myname.txt"), "utf8", (err, data) => {
    if (err) {
        console.log("File not found!");
    }
    
    console.log(data);
});

//console.log(__filename);
//console.log(__dirname);

//console.log(os.platform());
//console.log(os.version());

/*console.log(path.basename(__filename));
console.log(path.extname(__filename));
console.log(path.parse(__filename));*/