export const Confirm = ({ title, message, onAccepted, onCancelled }) => {
  return (
    <>
      <div className="w-screen h-screen fixed top-0 bg-[var(--bg-color) opacity-80]"></div>
      <div className="w-screen h-screen fixed top-0 flex justify-center items-center">
        <div className="border-2 p-2 flex flex-col bg-[var(--bg-color)]">
          <h2 className="text-2xl">{title}</h2>

          <p>{message}</p>

          <button className="secondary" type="button" onClick={onCancelled}>
            Cancel
          </button>
          <button type="button" onClick={onAccepted}>
            Accept
          </button>
        </div>
      </div>
    </>
  );
};
