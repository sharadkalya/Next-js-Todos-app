export const getTodos = () => {
    const todos = localStorage.getItem("todos");
    if (todos) {
        return JSON.parse(todos);
    }
    return [];
};

export const getTodoById = (id) => {
    const todos = getTodos();
    return todos.find((todo) => todo.id === id);
};

export const updateTodoById = (id, todo) => {
    const todos = getTodos();
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index] = todo;
    localStorage.setItem("todos", JSON.stringify(todos));
};

export const deleteTodoById = (id) => {
    const todos = getTodos();
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

export const addTodo = (newTodo) => {
    const todos = getTodos();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
};
