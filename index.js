/**
 * Primary file for the API
 */

const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {

    // Get the url and parse it
    let parsedUrl = url.parse(req.url, true);

    // Get the path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '')

    // Send the response
    res.end('path is ' + trimmedPath);
})

server.listen(3000, () => {
    console.log(`Listening on port 3000..`)
})