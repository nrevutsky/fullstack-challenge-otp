import { createOrUpdateUser, getUser } from '../../db/user';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { response } from '../../utils/response';
import { IAuthRequest } from './types';
import { createRefreshToken, createToken } from '../../utils/jwt';

export const handler: APIGatewayProxyHandler = async (event) => {
  if (!event.body) return response(400);

  const body = JSON.parse(event.body) as IAuthRequest;
  if (!body.email) return response(400, { message: 'Email is required' });
  if (!body.otp) return response(400, { message: 'OTP is required' });

  const user = await getUser(body.email);

  if (user?.otp !== body.otp) return response(401, { message: 'Unauthorized' });

  await createOrUpdateUser(body.email, null);

  const accessToken = createToken(body.email);
  const refreshToken = createRefreshToken(body.email);

  return response(200, { accessToken, refreshToken });
};
