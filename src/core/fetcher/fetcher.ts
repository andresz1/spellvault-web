import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export type Fetcher = AxiosInstance;
export type FetcherResponse<T> = AxiosResponse<T>;
export const FetcherError = AxiosError;

export class FetcherFactory {
  static create({
    cookieHeader,
  }: Partial<{ cookieHeader: string }> = {}): Fetcher {
    const fetcher = axios.create();

    fetcher.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    fetcher.defaults.timeout = 500000;

    fetcher.interceptors.request.use((config) => {
      if (cookieHeader) {
        config.headers.cookie = cookieHeader;
      }

      return config;
    });

    return fetcher;
  }
}
