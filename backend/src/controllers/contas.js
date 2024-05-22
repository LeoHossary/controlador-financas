const { banco } = require("../database");
let { contas, numeroConta, depositos, saques, transferencias } = require("../database");
const { gerarData, dataNascimento, procurarConta, cpfDuplicado, emailDuplicado, contaDeOrigem, contaDeDestino } = require("../helpers/utilidades");

function listarContas(req, res) {
  const senhaBanco = req.query.senha_banco;

  if (!senhaBanco) {
    return res
      .status(400)
      .json({ Mensagem: "Senha do banco não informada." });
  }

  if (senhaBanco !== banco.senha) {
    return res
      .status(400)
      .json({ Mensagem: "Senha incorreta." });
  }

  return res
    .status(200)
    .json(contas);
}

function criarConta(req, res) {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  const sameCpf = cpfDuplicado(contas, cpf);

  if (sameCpf) {
    return res
      .status(400)
      .json({ Mensagem: "Já existe conta criada com o mesmo CPF." });
  }

  const sameEmail = emailDuplicado(contas, email);

  if (sameEmail) {
    return res
      .status(400)
      .json({ Mensagem: "Já existe conta criada com o mesmo e-mail." });
  }

  const dataFormatada = dataNascimento(data_nascimento);

  if (dataFormatada === false) {
    return res
      .status(400)
      .json({ Mensagem: "Data de nascimento inválida." });
  }

  const novaConta = {
    numero: numeroConta++,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento: dataFormatada,
      telefone,
      email,
      senha,
    },
  };

  contas.push(novaConta);

  return res
    .status(201)
    .json(novaConta);
}

function atualizarUsuarioConta(req, res) {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
    return res
      .status(400)
      .json({ Mensagem: "Precisa preencher ao menos um campo." });
  }
  const conta = procurarConta(contas, numeroConta);

  if (!conta) {
    return res
      .status(404)
      .json({ Mensagem: "Conta não encontrada." });
  }

  const cpfDuplicado = contas.find((conta) => {
    return conta.numero !== Number(numeroConta) && conta.usuario.cpf === cpf;
  });

  if (cpfDuplicado) {
    return res
      .status(400)
      .json({ Mensagem: "Já existe outra conta com o mesmo CPF." });
  }

  const emailDuplicado = contas.find((conta) => {
    return conta.numero !== Number(numeroConta) && conta.usuario.email === email;
  });

  if (emailDuplicado) {
    return res
      .status(400)
      .json({ Mensagem: "Já existe outra conta com o mesmo E-mail." });
  }

  if (nome) {
    conta.usuario.nome = nome;
  }

  if (cpf) {
    if (cpf.length === 11) {
      conta.usuario.cpf = cpf;
    } else {
      return res
        .status(400)
        .json({ Mensagem: "CPF deve ter 11 dígitos." });
    }
  }

  if (data_nascimento) {
    const dataNascimentoFormatada = dataNascimento(data_nascimento);

    if (dataNascimentoFormatada === false) {
      return res
        .status(400)
        .json({ Mensagem: "Data de nascimento inválida." });
    }

    if (dataNascimentoFormatada.length !== 10) {
      return res
        .status(400)
        .json({ Mensagem: "Informe a data de nascimento com hífen, sem barra ou espaço." });
    }

    conta.usuario.data_nascimento = dataNascimentoFormatada;
  }

  if (telefone) {
    if (telefone.length === 11) {
      conta.usuario.telefone = telefone;
    } else {
      return res
        .status(400)
        .json({ Mensagem: "Informe o número do telefone com o DDD." });
    }
  }

  if (email) {
    if (email.includes("@")) {
      conta.usuario.email = email;
    } else {
      return res
        .status(400)
        .json({ Mensagem: "E-mail informado inválido" });
    }
  }

  if (senha) {
    conta.usuario.senha = senha;
  }

  return res
    .status(200)
    .json({ Mensagem: "Conta atualizada com sucesso." });
}

function excluirConta(req, res) {
  const { numeroConta } = req.params;

  const contaIndex = contas.findIndex((conta) => {
    return conta.numero === Number(numeroConta);
  });

  if (contaIndex === -1) {
    return res
      .status(404)
      .json({ Mensagem: "Conta não encontrada." });
  }

  const contaExcluida = contas[contaIndex];

  if (contaExcluida.saldo !== 0) {
    return res
      .status(400)
      .json({ Mensagem: "Para excluir conta, o saldo precisa ser 0, retire seu dinheiro e tente novamente." });
  }

  contas.splice(contaIndex, 1);

  return res
    .status(200)
    .json({ Mensagem: "Conta excluída com sucesso!" });
}

function depositar(req, res) {
  const { numero_conta, valor } = req.body;

  if (!numero_conta) {
    return res
      .status(400)
      .json({ Mensagem: "Informar o número da conta." });
  }

  if (!valor) {
    return res
      .status(400)
      .json({ Mensagem: "Informe o valor do depósito ou valor não permitido." });
  }

  const contaExistente = procurarConta(contas, numero_conta);

  if (!contaExistente) {
    return res
      .status(404)
      .json({ Mensagem: "Conta não encontrada." });
  }

  if (valor < 0) {
    return res
      .status(400)
      .json({ Mensagem: "Valor não permitido!" });
  }

  contaExistente.saldo += valor;

  const dataAtual = gerarData();

  const novoDeposito = {
    data: dataAtual,
    numero_conta: contaExistente.numero,
    valor,
  }

  depositos.push(novoDeposito);

  return res
    .status(200)
    .json({ Mensagem: "Depósito realizado com sucesso!" });
}

