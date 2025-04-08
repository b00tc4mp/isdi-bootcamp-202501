import { useNavigate, useLocation } from "react-router";
import HamburgerButton from "./HamburgerButton";

const Header = ({
  onMenuNavigation,
  onUserClick,
  loggedInUserName,
  onHomeNavigation,
  onSearchNavigation,
}) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleUserClick = () => {
    onUserClick();
  };
  const handleMenuNavigation = () => {
    onMenuNavigation();
  };
  const handleSearchClick = () => {
    onSearchNavigation();
  };

  const handleHomeNavigation = () => {
    onHomeNavigation();
  };

  return (
    <header className="header">
      <img
        src="https://www.shutterstock.com/image-vector/castle-logo-design-template-emblem-600nw-2483948833.jpg"
        alt="logo"
        className="header-logo"
        onClick={handleHomeNavigation}
      />

      <h2 onClick={handleUserClick}>Hello, {loggedInUserName}!</h2>

      {pathname === "/" && <button onClick={handleSearchClick}>🔍</button>}
      <HamburgerButton onMenuNavigation={handleMenuNavigation} />
    </header>
  );
};

export default Header;
