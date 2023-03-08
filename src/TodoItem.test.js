import { screen, render, waitForElementToBeRemoved } from "@testing-library/react";
import TodoItem from "./TodoItem";
import axios from "axios";
import { useParams, MemoryRouter } from "react-router-dom";

describe('<TodoItem/>', () => {

   test('can tell mocked from unmocked values', () => {
      expect(jest.isMockFunction(useParams)).toBe(true);
      expect(jest.isMockFunction(MemoryRouter)).toBe(false);
   })

   test('render a not completed item correctly', async () => {
      useParams.mockReturnValue({ id: 1 });
      render(<TodoItem />);
      await waitForElementToBeRemoved(() => screen.queryByText(/Fetching todo item 1/i));

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/todo item 1/)).toBeInTheDocument();
      expect(screen.getByText(/Added by: 1/)).toBeInTheDocument();
      expect(screen.getByText(/This item is yet to be completed/)).toBeInTheDocument();
   })

   test('render a completed item correctly', async () => {
      useParams.mockReturnValue({ id: 2 });
      render(<TodoItem />);
      await waitForElementToBeRemoved(() => screen.queryByText(/Fetching todo item 1/i));

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/todo item 2/)).toBeInTheDocument();
      expect(screen.getByText(/Added by: 2/)).toBeInTheDocument();
      expect(screen.getByText(/This item has been completed/)).toBeInTheDocument();
   })
})