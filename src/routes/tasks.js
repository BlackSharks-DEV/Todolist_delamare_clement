const express = require('express');
const router = express.Router();

// Simulation d'une base de données en mémoire (Tableau de tâches)
let tasks = [];

// 1. GET /api/tasks - Lister toutes les tâches
router.get('/', (req, res) => {
    res.json(tasks);
});

// 2. GET /api/tasks/:id - Voir une tâche précise
router.get('/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.pattern.id || t.id === req.params.id);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée" });
    res.json(task);
});

// 3. POST /api/tasks - Créer une tâche
router.post('/', (req, res) => {
    const { title, description, status } = req.body;
    
    if (!description) {
        return res.status(400).json({ error: "La description est obligatoire" });
    }

    const newTask = {
        id: Date.now().toString(), // Identifiant unique temporaire
        title: title || "Sans titre",
        description: description,
        status: status || "todo",
        createdAt: new Date(),
        updatedAt: new Date()
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 4. PUT /api/tasks/:id - Modifier une tâche
router.put('/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: "Tâche non trouvée" });

    const { title, description, status } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    task.updatedAt = new Date();

    res.json(task);
});

// 5. DELETE /api/tasks/:id - Supprimer une tâche
router.delete('/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) return res.status(404).json({ error: "Tâche non trouvée" });

    tasks.splice(taskIndex, 1);
    res.json({ message: "Tâche supprimée avec succès" });
});

module.exports = router;