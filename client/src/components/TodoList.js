import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from './TodoListFunctions'
import FormValidator from './FormValidator'


class TodoList extends Component {
  constructor() {
    super()


    this.validator = new FormValidator([
        { 
          field: 'task', 
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Task name is required' 
        },
        { 
          field: 'status',
          method: 'isEmpty', 
          validWhen: false, 
          message: 'Status is required'
        }
      ]);

    this.state = {
      id: '',
      task: '',
      status: 0,
      progress: 0,
      deadline:'',
      createdAt:'',
      isUpdate : false,
      errorMessage:'',
      items: [],
      validation: this.validator.valid(),
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
  
  }

  componentDidMount() {
    getList().then((res) => {
      // console.log(res);
      if(res.data.status === 'failed'){
          this.setState({ errorMessage:res.data.message });
      }
      else{

        this.setState({
          items:res.data
        })
      }
      console.log(this.state.items);
  })}

  onData() {
    getList().then((res) => {
      console.log(res);
      if(res.data.status === 'failed'){
          this.setState({ errorMessage:res.data.message });
      }
      else{

        this.setState({
          items:res.data
        })
      }
      
  })}


  onChange(e) {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeRange(e){
    document.getElementById("slider_value").innerHTML=e.target.value;
  }

  onCreate(e) {
    e.preventDefault()
   
    this.setState({
      isUpdate : false,
      
    });
  
  }

  getStatus(statusCode) {
    const status = ['Start','In Progress','End'];
    return status[statusCode];
  }


  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    return date.getDate() + ' ' + monthNames[date.getMonth()] + ', ' + date.getFullYear();
  }
  


  onSubmit = e => {
    e.preventDefault()
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    if (validation.isValid) {

        const taskRequest = {
            name: this.state.task,
            status: this.state.status,
            progress:this.state.progress,
            deadline:this.state.deadline

        }
        console.log(taskRequest);

        addToList(taskRequest).then(() => {
          this.onData();
        }).catch(err=>{
            this.setState({ editDisabled: false, errorMessage:err.message })
        })
        this.setState({ editDisabled: false })
    }
    
    
  }

  onUpdate = e => {
    e.preventDefault()
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    if (validation.isValid) {
        
        const taskUpdateRequest = {
          name: this.state.task,
            status: this.state.status,
            progress:this.state.progress,
            deadline:this.state.deadline,
            id: this.state.id
        }
        updateItem(taskUpdateRequest).then(() => {
       this.onData();
        }).catch(err=>{
            this.setState({ editDisabled: false, isUpdate:false, errorMessage:err.message })
        })
    }
    this.setState({ editDisabled: false, isUpdate:false,status: 0 })
  }

  onEdit = (item_id, item, status,progress,deadline, e) => {
    e.preventDefault()
    console.log(item);
    this.setState({
      
      id: item_id,
      task: item,
      status:status,
      progress:progress,
      deadline:deadline,
      errorMessage:'',
      isUpdate:true,
      validation: this.validator.valid(),
    })
  }

  onDelete = (val, e) => {
    e.preventDefault()
    
    deleteItem(val).then((res) => {
        if(res.data.status === 'failed'){
            this.setState({ errorMessage:res.data.message })
        }
        else{
      this.onData();
        }

    }).catch(err=>{
        this.setState({ errorMessage:err.data.message })
    })
    
    
  }


  render() {
    
    return (
    <div className="row"> 
        <div className="col-md-12 mt-5">
        <div className="col-md-12">
        { this.state.errorMessage !== '' ?
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error Message: </strong> {this.state.errorMessage}
            </div>
            :
            <div></div>
        }
        </div>
        <form onSubmit={this.onSubmit}>
        

<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Task Name</span>
  <input type="text"
                  className="form-control"
                  value={this.state.task}
                  name="task"
                  onChange={this.onChange} />
</div>

<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Progress</span>
  <div class="form-control">
    <div className="row">
    <div className="col-10">
    <input type="range" name="progress"  min="1" max="100"  class="form-control form-range"  onInput={this.onChangeRange} onChange={this.onChange} />
      </div>
      <div className="col-2">
      <span id="slider_value" ></span>
      </div>
      
    </div>
  </div>
  
</div>

<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Status</span>
  <select className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
                    <option  value="0">Start</option>
                    <option value="1">In Progress</option>
                    <option value="2">End</option>
                </select>
                <span className="help-block">{this.state.validation.status.message}</span>
</div>

<div class="input-group mb-3">
  <span class="input-group-text"  id="inputGroup-sizing-default" >DeadLine</span>
  <input type="datetime-local" onChange={this.onChange}
                  className="form-control"
                  name="deadline" />
</div>




       
        <button className="btn btn-primary btn-block" onClick={this.onUpdate.bind(this)} 
             style={this.state.isUpdate ? {} : { display: 'none' }} 
        >
            Update
        </button>
        <button type="submit" onClick={this.onSubmit.bind(this)} className="btn btn-success btn-block"
            style={this.state.isUpdate ? {display: 'none' } : {  }}
        >
            Add
        </button>
        <button onClick={this.onCreate.bind(this)} className="btn btn-info btn-block"
            style={this.state.isUpdate ? {} : { display: 'none' }} 
        >
            Create New
        </button>
        </form>
        <br></br><br></br>
        <div class="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>DeadLine</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
              <td className="text-left">{item.taskName}</td>
              <td className="text-left">{item.progress}</td>
                <td className="text-left">{this.getStatus(item.status)}</td>
                <td className="text-left">{item.createdAt}</td>
                <td className="text-left">{item.deadLine}</td>
                <td className="text-right">
                  <button 
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item.id, item.taskName, item.status,item.progress, item.deadLine)}
                  >
                    Edit
                  </button>
                  <button
                    
                    className="btn btn-danger"
                    onClick={this.onDelete.bind(this, item.id)}
                    style={this.state.isUpdate ? {display: 'none' } : {  }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
    )
  }
}

export default TodoList