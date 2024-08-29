# lambda-global-variables

This project demonstrates good and bad practices of using global variables in AWS Lambda functions.

## Purpose

The purpose of this project is to showcase the implications of using global variables in AWS Lambda functions. 
It includes examples of both correct and incorrect usage of global variables, highlighting potential pitfalls and best practices.

## Examples in this project

- Different approaches of object initialization in Lambda functions
  - Inline handler initialization. - (initialize the object on each run)
  - Inline handler singleton initialization. - (initialize the object once on runtime)
  - Outer initialize outside the function (as global variable) - (initialize once on ColdStart)
- Wrong usage of global variables in Lambda functions
  - Using global variables to store big objects
  - Using global variables to store common usage objects, with wrong handling between invocations
- Good practices of using global variables in Lambda functions
  - Using global variables to store common usage objects, such as static configurations

 By playing with this examples you can also find the ColdStart/runtime differences, as long with memory usage. 
 With better understanding, you may achieve `better performance` (run faster), `lower usage of memory`, which also both affect the `cost` of your lambda!


## Prerequisites

- Node.js >= 20.0.0
- AWS CLI configured with appropriate credentials
- AWS CDK installed globally (`npm install -g aws-cdk`)
- Yarn package manager

## Installation

1. Install dependencies:
   ```sh
   yarn install
   tsc
2. make sure you have the AWS CLI installed and configured with the appropriate credentials.
3. Deploy the stack:
   ```sh
   cdk deploy
   
