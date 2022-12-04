import { toast } from "react-hot-toast";

import { addNewPlayerToTeam } from "../../../../api";
import Modal from "../../../../components/Modal";
import Spinner from "../../../../components/Spinner";
import { Player, Team } from "../../../../types";
import useFetchPlayers from "./useFetchPlayers";

interface IProps {
  setSelectedTeamToAddPlayers: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedTeamToAddPlayers: string;
  setAllTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  allTeams: Team[];
}

const AddTeamPlayer = ({
  setSelectedTeamToAddPlayers,
  selectedTeamToAddPlayers,
  setAllTeams,
  allTeams,
}: IProps) => {
  const { loader, list: players, loading } = useFetchPlayers();

  const handleAddPlayer = (newPlayer: { name: string; id: number }) => {
    // Check if player is already in the team

    const updatedTeams = addNewPlayerToTeam(
      selectedTeamToAddPlayers,
      newPlayer
    );
    if (updatedTeams) setAllTeams(updatedTeams);
    toast("Successfully added this player to the team");
  };

  return (
    <div>
      <Modal
        handleModalClose={() => setSelectedTeamToAddPlayers(undefined)}
        show
        header="Add Player"
      >
        {players.map((player) => {
          const playerName = `${player.first_name} ${player.last_name}`;

          const playerAlreadyHasTeam = allTeams
            .map((team) => team.players)
            .flat()
            .some((p) => p.id === player.id);

          return (
            <div className="flex justify-between py-2">
              <h2>{playerName}</h2>

              {!playerAlreadyHasTeam && (
                <span
                  onClick={() =>
                    handleAddPlayer({ name: playerName, id: player.id })
                  }
                  className="font-xl hover:cursor-pointer"
                >
                  +
                </span>
              )}
            </div>
          );
        })}
        {loading && <Spinner />}
        <div className="my-4" ref={loader} />
      </Modal>
    </div>
  );
};

export default AddTeamPlayer;
