export type ApiQueryValue = string | string[] | undefined;

export interface ApiRequest<TBody = Record<string, unknown>> {
  method?: string;
  body?: TBody;
  query: Record<string, ApiQueryValue>;
  headers: Record<string, ApiQueryValue>;
  socket: {
    remoteAddress?: string | null;
  };
}

export interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
  write: (chunk: string) => void;
}
