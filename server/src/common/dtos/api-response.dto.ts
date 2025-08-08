export class ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  statusCode: number;
  timeStamp: Date;

  private constructor( success: boolean, message: string, data: T | undefined, errors: string[] | undefined, statusCode: number,) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
    this.statusCode = statusCode;
    this.timeStamp = new Date();
  }

  static SuccessResponse<T>(data: T, statusCode: number, message = ''): ApiResponse<T> {
    return new ApiResponse<T>(true, message, data, undefined, statusCode);
  }

  static ErrorResponse<T>(errors: string[], statusCode: number, message = ''): ApiResponse<T> {
    return new ApiResponse<T>(false, message, undefined, errors, statusCode);
  }
}
