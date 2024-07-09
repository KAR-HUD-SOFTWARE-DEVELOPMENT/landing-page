const http = require("http");
const fs = require("fs/promises");
const finnhub = require('finnhub');

const getFiles = async () => {
    const indexHtml = await fs.readFile("./index.html");
    const indexJs = await fs.readFile("./dist/r.bundle.js");
    return [indexHtml, indexJs];
};

const registrations = [];
let logged = false;

http.createServer(async ({ url }, res) => {
    const [indexHtml, indexJs] = await getFiles();
    const [shortUrl, urlData] = url.split('=');

    const stockSymbol = async() => {
            return new Promise((resolve, reject) => {
            const api_key = finnhub.ApiClient.instance.authentications['api_key'];
            api_key.apiKey = "cq5r2gpr01qhs6iu22igcq5r2gpr01qhs6iu22j0";
            const finnhubClient = new finnhub.DefaultApi();
            finnhubClient.stockSymbols("US", (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    };
       
    switch(shortUrl) {
        case '/':
            logged = false;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(indexHtml)
            res.end();
            break;
        case '/js':
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.write(indexJs);
            res.end();
            break;
        case '/registration':
            logged = false;
            if (urlData) {
                let exist = false;
                const decodedData = JSON.parse(decodeURIComponent(urlData));
                exist = registrations.some(registration =>
                    registration.email === decodedData.email
                );
                if (!exist) {
                    registrations.push(decodedData);
                }
                res.writeHead(!exist ? 201 : 403, { "Content-Type": "text/plain" });
                res.write(!exist ? 'użytkownik zarejestrowany poprawnie' : 'użytkownik istnieje');
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(indexHtml);
            }
            res.end();
            break;
        case '/logged':
            if (urlData) {
                const decodedData = JSON.parse(decodeURIComponent(urlData));
                logged = registrations.some(registration => 
                    registration.email === decodedData.email && 
                    registration.password === decodedData.password
                );
            }
            if (logged) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(indexHtml);
            } else {
                res.writeHead(422, { "Content-Type": "text/plain" });
                res.write('nie jesteś zalogowany');
            }
            res.end();
            break;
        case '/getApi':
                stockSymbol()
                    .then(Data => {
                        const stringi = JSON.stringify(Data);
                        const buffer = Buffer.from(stringi);
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.write(buffer);
                        res.end();
                    })
                    .catch(error => {
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.write('Error');
                        res.end();
                    });
                break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write('wypad');
            res.end();
    }
}).listen(8008);
