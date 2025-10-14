import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import api from "../../../../../utils/api";
import { FormValidation } from "../../../../../utils/formValidator/FormValidator";

export default function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm, setValues } =
    FormValidation({ name: "", about: "" });

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        about: currentUser.about || "",
      });
    }
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name: values.name, about: values.about })
      .then(() => {
        resetForm();
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="popup__profile" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name"></label>
      <input
        className="popup__name"
        type="text"
        id="name"
        name="name"
        placeholder="Nome"
        minLength="2"
        maxLength="40"
        required
        value={values.name || ""}
        onChange={handleChange}
      />
      <span id="name-error" className="popup__error">
        {errors.name}
      </span>

      <label htmlFor="about"></label>
      <input
        className="popup__about"
        type="text"
        id="about"
        name="about"
        placeholder="Sobre mim"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ""}
        onChange={handleChange}
      />
      <span id="about-error" className="popup__error">
        {errors.about}
      </span>

      <button
        className={`popup__save ${!isValid ? "popup__button_disabled" : ""}`}
        type="submit"
        aria-label="save form"
      >
        Salvar
      </button>
    </form>
  );
}
