# Fullstack Challenge OTP

### Challenge

1. Your challenge is to build and deploy a serverless application on AWS.  The application consists of the below steps:
    1. User navigates to your site on Amazon S3
    2. User enters their email into the site to request an OTP (one time password)
    3. User receives an email with the OTP
    4. User enters OTP received in their inbox and the application will validate the OTP by confirming via the frontend that the OTP is correct

### Architecture

The goal is to build the application in a serverless method using native AWS services

1. The frontend to be hosted on Amazon S3 using React
2. The development platform should be Node.js hosted on AWS Lambda
3. API Gateway should be used to integrate with the frontend S3 site with the Node.js application on Lambda
4. Emailing capabilities can be enabled using AWS SES
