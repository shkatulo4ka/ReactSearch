import "./App.css";
import Table from "./components/Table/Table";
import { useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import { normalizeRequest } from "./utils";

function App() {
  const [data, setData] = useState([]);
  const columns = ["Название", "Количество", "Описание", "Тип"];

  const options = [
    { value: "internal", label: "Внутренняя" },
    { value: "external", label: "Внешняя" },
  ];
  const submitFormHandler = ({ name, count, code }) => {
    const body = JSON.stringify({
      active: true,
      fields: {
        "*": true,
      },
      filter: {
        eql: {
          query: `([number] >= ${count ? count : 0} ) AND [__name] LIKE '${name}' AND [type] IN ('${code.length ? code.join("','") : options.map((e) => e.value).join("','")}')`,
        },
      },
    });

    fetch("/pub/v1/app/publicity_management/requests/list", {
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

  return (
    <>
      <h1>Поиск заявок</h1>
      <SearchForm submitFormHandler={submitFormHandler} />
      <Table data={data} columns={columns} />
    </>
  );
}

export default App;
