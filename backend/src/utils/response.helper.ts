// src/common/helpers/response.helper.ts

export class ResponseHelper {
  static success(data: unknown, message: string = 'Success') {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message: string, data: unknown = null) {
    return {
      status: 'error',
      message,
      data,
    };
  }
}
