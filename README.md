# Login Service
![Badge](https://img.shields.io/badge/-Javascript-yellow)
![Badge](https://img.shields.io/badge/-Node.js-yellow)
![Badge](https://img.shields.io/badge/AWS-DynamoDB-red)
![Badge](https://img.shields.io/badge/AWS-Lambda-red)


## Description
This is a login service that will be linked to multiple apps in my application network to allow for easy login. This application is written in javascript and is hosted using AWS. It makes use of the AWS-SDK node module for intergration with AWS, the bcrypt module for password encryption, and JSON Web Token module for token issuing and authorization. User information is stored in a DynamoDB database connected to Lambda, accessible via API Gateway.

## Table of Contents
 - [Description](#description)
 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Contributing](#contributing)
 - [Tests](#tests)
 - [Questions](#questions)
 ## Installation

N/A
 
 ## Usage

There are 3 calls that can be made to the user API, a POST login route (/login), a POST register route (/register), and a GET verification route (/verifytoken). Additionally, there are GET and PUT routes available for calls to the userdata table.

## License
This application is available under the MIT license.

Copyright 2023 Daniel Banfield-Keller

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing
Please reach out if you have any contributions or suggestions to make. I can be reached at DPAJBK@gmail.com

## Tests
N/A

## Questions
If you have any questions please feel free to reach out to me via email at DPAJBK@gmail.com