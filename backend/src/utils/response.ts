interface IResponse {
  statusCode: number;
  headers: {
    [header: string]: string | number | boolean;
  };
  body: string;
}

export const response = (statusCode: number, msg: object = {}): IResponse => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(msg),
  };
};
