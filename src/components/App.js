import { Todo } from "./Todo";

const items = [
  {
    id: "1",
    content: "buy some milk",
    completed: false,
    isEditing: false
  },
  {
    id: "2",
    content: "learn react",
    completed: true,
    isEditing: false
  },
  {
    id: "3",
    content: "call friends",
    completed: false,
    isEditing: false
  }
];

const App = () => (
  <div>
    <Todo items={items} />
  </div>
);

export default App;
