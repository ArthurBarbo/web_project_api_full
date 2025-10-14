import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import { FormValidation } from "../../../../../utils/formValidator/FormValidator";

export default function EditAvatar({ onClose }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, resetForm } = FormValidation({
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) return;

    handleUpdateAvatar(values.avatar)
      .then(() => {
        resetForm();
        onClose();
      })
      .catch((err) => console.error("Erro ao atualizar avatar:", err));
  };

  return (
    <form
      className="popup__avatar-form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className="popup__avatar"
        type="url"
        id="avatar-link"
        name="avatar"
        placeholder="Link para foto de perfil"
        required
        value={values.avatar || ""}
        onChange={handleChange}
      />
      <span id="avatar-link-error" className="popup__error">
        {errors.avatar}
      </span>
      <button
        className={`popup__save ${!isValid ? "popup__button_disabled" : ""}`}
        type="submit"
        aria-label="save form"
        disabled={!isValid}
      >
        Salvar
      </button>
    </form>
  );
}
