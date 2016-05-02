var edge = require('edge');

var addCredential = edge.func({
    assemblyFile: __dirname + '/edge-keymgr.dll',
    typeName: 'WindowsCredentialManager.Edge.Startup',
    methodName: 'AddCredential'
});

var removeCredential = edge.func({
    assemblyFile: __dirname + '/edge-keymgr.dll',
    typeName: 'WindowsCredentialManager.Edge.Startup',
    methodName: 'RemoveCredential'
});

var getCredential = edge.func({
    assemblyFile: __dirname + '/edge-keymgr.dll',
    typeName: 'WindowsCredentialManager.Edge.Startup',
    methodName: 'GetCredential'
});

function convertCredential (credential) {
    if (credential == null) {
        return null;
    }

    return {
        target: credential.Target,
        username: credential.Username,
        password: credential.Password,
        lastWriteTime: credential.LastWriteTime,
        persistenceType: credential.PersistenceType,
        type: credential.Type
    }
}

module.exports = {
    addCredential: function (credential, callback) {
        if (!credential || typeof credential !== 'object')
            throw new Error("Method 'addCredential' requires a non-null object 'credential'.");
        if (typeof credential.target !== 'string')
            throw new Error("Method 'addCredential' requires an object 'credential' with a string 'target' property.");
        if (typeof credential.username !== 'string')
            throw new Error("Method 'addCredential' requires an object 'credential' with a string 'username' property.");
        if (typeof credential.password !== 'string')
            throw new Error("Method 'addCredential' requires an object 'credential' with a string 'password' property.");
        if (typeof callback !== 'function')
            throw new Error("Non-blocking method 'addCredential' requires a callback. Use 'addCredentialSync' for blocking version.");
        addCredential(credential, callback);
    },
    addCredentialSync: function (credential) {
        if (!credential || typeof credential !== 'object')
            throw new Error("Method 'addCredential' requires a non-null object 'credential'.");
        if (typeof credential.target !== 'string')
            throw new Error("Method 'addCredential' requires an object 'credential' with a string 'target' property.");
        if (typeof credential.username !== 'string')
            throw new Error("Method 'addCredential' requires an object 'credential' with a string 'username' property.");
        if (typeof credential.password !== 'string')
            throw new Error("Method 'addCredential' requires an object 'credential' with a string 'password' property.");
        return addCredential(credential, true);
    },

    removeCredential: function (target, callback) {
        if (typeof target !== 'string' || target.trim().length === 0)
            throw new Error("Method 'removeCredential' requires a non-null string 'target'.");
        if (typeof callback !== 'function')
            throw new Error("Non-blocking method 'removeCredential' requires a callback. Use 'removeCredentialSync' for blocking version.");
        removeCredential(target, callback);
    },
    removeCredentialSync: function (target) {
        if (typeof target !== 'string' || target.trim().length === 0)
            throw new Error("Method 'removeCredentialSync' requires a non-null string 'target'.");
        return removeCredential(target, true);
    },

    getCredential: function (target, callback) {
        if (typeof target !== 'string' || target.trim().length === 0)
            throw new Error("Method 'getCredential' requires a non-null string 'target'.");
        if (typeof callback !== 'function')
            throw new Error("Non-blocking method 'getCredential' requires a callback. Use 'getCredentialSync' for blocking version.");
        getCredential(target, function (err, result) {
            callback(err, convertCredential(result));
        });
    },
    getCredentialSync: function (target) {
        if (typeof target !== 'string' || target.trim().length === 0)
            throw new Error("Method 'getCredentialSync' requires a non-null string 'target'.");
        return convertCredential(getCredential(target, true));
    }
};
