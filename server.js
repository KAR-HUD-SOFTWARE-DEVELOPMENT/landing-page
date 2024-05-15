const http = require("http");
const fs = require("fs/promises");


const getFiles = async () => {
    const indexHtml = await fs.readFile("./index.html");
    const indexJs = await fs.readFile("./dist/r.bundle.js");
    return [indexHtml, indexJs];
};



const registrations = []
const sessions = {};


http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles();
    if (url.includes("Registration")) {
        const registrationObjectUrl = url.split('=')[1];
        const decodedReg = JSON.parse(decodeURIComponent(registrationObjectUrl));
        const exists = registrations.some(registration =>
            registration.email === decodedReg.email)
        if (!exists) {
            registrations.push(decodedReg)
            const stringi = JSON.stringify(decodedReg)
            const buffer = Buffer.from(stringi)
            res.writeHead(201, { "Content-Type": "text/javascript" });
            res.write(buffer);
            res.end();
            }else if(exists){
            res.writeHead(409, { "Content-Type": "text/javascript" })
            res.write(exists.toString())
            res.end()
            }
        }
        else if (url.includes("youLogIn")) {
            const LoginObjectUrl = url.split('=')[1]
            const decodedlog = JSON.parse(decodeURIComponent(LoginObjectUrl));
            const stringi = JSON.stringify(decodedlog)
            let loggedIn = registrations.some(registration => 
                registration.email === decodedlog.email &&
                registration.password === decodedlog.password)
            if (loggedIn) {
                const buffer = Buffer.from(stringi)
                const sessionId = generateUniqueSessionId()
                sessions[sessionId] = { email: decodedlog.email }
                res.setHeader('Set-Cookie', `session=${sessionId}Path=/`)
                res.write(buffer)
                res.end();
            } else {
                res.writeHead(422, { "Content-Type": "text/javascript" })
                res.end('{"error": "Invalid credentials"}');
            }
        }
        else {
        switch (url) {
            case '/':
                res.writeHead(200, { "Content-Type": "text/html" })
                res.write(indexHtml)
                res.end()
                break
            case '/js':
                res.writeHead(200, { "Content-Type": "text/javascript" })
                res.write(indexJs)
                res.end()
                break
            default:
                res.writeHead(404)
                res.write('Strona nie znaleziona')
                res.end()
        }
    }
}).listen(8008)
const generateUniqueSessionId =()=> {
    return Math.random().toString(36).substring(2, 15);
}