import { useEffect, useState } from "react";
import api from "../../../../../utils/api";

export function RemoveCard({ cardId, setCards, isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await api.deleteCard(cardId);
      setCards((state) => state.filter((c) => c._id !== cardId));
      onClose();
    } catch (error) {
      console.error("Erro ao deletar card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup__conteiner popup__confirm">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__text popup__text-confirm">Tem certeza?</h2>
        <button
          className="popup__save-confirm"
          type="button"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Removendo..." : "Sim"}
        </button>
      </div>
    </div>
  );
}
