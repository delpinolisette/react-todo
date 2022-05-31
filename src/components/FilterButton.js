import React , {useState} from "react";

export default function FilterButton() {
  const [filter,setFilter] = useState('All'); // state for filters on application
  return (
    <button type="button" className="btn toggle-btn" aria-pressed="true">
      <span className="visually-hidden">Show </span>
      <span>all</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
