/**
 * Primary file for the API
 */

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const _data = require('./lib/data');

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

    // Extract the method
    let method = req.method.toLowerCase();

    // Get the payload, if any
    let decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', data => buffer += decoder.write(data));

    req.on('end', () => {
        buffer += decoder.end()

        // Choose the handler for incoming request. If the handler is not found then use handlers.notFound
        let handler = router[trimmedPath]
        let chosenHandler = typeof (handler) !== 'undefined' ? handler : handlers.notFound;

        // Bundle all the extracted data parts in an Object
        let data = {
            'path': trimmedPath,
            'payload': buffer,
            'headers': headers,
            'queryObjects': queryStringObject,
            'method': method
        }

        chosenHandler(data, (statusCode, responsePayload) => {

            // Set the status code to 200 HTTP_OK when the statusCode is of type other than the number
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // Return an empty object if the payload is not an object
            responsePayload = typeof (responsePayload) == 'object' ? responsePayload : {};

            // Convert the payload object into string
            let payloadString = JSON.stringify(responsePayload);

            // Send the response as JSON
            res.setHeader('Content-Type', 'application/json');

            // Set the status code to response and return the response
            res.writeHead(statusCode);
            res.end(payloadString);
        })

        res.end(buffer);
    });
})


// Make the server listen to requests on port 3000
server.listen(config.port, () => console.log(`Listening on port ${config.port} in ${config.envName} mode...`))

// Define request handlers
const handlers = {

    // Handler for ping route
    ping: (data, callback) => {
        _data.read('dir', 'newFile1', (err, data) => {
            console.log(err)
            console.log(data)
        })
        callback(200);
    },

    // Handler for all request coming to unknown paths
    notFound: (data, callback) => callback(404)
}

// Define the request routers
const router = {
    'ping': handlers.ping
}