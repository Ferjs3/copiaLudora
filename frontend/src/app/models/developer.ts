export interface Developer {
  externalId: string;
  name: string;
  lastName: string;
  userName: string;
  company: string;
}

export interface Page<T> {
  content: T[];
  totalPages?: number;
  totalElements?: number;
  number?: number;
  size?: number;
  page?: {
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
  };
}