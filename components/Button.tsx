interface IProps {
  children: React.ReactNode;
  [index: string]: any;
}
const Button = ({ children, ...others }: IProps) => (
  <button
    {...others}
    className="w-full flex justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded items-center"
  >
    {children}
  </button>
);

export default Button;
