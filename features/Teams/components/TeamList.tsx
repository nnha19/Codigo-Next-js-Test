import { useState } from "react";

import toast from "react-hot-toast";

import { deleteTeam, editTeam } from "../../../api";
import type { Team, TeamFormField } from "../../../types";
import AddTeamPlayer from "./AddTeamPlayer/AddTeamPlayer";
import TeamForm from "./TeamForm";
import ViewCurrentTeamPlayers from "./ViewCurrentTeamPlayers";

interface IProps {
  allTeams: Team[];
  setAllTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}

const TeamList = ({ allTeams, setAllTeams }: IProps) => {
  const [editTeamValue, setEditTeamValue] = useState<Team>();
  const [selectedTeamToAddPlayers, setSelectedTeamToAddPlayers] =
    useState<string>();
  [];
  const [selectedTeamToViewPlayers, setSelectedTeamToViewPlayers] =
    useState<string>();

  const handleDeleteTeam = (id: string) => {
    const newTeams = allTeams.filter((t) => t.id !== id);
    setAllTeams(newTeams);
    deleteTeam(id);
  };

  const handleEditTeam = (editedTeam: TeamFormField) => {
    if (!editTeamValue) return;

    const invalidTeamName = allTeams.some((t) => t.name === editedTeam.name);
    if (invalidTeamName) {
      toast("Team name already exists");
      return;
    }

    const updatedTeams = editTeam(
      { ...editedTeam, id: editTeamValue.id, players: editTeamValue.players },
      editTeamValue.id
    );
    setAllTeams(updatedTeams);
    setEditTeamValue(undefined);
    toast("Team has been upated successfully.");
  };

  return (
    <>
      <div>
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Player
                </th>
                <th scope="col" className="py-3 px-6">
                  Region
                </th>
                <th scope="col" className="py-3 px-6">
                  Country
                </th>
                <th scope="col" className="py-3 px-6">
                  Add Player
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allTeams.map((team) => {
                const { name, region, country, id } = team;
                return (
                  <tr
                    key={id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {name}
                    </th>
                    <td
                      onClick={() => setSelectedTeamToViewPlayers(team.id)}
                      className="py-4 px-6 text-blue-400 underline hover:cursor-pointer"
                    >
                      {team.players.length}
                    </td>
                    <td className="py-4 px-6">{region}</td>
                    <td className="py-4 px-6">{country}</td>
                    <td
                      onClick={() => setSelectedTeamToAddPlayers(id)}
                      className="py-4 px-6"
                    >
                      +
                    </td>
                    <td className="py-4 px-6 flex">
                      <button
                        onClick={() => setEditTeamValue(team)}
                        className="mr-2"
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteTeam(id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editTeamValue && (
        <TeamForm
          handleHideForm={() => setEditTeamValue(undefined)}
          initValue={editTeamValue}
          handleSubmit={handleEditTeam}
        />
      )}

      {selectedTeamToAddPlayers && (
        <AddTeamPlayer
          selectedTeamToAddPlayers={selectedTeamToAddPlayers}
          setAllTeams={setAllTeams}
          setSelectedTeamToAddPlayers={setSelectedTeamToAddPlayers}
          allTeams={allTeams}
        />
      )}

      {selectedTeamToViewPlayers && (
        <ViewCurrentTeamPlayers
          allTeams={allTeams}
          setSelectedTeamToViewPlayers={setSelectedTeamToViewPlayers}
          selectedTeamToViewPlayers={selectedTeamToViewPlayers}
          setAllTeams={setAllTeams}
        />
      )}
    </>
  );
};

export default TeamList;
