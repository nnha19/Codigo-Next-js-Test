import { Team } from "./types";

const getTeams = () => {
  const teams = localStorage.getItem("teams");
  if (teams) return JSON.parse(teams);
};

export const createTeam = (newTeam: Team) => {
  const teams = localStorage.getItem("teams");

  if (teams) {
    const teamsArray = JSON.parse(teams);
    teamsArray.push(newTeam);
    localStorage.setItem("teams", JSON.stringify(teamsArray));
  } else {
    localStorage.setItem("teams", JSON.stringify([newTeam]));
  }
};

export const deleteTeam = (teamId: string) => {
  const teams = localStorage.getItem("teams");
  if (teams) {
    const updatedTeams = JSON.parse(teams).filter(
      (team: Team) => team.id !== teamId
    );
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  }
};

export const editTeam = (newTeam: Team, teamId: string) => {
  const teams = localStorage.getItem("teams");
  if (!teams) return;

  const updatedTeams = JSON.parse(teams).map((team: Team) => {
    if (team.id === teamId) return newTeam;
    return team;
  });
  localStorage.setItem("teams", JSON.stringify(updatedTeams));

  return updatedTeams;
};

export const addNewPlayerToTeam = (
  teamId: string,
  newPlayer: { name: string; id: number }
) => {
  const teams = localStorage.getItem("teams");
  if (teams) {
    const teamsArray = JSON.parse(teams) as Team[];

    const updatedTeams = teamsArray.map((team) => {
      if (team.id === teamId) {
        return {
          ...team,
          players: [...team.players, newPlayer],
        };
      }
      return team;
    });
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    return updatedTeams;
  }
};

export const removePlayer = (teamId: string, playerId: number) => {
  const allTeams: Team[] = getTeams();
  const currentTeam = allTeams.find((t) => t.id === teamId);
  if (!currentTeam) return;
  currentTeam.players = currentTeam.players.filter((p) => p.id !== playerId);

  localStorage.setItem("teams", JSON.stringify(allTeams));
  return allTeams;
};
