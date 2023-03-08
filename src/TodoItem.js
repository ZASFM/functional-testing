import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "./AppContext";

const TodoItem = () => {
   const { id } = useParams();
   const [loading, setLoading] = useState(true);
   const {
      appData: { activeTodoItem },
      appDispatch
   } = useAppContext();
   const { userId, title, completed } = activeTodoItem;

   useEffect(() => {
      axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).then(resp => {
         const { data } = resp;
         appDispatch({ type: 'LOAD_SINGLE_TODO', todo: data });
         setLoading(false);
      })
   }, [id, appDispatch])

   return (
      <div className="single-todo-item">
         {loading ? (
            <p>Fetching todo item {id}</p>
         ) : (
            <div>
               <h2 className="todo-title">{title}</h2>
               <h4>Added by: {userId}</h4>
               {completed ? (
                  <p className="completed">This item has been completed</p>
               ) : (
                  <p className="not-completed">This item is yet to be completed</p>
               )}
            </div>
         )}
      </div>
   )
}

export default TodoItem;