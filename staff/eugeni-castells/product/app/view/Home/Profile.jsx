import { useParams, useLocation } from "react-router";

import Posts from "./Posts.jsx";

export const Profile = () => {
  const { username } = useParams();

  const {
    state: { userId },
  } = useLocation();

  return (
    <div>
      <h1>{username}</h1>

      <Posts targetUserId={userId} />
    </div>
  );
};
