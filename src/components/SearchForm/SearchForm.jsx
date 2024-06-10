import "./SearchForm.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState } from "react";
import Select from "react-select";

function SearchForm({ submitFormHandler }) {
  const [inputName, setInputName] = useState("");
  const [inputCount, setInputCount] = useState();
  const [selectCode, setSelectCode] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    submitFormHandler({
      name: inputName,
      count: inputCount,
      code: selectCode,
    });
  };

  const inputCountChangeHandler = (event) => {
    setInputCount(event.target.value);
  };

  const inputNameChangeHandler = (event) => {
    setInputName(event.target.value);
  };

  const selectHandler = (data) => {
    setSelectCode(data.map((el) => el.value));
  };

  const options = [
    { value: "internal", label: "Внутренняя" },
    { value: "external", label: "Внешняя" },
  ];

  return (
    <form className="search_form" onSubmit={submitHandler}>
      <Input
        name="name"
        className={"input_block"}
        label="Название:"
        type="text"
        value={inputName}
        onChange={inputNameChangeHandler}
        placeholder="Введите название заявки..."
      />
      <Input
        name="count"
        label="Количество от:"
        className={"input_block"}
        type="number"
        value={inputCount}
        min="0"
        onChange={inputCountChangeHandler}
        placeholder="Введите количество заявок..."
      />
      <Select
        defaultValue={options}
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={selectHandler}
        placeholder="Укажите тип заявки..."
      />
      <Button className={"search_button"} text={"Поиск"} />
    </form>
  );
}

export default SearchForm;
