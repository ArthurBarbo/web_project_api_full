import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import api from "../utils/api.js";
import { register, login, checkToken } from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isSucess, setIsSucess] = useState(false);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((data) => {
        setCurrentUser({ email: data.data.email });
        navigate("/");
      })
      .catch((err) => {
        console.error("Erro ao validar Token:", err);
        localStorage.removeItem("jwt");
      });

    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser((prev) => ({
          ...userData,
          email: prev?.email,
        }));
      })
      .catch((err) => console.log("Erro ao buscar dados do usuário", err));

    api
      .getCards()
      .then(setCards)
      .catch((err) => console.log("Erro ao buscar cards:", err));
  }, [navigate]);

  const handleUpdateUser = (data) => {
    api.updateUserInfo(data).then(setCurrentUser);
  };
  const handleUpdateAvatar = (avatarUrl) => {
    return api.updateAvatar(avatarUrl).then(setCurrentUser);
  };
  const handleAddCard = (newCard) => {
    api.createCard(newCard).then((createdCard) => {
      setCards((prevCards) => [createdCard, ...prevCards]);
      return createdCard;
    });
  };
  const showTooltip = (message, sucess = false) => {
    setInfoMessage(message);
    setIsSucess(sucess);
    setIsInfoOpen(true);
  };
  const closeTooltip = () => {
    setIsInfoOpen(false);
  };
  const handleLogin = ({ email, password }) => {
    return login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser({ email });
        return data;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
  const handleRegister = ({ email, password }) => {
    return register({ email, password })
      .then(() => {
        showTooltip("Vitória! Cadastro realizado com sucesso.", true);
        navigate("/signin");
      })
      .catch((err) => {
        showTooltip(err, false);
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    navigate("/signin");
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddCard,
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={!!currentUser}>
              <Header onLogout={handleLogout} />
              <Main cards={cards} setCards={setCards} />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={<Login onLogin={handleLogin} showTooltip={showTooltip} />}
        />
        <Route
          path="/signup"
          element={
            <Register newUser={handleRegister} showTooltip={showTooltip} />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <InfoTooltip
        isOpen={isInfoOpen}
        onClose={closeTooltip}
        message={infoMessage}
        isSucess={isSucess}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
