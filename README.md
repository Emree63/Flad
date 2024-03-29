<div align = center>

![Image de l'application](doc/Images/Banner_App.png)

</div>

<div align = center>

---

&nbsp; ![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)
&nbsp; ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
&nbsp; ![Spotify Api](https://img.shields.io/badge/Spotify-1ED760?&style=for-the-badge&logo=spotify&logoColor=white)
&nbsp; ![TypeScript](https://img.shields.io/badge/TypeScript-000?style=for-the-badge&logo=typescript&logoColor=white&color=blue)
&nbsp; ![JavaScript](https://img.shields.io/badge/JavaScript-000?style=for-the-badge&logo=javascript&logoColor=white&color=yellow)

---

</div>

**Nom de l’application** : FLAD :musical_note:
</br>

**Thème de l’application** :  Il s'agit d'un réseau social cross-plateforme axé sur la musique et destiné aux utilisateurs de terminaux mobiles. Son objectif est de permettre aux utilisateurs situés à moins de 100 mètres les uns des autres de visualiser les musiques écoutées par chacun. Ils pourront faire connaissance grâce à un chat et, qui sait, devenir amis. :grin:
</br>

**Contexte** : 👇
</br>

:information_source: Ce projet est un travail universitaire pour la deuxième année du B.U.T Informatique de Clermont-Ferrand. 

## Répartition du Git

La racine de notre gitlab est composée de deux dossiers essentiels au projet:

[**src**](src) : **Ensemble du code pour l'application mobile et les services web** (Application React Native, API Express en TypeScript, et messagerie MQTT)

[**doc**](doc) : **Documentation de l'application** (Inclut des diagrammes, des maquettes et des images)

## Fonctionnement

- ### Comment lancer le projet ? 

Tout d'abord si ce n'est pas fait cloner le dépôt de la branche **master/main**, pour cela copier le lien URL du dépôt git :

<div align = center>

![Comment cloner](doc/Images/HowToClone.png)

</div>

Puis, dans un terminal dans le répertoire que vous souhaiter taper la commande : **git clone https://codefirst.iut.uca.fr/git/FLAD_Dev/FLAD.git**

Ensuite dans un terminal, assurer vous que vous possédez node.js, pour cela il existe la commande : **npm -v**


:information_source: *Si vous ne disposez pas de node.js, allé sur le site [Download Node.js](https://nodejs.org/en/download/) pour pouvoir le télécharger, vous pouvez aussi utiliser nvm qui est un outil de gestion des versions de Node.js sur votre appareil, pour en savoir plus il existe le site [Guide NVM](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) !!!*
<br>

Pour la suite, il suffit seulement de vérifier que node.js est à jour et installer le client expo-cli via la commande : **npm install expo-cli** 

Maintenant vous pouvez à tout moment lancer l'application grâce à la commande : **npx expo start :sunglasses:**
<br>
:information_source: *N'oubliez pas d'installer 'Expo Go' depuis le store de votre téléphone.*

- ### Comment le lancer à partir de l'IUT d'Aubière ?

Cela est un peu plus difficile mais faisable !
<br>
Tout d'abord aller dans votre compte scratch : **cd home/scratch/compte**

Puis récupérer votre adresse IP via la commande : **echo $http_proxy**

Exemple : http://193.49.118.36:8080

Maintenant aller dans le fichier ~/.npmrc (**vim ~/.npmrc**) et noter les informations suivantes (bien entendu remplacer l'IP ci-dessous par l'IP que vous avez récupérer juste avant) :

``` bash
proxy=http://193.49.118.36:8080
http_proxy=http://193.49.118.36:8080
https_proxy=http://193.49.118.36:8080
cache=/home/scratch/compte/npmcache
```

Puis installer le client expo-cli via la commande : **npm install expo-cli**

Et entrer la commande : **export NODE_OPTIONS=--openssl-legacy-provider**

Maintenant vous pouvez à tout moment lancer l'application grâce à la commande : **npx expo start :sunglasses:**
<br>

- ### Comment s'inscrire sur l'application ? 

Tout d'abord, il faut fournir votre *adresse e-mail* et votre *nom Spotify* aux **techniciens de l'application** (voir plus bas). Ils s'occuperont de vous ajouter définitivement à l'application. Une fois que cela est fait, inscrivez-vous via la **page d'inscription** de l'application :

<div align = center>

<img src="doc/Maquettes/RegisterPage.png" width="200" >

</div>


Une fois sur la page, saisissez votre nom, votre adresse e-mail, et votre mot de passe en tant qu'utilisateur FLAD (n'oubliez pas ces informations, vous en aurez besoin pour vous connecter). Pour lier votre compte à Spotify, vous serez automatiquement redirigé vers la page de connexion Spotify. Entrez vos identifiants Spotify, puis cliquez sur le bouton ```Suivant``` et bienvenue sur l'application !"

## Visuel de l'Application

<div align = center>

<img src="doc/Images/Overview.png">

</div>

:information_source: Lorsque vous entrez dans notre application, la page d'accueil (**home**) vous permet de découvrir les musiques :notes: des utilisateurs autour de vous. Vous pouvez valider une musique soit en cliquant sur le bouton, soit en la glissant vers la droite :point_up_2:. Cette musique sera alors ajoutée à la page **favoris** :heart: et vous pourrez entamer une discussion avec l'utilisateur dans la page **chat** :speech_balloon:. 
<br/>

Pour accéder aux détails d'une musique, maintenez votre doigt appuyé sur un Spot ou rendez-vous sur la page des favoris. Vous pourrez écouter la musique :arrow_forward:, obtenir des informations sur l'artiste et la chanson, découvrir des musiques similaires, et même l'ajouter à votre playlist Spotify ou la partager.

<br/>
Dans la page **settings** ⚙️, vous avez accès à toutes vos informations ```Spotify```, que vous pouvez modifier à votre guise. Toutefois, ces modifications ne seront prises en compte que dans notre application. Vous pouvez également choisir le mode sombre (dark mode) dans les paramètres pour une expérience de navigation plus confortable.
<br/>

### Voici un petit récapitulatif 
<div align="center">
  <table>
    <tr>
      <td align="center"><img src="doc/Images/DisLike_Img.png" alt="Button 1" width="100" height="100"></td>
      <td align="center"><img src="doc/Images/Discovery_Img.png" alt="Button 2" width="100" height="100"></td>
      <td align="center"><img src="doc/Images/Like_Img.png" alt="Button 3" width="100" height="100"></td>
    </tr>
    <tr>
      <td align="center">Supprimer de la pile un spot</td>
      <td align="center">Ajout dans une playlist de votre compte Spotify (créée spécialement par l'application)</td>
      <td align="center">Ajouter à vos favoris</td>
    </tr>
  </table>
</div>
<br/>


## Deploiement
- [x] &nbsp; ![IOS](https://img.shields.io/badge/IOS-000?style=for-the-badge&logo=apple&logoColor=black&color=white)
- [x] &nbsp; ![Android](https://img.shields.io/badge/Android-000?style=for-the-badge&logo=android&logoColor=white&color=green)


## Technicien en charge de l'application

La composition pour le projet se voit réaliser par deux élèves de l'IUT d'Aubière:
<br>
- Emre KARTAL : emre.kartal@etu.uca.fr
- David D'ALMEIDA : david.d_almeida@etu.uca.fr

<div align="center">
<a href = "https://codefirst.iut.uca.fr/git/emre.kartal">
<img src="https://codefirst.iut.uca.fr/git/avatars/1ff65c9c5ab0e8c8883fb48adbcf972f?size=72" width="50" >
</a>
<a href = "https://codefirst.iut.uca.fr/git/david.d_almeida">
<img src="https://codefirst.iut.uca.fr/git/avatars/a16fa2dc52ceae18d8923c91121caa66?size=870" width="50" >
</a>
</div>

<div align = center>
© FladDev
</div>

<div align = right>

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Licence Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

</div>