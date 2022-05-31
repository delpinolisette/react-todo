import React , {useState} from "react";

export default function FilterButton(props) {
  return (
    <button type="button" 
    className="btn toggle-btn" 
    aria-pressed={props.isPressed}
    key={props.key}
    onClick={() => props.setFilter(props.name)}>

      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden">Tasks</span>
      
    </button>
  );
}
