export default function Card(props) {
  const { card, onImageClick, onCardLike, onCardDelete } = props;
  const { name, link, isLiked } = card;

  const cardLikeBtn = `elements__like${isLiked ? " elements__like-on" : ""} `;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <article className="elements__card">
      <img
        className="elements__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(card)}
      />

      <button
        className="elements__remove"
        type="button"
        aria-label="trash"
        onClick={handleDeleteClick}
      />

      <div className="elements__caption">
        <p className="elements__text">{name}</p>
        <button
          className={cardLikeBtn}
          type="button"
          aria-label="Like"
          aria-pressed={isLiked}
          onClick={handleLikeClick}
        />
      </div>
    </article>
  );
}
