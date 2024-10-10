// // server.js
//
// const express = require('express');
// const axios = require('axios');
// const querystring = require('querystring');
// require('dotenv').config();
// const session = require('express-session');
//
// const app = express();
// const port = 8888;
//
// // Configuration de la session
// app.use(session({
//     secret: 'your_secret_key', // Changez ceci par une clé secrète plus sécurisée
//     resave: false,
//     saveUninitialized: true,
// }));
//
// // Stockage des comptes
// const accounts = [
//     {
//         id: 1, // Ajoutez un identifiant pour le premier compte
//         clientId: process.env.CLIENT_ID_1,
//         clientSecret: process.env.CLIENT_SECRET_1,
//     },
//     {
//         id: 2, // Ajoutez un identifiant pour le deuxième compte
//         clientId: process.env.CLIENT_ID_2,
//         clientSecret: process.env.CLIENT_SECRET_2,
//     }
// ];
//
//
//
// // Route pour rediriger vers l'API Spotify pour l'authentification
// app.get('/login/:accountId', (req, res) => {
//     const account = accounts.find((_, index) => index + 1 == req.params.accountId); // Modifiez cette ligne pour trouver par index
//     if (account) {
//         const scope = 'user-read-private user-read-email';
//         const redirectUri = encodeURIComponent(process.env.REDIRECT_URI); // Assurez-vous d'utiliser la bonne URI ici
//         const authUrl = `https://accounts.spotify.com/authorize?client_id=${account.clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}`;
//         console.log('URL d\'autorisation:', authUrl); // Ajoutez ceci pour déboguer
//         res.redirect(authUrl);
//     } else {
//         res.send('Compte non trouvé.');
//     }
// });
//
// // Route de callback pour recevoir le token
// app.get('/callback', (req, res) => {
//     console.log('Paramètres de requête:', req.query);
//
//     const accessToken = req.query.access_token;
//     const error = req.query.error;
//
//     if (error) {
//         console.error('Erreur d\'authentification:', error);
//         return res.send(`Erreur lors de l'authentification: ${error}. Veuillez réessayer.`);
//     }
//
//     if (accessToken) {
//         req.session.accessToken = accessToken;
//         return res.redirect('/profile');
//     } else {
//         console.error('Aucun access_token reçu:', req.query);
//         return res.send('Erreur lors de l\'authentification. Veuillez réessayer.');
//     }
// });
//
//
// // Route pour afficher le profil de l'utilisateur
// app.get('/profile', async (req, res) => {
//     const accessToken = req.session.accessToken;
//
//     if (!accessToken) {
//         return res.redirect('/login/1'); // Redirige vers le premier compte par défaut
//     }
//
//     try {
//         const response = await axios.get('https://api.spotify.com/v1/me', {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//
//         const userInfo = response.data;
//
//         // Affichez les informations utilisateur
//         res.send(`
//             <h1>Informations Utilisateur</h1>
//             <p>Nom: ${userInfo.display_name}</p>
//             <p>Email: ${userInfo.email}</p>
//             <p><a href="https://www.spotify.com">Aller sur Spotify</a></p>
//             <h2>Changer de compte</h2>
//             <a href="/login/2">Se connecter avec le deuxième compte</a>
//             <a href="/login/1">Se connecter avec le premier compte</a>
//         `);
//     } catch (error) {
//         console.error('Erreur lors de la récupération des informations utilisateur:', error);
//         res.send('Erreur lors de la vérification du statut.');
//     }
// });
//
// // Route pour se déconnecter
// app.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.send('Erreur lors de la déconnexion.');
//         }
//         res.redirect('/');
//     });
// });
//
// // Page d'accueil
// app.get('/', (req, res) => {
//     res.send(`
//         <h1>Outil de Gestion des Comptes Spotify</h1>
//         <h2>Choisissez un compte :</h2>
//         <a href="/login/1">Se connecter avec le premier compte</a><br>
//         <a href="/login/2">Se connecter avec le deuxième compte</a>
//     `);
// });
//
// // Lancer le serveur
// app.listen(port, () => {
//     console.log(`Serveur démarré à http://localhost:${port}`);
// });






