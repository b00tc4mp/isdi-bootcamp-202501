import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { useContext } from "../../context.js";
import Posts from "./Posts.jsx";
import { logic } from "../../logic/index.js";

export const Profile = () => {
  const location = useLocation();
  const [userId, setUserId] = useState(location?.state?.userId);
  const { username } = useParams();
  const { alert } = useContext();

  useEffect(() => {
    try {
      if (!userId) {
        logic
          .getIdByUsername(username)
          .catch((error) => {
            console.error(error);

            alert(error.message);
          })
          .then((returnedId) => setUserId(returnedId));
      }
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  }, [userId]);

  return (
    <div>
      {userId && <h1>{username}</h1>}

      <Posts targetUserId={userId} />
    </div>
  );
};
