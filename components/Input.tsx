interface IProps {
  name: string;
  value: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, placeholder, value, handleChange }: IProps) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {placeholder}
      </label>
      <input
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        type="text"
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};
export default Input;
