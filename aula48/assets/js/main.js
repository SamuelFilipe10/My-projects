const input = document.querySelector('.addList');
const btn = document.querySelector('.btn');
const tasks = document.querySelector('.tasks');

function createLi() {
   const li = document.createElement('li');
   return li; 
}

function clearInput() {
    input.value = '';
    input.focus();
}

function createTask(text) {
    const li = createLi();
    li.innerText = text;
    tasks.appendChild(li);
    clearInput();
    createClearButton(li);
    saveTasks();
}

function createClearButton(li) {
    li.innerText += ' ';
    const clearButton = document.createElement('button');

    li.appendChild(clearButton);
    
    clearButton.innerText = 'Delete';
    
    clearButton.setAttribute('class', 'delete');
    clearButton.setAttribute('title', 'Delete the task');
}

input.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        createTask(input.value);  
    }
});

btn.addEventListener('click', function() {
    if(!input.value) return;
    createTask(input.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if(el.classList.contains('delete')) {
        el.parentElement.remove();
        saveTasks();
    }
})

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const tasksArray = [];

    for (let task of liTasks) {
        let textTask = task.innerText;
        textTask = textTask.replace('Delete', '').trim();
        tasksArray.push(textTask);
    }

    const tasksJson = JSON.stringify(tasksArray);
    localStorage.setItem('tasks', tasksJson);

    console.log(tasksArray);
}

function addSaveTasks() {
    const tasks = localStorage.getItem('tasks');
    const arrayTasks = JSON.parse(tasks);

    for(let task of arrayTasks) {
        createTask(task);
    }
}

addSaveTasks();
