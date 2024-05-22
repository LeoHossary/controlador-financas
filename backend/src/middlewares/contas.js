function validarInformacoes(req, res, next) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome) {
    return res
      .status(400)
      .json({ mensagem: "Informe o nome." });
  }

  if (!cpf) {
    return res
      .status(400)
      .json({ mensagem: "Informe o cpf." });
  }

  if (cpf.length !== 11) {
    return res
      .status(400)
      .json({ mensagem: "CPF informado inválido" });
  }

  if (!data_nascimento) {
    return res
      .status(400)
      .json({ mensagem: "Informe a data de nascimento." });
  } else if (data_nascimento) {
    if (data_nascimento.length !== 10) {
      return res
        .status(400)
        .json({ mensagem: "Informe a data de nascimento com hífen, sem barra ou espaço." });
    }
  }

  if (!telefone) {
    return res
      .status(400)
      .json({ mensagem: "Informe o telefone" });
  }

  if (telefone.length !== 11) {
    return res
      .status(400)
      .json({ mensagem: "Telefone informado inválido." });
  }

  if (!email) {
    return res
      .status(400)
      .json({ mensagem: "Informe o e-mail" });
  }

  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ mensagem: "E-mail informado inválido" });
  }

  if (!senha) {
    return res
      .status(400)
      .json({ mensagem: "Informe a senha" });
  }

  next();
}

module.exports = {
  validarInformacoes,
};
