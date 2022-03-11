// https://dev.to/karankumarjs/creating-todo-list-using-vanilla-javascript-2l7l

// Variables
const container = document.querySelector('.container');
const newTaskInput = document.getElementById('new_task_input')
const taskform = document.getElementById('new_task_form');
const tasksList = document.getElementById('tasksList');
const taskBtns = document.querySelectorAll('.task_check_btn');

// Do this when we submit the form
taskform.addEventListener('submit', function (e) {

    e.preventDefault();
    const newtaskInputValue = taskform.elements.new_task_input;

    addTask(newtaskInputValue.value);

    // Reset input value to empty
    newtaskInputValue.value = '';
    container.classList.remove('task_list_empty');

})

// To  add task in List
function addTask(newTask) {

    // Create li element and set its class
    const newTaskItem = document.createElement('li');
    newTaskItem.setAttribute('class', 'task_item');

    // Create checkbox  element and set its type and  class 

    const newCheckBtn = document.createElement('div');
    newCheckBtn.setAttribute('class', 'task_check_btn')

    // Create span  element and set its class and add new task input
    const newTaskBio = document.createElement('span');
    newTaskBio.setAttribute('class', 'task_bio')
    // Put value of input in it
    newTaskBio.innerText = newTask; // putting value of input in the li

    // append (insert) li tag in Ul
    tasksList.appendChild(newTaskItem)
    // append (insert) checkbox in li
    newTaskItem.append(newCheckBtn , newTaskBio)

    // Run this function when task is completed or checkbox is checked
    onTaskComplete(newCheckBtn)

}

// To remove the completed task
function onTaskComplete(btns) {

    btns.addEventListener('click', function (e) {

        const parent = e.target.parentElement;
        parent.classList.add('task-completed'); // To slide out the task to the right
        // Now we delete that tast which we have slided out
        setTimeout(() => {
            // Removing Parent Element of checkobx which is Li in 0.5 s
            parent.remove();
        }, 400);


        if (tasksList.childNodes.length == 1) {
            setTimeout(() => {
                container.classList.add('task_list_empty')

            }, 800);
        }

    })
}
