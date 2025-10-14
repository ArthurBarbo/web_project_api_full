import { useEffect } from "react";

export default function Popup(props) {
  const { title, children, onClose } = props;

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target.classList.contains("popup")) {
      onClose();
    }
  }

  return (
    <div className="popup" onMouseDown={handleOverlayClick}>
      <div
        className={`popup__conteiner ${!title ? "popup__conteiner-zoom" : ""}`}
      >
        <button
          className="popup__close"
          id="close"
          type="button"
          aria-label="close form"
          onClick={onClose}
        ></button>
        {title && <h3 className="popup__title popup__text">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