//
//
// const puppeteer = require('puppeteer');
//
// const SPOTIFY_REGISTER_URL = 'https://partner-provisioning.spotify.com/starbucks/register/';
// const username = 'US8547584'; // Remplacez par votre nom d'utilisateur Starbucks
// const lastName = 'Smith'; // Remplacez par votre nom de famille
//
// (async () => {
//     const browser = await puppeteer.launch({ headless: false }); // headless: false pour voir le navigateur
//     const page = await browser.newPage();
//
//     // Accéder directement à la page de liaison
//     await page.goto(SPOTIFY_REGISTER_URL);
//
//     // Attendez que les éléments soient visibles
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//     await page.waitForSelector('#last-name', { visible: true }); // Sélecteur du nom de famille
//     await page.waitForSelector('#global-user-name', { visible: true }); // Sélecteur du nom d'utilisateur
//     await page.waitForSelector('input[type="checkbox"]', { visible: true }); // Sélecteur de la case à cocher
//     await page.waitForSelector('button[type="submit"]', { visible: true }); // Sélecteur du bouton de soumission
//
//     // Remplir le formulaire
//     await page.type('#last-name', lastName); // Utiliser l'ID du nom de famille
//     await page.type('#global-user-name', username); // Utiliser l'ID du nom d'utilisateur
//     await page.click('input[type="checkbox"]'); // Cochez la case des données
//     await page.click('button[type="submit"]'); // Cliquez sur le bouton pour lier
//
//     // Attendre 2 secondes
//     await new Promise(resolve => setTimeout(resolve, 2000));
//
//     console.log('Bot a terminé les étapes.');
//     await browser.close(); // Fermez le navigateur
// })();
//
//


// const puppeteer = require('puppeteer');
//
// const SPOTIFY_URL = 'https://partner-provisioning.spotify.com/starbucks/';
// const SPOTIFY_LOGIN_URL = 'https://accounts.spotify.com/en/login';
// const SPOTIFY_REGISTER_URL = 'https://partner-provisioning.spotify.com/starbucks/register/';
//
// const username = 'US8547584'; // Remplacez par votre nom d'utilisateur Starbucks
// const lastName = 'Smith'; // Remplacez par votre nom de famille
//
// (async () => {
//     const browser = await puppeteer.launch({ headless: false }); // headless: false pour voir le navigateur
//     const page = await browser.newPage();
//
//     // Étape 1 : Accéder à la page d'offre de Spotify
//     await page.goto(SPOTIFY_URL);
//
//     await page.waitForSelector('#authorize-btn', { visible: true });
//     await new Promise(resolve => setTimeout(resolve, 2000)); // Ajout d'un délai si nécessaire
//     await page.click('#authorize-btn');
//
//
//     // Étape 2 : Attendre la redirection vers la page de connexion Spotify
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//     await page.goto(SPOTIFY_LOGIN_URL);
//
//     // Étape 3 : Se connecter à Spotify
//     await page.type('#login-username', 'tort.tenakan1@gmail.com'); // Remplacez par votre email
//     await page.type('#login-password', 'SPOTIFY12345'); // Remplacez par votre mot de passe
//     await page.click('#login-button');
//
//     // Attendez que la connexion soit réussie et que la redirection se produise
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//
//     // Étape 4 : Accéder à la page de liaison du compte
//     await page.goto(SPOTIFY_REGISTER_URL);
//
//     // Remplir le formulaire
//     await page.waitForSelector('#last-name', { visible: true }); // Sélecteur du nom de famille
//     await page.waitForSelector('#global-user-name', { visible: true }); // Sélecteur du nom d'utilisateur
//     await page.waitForSelector('input[type="checkbox"]', { visible: true }); // Sélecteur de la case à cocher
//     await page.waitForSelector('button[type="submit"]', { visible: true }); // Sélecteur du bouton de soumission
//
//     await page.type('#last-name', lastName); // Utiliser l'ID du nom de famille
//     await page.type('#global-user-name', username); // Utiliser l'ID du nom d'utilisateur
//     await page.click('input[type="checkbox"]'); // Cochez la case des données
//     await page.click('button[type="submit"]'); // Cliquez sur le bouton pour lier
//
//     // Attendre 2 secondes pour voir les résultats
//     await new Promise(resolve => setTimeout(resolve, 2000));
//
//     console.log('Bot a terminé les étapes.');
//     await browser.close(); // Fermez le navigateur
// })();








