import React from "react";
import Select from "react-select";

const options = [
  { value: "ascending", label: "Date by Ascending" },
  { value: "descending", label: "Date by Descending" },
];

const Filter = ({ setFilter }) => {
  return (
    <div className="container mt-4">
      <Select options={options} onChange={(e) => setFilter(e.value)} />
    </div>
  );
};
export default Filter;
