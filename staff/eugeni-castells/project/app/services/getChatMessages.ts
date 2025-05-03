import { validate } from "@/com";
import errors, { SystemError } from "@/com/errors";
import {
  ReturnedChatMessages,
  ReturnedSanitizedChatMessages,
} from "@/com/types";
import { data } from "@/data";

export const getChatMessages = (
  chatId: string
): Promise<ReturnedSanitizedChatMessages> => {
  validate.id(chatId, "chat id");
  return (async () => {
    const token = await data.getToken();

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/chats/${chatId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((response) => {
        if (response.status === 200)
          return response
            .json()
            .catch((error) => {
              throw new SystemError(error.message);
            })
            .then((messages: ReturnedChatMessages) => {
              const sanitizedMessages = messages.map((message) => {
                return {
                  ...message,
                  createdAt: new Date(message.createdAt),
                  modifiedAt: message.modifiedAt
                    ? new Date(message.modifiedAt)
                    : null,
                };
              });

              return sanitizedMessages;
            });

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
