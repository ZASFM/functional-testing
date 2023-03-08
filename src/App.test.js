import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import { todos } from './makeTodos';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

//this is the only case im ont mocking any values from useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom')
}))

describe('<App/>', () => {

  test('renders learn react link', async () => {
    render(<App />);
    const linkElement = screen.getByText(/Todo app/i);
    expect(linkElement).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText(/Fetching todos/i));
  });

  test('renders app and can click on it', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.queryByText(/Fetching todos/i));
    todos.slice(0, 15).forEach(todo => {
      expect(screen.getAllByText(todo.title)).toBeInTheDocument();
    });
    const { id, title, userId, completed } = todos[0];
    axios.get.mockImplementationOnce(() => {
      Promise.resolve({ data: { id, title, userId, completed } });
    });
    userEvent.click(screen.getByTestId(String(id)));
    await waitForElementToBeRemoved(() => screen.queryAllByAltText(`Fetching todo item ${String(id)}`));

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(`Added by: ${id}`)).toBeInTheDocument();
    switch (completed) {
      case true:
        // eslint-disable-next-line jest/no-conditional-expect
        expect(screen.getByText(/This item is completed/)).toBeInTheDocument();
        break;
      case false:
        // eslint-disable-next-line jest/no-conditional-expect
        expect(screen.getByText(/This item is yet to be completed/)).toBeInTheDocument();
        break;
      default:
        throw new Error('Unexpected case');
    }
  });

})
