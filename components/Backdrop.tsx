interface IProps {
  show?: boolean;
  onBackdropClick?: () => void;
}

const Backdrop = ({ show, onBackdropClick }: IProps) => {
  if (!show) return null;

  return (
    <div
      className="h-full w-full fixed"
      style={{
        background: "#000000a6",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
      onClick={onBackdropClick}
    />
  );
};

export default Backdrop;
