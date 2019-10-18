import React, {Component} from 'react';

class NewToDo extends Component {

  state = {
    title: ''
  };

  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  };

  onKeyPress = (event) => {
    // Capture Enter Key
    if (event.key === 'Enter') {
      let todo = {
        id: window.uuid.v4(),
        title: this.state.title,
        status: 'pending'
      };

      this.props.addNewToDo(todo);
      // Empty title
      this.setState({title: ''});
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        name="title"
        value={this.state.title}
        autoFocus
        autoComplete="off"
        onKeyPress={this.onKeyPress}
        onChange={this.handleChange}
      />
    );
  }
}

export default NewToDo;