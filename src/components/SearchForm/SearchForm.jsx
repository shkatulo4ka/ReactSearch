import "./SearchForm.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState } from "react";
import { normalizeRequest } from "../../utils";

function SearchForm({ setData }) {
  const [inputName, setInputName] = useState("");
  const [inputCount, setInputCount] = useState();

  const searchData = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const formProps = Object.fromEntries(formData);
    // console.log(formProps);
    const body = JSON.stringify({
      active: true,
      fields: {
        "*": true,
      },
      filter: {
        eql: {
          //   query: "([number] = 1) AND [__name] = 'первый 1'",
          query: `([number] >= ${inputCount ? inputCount : 0} ) AND [__name] LIKE '${inputName}'`,
        },
      },
    });

    fetch("/api/app/publicity_management/requests/list", {
      method: "POST",
      headers: {
        Authorization: "Bearer b370464f-3cff-4f14-af1f-b8052e471541",
      },
      body,
    })
      .then((response) => response.json())
      .then((res) =>
        setData(res.result.result.map((el) => normalizeRequest(el))),
      )
      .catch((error) => console.log(error));
  };

  const inputCountChange = (event) => {
    console.log(event.target.value);
    setInputCount(event.target.value);
  };

  const inputNameChange = (event) => {
    console.log(event.target.value);
    setInputName(event.target.value);
  };

  return (
    <form className="search_form" onSubmit={searchData}>
      <Input
        divName="Название:"
        type="text"
        className="inputName"
        value={inputName}
        onChange={inputNameChange}
        placeholder="Введите название заявки..."
      />
      <Input
        divName="Количество:"
        type="number"
        value={inputCount}
        className="inputNumber"
        min="0"
        onChange={inputCountChange}
        placeholder="Введите количество заявок..."
      />
      <Button className={"search_button"} text={"Поиск"} />
    </form>
  );
}

export default SearchForm;
