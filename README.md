# ApiValidator

ApiValidator est une API RESTful construite avec Express.js qui met l'accent sur une validation approfondie des données pour différentes routes. Le projet insiste sur l'importance des tests unitaires robustes avec Jest pour garantir une validation efficace et le bon fonctionnement de chaque partie de l'API. De plus, il offre une fonctionnalité facultative pour explorer les tests de charge afin d'évaluer la scalabilité et les performances de l'API dans des scénarios de trafic intense.

## Fonctionnalités

- **Définition des Routes :** Créez des routes au sein de l'application Express pour modéliser différents scénarios de validation, tels que l'inscription des utilisateurs, la soumission de données et les mises à jour des informations utilisateur.

    POST /Register : Pour Créer un nouveaux utilisateur. 
    POST /Login : Pour faire une authentification d'un utilisateur.
    GET  /      : Pour Lister toutes les utilisateurs.
    GET  /:id     : Pour Lister un utilisateur spécifique.
    PUT  /:id     : Pour Modifier un utilisateur spécifique.
    DELETE  /:id     : Pour Supprimer un utilisateur spécifique.



- **Validation des Données :** Utilisez des bibliothèques telles que Joi ou express-validator pour vérifier que les données soumises respectent les critères définis.
- **Gestion des Erreurs :** Développez des mécanismes de gestion des erreurs pour fournir des réponses appropriées lorsque les données ne passent pas la validation.
- **Tests Unitaires avec Jest :** Rédigez des tests unitaires complets pour chaque règle de validation et route de l'API afin de confirmer les réponses attendues pour les requêtes valides et invalides.
- **Tests de Charge (Optionnel) :** Planifiez des scénarios de tests de charge pour simuler un trafic dense et évaluer la capacité de l'API à traiter un grand nombre de requêtes simultanées.

## Installation

1. Clonez le dépôt : `git clone https://github.com/theziko1/ApiValidator.git`
2. Installez les dépendances : `npm install`

## Utilisation

1. Lancez le serveur : `npm start`
2. Accédez aux points d'accès de l'API en utilisant des outils tels que Postman ou curl.
3. Exécutez les tests : `npm test` pour les tests unitaires, et éventuellement `npm run test:load` pour les tests de charge.

## Technologies Utilisées

- Express.js : Framework backend pour la construction de l'API RESTful.
- Jest : Framework de test JavaScript pour les tests unitaires.
- Joi : Bibliothèque de validation de schémas pour garantir l'intégrité des données.
- Artillery/JMeter (Optionnel) : Outils pour les tests de charge afin d'évaluer les performances de l'API dans des conditions de trafic intense.

## Contribuer

Les contributions sont les bienvenues ! Veuillez cloner le dépôt et soumettre une demande d'extraction.

## Licence

Ce projet est sous licence [MIT](LICENSE).
