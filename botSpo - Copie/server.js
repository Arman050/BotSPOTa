const express = require('express');
const fs = require('fs');
const puppeteer = require('puppeteer');
const path = 'email.json';

const app = express();
app.use(express.json()); // Pour gérer les JSON dans les requêtes
app.use(express.static('public')); // Servir des fichiers statiques depuis le dossier "public"

// Route par défaut pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route pour mettre à jour l'email
app.post('/update-email', (req, res) => {
    const { email } = req.body;

    // Mettre à jour le fichier de configuration avec le nouvel email
    fs.writeFileSync(path, JSON.stringify({ email }));

    res.sendStatus(200); // Répond avec un succès
});

// Route pour démarrer le bot
app.post('/start-bot', async (req, res) => {
    // Vérifier si le fichier email.json existe
    if (!fs.existsSync(path)) {
        return res.status(400).send('Email non défini, veuillez d\'abord mettre à jour l\'email.');
    }

    const { email } = JSON.parse(fs.readFileSync(path));
    const SPOTIFY_URL = 'https://partner-provisioning.spotify.com/starbucks/';
    const SPOTIFY_LOGIN_URL = 'https://accounts.spotify.com/en/login';
    const SPOTIFY_REGISTER_URL = 'https://partner-provisioning.spotify.com/starbucks/register'; // Ajout de l'URL de l'inscription

    const lastName = 'Smith'; // Remplacez par le nom de famille
    const username = 'US7458965'; // Remplacez par le nom d'utilisateur

    // Démarrer le bot Puppeteer
    const browser = await puppeteer.launch({ headless: false }); // headless: false pour voir le navigateur
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
    await page.type('#login-username', email); // Utilisez l'email du fichier
    await page.type('#login-password', 'SPOTIFY12345'); // Remplacez par votre mot de passe
    await page.click('#login-button');

    // Attendre que la connexion soit réussie et que la redirection se produise
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Vérifiez si vous êtes redirigé vers la page d'offre
    let isOnOfferPage = true;
    let attempts = 0;

    while (isOnOfferPage && attempts < 5) {
        const currentUrl = page.url();

        if (currentUrl.includes('accounts.spotify.com/en/status')) {
            console.log('Redirigé vers la page d\'état, navigation forcée vers la page d\'inscription.');
            await page.goto(SPOTIFY_REGISTER_URL, { waitUntil: 'networkidle0' });
            attempts++;
        } else if (currentUrl === SPOTIFY_URL) {
            console.log('Retour sur la page d\'offre, clic sur le bouton d\'autorisation à nouveau.');
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

    console.log('Bot a terminé les étapes.');
    await browser.close(); // Fermez le navigateur

    res.sendStatus(200); // Répond avec succès
});

app.listen(3000, () => console.log('Serveur lancé sur le port 3000'));
