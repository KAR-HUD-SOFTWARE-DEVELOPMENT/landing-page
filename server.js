const http = require("http");
const fs = require("fs/promises");

const getFiles = async () => {
    const indexHtml = await fs.readFile("./index.html");
    const indexJs = await fs.readFile("./dist/r.bundle.js");
    return [indexHtml, indexJs];
};

const registrations = [];
let logged = false

http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles();
    const [shortUrl, urlData] = url.split('=');

    switch(shortUrl) {
        case '/':
            logged = false
            res.writeHead(200, { "Content-Type": "text/html" })
            res.write(indexHtml);
            res.end();
            break;
        case '/js':
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(indexJs);
            res.end();
            break;
        case '/registration':
            logged = false
            if (urlData) {
                let exist = false
                const decodedData = JSON.parse(decodeURIComponent(urlData));
                exist = registrations.some(registration =>
                    registration.email === decodedData.email
                );
                !exist && registrations.push(decodedData);
                res.writeHead(!exist ? 201 : 403, { "Content-Type": "text/plain" });
                res.write(!exist ? 'użytkownik zarejestrowany poprawnie' : 'użytkownik istnieje');
            }
            else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(indexHtml);
            }
            res.end();
            break;
        case '/logged':
            if (urlData) {
                const decodedData = JSON.parse(decodeURIComponent(urlData))
                logged = registrations.some(registration => 
                    registration.email === decodedData.email && 
                    registration.password === decodedData.password
                )
            }
            if (logged) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(indexHtml);
            } 
            else {
                res.writeHead(422, { "Content-Type": "text/plain" });
                res.write('nie jesteś zalogowany');
            }
            res.end();
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write('wypad');
            res.end();
    }
    }).listen(8888);
