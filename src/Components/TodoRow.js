import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import {Link} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const TodoRow = ({ todo, index, refetch }) => {
    const deleteTodo = (id)=> {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            width:"400",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/todo/${id}`,{
                    method:"DELETE",
                    headers:{
                        "content-type": "application/json"
                    }
                })
                .then(res =>res.json())
                .then(()=>{
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success',
                      
                      )
                      
  
                })
          
            }
          })

    }

    refetch();
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{todo.todo}</td>
        <td>
         <Link className="btn btn-primary" to={`/edit/${todo._id}`} >Edit</Link> 
         <button onClick={()=> deleteTodo(todo._id)} className="btn btn-error ml-3">Delete</button>
        </td>
     
      </tr>
    </>
  );
};

export default TodoRow;
