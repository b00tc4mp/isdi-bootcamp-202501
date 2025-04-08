import { useState, useEffect } from "react";

import HamburgerButton from "./HamburgerButton";
import { logic } from "../../logic";

const Header = ({ onMenuNavigation }) => {
  const [loggedInUserName, setLoggedInUserName] = useState("");

  const handleMenuNavigation = () => {
    onMenuNavigation();
  };
  useEffect(() => {
    try {
      logic
        .getUserInfo()
        .catch((error) => {
          console.error;
          alert(error.message);
        })
        .then((user) => setLoggedInUserName(user.name));
    } catch (error) {
      console.log(error);

      alert(error.message);
    }
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
