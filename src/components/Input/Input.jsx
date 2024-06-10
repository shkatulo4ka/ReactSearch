import "./Input.css";

const Input = ({
  divName,
  type,
  className,
  onChange,
  placeholder,
  ...attrs
}) => {
  return (
    <div>
      {divName}
      <input
        type={type}
        className={className}
        onChange={onChange}
        placeholder={placeholder}
        {...attrs}
      />
    </div>
  );
};

export default Input;
