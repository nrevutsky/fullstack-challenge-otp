import { APIGatewayProxyHandler } from 'aws-lambda';
import { IlogInRequest } from './types';
import { response } from '../../utils/response';
import { generateOTP } from '../../utils/otp';
import { createOrUpdateUser } from '../../db/user';
import { sendOTPToEmail } from '../../utils/email';

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.body) return response(400);

  const body = JSON.parse(event.body) as IlogInRequest;
  if (!body.email) return response(400, { message: 'Email is required' });

  const otp = generateOTP(6);

  await createOrUpdateUser(body.email, otp);
  await sendOTPToEmail(body.email, otp);

  return response(200, { message: 'Effected' });
};
