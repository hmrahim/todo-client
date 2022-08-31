import logo from "./logo.svg";
import "./App.css";
import TodoHome from "./Components/TodoHome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes,Route} from "react-router-dom"
import EditTodo from "./Components/EditTodo";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen px-6 md:px-0 bg-primary">
      
      <Routes>
        <Route path="/" element={<TodoHome />}/>
        <Route path="/edit/:id" element={<EditTodo/>}/>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
