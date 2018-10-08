// ------------------ MEMORY ------------------
// On définit différente variables utilisées dans notre jeu
var targetPlateau = document.getElementById("tableau_memory");
var html;
var couleur1;
var couleur2;
var cibleCouleur1;
var cibleCouleur2;
var interdireclick = false;
var nombreDeTentative = 0;
var nombreDeCarte;
var targetMessage = document.getElementById("message_memory");

//on définit l'élément sur lequel le joueur doit appuyer pour démarrer le jeu
var boutonStart = document.getElementById("demarrer_jeu");
boutonStart.addEventListener("click",setNombreDeCarte,false);

/*
 * Cette fonction va vérifier si le nombre de carte saisie par l'utilisateur est valide
 * Si oui alors on génère le plateau de jeu
 * Sinon on affiche un message d'erreur
 * @returns void
 */
function setNombreDeCarte(){
    // var nombreDeCarte = parseInt(prompt("Rentrer le nombre de cases souhaités (chiffre paire obligatoire)"));
    nombreDeCarte = document.getElementById("nb_cases").value;
    // Tant que le nombre renseigné par l'utilisateur n'est pas pair ou supérieur a 25 on lui redemande de saisir un nombre
    if(nombreDeCarte % 2 === 0 && nombreDeCarte <= 24 && nombreDeCarte > 0) {
       
        targetMessage.style.opacity = 0;
        nombreDeTentative = 0;
        // On génére l'HTML de notre jeu
        generatePlateau(nombreDeCarte);
    }else{
        // Sinon on indique un message d'erreur
        targetMessage.innerHTML = "<h2>Renseigner un chiffre paire et inférieur à 25 entre</h2>";
        targetMessage.style.opacity = 1;
    }
    
}
// On déclanche une action a chaque clic effectuer sur l'une des cartes du plateau
targetPlateau.addEventListener("click", retournerCarte, false);
/*
 * Cette fonction va s'occuper de venir retourner nos cartes a chaque fois que l'utilisateur va cliquer sur une carte.
 * Si les cartes forment une paire elle disparraissent du plateau, sinon on les retournes a nouveau.
 * @param {type} event : l'élément sur lequel on vient de cliquer
 * 
 */
function retournerCarte(event) {
    // On vérifie que le click est autorisé et que le jeu n'est pas entrain de retourner des cartes
    if (interdireclick === false) {
            
        /* 
         * Si on a pas encore choisi de première carte alors on récupère la couleur de l'élément sur lequel on vient de cliquer
         * tout en conservant l'élément sur lequel on va potentiellement agir. Si la première couleur est choisi on va faire la même chose
         * pour la seconde couleur.
         * @var couleur1 = code hexadécimal de la couleur du background de l'élément.
         * @var cibleCouleur1 = object DOM de l'élément sur lequel on veut agir.
         * @var couleur2 = code hexadécimal de la couleur du background de l'élément.
         * @var cibleCouleur2 = object DOM de l'élément sur lequel on veut agir.
         */ 
        
        // On vérifie que le click est bien effectué sur une carte du jeu
        if(event.target.getAttribute('data-color') !== null){

            if (typeof (couleur1) === "undefined") {
                couleur1 = event.target.getAttribute('data-color');
                cibleCouleur1 = event.target;
                cibleCouleur1.className = "carte_active";
                cibleCouleur1.style.background = couleur1;
            } else {
                couleur2 = event.target.getAttribute('data-color');
                cibleCouleur2 = event.target;
                cibleCouleur2.className = "carte_active";
                cibleCouleur2.style.background = couleur2;
            }

            //On vériie que l'utilisateur ne clic pas plusieurs fois sur la même case
            if(cibleCouleur1 === cibleCouleur2){
                couleur2 = undefined;
                cibleCouleur2 = undefined;
            }
            //Si on a bien cliqué sur deux cartes et que les cartes correspondent alors on les fait disparaître du plateau

            if (couleur1 !== "undefined" && couleur2 !== "undefined" && couleur1 === couleur2) {
                // On interdit a l'utilisateur de cliquer le temps que les cartes disparraissent du plateau de jeu.r
                interdireclick = true;

                setTimeout(function () {
                    cibleCouleur1.className = "carte_trouve";
                    cibleCouleur2.className = "carte_trouve";
                    couleur1 = undefined;
                    couleur2 = undefined;
                    nombreDeTentative++;
                    interdireclick = false;

                    var nbCarteTrouve = document.getElementsByClassName("carte_trouve");
                    if (nbCarteTrouve.length === parseInt(nombreDeCarte)) {
                        afficherMessageFin();
                    }

                }, 1500);
            } 
            // Sinon on retourne a nouveau les cartes après quelques instant dans leur état d'origine.
            else {
                if (typeof (couleur1) !== "undefined" && typeof (couleur2) !== "undefined") {
                    // On interdit a l'utilisateur de cliquer le temps qu'il puisse voir la couleur des cartes avant de les retourner
                    interdireclick = true;

                    setTimeout(function () {
                        cibleCouleur1.className = "carte_defaut";
                        cibleCouleur2.className = "carte_defaut";
                        cibleCouleur1.style.background = "white";
                        cibleCouleur2.style.background = "white";
                        couleur1 = undefined;
                        couleur2 = undefined;
                        nombreDeTentative++;
                        interdireclick = false;

                    }, 2000);
                }
            }    
        }
    }
}

