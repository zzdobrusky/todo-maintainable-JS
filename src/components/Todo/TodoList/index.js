import { TodoType } from "types";
import { EditTodoInput } from "components/inputs/EditTodoInput";

import styles from "./index.module.css";

export const TodoList = ({
  todos,
  onToggleItem,
  onDeleteItem,
  onToggleEditItem,
  onChangeItem
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.todo_item} data-testid="todo-item">
          <EditTodoInput
            todo={todo}
            onChangeItem={onChangeItem}
            onEnterKey={onToggleEditItem}
            onToggleItem={onToggleItem}
            onToggleEditItem={onToggleEditItem}
          />

          <div className={styles.todo_btn}>
            <button
              data-testid="delete-button"
              onClick={() => onDeleteItem(todo)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
