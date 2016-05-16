edge-keymgr
===========

Simple API for accessing the Windows Credential Manager.

This project uses [edge](http://tjanczuk.github.io/edge) in order to call a .NET assembly ([Windows Credentials Manager Api](https://www.nuget.org/packages/Simple.CredentialManager)) from node.

The name comes from the dll name of the Windows Credential Manager => Run: `control keymgr.dll`.

## Install

`npm install edge-keymgr`

## Example

For each 'Sync' method below, there is a corresponding async version, which also takes a callback argument.  

```js

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

```
