// See https://nodejs.org/api/crypto.html#crypto_crypto_module_methods_and_properties
var crypto = require("crypto");

// 6 numerical passwords
var passwords = ['123456', '234561', '345612', '456123', '561234', '612345'];

// Ready to store list of hashes
var hashes = [];

// Variables for the hash and the digest
var hash;
var digest;

// Hash through the top 100 passwords
for (var i = 0; i < passwords.length; i++) {
  // Create a new hash object
  hash = crypto.createHash('sha1');

  // Create a non-salted hash
  hash.update(passwords[i]);

  // Format the hash into hex
  digest = hash.digest('hex');

  // Store the hash for lookup later
  hashes.push(digest);
}

// Let's say I hacked into a system.
// I have some hashed passwords and
// I want to know what the raw passwords are.

// Let's look up the hashes in the hash table
// and match them to the password list

var myHashes = ['7c4a8d09ca3762af61e59520943dc26494f8941b',
  'f18f057ea44a945a083a00e6fcc11637d186042d',
  '80fb77d13c62719e96f1acc3c29852b2fa381385'];

var myPlains = [];

// Time to check to see if they match any of
// the hashes we just found.
// Then we can match the hash to the password

var count = 1000;
var found = false;

console.log();
console.log('I have %d hashes to check', myHashes.length);

// Loop through my hashes
for (var i = 0; i < myHashes.length; i++) {
  console.log();
  console.log('----------------------------------------');
  console.log('Looping through my hashes (%d)', i);
  console.log('Trying to crack %s', myHashes[i]);

  found = false;

  // Loop through the lookup hashes
  for (var j = 0; j < hashes.length; j++) {
    // Increase iterations for reducing
    count--;

    console.log('');
    //console.log('----------');
    console.log('Checking if it matches %s', hashes[i]);

    // Check if my hash matches any of the existing hashes
    if (hashes[j] == myHashes[i]) {
      // Found a match!

      console.log('The hash %s matches the password %s', myHashes[i], passwords[j]);

      found = true;

      count = 1000;

      break;
    } else {
      // Only reduce count iterations
      if (count > 0) {

        // Reduce
        var plain = reduction(myHashes[i]);

        console.log('(%d) Reducing %s into %s', (1000 - count), myHashes[i], plain);

        // Rehash
        myHashes[i] = rehash(plain);

        // Try to use my hash and this hash again
        j--;
      }
    }
  }
}

function reduction (hash) {
  return hash.replace(/\D/g, '').substring(0, 6);
}

function rehash (plain) {
  // Create a new hash object
  hash = crypto.createHash('sha1');

  // Create a non-salted hash
  hash.update(plain);

  // Format the hash into hex
  digest = hash.digest('hex');

  return digest;
}