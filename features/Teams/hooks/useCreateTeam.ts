import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import type { Team, TeamFormField } from "../../../types";
import { createTeam } from "../../../api";

interface CreateTeamArgs {
  setAllTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  allTeams: Team[];
  setDisplayCreateTeamForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const useCreateTeam = ({
  setAllTeams,
  allTeams,
  setDisplayCreateTeamForm,
}: CreateTeamArgs) => {
  const handleCreateTeam = (newTeam: TeamFormField) => {
    // Validate unique name
    const teamAlreadyExist = allTeams.some(
      (team) => team.name === newTeam.name
    );

    if (teamAlreadyExist) {
      toast("Team name already exist");
      return;
    }

    const newTeamWithId = { ...newTeam, id: uuidv4(), players: [] };

    createTeam(newTeamWithId);
    setAllTeams((pre) => [...pre, newTeamWithId]);

    toast("Team has been created successfully.");
    setDisplayCreateTeamForm(false);
  };

  return handleCreateTeam;
};

export default useCreateTeam;
