import React from 'react';
import DisplayTodo from './components/DisplayTodo';
import TodoForm from './components/TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
     todos : [],
     display:"all"
    }
    this.addTodo = this.addTodo.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);
  }

  addTodo(todo){
    //console.log(todo)
    this.setState({todos:[...this.state.todos, todo]})
  }

  removeTodo = (id) =>{
    this.setState({todos: this.state.todos.filter((todo) => todo.id!==id )})
  }

  removeCompleted = () => {
    this.setState({todos: this.state.todos.filter( todo => !todo.checked)})
  }

  handleDisplay = (e) => {
    this.setState({display:e.target.value})
  }

  toggleChecked(id){
    this.setState({
    todos: this.state.todos.map(todo => {
      if(todo.id===id){
        return { ...todo, checked: !todo.checked}
      }else {
        return todo
      }
    })}
    )
  }

  componentDidUpdate(){
    document.getElementById('invisible').scrollIntoView({behaviour:'smooth'})
    document.getElementById('input-box').focus()
  }

  render(){
    var todos = []
    if(this.state.display==="all"){
      todos = this.state.todos
    }else if(this.state.display==="remaining"){
      todos = this.state.todos.filter( todo => !todo.checked)
    }else if(this.state.display==="completed"){
      todos = this.state.todos.filter( todo => todo.checked)
    }

    return (
      <div className="container d-flex flex-column align-items-center">
        <h1 className="mt-5 mb-5 "> TODO LIST </h1>
        <TodoForm addTodo={this.addTodo}/>

        <div className="display-container d-flex flex-column align-items-start">
          <ul>
            {todos.map(todo => (
              <li>
                <DisplayTodo key={todo.id} 
                todo={todo} 
                todoDisplay = {this.state.display}
                removeTodo = {() => this.removeTodo(todo.id)}
                toggleChecked={() => this.toggleChecked(todo.id)}/>
              </li>
            ))}
          </ul>

          <div id="invisible"></div>
        </div>


        <h1>Number of items left todo : {this.state.todos.reduce( (total, todo) => {return todo.checked?total: total+1},0)}</h1>

        <div>
          <span>Choose display : </span>
          <button className="btn-primary m-1 btn-sm" value="all" onClick={this.handleDisplay}> All </button>
          <button className="btn-primary m-1 btn-sm" value="remaining" onClick={this.handleDisplay}> Remaining </button>
          <button className="btn-primary m-1 btn-sm" value="completed" onClick={this.handleDisplay}> Completed </button>
        </div>

        <div>
          <button className="btn-primary m-1 btn-sm" style={{visibility: this.state.todos.length>0 ? "":"hidden"}} onClick={ () => this.setState({todos:[]})}>Delete All</button>
          <button className="btn-primary m-1 btn-sm" style={{visibility: this.state.todos.some( todo => todo.checked) ? "":"hidden"}} onClick={this.removeCompleted}>Delete All Completed</button>
        </div>

      </div>
    );
  }
}

export default App;
