/** Creates and export configuration variables */

// Container for all environment variables
const environment = {};

// Development environment {DEFAULT}
environment.development = {
    'port': 3000,
    'envName': 'development',
    'hashingSecret': 'This is a secret'
}

// Production environments
environment.production = {
    'port': 4200,
    'envName': 'production',
    'hashingSecret': 'This is a secret'
}

let env = process.env.NODE_ENV

// Get the environment passed as the command-line argument
let passedEnvironment = typeof (env) == 'string' ? env : '';

// Get the environment object for the environment passed
let currentEnvironment = environment[passedEnvironment];

// Set the environment to default if the currentEnvironment is not valid
let finalEnvironment = typeof (currentEnvironment) == 'object' ? currentEnvironment : environment.development;

// Export the environment
module.exports = finalEnvironment; 
