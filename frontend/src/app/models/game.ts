export interface Game {
    externalId: string;
    name: string;
    frontPage: string;
    price: number;
    developer: string;
    description: string;
    releaseDate: Date;
    ageRange: string;
    genres: string[];
    statusBlocked: boolean;
    discountPercentage?: number; //prueba para tabla de ofertas en home
    finalPrice?: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}