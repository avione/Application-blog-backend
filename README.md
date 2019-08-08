# Application-blog-backend
* Application-blog angular 8 with backend firebase
# Utilisation d'Angular 8, Material Design for Bootstrap 

* Cette petite application montre l'utilisation des differents types de databinding pour le passage d'une class model: Post d'un component à un autre.

* Dans cet exemple : j'ai utilisé les directives structurelles *ngFor, ngStyle et ngClass  pour les components  PostListComponent,  PostListItemComponent et l'utilisation de @Input()  post: Post; pour le passage des élements title, content, create_at, loveits.

# Utilisation de LOCALE_ID: 
Pour l'utilsation des dates en angular 8 et pour le format des dates
Il faut ajouter les import suivant dans app.module.ts:
- import { LOCALE_ID } from '@angular/core';
- import { registerLocaleData } from '@angular/common';
- import localeFr from '@angular/common/locales/fr';
- registerLocaleData(localeFr, 'fr-FR');
et indiquer sur la ligne providers: {provide: LOCALE_ID, useValue: 'fr-FR' }
providers: [{provide: LOCALE_ID, useValue: 'fr-FR' }]


# Installation pour windows:

* Pour installer cette application, vous devez avoir installer au préalable nodejs:

- Exécuter une invite de commande cmd.exe et installer angular/cli en exécutant la commande:
#		npm install -g @angular/cli

- Downloader le zip et dezipper le dans un répertoire nommé test ou utiliser la commande: 
#		git clone https://github.com/avione/application-blog-backend.git 
- Dans une invite de commande cmd.exe 

- Positionnez-vous ensuite dans le répertoire test et exécuter la commande : 
#		npm install

- Pour firebase vous devez aller sur le site firebase.google.com vous connectez avec votre compte google et accéder en suite à la console.
- Creer un nouveau projet, récupérer les clés de config firebase et l'ajouter dans le fichier app.component.ts

Voici un exemple fictif de clés:
var firebaseConfig = {
    apiKey: "AIzaYyBlAsLPyKJ0z2ckhy2Vxtt_D9ThpHN5FWE",
    authDomain: "app-blog-3a974.firebaseapp.com",
    databaseURL: "https://app-blog-3a974.firebaseio.com",
    projectId: "app-blog-3a974",
    storageBucket: "app-blog-3a974.appspot.com",
    messagingSenderId: "21310261064",
    appId: "1:21310261064:web:76e97c8b65d50748"
 };
 Ajouter les authorisation de lecture et écriture pour l'authenfication des utilisateurs dans votre projet Firebase et une base de donnée en mode Realtime

- Une fois que c'est terminé éxecuter la commande : 
#		ng serve
- Ouvrez votre browser avec l'url:
#		http://localhost:4200
