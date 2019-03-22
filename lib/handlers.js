/**
 * Request handlers
 */

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
_users.get = (data,callback)=>{

};

/**
 * Users POST
 * Required data: firstName, lastName, phone, password, tosAgreement
 * Optional data: none 
 */
_users.post = (data,callback)=>{

};

// Users PUT
_users.put = (data,callback)=>{

};

// Users DELETE
_users.delete = (data,callback)=>{

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