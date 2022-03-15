// Variables
const container = document.querySelector('.todo-vide');
const nouveau_todo = document.querySelector('#nouveau_todo');
const form = document.querySelector('#form_todo');
const todo_liste = document.querySelector('#liste_todo');

// Extraction du texte de la todo au clic du bouton "créer"
form.addEventListener('submit', function (e) {

    e.preventDefault();
    const nouveau_todo_valeur = form.elements.nouveau_todo;
    ajout_todo(nouveau_todo_valeur.value);

    localStorage.setItem('todo', nouveau_todo_valeur.value);

    // Remise à vide du champ input
    nouveau_todo_valeur.value = '';
})

// Ajout d'une todo sur le DOM
function ajout_todo(todo_contenu) {
    const todo_stored_value = localStorage.getItem('todo');

    // Supprimer le texte d'entrée "vous n'avez aucune tâche en cours!"
    container.classList.add('invisible');

    // Créer les balises HTML qui permettront la publication sur le DOM de la todo nouvellement créée.

    // Créer une balise <li> qui accueillera le texte et ajout de la classe CSS pour le styliser
    const nouveau_todo_li = document.createElement('li');
    nouveau_todo_li.setAttribute('class', 'todo');

    // Créer une balise div pour permettre de supprimer la todo 
    const nouveau_todo_btn_complet = document.createElement('div');
    nouveau_todo_btn_complet.setAttribute('class', 'todo-fini-btn')

    // Créer une balise span pour le texte de la todo
    const nouveau_todo_texte = document.createElement('span');
    nouveau_todo_texte.setAttribute('class', 'todo-texte');
    nouveau_todo_texte.innerText = todo_contenu;

    // Maintenant que les éléments sont créés, il faut les publier sur le DOM dans la balise <ul id="liste-todo"> créée à cet effet.

    // Ajout de la balise <li> dans le <ul>
    todo_liste.appendChild(nouveau_todo_li);
    // Ajout de la balise <div> et <span> dans le <li>
    nouveau_todo_li.append(nouveau_todo_btn_complet, nouveau_todo_texte);

    // Déclencher la fonction de suppression de la todo lorsqu'elle est terminée et que le bouton a été cliqué.
    supprimer_todo(nouveau_todo_btn_complet)

}

// Suppression d'une todo
function supprimer_todo(todo_btns) {

    // Créer un événement qui se déclenche au clic sur le bouton de la todo
    todo_btns.addEventListener('click', function (e) {

        const todo_li_clic = e.target.parentElement;
        console.log(todo_li_clic);

        // Ajout de la classe CSS qui ajoute un effet de transition lorsque la balise <li> disparaît du DOM
        todo_li_clic.classList.add('todo-fini'); 

        // Suppression de la todo du DOM avec un délai de 400ms pour adoucir 
        setTimeout(() => {
            todo_li_clic.remove();
        }, 400);

        // Si aucune todo, rendre visible le texte "vous n'avez aucune tâche en cours!"
        if (todo_liste.childNodes.length == 1) {
            setTimeout(() => {
                container.classList.remove('invisible');
            }, 800);
        }
    })
}
