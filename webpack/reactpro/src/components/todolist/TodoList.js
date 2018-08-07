import React, {Component} from 'react'

class TodoList extends Component {

    render() {
        let todos = this.props.todos;
        let onTodoClick = this.props.onTodoClick;
        return (
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} onClick={() => onTodoClick(index)} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                    {todo.text}
                    </li>
                ))}
            </ul>
        )
    }

}

export default TodoList