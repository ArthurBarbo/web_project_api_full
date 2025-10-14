import { useContext, useEffect, useState } from "react";
import avatarImg from "../../images/avatar.jpg";
import Popup from "./components/Popup/Popup.jsx";
import EditProfile from "./components/Popup/editProfile/EditProfile.jsx";
import NewCard from "./components/Popup/newCard/NewCard.jsx";
import EditAvatar from "./components/Popup/editAvatar/EditAvatar.jsx";
import ImagePopup from "./components/Popup/imagePopup/ImagePopup.jsx";
import Card from "./components/Card/Card.jsx";
import api from "../../utils/api.js";
import { RemoveCard } from "./components/Popup/removeCard/RemoveCard.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({ cards, setCards }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setselectedCard] = useState(null);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    setCardToDelete(card._id);
    setIsRemovePopupOpen(true);
  }

  function handleCloseRemovePopup() {
    setIsRemovePopupOpen(false);
    setCardToDelete(null);
  }

  const newCardPopup = {
    title: "Novo Local",
    children: (
      <NewCard
        onClose={handleClosePopup}
        onAddCard={(newCard) => setCards([newCard, ...cards])}
      />
    ),
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile onClose={handleClosePopup} />,
  };
  const editAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar onClose={handleClosePopup} />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }
  function handleCloseImagePopup() {
    setselectedCard(null);
  }

  return (
    <main className="main page__section">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={() => handleOpenPopup(editAvatarPopup)}
        >
          <img
            className="profile__avatar"
            src={currentUser?.avatar || avatarImg}
            alt={currentUser?.name || "Avatar"}
          />
          <div className="profile__avatar-overlay"></div>
        </div>

        <div className="profile__text">
          <h1 className="profile__name">
            {currentUser?.name || "Jacques Cousteau"}{" "}
          </h1>
          <button
            className="profile__pen"
            type="button"
            aria-label="edit profile"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <h2 className="profile__description">
            {currentUser?.about || "Explorador"}{" "}
          </h2>
        </div>

        <button
          className="profile__plus"
          type="button"
          aria-label="edit card"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onImageClick={setselectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={handleCloseImagePopup} />
      )}
      <RemoveCard
        cardId={cardToDelete}
        setCards={setCards}
        isOpen={isRemovePopupOpen}
        onClose={handleCloseRemovePopup}
      />
    </main>
  );
}
