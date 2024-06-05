/* eslint-disable react/prop-types */
import "./Table.css";

const Table = ({ data, columns }) => {
  console.log(data);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((el) => (
            <th key={el}>{el}</th>
          ))}
        </tr>
        {data.map(({ name, description, typeName, count }) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{count}</td>
            <td>{description}</td>
            <td>{typeName}</td>
          </tr>
        ))}
      </thead>
    </table>
  );
};

export default Table;
