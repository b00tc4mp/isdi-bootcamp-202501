import logoutUser from "../../logic/logoutUser";

function HamburgerMenu({ onLogoutSuccess, onChangeUserInfoNavigation }) {
  const handleLogoutSuccess = () => {
    try {
      logoutUser();
      onLogoutSuccess();
    } catch (error) {}
  };

  const handleChangeUserInfoNavigation = () => onChangeUserInfoNavigation();

  return (
    <div className="hamburger-menu-container">
      <div>
        <span onClick={handleChangeUserInfoNavigation}>Change User Info</span>
      </div>
      <div>
        <span onClick={handleLogoutSuccess}>Logout</span>
      </div>
    </div>
  );
}

export default HamburgerMenu;
