import { HttpStatus } from '@nestjs/common';

export const formatResponse = (
  data: unknown,
  status?: number,
  message?: string,
) => {
  return {
    statusCode: status || HttpStatus.OK,
    message: message || '',
    data: data || {},
  };
};
