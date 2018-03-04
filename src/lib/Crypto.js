/**
 * # ErrorAlert.js
 *
 * This class uses a component which displays the appropriate alert
 * depending on the platform
 *
 * The main purpose here is to determine if there is an error and then
 * plucking off the message depending on the shape of the error object.
 */
'use strict';
/**
 * ## Imports
 *
 */
// our configurations
var Config = require('../config'),
    //the crypto library
    crypto = require('crypto'),
    //algorithm for encryption
    algorithm = 'aes-256-ctr',
    privateKey = Config.crypto.privateKey;


/**
 * ### public decrypt
 *
 */
exports.decrypt = function(password) {
  return decrypt(password);
};
/**
 * ### public encrypt
 *
 */
exports.encrypt = function(password) {
  return encrypt(password);
};
/**
 * ## public verifyHashedPassword
 */
exports.verifyHashedPassword = function(passwordHash,password){
  return verifyHashedPassword(passwordHash,password)
}
/**
 * ## public hash password
 */
exports.hashPassword = function(password){
  return hashPassword(password);
}
/**
 * ##  method to decrypt data(password)
 *
 */
function decrypt(password) {
  var decipher = crypto.createDecipher(algorithm, privateKey);
  var dec = decipher.update(password, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}
/**
 * ## method to encrypt data(password)
 *
 */
function encrypt(password) {
  var cipher = crypto.createCipher(algorithm, privateKey);
  var crypted = cipher.update(password, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}


/**
 *  ## method to verify hashed password
 */
function verifyHashedPassword(passwordHash,password){
  var hashedPasswordBytes = new Buffer(passwordHash, 'base64');
  var hexChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
  var saltString = "";
  var storedSubKeyString = "";

  for (var i = 1; i < hashedPasswordBytes.length; i++) {
      if (i > 0 && i <= 16) {
          saltString += hexChar[(hashedPasswordBytes[i] >> 4) & 0x0f] + hexChar[hashedPasswordBytes[i] & 0x0f]
      }
      if (i > 0 && i > 16) {
          storedSubKeyString += hexChar[(hashedPasswordBytes[i] >> 4) & 0x0f] + hexChar[hashedPasswordBytes[i] & 0x0f];
      }
  }
  var nodeCrypto = crypto.pbkdf2Sync(new Buffer(password), new Buffer(saltString, 'hex'), 1000, 256, 'sha1');
  var derivedKeyOctets = nodeCrypto.toString('hex').toUpperCase();

  if (derivedKeyOctets.indexOf(storedSubKeyString) === 0) {
      return true;
  }
  return false;
}

/**
 * ## method to hash password
 */
function hashPassword(password) {
    if(!password) {
        throw new Error("Password is required.");
    }
    var salt = crypto.randomBytes(16);
    var bytes =  crypto.pbkdf2Sync(password, salt, 1000, 32, 'sha1');
    var output = new Buffer(49);
    output.fill(0);
    salt.copy(output, 1, 0, 16);
    bytes.copy(output, 17, 0, 32);
    return output.toString('base64');
}
