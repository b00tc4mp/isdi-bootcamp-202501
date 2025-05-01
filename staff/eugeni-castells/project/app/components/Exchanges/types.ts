export type ExchangesFoldedItemProps = {
  status: "accepted" | "rejected" | "pending";
  owner: { name: string; lastName: string; id: string };
  renter: { name: string; lastName: string; id: string };
  startDate: string;
  endDate: string;
  createdAt: Date;
  price: number;
  handleRequestButtons?: boolean;
  id: string;
  onConfirm?: () => void;
};
