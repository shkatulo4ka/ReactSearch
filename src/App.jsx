import "./App.css";
import Table from "./components/Table/Table";
import { useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";

function App() {
  const [data, setData] = useState([]);
  const columns = ["Название", "Количество", "Описание", "Тип"];

  return (
    <>
      <h1>Поиск заявок</h1>
      <SearchForm setData={setData} />
      <Table data={data} columns={columns} />
    </>
  );
}

export default App;
