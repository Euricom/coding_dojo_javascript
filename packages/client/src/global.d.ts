declare module '*.svg';

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      VERSION: string;
      BUILD_DATE: string;
      REACT_APP_API_BASE_URL: string;
    }
  }
}

export {};
