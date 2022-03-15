// Variables
const container = document.querySelector('.todo-vide');
const nouveau_todo = document.querySelector('#nouveau_todo');
const form = document.querySelector('#form_todo');
const todo_liste = document.querySelector('#liste_todo');

let tous_les_todos = [];

// Extraction du texte de la todo au clic du bouton "créer"
form.addEventListener('submit', event => {
    
    // prevent the page from reloading when submitting the form
    event.preventDefault();
    ajout_todo(nouveau_todo.value);

    // Remise à vide du champ input
    nouveau_todo.value = '';
})

// Ajout d'une todo sur le DOM
function ajout_todo(todo_texte) {

    // Supprimer le texte d'entrée "vous n'avez aucune tâche en cours!"
    container.classList.add('invisible');

    // Créer un objet qui enregistre les propriétés du nouveau todo
    if(todo_texte !== '') {
        const nouveau_todo = {
            id: Date.now(),
            texte: todo_texte,
            completed: false
        }

        // Ajouter le nouveau todo à la liste des todos
        tous_les_todos.push(nouveau_todo);
        console.log(tous_les_todos);

        update_todos_localStorage(tous_les_todos);
    };
}

function publier_todo_DOM(tous_les_todos) {
    // Si aucune todo, rendre visible le texte "vous n'avez aucune tâche en cours!"
    if (!tous_les_todos.length) {
        setTimeout(() => {
            container.classList.remove('invisible');
        }, 600);
    }

    todo_liste.innerHTML = '';

    tous_les_todos.forEach(todo => {

    // // Créer une balise <li> qui accueillera le texte et ajout de la classe CSS pour le styliser
        const li = document.createElement('li');
        li.setAttribute('class', 'todo');
        li.setAttribute('data-id', todo.id);

    // // Créer une balise div pour permettre de supprimer la todo 
        const nouveau_todo_btn_complet = document.createElement('div');
        nouveau_todo_btn_complet.setAttribute('class', 'todo-fini-btn');

    // // Vérifier si le todo est complété ou non
        if(todo.completed === true) {
            li.classList.add('todo-fini');
        }

    // // Créer une balise span pour le texte de la todo
        const nouveau_todo_texte = document.createElement('span');
        nouveau_todo_texte.setAttribute('class', 'todo-texte');
        nouveau_todo_texte.innerText = todo.texte;

        // Créer le contenu HTML du li
        li.innerHTML = `
            <span class="todo-texte">${todo.texte}</span>
            <svg class="btn-todo-complet" role="button" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        `;

    // // Maintenant que les éléments sont créés, il faut les publier sur le DOM dans la balise <ul id="liste-todo"> créée à cet effet.
        todo_liste.append(li);
    })
}

// Ajouter tous les todos au localStorage
function update_todos_localStorage(tous_les_todos) {
    // conver the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(tous_les_todos));
    // render them to screen
    publier_todo_DOM(tous_les_todos);
}

// Récupère tous les todos stockés dans le localStorage
function get_localStorage() {
    // Création d'une variable de référence pour savoir si elle existe ou non.
    const reference = localStorage.getItem('todos');

    // Si la reference existe alors utiliser le format JSON pour rendre disponible les todos stockées sous forme de tableau (array) et les publier sur le DOM.
    if (reference) {
      tous_les_todos = JSON.parse(reference);
      publier_todo_DOM(tous_les_todos);
    }
}

// Supprimer un todo de la liste de tous les todos, pui mettre à jour le localStorage et enfin publier sur le DOM la liste des todos mise à jour
function supprimer_le_todo(id) {

    // utiliser la méthode "filter" pour filter l'id de la todo qui a été sélectionné
    tous_les_todos = tous_les_todos.filter(todo => {
      // retourner les id des todos qui ne correspondent pas à l'id passé en argument dans la fonction 
      return todo.id != id;
    });
  
    // Appeler la fonction qui va mettre à jour le localStorage
    update_todos_localStorage(tous_les_todos);
  }
  
  // Récupérer tous les todos disponibles dans le localStorage
  get_localStorage();
  
  // Ajouter un event au clic sur la balise <ul> qui contient tous les todos pour écouter tous les clics réalisés soit sur les checkbox - pour la barrer - soit sur le bouton de suppression d'une todo - pour la supprimer.
  todo_liste.addEventListener('click', e => {

    // Vérifie si l'event est sur le bouton de suppression
    if (e.target.classList.contains('btn-todo-complet')) {
      // Récupère l'id disponible dans l'attribut "data-id" 
      supprimer_le_todo(e.target.parentElement.getAttribute('data-id'));
    }
});
