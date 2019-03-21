/** 
 * Library for storing and editing the data
 */


const fs = require('fs');
const path = require('path');

// Container for the module to be exported
const lib = {};

// Get the base directory where the files are to be saved
lib.baseDir = path.join(__dirname, '/../.data/');

// This function lets you create new file with the data you provide
lib.create = (dir, file, data, callback) => {

    // Open the file to write the data 
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {

        // Check for errors. If present the return callback with error message 
        if (!err && fileDescriptor) {

            // Convert the data into string
            let stringData = JSON.stringify(data);

            // This function lets you write data to the file
            fs.writeFile(fileDescriptor, stringData, err => {

                // Check for the errors
                if (!err) {

                    // Close the file to save resources
                    fs.close(fileDescriptor, err => {

                        // Check for errors
                        if (!err) {
                            callback(false)
                        } else {
                            callback('Error closing the file')
                        }
                    })
                } else {
                    callback('Error writing to the new file')
                }
            })

        } else {
            callback('Could not create new file, may be it is already present!');
        }
    })
}

module.exports = lib;