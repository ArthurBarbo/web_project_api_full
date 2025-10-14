import logo from "../../images/header_around.svg";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import menuIcon from "../../images/menuIcon.svg";

export default function Header({ children, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleMenuClick = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 530);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`header page__section ${isExpanded ? "header_expanded" : ""}`}
    >
      <div className="header__top">
        <img
          src={logo}
          alt="Around the U.S logo"
          className="logo header__logo"
        />

        {isMobile && currentUser && (
          <>
            {!isExpanded && (
              <img
                src={menuIcon}
                alt="Menu"
                className="header__menu-icon"
                onClick={handleMenuClick}
              />
            )}
          </>
        )}
      </div>

      {currentUser && (isExpanded || !isMobile) && (
        <div className="header__user">
          <p className="header__email">{currentUser.email}</p>
          <button className="header__logout" onClick={onLogout}>
            Sair
          </button>
        </div>
      )}

      {children}
    </header>
  );
}
