//seletores
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//eventos
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//funções
function addTodo(event){
    
    event.preventDefault();
    
    //todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //cria lista
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //saveLocal
    saveLocalTodos(todoInput.value);

    //botão de feito
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-button');
    todoDiv.appendChild(completedButton);
    
    //botão de delete
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);

    //append à lista
    todoList.appendChild(todoDiv)

    //limpa o input
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //delete
    if(item.classList[0] === 'delete-button'){
        const todo = item.parentElement;
        
        //animação
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        
    }

    //checked
    if(item.classList[0] === "completed-button"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "done":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            case "not-done":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; 
                }
                else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        //todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //cria lista
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //saveLocal
    

    //botão de feito
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-button');
    todoDiv.appendChild(completedButton);
    
    //botão de delete
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);

    //append à lista
    todoList.appendChild(todoDiv)
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}