// const puppeteer = require('puppeteer');
//
// const SPOTIFY_URL = 'https://partner-provisioning.spotify.com/starbucks/';
// const SPOTIFY_LOGIN_URL = 'https://accounts.spotify.com/en/login';
// const SPOTIFY_REGISTER_URL = 'https://partner-provisioning.spotify.com/starbucks/register/';
//
// const username = 'US8547584'; // Remplacez par votre nom d'utilisateur Starbucks
// const lastName = 'Smith'; // Remplacez par votre nom de famille
//
// (async () => {
//     const browser = await puppeteer.launch({ headless: false }); // headless: false pour voir le navigateur
//     const page = await browser.newPage();
//
//     // Étape 1 : Accéder à la page d'offre de Spotify
//     await page.goto(SPOTIFY_URL);
//
//     await page.waitForSelector('#authorize-btn', { visible: true });
//     await new Promise(resolve => setTimeout(resolve, 2000)); // Ajout d'un délai si nécessaire
//     await page.click('#authorize-btn');
//
//     // Étape 2 : Attendre la redirection vers la page de connexion Spotify
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//     await page.goto(SPOTIFY_LOGIN_URL);
//
//     // Étape 3 : Se connecter à Spotify
//     await page.type('#login-username', 'tstpu7768735@aol.com'); // Remplacez par votre email
//     await page.type('#login-password', 'SPOTIFY12345'); // Remplacez par votre mot de passe
//     await page.click('#login-button');
//
//     // Attendre que la connexion soit réussie et que la redirection se produise
//     await page.waitForNavigation({ waitUntil: 'networkidle0' });
//
//     // Vérifiez si vous êtes redirigé vers la page d'offre
//     let isOnOfferPage = true;
//     let attempts = 0;
//
//     while (isOnOfferPage && attempts < 5) {
//         const currentUrl = page.url();
//
//         if (currentUrl.includes('accounts.spotify.com/en/status')) {
//             console.log('Redirected to status page, forcing navigation to registration page.');
//             await page.goto(SPOTIFY_REGISTER_URL, { waitUntil: 'networkidle0' });
//             attempts++;
//         } else if (currentUrl === SPOTIFY_URL) {
//             console.log('Back on offer page, clicking authorize button again.');
//             await page.click('#authorize-btn');
//             await page.waitForNavigation({ waitUntil: 'networkidle0' });
//             attempts++;
//         } else {
//             isOnOfferPage = false; // Sortir de la boucle si on n'est pas sur la page d'offre
//         }
//     }
//
//     // Étape 4 : Accéder à la page de liaison du compte
//     await page.waitForSelector('#last-name', { visible: true });
//     await page.waitForSelector('#global-user-name', { visible: true });
//     await page.waitForSelector('input[type="checkbox"]', { visible: true });
//     await page.waitForSelector('button[type="submit"]', { visible: true });
//
//     await page.type('#last-name', lastName);
//     await page.type('#global-user-name', username);
//     await page.click('input[type="checkbox"]');
//     await page.click('button[type="submit"]');
//
//     // Attendre 2 secondes pour voir les résultats
//     await new Promise(resolve => setTimeout(resolve, 2000));
//
//     console.log('Bot a terminé les étapes.');
//     await browser.close(); // Fermez le navigateur
// })();




