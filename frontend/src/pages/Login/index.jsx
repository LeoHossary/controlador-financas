import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { useState } from "react";
import Header from "../../components/Header";

export default function Login({ logged, setLogged, account }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [erroEmail, setErroEmail] = useState(false);
  const [erroPassword, setErroPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setErroEmail(false);
    setErroPassword(false);

    if (form.email === "") {
      setErroEmail(true);
      return;
    }

    if (form.email !== account.email) {
      setErroEmail(true);
      return;
    }

    if (form.password === "") {
      setErroEmail(true);
      return;
    }

    if (form.password !== account.password) {
      setErroPassword(true);
      return;
    }

    setForm({ email: "", password: "" });

    setLogged(true);
    navigate("/main");
  }

  function handleChangeForm(event) {
    const value = event.target.value;

    setForm({ ...form, [event.target.name]: value });
  }

  return (
    <div className="containerLogin">
      <Header logged={logged} account={account} />
      <main>
        <div className="textArea">
          <div className="bigText">
            <h1>
              Controle suas <span>finanças</span>,
            </h1>
            <h1>sem planilha chata.</h1>
          </div>
          <div>
            <p>
              Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você
              tem tudo num único lugar e em um clique de distância.
            </p>
          </div>
          <Link to={"/cadastro"}>
            <button type="button">Cadastre-se</button>
          </Link>
        </div>
        <div className="loginContainer">
          <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <h3>E-mail</h3>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => handleChangeForm(event)}
            />
            {erroEmail && <h2>E-mail invalido *</h2>}
            <h3>Password</h3>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(event) => handleChangeForm(event)}
            />
            {erroPassword && <h2>Senha incorreta *</h2>}
            <button type="submit">Entrar</button>
          </form>
        </div>
      </main>
    </div>
  );
}
