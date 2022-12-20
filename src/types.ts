export type UserState = {
  id: string;
  coords: Coords;
};
export type ClientState = {
  id: string;
  name: string;
  dateWorked: string;
  price: string;
  phone: string;
  coords: Coords;
};

export type Coords = {
  latitude: number;
  longitude: number;
};

export type ClientPositions = { [key: string]: ClientPositions };

export type AppState = {
  isLoading: boolean;
  user: UserState;
  dark: boolean;
};

export type FeedState = {
  imageSrc: string;
  content: string;
  title: string;
};

export type FeedCardProps = {
  imageSrc: string;
  title: string;
  content: string;
};
