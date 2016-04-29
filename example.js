var keymgr = require('edge-keymgr');

var target = 'about:blank';
var username = 'foobar';
var password = 'password123';

keymgr.getCredentialSync(target);

// => null

keymgr.addCredentialSync({
    target: target,
    username: username,
    password: password
});

// => true

keymgr.getCredentialSync(target);

// => {"target":"about:blank","username":"foorbar","password":"password123"}

keymgr.removeCredentialSync(target);

// => true

keymgr.getCredentialSync(target);

// => null
