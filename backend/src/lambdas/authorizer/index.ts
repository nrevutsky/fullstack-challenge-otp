import { verifyToken } from '../../utils/jwt';
import { ITokenData, TOKEN_TYPE } from '../../types/jwt';
import { getUser } from '../../db/user';
import {
  APIGatewayTokenAuthorizerEvent,
  Context,
  APIGatewayAuthorizerResult,
  Callback,
} from 'aws-lambda';

const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
) => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
    context: {
      email: principalId,
    },
  };
};

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent,
  _: Context,
  callback: Callback<APIGatewayAuthorizerResult>
) => {
  try {
    if (!event.authorizationToken) return callback('Unauthorized');

    const tokenParts = event.authorizationToken.split(' ');

    if (!(tokenParts[0] === 'Bearer' && tokenParts[1])) {
      return callback('Unauthorized');
    }

    const { email, type } = verifyToken(tokenParts[1]) as ITokenData;

    if (type !== TOKEN_TYPE.ACCESS_TOKEN) return callback('Unauthorized');

    const user = await getUser(email);

    if (!user?.email) return callback('Unauthorized');

    return generatePolicy(email, 'Allow', event.methodArn);
  } catch (e) {
    return callback('Unauthorized');
  }
};
