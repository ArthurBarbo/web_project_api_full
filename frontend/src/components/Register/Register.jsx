import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Register.css";

export default function Register({ newUser, showTooltip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    console.log("Email:", email);
    console.log("Senha:", password);

    if (!email && !password) {
      setError("Preencha todos os campos");
      return;
    }
    try {
      await newUser({ email, password });
      showTooltip("Vitória! Cadastro realizado com sucesso.", true);
      navigate("/signin");
    } catch (err) {
      showTooltip("Erro ao criar o usuário", false);
    }
  }

  return (
    <div className="register__page">
      <Header>
        <h3 className="register__enter">
          <Link to="/signin" className="register__link-style">
            Faça o Login
          </Link>
        </h3>
      </Header>
      <div className="register__container">
        <h2 className="register__title">Inscrever-se</h2>
        <form onSubmit={handleSubmit} className="register__form">
          <input
            className="register__email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength="2"
            required
          />
          <input
            className="register__password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />
          <button type="submit" className="register__button">
            Inscrever-se
          </button>
        </form>
        <p className="register__login">
          Já é um membro?
          <Link to="/signin" className="register__link-style">
            {" "}
            Faça o login aqui!
          </Link>
        </p>
      </div>
    </div>
  );
}
