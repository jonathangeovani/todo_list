const input = document.querySelector('#task_input');
const form = document.querySelector('#task_form');
const remove_button = document.querySelector('#remove_btn');
const todo_list = document.querySelector('#todo_list');

const allTasks = loadAllTasks();
allTasks.forEach(addListItem);

form.addEventListener('submit', event => {
    event.preventDefault();

    if (!input.value) {
        return false;
    }

    const task = {
        title: input.value,
        checked: false
    }

    allTasks.push(task);
    saveAllTasks();
    addListItem(task);

    input.value = '';

});

remove_button.addEventListener('click', () => {
    
    if (confirm('Please confirm to clear all items.')) {
        const items = document.querySelectorAll('.list-item');
        items.forEach(item => {
            item.parentElement.parentElement.remove();
        });
        
        localStorage.removeItem('TASKS');
    }
});

function addListItem(newTask) {
    const new_item = document.createElement('li');
    const item_label = document.createElement('label');
    const item_checkbox = document.createElement('input');
    const custom_checkbox = document.createElement('span')
    item_checkbox.type = 'checkbox';
    custom_checkbox.className = 'checkmark';
    item_checkbox.checked = newTask.checked;
    item_checkbox.addEventListener('change', () => {
        newTask.checked = item_checkbox.checked;
        saveAllTasks();
    });

    item_label.append(item_checkbox, custom_checkbox, newTask.title);
    new_item.append(item_label);
    todo_list.append(new_item);
}

function saveAllTasks() {
    localStorage.setItem('TASKS', JSON.stringify(allTasks));
}

function loadAllTasks() {
    const storedTasks = localStorage.getItem('TASKS');
    if (storedTasks == null) return [];
    return JSON.parse(storedTasks);
}