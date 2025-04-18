// src/common/helpers/response.helper.ts

export class ResponseHelper {
  private static messageMap: Record<number, string> = {
    200: 'OK',
    201: 'Created Successfully',
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    409: 'User Already Exists',
    500: 'Internal Server Error',
    // you can add more...
  };

  static success<T>(data: T, code: number = 200) {
    return {
      status: 'success',
      message: `${code}: ${this.messageMap[code] ?? 'Success'}`,
      data,
    };
  }

  static error(code: number, data: unknown = null) {
    return {
      status: 'error',
      code,
      message: `${code}: ${this.messageMap[code] ?? 'Error'}`,
      data,
    };
  }
}
