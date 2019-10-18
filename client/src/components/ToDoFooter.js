import React from 'react';

function ToDoFooter(props) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.pendingToDo}</strong> {props.pendingToDo < 1 ? 'item' : 'items'} left
      </span>
    </footer>
  );
}

export default ToDoFooter;