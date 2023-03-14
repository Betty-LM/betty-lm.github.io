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
        // console.log(letterFirstName)
        

    }

}


// Lancement du module au chargement de la page
document.addEventListener('DOMContentLoaded', generateManager.init);