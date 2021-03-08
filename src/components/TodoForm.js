import React from 'react';
import shortid from 'shortid';

class TodoForm extends React.Component{
    constructor(props){
        super(props)
        
        this.state = { title: ""}
            
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        this.setState({id: shortid.generate()})
        this.props.addTodo({
            id:shortid.generate(),
            title: this.state.title,
            checked: false
        })
        this.setState({title: ""})
    }

    render(){
        return(
            <form style={{display:'flex', direction:'column', justifyContent:'center'}} onSubmit={this.handleSubmit}> 
                <label>
                    <span>Todo </span> 
                    <input id="input-box" type="text" name="title" onChange={this.handleChange} value={this.state.title}></input>
                </label>
                
                <button className="ml-1 btn-primary btn-sm" disabled={this.state.title ? false: true} name="submit" >Submit </button>

            </form>
        )
    }
}

export default TodoForm;