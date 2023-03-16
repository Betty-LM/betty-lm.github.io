// Déclaration du module du générateur de nom

const generateManager = {

    // Initialisation
    init: function () {
        console.log("C'est parti!");

        generateManager.addEvents();
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

    handleSubmitRandom: function (event) {
        // On bloque l'envoi des données pour pouvoir les interpréter
        event.preventDefault();

        // On crée aléatoirement un nouveau nom de poké en demandant un nombre d'index aléatoire entre 0 et 25 (=le nb d'entrées de mon tableau)

        const newRandomName = syllabeRandom[Math.floor(Math.random() * 25)] + syllabeRandom[Math.floor(Math.random() * 25)];

        // console.log(newRandomName)

        const newRandomType = typeRandom[Math.floor(Math.random() * 11)];

        // console.log(newRandomType)
        return newRandomName, newRandomType;
    },


    handleClickBack: function () {
        // Au clic, on fait disparaitre la div error
        const errorElement = document.querySelector('.error');
        errorElement.setAttribute('hidden', '');
    },

    handleChangeContent: function () {
        // Au survol de l'élemnt on modifie son contenu
        document.querySelector('.validate').textContent = "Go !";

        //    On réinitialise la valeur après quelques instants
        setTimeout(function () {
                document.querySelector('.validate').textContent = "Générer"
            },
            1000)
    },

    handleChangeContentRandom: function () {

        // Au survol de l'élement on modifie son contenu
        document.querySelector('.randomValidate').textContent = "Ah tu es joueur :)";

        //    On réinitialise la valeur après quelques instants
        setTimeout(function () {
                document.querySelector('.randomValidate').textContent = "Laisser le hasard décider"
            },
            1000)
    },
    // ********************************************************************
    //              Méthodes relatives aux données reçues
    // ********************************************************************

    findNewName: function (letterFirstName, letterLastName = "") {
        // On récupère les lettres reçues de l'utilisateur et on les fait correspondre à une ligne du tableau des syllabes
        // On vérifie que le select est renseigné
        if (letterFirstName.length != 1) {

            // On récupère la div de message d'erreur et on l'affiche
            const errorElement = document.querySelector('.error');
            // On la place en haut du DOM

            errorElement.removeAttribute('hidden');
            // console.log("Zut, tu n'as pas choisi de lettre!")
        }

        const firstSyllabe = syllabe[letterFirstName];

        const nextSyllabe = syllabe[letterLastName];

        const newName = firstSyllabe + nextSyllabe;

        // On appelle la méthode permettant d'afficger le résultat
        generateManager.displayResultName(newName);


        console.log("Ton nouveau nom de pokémon est " + newName);

        // return newName;
    },

    findType: function (month) {
        // On récupère le mois envoyé en paramètre et on le fait correspondre à unb type du tableau type
        const yourType = type[month];

        console.log("Ton pokémon est de type " + yourType)
        // On appelle la méthode permettant d'afficger le résultat
        generateManager.displayResultType(yourType);

        return yourType;

    },

    displayResultName: function (name) {

        // On récupère la div à afficher dans le DOM qui contiendra nos résultats
        const resultElement = document.querySelector('.results');
        console.log(resultElement);

        // On renseigne les champs voulus
        const nameResult = document.querySelector('.results .name');
        console.log(nameResult);

        // const nameUppercase = name[0].toUppercase() + name.substring(1);
        nameResult.innerHTML = "Ton nom de Pokémon est : " + name;

        // On retire la class hidden de la div results et on l'ajoute au reste
        resultElement.classList.remove('hidden');

        // On récupere l'élément à cacher
        const divToHide = document.querySelector('.wrapper');
        divToHide.classList.add('hidden');

    },

    displayResultType: function (type) {

        // On récupère la div à afficher dans le DOM qui contiendra nos résultats
        const resultElement = document.querySelector('.results');
        console.log(resultElement);

        // On renseigne les champs voulus
        const typeResult = document.querySelector('.results .type');
        console.log(typeResult);

        typeResult.innerHTML = "Ton Pokémon est de type : " + type;

        // On retire la class hidden de la div results et on l'ajoute au reste
        resultElement.classList.toggle('hidden');

        // On récupere les éléments à cacher
        const divToHide = document.querySelector('.contenair');
        divToHide.classList.add('hidden');

    }



}


// Lancement du module au chargement de la page
document.addEventListener('DOMContentLoaded', generateManager.init);