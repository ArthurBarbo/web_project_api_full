import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./Login.css";

export default function Login({ onLogin, showTooltip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (email && password) {
      onLogin({ email, password })
        .then(() => {
          showTooltip("Sucesso!", true);
          navigate("/");
        })
        .catch((err) => {
          console.error("erro capturado:, err");
          const message = err?.message || err || "erro ao logar";
          showTooltip(message, false);
        });
    } else {
      showTooltip("Preencha todos os campos!", false);
    }
  }

  return (
    <div className="login__page">
      <Header>
        <h3 className="login__enter" onSubmit={handleSubmit}>
          Entrar
        </h3>
      </Header>
      <div className="login__container">
        <h2 className="login__title">Entrar</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            className="login__email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login__password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login__button">
            Entrar
          </button>
        </form>
        <p className="login__register">
          Ainda não é membro?
          <Link to="/signup" className="login__link-style">
            {" "}
            Inscreva-se aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}
