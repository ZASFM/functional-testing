import { todos } from '../makeTodos';

export default {
   get: jest.fn().mockImplementation((url) => {
      switch (url) {
         case 'https://jsonplaceholder.typicode.com/todos':
            return Promise.resolve({ data: todos });
         case 'https://jsonplaceholder.typicode.com/todos/1':
            return Promise.resolve({ id: 1, userId: 1, title: 'Todo item 1', completed: false });
         case 'https://jsonplaceholder.typicode.com/todos/2':
            return Promise.resolve({ id: 2, userId: 2, title: 'Todo item 2', completed: true });
         default:
            throw new Error(`Unexpected URL matched ${url}`);
      }
   })
}