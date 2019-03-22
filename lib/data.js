/** 
 * Library for storing and editing the data
 */


const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

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

// Read data from the file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', (err, data) => {
        if (!err && data) {
            let parsedData = helpers.parseJsonToObject(data);
            callback(false, parsedData);
        } else {
            callback(err, data);
        }
    })
}

//  Update an existing file
lib.update = (dir, file, data, callback) => {
    // Open the file for updating
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {

            // Convert the data object into string
            let stringData = JSON.stringify(data);

            // Truncate the file
            fs.truncate(fileDescriptor, err => {
                // Check for trncating error
                if (!err) {

                    // Write the data into file
                    fs.writeFile(fileDescriptor, stringData, err => {
                        // Check for writing error
                        if (!err) {

                            // Close the file
                            fs.close(fileDescriptor, err => {
                                // Check for closing error
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('Error closing existing file');
                                }
                            })
                        } else {
                            callback('Error writing data to existing file');
                        }
                    })
                } else {
                    callback('Error triuncating existing file');
                }
            })
        } else {
            callback('Error opening existing file');
        }
    })
}


lib.delete = (dir, file, callback) => {
    fs.unlink(lib.baseDir + dir + '/' + file + '.json', err => {
        if (!err) {
            callback(false)
        } else {
            callback('Error deleting the file');
        }
    })
}


module.exports = lib;