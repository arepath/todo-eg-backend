var express = require('express');
var router = express.Router();

let tasks = [];

router.get('/getTasks', function (req, res, next) {
    res.status(200).json(tasks);
});

router.post('/addTask', function (req, res, next) {
    let timestamp = Date.now() + Math.random();
    if (req.body && req.body.nombre && req.body.descripcion && req.body.fecha) {
        req.body.id = timestamp;
        tasks.push(req.body);
        res.status(200).json(tasks);
    }else{
        res.status(400).json({error: 'Parametros incompletos'});
    }
});

router.delete('/deleteTask/:id', function (req, res, next) {
    if(req.params && req.params.id){
        let id = req.params.id;
        tasks = tasks.filter(task => task.id != id);
        res.status(200).json(tasks)
    }else{
        res.status(400).json({error: 'Parametros incompletos'});
    }
});


module.exports = router;