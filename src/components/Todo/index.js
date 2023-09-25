import { TodoInput } from "components/inputs/TodoInput";
import { SearchInput } from "components/inputs/SearchInput";
import { TodoList } from "./TodoList";
import { Aggregation } from "./Aggregation";
import { useTodos } from "hooks/useTodos";

import styles from "./index.module.css";

export const Todo = ({ items }) => {
  const {
    displayTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    toggleEdit,
    changeTodo,
    switchCategory,
    aggregation,
    search
  } = useTodos(items);

  return (
    <div className={styles.todo_container}>
      <h1>todos</h1>
      <TodoInput onItemAdded={addTodo} />
      <Aggregation aggregation={aggregation} switchCategory={switchCategory} />
      <TodoList
        todos={displayTodos}
        onToggleItem={toggleTodo}
        onDeleteItem={deleteTodo}
        onToggleEditItem={toggleEdit}
        onChangeItem={changeTodo}
      />
      <SearchInput performSearch={search} />
    </div>
  );
};
