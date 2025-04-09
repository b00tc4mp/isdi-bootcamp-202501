export function NavBar({ onLogoutClick, onAddPostClick, onHomeClick }) {
  const handleLogoutClick = () => {
    onLogoutClick();
  };
  const handleAddPostClick = () => {
    onAddPostClick();
  };
  const handleHomeClick = () => {
    onHomeClick();
  };

  return (
    <section>
      <nav className="nav-bar">
        <a onClick={handleLogoutClick} className="fa-solid fa-user-secret"></a>
        <a onClick={handleHomeClick} className="fa-solid fa-house"></a>
        <a className="add-post" onClick={handleAddPostClick}>
          +
        </a>
      </nav>
    </section>
  );
}
