import Link from "next/link";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { username, setUserName } = useAuthContext();

  return (
    <nav className="p-4">
      <ul className="flex">
        <li className="mx-2">
          <Link href="/teams">Teams</Link>
        </li>

        {username && (
          <li onClick={() => setUserName(null)} className="mx-2 hover:pointer">
            Log out
          </li>
        )}

        {!username && (
          <li className="mx-2">
            <Link href="/auth">Log In</Link>
          </li>
        )}

        {username && <li className="ml-auto font-bold">{username}</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
