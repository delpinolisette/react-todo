import React, { useState } from "react";

export default function Form(props) {
  // first example of using state
  // uses array destructuring
  const [name, setName] = useState("");

  // prevent default behavior on invalid input!
  function handleSubmit(e) {
    // console.log("name for submit ",name)
    //stop empty input from happening - is this best way?
    if (name == "") {
      alert("Please enter a task!");
      return;
    }
    e.preventDefault();
    props.addTask(name); //sends this back to App.js
    setName("");
  }

  function handleChange(e) {
    // console.log(e.target.value);
    setName(e.target.value); //sets name state to the target value. 
    console.log("name",name)
  }
  return (
    <form onSubmit={handleSubmit}>
      <h4 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What Needs to be done today?        
          </label>
      </h4>
      <input
        type="text"
        id="new-todo-input" //why is it the same name as the label html?
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name} // uses useState hook here for default val
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add me!
      </button>
    </form>
  );
}
