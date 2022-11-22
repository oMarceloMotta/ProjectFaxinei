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
  latitude: string;
  longitude: string;
};

export type ClientPositions = { [key: string]: ClientPositions };

export type AppState = {
  isLoading: boolean;
  user: UserState;
};
