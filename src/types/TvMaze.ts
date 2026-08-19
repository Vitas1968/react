export type TvMazeImage = {
  medium: string;
};

export type TvMazeShow = {
  id: number;
  name: string;
  image: TvMazeImage | null;
};

export type TvMazeSearchResult = {
  show: TvMazeShow;
};