function sacar(req, res) {
  const { numero_conta, valor, senha } = req.body;

  if (!numero_conta || !valor || !senha) {
    return res
      .status(400)
      .json({ Mensagem: "Preencha todos os campos." });
  }

  const contaExistente = procurarConta(contas, numero_conta);

  if (!contaExistente) {
    return res
      .status(404)
      .json({ Mensagem: "Conta não encontrada." });
  }

  if (senha !== contaExistente.usuario.senha) {
    return res
      .status(400)
      .json({ Mensagem: "Senha incorreta." });
  }

  if (contaExistente.saldo < valor) {
    return res
      .status(400)
      .json({ Mensagem: "Saldo insuficiente para o saque desejado." });
  }

  contaExistente.saldo -= valor;

  const dataAtual = gerarData();

  const novoSaque = {
    data: dataAtual,
    numero_conta: contaExistente.numero,
    valor,
  }

  saques.push(novoSaque);

  return res
    .status(200)
    .json({ Mensagem: "Saque realizado com sucesso!" });
}

function transferir(req, res) {
  const { numero_conta_origem, numero_conta_destino, senha_conta_origem, valor } = req.body;

  if (!numero_conta_origem || !numero_conta_destino || !senha_conta_origem || !valor) {
    return res
      .status(400)
      .json({ Mensagem: "Preencha todos os campos." });
  }

  if (numero_conta_origem === numero_conta_destino) {
    return res
      .status(400)
      .json({ Mensagem: "As contas precisam ser diferentes." });
  }
  const contaDeOrigemExistente = contaDeOrigem(contas, numero_conta_origem);

  if (!contaDeOrigemExistente) {
    return res
      .status(404)
      .json({ Mensagem: "Conta de origem não encontrada." });
  }

  if (senha_conta_origem !== contaDeOrigemExistente.usuario.senha) {
    return res
      .status(400)
      .json({ Mensagem: "Senha incorreta." });
  }

  const contaDeDestinoExistente = contaDeDestino(contas, numero_conta_destino);

  if (!contaDeDestinoExistente) {
    return res
      .status(404)
      .json({ Mensagem: "Conta de destino não encontrada." });
  }

  if (contaDeOrigemExistente.saldo < valor) {
    return res
      .status(400)
      .json({ Mensagem: "Saldo insuficiente para transferência." });
  }

  contaDeOrigemExistente.saldo -= valor;
  contaDeDestinoExistente.saldo += valor;

  const dataAtual = gerarData();

  const novaTransferencia = {
    data: dataAtual,
    numero_conta_origem: contaDeOrigemExistente.numero,
    numero_conta_destino: contaDeDestinoExistente.numero,
    valor,
  }

  transferencias.push(novaTransferencia);

  return res
    .status(200)
    .json({ Mensagem: "Transferência realizada com sucesso!" });
}

function saldo(req, res) {
  const { numero_conta, senha } = req.query;

  const contaExistente = procurarConta(contas, numero_conta);

  if (!contaExistente) {
    return res
      .status(404)
      .json({ Mensagem: "Conta não encontrada." });
  }

  if (Number(senha) !== contaExistente.usuario.senha) {
    return res
      .status(400)
      .json({ Mensagem: "Senha incorreta." });
  }

  const saldoDaConta = contaExistente.saldo;
  return res.json({ saldo: saldoDaConta });
}

function extrato(req, res) {
  const { numero_conta, senha } = req.query;

  const contaExistente = procurarConta(contas, numero_conta);

  if (!contaExistente) {
    return res
      .status(404)
      .json({ Mensagem: "Conta não encontrada." });
  }

  if (Number(senha) !== contaExistente.usuario.senha) {
    return res.status(400).json({ Mensagem: "Senha incorreta." });
  }

  const depositosExtrato = depositos.filter((deposito) => {
    return deposito.numero_conta === contaExistente.numero;
  });

  const saquesExtrato = saques.filter((saque) => {
    return saque.numero_conta === contaExistente.numero;
  });

  const transferenciasEnviadas = transferencias.filter((transferencia) => {
    return transferencia.numero_conta_origem === contaExistente.numero
  });

  const transferenciasRecebidas = transferencias.filter((transferencia) => {
    return transferencia.numero_conta_destino === contaExistente.numero
  });

  const extratoDaConta = {
    depositos: depositosExtrato,
    saques: saquesExtrato,
    transferenciasEnviadas,
    transferenciasRecebidas,
  }

  return res.json(extratoDaConta);
}


module.exports = {
  listarContas,
  criarConta,
  atualizarUsuarioConta,
  excluirConta,
  depositar,
  sacar,
  transferir,
  saldo,
  extrato
};
