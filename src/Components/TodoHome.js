import React from "react";
import { useForm } from "react-hook-form";
import { useQueries, useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoRow from "./TodoRow";

const TodoHome = () => {
    const {data,isLoading,refetch} = useQuery("todos",()=> fetch("http://localhost:5000/todo").then(res=> res.json()))
    
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:5000/todo", {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => toast.success("Todo added Succesfully"));
    reset();
  };
  if(isLoading){
    return <h1>Loading....</h1>
  }
  refetch()
  return (
    <div className="w-full shadow-xl md:w-2/4 mx-auto px-6 md:px-0 bg-base-100 p-5 rounded-xl overflow-y-auto">
      <div>
        <h1 className="text-4xl my-5 font-bold text-center text-white">
          Todo-App
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex justify-center items-center gap-2"
        >
          <div>
            <textarea
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

            {errors?.todo?.type === "required" && (
              <label class="label mt-0">
                {" "}
                <span class="label-text-alt text-error mt-0">
                  {errors.todo.message}
                </span>{" "}
              </label>
            )}
          </div>

          <button className="btn btn-info">Add Todo</button>
        </form>
        <hr className="my-5 md:mx-5 " />
        <div class="overflow-x-auto ">
          <table class="table w-full ">
            <thead>
              <tr>
                <th>No</th>
                <th>Todo</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {
                    data.map((todo,index)=>  <TodoRow key={todo._id} todo={todo} refetch={refetch} index={index} />)
                 
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoHome;
