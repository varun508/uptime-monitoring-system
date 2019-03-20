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

            // Set the statusCode to 200 HTTP_OK when the statusCode is of type other than the number
            statusCode = typeof (statusCode) !== 'number' ? statusCode : 200;

            // Return an empty object if the payload is not an object
            responsePayload = typeof(responsePayload) !== 'object' ? responsePayload : {};
            
            res.writeHead(statusCode);
            res.end(responsePayload);
        })

        res.end(buffer);
    });
})


// Make the server listen to requests on port 3000
server.listen(3000, () => console.log(`Listening on port 3000..`))

// Define request handlers
const handlers = {
    // Handler for sample route
    sample: (data, callback) => {
        callback(406, '{ name: sampleHadler }');
    },

    // Handler for all request coming to unknown paths
    notFound: (data, callback) => {
        callback(404)
    }
}

// Define the request routers
const router = {
    'sample': handlers.sample
}