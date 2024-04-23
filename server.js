const http = require("http");
const fs = require("fs/promises");
const cache = require("node-cache")


const storeCache = new cache()

const getFiles = async () => {
    const indexHtml = await fs.readFile("./index.html");
    const indexJs = await fs.readFile("./dist/r.bundle.js");
    return [indexHtml, indexJs];
};

http.createServer(async ({ url }, res) => {
        if (url.includes("Registration")) {
        const registrationObjectUrl = url.split('=')[1];
        const decodedReg = JSON.parse(decodeURIComponent(registrationObjectUrl));
        storeCache.set("registrationData", decodedReg);
        console.log(storeCache)
        const stringi = JSON.stringify(decodedReg)
        const buff = Buffer.from(stringi)
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.write(buff);
        res.end();
    } else if (url.includes("youLogIn")) {
        const LoginObjectUrl = url.split('=')[1];
        const decodedlog = JSON.parse(decodeURIComponent(LoginObjectUrl));
        storeCache.get("registrationData");
        const stringify = JSON.stringify(decodedlog)
        const buffer = Buffer.from(stringify) 
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.write(buffer);
        res.end();
        return
    } 
        const [indexHtml, indexJs] = await getFiles();
        switch (url) {
            case '/':
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(indexHtml);
                res.end();
                break;
            case '/js':
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.write(indexJs);
                res.end();
                break;
            default:
                res.writeHead(404);
                res.write('Strona nie znaleziona');
                res.end();
        }
    }
).listen(8008);