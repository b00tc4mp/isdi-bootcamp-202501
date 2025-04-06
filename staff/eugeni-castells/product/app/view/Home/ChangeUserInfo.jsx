import { useState, useEffect } from "react";
import { logic } from "../../logic";
import "./ChangeUserInfo.css";

function ChangeUserInfo({ onHomeNavigation, onAccepted }) {
  const [userInfo, setUserInfo] = useState({});

  const handleSubmitSuccess = () => {
    onHomeNavigation();
  };

  const handleAccept = () => {
    onAccepted();
  };
  const handleSubmit = (e) => {
    try {
      e.preventDefault();

      const {
        name: { value: name },
        email: { value: email },
        username: { value: username },
      } = e.target;

      const updatedUser = {
        name,
        email,
        username,
      };

      return logic
        .updateUser(updatedUser)
        .catch((error) => {
          console.error(error);

          alert(error.message);
        })
        .then(() => {
          handleSubmitSuccess();
          handleAccept();
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  };

  useEffect(() => {
    try {
      logic
        .getUserInfo()
        .catch((error) => {
          throw new Error(error.message);
        })
        .then((body) => {
          setUserInfo(body);
        });
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="bg-[var(--primary-color)] p-8 w-[45%]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-[var(--bg-color)]"
        >
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="name" className="flex-1">
              Name
            </label>
            {userInfo.name && (
              <input
                type="text"
                name="name"
                defaultValue={userInfo.name}
                className="flex-1 border-2 border-[var(--bg-color)] p-2 "
              />
            )}
          </div>
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="email" className="flex-1">
              Email
            </label>
            {userInfo.email && (
              <input
                type="text"
                name="email"
                defaultValue={userInfo.email}
                className="flex-1 border-2 border-[var(--bg-color)] p-2 "
              />
            )}
          </div>
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="username" className="flex-1">
              Username
            </label>
            {userInfo.username && (
              <input
                type="text"
                name="username"
                defaultValue={userInfo.username}
                className="flex-1 border-2 border-[var(--bg-color)] p-2 "
              />
            )}
          </div>
          <div className="flex justify-between gap-4 mt-4">
            <button
              type="submit"
              className="bg-[var(--primary-color)] text-[var(--bg-color)] px-4 py-2 border-2 border-solid border-[var(--bg-color)] hover:bg-[var(--bg-color)] hover:text-[var(--primary-color)] hover:cursor-pointer"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={handleSubmitSuccess}
              className="bg-transparent text-[var(--primary-color)] border-2 border-solid border-[var(--primary-color)] px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeUserInfo;
