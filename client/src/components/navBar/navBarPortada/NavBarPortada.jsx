import n from "./navBar.module.css";
import { Link } from "react-router-dom";
import GoJobLogo from "../../../assets/GoJobLogo.png";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButtons from "../../../authentication/components/LoginButtons";
import { useState } from "react";
import Button from "./Button";
import NavLinks from "./NavLinks";

const NavBarPortada = () => {
  const { isAuthenticated, user } = useAuth0();
  const [open, setOpen] = useState(false);

  return (
    <div className={n.container}>
      <div className={n.logo}>
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className={n.right}>
        <Link to={"/"} className={n.link}>
          <h2>Inicio</h2>
        </Link>
        <Link to={"/service"} className={n.link}>
          <h2>Services</h2>
        </Link>
        <Link to={"/admin/create/job"} className={n.link}>
          <h2>Crear job</h2>
        </Link>
        <Link to={"/create/service"} className={n.link}>
          <h2>Crear servicio</h2>
        </Link>
        <Link to={"/users"} className={n.link}>
          <h2>Usuarios</h2>
        </Link>
        <Link to={"/user/register"} className={n.link}>
          <h2>Create una cuenta YA</h2>
        </Link>
        {isAuthenticated ? (
          <Link to={"/user/profile"}>
            <img
              class="object-contain h-10 w-10 rounded-full auto"
              src={user.picture}
              alt={user.name}
            />
          </Link>
        ) : (
          <LoginButtons />
        )}
      </div>
    </nav>
  );
};


export default NavBarPortada;
