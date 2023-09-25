import { useMemo, useState } from "react";
import { CATEGORIES } from "types";

export const useTodos = (items = []) => {
  const [todos, setTodos] = useState(items);
  const [category, switchCategory] = useState(CATEGORIES.TOTAL);
  const [keyword, setKeyword] = useState("");

  const active = useMemo(() => todos.filter((todo) => !todo.completed), [
    todos
  ]);
  const completed = useMemo(() => todos.filter((todo) => todo.completed), [
    todos
  ]);

  const displayTodos = useMemo(() => {
    let filteredTodos = [];
    switch (category) {
      case CATEGORIES.TOTAL:
        filteredTodos = todos;
        break;
      case CATEGORIES.ACTIVE:
        filteredTodos = active;
        break;
      case CATEGORIES.COMPLETED:
        filteredTodos = completed;
        break;
      default:
        filteredTodos = todos;
    }
    return keyword
      ? filteredTodos.filter((todo) => todo.content.includes(keyword))
      : filteredTodos;
  }, [active, completed, category, todos, keyword]);

  const aggregation = useMemo(() => {
    return {
      total: todos.length,
      active: active.length,
      completed: completed.length
    };
  }, [todos.length, active.length, completed.length]);

  const search = (keyword) => {
    setKeyword(keyword);
  };

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const toggleTodo = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const deleteTodo = (todo) => {
    setTodos(todos.filter((item) => item.id !== todo.id));
  };

  const toggleEdit = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, isEditing: !item.isEditing };
        }
        return item;
      })
    );
  };

  const changeTodo = (value, todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, content: value };
        }
        return item;
      })
    );
  };

  return {
    displayTodos,
    addTodo,
    switchCategory,
    toggleTodo,
    deleteTodo,
    toggleEdit,
    changeTodo,
    aggregation,
    search
  };
};
