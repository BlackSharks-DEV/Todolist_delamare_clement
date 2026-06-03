const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Configuration de la connexion PostgreSQL via les variables d'environnement
const pool = new Pool({
    host: process.env.DB_HOST || 'db',
    user: process.env.POSTGRES_USER || 'todo_user',
    password: process.env.POSTGRES_PASSWORD || 'todo_pass',
    database: process.env.POSTGRES_DB || 'todo_db',
    port: 5432
});

// Initialisation de la table si elle n'existe pas
const initDb = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) DEFAULT 'Sans titre',
                description TEXT NOT NULL,
                status VARCHAR(50) DEFAULT 'todo',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table 'tasks' prete dans PostgreSQL");
    } catch (err) {
        console.error("Erreur d'initialisation de la BDD :", err);
    }
};
initDb();

// 1. GET /api/tasks - Lister toutes les tâches
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) { next(err); }
});

// 2. GET /api/tasks/:id - Voir une tâche précise
router.get('/:id', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Tache non trouvee" });
        res.json(result.rows[0]);
    } catch (err) { next(err); }
});

// 3. POST /api/tasks - Créer une tâche
router.post('/', async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        if (!description) {
            return res.status(400).json({ error: "La description est obligatoire" });
        }
        const result = await pool.query(
            'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
            [title || "Sans titre", description, status || "todo"]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) { next(err); }
});

// 4. PUT /api/tasks/:id - Modifier une tâche
router.put('/:id', async (req, res, next) => {
    try {
        const { title, description, status } = req.body;
        const check = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
        if (check.rows.length === 0) return res.status(404).json({ error: "Tache non trouvee" });

        const current = check.rows[0];
        const result = await pool.query(
            'UPDATE tasks SET title=$1, description=$2, status=$3, updated_at=NOW() WHERE id=$4 RETURNING *',
            [
                title !== undefined ? title : current.title,
                description !== undefined ? description : current.description,
                status !== undefined ? status : current.status,
                req.params.id
            ]
        );
        res.json(result.rows[0]);
    } catch (err) { next(err); }
});

// 5. DELETE /api/tasks/:id - Supprimer une tâche
router.delete('/:id', async (req, res, next) => {
    try {
        const result = await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
        if (result.rowCount === 0) return res.status(404).json({ error: "Tache non trouvee" });
        res.json({ message: "Tache supprimee avec succes" });
    } catch (err) { next(err); }
});

module.exports = router;