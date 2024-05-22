import "./styles.css";
import { NumericFormat } from "react-number-format";
import Close from "../../assets/close.svg";
import { useState } from "react";

function Modal({ openModal, setOpenModal, transactions, setTransactions }) {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Alimentação",
    },
    {
      id: 2,
      name: "Asssinaturas e Serviços",
    },
    {
      id: 3,
      name: "Casa",
    },
    {
      id: 4,
      name: "Compras",
    },
    {
      id: 5,
      name: "Cuidados Pessoais",
    },
    {
      id: 6,
      name: "Salário",
    },
    {
      id: 7,
      name: "Dividendos",
    },
    {
      id: 8,
      name: "Lazer",
    },
    {
      id: 9,
      name: "Educação",
    },
    {
      id: 10,
      name: "Trabalho",
    },
  ]);
  const [select, setSelect] = useState({ id: "", name: "" });
  const [typeRecord, setTypeRecord] = useState("entry");
  const [idRecord, setIdRecord] = useState(2);
  const [newRecord, setNewRecord] = useState({
    id: 1,
    type: "entry",
    valor: "",
    categorie: "Alimentação",
    date: "",
    description: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    setTransactions([...transactions, newRecord]);

    setSelect({ id: "", name: "" });
    setTypeRecord("entry");
    setNewRecord({
      id: idRecord,
      type: "entry",
      valor: "",
      categorie: "Alimentação",
      date: "",
      description: "",
    });
    setIdRecord(idRecord + 1);
    setOpenModal(false);
  }

  function handleChangeSelect(event) {
    const localOptions = [...categories];

    const myOption = localOptions.find(
      (item) => item.id === parseInt(event.target.value)
    );

    setSelect({ id: myOption.id, name: myOption.name });
    setNewRecord({ ...newRecord, categorie: myOption.name });
  }

  function handleChangeNewRecord(event) {
    const value = event.target.value;
    setNewRecord({ ...newRecord, [event.target.name]: value });
  }

  function handleChangeTypeRecord(event) {
    setTypeRecord(event.target.name);
    setNewRecord({ ...newRecord, type: event.target.name });
  }

  function handleCloseModal() {
    setOpenModal(false);
    setNewRecord({
      ...newRecord,
      type: "entry",
      valor: "",
      categorie: "Alimentação",
      date: "",
      description: "",
    });
    setTypeRecord("entry");
    setSelect({ id: "", name: "" });
  }

  return (
    <>
      {openModal && (
        <div className="container-modal">
          <form className="form-modal" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1>Adicionar Registro</h1>
              <img src={Close} alt="fechar modal" onClick={handleCloseModal} />
            </div>

            <div className="type-buttons">
              <input
                type="button"
                value="Entrada"
                name="entry"
                id={typeRecord === "entry" ? "entry" : "unselected"}
                onClick={(event) => handleChangeTypeRecord(event)}
              />
              <input
                type="button"
                value="Saída"
                name="output"
                id={typeRecord === "output" ? "output" : "unselected"}
                onClick={(event) => handleChangeTypeRecord(event)}
              />
            </div>

            <div className="informations">
              <label htmlFor="valor">Valor</label>
              <NumericFormat
                prefix={"R$ "}
                decimalSeparator=","
                thousandSeparator="."
                decimalScale={2}
                fixedDecimalScale
                placeholder="R$"
                name="valor"
                value={newRecord.valor}
                onChange={(event) => handleChangeNewRecord(event)}
                id="valor"
              />

              <label htmlFor="categories">Categoria</label>
              <select
                name="categories"
                id="categories"
                value={select.id}
                onChange={(event) => handleChangeSelect(event)}
              >
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </select>

              <label htmlFor="date">Data</label>
              <input
                type="date"
                name="date"
                id="date"
                value={newRecord.date}
                onChange={(event) => handleChangeNewRecord(event)}
              />

              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                maxLength={60}
                name="description"
                value={newRecord.description}
                id="description"
                onChange={(event) => handleChangeNewRecord(event)}
              />
            </div>
            <button type="submit">Confirmar</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Modal;
