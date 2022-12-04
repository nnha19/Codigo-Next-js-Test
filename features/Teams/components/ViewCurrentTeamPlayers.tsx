import { toast } from "react-hot-toast";

import type { Team } from "../../../types";
import Modal from "../../../components/Modal";
import { removePlayer } from "../../../api";

interface IProps {
  allTeams: Team[];
  setSelectedTeamToViewPlayers: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedTeamToViewPlayers: string;
  setAllTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

const ViewCurrentTeamPlayers = ({
  setSelectedTeamToViewPlayers,
  allTeams,
  selectedTeamToViewPlayers,
  setAllTeams,
}: IProps) => {
  const handleRemovePlayer = (id: number) => {
    const updatedTeams = removePlayer(selectedTeamToViewPlayers, id);
    if (updatedTeams) {
      setAllTeams(updatedTeams);
      toast("Removed this player from team");
    }
  };

  const currentTeamMembers = allTeams.find(
    (t) => t.id === selectedTeamToViewPlayers
  )?.players;

  return (
    <div>
      <Modal
        handleModalClose={() => setSelectedTeamToViewPlayers(undefined)}
        header="Team Players"
      >
        {currentTeamMembers?.map((player) => {
          return (
            <div className="flex justify-between py-2">
              <h2>{player.name}</h2>
              <span
                onClick={() => handleRemovePlayer(player.id)}
                className="font-xl hover:cursor-pointer"
              >
                -
              </span>
            </div>
          );
        })}
      </Modal>
    </div>
  );
};

export default ViewCurrentTeamPlayers;
