const express = require('express');
const router = express.Router();
const { taskvalidation } = require('../Validations/validation');
const task_model = require('../Models/task_model');
const valid = require('../Validations/validateToken');

router.get('/task', valid, async (req, res) => {
    console.log(await task_model.find());
    res.send(await task_model.find());
})

router.post('/add-task',valid, async (req, res) => {
    const { error } = await taskvalidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task =await new task_model({
        task: req.body.task,
        date: req.body.date,
        priority: req.body.priority,
        user_id: req.body.user_id
    })

    try {
        const newtask =await task.save();
        res.send(newtask);
        console.log(newtask);
    }
    catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;