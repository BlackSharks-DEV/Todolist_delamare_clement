const express = require('express');
const client = require('prom-client'); // --- IMPORT MONITORING ---

const app = express();
app.use(express.json());

// Activer la collecte automatique des métriques système (CPU, Ram, Event loop)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// --- LA ROUTE DE LA PHASE 5 ---
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Vos autres routes d'API (GET /api/tasks, etc.) restent inchangées ci-dessous...
app.get('/health', (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API démarrée sur le port ${PORT}`));