export type TvMazeImage = {
  medium: string;
};

export type TvMazeShow = {
  id: number;
  name: string;
  image: TvMazeImage | null;
  summary: string | null;
  genres: string[];
  premiered: string | null;
  rating: {
    average: number | null;
  };
};

export type TvMazeSearchResult = {
  show: TvMazeShow;
};
