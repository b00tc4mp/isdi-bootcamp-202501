function HamburgerButton({ onMenuDisplay }) {
  const handleHamburgerButtonClick = () => {
    onMenuDisplay();
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
