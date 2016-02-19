var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
var Tareas = mongoose.model('Tareas');

//GET list task
router.get('/tasks',function(req,res,next){
  Tareas.find(function(err,tasks){

    if(err){return next(err)}
    res.json(tasks);
  })
})

// POST add task
router.post('/task',function(req,res,next){
  var task = new Tareas(req.body);

  task.save(function(err,task){
    if(err){
      return next(err)
    }
    res.json(task);

  })
})

// PUT, update task
router.put('/task/:id',function(req,res){
  Tareas.findById(req.params.id, function(err,tarea){

    tarea.nombre = req.body.nombre;
    tarea.prioridad = req.body.prioridad;

    tarea.save(function(err){
      if(err){
        res.send(err)
      }
      res.json(tarea)
    })
  })
})

//DELETE delete task
router.delete('/task/:id',function(req,res){

  Tareas.findByIdAndRemove(req.params.id,function(err){
    if(err){
      res.send(err)
    }
    res.json({message: 'the task was delete'});

  })
})

module.exports = router;
