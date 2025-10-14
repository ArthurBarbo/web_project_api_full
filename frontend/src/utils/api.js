 class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest(baseUrl, method = "GET", body = null) {
    const options = {
      method,
      headers: this._headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(baseUrl, options).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Erro: ${res.status}`);
      }
      return res.json();
    });
  }

  getCards() {
    return this._makeRequest(`${this._baseUrl}/cards`);
  }

  createCard(card) {
    return this._makeRequest(`${this._baseUrl}/cards`, "POST", card);
  }

  likeCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}/likes`, "PUT");
  }

  unlikeCard(cardId) {
    return this._makeRequest(
      `${this._baseUrl}/cards/${cardId}/likes`,
      "DELETE"
    );
  }
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this._baseUrl}/cards/${cardId}`, "DELETE");
  }

  getUserInfo() {
    return this._makeRequest(`${this._baseUrl}/users/me`);
  }

  updateUserInfo({ name, about }) {
    return this._makeRequest(`${this._baseUrl}/users/me`, "PATCH", {
      name,
      about,
    });
  }

  updateAvatar(avatarUrl) {
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, "PATCH", {
      avatar: avatarUrl,
    });
  }
}
const baseUrl ="https://around-api.pt-br.tripleten-services.com/v1"
const headers = {
    authorization:"79b24936-a205-4985-b1d0-6eeb1d8f406b",
    "Content-Type": "application/json"
}

const api = new Api ({baseUrl , headers});

export default api;

