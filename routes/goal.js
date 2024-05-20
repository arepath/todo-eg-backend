var express = require('express');
var router = express.Router();

let goals = [];

router.get('/getGoals', function (req, res, next) {
    res.status(200).json(goals);
});

router.post('/addGoal', function (req, res, next) {
    let timestamp = Date.now() + Math.random();
    if (req.body && req.body.name && req.body.description && req.body.date) {
        req.body.id = timestamp;
        goals.push(req.body);
        res.status(200).json(goals);
    }else{
        res.status(400).json({error: 'Parametros incompletos'});
    }
});

router.delete('/deleteGoal/:id', function (req, res, next) {
    if(req.params && req.params.id){
        let id = req.params.id;
        goals = goals.filter(goal => goal.id != id);
        res.status(200).json(goals)
    }else{
        res.status(400).json({error: 'Parametros incompletos'});
    }
});


module.exports = router;