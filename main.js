window.addEventListener('DOMContentLoaded', (event) => {
    const todoForm = document.querySelector('#task-form');
    const todoInput = document.querySelector('#task-input');
    const todoList = document.querySelector('.todo__list');
    const todoCounter = document.querySelector('.footer__counter');
    const clearCompleteTodosButton = document.querySelector('#clear-complete');
    const filterAllButton = document.querySelector('#filter-all');
    const filterActiveButton = document.querySelector('#filter-active');
    const filterCompletedButton = document.querySelector('#filter-completed');
    let activeTodosCount = document.querySelectorAll('.todo__list > :not(.todo__item_completed)').length;
    let todos = document.querySelectorAll('.todo__item');
    let nextId = 1;
    let filter = 'all';

    let todosArr = [];

    function renderList() {
        todoList.innerHTML = '';
        for (let i = 0; i < todosArr.length; i++) {
            const todoItem = document.createElement('li');
            const checkbox = document.createElement('input');
            const deleteButton = document.createElement('button');
            const deleteIcon = document.createElement('img');
            
            function deleteTodo() {
                
                renderList();
                activeTodosCount = document.querySelectorAll('.todo__list > :not(.todo__item_completed)').length;
                todoCounter.textContent = `${activeTodosCount} items left`;
            }

            todoItem.classList.add('todo__item');
            checkbox.type = 'checkbox';
            checkbox.id = `check-${i}`;
            checkbox.name = 'completed';
            deleteButton.classList.add('item__delete-button');
            deleteIcon.src = 'delete.png';
            deleteIcon.alt = 'delete icon';
            deleteIcon.width = '16';
            deleteIcon.height = '16';
            
            todoItem.append(checkbox);
            todoItem.append(todosArr[i].text);
            deleteButton.append(deleteIcon);
            todoItem.append(deleteButton);
    
            deleteButton.addEventListener('click', deleteTodo);
            checkbox.addEventListener('click', () => {
                if (checkbox.checked) {
                    todoItem.isDone = true;
                    todoItem.classList.add('todo__item_completed');
                } else {
                    todoItem.isDone = false;
                    todoItem.classList.remove('todo__item_completed');
                }
            })

            todoList.append(todoItem);
        }

        todoInput.value = '';

        activeTodosCount = document.querySelectorAll('.todo__list > :not(.todo__item_completed)').length;
        todoCounter.textContent = `${activeTodosCount} items left`;
    }

    todoCounter.textContent = `${activeTodosCount} items left`

    function addTask(event) {
        event.preventDefault();
        if(todoInput.value) {
            todosArr.push({
                id: nextId,
                text: todoInput.value,
                isDone: false,
            })
            nextId++
            renderList();
        }
    }

    function clearAllTodos() { 
        todos = document.querySelectorAll('.todo__item');
        todos.forEach(todo => todo.remove());
        activeTodosCount = document.querySelectorAll('.todo__list > :not(.todo__item_completed)').length;
        todoCounter.textContent = `${activeTodosCount} items left`;
    }

    function showAllTodos() {
        if (filter === 'all') return
        document.querySelectorAll('.todo__item').forEach(todo => todo.style.display = 'flex');
        filter = 'all';
    }

    function showActiveTodos() {
        if (filter === 'active') return
        document.querySelectorAll('.todo__item_completed').forEach((todo) => todo.style.display = 'none');
        document.querySelectorAll('.todo__list > :not(.todo__item_completed)').forEach((todo) => todo.style.display = 'flex');
        filter = 'active';
    }

    function showCompletedTodos() {
        if (filter === 'completed') return
        document.querySelectorAll('.todo__item_completed').forEach((todo) => todo.style.display = 'flex');
        document.querySelectorAll('.todo__list > :not(.todo__item_completed)').forEach((todo) => todo.style.display = 'none');
        filter = 'completed';
    }

    todoForm.addEventListener('submit', addTask);
    clearCompleteTodosButton.addEventListener('click', clearAllTodos);
    filterAllButton.addEventListener('click', showAllTodos);
    filterActiveButton.addEventListener('click', showActiveTodos);
    filterCompletedButton.addEventListener('click', showCompletedTodos);
})