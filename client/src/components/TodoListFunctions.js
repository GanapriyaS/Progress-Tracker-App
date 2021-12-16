import axios from 'axios'

export const getList = token => {
    return axios
        .get('http://localhost:8080/tasks', {
        headers: { 
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
        })
        .then(res => {
          
            res.data.status = 'success'
            return res;
        }).catch(err => {
            return {
                error:'Please login again!',
                status:'failed',
                message:err.message
            }
        })
}

export const addToList = task => {
  return axios
    .post(
      'http://localhost:8080/tasks',
      {
        taskName: task.name,
        status: task.status,
        progress:task.progress,
        deadLine:task.deadline,
        createdAt:new Date()
      },
      {
        headers: { 
            'Content-Type': 'application/json',
           
        }
      }
    )
    .then(function(response) {
        return response.data;
    }).catch(err => {
        return {
            error:'Error to add',
            status:'failed',
            message:err.message
        }
    })
}

export const deleteItem = (task) => {
  return axios
    .delete(`http://localhost:8080/task/${task}`, {
      headers: { 
            'Content-Type': 'application/json',
        }
    })
    .then(function(response) {
        console.log(response)
        return response;
    })
    .catch(function(error) {
      console.log(error)
      return error;
    })
}

export const updateItem = taskUpdateRequest => {
  return axios
    .put(
      `http://localhost:8080/task/${taskUpdateRequest.id}`,
      {
        taskName: taskUpdateRequest.name,
        status: taskUpdateRequest.status,
        progress:taskUpdateRequest.progress,
        deadLine:taskUpdateRequest.deadline
        
      },
      {
        headers: { 
            'Content-Type': 'application/json', 
        }
      }
    )
    .then(function(response) {
      
        return response.data;
    })
}
