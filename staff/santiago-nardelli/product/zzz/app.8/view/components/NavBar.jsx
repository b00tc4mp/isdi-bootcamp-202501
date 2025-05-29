function NavBar({ onLogoutClick, onAddPostClick }) {
  
  const handleLogoutClick = () => {
    onLogoutClick();
  }
  const handleAddPostClick = () => {
    onAddPostClick();
  }
  
  
  return (
    <section>
      <nav className="nav-bar">
        <a onClick={handleLogoutClick} className="fa-solid fa-user-secret"></a>

        <a className="add-post" onClick={handleAddPostClick}>
          +
        </a>
      </nav>
    </section>
  );
}
export default NavBar;
