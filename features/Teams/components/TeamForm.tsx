import React, { useEffect, useState } from "react";
import ErrorMsg from "../../../components/ErrorMsg";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";
import { Team, TeamFormField } from "../../../types";

interface IProps {
  handleSubmit: (values: TeamFormField) => void;
  initValue?: Omit<Team, "id">;
  isEditing?: boolean;
  handleHideForm: () => void;
}

const teamFields = [
  { name: "name", placeholder: "Name" },
  { name: "region", placeholder: "Region" },
  { name: "country", placeholder: "Country" },
];

const TeamForm = ({
  handleSubmit,
  initValue,
  isEditing,
  handleHideForm,
}: IProps) => {
  const [teamVal, setTeamVal] = useState<TeamFormField>({
    name: "",
    region: "",
    country: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTeamVal((pre) => ({ ...pre, [name]: value }));
  };
  const [formIsInvalid, setFormIsInvalid] = useState(false);

  const onSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasInvalidField = Object.entries(teamVal).some(([, value]) => !value);
    if (hasInvalidField) {
      setFormIsInvalid(true);
      return;
    }
    // Check validation
    handleSubmit(teamVal);
  };

  useEffect(() => {
    if (!initValue) return;
    setTeamVal(initValue);
  }, [initValue]);

  return (
    <>
      <Modal
        handleModalClose={handleHideForm}
        header={isEditing ? "Edit Team" : "Create New Team"}
      >
        <form onSubmit={onSubmitClick}>
          {formIsInvalid && (
            <ErrorMsg
              hideErrorMsg={() => setFormIsInvalid(false)}
              mainTitle="Error"
              description="All fields are required"
            />
          )}
          {teamFields.map((field) => (
            <Input
              value={teamVal[field.name as keyof typeof teamVal]}
              handleChange={handleChange}
              {...field}
            />
          ))}
          <button className="w-full bg-purple-50 p-1 rounded-lg">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default TeamForm;
