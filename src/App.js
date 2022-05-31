import React, { useState } from "react";
import { nanoid } from "nanoid";
// import logo from './logo.svg';
// import './App.css'; // per component stylesheet
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

/**
 * State and components which shouldn't be recalcualted
 */

// object to store the filter maps
// uppercase because immutable
const FILTERMAP = {
  All: () => true,
  Ongoing: (task) => !task.completed,
  Completed: (task) => task.completed,
};
// grab all possible keys in FILTERMAP
const FILTERNAMES = Object.keys(FILTERMAP);

/**
 *
 * @param {} props
 * @returns TODO App
 */

function App(props) {
  // const subject="PM Prototype for Data Mapping";

  // grabs each name in task data array and stores in new array
  // const tasklist = props.tasks?.map(task=> task.name);

  const [tasks, setTasks] = useState(props.tasks); //sets initial task state
  // console.log(tasks);

  // Filters for Tasks
  const [filter, setFilter] = useState("All"); // state for filters on application

  function toggleTaskCompleted(id) {
    // takes in a task id and tags it as completed

    const updatedTasks = tasks.map(
      (task) => {
        if (id === task.id) {
          // use spread operator to make new object same as task
          // but with completed set to opposite state (t --> f or f -->t)
          return { ...task, completed: !task.completed };
        }

        // if no match found return same task
        return task;
      }

      // call setter method of useState
    );
    setTasks(updatedTasks);
  }

  //grabs each data element from DATA array passed in and creates a Todo component.
  const tasklist = tasks.filter(FILTERMAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  ));

  const filterlist = FILTERNAMES.map((name) => (
    <FilterButton 
    key={name + nanoid()} 
    name={name}
    isPressed={name == filter} 
    setFilter={setFilter}/>
  ));

  //callback function props for adding a task
  function addTask(name) {
    // alert(name);
    // need to make task structure identical to the others
    const newTask = {
      id: "todo" + nanoid(),
      name: name,
      completed: false,
    };
    // console.log(newTask.key);
    setTasks([...tasks, newTask]); //save task name coming from Form props (which comes from its state)
  }

  function deleteTask(id) {
    //testing
    // const taskToDelete = tasks.map(task =>{
    //   if (id === task.id){
    //     return task
    //   }
    //   return "NOT the task to delete"
    // })
    // console.log(taskToDelete)

    // actual deletion from state
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTasks);
  }

  // count number of remaining tasks
  const tasksNumNoun =
    tasklist.length > 1 || tasklist.length == 0 ? "tasks" : "task";
  const headingText = `${tasklist.length} ${tasksNumNoun} remaining`;

  // something that is difficult for me to understand is what is coming from the js and what is okay to be pure JSX or html
  // this will come with practice.

  return (
    <div className="todoapp stack-large">
      <h1>{props.name}</h1>
      {/* example of callback prop */}
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterlist}</div>
      <h2 id="list-heading">
        {headingText}
        {/* update this */}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {/* render with iteration  */}
        {tasklist}
      </ul>
    </div>
  );
}

export default App;
