import React from "react";
import "./InfoTooltip.css";
import Sucess from "../../images/Sucess.svg";
import Error from "../../images/Error.svg";

export default function InfoTooltip({ isOpen, onClose, isSucess, message }) {
  if (!isOpen) return null;

  return (
    <div className="tool__overlay" onClick={onClose}>
      <div className="tool__conteiner" onClick={(e) => e.stopPropagation()}>
        <button className="tool__close" onClick={onClose}></button>
        <div className="tool__content">
          <img
            src={isSucess ? Sucess : Error}
            alt={isSucess ? "Sucess" : "Erro"}
            className="tool__icon"
          />
          <p className="tool__message">
            {message ||
              (isSucess
                ? "Vitória! Você precisa se registrar."
                : "Ops, algo saiu deu errado! Por favor, tente novamente.")}
          </p>
        </div>
      </div>
    </div>
  );
}

