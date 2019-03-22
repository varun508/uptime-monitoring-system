/**
 * Request handlers
 */

// Dependencies
const _data = require('./data');

// Define request handlers
const handlers = {};

// Handlers for users
handlers.users = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'delete', 'put'];

    if (acceptableMethods.indexOf(data.method) > -1) {

    } else {
        callback(405)
    }
};

// Container for users sub-methods
handlers._users = {};

// Users GET
_users.get = (data, callback) => {

};

/**
 * Users POST
 * Required data: firstName, lastName, phone, password, tosAgreement
 * Optional data: none 
 */
_users.post = (data, callback) => {

    // Validate the payload data
    let firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    let lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    let phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    let password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 10 ? data.payload.password.trim() : false;
    let tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true;

    if (firstName && lastName && phone && password && tosAgreement) {
        // Make sure that the user does not already exist
        _data.read('users', phone, (err, data) => {
            if (err) {
                // Hash the password
                let hashedPassword = helpers.hash(password);

                if (hashedPassword) {
                    // Create the user object
                    let userObject = {
                        'firstName': firstName,
                        'lastName': lastName,
                        'phone': phone,
                        'hashedPassword': hashedPassword,
                        'tosAgreement': true
                    };

                    // Store the user in the file
                    _data.create('users', phone, userObject, err => {
                        if (!err) {
                            callback(200);
                        } else {
                            console.log(err);
                            callback(500, { 'error': 'Could not create user' });
                        }
                    })
                } else {
                    callback(500, { 'error': 'Could not hash the user\'s spassword' })
                }


            } else {
                callback(400, { 'error': 'A user with that phone number already exist' });
            }
        })

    } else {
        callback(400, { 'error': 'Missing required field' })
    }

};

// Users PUT
_users.put = (data, callback) => {

};

// Users DELETE
_users.delete = (data, callback) => {

};



// Handler for ping route
handlers.ping = (data, callback) => {
    _data.read('dir', 'newFile1', (err, data) => {
        console.log(err)
        console.log(data)
    })
    callback(200);
};

// Handler for all request coming to unknown paths
handlers.notFound = (data, callback) => callback(404)



module.export = handlers;