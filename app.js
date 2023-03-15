// Déclaration du module du générateur de nom

const generateManager = {

    // Initialisation
    init: function () {
        console.log("C'est parti!");

        generateManager.addEvents();
    },


    // Méthode qui attache des écouteurs d'évènements au submit des formulaires/ou clics des boutons
    addEvents : function() {
        // Pour le formulaire de choix
        const choiceForm = document.querySelector('.choice-form');
        
        // On lui attache les écouteurs au submit
        choiceForm.addEventListener('submit', generateManager.handleSubmitChoice);

        // Pour le formulaire aléatoire
        const randomForm = document.querySelector('.random-form');
        // On lui attache les écouteurs au submit
        randomForm.addEventListener('submit', generateManager.handleSubmitRandom);

        // Pour le bouton de retour de 'error'
        const backButton = document.querySelector('.back');
        // On lui attache l'écouteur d'évènements au clic
        backButton.addEventListener('click', generateManager.handleClickBack)
    } ,


    // ********************************************************************
    //              Handlers
    // ********************************************************************
    
    /**
     * Méthode qui s'exécute au submit du formulaire de sélection
     * @param {*} event 
     */
    handleSubmitChoice : function (event) {
        // On bloque l'envoi des données pour pouvoir les interpréter
        event.preventDefault();

        // On récupère la valeur des select
        const letterFirstName  = document.querySelector('#letter-firstname').value;

        
        console.log(letterFirstName)
        
        const letterLastName = document.querySelector('#letter-lastname').value;
        console.log(letterLastName);

        const month = document.querySelector('#month').value;
        console.log(month);

        // On appelle la méthode ?? qui va faire correspondre une lettre à une syllabe et on lui passe en arguments les lettres
        generateManager.findNewName(letterFirstName, letterLastName);

        // On appele la fonction qui fait correspondre le mois à un type
        generateManager.findType(month);
    },

    handleSubmitRandom:function(event) 
    {
        // On bloque l'envoi des données pour pouvoir les interpréter
        event.preventDefault();

        // On crée aléatoirement un nouveau nom de poké en demandant un nombre d'index aléatoire entre 0 et 25 (=le nb d'entrées de mon tableau)

            const newRandomName = syllabeRandom[Math.floor(Math.random() *25)] + syllabeRandom[Math.floor(Math.random() * 25)] ;

            // console.log(newRandomName)

            const newRandomType = typeRandom[Math.floor(Math.random() * 11)];

            // console.log(newRandomType)
            return newRandomName, newRandomType;
    },


    handleClickBack : function() {
        // Au clic, on fait disparaitre la div error
        const errorElement = document.querySelector('.error');
        errorElement.setAttribute('hidden','');
    },

    // ********************************************************************
    //              Méthodes relatives aux données reçues
    // ********************************************************************

    findNewName : function (letterFirstName, letterLastName)
    {
        // On récupère les lettres reçues de l'utilisateur et on les fait correspondre à une ligne du tableau des syllabes
        // On vérifie que le select est renseigné
        if(letterFirstName.length != 1) {

            // On récupère la div de message d'erreur et on l'affiche
            const errorElement = document.querySelector('.error');
            // On la place en haut du DOM
            
            errorElement.removeAttribute('hidden');
            // console.log("Zut, tu n'as pas choisi de lettre!")
        }

        const firstSyllabe = syllabe[letterFirstName];

        const nextSyllabe = syllabe[letterLastName];

        const newName = firstSyllabe + nextSyllabe ;

        // On met la premiere lettre en majuscule
       
        console.log("Ton nouveau nom de pokémon est " + newName);

        return newName;
    },

    findType : function(month) 
    {
        // On récupère le mois envoyé en paramètre et on le fait correspondre à unb type du tableau type
        const yourType = type[month];

        console.log("Ton pokémon est de type " + yourType)

        return yourType ;
       
    }


}


// Lancement du module au chargement de la page
document.addEventListener('DOMContentLoaded', generateManager.init);