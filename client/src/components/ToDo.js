import React from 'react';

function ToDo(props) {

  function removeToDo() {
    props.removeToDo(props.todo.id)
  }

  function changeToDoStatus() {
    props.changeToDoStatus(props.todo.id);
  }

  function getClassNames() {
    return props.todo.status === 'pending' ? 'todo' : 'todo completed';
  }

  return (
    <li className={getClassNames()} key={props.todo.id}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label onClick={changeToDoStatus}>{props.todo.title}</label>
        <button className="destroy" onClick={removeToDo}/>
      </div>
    </li>
  );
}

export default ToDo;