import React from 'react';

 const DisplayTodo = props => {
    
        return(
            <div className="text-container">
                <p style={{color:"#02020B", display:'inline',cursor:'pointer', textDecoration: ((props.todo.checked) && (props.todoDisplay!=="completed")) ? 'line-through': ''}} 
                onClick={props.toggleChecked}>{props.todo.title}</p>
                <button className="btn-delete" onClick={props.removeTodo}>X</button>
            </div>
        )
}

export default DisplayTodo;