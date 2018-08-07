import React, {Component} from 'react';
import logo from '../assets/logo.svg';
import '../style/App.css';

import Footer from './todolist/Footer'
import AddTodo from '../containers/todolist/AddTodo'
import VisibleTodoList from '../containers/todolist/VisibleTodoList'

class App extends Component {
    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <ul>
                    <li><a href="#/home">Home</a></li>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/topics">Topic</a></li>
                </ul>

                <hr/>

                <div className="todolist">
                    <AddTodo/>
                    <VisibleTodoList/>
                    <Footer/>
                </div>


            </div>
        );
    }
}

export default App;
