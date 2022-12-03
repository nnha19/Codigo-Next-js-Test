import { useState, FormEvent } from "react";

import { useRouter } from "next/router";

import Button from "../components/Button";
import Input from "../components/Input";
import { useAuthContext } from "../contexts/AuthContext";

const AuthPage = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { setUserName } = useAuthContext();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      alert("Username is required");
      return;
    }
    setUserName(value);
    router.push("/teams");
  };

  return (
    <form onSubmit={handleLogin} className="w-48 mx-auto mt-2">
      <Input
        value={value}
        handleChange={(e) => setValue(e.target.value)}
        placeholder="Username"
        name="username"
      />
      <Button className="w-full">Sign In</Button>
    </form>
  );
};

export default AuthPage;
