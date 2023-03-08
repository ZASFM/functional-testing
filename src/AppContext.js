import { useContext, createContext, useReducer } from "react";

export const AppContext=createContext();

export const AppProvider=({children})=>{
   const reducer=(state,action)=>{
      switch(action.type){
         case 'LOAD_TODOLIST':
            return {...state,todoList:action.todoList}
         case 'LOAD_SINGLE_ITEM':
            return {...state, activeTodoItem:action.todo}
         default:
            return state;
      }
   }

   const [appData,appDispatch]=useReducer(reducer,{
      todoList:[],
      activeTodoItem:{id:0}
   })
   return (
      <AppContext.Provider
         value={{
            appData,
            appDispatch
         }}
      >
         {children}
      </AppContext.Provider>
   )
}

export const useAppContext=()=>{
   return useContext(AppContext);
}