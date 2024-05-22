function gerarData() {
    const saveData = new Date();
    const ano = saveData.getFullYear();
    const mes = String(saveData.getMonth() + 1).padStart(2, "0");
    const dia = saveData.getDate().toString().padStart(2, "0");
    const hora = saveData.toLocaleTimeString();

    return `${ano}-${mes}-${dia} ${hora}`;
}

function dataNascimento(dataNascimentoUsuario) {
    const partesData = dataNascimentoUsuario.split("-");
    const dia = partesData[0];
    const mes = partesData[1];
    const ano = partesData[2];

    if (mes < 1 || mes > 12) {
        return false;
    }

    const diasNoMes = new Date(ano, mes, 0).getDate();
    if (dia < 1 || dia > diasNoMes) {
        return false;
    }

    return `${ano}-${mes}-${dia}`;
}

function procurarConta(contas, numero_conta) {
    const contaExistente = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    return contaExistente;
}

function cpfDuplicado(contas, cpf) {
    const sameCpf = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    return sameCpf;
}

function emailDuplicado(contas, email) {
    const sameEmail = contas.find((conta) => {
        return conta.usuario.email === email;
    });

    return sameEmail;
}

function contaDeOrigem(contas, numero_conta_origem) {
    const contaDeOrigemExistente = contas.find((conta) => {
        return conta.numero === numero_conta_origem;
    });

    return contaDeOrigemExistente;
}

function contaDeDestino(contas, numero_conta_destino) {
    const contaDeDestinoExistente = contas.find((conta) => {
        return conta.numero === numero_conta_destino;
    });

    return contaDeDestinoExistente;
}

module.exports = {
    gerarData,
    dataNascimento,
    procurarConta,
    cpfDuplicado,
    emailDuplicado,
    contaDeOrigem,
    contaDeDestino
};
