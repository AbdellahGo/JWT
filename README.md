# JWT-CompteRendu

###   

![](https://t90151998955.p.clickup-attachments.com/t90151998955/3828445e-f3a2-4c40-9e45-518dccc42025/image-1.png)
### 1\. Test de la route protégée sans token (GET /api/me)
*   **Action** : Tentative d'accès à la route protégée /api/me sans fournir de jeton JWT dans les en-têtes.
*   **Résultat** : Le serveur renvoie un code 401 Unauthorized avec le message "Accès refusé. Jeton manquant ou format invalide.".
*   **Explication** : Le middleware de sécurité bloque la requête car aucun jeton Bearer n'est fourni.

![](https://t90151998955.p.clickup-attachments.com/t90151998955/f73a3395-6e04-4053-a6a9-41ace0703188/image-2.png)
### 2\. Connexion avec de mauvais identifiants (POST /api/login)
**Action** : Envoi d'une requête de connexion avec un e-mail ou un mot de passe incorrect.
**Résultat** : Le serveur renvoie un code 401 Unauthorized avec le message "Identifiants incorrects.".
**Explication** : L'authentification échoue car l'utilisateur n'existe pas ou les identifiants ne correspondent pas.

![](https://t90151998955.p.clickup-attachments.com/t90151998955/707b003b-a702-4b20-a1c1-af903224fba9/image-3.png)
### 3\. Connexion réussie (POST /api/login)
**Action** : Envoi d'une requête de connexion avec les identifiants valides de [tech1@geotech.fr](mailto:tech1@geotech.fr).
**Résultat** : Le serveur répond avec un code 200 OK et génère un jeton JWT valide.
**Explication** : Les identifiants sont validés et l'API retourne un jeton contenant les informations (payload) et droits de l'utilisateur.

![](https://t90151998955.p.clickup-attachments.com/t90151998955/0ef65499-2305-4302-ba33-e3c8b949e4d6/image-4.png)
### 4\. Accès à son profil avec le token (GET /api/me)
*   **Action** : Envoi d'une requête sur /api/me en injectant le token reçu précédemment dans l'onglet Authorization (Bearer Token).
*   **Résultat** : Le serveur retourne un code 200 OK avec les données du profil connecté (id, email, role).
*   **Explication** : Le middleware a validé la signature du jeton JWT et extrait le payload pour autoriser l'accès aux données de l'utilisateur.

![](https://t90151998955.p.clickup-attachments.com/t90151998955/3c687495-5e5a-490f-99f2-b7d10fdcee68/image-5.png)
### 5\. Tentative d'accès interdit par rôle (POST /api/admin)
*   **Action** : Envoi d'une requête vers la route réservée aux administrateurs/managers avec le token du rôle TECHNICIEN.
*   **Résultat** : Le serveur renvoie un code 403 Forbidden avec le message "Accès interdit. Droits insuffisants.".
*   **Explication** : Le jeton est valide, mais le middleware de contrôle d'accès basé sur les rôles (RBAC) vérifie que l'utilisateur n'a pas les privilèges requis (MANAGER).

![](https://t90151998955.p.clickup-attachments.com/t90151998955/6816b2eb-8a72-4288-8f6c-4354164c88b1/image-6.png)
### 6\. Accès autorisé à la route administrateur (POST /api/admin)
*   Action : Requête effectuée sur la route /api/admin avec un jeton valide possédant le rôle MANAGER.
*   Résultat : Le serveur renvoie un code 200 OK avec le message "Accès autorisé au back-office".
*   Explication : Le jeton est valide et le rôle de l'utilisateur correspond aux privilèges requis par la route protégée