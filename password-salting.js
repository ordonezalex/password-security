// See https://www.npmjs.com/package/bcrypt
var bcrypt = require("bcrypt");

// Top 100 passwords
// See https://github.com/danielmiessler/SecLists/blob/master/Passwords/10_million_password_list_top_100.txt
var passwords = ['123456', 'password', '12345678', 'qwerty', '123456789',
  '12345', '1234', '111111', '1234567', 'dragon', '123123', 'baseball',
  'abc123', 'football', 'monkey', 'letmein', '696969', 'shadow', 'master',
  '666666', 'qwertyuiop', '123321', 'mustang', '1234567890', 'michael',
  '654321', 'pussy', 'superman', '1qaz2wsx', '7777777', 'fuckyou', '121212',
  '000000', 'qazwsx', '123qwe', 'killer', 'trustno1', 'jordan', 'jennifer',
  'zxcvbnm', 'asdfgh', 'hunter', 'buster', 'soccer', 'harley', 'batman',
  'andrew', 'tigger', 'sunshine', 'iloveyou', 'fuckme', '2000', 'charlie',
  'robert', 'thomas', 'hockey', 'ranger', 'daniel', 'starwars', 'klaster',
  '112233', 'george', 'asshole', 'computer', 'michelle', 'jessica', 'pepper',
  '1111', 'zxcvbn', '555555', '11111111', '131313', 'freedom', '777777', 'pass',
  'fuck', 'maggie', '159753', 'aaaaaa', 'ginger', 'princess', 'joshua',
  'cheese', 'amanda', 'summer', 'love', 'ashley', '6969', 'nicole', 'chelsea',
  'biteme', 'matthew', 'access', 'yankees', '987654321', 'dallas', 'austin',
  'thunder', 'taylor', 'matrix'];

// Ready to store list of hashes
var hashes = [];

// Hash through the top 100 passwords
for (var i = 0; i < passwords.length; i++) {
  // Hash the password (this is async)
  // This uses a difficulty of 10. Check the docs
  bcrypt.hash(passwords[i], 10, function (err, hash) {
    if (err) {
      console.error(err);
    }

    // Store the hash for lookup later
    hashes.push(hash);
  });
}

// Let's say I hacked into a system.
// I have some hashed passwords and
// I want to know what the raw passwords are.

// Let's look up the hashes in the hash table
// and match them to the password list

var myHashes = ['6420ed4d831b436d1e92d25605d18297296374e3',
  '8d6e34f987851aa599257d3831a1af040886842f',
  '7ecfd8f97b4729c6ff0799b0b4d40f870083b461'];

// Time to check to see if they match any of
// the hashes we just found.
// Then we can match the hash to the password

// Loop through my hashes
for (var i = 0; i < myHashes.length; i++) {

  // Loop through the lookup hashes
  for (var j = 0; j < hashes.length; j++) {

    // Check if my hash matches any of the existing hashes
    if (hashes[j] == myHashes[i]) {
      // Found a match!

      console.log('The hash %s matches the password %s', myHashes[i], passwords[j]);
    }
  }
}