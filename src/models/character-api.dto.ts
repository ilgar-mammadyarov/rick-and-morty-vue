export interface CharacterApiDto {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  };
  results: CharacterResultApiDto[];
}

export interface CharacterResultApiDto {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: Date;
}