const puppeteer = require('puppeteer');

const SPOTIFY_URL = 'https://partner-provisioning.spotify.com/starbucks/';
const SPOTIFY_LOGIN_URL = 'https://accounts.spotify.com/en/login';
const SPOTIFY_REGISTER_URL = 'https://partner-provisioning.spotify.com/starbucks/register/';

const usernames = ['US8547584', 'US8547585']; // Remplacez par vos noms d'utilisateur Starbucks
const lastName = 'Smith'; // Remplacez par votre nom de famille
const emails = [
    'tstpu7768735@aol.com',
    'ritrumoyda@gufum.com',
    'irrrw4237454@aol.com',
    'lelado7551@skrank.com',
    'gtc1478gtc1@gmail.com',
    'gtc1478gtc12@gmail.com',
    'gtc1478gtc13@gmail.com',
    'gtc1478gtc14@gmail.com',
    'gtc1478gtc15@gmail.com',
    'gtc1478gtc16@gmail.com',
    'gtc1478gtc17@gmail.com',
    'gtc1478gtc18@gmail.com',
    'gtc1478gtc111@gmail.com'
]; // Remplacez par votre liste d'emails
const password = 'SPOTIFY12345'; // Remplacez par votre mot de passe

(async () => {
    for (let i = 0; i < emails.length; i++) {
        const email = emails[i];
        const username = usernames[i % usernames.length]; // Gère le cas où le nombre d'e-mails est supérieur au nombre d'utilisateurs

        const browser = await puppeteer.launch({ headless: false }); // Ouvrir le navigateur pour chaque compte
        const page = await browser.newPage();

        // Étape 1 : Accéder à la page d'offre de Spotify
        await page.goto(SPOTIFY_URL);

        await page.waitForSelector('#authorize-btn', { visible: true });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Ajout d'un délai si nécessaire
        await page.click('#authorize-btn');

        // Étape 2 : Attendre la redirection vers la page de connexion Spotify
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        await page.goto(SPOTIFY_LOGIN_URL);

        // Étape 3 : Se connecter à Spotify
        await page.type('#login-username', email); // Utiliser l'email actuel
        await page.type('#login-password', password); // Utiliser le mot de passe actuel
        await page.click('#login-button');

        // Attendre que la connexion soit réussie et que la redirection se produise
        await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // Vérifiez si vous êtes redirigé vers la page d'offre
        let isOnOfferPage = true;
        let attempts = 0;

        while (isOnOfferPage && attempts < 5) {
            const currentUrl = page.url();

            if (currentUrl.includes('accounts.spotify.com/en/status')) {
                console.log('Redirected to status page, forcing navigation to registration page.');
                await page.goto(SPOTIFY_REGISTER_URL, { waitUntil: 'networkidle0' });
                attempts++;
            } else if (currentUrl === SPOTIFY_URL) {
                console.log('Back on offer page, clicking authorize button again.');
                await page.click('#authorize-btn');
                await page.waitForNavigation({ waitUntil: 'networkidle0' });
                attempts++;
            } else {
                isOnOfferPage = false; // Sortir de la boucle si on n'est pas sur la page d'offre
            }
        }

        // Étape 4 : Accéder à la page de liaison du compte
        await page.waitForSelector('#last-name', { visible: true });
        await page.waitForSelector('#global-user-name', { visible: true });
        await page.waitForSelector('input[type="checkbox"]', { visible: true });
        await page.waitForSelector('button[type="submit"]', { visible: true });

        await page.type('#last-name', lastName);
        await page.type('#global-user-name', username);
        await page.click('input[type="checkbox"]');
        await page.click('button[type="submit"]');

        // Attendre 2 secondes pour voir les résultats
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(`Bot a terminé les étapes pour ${email}.`);
        await browser.close(); // Fermez le navigateur après chaque compte
    }
})();
