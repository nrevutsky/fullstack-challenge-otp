import { APIGatewayProxyWithLambdaAuthorizerHandler } from 'aws-lambda';
import { response } from '../../utils/response';
import { AuthorizerContext } from '../../types/authorizer';

export const handler: APIGatewayProxyWithLambdaAuthorizerHandler<AuthorizerContext> =
  async (event) => {
    const { authorizer } = event.requestContext;

    return response(200, { email: authorizer.email });
  };
