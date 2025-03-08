function HamburgerButton({ onMenuNavigation }) {
  const handleHamburgerButtonClick = () => {
    onMenuNavigation();
  };
  return (
    <div
      className="hamburger-button-container"
      onClick={handleHamburgerButtonClick}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default HamburgerButton;
