import { Response } from '../response/interface/response.interface';
export function composeResponse<T>(response: Response<T>): Response<T> {
  return response;
}
