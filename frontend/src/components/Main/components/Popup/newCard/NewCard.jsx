import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import { FormValidation } from "../../../../../utils/formValidator/FormValidator";

export default function NewCard({ onClose, onAddCard }) {
  const { handleAddCard } = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } = FormValidation({
    name: "",
    link: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCard({ name: values.name, link: values.link })
      .then((newCard) => {
        onAddCard(newCard);
        resetForm();
        onClose();
      })
      .catch((err) => console.error(err));
  };
  return (
    <form
      className="popup__addpic"
      noValidate
      id="place"
      onSubmit={handleSubmit}
    >
      {" "}
      <input
        className="popup__name"
        id="local-name"
        type="text"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        name="name"
        required
        value={values.name || ""}
        onChange={handleChange}
      />{" "}
      <span id="local-name-error" className="popup__error">
        {errors.name}
      </span>{" "}
      <input
        className="popup__about"
        id="link"
        type="url"
        placeholder="Link de Imagem"
        name="link"
        required
        value={values.link || ""}
        onChange={handleChange}
      />{" "}
      <span id="link-error" className="popup__error">
        {errors.link}
      </span>{" "}
      <button
        className={`popup__save ${!isValid ? "popup__button_disabled" : ""}`}
        id="save"
        type="submit"
      >
        {" "}
        Criar{" "}
      </button>{" "}
    </form>
  );
}
