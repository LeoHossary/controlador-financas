import "./styles.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import ProfilePicture from "../../assets/profile-picture.svg";
import Logout from "../../assets/logout.svg";

function Header({ logged, account, setLogged }) {
  const navigate = useNavigate();
  function handleLogout() {
    setLogged(false);
    navigate("/login");
  }
  return (
    <header>
      <img src={Logo} alt="Logotipo do aplicativo" />
      {logged ? (
        <div className="profile-items">
          <img src={ProfilePicture} alt="Foto de perfil" />
          <strong>{account.name}</strong>
          <img src={Logout} alt="botão de deslogar" onClick={handleLogout} />
        </div>
      ) : (
        <div>
          <p> </p>
        </div>
      )}
    </header>
  );
}

export default Header;
