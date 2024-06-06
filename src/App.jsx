import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Table from "./components/Table/Table";
import { normalizeRequest } from "./utils";
import Input from "./components/Input/Input";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const body = JSON.stringify({
      active: true,
      fields: {
        "*": true,
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
  }, []);

  const columns = ["Название", "Количество", "Описание", "Тип"];

  const inputChange = (event) => {
    return event.target.value;
  };

  return (
    <>
      <h1>Поиск заявок</h1>
      <Input
        divName="Название:"
        type="text"
        className="inputName"
        onChange={inputChange}
        placeholder="Введите название заявки..."
      />
      <Input
        divName="Количество:"
        type="number"
        className="inputNumber"
        min="0"
        placeholder="Введите количество заявок..."
      />
      <Button />
      <Table data={data} columns={columns} />
    </>
  );
}

export default App;
