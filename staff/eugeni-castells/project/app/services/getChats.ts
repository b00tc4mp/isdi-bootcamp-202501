import { validate } from "@/com";
import errors, { SystemError } from "@/com/errors";
import { ReturnedChat, ReturnedSanitizedChat } from "@/com/types";
import { data } from "@/data";

export const getChats = (): Promise<ReturnedSanitizedChat[]> => {
  return (async () => {
    const token = await data.getToken();

    return fetch(`${process.env.EXPO_PUBLIC_API_URL}/chats`, {
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
            .then((chats: ReturnedChat[]) => {
              const sanitizedChats = chats.map((chat) => {
                return {
                  ...chat,
                  createdAt: new Date(chat.createdAt),
                  modifiedAt: chat.modifiedAt
                    ? new Date(chat.modifiedAt)
                    : null,
                };
              });

              const sanitizedChatsWithSanitizedHistory = sanitizedChats.map(
                (chat) => {
                  return {
                    ...chat,
                    history: chat.history.map((history) => {
                      return {
                        ...history,
                        createdAt: new Date(history.createdAt),
                        modifiedAt: history.modifiedAt
                          ? new Date(history.modifiedAt)
                          : null,
                      };
                    }),
                  };
                }
              );

              return sanitizedChatsWithSanitizedHistory;
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
