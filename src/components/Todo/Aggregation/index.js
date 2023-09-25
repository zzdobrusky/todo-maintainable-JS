import { CategoryButton } from "components/buttons/CategoryButton";
import { CATEGORIES } from "types";

import styles from "./index.module.css";

export const Aggregation = ({ aggregation, switchCategory }) => (
  <div className={styles.todo_aggregation}>
    <CategoryButton
      title="Total"
      type={CATEGORIES.TOTAL}
      number={aggregation.total}
      switchCategory={switchCategory}
    />
    <CategoryButton
      title="Active"
      type={CATEGORIES.ACTIVE}
      number={aggregation.active}
      switchCategory={switchCategory}
    />
    <CategoryButton
      title="Completed"
      type={CATEGORIES.COMPLETED}
      number={aggregation.completed}
      switchCategory={switchCategory}
    />
  </div>
);
