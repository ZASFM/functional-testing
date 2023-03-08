import { useState, useEffect } from "react";
import { useAppContext } from './AppContext';
import axios from "axios";
import { Link } from "react-router-dom";

const TodoList = () => {
   const [loading, setLoading] = useState(true);
   const { appData, appDispatch } = useAppContext();

   useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/todos').then(resp => {
         const { data } = resp;
         appDispatch({ type: 'LOAD_TODOLIST', todoList: data });
         setLoading(false);
      })
   }, [appData, appDispatch])

   return (
      <div>
         {loading ? (
            <p>Fetching todos</p>
         ) : (
            <ul>
               {appData.todoList.slice(0, 15).map(item => {
                  const { id, title } = item;
                  return (
                     <li key={id}>
                        <Link to={`/item/${id}`} data-testid={id}>
                           {title}
                        </Link>
                     </li>
                  )
               })}
            </ul>
         )}

      </div>
   )
}

export default TodoList;