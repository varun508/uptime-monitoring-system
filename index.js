/**
 * Primary file for the API
 */

import { createServer } from 'http';
import { parse } from 'url';


const server = createServer((req, res) => {

    // Get the url and parse it
    let parsedUrl = parse(req.url, true);

    // Get the path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '')

    // Send the response
    res.end('path is ' + trimmedPath);
})

server.listen(3000, () => {
    console.log(`Listening on port 3000..`)
})