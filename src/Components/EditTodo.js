import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import {useParams,useNavigate} from "react-router-dom"
import { useQuery } from "react-query";
import {Link} from "react-router-dom"

const EditTodo = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {data,isLoading} = useQuery([id],()=> fetch(`http://localhost:5000/todo/${id}`).then(res=> res.json()))
    console.log(data);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
      } = useForm();
    
      const onSubmit = (data) => {
        fetch(`http://localhost:5000/todo/${id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            navigate("/")
            toast.success("Todo updated succesfully")
          });
          
        
      };
  return (
    <div className="w-full md:w-2/4 mx-auto px-6 md:px-0 bg-base-100 p-5 rounded-xl shadow-xl relative ">
        <div class="badge badge-lg bg-white text-black absolute top-0 left-0 cursor-pointer"><Link to="/" >Close</Link></div>
         <h1 className="text-4xl my-5 font-bold text-center text-white">
         Update Todo
        </h1>
        <hr className="my-5 md:mx-5 " />
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="flex justify-center items-center gap-2"
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <textarea
          defaultValue={data?.todo}
            class="textarea textarea-bordered bg-white text-black" 
            placeholder="Type Todo"
            cols="50"
            rows="2"
            {...register("todo", {
              required: {
                value: true,
                message: "Todo field is required",
              },
            })}
          ></textarea>

        
        <button className="btn btn-info">Update Todo</button>
        </div>

      </form>
    </div>
  );
};

export default EditTodo;
