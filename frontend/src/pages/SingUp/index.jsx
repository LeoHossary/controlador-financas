import "./styles.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../components/Header";

function SingUp({ logged, account, setAccount, setDataModal }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [erro, setErro] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroPassword, setErroPassword] = useState();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    setErro(false);
    setConfirmPassword(true);
    setErroEmail(false);

    if (!form.name || !form.email || !form.password) {
      setErro(true);
      return;
    }

    if (form.password.includes(" ")) {
      setErro(true);
      setErroPassword(true);
      return;
    }

    if (form.confirm_password !== form.password) {
      setConfirmPassword(false);
      return;
    }

    setAccount({
      name: form.name.trim(),
      email: form.email,
      password: form.password,
    });
    setForm({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
    setDataModal([]);
    navigate("/login");
  }

  function handleChangeForm(event) {
    const value = event.target.value;

    setForm({ ...form, [event.target.name]: value });
  }

  return (
    <div className="container">
      <Header logged={logged} account={account} />

      <form className="form" onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>
        <h3>Nome</h3>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={(event) => handleChangeForm(event)}
        />
        {erro && !form.name && <h2>Campo obrigatório *</h2>}

        <h3>E-mail</h3>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={(event) => handleChangeForm(event)}
        />
        {erro && !form.email && <h2>Campo obrigatório *</h2>}
        {erro && erroEmail && <h2>E-mail inválido *</h2>}

        <h3>Senha</h3>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={(event) => handleChangeForm(event)}
        />
        {erro && !form.password && <h2>Campo obrigatório *</h2>}
        {erro && erroPassword && <h2>Senha inválida *</h2>}

        <h3>Confirmação de senha</h3>
        <input
          type="password"
          name="confirm_password"
          value={form.confirm_password}
          onChange={(event) => handleChangeForm(event)}
        />
        {!confirmPassword && <h2>Senha inválida *</h2>}

        <button type="submit">Cadastrar</button>

        <div>
          <span>Já tem cadastro?</span>
          <Link to="/login">Clique aqui!</Link>
        </div>
      </form>
    </div>
  );
}

export default SingUp;
