export type Team = {
  name: string;
  region: string;
  country: string;
  id: string;
  players: { name: string; id: number }[];
};

export type Player = {
  first_name: string;
  height_feet: null | string;
  height_inches: null | string;
  id: number;
  last_name: string;
  position: string;
  team: Team;
};

export type TeamFormField = Omit<Team, "id" | "players">;
