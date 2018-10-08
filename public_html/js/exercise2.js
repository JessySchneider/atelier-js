/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tableau = new Array(10);

var tableauBis = [1 , "Bonjour", false];

// Permet d'ajouter un élément dans un tableau
tableauBis.push("Coucou toi !");
//console.log(tableauBis);

// Permet d'enlever le dernier élément d'un tableau
tableauBis.pop();
//console.log(tableauBis);

// Permet d'enlever un ou plusieurs éléments d'un tableau avec un index
tableauBis.splice(1,1);
//console.log(tableauBis);

// Permet de remplir un tableau avec une valeur
tableau.fill("*");
//console.log(tableau);

if(tableau.includes("*")){
//    console.log("Gagné");
}


var a = 1;
var b = 2;
//console.log("Avant traitement :"+a,b);

var c = a;
a = b;
b = c;

//console.log("Après traitement :"+a,b);

// Calcul d'un IMC bidon
var poids = 85;
var hauteur = 1.78;

var imc = calculIMC(poids,hauteur);
//console.log(`Votre imc est : ${imc}`);

function calculIMC(poids,hauteur){
    
    if(typeof(poids) && typeof(hauteur) === "number"){
        
        var imc = poids / Math.pow(hauteur,2);
        return imc;
    }else{
        var texteErreur = "Veuillez renseigner des nombres";
        return texteErreur;
    }
}

//  Obtenir le cube d'un nombre
var chiffre = 3;
var cubeNombre = getCubeNombre(chiffre);
//console.log(`Cube du nombre obtenu : ${cubeNombre}`);

function getCubeNombre(nombre){
    
    var cubeNombre = nombre*nombre*nombre;
    return cubeNombre;
}

// Calculer le rayon d'un cercle
var rayon = 3;
var aireCercle = getAireCercle(rayon);
//console.log(`Aire du cercle : ${aireCercle}`);

function getAireCercle(rayon){
    
    var aireCercle = rayon*rayon / Math.PI;
    return aireCercle;
    
}

// Calculer l'hypothenuse d'un triangle rectancle
var hauteur = 5;
var longeur = 10;

var hypothenuse = getLongeurHypothenuse(hauteur,longeur);
//console.log(`Hypothenuse obtenu ${hypothenuse}`);

function getLongeurHypothenuse(hauteur,longeur){
    
    var hypothenuse = hauteur*hauteur + longeur*longeur;
    return hypothenuse = Math.sqrt(hypothenuse);
   
}

// Calculer la factorielle d'un nombre

var nombreFactorielle = 5;
var resultat = getNombreFactorielle(nombreFactorielle);
//console.log(`Resultat obtenu via boucle for : ${resultat}`);

function getNombreFactorielle(nombre){
   var resultat = 1;
    for(var i = 0; i < nombreFactorielle ; i++){
        
        resultat = resultat * (nombreFactorielle - i) ;
        
    } 
    return resultat;
}


// Calculer la factorielle d'un nombre en recursive
var resultatRecursive = getNombreFactorielleRecursive(nombreFactorielle);
//console.log(`Resultat via fonction recursive : ${resultatRecursive}`);

function getNombreFactorielleRecursive(nombre){
    return nombre === 0 ? 1 : nombre * getNombreFactorielleRecursive(nombre - 1);
}



//var choix = prompt("Quel est votre choix ? ");
var choix = "3";

switch (choix){
    case "1":
        console.log("Vole 2 carte à votre adversaire");
        break;
    case "2":
        console.log("Donne 2 carte à votre adversaire");
        break;
    case "3":
        console.log("Passe un tour");
        break;
    case "4":
        console.log("jouer deux fois");
        break;
    default:
        console.log("Votre choix est incorrect");
};




// ---------------------- PENDU ---------------------------

// Désigne la zone dans laquelle le message va être affiché en fin de partie
var targetMessage = document.getElementById("message");
// Désigne la zone dans laquelle le nombre de vie va étre affiché au fur et a mesure
var targetNbVie = document.getElementById("vie");

// Initialise la liste de mot
var listeMot = new Array("patate","haricot","citrouille","carotte");

// Choisi un chiffre aléatoire pour choisir un mot dans la liste
var chiffre = entierAleatoire(0,listeMot.length-1);

// Choisi un mot et le renseigne dans une variable
var mot = listeMot[chiffre];
//console.log(mot);

// Calcul la taille du mot
var longueurMot = mot.length;

// Initie le nombre de vie
var nbVie = 8;

// Initie l'etat du mot vide pour le comparer au mot trouver a chaque 
var motAfficher = new Array(longueurMot);
var motAVerifier ="";
motAfficher.fill("_");

// On défini l'élément déclanchant le début du jeu
var boutonStart = document.getElementById("Demarrer");

// On crée l'interface de jeu pour le pendu qui prend en paramètre le nombre de lettre présent dans le mot
generatePendu(longueurMot); 

// Le jeu démarre une fois que le joueur appuie sur "Démarrer"
boutonStart.onclick = jeuPendu;

// Boucle permettant d'executer le jeu jusqu'a ce que la partie se termine
function jeuPendu(){
       
    while(mot !== motAVerifier && nbVie > 0){
    
        var lettre = prompt("Entrez la lettre choisie");
        var erreur = true;
        
        // On vérifie que la lettre n'a pas déjà été proposée
        if(!motAfficher.includes(lettre)){
            // Si non on vérifie si la lettre est présente dans le mot
            for(var i = 0; i < longueurMot; i++){

                if(lettre === mot[i]){

                    motAfficher[i] = lettre;
                    cible = targetChildHTML("pendu");
                    cible[i].innerHTML = lettre;
                    erreur = false;
                    
                }
             }
        }

        if(erreur){
            nbVie--;
            targetNbVie.innerHTML = nbVie;
        }
 
        motAVerifier = motAfficher.join('');
//        console.log(motAfficher);
        console.log("Nombre de vies restantes : "+nbVie);
    }
    
    if(nbVie === 0){
        targetMessage.style.display = "inline-block";
        targetMessage.innerHTML= ("Vous avez perdu, le mot a trouver était : <b>"+mot+"</b>");
    }
    
    if(mot === motAVerifier){
        targetMessage.style.display = "inline-block";
        targetMessage.innerHTML = ("Vous avez gagné !");
    }
}


//Genere le code HTML pour l'affichage côté client
function generatePendu(longueurMot){
    var html = "";    
    baliseCible = targetHTML("pendu");
    
    for(var i = 0; i<= longueurMot-1; i++){
        html = html + "<span class='lettre_vide'>_</span>";
    }
    baliseCible.innerHTML = html;
    
}

// Récupère l'élément du DOM a venir modifier a chaque fois qu'une lettre est rouvé
function targetHTML(id){
    var target = document.getElementById(id);    
    return target;
}

// Récupère la liste d'élément du DOM afficher contenant nos lettres
function targetChildHTML(id){
    var enfantCible = document.getElementById(id).childNodes;
    return enfantCible;
}

//Renvoi un nombre aléatoire
function entierAleatoire(min,max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






