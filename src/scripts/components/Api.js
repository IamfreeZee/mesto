export default class Api {
  constructor ({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
  };

  getUserInfo () {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`)
      }
    })
  }

  getInitialCards () {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`)
      }
    })
  }

  getData () {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  setUserInfo (dataObj) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataObj.userName,
        about: dataObj.userCaption,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`)
      }
    })
  }

  setUserAvatar (dataObj) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataObj.userAvatar,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`)
      }
    })
  }

  addNewCard (dataObj) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: dataObj.cardName,
        link: dataObj.cardLink,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`)
      }
    })
  }

  deleteCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`)
      }
    })
  }

  putLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`)
      }
    })
  }

  deleteLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`)
      }
    })
  }

};
