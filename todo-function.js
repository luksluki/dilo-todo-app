const getTodos = function () {
    const todosJson = localStorage.getItem('todos')
    const todos = (todosJson !== null) ?
        JSON.parse(todosJson) : []

    return todos;
}

// save todos
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// render todos
const renderTodos = function (todos, filters) {
    const filterTodos = todos.filter(function (todo) {
        const searchText = todo.text.toLocaleLowerCase().includes(filters.searchText.toLocaleLowerCase())
        const hideCompleted = !filters.hideCompleted || !todo.completed

        return searchText && hideCompleted
    })

    const incompletedTodos = filterTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = '';
    document.querySelector('#todos').appendChild(summaryTodo(incompletedTodos))

    filterTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodo(todo))
    })
}
// generate todo to DOM
const generateTodo = function (todo) {
    const li = document.createElement('li');
    const label = document.createElement('label')

    const check = document.createElement('input')
    check.checked = todo.completed
    check.value = todo.text
    check.type = 'checkbox'

    span = document.createElement('span')
    span.textContent = todo.text

    li.appendChild(label)
    label.appendChild(check)
    label.appendChild(span)
    return li
}
const changeCompleted = function (todos, found) {
    todos.forEach(function (part, index) {
        if (part.text == found) {
            if (part.completed == true) {
                this[index].completed = false;
            } else {
                this[index].completed = true;
            }
        }
    }, todos);
    saveTodos(todos)
}

// summary todo
const summaryTodo = function (incompletedTodos) {
    const summary = document.createElement('h5')
    summary.textContent = `${incompletedTodos.length} Todo Left`

    return summary
}