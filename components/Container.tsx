interface IProps {
  header: string | React.ReactNode;
  children: React.ReactNode;
}

const Container = ({ header, children }: IProps) => {
  return (
    <div className="w-4/5 mx-auto overflow-auto">
      <h1 className="font-bold my-2">{header}</h1>
      <div className="h-[80vh] overflow-y-auto">{children}</div>
    </div>
  );
};

export default Container;
