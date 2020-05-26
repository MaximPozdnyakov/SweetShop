import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { UsersContext } from "../../context/Users/UsersContext";

function Logout() {
  const { logout } = useContext(UsersContext);

  return (
    <li className="nav-item mx-2">
      <Link onClick={logout} className="nav-link active" to="/login">
        Logout
      </Link>
    </li>
  );
}

export default Logout;
