const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Endpoint to proxy the API request
app.get('/subgames', async (req, res) => {
    const universeId = req.query.universeId;
    if (!universeId) {
        return res.status(400).send('Universe ID is required');
    }

    const url = `https://develop.roblox.com/v1/universes/${universeId}/places?isUniverseCreation=false&limit=10&sortOrder=Asc`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from Roblox API.');
    }
});

// Serve the HTML file for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
