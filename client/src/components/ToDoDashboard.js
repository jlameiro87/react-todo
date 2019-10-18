import React, {Component} from 'react';
import NewToDo from './NewToDo';
import ToDoList from './ToDoList';
import ToDoFooter from './ToDoFooter';
import { getToDos, createToDo, deleteToDo, updateToDo } from '../client';

class ToDoDashboard extends Component {

  state = {
    todos: []
  };

  componentDidMount() {
    this.loadToDoFromServer();
  }

  loadToDoFromServer = () => {
    getToDos((todos) => {
      this.setState({todos: todos});
    });
  };

  addNewToDo = (todo) => {
    let todos = [...this.state.todos, todo];
    this.setState({todos: todos});
    createToDo(todo);
  };

  removeToDo = (id) => {
    let todos = this.state.todos.filter((todo) => (todo.id !== id));
    this.setState({todos: todos});
    deleteToDo({id: id});
  };

  changeToDoStatus = (id) => {
    let todos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        let newTodo = Object.assign({}, todo, {
          status: todo.status === 'pending' ? 'completed' : 'pending',
        });
        updateToDo(newTodo);
        return newTodo;
      } else {
        return todo;
      }
    });
    this.setState({todos: todos});
  };

  getToDoPending = () => {
    return this.state.todos.filter((todo) => (todo.status === 'pending')).length;
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewToDo addNewToDo={this.addNewToDo}/>
          <ToDoList todos={this.state.todos} removeToDo={this.removeToDo} changeToDoStatus={this.changeToDoStatus} />
          <ToDoFooter pendingToDo={this.getToDoPending()} />
        </header>
      </section>
    );
  }
}

export default ToDoDashboard;