import AWS from 'aws-sdk';
import { AWSError } from 'aws-sdk';
import { PutItemOutput } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import { User } from './types';

const docClient = new AWS.DynamoDB.DocumentClient();

export const createOrUpdateUser = (
  email: string,
  otp: string | null
): Promise<PromiseResult<PutItemOutput, AWSError>> => {
  const params = {
    TableName: 'user',
    Item: {
      email,
      otp,
    },
  };

  return docClient.put(params).promise();
};

export const getUser = async (email: string): Promise<User | null> => {
  const params = {
    TableName: 'user',
    Key: {
      email,
    },
    AttributesToGet: ['email', 'otp'],
  };

  const res = await docClient.get(params).promise();

  if (res['Item']) {
    return {
      email: res['Item']['email'],
      otp: res['Item']['otp'],
    };
  }

  return null;
};
