import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import axios from "axios";
import TodoList from "./TodoList";
import { todos } from './makeTodos';

test('should render todos after loading', async () => {
   render(<TodoList />);
   await waitForElementToBeRemoved(() => screen.queryByText(/Fetching todos/i));

   expect(axios.get).toHaveBeenCalledTimes(1);
   //making sure todos are present
   todos.slice(0, 15).forEach(todo => {
      expect(screen.getByText(todo.title)).toBeInTheDocument();
   })
})