/*
 * cette fonction affiche le message de victoire à l'utilisateur une fois qu'il a fini sa partie
 */
function afficherMessageFin() {
    var message = `<h2> Vous avez gagné en ${nombreDeTentative} tentative(s) !</h2>`;
    
    targetMessage.innerHTML = message;
    targetMessage.style.opacity = 1;
}

/*
 * Cette fonction va générer la structure HTML de notre jeu
 * @param {type} nombreDeCarte : le nombre de carte pour cette partie
 */
function generatePlateau(nombreDeCarte) {
    var html = "<div>";
    var divExistant = false;

    var tableauCouleur = generateRandomColor(nombreDeCarte);        
        for (var i = 0; i < nombreDeCarte; i++) {
            
            html = html + `<span class="carte_defaut"  data-color="${tableauCouleur[i]}" ></span>`;
            
            if((i+1)%4 === 0){
                html = html + "</div>"+"<div>";
            }
                 
            if( i === nombreDeCarte-1){
                html = html + "</div>";
            }   
        }
    targetPlateau.innerHTML = html;
}

/*
 * Cette fonction a pour rôle de générer un tableau de paire de couleur qui vont être utilisées pour notre jeu.
 * @param nombreDeCarte : le nombre de carte choisi par l'utilisateur
 */
function generateRandomColor(nombreDeCarte) {
    var tableauCouleur = new Array();
    for (var c = 0; c < nombreDeCarte / 2; c++) {
        tableauCouleur.push("#" + getCouleurAleatoire());
    }

    // On ajoute les même valeurs à notre tableau pour s'assurer d'avoir 2 fois chaque couleurs de présentes.
    tableauCouleurComplet = tableauCouleur.concat(tableauCouleur);
    var tailleTableau = tableauCouleurComplet.length;

    // Il faut mélanger les valeur du tableau
    for (var i = 0; i < tailleTableau / 2; i++) {

        // on récupére un chiffre aléatoire correspondant à l'index d'un élément de notre tableau
        var indiceAleatoire = Math.floor(Math.random() * (tailleTableau / 2 - i + 1));
        // On stock l'index de l'élément du tableau que l'on va modifier pour la réaffecter après
        var stockageCouleurTemporaire = tableauCouleurComplet[i];
        // On échange les valeurs de couleur entre deux éléments du tableau.
        tableauCouleurComplet[i] = tableauCouleurComplet[indiceAleatoire];
        tableauCouleurComplet[indiceAleatoire] = stockageCouleurTemporaire;

    }

    return tableauCouleurComplet;
}

/*
 * Cette fonction permet de générer des codes couleurs héxadécimal aléatoire
 */
function getCouleurAleatoire()
{
    // on définit un tableau de 6 éléments qui va accueillir les codes hexadécimal des couleurs;
    var tableauCouleur = new Array(6);
    var tailleTableauCouleur = tableauCouleur.length;
    var choixCouleur = new Array("A", "B", "C", "D", "E", "F", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
    var nbchoixCouleur = choixCouleur.length;
    
    // pour définir une couleur on créer une combinaison de 6 éléments issue du tableau pour former
    // un code couleur en hexadécimal
    for (var i = 0; i <tailleTableauCouleur; i++) {
        var couleur = choixCouleur[Math.floor(Math.random() * (nbchoixCouleur - 1))];

        tableauCouleur[i] = couleur;

    }
    tableauCouleur = tableauCouleur.join("");
    return tableauCouleur;
}