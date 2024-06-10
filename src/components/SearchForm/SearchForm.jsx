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
    console.log(event.target.value);
    setInputCount(event.target.value);
  };

  const inputNameChangeHandler = (event) => {
    console.log(event.target.value);
    setInputName(event.target.value);
  };

  const selectHandler = (data) => {
    console.log(data);
    setSelectCode(data.map((e) => e.value));
  };

  const options = [
    { value: "internal", label: "Внутренняя" },
    { value: "external", label: "Внешняя" },
  ];

  return (
    <form className="search_form" onSubmit={submitHandler}>
      <Input
        divName="Название:"
        type="text"
        value={inputName}
        onChange={inputNameChangeHandler}
        placeholder="Введите название заявки..."
      />
      <Input
        divName="Количество:"
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
