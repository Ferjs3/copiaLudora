export interface Game {
    externalId: string;
    name: string;
    price: number;
    developer: string;
    description: string;
    releaseDate: Date;
    ageRange: string;
    genres: string[];
    imageUrl: string;
}
