// export class AppError extends Error {
//   statusCode: number;

//   constructor(message: string, statusCode: number = 400) {
//     super();
//     this.message = message;
//     this.statusCode = statusCode;
//   }
// }

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
