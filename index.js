/**
 * Primary file for the API
 */

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;


const server = http.createServer((req, res) => {

    // Get the url and parse it
    let parsedUrl = url.parse(req.url, true);

    // Get the path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '')

    // Extract the query parameters 
    let queryStringObject = parsedUrl.query;

    // Extract all headers
    let headers = req.headers;

    // Get the payload, if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', data => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();
        console.log('here\'s the buffer: ' + buffer);
    });

    // Send the response
    console.log(headers)

    res.end();
})

server.listen(3000, () => {
    console.log(`Listening on port 3000..`)
})