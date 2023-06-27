export interface MOEndpoint {
  api: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PATCH';
  param?: boolean;
}
