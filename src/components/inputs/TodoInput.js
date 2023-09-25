import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useShortcutKey } from "hooks/useShortcutKey";

import styles from "./shared.module.css";

export const TodoInput = ({ onItemAdded }) => {
  const [content, setContent] = useState("");
  const { inputRef } = useShortcutKey("k");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onItemAdded({ id: uuid(), content, completed: false, isEditing: false });
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      data-testid="todo-input"
      className={styles.todo_input}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Type to add item, enter to confirm..."
    />
  );
};
