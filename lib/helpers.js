/**
 * Contains helper fucntions for various tasks 
 */

// Dependencies
const crypto = require('crypto');
const config = require('../config');

// Container for the helper methods
const helpers = {};

// Create a SHA256 hash
helpers.hash = str => {
    if (typeof (str) == 'string' && str.length > 0) {
        let hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

// Parse a JSON string to an Object in all cases, without throwing
helpers.parseJsonToObject = str => {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (err) {
        return {};
    }
};


helpers.createRandomString = length => {
    length = typeof (length) == 'number' && length > 0 ? length : false;

    if (length) {
        // List of possible characters used to generate the final token
        let possibleChars = 'abcdefghijklmnopqrstuvqxyz1234567890';

        // Start the final string
        let str = '';

        for (let i = 0; i <= length; i++) { 
            // Generate a random character from the list of possible characters
            var randomCharacter = possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
            // Append therandom char to the final string
            str += randomCharacter;
        }

        // Return token
        return str
    } else {
        return false;
    }
}

// Export the module
module.exports = helpers;