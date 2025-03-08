import { useState, useEffect } from "react";

import HamburgerButton from "./HamburgerButton";
import getOnlineUserName from "../../logic/getOnlineUserName";

const Header = ({ onMenuNavigation }) => {
  const [loggedInUserName, setLoggedInUserName] = useState("");

  const handleMenuNavigation = () => {
    onMenuNavigation();
  };
  useEffect(() => {
    try {
      const name = getOnlineUserName();

      setLoggedInUserName(name);
    } catch (error) {}
  }, []);

  return (
    <header className="header">
      <img
        src="https://www.shutterstock.com/image-vector/castle-logo-design-template-emblem-600nw-2483948833.jpg"
        alt="logo"
        className="header-logo"
      />

      <h2>Hello, {loggedInUserName}!</h2>

      <HamburgerButton onMenuNavigation={handleMenuNavigation} />
    </header>
  );
};

export default Header;
