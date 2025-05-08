import { validate } from "@/com";
import errors, { SystemError } from "@/com/errors";
import { data } from "@/data";
import { getApiUrl } from "@/getApiUrl";

export const deleteVanById = (vanId: string) => {
  validate.id(vanId, "van id");

  const apiUrl = getApiUrl();

  return (async () => {
    let token;
    try {
      token = await data.getToken();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    let response;
    try {
      response = await fetch(`${apiUrl}/vans/${vanId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    if (response.status === 200) return;

    let body;
    try {
      body = await response.json();
    } catch (error) {
      throw new SystemError((error as Error).message);
    }

    const { error, message } = body;
    const constructor = errors[error as keyof typeof errors];
    throw new constructor(message);
  })();
};
