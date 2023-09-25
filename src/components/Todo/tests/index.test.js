import { render, screen, within } from "@testing-library/react";
import { Todo } from "../index";
import userEvent from "@testing-library/user-event";

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
    isEditing: false,
    completed: true
  },
  {
    id: "3",
    content: "buy a coffee",
    isEditing: false,
    completed: false
  }
];

describe("Todos application", () => {
  it("renders the title", () => {
    render(<Todo />);

    expect(screen.getByText("todos")).toBeInTheDocument();
  });

  it("adds item to the list", () => {
    render(<Todo />);

    const input = screen.getByTestId("todo-input");
    userEvent.type(input, "finish wall window");
    userEvent.type(input, "{enter}");
    expect(screen.getByText("finish wall window")).toBeInTheDocument();
  });

  it("completes an item when clicked", () => {
    render(<Todo />);

    const input = screen.getByTestId("todo-input");
    userEvent.type(input, "buy some milk");
    userEvent.type(input, "{enter}");

    const item = screen.getByText("buy some milk");
    userEvent.click(item);
    expect(item).toHaveAttribute("data-completed", "true");
  });

  it("deletes an item when the button is clicked", () => {
    render(<Todo />);

    const input = screen.getByTestId("todo-input");
    userEvent.type(input, "buy some milk");
    userEvent.type(input, "{enter}");

    const item = screen.getByText("buy some milk");
    expect(item).toBeInTheDocument();

    const deleteButton = screen.getByTestId("delete-button");
    userEvent.click(deleteButton);
    expect(item).not.toBeInTheDocument();
  });

  it("renders a list of default items", () => {
    render(<Todo items={items} />);
    const item1 = screen.getByText("buy some milk");
    expect(item1).toBeInTheDocument();
    const item2 = screen.getByText("learn react");
    expect(item2).toBeInTheDocument();
    const item3 = screen.getByText("buy a coffee");
    expect(item3).toBeInTheDocument();
  });

  describe("filters todos", () => {
    it("renders different groups of items", () => {
      render(<Todo items={items} />);
      const todoItems = screen.getAllByTestId("todo-item");
      expect(todoItems.length).toEqual(items.length);

      const completedTab = screen.getByTestId("todo-completed");
      userEvent.click(completedTab);

      const completedItems = screen.getAllByTestId("todo-item");
      expect(completedItems.length).toEqual(1);
      expect(screen.getByText("learn react")).toBeInTheDocument();
    });

    it("switches tabs", () => {
      render(<Todo items={items} />);
      const todoItems = screen.getAllByTestId("todo-item");
      expect(todoItems.length).toEqual(items.length);

      const completedTab = screen.getByTestId("todo-completed");
      userEvent.click(completedTab);

      const completedItems = screen.getAllByTestId("todo-item");
      expect(completedItems.length).toEqual(1);
      expect(screen.getByText("learn react")).toBeInTheDocument();

      const totalTab = screen.getByTestId("todo-total");
      userEvent.click(totalTab);

      const totalItems = screen.getAllByTestId("todo-item");
      expect(totalItems.length).toEqual(items.length);
      const item1 = screen.getByText("buy some milk");
      expect(item1).toBeInTheDocument();
      const item2 = screen.getByText("learn react");
      expect(item2).toBeInTheDocument();
      const item3 = screen.getByText("buy a coffee");
      expect(item3).toBeInTheDocument();
    });

    it("renders active tab", () => {
      render(<Todo items={items} />);
      const todoItems = screen.getAllByTestId("todo-item");
      expect(todoItems.length).toEqual(items.length);

      const activeTab = screen.getByTestId("todo-active");
      userEvent.click(activeTab);

      const activeItems = screen.getAllByTestId("todo-item");
      expect(activeItems.length).toEqual(2);
      const item1 = screen.getByText("buy some milk");
      expect(item1).toBeInTheDocument();
      const item3 = screen.getByText("buy a coffee");
      expect(item3).toBeInTheDocument();
    });
  });

  describe("aggregations", () => {
    it("show summary information", () => {
      render(<Todo items={items} />);

      const activeTab = screen.getByTestId("todo-active");
      userEvent.click(activeTab);
      const activeItems = screen.getAllByTestId("todo-item");
      expect(activeItems.length).toEqual(2);
      expect(within(activeTab).getByText("Active 2")).toBeInTheDocument();

      const totalTab = screen.getByTestId("todo-total");
      userEvent.click(totalTab);
      const totalTabItems = screen.getAllByTestId("todo-item");
      expect(totalTabItems.length).toEqual(3);
      expect(within(totalTab).getByText("Total 3")).toBeInTheDocument();

      const completedTab = screen.getByTestId("todo-completed");
      userEvent.click(completedTab);
      const completedTabItems = screen.getAllByTestId("todo-item");
      expect(completedTabItems.length).toEqual(1);
      expect(within(completedTab).getByText("Completed 1")).toBeInTheDocument();
    });
  });

  describe("Search", () => {
    it("searches by keyword", () => {
      render(<Todo items={items} />);
      const todoItems = screen.getAllByTestId("todo-item");
      expect(todoItems.length).toEqual(items.length);

      const searchInput = screen.getByTestId("search-input");
      userEvent.type(searchInput, "buy");

      const searchItems = screen.getAllByTestId("todo-item");
      expect(searchItems.length).toEqual(2);
    });
  });

  describe("Edit", () => {
    it("renders edit buttons", () => {
      render(<Todo items={items} />);
      const todoItemsEditButtons = screen.getAllByTestId("toggle-edit-button");
      expect(todoItemsEditButtons.length).toEqual(items.length);
    });

    it("it replaces text with input and edit btn with done btn on click", () => {
      render(<Todo items={items} />);
      const firstEditButton = screen.getAllByTestId("toggle-edit-button")[0];
      userEvent.click(firstEditButton);

      const editInputs = screen.getAllByTestId("todo-edit-input");
      expect(editInputs.length).toEqual(1);
      const doneButtons = screen.getAllByText("Done");
      expect(doneButtons.length).toEqual(1);
    });
  });
});
