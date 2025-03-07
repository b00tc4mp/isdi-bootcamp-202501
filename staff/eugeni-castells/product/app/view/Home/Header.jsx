import HamburgerButton from "./HamburgerButton";

const Header = ({ currentUser, onMenuDisplay }) => {
  return (
    <header
      className="header"
      onClick={() => {
        console.log(currentUser);
      }}
    >
      <img
        src="https://www.shutterstock.com/image-vector/castle-logo-design-template-emblem-600nw-2483948833.jpg"
        alt="logo"
        className="header-logo"
      />

      {currentUser !== null && <h2>Hello, {currentUser}!</h2>}

      <HamburgerButton onMenuDisplay={onMenuDisplay} />
    </header>
  );
};

export default Header;
