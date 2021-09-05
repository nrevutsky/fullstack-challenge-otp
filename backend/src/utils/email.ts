import { SendEmailResponse } from 'aws-sdk/clients/ses';
import { PromiseResult } from 'aws-sdk/lib/request';
import AWS, { AWSError } from 'aws-sdk';

const SES = new AWS.SES();

export const sendOTPToEmail = (email: string, otp: string):  Promise<PromiseResult<SendEmailResponse, AWSError>> => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `
              <p>OTP: <b>${otp}</b>
          `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Fullstack Challenge OTP',
      },
    },
    Source: 'fullstack.challenge.otp@gmail.com',
    ReplyToAddresses: [email],
  };

  return SES.sendEmail(params).promise();
};
