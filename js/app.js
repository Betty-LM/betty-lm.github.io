// Déclaration du module du générateur de nom

const generateManager = {

    // Initialisation
    init: function () {
        console.log("C'est parti!");

        generateManager.addEvents();
    },


    /**
     * Méthode qui initialise la page "d'accueil"
     */
    initGeneratorPage: function () {

        // On remet à zéro la valeur des select
        document.querySelector('#letter-firstname').value = "";

        document.querySelector('#letter-lastname').value = "";

        document.querySelector('#month').value = "";

        // On retire la class hidden au contenair si elle existe
        const contenairEl = document.querySelector('.contenair');
        contenairEl.classList.remove('hidden');

        // On replace la class hidden sur la div de resultats
        const resultElement = document.querySelector('.results');
        resultElement.classList.add('hidden');
    },

    // Méthode qui attache des écouteurs d'évènements au submit des formulaires/ou clics des boutons
    addEvents: function () {
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

        // Pour les boutons de validation
        // Par les lettres choisies
        const validateButton = document.querySelector('.validate');
        // On lui attache un écouteur d'évènement au survol
        validateButton.addEventListener('mouseover', generateManager.handleChangeContent);

        // Par le hasard
        const randomValidateButton = document.querySelector('.randomValidate');
        // On lui attache un écouteur d'évènement au survol
        randomValidateButton.addEventListener('mouseover', generateManager.handleChangeContentRandom);
    },


    // ********************************************************************
    //              Handlers
    // ********************************************************************

    /**
     * Méthode qui s'exécute au submit du formulaire de sélection
     * @param {*} event 
     */
    handleSubmitChoice: function (event) {
        // On bloque l'envoi des données pour pouvoir les interpréter
        event.preventDefault();

        // On récupère la valeur des select
        const letterFirstName = document.querySelector('#letter-firstname').value;


        console.log(letterFirstName)

        const letterLastName = document.querySelector('#letter-lastname').value;
        console.log(letterLastName);

        const month = document.querySelector('#month').value;
        console.log(month);

        // On appelle la méthode findNewName qui va faire correspondre une lettre à une syllabe et on lui passe en arguments les lettres
        generateManager.findNewName(letterFirstName, letterLastName);

        // On appelle la fonction findType qui fait correspondre le mois à un type
        generateManager.findType(month);
    },

    /**
     * Méthode qui s'exécute au submit du formuliare de hasard ; va générer un nom et un type
     * @param {} event 
     */
    handleSubmitRandom: function (event) {
        // On bloque l'envoi des données pour pouvoir les interpréter
        event.preventDefault();

        // On crée aléatoirement un nouveau nom de poké en demandant un nombre d'index aléatoire entre 0 et 26 (=le nb d'entrées de mon tableau)

        const newRandomName = syllabeRandom[Math.floor(Math.random() * 26)] + syllabeRandom[Math.floor(Math.random() * 26)] + syllabeRandom[Math.floor(Math.random() * 25)];

        console.log(newRandomName)

        const newRandomType = typeRandom[Math.floor(Math.random() * 15)];

        console.log(newRandomType)
        generateManager.displayResultName(newRandomName);
        generateManager.displayResultType(newRandomType);
        // return newRandomName, newRandomType;
    },


    /**
     * Méthode qui s'execute au clic sur le(s) bouton(s) de retour
     */
    handleClickBack: function () {
        // Au clic, on fait disparaitre la div error
        const errorElement = document.querySelector('.error');
        errorElement.setAttribute('hidden', '');

        // Ou la div modal-dialog selon ce qui a été cliqué
        const resultDiv = document.querySelector('.modal-dialog');
        resultDiv.setAttribute('hidden', '');
    },

    /**
     * Méthode qui modifie l'aspect du bouton valider du form de lettres choisies au survol
     */
    handleChangeContent: function () {
        // Au survol de l'élemnt on modifie son contenu
        document.querySelector('.validate').textContent = "Go !";

        //    On réinitialise la valeur après quelques instants
        setTimeout(function () {
                document.querySelector('.validate').textContent = "Générer"
            },
            1000)
    },

    /**
     * Méthode qui modifie l'aspect du bouton valider du form hasard au survol
     */
    handleChangeContentRandom: function () {

        // Au survol de l'élement on modifie son contenu
        document.querySelector('.randomValidate').textContent = "Ah tu es joueur :)";

        //    On réinitialise la valeur après quelques instants
        setTimeout(function () {
                document.querySelector('.randomValidate').textContent = "Laisser le hasard décider"
            },
            1000)
    },


    /**
     * Méthode qui s'exécute au clic sur le bouton impression; ouvre la page d'impression
     */
    handleClickPrint: function () {
        // Au clic on ouvre la page d'impression
        window.print();

    },

    /**
     * Méthode qui s'execute au clic du bouton retour sur la page de résultat
     */
    handleBackToHomePage: function () {

        // On appelle la fonction qui affiche la page vierge
        generateManager.initGeneratorPage();
    },

    // ********************************************************************
    //              Méthodes relatives aux données reçues
    // ********************************************************************

    /**
     * Méthode qui génère un nom de pokemon en fonction des lettres sélectionnées par l'utilisateur
     * @param {*} letterFirstName lettre qui correspond à la premiere lettre du prenom sélectionnée
     * @param {*} letterLastName lettre qui correspond à la premiere lettre du nom sélectionnée
     */
    findNewName: function (letterFirstName, letterLastName) {
        // On récupère les lettres reçues de l'utilisateur et on les fait correspondre à une ligne du tableau des syllabes

        const firstSyllabe = syllabe[letterFirstName];

        const nextSyllabe = syllabe[letterLastName];

        const newName = firstSyllabe + nextSyllabe;

        // On appelle la méthode permettant d'afficger le résultat
        generateManager.displayResultName(newName);


        console.log("Ton nouveau nom de pokémon est " + newName);

        // return newName;
    },

    /**
     * Méthode qui fait correspondre un type au mois sélectionné par l'utilisateur
     * @param {*} month Mois de naissance sélectionné par l'utilisateur
     * @returns 
     */
    findType: function (month) {
        // On récupère le mois envoyé en paramètre et on le fait correspondre à unb type du tableau type
        const yourType = type[month];

        console.log("Ton pokémon est de type " + yourType)
        // On appelle la méthode permettant d'afficger le résultat
        generateManager.displayResultType(yourType);

        return yourType;

    },

    /**
     * Méthode qui affiche le résultat du nouveau nom
     * @param {*} name le nom généré suite au choix de lettre ou de hasard
     */
    displayResultName: function (name) {

        // On récupère la div à afficher dans le DOM qui contiendra nos résultats
        const resultElement = document.querySelector('.results');
        console.log(resultElement);

        // On renseigne les champs voulus
        const nameResult = document.querySelector('.results .name');
        console.log(nameResult);

        // const nameUppercase = name[0].toUppercase() + name.substring(1);
        nameResult.innerHTML = "Ton nom de Pokémon est : <strong>" + name + "</strong>";

        // On retire la class hidden de la div results et on l'ajoute au reste
        resultElement.classList.remove('hidden');

        // On récupere l'élément à cacher
        const divToHide = document.querySelector('.contenair');
        divToHide.classList.add('hidden');
        console.log(divToHide)
        // resultElement.classList.add('hidden');
        // On récupère les boutons print et back et on leur attache un écouteur d'évènement
        const printButton = document.querySelector('.print');
        printButton.addEventListener('click', generateManager.handleClickPrint);

        const backHomeButton = document.querySelector('.backToHome');
        backHomeButton.addEventListener('click', generateManager.handleBackToHomePage);

    },

    /**
     * Méthode qui affiche le résultat du nouveau type
     * @param {*} type le type généré suite au choix de lettre ou de hasard
     */
    displayResultType: function (type) {

        // On récupère la div à afficher dans le DOM qui contiendra nos résultats
        const resultElement = document.querySelector('.results');
        console.log(resultElement);

        // On renseigne les champs voulus
        const typeResult = document.querySelector('.results .type');
        console.log(typeResult);

        typeResult.innerHTML = "Ton Pokémon est de type : <strong>" + type + "</strong>";

        // On retire la class hidden de la div results et on l'ajoute au reste
        resultElement.classList.remove('hidden');

        // On récupere les éléments à cacher
        const divToHide = document.querySelector('.contenair');
        divToHide.classList.add('hidden');

        //  resultElement.classList.add('hidden');

    }


}


// Lancement du module au chargement de la page
document.addEventListener('DOMContentLoaded', generateManager.init);