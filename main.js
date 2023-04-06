window.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('#todo-form');
  const todoInput = document.querySelector('#todo-input');
  const todoList = document.querySelector('.todo__list');
  const todoCounter = document.querySelector('.footer__counter');
  const filterAllButton = document.querySelector('#filter-all');
  const filterActiveButton = document.querySelector('#filter-active');
  const filterCompletedButton = document.querySelector('#filter-completed');
  const clearTodosButton = document.querySelector('#clear-todos');

  let todos = [
    { id: 0, text: '0', isDone: true },
    { id: 1, text: '1', isDone: false },
    { id: 2, text: '2', isDone: true },
    { id: 3, text: '3', isDone: false },
    { id: 4, text: '4', isDone: false },
    { id: 5, text: '5', isDone: true },
  ];

  let activeButton = document.querySelector('.filter__button_active');
  let activeFilter =
    activeButton === filterAllButton
      ? todos
      : activeButton === filterActiveButton
      ? filterActiveTodos()
      : filterCompletedTodos();

  let filterActiveTodos = () => todos.filter((todo) => todo.isDone === false);
  let filterCompletedTodos = () => todos.filter((todo) => todo.isDone === true);
  let getActiveTodosCount = () => filterActiveTodos().length;

  function renderList(list) {
    todoList.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
      const todoItem = document.createElement('li');
      const checkbox = document.createElement('input');
      const deleteButton = document.createElement('button');
      const deleteIcon = document.createElement('img');

      function deleteTodo() {
        let nextTodos = todos.filter((todo) => todo.id !== list[i].id);
        todos = nextTodos;
        setActiveFilter();
        renderList(activeFilter);
      }

      function toggleIsDone() {
        if (checkbox.checked) {
          list[i].isDone = true;
          todoItem.classList.add('todo__item_completed');
          setActiveFilter();
          renderList(activeFilter);
        } else {
          list[i].isDone = false;
          todoItem.classList.remove('todo__item_completed');
          setActiveFilter();
          renderList(activeFilter);
        }
        showTodoCounter();
      }

      todoItem.classList.add('todo__item');
      if (list[i].isDone) {
        checkbox.checked = true;
        todoItem.classList.add('todo__item_completed');
      }
      checkbox.type = 'checkbox';
      checkbox.id = `check-${i}`;
      checkbox.name = 'completed';
      deleteButton.classList.add('item__delete-button', 'button-base');
      deleteIcon.src = 'delete.png';
      deleteIcon.alt = 'delete icon';
      deleteIcon.width = '16';
      deleteIcon.height = '16';

      todoItem.append(checkbox);
      todoItem.append(list[i].text);
      deleteButton.append(deleteIcon);
      todoItem.append(deleteButton);

      deleteButton.addEventListener('click', deleteTodo);
      checkbox.addEventListener('click', toggleIsDone);

      todoList.append(todoItem);
    }

    todoInput.value = '';
    showTodoCounter();
  }

  function addTodo(event) {
    event.preventDefault();
    if (!todoInput.value.trim()) {
      alert('Input text!');
    }
    if (todoInput.value.trim()) {
      todos.push({
        id: Date.now(),
        text: todoInput.value,
        isDone: false,
      });
      setActiveFilter();
      renderList(activeFilter);
    }
  }

  function clearTodos() {
    todos = [];
    renderList(todos);
  }

  function showTodoCounter() {
    todoCounter.textContent = `${getActiveTodosCount()} items left`;
  }

  function setActiveButton(button) {
    activeButton = button;
  }

  function removeButtonActiveClass(button) {
    button.classList.remove('filter__button_active');
  }

  function setButtonActiveClass(button) {
    button.classList.add('filter__button_active');
  }

  function setActiveFilter() {
    activeFilter =
      activeButton === filterAllButton
        ? todos
        : activeButton === filterActiveButton
        ? filterActiveTodos()
        : filterCompletedTodos();
  }

  function showAllTodos() {
    if (activeButton === filterAllButton) return;
    removeButtonActiveClass(activeButton);
    setActiveButton(filterAllButton);
    setActiveFilter();
    setButtonActiveClass(activeButton);
    renderList(todos);
  }

  function showActiveTodos() {
    if (activeButton === filterActiveButton) return;
    removeButtonActiveClass(activeButton);
    setActiveButton(filterActiveButton);
    setActiveFilter();
    setButtonActiveClass(activeButton);
    renderList(filterActiveTodos());
  }

  function showCompletedTodos() {
    if (activeButton === filterCompletedButton) return;
    removeButtonActiveClass(activeButton);
    setActiveButton(filterCompletedButton);
    setActiveFilter();
    setButtonActiveClass(activeButton);
    renderList(filterCompletedTodos());
  }

  clearTodosButton.addEventListener('click', clearTodos);
  todoForm.addEventListener('submit', addTodo);
  filterAllButton.addEventListener('click', showAllTodos);
  filterActiveButton.addEventListener('click', showActiveTodos);
  filterCompletedButton.addEventListener('click', showCompletedTodos);

  renderList(todos);
});
