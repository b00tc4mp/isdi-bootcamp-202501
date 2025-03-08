import { useState, useEffect } from "react";

import "./ChangeUserInfo.css";
import getOnlineUserInfo from "../../logic/getOnlineUserInfo";
import updateUser from "../../logic/updateUser";

function ChangeUserInfo({ onHomeNavigation }) {
  const [userInfo, setUserInfo] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name: { value: name },
      email: { value: email },
      username: { value: username },
      password: { value: password },
    } = e.target;

    const updatedUser = {
      name,
      email,
      username,
      password,
    };

    updateUser(updatedUser);

    handleHomeNavigation();
  };

  const handleHomeNavigation = () => onHomeNavigation();

  useEffect(() => {
    try {
      const info = getOnlineUserInfo();

      setUserInfo(info);
    } catch (error) {}
  }, []);

  return (
    <div className="change-user-info-container">
      <div className="change-user-info-block">
        <h3>User Info</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            {userInfo.name && (
              <input type="text" name="name" defaultValue={userInfo.name} />
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            {userInfo.email && (
              <input type="text" name="email" defaultValue={userInfo.email} />
            )}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            {userInfo.username && (
              <input
                type="text"
                name="username"
                defaultValue={userInfo.username}
              />
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            {userInfo.password && (
              <input
                type="text"
                name="password"
                defaultValue={userInfo.password}
              />
            )}
          </div>
          <button type="submit">Accept</button>
          <button onClick={handleHomeNavigation}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default ChangeUserInfo;
