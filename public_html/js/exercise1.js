/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var texteSaisie = prompt("Entrez votre nom");
//console.log("Votre nom est : "+ texteSaisie);

var carte = { icone : "trèfle", numero : "4"};
var carte2 = { icone : "trèfle", numero : "10"};

if(carte.icone === carte2.icone){
    console.log("Vous avez trouvez une paire de "+carte.icone);
}

    var personne = {};
    
    personne.nom = prompt("Entrez votre nom");
    personne.prenom = prompt("Entrez votre prénom");
    personne.age = prompt("Entrez votre age");    

    afficherInformation(personne);
    
    function afficherInformation(personne){
        
        if(personne.prenom && personne.nom && personne.age !== 'undefined'){
            alert(`Vous êtes : ${personne.nom} - ${personne.prenom}  Et vous avez : ${personne.age} ans`);
        }else{
            alert("Il manque au moins une information");
        }
    }
    
    