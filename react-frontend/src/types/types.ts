export type RouterError = {
  statusText: string;
  message: string;
}

export type Rate = {
  id: number;
  created_at: string;
  updated_at: string;
  currency: string;
  exchange_rate: number;
}

export type PaginationEvent = {
  selected: number;
}

export type Currency = string;