export const CategoryButton = ({ title, type, number, switchCategory }) => (
  <button data-testid={`todo-${type}`} onClick={() => switchCategory(type)}>
    {title} {number}
  </button>
);
