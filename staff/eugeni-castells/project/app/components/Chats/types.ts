export type ChatBoxProps = {
  interlocutor: {
    id: string;
    name: string;
    lastName: string;
  };
  lastMessage: string | null;
  lastSent: string | null;
  onItemClick: () => void;
};

export type MessageBoxProps = {
  own: boolean;
  message: string;
  sent: string;
};
