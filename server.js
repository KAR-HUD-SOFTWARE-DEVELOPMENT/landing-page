const http = require("http");
const fs = require("fs/promises");


const getFiles = async () => {
    const indexHtml = await fs.readFile("./index.html");
    const indexJs = await fs.readFile("./dist/r.bundle.js");
    return [indexHtml, indexJs];
};

const registrations = []

http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles();
    if (url.includes("Registration")) {
        const registrationObjectUrl = url.split('=')[1];
        const decodedReg = JSON.parse(decodeURIComponent(registrationObjectUrl));
        const exists = registrations.some(registration => 
            registration.email === decodedReg.email)
        if (!exists) {
            registrations.push(decodedReg);
        }
        const response = exists ? JSON.stringify(decodedReg) : exists.toString();
        const buffer = Buffer.from(response);
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.write(buffer);
        res.end();
    }
    else if (url.includes("youLogIn")) {
        const LoginObjectUrl = url.split('=')[1];
        const decodedlog = JSON.parse(decodeURIComponent(LoginObjectUrl));
        let loggedIn = false;
        registrations.find(registration => {
            if (registration.email === decodedlog.email && 
                registration.password === decodedlog.password) {
                loggedIn = true;
            }
        });
        if (loggedIn) {
            const stringify = JSON.stringify(decodedlog);
            const buffer = Buffer.from(stringify);
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.write(buffer);
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.write(loggedIn.toString());
            res.end();
        }
    } 
    if (!url.includes("Registration") && !url.includes("youLogIn")) {
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
}).listen(8008);
