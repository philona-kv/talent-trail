import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export class RequestUtil {
   static async sendRequest<T>(method: Method, url: string, data?: any, headers?: any) {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        data,
        timeout: 5000,
        headers,
      };
      const response: AxiosResponse<T> = await axios(config);
      return { isSuccess: true, data: response.data };
    } catch (error) {
      return {
        isSuccess: false,
        error: `Request failed: ${JSON.stringify(error?.response?.data)}`,
        errorStack: error,
      };
    }
  }
}
