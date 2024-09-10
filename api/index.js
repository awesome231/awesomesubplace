const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

app.use(express.static(path.join(__dirname, '../')));  // Serve static files (index.html, etc.)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// API endpoint to get subgames
app.get('/subgames', async (req, res) => {
    const universeId = req.query.universeId;
    if (!universeId) {
        return res.status(400).send({ error: 'Universe ID is required' });
    }
    const url = `https://develop.roblox.com/v1/universes/${universeId}/places?isUniverseCreation=false&limit=10&sortOrder=Asc`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching sub-games:', error);
        res.status(500).send({ error: 'Failed to fetch sub-games' });
    }
});

module.exports = app;
