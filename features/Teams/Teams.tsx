import { useEffect, useState } from "react";
import Backdrop from "../../components/Backdrop";
import Button from "../../components/Button";

import { Team } from "../../types";
import TeamForm from "./components/TeamForm";
import TeamList from "./components/TeamList";
import useCreateTeam from "./hooks/useCreateTeam";

const Teams = () => {
  const [allTeams, setAllTeams] = useState([] as Team[]);
  const [displayCreateTeamForm, setDisplayCreateTeamForm] = useState(false);

  const handleCreateTeam = useCreateTeam({
    allTeams,
    setAllTeams,
    setDisplayCreateTeamForm,
  });

  useEffect(() => {
    const teams = localStorage.getItem("teams");

    if (teams) {
      setAllTeams(JSON.parse(teams));
    }
  }, []);

  return (
    <>
      <div className="w-4/5 mx-auto">
        <div className="flex justify-between px-6 py-2">
          <h1 className="font-bold text-lg">Teams and Team Members</h1>
          <div className="w-max">
            <Button onClick={() => setDisplayCreateTeamForm(true)}>
              Create Team
            </Button>
          </div>
        </div>
        <TeamList setAllTeams={setAllTeams} allTeams={allTeams} />
      </div>

      {displayCreateTeamForm && (
        <TeamForm
          handleHideForm={() => setDisplayCreateTeamForm(false)}
          handleSubmit={handleCreateTeam}
        />
      )}
    </>
  );
};

export default Teams;
