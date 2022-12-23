export type ApiResponse<T> = {
  timestamp: string;
  message: string;
  code: number;
  data?: T;
};

export type ApiPageResponse<T> = {
  timestamp: string;
  message: string;
  code: number;
  data: {
    total: number;
    size: number;
    current: number;
    records?: Array<T>;
  };
};

export declare type PageRequest = {
  current: number;
  size: number;
  total: number;
  str?: string;
};
