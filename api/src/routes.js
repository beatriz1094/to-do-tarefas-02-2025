const express = require('express');
const router = express.Router();

const tarefa = require('./controllers/tarefa');
const usuario = require('./controllers/usuario');

router.get('/',(req, res)=>{
    res.json({titulo:'SNOOPY PetSHop API'});
});

router.post('/tarefas',tarefa.create);
router.get('/tarefas',tarefa.read);
router.patch('/tarefas/:id',tarefa.update);
router.delete('/tarefas/:id',tarefa.remove);

router.post('/usuario',usuario.create);
router.get('/usuario',usuario.read);
router.patch('/usuario/:id',usuario.update);
router.delete('/usuario/:id',usuario.remove);

module.exports = router;