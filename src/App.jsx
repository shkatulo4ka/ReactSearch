import "./App.css";
import Table from "./components/Table/Table";
import { useState } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import { normalizeRequest } from "./utils";
import ReactPaginate from "react-paginate";

function App() {
  const [data, setData] = useState([]);
  const [myQuery, setMyQuery] = useState("");
  const [total, setTotal] = useState(0);

  const columns = ["Название", "Количество", "Описание", "Тип"];

  const PAGE_SIZE = 10;

  const options = [
    { value: "internal", label: "Внутренняя" },
    { value: "external", label: "Внешняя" },
  ];

  const submitFormHandler = ({ name, count, code }) => {
    const newQuery = `([number] >= ${count ? count : 0} ) AND [__name] LIKE '${name}' AND [type] IN ('${code.length ? code.join("','") : options.map((e) => e.value).join("','")}')`;
    setMyQuery(newQuery);
    const body = JSON.stringify({
      active: true,
      fields: {
        "*": true,
      },
      filter: {
        eql: {
          query: newQuery,
        },
      },
      from: 0,
      size: PAGE_SIZE,
    });
    request(body);
  };

  const request = (body) => {
    fetch("/pub/v1/app/publicity_management/requests/list", {
      method: "POST",
      headers: {
        Authorization: "Bearer b370464f-3cff-4f14-af1f-b8052e471541",
      },
      body,
    })
      .then((response) => response.json())
      .then((res) => {
        setTotal(res.result.total);
        setData(res.result.result.map((el) => normalizeRequest(el)));
      })
      .catch((error) => console.log(error));
  };

  const pageCount = Math.ceil(total / PAGE_SIZE);

  const pageChangeHandler = (page) => {
    console.log(page);
    const body = JSON.stringify({
      active: true,
      fields: {
        "*": true,
      },
      filter: {
        eql: {
          query: myQuery,
        },
      },
      from: page.selected * PAGE_SIZE,
      size: PAGE_SIZE,
    });
    request(body);
  };

  return (
    <>
      <SearchForm submitFormHandler={submitFormHandler} />
      <Table data={data} columns={columns} />
      <ReactPaginate
        className="pages"
        breakLabel="..."
        nextLabel=">>"
        onPageChange={pageChangeHandler}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default App;
