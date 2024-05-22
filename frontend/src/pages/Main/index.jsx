import { useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import FilterIcon from "../../assets/filter-icon.svg";
import Modal from "../../components/Modal";
import Transactions from "../../components/Transactions";
import EditModal from "../../components/EditModal";

function Main({ logged, setLogged, account, dataModal, setDataModal }) {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleDeleteTransaction = (idToDelete) => {
    const updateDataModal = dataModal.filter((data) => data.id !== idToDelete);

    setDataModal(updateDataModal);
  };

  const handleOpenEditModal = (event) => {
    setOpenEditModal(true);
    const transactionToEdit = dataModal.find(
      (transaction) => transaction.id === event
    );
    console.log(transactionToEdit);

    setDataEdit(transactionToEdit);
  };

  const totalEntry = dataModal
    .filter((transaction) => transaction.type === "entry")
    .reduce((accumulator, transaction) => {
      const numericValue = parseFloat(
        transaction.valor
          .replace("R$ ", "")
          .replaceAll(".", "")
          .replace(",", "")
      );
      return accumulator + numericValue;
    }, 0);

  const totalOutput = dataModal
    .filter((transaction) => transaction.type === "output")
    .reduce((accumulator, transaction) => {
      const numericValue = parseFloat(
        transaction.valor
          .replace("R$ ", "")
          .replaceAll(".", "")
          .replace(",", "")
      );
      return accumulator + numericValue;
    }, 0);

  return (
    <>
      <div className="container-main">
        <Header logged={logged} account={account} setLogged={setLogged} />
        <div className="container-content">
          <section className="transaction-container">
            <div className="filter-button">
              <img src={FilterIcon} alt="Icone de um filtro" />
              <p>Filtrar</p>
            </div>
            <main className="transactions">
              <p>Data</p>
              <p>Dia da semana</p>
              <p>Descrição</p>
              <p>Categoria</p>
              <p>Valor</p>
            </main>
            {dataModal.map((transaction) => (
              <Transactions
                key={transaction.id}
                date={transaction.date}
                description={transaction.description}
                category={transaction.categorie}
                amount={transaction.valor}
                type={transaction.type}
                onDelete={() => handleDeleteTransaction(transaction.id)}
                handleOpenEditModal={() => handleOpenEditModal(transaction.id)}
              />
            ))}
          </section>
          <div className="sumary-container">
            <section className="summary">
              <h1>Resumo</h1>
              <div className="entry default-alignment">
                <h3>Entradas</h3>
                <span>R$ {(totalEntry / 100).toFixed(2)}</span>
              </div>
              <div className="expenses default-alignment">
                <h3>Saídas</h3>
                <span>R$ {(totalOutput / 100).toFixed(2)}</span>
              </div>
              <hr />
              <div className="balance default-alignment">
                <h2>Saldo</h2>
                <span>R$ {((totalEntry - totalOutput) / 100).toFixed(2)}</span>
              </div>
            </section>
            <button
              className="button-container"
              type="submit"
              onClick={handleOpenModal}
            >
              Adicionar registro
            </button>
          </div>
        </div>
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          transactions={dataModal}
          setTransactions={setDataModal}
        />
        <EditModal
          transactions={dataModal}
          setTransactions={setDataModal}
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      </div>
    </>
  );
}

export default Main;
