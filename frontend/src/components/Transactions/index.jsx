import "./styles.css";
import EditIcon from "../../assets/edit-icon.svg";
import DeleteIcon from "../../assets/delete-icon.svg";
import React from "react";

function Transactions({
  date,
  type,
  description,
  category,
  amount,
  onDelete,
  handleOpenEditModal,
}) {
  function getDayOfWeek(dateString) {
    const daysOfWeek = [
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo",
    ];
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];

    return dayOfWeek;
  }

  const dayOfWeek = getDayOfWeek(date);
  return (
    <div className="list-transactions">
      <p id="date-transactions">{date}</p>
      <p id="day-transactions">{dayOfWeek}</p>
      <p id="description-transactions">{description}</p>
      <p id="category-transactions">{category}</p>
      <p
        id="valor-transactions"
        className={type === "entry" ? "entry-amount" : "output-amount"}
      >
        {amount}
      </p>
      <div id="icons-transactions" className="icons">
        <img
          src={EditIcon}
          alt="Icone de uma caneta para edição"
          onClick={(event) => handleOpenEditModal(event)}
        />
        <img src={DeleteIcon} alt="Icone de uma lixeira" onClick={onDelete} />
      </div>
    </div>
  );
}

export default Transactions;
