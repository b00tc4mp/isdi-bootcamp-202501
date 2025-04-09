import { extactPayloadFromJWT } from '../../util/extractPayloadFromJWT.js';

export const getUserId = () => {
  if (!sessionStorage.token) return null;
  const { sub: userId } = extactPayloadFromJWT(sessionStorage.token);

  return userId;
};
