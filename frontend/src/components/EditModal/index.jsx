import "./styles.css";
import { NumericFormat } from "react-number-format";
import Close from "../../assets/close.svg";
import { useState } from "react";

function EditModal({
  transactions,
  setTransactions,
  openEditModal,
  setOpenEditModal,
  dataEdit,
  setDataEdit,
}) {
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

  function handleSubmit(event) {
    event.preventDefault();
    const array = transactions;

    const index = array.findIndex((item) => item.id === dataEdit.id);

    array.splice(index, 1, dataEdit);

    setTransactions(array);

    setOpenEditModal(false);
  }

  function handleChangeSelect(event) {
    const localOptions = [...categories];

    const myOption = localOptions.find(
      (item) => item.id === parseInt(event.target.value)
    );

    setSelect({ id: myOption.id, name: myOption.name });
    setDataEdit({ ...dataEdit, categorie: myOption.name });
  }

  function handleChangeRecord(event) {
    const value = event.target.value;
    setDataEdit({ ...dataEdit, [event.target.name]: value });
  }

  function handleChangeTypeRecord(event) {
    setTypeRecord(event.target.name);
    setDataEdit({ ...dataEdit, type: event.target.name });
  }

  function handleCloseModal() {
    setOpenEditModal(false);
  }

  return (
    <>
      {openEditModal && (
        <div className="container-modal">
          <form className="form-modal" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1>Editar Registro</h1>
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
                value={dataEdit.valor}
                onChange={(event) => handleChangeRecord(event)}
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
                value={dataEdit.date}
                onChange={(event) => handleChangeRecord(event)}
              />

              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                maxLength={60}
                name="description"
                value={dataEdit.description}
                id="description"
                onChange={(event) => handleChangeRecord(event)}
              />
            </div>
            <button type="submit">Confirmar</button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditModal;
