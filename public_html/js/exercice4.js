
// On définit nos éléments de DOM sur lesquelles nous allons agir
// Quand on click sur notre bouton on appel la fonction correspondante
var target = document.getElementsByClassName("bouton");
target[0].addEventListener("click", verificationConnexion, false);

/*
 *  Cette fonction va vérifier que la taille de pseudonyme et de mdp est d'au moins 3 caractères
 *  Si c'est le cas on appel la fonction permettant d'afficher le message de bienvenu par l'utilisateur
 */
function verificationConnexion(){
   
    var targetMessage = document.getElementsByClassName("message_erreur");
    var pseudo = document.getElementById("pseudo").value;
    var mdp = document.getElementById("mdp").value;
    targetMessage[0].innerHTML ="";
    
    
    if(pseudo.length >=3 && mdp.length >= 3){
        afficherMessageConnexion(pseudo);        
    }else{
        targetMessage[0].innerHTML= "Votre pseudo ou mot de passe ne contient pas au moins 3 caractères";
        targetMessage[0].style.opacity = 1;
    }
}

/*
 * Cete fonction affiche un message de bienvenu à l'utilisateur connecté
 * @param {string} récupère le pseudonyme renseigner par l'utilisateur
 */
function afficherMessageConnexion(pseudo){
    var targetFormulaire = document.getElementById("myform");
    targetFormulaire.innerHTML = `<h1 class="message_reussite"> Bienvenu ${pseudo}`;
}