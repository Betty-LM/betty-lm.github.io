// Déclaration du module du générateur de nom

const generateManager = {

    // Initialisation
    init: function () {
        console.log("C'est parti!");

        generateManager.addEvents();
    },


    // Méthode qui attache des écouteurs d'évènements au submit des formulaires
    addEvents : function() {
        // Pour le formulaire de choix
        const choiceForm = document.querySelector('.choice-form');
        
        // On lui attache les écouteurs au submit
        choiceForm.addEventListener('submit', generateManager.handleSubmitChoice);

        // Pour le formulaire aléatoire
        const randomForm = document.addEventListener('submit', generateManager.handleSubmitRandom)
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

    // ********************************************************************
    //              Méthodes relatives aux données reçues
    // ********************************************************************

    findNewName : function (letterFirstName, letterLastName)
    {
        // On récupère les lettres reçues de l'utilisateur et on les fait correspondre à une ligne du tableau des syllabes
        const firstSyllabe = syllabe[letterFirstName];

        const nextSyllabe = syllabe[letterLastName];

        const newName = firstSyllabe + nextSyllabe ;

        console.log(firstLetter);

        // On met la premiere lettre en majuscule
       
        console.log("Ton nouveau nom de pokémon est " + newName);
    },

    findType : function(month) 
    {
        // On récupère le mois envoyé en paramètre et on le fait correspondre à unb type du tableau type
        const yourType = type[month];

        return yourType ;
        // console.log("Ton pokémon est de type " + yourType)
    }
}


// Lancement du module au chargement de la page
document.addEventListener('DOMContentLoaded', generateManager.init);