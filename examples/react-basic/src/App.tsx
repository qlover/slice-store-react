import { SliceStore } from '@qlover/slice-store';
import { useSliceStore } from '@qlover/slice-store-react';
import { useState } from 'react';
import './App.css';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
};

class TodoStore extends SliceStore<TodoState> {
  constructor() {
    super(() => ({ todos: [], filter: 'all' }));
  }

  addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    this.emit({ ...this.state, todos: [...this.state.todos, newTodo] });
  };

  toggleTodo = (id: number) => {
    const updatedTodos = this.state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.emit({ ...this.state, todos: updatedTodos });
  };

  setFilter = (filter: 'all' | 'active' | 'completed') => {
    this.emit({ ...this.state, filter });
  };
}

const todoStore = new TodoStore();

// 使用选择器获取过滤后的 todos
function useFilteredTodos() {
  return useSliceStore(todoStore, state => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed);
      case 'completed':
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  });
}

function TodoList() {
  const filteredTodos = useFilteredTodos();

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li
          key={todo.id}
          onClick={() => todoStore.toggleTodo(todo.id)}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

function TodoInput() {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      todoStore.addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

function FilterButtons() {
  const { filter } = useSliceStore(todoStore);

  return (
    <div>
      <button onClick={() => todoStore.setFilter('all')} disabled={filter === 'all'}>All</button>
      <button onClick={() => todoStore.setFilter('active')} disabled={filter === 'active'}>Active</button>
      <button onClick={() => todoStore.setFilter('completed')} disabled={filter === 'completed'}>Completed</button>
    </div>
  );
}

// 新增: 使用选择器显示未完成的任务数量
function ActiveTodoCount() {
  const activeCount = useSliceStore(todoStore, state => state.todos.filter(todo => !todo.completed).length);
  return <div>Active todos: {activeCount}</div>;
}

// 新增: 使用选择器显示已完成的任务数量
function CompletedTodoCount() {
  const completedCount = useSliceStore(todoStore, state => state.todos.filter(todo => todo.completed).length);
  return <div>Completed todos: {completedCount}</div>;
}

function App() {
  return (
    <div className="App">
      <h1>Todo App with Slice Store</h1>
      <TodoInput />
      <TodoList />
      <FilterButtons />
      <ActiveTodoCount />
      <CompletedTodoCount />
    </div>
  );
}

export default App;
