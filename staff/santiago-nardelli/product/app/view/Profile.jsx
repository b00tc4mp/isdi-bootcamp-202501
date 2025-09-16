import { useParams, useLocation } from "react-router";
import { Posts } from "./components/Posts";

export const Profile = () => {
  const { username } = useParams();
  const { state :{ userId} } = useLocation(); //==> recibo el id del usuario logueado desde el login y me lo pasa desde profile

  return (
    <div className="profile">
      <h1>{username}</h1>
      <p>Welcome to your profile page!{userId}</p>

      <Posts userSearchId={userId} /> {/*==> Le paso el id del usuario logueado para que me traiga sus posts */}
    </div>
  );
};
