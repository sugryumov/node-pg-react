export interface IErrorResponse {
  data: {
    message: string;
    errors: [];
  };
  status: number;
}
