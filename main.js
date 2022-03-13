// Variables
const container = document.querySelector('.todo-vide');
const nouveau_todo = document.querySelector('#nouveau_todo');
const form = document.querySelector('#form_todo');
const todo_liste = document.querySelector('#liste_todo');

// Do this when we submit the form
form.addEventListener('submit', function (e) {

    e.preventDefault();
    const nouveau_todo_valeur = form.elements.nouveau_todo;
    ajout_todo(nouveau_todo_valeur.value);

    // Reset input value to empty
    nouveau_todo_valeur.value = '';
})

// To  add task in List
function ajout_todo(todo_contenu) {

    container.classList.add('invisible');
    // Create li element and set its class
    const nouveau_todo_conteneur = document.createElement('li');
    nouveau_todo_conteneur.setAttribute('class', 'todo');

    // Create checkbox  element and set its type and  class 

    const nouveau_todo_btn_complet = document.createElement('div');
    nouveau_todo_btn_complet.setAttribute('class', 'todo-fini-btn')

    // Create span  element and set its class and add new task input
    const nouveau_todo_texte = document.createElement('span');
    nouveau_todo_texte.setAttribute('class', 'todo-texte')
    // Put value of input in it
    nouveau_todo_texte.innerText = todo_contenu; // putting value of input in the li

    // append (insert) li tag in Ul
    todo_liste.appendChild(nouveau_todo_conteneur);
    // append (insert) checkbox in li
    nouveau_todo_conteneur.append(nouveau_todo_btn_complet, nouveau_todo_texte);

    // Run this function when task is completed or checkbox is checked
    supprimer_todo(nouveau_todo_btn_complet)

}

// To remove the completed task
function supprimer_todo(todo_btns) {

    todo_btns.addEventListener('click', function (e) {

        const parent = e.target.parentElement;
        parent.classList.add('todo-fini'); // To slide out the task to the right
        // Now we delete that tast which we have slided out
        setTimeout(() => {
            // Removing Parent Element of checkobx which is Li in 0.5 s
            parent.remove();
        }, 400);

        if (todo_liste.childNodes.length == 1) {
            setTimeout(() => {
                container.classList.remove('invisible');
            }, 800);
        }
    })
}
