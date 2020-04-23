import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class TodoWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      lists: [],
        };
  }


  handleTextInput = (e) => {

    this.setState({ inputText: e.target.value })
  }

  handleEnterKey = (e) =>{
  
    if(e.key === "Enter"){
      e.preventDefault();
      this.handleClick()
    }else{
      return null
    }
  }

  handleClick = () => {
    if(this.state.inputText !== ""){              
      this.setState({lists: [...this.state.lists, {id:uuidv4(), name: this.state.inputText, status: "incomplete"}]});
      this.setState({inputText:""})
    }
  }

  deleteItem = (itemId) =>{
console.log(" We are here")
   this.setState({lists: [...this.state.lists.filter( val => val.id !== itemId)]})
  }

  handleUpdate = (itemId)=>{
    console.log("We are here")

    const getItem = this.state.lists.filter(val => val.id === itemId);

    if(getItem[0].status === "incomplete"){
      getItem[0].status = "complete"
    }else if (getItem[0].status === "complete"){
      getItem[0].status = "incomplete"
    }else{
      return null
    }

    this.setState({lists: [...this.state.lists]})

  }

  render() {

    return (
      <div className="todoListwrapper">
        <div className="inputAndButton">
          <input type="text" placeholder="insert text here" value={this.state.inputText} onChange={this.handleTextInput} onKeyPress={this.handleEnterKey}></input>
          <button style={{backgroundColor:"green", color:"#ffffff"}} onClick={this.handleClick}>ADD</button>
        </div>
        <div className="itemlist">
          {
            this.state.lists.map(item => {
              return (
                <div key={item.id} className="itemWrapper">
                  { (item.status === "incomplete")? item.name : ( <strike style={{color:"#999"}}>{item.name}</strike>) }
                  <button onClick={() => this.handleUpdate(item.id)}>{(item.status === "incomplete")? "INCOMPLETE" : "COMPLETED"}</button>
                  <button style={{backgroundColor:"red", color:"#ffffff"}} onClick={() => this.deleteItem(item.id)}>DELETE</button>
                </div>
              )
            }
            )
          }
        </div>
      </div>
    );
  }
}

export default TodoWrapper;