const express = require("express");

const { listarContas, criarConta, atualizarUsuarioConta, excluirConta, depositar, sacar, transferir, saldo, extrato } = require("../controllers/contas");
const { validarInformacoes } = require("../middlewares/contas");

const routes = express();

routes.get("/contas", listarContas);
routes.post("/contas", validarInformacoes, criarConta);
routes.put("/contas/:numeroConta/usuario", atualizarUsuarioConta);
routes.delete("/contas/:numeroConta", excluirConta);
routes.post("/transacoes/depositar", depositar);
routes.post("/transacoes/sacar", sacar);
routes.post("/transacoes/transferir", transferir);
routes.get("/contas/saldo", saldo);
routes.get("/contas/extrato", extrato);

module.exports = routes;
