import "./Input.css";

const Input = ({
  label,
  type,
  className,
  name,
  onChange,
  placeholder,
  ...attrs
}) => (
  <div className={className}>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      onChange={onChange}
      placeholder={placeholder}
      {...attrs}
    />
  </div>
);

export default Input;
