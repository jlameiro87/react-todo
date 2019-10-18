import React from 'react';
import ToDo from './ToDo';

function ToDoList(props) {
  return (
    <section className="main">
      <ul className="todo-list">
        {
          props.todos.map((todo) => (
            <ToDo key={todo.id} todo={todo} removeToDo={props.removeToDo} changeToDoStatus={props.changeToDoStatus} />
          ))
        }
      </ul>
    </section>
  );
}

export default ToDoList;