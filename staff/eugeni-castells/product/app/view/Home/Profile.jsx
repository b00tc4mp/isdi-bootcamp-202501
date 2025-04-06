import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { useContext } from "../../context.js";
import Posts from "./Posts.jsx";
import { logic } from "../../logic/index.js";

export const Profile = () => {
  const location = useLocation();
  const [userId, setUserId] = useState(location?.state?.userId);
  const { username } = useParams();
  const navigate = useNavigate();
  const { alert } = useContext();

  useEffect(() => {
    try {
      if (!userId) {
        logic
          .getIdByUsername(username)
          .catch((error) => {
            console.error(error);

            alert(error.message);

            navigate("/");
          })
          .then((returnedId) => setUserId(returnedId));
      }
    } catch (error) {
      console.error(error);

      alert(error.message);

      navigate("/");
    }
  }, [userId]);

  return (
    <div>
      <h1>{username}</h1>

      <Posts targetUserId={userId} />
    </div>
  );
};
