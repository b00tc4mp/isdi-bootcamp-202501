export type BookCalendarProps = {
  onReturnClick: () => void;
  onAcceptButton: ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) => void;
};
