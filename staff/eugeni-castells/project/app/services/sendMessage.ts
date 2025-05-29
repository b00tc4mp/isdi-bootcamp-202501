import { validate } from "@/com";
import errors, { SystemError } from "@/com/errors";
import { data } from "@/data";
import { getApiUrl } from "@/getApiUrl";

export const sendMessage = (chatId: string, message: string) => {
  validate.id(chatId, "chat id");
  validate.text(message, "message");
  validate.minLength(message, 1, "message min length");
  validate.maxLength(message, 600, "message max length");

  return (async () => {
    const token = await data.getToken();

    const apiUrl = getApiUrl();

    fetch(`${apiUrl}/chats/${chatId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((response) => {
        if (response.status === 201) return;

        return response
          .json()
          .catch((error) => {
            throw new SystemError(error.message);
          })
          .then((body) => {
            const { error, message } = body;

            const constructor = errors[error as keyof typeof errors];

            throw new constructor(message);
          });
      });
  })();
};
